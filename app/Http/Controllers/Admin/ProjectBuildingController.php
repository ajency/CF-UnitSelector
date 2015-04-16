<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Building;

class ProjectBuildingController extends Controller {

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
        $buildings = Building::all();
        return view( 'admin.project.building.list' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'buildings' , $buildings)
                        ->with( 'current', '' );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
        $project = $this->projectRepository->getProjectById( $projectId );
        return view( 'admin.project.building.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'building' );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store() {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $id ) {
        
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
