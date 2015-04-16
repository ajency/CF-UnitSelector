<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Building;
use CommonFloor\Phase;
use CommonFloor\FloorLayout;
use CommonFloor\Project;

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
                        ->with( 'buildings', $buildings )
                        ->with( 'current', '' );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
        $project = $this->projectRepository->getProjectById( $projectId );

        $phases = Phase::where( 'project_id', $projectId )->get();

        return view( 'admin.project.building.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'building' )
                        ->with( 'phases', $phases );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( $projectId, Request $request ) {
        $formData = $request->all();
        $building = new Building;
        $building->building_name = $formData['building_name'];
        $building->phase_id = $formData['phase_id'];
        $building->no_of_floors = $formData['no_of_floors'];
        $building->save();
        return redirect( url( 'admin/project/' . $projectId . '/building/' . $building->id . '/edit' ) );
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
    public function edit( $projectId, $buildingId ) {
        $project = Project::find( $projectId );

        $phases = Phase::where( 'project_id', $projectId )->get();

        $building = Building::find( $buildingId );
        $floorLayouts = FloorLayout::where( 'project_property_type_id', $project->getProjectPropertyTypeId( 1 ) )->get();
        return view( 'admin.project.building.edit' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'building' )
                        ->with( 'phases', $phases )
                        ->with( 'building', $building )
                        ->with( 'floorLayouts', $floorLayouts );
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
