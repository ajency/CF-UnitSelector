<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;

use CommonFloor\Project;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Repositories\FloorLayoutRepository;

class ProjectFloorLayoutController extends Controller {

    private $projectRepository;

    public function __construct( ProjectRepository $projectRepository ) {
        $this->projectRepository = $projectRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index( $projectId ) {
        $project = $this->projectRepository->getProjectById( $projectId );
        return view( 'admin.project.floorlayout.list' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'list-floor-layout' );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
        $project = $this->projectRepository->getProjectById( $projectId );
        return view( 'admin.project.floorlayout.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'add-floor-layout' );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( $projectId, Request $request, FloorLayoutRepository $floorLayoutRepository ) {
        $formData = $request->all();
        unset( $formData['_token'] );
        
        $project = Project::find($projectId);
        $projectPropertyTypeId = $project->getProjectPropertyTypeId( 1 ); // 1 is property type apartment
        
        $formData['project_property_type_id'] = $projectPropertyTypeId;
        $floorLayout = $floorLayoutRepository->createFloorLayout( $formData );
        return redirect( url( 'admin/project/' . $projectId . '/floor-layout/' . $floorLayout->id . '/edit' ) );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $id ) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit( $id ) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update( $id ) {
        //
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

}
