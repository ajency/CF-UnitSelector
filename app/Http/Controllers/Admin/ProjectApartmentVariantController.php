<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Project;
use CommonFloor\ProjectPropertyType;

class ProjectApartmentVariantController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index( $projectId ) {
        $project = Project::find( $projectId );
        return view( 'admin.project.variants.apartment.list' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'apartment-variant' );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
        $project = Project::find( $projectId );
        $projectPropertyType = $project->projectPropertyTypes()->where( 'property_type_id', 1 )->first(); // 1 is Apartment
        $unitTypes = $project->getUnitTypesToArray( $projectPropertyType->id );
        $propertyTypeAttributes = ProjectPropertyType::find( $projectPropertyType->id )->attributes->toArray();
        return view( 'admin.project.variants.apartment.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'apartment-variant' )
                        ->with( 'unitTypes', $unitTypes )
                        ->with( 'projectPropertyTypeAttributes', $propertyTypeAttributes );
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
