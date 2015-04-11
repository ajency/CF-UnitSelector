<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\UnitType;
use CommonFloor\VariantRoom;
use CommonFloor\UnitVariant;
use CommonFloor\ProjectPropertyType;

class ProjectBunglowVariantController extends Controller {

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
            $propertyTypeArr[] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id']=='2')
                $projectPropertytypeId = $propertyTypes['id'];
        }
        
        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr =[];
        foreach($unitTypeArr as $unitType)
        {
            $unitTypeIdArr[] =$unitType['id'];
        }
       
        $unitvariantArr = UnitVariant::whereIn('unit_type_id',$unitTypeIdArr)->orderBy('unit_variant_name')->get()->toArray();
 
        return view('admin.project.listvariant')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_variant_arr', $unitvariantArr)
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
        $projectPropertytypeId = 0;
        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id']=='2')
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $roomTypeArr = $project->roomTypes()->get()->toArray();

        return view('admin.project.addvariant')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_type_arr', $unitTypeArr)
                        ->with('room_type_arr', $roomTypeArr)
                        ->with('current', '');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($project_id, Request $request) {
        $unitVariant = new UnitVariant();
        $unitVariant->unit_variant_name = $request->input('unit_variant_name');
        $unitVariant->unit_type_id = $request->input('unit_type');
        $unitVariant->save();
        $unitVariantID = $unitVariant->id;

        //Floor Level
        $floorLevelArr = $request->input('floorlevel');
        $variantRoomArr = [];

        if ((isset($floorLevelArr)) && !empty($floorLevelArr)) {
            foreach ($floorLevelArr as $floorlevel) {
                $roomTypes = $request->input('room_name_' . $floorlevel);
                
                foreach ($roomTypes as $key => $roomtypeId) {
                    $variantRoom = new VariantRoom();
                    $variantRoom->unit_variant_id = $unitVariantID;
                    $variantRoom->roomtype_id = $roomtypeId;
                    $variantRoom->floorlevel = $floorlevel;
                    //$variantRoom->variant_room_attributes = '';
                    $variantRoom->save();
                }
            }
        }


        return redirect("/admin/project/" . $project_id . "/bunglow-variant/" . $unitVariantID . '/edit');
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
        $project = $projectRepository->getProjectById($project_id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];

        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id']=='2')
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $roomTypeArr = $project->roomTypes()->get()->toArray();
        $variantRooms = $unitVariant->variantRoomAttributes()->get()->toArray();
        $variantRoomArr = [];
        $propertyTypeAttributes = ProjectPropertyType::find($projectPropertytypeId)->attributes->toArray();
         

        foreach ($variantRooms as $room) {
            $variantRoomArr[$room['floorlevel']][$room['id']]['ROOMTYPEID'] = $room['roomtype_id'];
            $variantRoomArr[$room['floorlevel']][$room['id']]['ATTRIBUTES'] = $room['variant_room_attributes'];
        }


        return view('admin.project.editvariant')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('project_property_type_attributes', $propertyTypeAttributes)
                        ->with('unit_type_arr', $unitTypeArr)
                        ->with('room_type_arr', $roomTypeArr)
                        ->with('unitVariant', $unitVariant->toArray())
                        ->with('floorlevelRoomAttributes', $variantRoomArr)
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
        $unitVariant->unit_variant_name = $request->input('unit_variant_name');
        $unitVariant->unit_type_id = $request->input('unit_type');
        $unitVariant->save();


        //Floor Level
        $floorLevelArr = $request->input('floorlevel');
        $variantRoomArr = [];

        if ((isset($floorLevelArr)) && !empty($floorLevelArr)) {
            foreach ($floorLevelArr as $floorlevel) {
                $roomTypes = $request->input('room_name_' . $floorlevel); 
                $variantRoomId = $request->input('variantroomid_' . $floorlevel); 
                 
                foreach ($roomTypes as $key => $roomtypeId) {
                   
                    if($roomtypeId)
                    {
                        if ($variantRoomId[$key] == '') {
                            $variantRoom = new VariantRoom();
                            $variantRoom->unit_variant_id = $id;
                            $variantRoom->roomtype_id = $roomtypeId;
                            $variantRoom->floorlevel = $floorlevel;
                            //$variantRoom->variant_room_attributes = '';
                            $variantRoom->save();
                        } else {  
                            $variantRoom = VariantRoom::find($variantRoomId[$key]);
                            $variantRoom->roomtype_id = $roomtypeId;
                            //$variantRoom->variant_room_attributes = '';
                            $variantRoom->save();
                        }
                    }
                }
            }
        }

        return redirect("/admin/project/" . $project_id . "/bunglow-variant/" . $id . '/edit');
    }
    
    public function unitVariant($project_id, $id, Request $request)
    {
        $unitVariant = UnitVariant::find($id);
        $datainput = $request->input( 'variantattrData' );
        $data = [];
        foreach ($datainput as $input) {
            $data[$input['name']]= $input['value'];
        }
        $attributedata = $data;
        unset( $attributedata['carpet_area'] );
        unset( $attributedata['buildup_area'] );
        unset( $attributedata['superbuildup_area'] );
       
        $attributeStr ='';
        if(!empty($attributedata))
        {
            foreach($attributedata as $key=>$attribute)
                $attributeStr .= $key .':'.$attribute .'||';
        }    
        
        $unitVariant->carpet_area = $data['carpet_area'];
        $unitVariant->build_up_area = $data['buildup_area'];
        $unitVariant->super_build_up_area = $data['superbuildup_area'];
        $unitVariant->variant_attributes = $attributeStr;
        $unitVariant->save();
        
        return response()->json( [
                    'code' => 'unit_variant',
                    'message' => ' Unit Variant Attribute Successfully Updated',
                    'data' => [
                        'unitVariantId' => $id
                    ]
            ], 201 );
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
