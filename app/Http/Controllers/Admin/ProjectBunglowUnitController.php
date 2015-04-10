<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\UnitVariant;
use CommonFloor\Unit;

class ProjectBunglowUnitController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];

        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == '2')
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitArr = Unit::orderBy('unit_name')->get()->toArray();

        return view('admin.project.listunit')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_arr', $unitArr)
                        ->with('current', '');
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

        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == '2')
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitVariantArr = $projectPropertytypeId->projectUnitType()->get()->toArray();

        return view('admin.project.addunit')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('current', '');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($project_id, Request $request) {
        $unit = new Unit();
        $unit->unit_name = $request->input('unit_name');
        $unit->unit_variant_id = $request->input('unit_variant');
        $unit->availability = $request->input('unit_status');
        $unit->save();
        $unitid = $unit->id;

        return redirect("/admin/project/" . $project_id . "/bunglow-unit/" . $unitid . '/edit');
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

            if ($propertyTypes['property_type_id'] == '2')
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitVariantArr = $projectPropertytypeId->projectUnitType()->get()->toArray();

        return view('admin.project.editunit')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('unit', $unit->toArray())
                        ->with('current', '');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($project_id, $id, Request $request) {
        $unit = Unit::find($id);
        $unit->unit_name = $request->input('unit_name');
        $unit->unit_variant_id = $request->input('unit_variant');
        $unit->availability = $request->input('unit_status');
        $unit->save();

        return redirect("/admin/project/" . $project_id . "/bunglow-unit/" . $id . '/edit');
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
