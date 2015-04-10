<?php

namespace CommonFloor\Http\Controllers\admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\Media;
use CommonFloor\PropertyType;

class ProjectController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {

        $projects = Project::orderBy('project_title')->get()->toArray();
        return view( 'admin.project.list' )
                        ->with( 'projects', $projects ) 
                        ->with( 'menuFlag', FALSE );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        $propertyType = PropertyType::all();
        return view( 'admin.project.add' )
                    ->with( 'property_type', $propertyType )
                    ->with( 'menuFlag', FALSE );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( Request $request, ProjectRepository $projectRepository ) {

        $project = $projectRepository->createProject( $request->all() );
        if ($project !== null) {
            return redirect( "/admin/project" );
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit( $id, ProjectRepository $projectRepository ) {
        $project = $projectRepository->getProjectById( $id );
        $projectMeta = $project->projectMeta()->get()->toArray();
        $propertyTypes = PropertyType::all();
        $unitTypes = [];

        foreach ($project->projectPropertyTypes as $projectPropertyType) {
            $unitTypes[$projectPropertyType->property_type_id] = $project->getUnitTypesToArray( $projectPropertyType->id );
        }
 
        return view( 'admin.project.settings' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'project_meta', $projectMeta )
                        ->with( 'propertyTypes', $propertyTypes )
                        ->with( 'unitTypes', $unitTypes )
                        ->with( 'current', 'settings' );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update( $id, Request $request, ProjectRepository $projectRepository ) {

        $project = $projectRepository->updateProject( $id, $request->all() );

        return redirect( "/admin/project/" . $id . "/edit" );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy( $id ) {
        //
    }

    public function svg( $id, ProjectRepository $projectRepository ) {
        $project = $projectRepository->getProjectById( $id );
        $projectMeta = $project->projectMeta()->whereIn( 'meta_key', ['master', 'google_earth', 'skyview'] )->get()->toArray();
        $svgImages = [];
       
        foreach ($projectMeta as $meta_values) {

            if ($meta_values['meta_key'] == 'master') {
                $media_id_arr = explode( "||", $meta_values['meta_value'] );

                foreach ($media_id_arr as $media_id) {
                    $imgage_name = Media::find( $media_id )->image_name;
                    $svgImages[$meta_values['meta_key']]['image_url'][] = url() . "/projects/" . $id . "/" . $meta_values['meta_key'] . "/" . $imgage_name;
                    $svgImages[$meta_values['meta_key']]['image_id'][] = $meta_values['id'];
                }
            } else {
                $media_id = $meta_values['meta_value'];
                $imgage_name = Media::find( $media_id )->image_name;
                $svgImages[$meta_values['meta_key']]['image_url'][] = url() . "/projects/" . $id . "/" . $meta_values['meta_key'] . "/" . $imgage_name;
                $svgImages[$meta_values['meta_key']]['image_id'][] = $meta_values['id'];
            }
        }

        return view( 'admin.project.svg' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'svgImages', $svgImages )
                        ->with( 'current', 'svg' )
                        ->with( 'project_property_type', $project->projectPropertyTypes()->get() );
    }

}
