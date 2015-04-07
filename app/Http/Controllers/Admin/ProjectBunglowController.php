<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\UnitVariant;
use CommonFloor\VariantFloorLevel;

class ProjectBunglowController extends Controller {

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
    public function create($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $unit_type_arr = $project->projectUnitType()->where('property_type', '2')->get()->toArray();

        return view('admin.project.addvariant')
                        ->with('project', $project->toArray())
                        ->with('unit_tpe_arr', $unit_type_arr)
                        ->with('current', '');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($project_id, Request $request) {
        $unitVariant = new UnitVariant();
        $unitVariant->unit_variant_name = $request->unit_variant_name;
        $unitVariant->unit_type_id = $request->unit_type;
        $unitVariant->save();
        $unitVariantID = $unitVariant->id;

        //Floor Level
        $floorLevel_arr = $request->floor_level;
        $variant_floorlevel_arr = [];

        if ((isset($floorLevel_arr)) && !empty($floorLevel_arr)) {
            foreach ($floorLevel_arr as $key => $floorlevel) {
                
                $variant_floorlevel_arr[] = new UnitType(['floor_level_name' => $floorlevel, 'unit_variant_id' => $unitVariantID]);
                
            }

            if (!empty($variant_floorlevel_arr))
                $unitVariant->variantFloorlevel()->saveMany($variant_floorlevel_arr);
        }


        return redirect("/admin/project/" . $project_id . "/bunglow/" . $unitVariantID . '/edit');
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
        $unitVariant = UnitVariant::find($id);
        $project = $projectRepository->getProjectById($id);
        $unit_type_arr = $project->projectUnitType()->where('property_type', '2')->get()->toArray();
        $variantFloorlevel = $unitVariant->variantFloorlevel()->get()->toArray(); 
       
        return view('admin.project.editvariant')
                        ->with('project', $project->toArray())
                        ->with('unit_tpe_arr', $unit_type_arr)
                        ->with('unitVariant', $unitVariant->toArray())
                        ->with('variantFloorlevel', $variantFloorlevel)
                        ->with('current', '');
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($project_id, $id, Request $request) { 
        $unitVariant = UnitVariant::find($id);

        $unitVariant->unit_variant_name = $request->unit_variant_name;
        $unitVariant->unit_type_id = $request->unit_type;
        $unitVariant->save();


        //Floor Level
        $floorLevel_arr = $request->floor_level;
        $floorLevelkey_arr = $request->floor_level_key;
        $variant_floorlevel_arr = [];

        if ((isset($floorLevel_arr)) && !empty($floorLevel_arr)) {
            foreach ($floorLevel_arr as $key => $floorlevel) {

                if (isset($floorLevelkey_arr[$key]) && $floorLevelkey_arr[$key] != '') {

                    $floorlevel_id = $floorLevelkey_arr[$key];
                    $data = array("floor_level_name" => $floorlevel);
                    VariantFloorLevel::where('id', $floorlevel_id)->update($data);
                    
                } else {
                    $variant_floorlevel_arr[] = new VariantFloorLevel(['floor_level_name' => $floorlevel, 'unit_variant_id' => $id]);
                }
            }

            if (!empty($variant_floorlevel_arr))
                $unitVariant->variantFloorlevel()->saveMany($variant_floorlevel_arr);
        }
        
          return redirect("/admin/project/" . $project_id . "/bunglow/" . $id . '/edit');
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
