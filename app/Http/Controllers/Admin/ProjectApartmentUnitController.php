<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Project;
use CommonFloor\Unit;
use CommonFloor\UnitType;
use CommonFloor\Building;
use CommonFloor\FloorLayout;
use CommonFloor\UnitVariant;

class ProjectApartmentUnitController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
   
    public function index($projectId) {
        $project = Project::find($projectId);
        $phases = $project->projectPhase()->lists('id');
        $buildings = Building::whereIn('phase_id', $phases)->lists('id');
        $units = Unit::whereIn('building_id', $buildings)->get();
        return view('admin.project.unit.apartment.list')
                        ->with('project', $project->toArray())
                        ->with('current', 'apartment-unit')
                        ->with('units', $units);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($projectId) {

        $project = Project::find($projectId);
        $phases = $project->projectPhase()->lists('id');
        $buildings = Building::whereIn('phase_id', $phases)->get();
        $propertyTypes = $project->projectPropertyTypes()->whereIn( 'property_type_id', [APARTMENTID,PENTHOUSEID] )->get()->toArray();
        $unitVariantArr = $projectPropertyTypes = $unitTypeIdArr= [];
        
        foreach($propertyTypes as $propertyType)
        {
            $projectPropertyTypes[]  = ['NAME'=>get_property_type($propertyType['property_type_id']),'ID'=>$propertyType['id']];
 
        } 
 
        if(count($projectPropertyTypes)==1)
        {
           $unitTypeArr = UnitType::where( 'project_property_type_id', $projectPropertyTypes[0]['ID'] )->get();
         
            foreach($unitTypeArr as $unitType)
                $unitTypeIdArr[] =$unitType['id'];
           
            $unitVariantArr = UnitVariant::whereIn('unit_type_id',$unitTypeIdArr)->get()->toArray(); 
        }

        
        return view('admin.project.unit.apartment.create')
                        ->with('project', $project->toArray())
                        ->with('projectPropertyTypes', $projectPropertyTypes)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('current', 'apartment-unit')
                        ->with('buildings', $buildings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($projectId, Request $request) {

        $unit = new Unit;
        $unit->unit_name = ucfirst($request->get('unit_name'));
        $unit->unit_variant_id = $request->get('unit_variant_id');
        $unit->building_id = $request->get('building_id');
        $unit->floor = $request->get('floor');
        $unit->position = '';
        $unit->availability = $request->get('unit_status');
        $unit->save();

        $addanother = $request->input('addanother');
        if ($addanother == 1)
            return redirect(url('/admin/project/' . $projectId . '/apartment-unit/create'));
        else
            return redirect(url('/admin/project/' . $projectId . '/apartment-unit/' . $unit->id . '/edit'));
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
    public function edit($projectId, $unitId) {
        $project = Project::find($projectId);

        $project = Project::find($projectId);

        $phases = $project->projectPhase()->lists('id');

        $buildings = Building::whereIn('phase_id', $phases)->get()->toArray();

        $unit = Unit::find($unitId)->toArray();
        $building = Building::find($unit['building_id'])->toArray();
        $floors = $building['no_of_floors'];

        $projectPropertytypes = $project->projectPropertyTypes()->whereIn( 'property_type_id', [APARTMENTID,PENTHOUSEID] )->get()->toArray();
        
        $variantId = $unit['unit_variant_id'];
        $unitType = UnitVariant::find($variantId)->unitType()->first();
        $unitTypeId = $unitType->id;
        $unitVariantArr = UnitVariant::where('unit_type_id',$unitTypeId)->get()->toArray();

        return view('admin.project.unit.apartment.edit')
                        ->with('project', $project->toArray())
                        ->with('current', 'apartment-unit')
                        ->with('buildings', $buildings)
                        ->with('floors', $floors)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('unit', $unit);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($project_id, $id, Request $request) {

        $unit = Unit::find($id);
        $unit->unit_name = ucfirst($request->get('unit_name'));
        $unit->unit_variant_id = $request->get('unit_variant');
        $unit->building_id = $request->get('building_id');
        $unit->floor = $request->get('floor');
        $unit->position = '';
        $unit->availability = $request->get('unit_status');
        $unit->save();

        $addanother = $request->input('addanother');
        if ($addanother == 1)
            return redirect(url('/admin/project/' . $project_id . '/apartment-unit/create'));
        else
            return redirect("/admin/project/" . $project_id . "/apartment-unit/" . $id . '/edit');
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

}
