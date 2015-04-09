<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\RoomType;
use CommonFloor\Attribute;


class ProjectRoomTypeController extends Controller {

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
        $roomType_arr = $project->roomTypes()->get();
        $roomtypeAttribute = [];
        
        
        $projectPropertytype = $project->projectPropertyTypes()->select('property_type_id')->get()->toArray();
        $propertytypeAttribute =[];
        $propertyTypeArr =[];
        
        foreach ($projectPropertytype as $property_types)
              foreach ($property_types as $types)
             {
                    $propertyTypeArr []= $types;                
             }

        foreach ($roomType_arr as $roomType) {
            $roomtypeAttribute[$roomType['id']]['NAME'] = $roomType['name'];
            $roomtypeAttribute[$roomType['id']]['ATTRIBUTES'] = $roomType->attributes->toArray();
        }

        return view('admin.project.roomtype')
                        ->with('project', $project->toArray())
                        ->with('propertytypeAttribute', $propertytypeAttribute)
                        ->with('roomtypeAttributes', $roomtypeAttribute)
                         ->with('project_property_type', $propertyTypeArr)
                        ->with('current', 'room_type');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request) {
        $project_id = $request->input('project_id');
        $roomtype_name = $request->input('roomtypename');

        $roomtype = new RoomType();
        $roomtype->project_id = $project_id;
        $roomtype->name = $roomtype_name;
        $roomtype->save();

        $roomtype_id = $roomtype->id;


        return response()->json([
                    'code' => 'room_type',
                    'message' => 'Room Type Successfully Created',
                    'data' => ['roomtype_id' => $roomtype_id]
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
    public function update($project_id, $reffereceId, Request $request) {
        $reffereceType = $request->input('reffrence_type');
        $datainput = $request->input('roomtypeattrData');
        $data = [];
        $attribute = [];
        foreach ($datainput as $input) {
            $data[$input['name']][] = $input['value'];
        }

        $attribute_name_arr = $data['attribute_name_' . $reffereceId];
        $control_type_arr = $data['controltype_' . $reffereceId];
        $control_value_arr = $data['controltypevalues_' . $reffereceId];
        $attribute_id_arr = $data['attribute_id_' . $reffereceId];

        if ($reffereceType == 'room_type') {
            $roomType = RoomType::find($reffereceId);
            $roomtype_name = $data['room_typename_' . $reffereceId][0];

            $roomType->name = $roomtype_name;
            $roomType->save();

            $objecttype = 'RoomType';
        } elseif ($reffereceType == 'property_type') {
            $project = Project::find($project_id);
            $objecttype = 'PropertyType';
            $reffereceidArr= explode('_', $reffereceId);
            $reffereceId = $reffereceidArr[1];
        }


        if (!empty($attribute_name_arr)) {
            foreach ($attribute_name_arr as $key => $attribute_name) {
                $control_type = $control_type_arr[$key];
                $control_vaues = (isset($control_value_arr[$key]))?$control_value_arr[$key]:'';
                $attribute_id = $attribute_id_arr[$key];

                if ($attribute_id == '') {
                    if ($attribute_name != '')
                        $attribute[] = new Attribute(['label' => $attribute_name, 'control_type' => $control_type, 'defaults' => $control_vaues,
                            'object_type' => $objecttype, 'object_id' => $reffereceId]);
                } else {
                    $data = array("label" => $attribute_name, "control_type" => $control_type, 'defaults' => $control_vaues);
                    Attribute::where('id', $attribute_id)->update($data);
                }
            }

            if (!empty($attribute)) {
                if ($reffereceType == 'room_type')
                    $roomType->attributes()->saveMany($attribute);
                elseif ($reffereceType == 'property_type')
                    Attribute::create ($attribute);
            }
        }


        return response()->json([
                    'code' => 'room_type_attributes',
                    'message' => 'Room Type Attributes Successfully Created',
                    'data' => ['refferece_id' => $reffereceId]
                        ], 201);
        //
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
