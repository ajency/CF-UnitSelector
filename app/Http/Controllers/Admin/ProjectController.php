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

        $projects = Project::all()->toArray();
        return view('admin.project.list')
                        ->with('projects', $projects)
                        ->with('menuFlag', FALSE);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        $propertyType = PropertyType::all();
        return view('admin.project.add')->with('property_type', $propertyType)
                                         ->with('menuFlag', FALSE);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request, ProjectRepository $projectRepository) {

        $project = $projectRepository->createProject($request->all());
        if ($project !== null) {
            return redirect("/admin/project");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->get()->toArray();
        $propertyType = PropertyType::all();
        $projectPropertytype = $project->projectPropertyTypes()->select('property_type_id')->get()->toArray();
        $propertyTypeArr =[];
        
        foreach ($projectPropertytype as $property_types)
              foreach ($property_types as $types)  
                    $propertyTypeArr []= $types;
 
         
        return view('admin.project.settings')
                        ->with('project', $project->toArray())
                        ->with('project_meta', $projectMeta)
                         ->with('property_type', $propertyType)
                         ->with('project_property_type', $propertyTypeArr)
                        ->with('current', 'settings');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request, ProjectRepository $projectRepository) {

        $project = $projectRepository->updateProject($id, $request->all());

        return redirect("/admin/project/" . $id . "/edit");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        //
    }

    public function svg($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        //$media_images = $project->media()->get()->toArray();dd($media_images);
        $projectMeta = $project->projectMeta()->whereIn('meta_key', ['master', 'google_earth', 'skyview'])->get()->toArray();
        $svgImages = [];
        

        foreach ($projectMeta as $meta_values) {

            if ($meta_values['meta_key'] == 'master') {
                $media_id_arr = explode("||", $meta_values['meta_value']);

                foreach ($media_id_arr as $media_id) {
                    $imgage_name = Media::find($media_id)->image_name;
                    $svgImages[$meta_values['meta_key']]['image_url'][] = url() . "/projects/" . $id . "/" . $meta_values['meta_key'] . "/" . $imgage_name;
                    $svgImages[$meta_values['meta_key']]['image_id'][] = $meta_values['id'];
                }
            } else {
                $media_id = $meta_values['meta_value'];
                $imgage_name = Media::find($media_id)->image_name;
                $svgImages[$meta_values['meta_key']]['image_url'][] = url() . "/projects/" . $id . "/" . $meta_values['meta_key'] . "/" . $imgage_name;
                $svgImages[$meta_values['meta_key']]['image_id'][] = $meta_values['id'];
            }
        }
        
        /* $svgimgData = $project->projectMeta()->whereIn('meta_key', ['master', 'google_earth','skyview'])->get()->toArray();
          foreach ($svgimgData as $svg) {
          $imgage_name  = Media::find($svg['meta_value'])->image_name;
          $svgImages[$svg['meta_key']]['image_url'][] = url() . "/projects/" . $id . "/" . $svg['meta_key'] . "/" . $imgage_name;
          $svgImages[$svg['meta_key']]['image_id'][] = $svg['id'];

          } */

        /* $googleearthPath = public_path() . "/projects/" . $id . "/google_earth/";
          $masterPath = public_path() . "/projects/" . $id . "/master/";
          $skyviewPath = public_path() . "/projects/" . $id . "/skyview/";

          $googleearthImage = glob($googleearthPath . "*.*");
          $masterImage = glob($masterPath . "*.*");
          $skyviewImage = glob($skyviewPath . "*.*");


          if (isset($googleearthImage[0])) {
          $googleearthImagepath = explode("public", $googleearthImage[0]);
          $googleearthImagepath = url() . $googleearthImagepath[1];
          } else
          $googleearthImagepath = '';

          if (isset($skyviewImage[0])) {
          $skyviewImagepath = explode("public", $skyviewImage[0]);
          $skyviewImagepath = url() . $skyviewImagepath[1];
          } else
          $skyviewImagepath = '';


          foreach ($masterImage as $key=>$master)
          {
          $masterImagepath = explode("public", $master);
          $masterImage[$key] = url() . $masterImagepath[1];
          }

          return view('admin.project.svg')
          ->with('project', $project->toArray())
          ->with('googleearthImgage', $googleearthImagepath)
          ->with('masterImage', $masterImage)
          ->with('skyviewImage', $skyviewImagepath)
          ->with('current', 'svg'); */
        return view('admin.project.svg')
                        ->with('project', $project->toArray())
                        ->with('svgImages', $svgImages)
                        ->with('current', 'svg');
    }

}
