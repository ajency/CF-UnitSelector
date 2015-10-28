<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Project;
use CommonFloor\ProjectPropertyType;
use CommonFloor\PropertyType;
use CommonFloor\UnitVariant;
use CommonFloor\VariantRoom;
use CommonFloor\UnitType;
use CommonFloor\RoomType;
use CommonFloor\Media;
use CommonFloor\VariantMeta;
use CommonFloor\Defaults;
use \File;
use \Session;

class ProjectApartmentVariantController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index( $projectId ) {
 
        $project = Project::find( $projectId );
        $unitTypes = []; 
        $projectPropertytypeIds = [];
        $propertyType = [];
        $projectPropertytypes = $project->projectPropertyTypes()->whereIn( 'property_type_id', [APARTMENTID,PENTHOUSEID] )->get()->toArray();
        
        foreach($projectPropertytypes as $projectPropertytype)
        {
             $projectPropertytypeIds[] = $projectPropertytype['id'];
        }

        $unitTypeArr = UnitType::whereIn( 'project_property_type_id', $projectPropertytypeIds )->get();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType) {   
            $unitTypeIdArr[] = $unitType->id;
            $unitTypeName = Defaults::find($unitType->unittype_name)->label;
            $unitTypes[$unitType->id] = $unitTypeName;
            $propertyTypeId = ProjectPropertyType::find($unitType->project_property_type_id)->property_type_id;
            $propertyType[$unitType->id]=  get_property_type($propertyTypeId);
        }
        $unitVariants = UnitVariant::whereIn( 'unit_type_id', $unitTypeIdArr )->orderBy( 'unit_variant_name' )->get();
        return view( 'admin.project.variants.apartment.list' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'unitVariants', $unitVariants )
                        ->with( 'unitTypes', $unitTypes)
                        ->with( 'propertyTypes', $propertyType)
                        ->with( 'current', 'apartment-variant' );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
 
        $project = Project::find( $projectId );
        $unitTypes = $propertyTypeAttributes = [];
        $propertyTypes = $project->projectPropertyTypes()->whereIn( 'property_type_id', [APARTMENTID,PENTHOUSEID] )->get()->toArray();
        $projectPropertyTypes = [];
        
        foreach($propertyTypes as $propertyType)
        {
            $projectPropertyTypes[]  = ['NAME'=>get_property_type($propertyType['property_type_id']),'ID'=>$propertyType['id']];
 
        } 
        if(count($projectPropertyTypes)==1)
        {
            
            $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertyTypes[0]['ID'])->get()->toArray();
            $unitTypes = [];
            foreach ($unitTypeArr as $unitType) {
                $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
                $unitTypes[$unitType['id']] = $unitTypeName;
            }
            $propertyTypeAttributes = ProjectPropertyType::find( $projectPropertyTypes[0]['ID'] )->attributes->toArray();
        }
        
        
        $availableRoomTypeData = $project->roomTypes()->get()->toArray();
        $availableRoomTypes = [];
        foreach ($availableRoomTypeData as $availableRoomType)
        {
            $availableRoomTypes[$availableRoomType['id']] = Defaults::find($availableRoomType['name'])->label;
        }
        
        return view( 'admin.project.variants.apartment.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'apartment-variant' )
                        ->with( 'projectPropertyTypes', $projectPropertyTypes )
                        ->with( 'unitTypes', $unitTypes )
                        ->with( 'availableRoomTypes', $availableRoomTypes )
                        ->with( 'projectPropertyTypeAttributes', $propertyTypeAttributes );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( $projectId, Request $request ) {
      
        $unitVariant = new UnitVariant();
        $unitVariant->unit_variant_name = ucfirst($request->input( 'unit_variant_name' ));
        $unitVariant->unit_type_id = $request->input( 'unit_type' );
        $unitVariant->carpet_area = $request->input( 'carpet_area' );
        $unitVariant->built_up_area = $request->input( 'builtup_area' );
        $unitVariant->super_built_up_area = $request->input( 'superbuiltup_area' );
        $unitVariant->per_sq_ft_price = $request->input('per_sq_ft_price');
        $attributedata = $request->input( 'apartment_attributes' );
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
        
        $targetDir = public_path() . "/projects/" . $projectId . "/variants/" . $unitVariantID . "/";
        $tempDir = public_path() . "/projects/" . $projectId . "/variants/temp/";
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
        $propertyType = $request->input('property_type');
        $propertyTypeId = ProjectPropertyType::find($propertyType)->property_type_id;
        foreach($levels as $level)
        {
            if($propertyTypeId==APARTMENTID && $level!=0)
                continue;
            
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
        Session::flash('success_message','Variant Successfully Created');
        return redirect( "/admin/project/" . $projectId . "/apartment-variant/" . $unitVariantID . '/edit' );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $id ) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit( $projectId, $id ) {
 
        $unitVariant = UnitVariant::find( $id );
        $project = Project::find( $projectId );
        $unitTypeId = $unitVariant->unit_type_id;
        $projectPropertyTypeId = UnitType::find($unitTypeId)->project_property_type_id;
        $projectPropertyType = ProjectPropertyType ::find( $projectPropertyTypeId );
        $propertyTypeID = $projectPropertyType->property_type_id;
        
        $availableRoomTypes = []; 
        $RoomTypes = $project->roomTypes()->get()->toArray();
        foreach($RoomTypes as $RoomType)
        {
           $availableRoomTypes[$RoomType['id']]=Defaults::find($RoomType['name'])->label;
        }
        $variantRooms = $unitVariant->variantRoomAttributes()->get()->toArray();
        $variantRoomArr = [];
        $propertyTypeAttributes = $projectPropertyType->attributes->toArray();
        $roomTypeAttributes = [];

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertyTypeId)->get()->toArray();
        foreach ($unitTypeArr as $unitType) {
                $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
                $unitTypes[$unitType['id']] = $unitTypeName;
            }
      
        foreach ($variantRooms as $variantRoom) {
            $level = ($propertyTypeID == APARTMENTID)? 0:$variantRoom['floorlevel'];
            $variantRoomArr[$level][$variantRoom['id']]['ROOMTYPEID'] = $variantRoom['roomtype_id'];
            $variantRoomArr[$level][$variantRoom['id']]['ATTRIBUTES'] = unserialize($variantRoom['variant_room_attributes']);
            
            $roomTypeAttributes[$variantRoom['roomtype_id']] = RoomType::find($variantRoom['roomtype_id'])->attributes->toArray();
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
                            $layouts['gallery'][$mediaId]['IMAGE'] = url() . "/projects/" . $projectId . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                        }
                    }
                }
            }
            else
            { 
                $metakeyData = explode( "-", $meta['meta_key'] );
                $level = $metakeyData[0];
                $type = $metakeyData[1];
                $mediaId = $meta['meta_value'];
                if (is_numeric( $mediaId )) {
                    $imageName = Media::find( $mediaId )->image_name;

                    $layouts[$level][$type]['ID'] = $mediaId;
                    $layouts[$level][$type]['IMAGE'] = url() . "/projects/" . $projectId . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                }
            }
        }
        ksort($variantRoomArr);
        
        return view( 'admin.project.variants.apartment.edit' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'propertyTypeID', $propertyTypeID )
                        ->with( 'projectPropertyTypeAttributes', $propertyTypeAttributes )
                        ->with( 'unitTypes', $unitTypes )
                        ->with( 'availableRoomTypes', $availableRoomTypes )
                        ->with( 'unitVariant', $unitVariant->toArray() )
                        ->with( 'variantRooms', $variantRoomArr )
                        ->with( 'layouts', $layouts )
                        ->with( 'roomTypeAttributes', $roomTypeAttributes )
                        ->with( 'projectPropertyTypeID', $projectPropertyTypeId )
                        ->with( 'current', 'apartment-variant' );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($project_id, $id, Request $request) {
       
        $isUnitBlocked = isUnitBlocked($id);

        if($isUnitBlocked)
        {
           Session::flash('error_message','Error !!! Cannot update variant as its unit is used for booking');    
           return redirect("/admin/project/" . $project_id . "/apartment-variant/" . $id . '/edit');
        }

        $unitVariant = UnitVariant::find($id);
        $unitVariant->unit_variant_name = ucfirst($request->input('unit_variant_name'));
        $unitVariant->unit_type_id = $request->input('unit_type');
        $unitVariant->carpet_area = $request->input('carpet_area');
        $unitVariant->built_up_area = $request->input('builtup_area');
        $unitVariant->super_built_up_area = $request->input('superbuiltup_area');
        $unitVariant->per_sq_ft_price = $request->input('per_sq_ft_price');
        $attributedata = $request->input('apartment_attributes');
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
         Session::flash('success_message','Variant Successfully Updated');
        return redirect("/admin/project/" . $project_id . "/apartment-variant/" . $id . '/edit');
    }
     
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy( $id ) {
        //
    }
    
    /*public function  getUnitTypeVariants($project_id, Request $request)
    {
        $unitTypeId = $request['unit_type_id'];
        $variants = UnitType::find($unitTypeId)->unitTypeVariant()->get()->toArray();
        $str ='<option value="">Select Unit Variant</option>';
        foreach ($variants as $variant)
        {
            $str .='<option value="'.$variant['id'].'">'.$variant['unit_variant_name'].'</option>';
        }
        
       return response()->json( [
            'code' => 'unittype_variants',
            'message' => '',
            'data' => $str
        ], 201 );
    }*/
    
    public function  getUnitTypeVariants($project_id, Request $request)
    {
        $projectPropertytypeId = $request['projectPropertyTypeId'];
        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = []; 
        foreach($unitTypeArr as $unitType)
            $unitTypeIdArr[] =$unitType['id'];
 
        
        $variants = UnitVariant::whereIn('unit_type_id',$unitTypeIdArr)->get()->toArray();
        $str ='<option value="">Select Unit Variant</option>';
        foreach ($variants as $variant)
        {
            $str .='<option value="'.$variant['id'].'">'.$variant['unit_variant_name'].'</option>';
        }
        
       return response()->json( [
            'code' => 'unittype_variants',
            'message' => '',
            'data' => $str
        ], 201 );
    }

    public function getPropertyTypeData($projectId, Request $request)
    {
        $project = Project::find( $projectId );
        $propertyTypeId = $request->input('property_type_id');
        
        $unitTypes = $project->getUnitTypesToArray( $propertyTypeId ); 
        $propertyTypeAttributes = ProjectPropertyType::find( $propertyTypeId )->attributes->toArray();
        
        $unitTypeStr ='';
        foreach($unitTypes as $unitType)
        {
            $unitTypeName = Defaults::find($unitType->unittype_name)->label;
            $unitTypeStr .='<option value="'.$unitType->id.'">'.$unitTypeName .'</option>';
        }
       
        $attributes ='';
         foreach($propertyTypeAttributes as $attribute)
         {
            $attributes.='<div class="col-md-4">';
            $attributes.='<div class="form-group">';
            $attributes.='<label class="form-label">'.$attribute['label'].'</label>';
            
            if('textbox' === $attribute['control_type'])
                $attributes.='<input type="text" class="form-control" name="apartment_attributes['.$attribute['label'].']"  placeholder="Enter '.$attribute['label'].'" data-parsley-required>';
            elseif('number' === $attribute['control_type'])
                $attributes.='<input type="number" class="form-control" name="apartment_attributes['.$attribute['label'].']"  placeholder="Enter '.$attribute['label'].'" data-parsley-required data-parsley-type="number">'; 
            elseif('select' === $attribute['control_type'])
            {
               $options = explode(',', $attribute['defaults']);
               $attributes.='<select name="apartment_attributes['.$attribute['label'].']" class="select2 form-control" data-parsley-required>';
               $attributes.='<option value="">Select '.$attribute['label'].'</option>';   
              foreach($options as $option)
              {
                 $attributes.='<option  value="'.$option.'">'.$option.'</option>';
              }
            $attributes.='</select>';
            }
             elseif('multiple' === $attribute['control_type'])
             {
                 $options = explode(',', $attribute['defaults']);
                     
                $attributes.='<select multiple name="apartment_attributes['.$attribute['label'].'][]" class="select2 form-control" data-parsley-required>';
                $attributes.='<option value="">Select '.$attribute['label'].'</option>';   
                foreach($options as $option)
                {
                 $attributes.='<option   value="'. $option.'">'.$option.'</option>';
                }
                $attributes.='</select>';
             }     
            $attributes.='</div> ';
            $attributes.='</div>';
        }
         
        
        
         return response()->json([
                    'code' => 'unit_variant',
                    'message' => '',
                    'data' => [
                        'unit_types' => $unitTypeStr,
                        'attributes' => $attributes
                    ]
                        ], 201);
    }

}
