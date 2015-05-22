<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\RoomType;
use CommonFloor\Attribute;
use CommonFloor\ProjectPropertyType;
use \Input;

class ProjectRoomTypeController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($id, ProjectRepository $projectRepository) {

        $project = $projectRepository->getProjectById($id);

        return view('admin.project.addroom')
                        ->with('project', $project->toArray())
                        ->with('current', 'room_type');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($projectId, Request $request) {

        $roomtype_name = $request['room_name'];

        $roomtype = new RoomType();
        $roomtype->project_id = $projectId;
        $roomtype->name = ucfirst($roomtype_name);
        $roomtype->save();

        $roomtypeId = $roomtype->id;

        $objecttype = 'RoomType';

        $attributeNameArr = $request['attribute_name_room'];
        $controlTypeArr = $request['controltype_room'];
        $controlValueArr = (isset($request['controltypevalues_room'])) ? $request['controltypevalues_room'] : [];

        $attributes = [];


        if (!empty($attributeNameArr)) {
            foreach ($attributeNameArr as $key => $attributeName) {
                $attributeName = ucfirst($attributeName);
                $controlType = $controlTypeArr[$key];
                $controlValues = (isset($controlValueArr[$key])) ? $controlValueArr[$key] : '';

                if ($attributeName != '')
                    $attributes[] = new Attribute(['label' => $attributeName, 'control_type' => $controlType, 'defaults' => $controlValues,
                        'object_type' => $objecttype, 'object_id' => $roomtypeId]);

                if (!empty($attributes)) {
                    $roomType = RoomType::find($roomtypeId);
                    $roomType->attributes()->saveMany($attributes);
                }
            }
        }
        return redirect("/admin/project/" . $projectId . "/roomtype/" . $roomtypeId . "/edit");
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
    public function edit($projectId, $id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($projectId);
        $room = RoomType::find($id);
        $availableRoomTypes = $project->roomTypes()->get()->toArray();

        $roomtypeAttribute['ATTRIBUTES'] = $room->attributes->toArray();

        return view('admin.project.editroom')
                        ->with('project', $project->toArray())
                        ->with('room', $room->toArray())
                        ->with('availableRoomTypes', $availableRoomTypes)
                        ->with('roomtypeAttributes', $roomtypeAttribute)
                        ->with('current', 'room_type');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($projectId, $roomId, Request $request) {
        $roomType = RoomType::find($roomId);
        $roomtype_name = $request['room_name'];
        $roomType->name = ucfirst($roomtype_name);
        $roomType->save();

        $objecttype = 'RoomType';
 
        $attributeNameArr = $request['attribute_name_room'];
        $controlTypeArr = $request['controltype_room'];
        $controlValueArr = (isset($request['controltypevalues_room'])) ? $request['controltypevalues_room'] : [];
        $attributeIdArr = $request['attribute_id_room'];

        if (!empty($attributeNameArr)) {
            foreach ($attributeNameArr as $key => $attributeName) {
                $attributeName = ucfirst($attributeName);
                $controlType = $controlTypeArr[$key];
                $controlValues = (isset($controlValueArr[$key])) ? $controlValueArr[$key] : '';
                $attributeId = $attributeIdArr[$key];

                if ($attributeId == '') {
                    if ($attributeName != '')
                        $attributes[] = new Attribute(['label' => $attributeName, 'control_type' => $controlType, 'defaults' => $controlValues,
                            'object_type' => $objecttype, 'object_id' => $roomId]);
                } else {
                    $data = array("label" => $attributeName, "control_type" => $controlType, 'defaults' => $controlValues);
                    Attribute::where('id', $attributeId)->update($data);
                }
                if (!empty($attributes)) {
                   $roomType->attributes()->saveMany($attributes);
                }
            }
        }

        return redirect("/admin/project/" . $projectId . "/roomtype/" . $roomId . "/edit");
        //
    }
    
    public function getRoomTypeAttributes($project_id, $roomTypeId, Request $request) {
 
            $str = '';
     
            $level = $request->input('level');
            $type = $request->input('type');
            $roomType = RoomType::find($roomTypeId);
            $attributes = $roomType->attributes->toArray();
            
            $str .= ($type=="add")?'<div class="p-r-15 p-l-15 roomattribute_'.$level.'_'.$roomTypeId.'">':'';
            $str .= '<div class="text-right">';
            $str .= '<button type="button" class ="btn btn-white btn-small"   onClick="openRoomTypeModal(this,'.$roomTypeId.');"><i class = "fa fa-pencil"></i></button> ';
            $str .= '<button type="button" class="btn btn-white btn-small"><i class="fa fa-trash"></i></button>';
            $str .= '</div>';
            $str .= ' <div class="row">';
            $str .= '<div class = "col-md-4">';
            $str .= '<div class="form-group">';
            $str .= '<label class = "form-label"></label>';
            $str .= '<div class="input-with-icon  right">';
            $str .= '<i class = ""></i><input type="hidden" name="variantroomid[]" value="">';
            $str .= 'Room Name :'.$roomType->name;
            $str .= '<input type="hidden" name="room_id[]" value="'.$roomTypeId.'">';
            $str .= ' </div>';
            $str .= ' </div> ';
            $str .= '</div>';
            if(!empty($attributes))
             {
                foreach ($attributes as $attribute) {
            $str .= '<div class = "col-md-4">';
            $str .= '<div class = "form-group">';
            $str .= '<label class = "form-label">' . $attribute['label'] . '</label>';

            if ('textbox' === $attribute['control_type']) {
                        $str.='<input type="text" class="form-control" name="attributes[' . $level . '][' . $roomTypeId . '][' . property_type_slug($attribute['label']) . ']" placeholder="Enter ' . $attribute['label'] . '">';
                    } elseif ('number' === $attribute['control_type']) {
                        $str.='<input type="number" class="form-control" name="attributes[' . $level . '][' . $roomTypeId . '][' . property_type_slug($attribute['label']) . ']" placeholder="Enter ' . $attribute['label'] . '">';
                    } elseif ('select' === $attribute['control_type']) {
                        $options = explode(',', $attribute['defaults']);

                        $str.='<select name="attributes[' . $level . '][' . $roomTypeId . '][' . property_type_slug($attribute['label']) . ']" class="select2 form-control">';
                        $str.='<option value="">Select ' . $attribute['label'] . '</option>';
                        foreach ($options as $option) {
                            $str.='<option value="' . property_type_slug($option) . '">' . $option . '</option>';
                        }
                        $str.='</select>';
                    } elseif ('multiple' === $attribute['control_type']) {
                        $options = explode(',', $attribute['defaults']);

                        $str.='<select multiple name="attributes[' . $level . '][' . $roomTypeId . '][' . property_type_slug($attribute['label']) . '][]" class="select2 form-control">';
                        $str.='<option value="">Select ' . $attribute['label'] . '</option>';
                        foreach ($options as $option) {
                            $str.='<option value="' . property_type_slug($option) . '">' . $option . '</option>';
                        }
                        $str.='</select>';
                    }

                    $str .= '</div>';
            $str .= '</div>';
            }
        }
        else
        {
            $str .= '<div class = "col-md-4">';
            $str .= '<div class = "form-group">';
            $str .= '<label class = "form-label">Room Attributes Not Defined</label>';
             
            $str .= '</div>';
            $str .= '</div>';
        
        }
        $str .= '</div>';
        $str .= ($type=="add")?'</div>':'';

        
         
        return response()->json([
                    'code' => 'roomtype_attributes',
                    'message' => '',
                    'data' => [
                        'attributes' => $str
                    ]
                        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($project_id, $id) {
        RoomType::find($id)->delete();

        return response()->json([
                    'code' => 'roomtype_deleted',
                    'message' => 'Room Type Successfully Deleted'
                        ], 204);
    }

    public function deleteRoomTypeAttribute($project_id, $id) {
        Attribute::find($id)->delete();

        return response()->json([
                    'code' => 'roomtypeattribute_deleted',
                    'message' => 'Room Type Attribute Successfully Deleted'
                        ], 204);
    }

}
