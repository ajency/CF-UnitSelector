<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
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

        return view('admin.project.roomtype')
                        ->with('project', $project->toArray())
                        ->with('current', 'room_type');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request) {
        $project_id = $request->input('project_id');
        $roomtype_name = $request->input('room_typename');

        $roomtype = new RoomType();
        $roomtype->project_id = $project_id;
        $roomtype->name = $roomtype_name;
        $roomtype->save();

        $roomtype_id = $roomtype->id;


        return response()->jason([
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
    public function update($project_id, $refferece_id, Request $request) {
        $refferece_type = $request->input('reffrence_type');
        if ($refferece_type == 'room_type') {
            $roomType = RoomType::find($roomtype_id);
            $roomtype_name = $request->input('room_typename');

            $roomType->name = $roomtype_name;
            $roomType->save();
            
            $objecttype= 'CommonFloor\RoomType';
        }
        elseif($refferece_type == 'property') {
             $objecttype= 'CommonFloor\Project';
        }

        $attribute_name_arr = $request->input('attribute_name_' . $refferece_id);
        $control_type_arr = $request->input('controltype_' . $refferece_id);
        $control_value_arr = $request->input('controlvalue_' . $refferece_id);
        $attribute_id_arr = $request->input('attribute_id_' . $refferece_id);

        $attribute = [];


        if (!empty($attribute_name)) {
            foreach ($attribute_name as $key => $attribute) {
                $control_type = $control_type_arr[$key];
                $control_vaues = $control_value_arr[$key];
                $attribute_id = $attribute_id_arr[$key];

                if ($attribute_id == '') {
                    $attribute = new Attribute();

                    $attribute[] = new Attribute(['label' => $attribute, 'control_type' => $control_type, 'default' => $control_vaues,
                        'object_type' => $objecttype, 'object_id' => $roomtype_id]);
                } else {
                    $data = array("label" => $attribute, "control_type" => $control_type, 'default' => $control_vaues);
                    Attribute::where('id', $attribute_id)->update($data);
                }
            }

            if (!empty($attribute))
                $roomType->attributes()->saveMany($attribute);
        }


        return response()->jason([
                    'code' => 'room_type_attributes',
                    'message' => 'Room Type Attributes Successfully Created',
                    'data' => ['refferece_id' => $refferece_id]
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
