<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\UnitType;

class ProjectUnitTypeController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request) {
 
        $unitTypeName = $request->input('unit_type');
        $projectPropertyTypeId = $request->input('project_property_type_id');

        $unitType = new UnitType();
        $unitType->project_property_type_id = $projectPropertyTypeId;
        $unitType->unittype_name = ucfirst($unitTypeName);
        $unitType->save();

        $unitTypeId = $unitType->id;

        return response()->json([
                    'code' => 'unittype_created',
                    'message' => 'Unit Type Successfully Created',
                    'data' => [
                        'unitTypeId' => $unitTypeId
                    ]
                        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($projectId, $unitTypeId) {
        $unitType = UnitType::find($unitTypeId);
        $unitType->delete();
        return response()->json([
                    'code' => 'unittype_deleted',
                    'message' => 'Unit type deleted successfully'
                        ], 204);
    }

}
