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
use CommonFloor\Defaults;
use \File;

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
             if ($propertyTypes['property_type_id'] == BUNGLOWID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType) {
            $unitTypeIdArr[] = $unitType['id'];
            $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
            $unitTypes[$unitType['id']] = $unitTypeName;
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

            if ($propertyTypes['property_type_id'] == BUNGLOWID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypes = [];
        foreach ($unitTypeArr as $unitType) {
            $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
            $unitTypes[$unitType['id']] = $unitTypeName;
        }
        
        $availableRoomTypeData = $project->roomTypes()->get()->toArray();
        $availableRoomTypes = [];
        foreach ($availableRoomTypeData as $availableRoomType)
        {
            $availableRoomTypes[$availableRoomType['id']] = Defaults::find($availableRoomType['name'])->label;
        }
        $propertyTypeAttributes = ProjectPropertyType::find($projectPropertytypeId)->attributes->toArray();


        return view('admin.project.addvariant')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with( 'projectPropertyTypeID', $projectPropertytypeId )
                         ->with( 'availableRoomTypes', $availableRoomTypes )
                        ->with('unitTypes', $unitTypes)
                        ->with('project_property_type_attributes', $propertyTypeAttributes)
                        ->with( 'current', 'bunglow-variant' );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($project_id, Request $request) {
         
        $unitVariant = new UnitVariant();
        $unitVariant->unit_variant_name = ucfirst($request->input('unit_variant_name'));
        $unitVariant->unit_type_id = $request->input('unit_type');
        $unitVariant->carpet_area = $request->input('carpet_area');
        $unitVariant->built_up_area = $request->input('builtup_area');
        $unitVariant->super_built_up_area = $request->input('superbuiltup_area');
        $unitVariant->per_sq_ft_price = $request->input('per_sq_ft_price');
        $attributedata = $request->input('villa_attributes');
        $variantattributedata=[];
        if(!empty($attributedata))
        {
            foreach ($attributedata as $key=>$value)
               $variantattributedata[$key]= $value;    
        }
        $attributeStr = serialize( $variantattributedata );
        $unitVariant->variant_attributes = $attributeStr;
        $unitVariant->save();
        $unitVariantID = $unitVariant->id;  
        
        $targetDir = public_path() . "/projects/" . $project_id . "/variants/" . $unitVariantID . "/";
        $tempDir = public_path() . "/projects/" . $project_id . "/variants/temp/";
        File::makeDirectory($targetDir, $mode = 0755, true, true);
        
        
        $image_gallery = $request->input('image_gallery');
        if(!empty($image_gallery))
        {
            foreach ($image_gallery as $mediaId)
            {
                $media = Media::find($mediaId);
                $media->mediable_id = $unitVariantID;
                $media->save();

                $imageName = $media->image_name;
                if(File::exists($tempDir.$imageName))
                {
                    copy($tempDir.$imageName, $targetDir.$imageName);
                    unlink($tempDir.$imageName);
                }
            }
        }
        $variantMeta = new VariantMeta();
        $variantMeta->unit_variant_id = $unitVariantID;
        $variantMeta->meta_key = 'gallery';
        $variantMeta->meta_value = serialize($image_gallery);
        $variantMeta->save();
        
        $levels = $request->input('levels');
        foreach($levels as $level)
        {
            $twoDImageId = $request->input('image_'.$level.'_2d_id');
            if($twoDImageId!='')
            {
                $variantMeta = new VariantMeta();
                $variantMeta->unit_variant_id = $unitVariantID;
                $variantMeta->meta_key = $level.'-2d';
                $variantMeta->meta_value = $twoDImageId;
                $variantMeta->save();
                $media = Media::find($twoDImageId);
                $media->mediable_id = $unitVariantID;
                $media->save();
                
                $imageName = $media->image_name;
                if(File::exists($tempDir.$imageName))
                {
                    copy($tempDir.$imageName, $targetDir.$imageName);
                    unlink($tempDir.$imageName);
                }
            } 
            $threeDImageId = $request->input('image_'.$level.'_3d_id');
            if($threeDImageId!='')
            {
                $variantMeta = new VariantMeta();
                $variantMeta->unit_variant_id = $unitVariantID;
                $variantMeta->meta_key = $level.'-3d';
                $variantMeta->meta_value = $threeDImageId;
                $variantMeta->save();
                $media = Media::find($threeDImageId);
                $media->mediable_id = $unitVariantID;
                $media->save();
                
                $imageName = $media->image_name;
                if(File::exists($tempDir.$imageName))
                {
                    copy($tempDir.$imageName, $targetDir.$imageName);
                    unlink($tempDir.$imageName);
                }
            } 
            
            $externalimage = $request->input('image_external_3d_id');
            if($externalimage!='')
            {
                $variantMeta = new VariantMeta();
                $variantMeta->unit_variant_id = $unitVariantID;
                $variantMeta->meta_key = 'external-3d';
                $variantMeta->meta_value = $externalimage;
                $variantMeta->save();
                $media = Media::find($externalimage);
                $media->mediable_id = $unitVariantID;
                $media->save();
                
                $imageName = $media->image_name;
                if(File::exists($tempDir.$imageName))
                {
                    copy($tempDir.$imageName, $targetDir.$imageName);
                    unlink($tempDir.$imageName);
                }
            } 
            
            $attributes = $request->input('attributes'); 
            $roomIds = $request->input('room_id');
            if(!empty($roomIds[$level]))
            {
            foreach($roomIds[$level] as $roomId)
            {
                if (isset($attributes[$level][$roomId])) {

                    $variantRoom = new VariantRoom();
                    $variantRoom->unit_variant_id = $unitVariantID;
                    $variantRoom->roomtype_id = $roomId;
                    $variantRoom->floorlevel = $level;
                    $variantRoom->variant_room_attributes = serialize($attributes[$level][$roomId]);
                    $variantRoom->save();

                }
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
        $propertyTypeArr =$availableRoomTypes= [];

        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == BUNGLOWID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypes = [];
        foreach ($unitTypeArr as $unitType) {
            $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
            $unitTypes[$unitType['id']] = $unitTypeName;
        }
        
        $RoomTypes = $project->roomTypes()->get()->toArray();
        foreach($RoomTypes as $RoomType)
        {
            $availableRoomTypes[$RoomType['id']]=Defaults::find($RoomType['name'])->label;
        }
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
        $layouts = [];

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
                            $layouts['gallery'][$mediaId]['ID'] = $mediaId;
                            $layouts['gallery'][$mediaId]['IMAGE'] = url() . "/projects/" . $project_id . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
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
                    $layouts[$level][$type]['ID'] = $mediaId;
                    $layouts[$level][$type]['IMAGE'] = url() . "/projects/" . $project_id . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                }
            }
        }
      
 
        return view('admin.project.editvariant')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with( 'projectPropertyTypeID', $projectPropertytypeId )
                        ->with('project_property_type_attributes', $propertyTypeAttributes)
                        ->with('unitTypes', $unitTypes)
                        ->with( 'availableRoomTypes', $availableRoomTypes )
                        ->with('unitVariant', $unitVariant->toArray())
                        ->with('variantRooms', $variantRoomArr)
                        ->with('roomTypeAttributes', $roomTypeAttributes)
                        ->with('layouts', $layouts)
                        ->with( 'current', 'bunglow-variant' );
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
        $unitVariant->unit_variant_name = ucfirst($request->input('unit_variant_name'));
        $unitVariant->unit_type_id = $request->input('unit_type');
        $unitVariant->carpet_area = $request->input('carpet_area');
        $unitVariant->built_up_area = $request->input('builtup_area');
        $unitVariant->super_built_up_area = $request->input('superbuiltup_area');
        $unitVariant->per_sq_ft_price = $request->input('per_sq_ft_price');
        $attributedata = $request->input('villa_attributes');
        $variantattributedata=[];
        if(!empty($attributedata))
        {
            foreach ($attributedata as $key=>$value)
               $variantattributedata[$key]= $value;    
        }
        
        $attributeStr = serialize( $variantattributedata );
        $unitVariant->variant_attributes = $attributeStr;
        $unitVariant->save();
        
        $levels = $request->input('levels');
        $attributes = $request->input('attributes');  
        $variantRoomId = $request->input('variantroomid');//dd($variantRoomId);
        $roomIds = $request->input('room_id'); //dd($roomIds);
        
        foreach($levels as $level)
        {
             if(!empty($roomIds[$level]))
            {
            foreach($roomIds[$level] as $key=> $roomId)
            {
                if (isset($attributes[$level][$roomId])) {
                    
                 
                     if ($variantRoomId[$level][$key] == '') {
                            $variantRoom = new VariantRoom();
                            $variantRoom->unit_variant_id = $id;
                            $variantRoom->roomtype_id = $roomId;
                            $variantRoom->floorlevel = $level;
                            $variantRoom->variant_room_attributes = serialize($attributes[$level][$roomId]);
                            $variantRoom->save();
                        } else {
                            $variantRoom = VariantRoom::find($variantRoomId[$level][$key]);
                            $variantRoom->roomtype_id = $roomId;
                            $variantRoom->variant_room_attributes = serialize($attributes[$level][$roomId]);
                            $variantRoom->save();
                        }

                }
            }
            }
        }

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
