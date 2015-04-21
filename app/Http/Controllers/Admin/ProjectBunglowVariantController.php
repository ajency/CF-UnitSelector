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
use CommonFloor\RoomType;
use CommonFloor\Media;
use CommonFloor\VariantMeta;

class ProjectBunglowVariantController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $unitTypes = [];
        $projectPropertytypeId = 0;
        foreach ($projectPropertytype as $propertyTypes) {
             if ($propertyTypes['property_type_id'] == '2')
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType) {
            $unitTypeIdArr[] = $unitType['id'];
            $unitTypes[$unitType['id']] = $unitType['unittype_name'];
        }

        $unitvariantArr = UnitVariant::whereIn('unit_type_id', $unitTypeIdArr)->orderBy('unit_variant_name')->get()->toArray();

        return view('admin.project.listvariant')
                        ->with('project', $project->toArray())
                        ->with('unitTypes', $unitTypes)
                        ->with('unit_variant_arr', $unitvariantArr)
                        ->with( 'current', 'bunglow-variant' );
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

            if ($propertyTypes['property_type_id'] == '2')
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $propertyTypeAttributes = ProjectPropertyType::find($projectPropertytypeId)->attributes->toArray();


        return view('admin.project.addvariant')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_type_arr', $unitTypeArr)
                        ->with('project_property_type_attributes', $propertyTypeAttributes)
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
        $unitVariant->carpet_area = $request->input('carpet_area');
        $unitVariant->built_up_area = $request->input('builtup_area');
        $unitVariant->super_built_up_area = $request->input('superbuiltup_area');
        $unitVariant->per_sq_ft_price = $request->input('per_sq_ft_price');
        $attributedata = $request->input('attributes');
        $attributeStr = serialize($attributedata);
        $unitVariant->variant_attributes = $attributeStr;
        $unitVariant->save();
        $unitVariantID = $unitVariant->id;        
        
      
        $variantMeta = new VariantMeta();
        $variantMeta->unit_variant_id = $unitVariantID;
        $variantMeta->meta_key = 'gallery';
        $variantMeta->meta_value = serialize('');
        $variantMeta->save();
 
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

            if ($propertyTypes['property_type_id'] == '2')
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $roomTypeArr = $project->roomTypes()->get()->toArray();
        $variantRooms = $unitVariant->variantRoomAttributes()->get()->toArray();
        $variantRoomArr = [];
        $propertyTypeAttributes = ProjectPropertyType::find($projectPropertytypeId)->attributes->toArray();
        $roomTypeAttributes = [];


        foreach ($variantRooms as $room) {
            $variantRoomArr[$room['floorlevel']][$room['id']]['ROOMTYPEID'] = $room['roomtype_id'];
            $variantRoomArr[$room['floorlevel']][$room['id']]['ATTRIBUTES'] = unserialize($room['variant_room_attributes']);

            $roomTypeAttributes[$room['roomtype_id']] = RoomType::find($room['roomtype_id'])->attributes->toArray();
        }

        $variantMeta = $unitVariant->variantMeta()->get()->toArray();
        $levelImages = [];

        foreach ($variantMeta as $meta) {
            $metakey = $meta['meta_key'];
            if($metakey =='gallery')
            {
                $metaValue = unserialize($meta['meta_value']); 
                if(!empty($metaValue))
                {
                    foreach ($metaValue as $mediaId)
                    {
                        if (is_numeric($mediaId)) {
                            $imageName = Media::find($mediaId)->image_name;
                            $levelImages['gallery'][$mediaId]['ID'] = $mediaId;
                            $levelImages['gallery'][$mediaId]['IMAGE'] = url() . "/projects/" . $project_id . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                        }
                    }
                }
            }
            else
            {
                $metakeyData = explode("-", $metakey);
                $level = $metakeyData[0];
                $type = $metakeyData[1];
                $mediaId = $meta['meta_value'];
                if (is_numeric($mediaId)) {
                    $imageName = Media::find($mediaId)->image_name;
                    $levelImages[$level][$type]['ID'] = $mediaId;
                    $levelImages[$level][$type]['IMAGE'] = url() . "/projects/" . $project_id . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                }
            }
        }
      

        return view('admin.project.editvariant')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('project_property_type_attributes', $propertyTypeAttributes)
                        ->with('unit_type_arr', $unitTypeArr)
                        ->with('room_type_arr', $roomTypeArr)
                        ->with('unitVariant', $unitVariant->toArray())
                        ->with('floorlevelRoomAttributes', $variantRoomArr)
                        ->with('roomTypeAttributes', $roomTypeAttributes)
                        ->with('levellayout', $levelImages)
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
        $unitVariant->carpet_area = $request->input('carpet_area');
        $unitVariant->built_up_area = $request->input('builtup_area');
        $unitVariant->super_built_up_area = $request->input('superbuiltup_area');
        $unitVariant->per_sq_ft_price = $request->input('per_sq_ft_price');
        $attributedata = $request->input('attributes');
        $attributeStr = serialize($attributedata);
        $unitVariant->variant_attributes = $attributeStr;
        $unitVariant->save();

        return redirect("/admin/project/" . $project_id . "/bunglow-variant/" . $id . '/edit');
    }

    public function roomtypeAttributes($project_id, $id, Request $request) {
        $data = $request->all(); 


        //Floor Level
        $floorLevelArr = $data['floorlevel'];
        $variantRoomArr = [];

        if ((isset($floorLevelArr)) && !empty($floorLevelArr)) {
            foreach ($floorLevelArr as $floorlevel) {
                $roomTypes = $data['room_name_' . $floorlevel];
                $variantRoomId = $data['variantroomid_' . $floorlevel];

                foreach ($roomTypes as $key => $roomtypeId) {

                    if ($roomtypeId) {
                        if ($variantRoomId[$key] == '') {
                            $variantRoom = new VariantRoom();
                            $variantRoom->unit_variant_id = $id;
                            $variantRoom->roomtype_id = $roomtypeId;
                            $variantRoom->floorlevel = $floorlevel;
                            $variantRoom->variant_room_attributes = serialize($data['attributes'][$floorlevel][$roomtypeId]);
                            $variantRoom->save();
                        } else {
                            $variantRoom = VariantRoom::find($variantRoomId[$key]);
                            $variantRoom->roomtype_id = $roomtypeId;
                            $variantRoom->variant_room_attributes = serialize($data['attributes'][$floorlevel][$roomtypeId]);
                            $variantRoom->save();
                        }
                    }
                }
            }
        }

        return response()->json([
                    'code' => 'unit_variant',
                    'message' => ' Unit Variant Attribute Successfully Updated',
                    'data' => [
                        'unitVariantId' => $id
                    ]
                        ], 201);
    }

    public function getRoomTypeAttributes($project_id, $id, Request $request) {
        $roomTypeId = $request->input('roomtype_id');
        $str = '';
        if ($roomTypeId != '') {
            $level = $request->input('level');
            $roomType = RoomType::find($roomTypeId);
            $attributes = $roomType->attributes->toArray();


            $str = '<div class="m-t-10">';
            $str.='<div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 text-grey">';
            $str.='<div class="row">';
            foreach ($attributes as $attribute) {
                $str.='<div class="col-md-4">';
                $str.='<div class="form-group">';
                $str.='<label class="form-label">' . $attribute['label'] . '</label>';
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


                $str.='</div>';
                $str.='</div>';
            }
            $str.='</div>';

            $str.='</div>';
            $str.='</div>';
        }
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
    public function destroy($id) {
        //
    }

}
