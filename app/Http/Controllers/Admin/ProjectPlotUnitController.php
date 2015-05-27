<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\UnitVariant;
use CommonFloor\Unit;
use CommonFloor\UnitType;

class ProjectPlotUnitController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
 
    public function index($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];
        $projectPropertytypeId = 0;
        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == PLOTID)
                $projectPropertytypeId = $propertyTypes['id'];
        }
        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = $unitVariantIdArr = [];
        foreach ($unitTypeArr as $unitType)
            $unitTypeIdArr[] = $unitType['id'];

        $unitvariantArr = UnitVariant::whereIn('unit_type_id', $unitTypeIdArr)->get()->toArray();
        foreach ($unitvariantArr as $unitvariant)
            $unitVariantIdArr[] = $unitvariant['id'];

        $unitArr = Unit::whereIn('unit_variant_id', $unitVariantIdArr)->orderBy('unit_name')->get();

        return view('admin.project.unit.plot.list')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_arr', $unitArr)
                        ->with('current', 'plot-unit');

        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];
        $projectPropertytypeId = 0;
        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == PLOTID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType)
            $unitTypeIdArr[] = $unitType['id'];

        $unitVariantArr = UnitVariant::whereIn('unit_type_id', $unitTypeIdArr)->get()->toArray();
        $phases = $project->projectPhase()-> where('status','not_live')->get()->toArray(); 

        return view('admin.project.unit.plot.add')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('phases', $phases)
                        ->with('current', 'plot-unit');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($project_id, Request $request) {
        $unit = new Unit();
        $unit->unit_name = ucfirst($request->input('unit_name'));
        $unit->unit_variant_id = $request->input('unit_variant');
        $unit->availability = $request->input('unit_status');
        $unit->phase_id = $request->input('phase');
        $unit->save();
        $unitid = $unit->id;

        $addanother = $request->input('addanother');
        if ($addanother == 1)
            return redirect(url("/admin/project/" . $project_id . "/plot-unit/create"));
        else
            return redirect("/admin/project/" . $project_id . "/plot-unit/" . $unitid . '/edit');
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
    public function edit($project_id, $id, ProjectRepository $projectRepository) {
        $unit = Unit::find($id);
        $project = $projectRepository->getProjectById($project_id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];

        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == PLOTID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType)
            $unitTypeIdArr[] = $unitType['id'];

        $unitVariantArr = UnitVariant::whereIn('unit_type_id', $unitTypeIdArr)->get()->toArray();
        $phases = $project->projectPhase()-> where('status','not_live')->get()->toArray(); 

        return view('admin.project.unit.plot.edit')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('unit', $unit->toArray())
                        ->with('phases', $phases)
                        ->with('current', 'plot-unit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($project_id, $id, Request $request) {
        $unit = Unit::find($id);
        $unit->unit_name = ucfirst($request->input('unit_name'));
        $unit->unit_variant_id = $request->input('unit_variant');
        $unit->availability = $request->input('unit_status');
        $unit->phase_id = $request->input('phase');
        $unit->save();

        $addanother = $request->input('addanother');
        if ($addanother == 1)
            return redirect("/admin/project/" . $project_id . "/plot-unit/create");
        else
            return redirect("/admin/project/" . $project_id . "/plot-unit/" . $id . '/edit');
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
