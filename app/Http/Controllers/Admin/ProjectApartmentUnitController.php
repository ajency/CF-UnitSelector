<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Project;
use CommonFloor\Unit;

class ProjectApartmentUnitController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index( $projectId ) {
        $project = Project::find( $projectId );

        return view( 'admin.project.unit.apartment.list' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'apartment-unit' )
                        ->with( 'units', [] );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
        $project = Project::find( $projectId );
        
        $phases = $project->projectPhase()->lists('id');
        
        $buildings = \CommonFloor\Building::whereIn('phase_id', $phases)->get();
        return view( 'admin.project.unit.apartment.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'apartment-unit' )
                        ->with( 'buildings', $buildings );
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit( $projectId, $untiId ) {
        $project = Project::find( $projectId );

        $unit = Unit::find( $unitId );
        return view( 'admin.project.unit.apartment.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'apartment-unit' )
                        ->with( 'unit', $unit );
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
