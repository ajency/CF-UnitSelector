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
use CommonFloor\Defaults;
use CommonFloor\VariantRoom;
use \Session;

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
        $defaultRoomType = Defaults::where('type','room_types')->get()->toArray();
        return view('admin.project.addroom')
                        ->with('project', $project->toArray())
                        ->with('defaultRoomTypes', $defaultRoomType)
                        ->with('current', 'room_type');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($projectId, Request $request) {

        $roomtype_name = $request['room_name'];
        if($roomtype_name =='')
        {
            return redirect("/admin/project/" . $projectId . "/roomtype/create"); 
        }
        if(isset($request['roomtypecustome']))
        {
            $default = new Defaults();
            $default->type = 'custome_room_types';
            $default->label =  ucfirst($roomtype_name);
            $default->serialize_data = serialize([]);
            $default->save();
            $roomtype_name = $default->id;
        }
        

        $roomtype = new RoomType();
        $roomtype->project_id = $projectId;
        $roomtype->name = $roomtype_name;
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

               if ($attributeName != '' && $controlType!='')
                    $attributes[] = new Attribute(['label' => $attributeName, 'control_type' => $controlType, 'defaults' => $controlValues,
                        'object_type' => $objecttype, 'object_id' => $roomtypeId]);

                if (!empty($attributes)) {
                    $roomType = RoomType::find($roomtypeId);
                    $roomType->attributes()->saveMany($attributes);
                }
            }
        }
        Session::flash('success_message','Room Successfully Created');
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
        $availableRoomTypeData = $project->roomTypes()->get()->toArray();
        $availableRoomTypes=$customeRoomTypes = [];
        foreach ($availableRoomTypeData as $availableRoomType)
        {
            $defaultRoomData = Defaults::find($availableRoomType['name']);
            $availableRoomTypes[$availableRoomType['id']] = $defaultRoomData->label;
            if($defaultRoomData->type=='custome_room_types')
            $customeRoomTypes[]=Defaults::find($availableRoomType['name'])->toArray();
        }

        $defaultRoomType = Defaults::where('type','room_types')->get()->toArray();
                 
        $roomtypeAttribute['ATTRIBUTES'] = $room->attributes->toArray();

        return view('admin.project.editroom')
                        ->with('project', $project->toArray())
                        ->with('room', $room->toArray())
                        ->with('defaultRoomTypes', $defaultRoomType)
                        ->with('customeRoomTypes', $customeRoomTypes)
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
        
       /* $roomtype_name = $request['room_name'];
        if(isset($request['roomtypecustome']))
        {
            $default = new Defaults();
            $default->type = 'custome_room_type';
            $default->label =  ucfirst($roomtype_name);
            $default->serialize_data = serialize([]);
            $default->save();
            $roomtype_name = $default->id;
        }*/
        
        $roomType = RoomType::find($roomId);
        /*$roomtype_name = $request['room_name'];
        $roomType->name = ucfirst($roomtype_name);
        $roomType->save();*/

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
                    if ($attributeName != '' && $controlType!='')
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
        Session::flash('success_message','Room Successfully Updated');
        return redirect("/admin/project/" . $projectId . "/roomtype/" . $roomId . "/edit");
        //
    }
    
    public function getRoomTypeAttributes($project_id, $roomTypeId, Request $request) {
 
            $str = '';
     
            $level = $request->input('level');
            $type = $request->input('type');
            $roomType = RoomType::find($roomTypeId);
            $attributes = $roomType->attributes->toArray();
            $roomTypeName = Defaults::find($roomType->name)->label;
            
            $str .= ($type=="add")?'<div class="p-r-15 p-l-15 variant_rooms roomattribute_'.$level.'_'.$roomTypeId.'">':'';
            $str .= '<div class="text-right">';
            $str .= '<button type="button" class ="btn btn-white btn-small"   onClick="openRoomTypeModal(this,'.$roomTypeId.');"><i class = "fa fa-pencil"></i></button> ';
            $str .= '<button type="button" class="btn btn-white btn-small remove-room-attribute"><i class="fa fa-trash"></i></button>';
            $str .= '</div>';
            $str .= ' <div class="row">';
            $str .= '<div class = "col-md-4">';
            $str .= '<div class="form-group">';
            $str .= '<label class = "form-label"></label>';
            $str .= '<div class="input-with-icon  right">';
            $str .= '<i class = ""></i><input type="hidden" name="variantroomid['.$level.'][]" value="">';
            $str .= 'Room Name :'.$roomTypeName;
            $str .= '<input type="hidden" name="room_id['.$level.'][]" value="'.$roomTypeId.'">';
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
                        $str.='<input type="number" class="form-control" name="attributes[' . $level . '][' . $roomTypeId . '][' . property_type_slug($attribute['label']) . ']" placeholder="Enter ' . $attribute['label'] . '" data-parsley-type="number">';
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

    public function deleteAttribute($project_id, $attribute_id) {
        Attribute::find($attribute_id)->delete();

        return response()->json([
                    'code' => 'attribute_deleted',
                    'message' => 'Attribute Successfully Deleted'
                        ], 204);
    }
    
    public function deleteVariantRoom($projectId, $variantRoomId) {
       
        VariantRoom::find($variantRoomId)->delete();

        return response()->json([
                    'code' => 'variantroom_deleted',
                    'message' => 'Variant Room Successfully Deleted'
                        ], 204);
    }

}
