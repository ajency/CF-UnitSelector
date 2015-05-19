<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Project;
use CommonFloor\ProjectPropertyType;
use CommonFloor\PropertyType;
use CommonFloor\UnitVariant;
use CommonFloor\UnitType;
use CommonFloor\RoomType;
use CommonFloor\Media;
use CommonFloor\VariantMeta;

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
            $unitTypes[$unitType->id] = $unitType->unittype_name;
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
            $unitTypes = $project->getUnitTypesToArray( $projectPropertyTypes[0]['ID'] );
            $propertyTypeAttributes = ProjectPropertyType::find( $projectPropertyTypes[0]['ID'] )->attributes->toArray();
        }
        
        return view( 'admin.project.variants.apartment.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'apartment-variant' )
                        ->with( 'projectPropertyTypes', $projectPropertyTypes )
                        ->with( 'unitTypes', $unitTypes )
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
        $attributedata = $request->input( 'attributes' );
        $variantattributedata=[];
        if(!empty($attributedata))
        {
            foreach ($attributedata as $key=>$value)
               $variantattributedata[$key]= ucfirst($value);    
        }
        $attributeStr = serialize( $variantattributedata );
        $unitVariant->variant_attributes = $attributeStr;
        $unitVariant->save();
        $unitVariantID = $unitVariant->id;
        
        $variantMeta = new VariantMeta();
        $variantMeta->unit_variant_id = $unitVariantID;
        $variantMeta->meta_key = 'gallery';
        $variantMeta->meta_value = serialize('');
        $variantMeta->save();

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
        
        $availableRoomTypes = $project->roomTypes()->get()->toArray(); 
        $variantRooms = $unitVariant->variantRoomAttributes()->get()->toArray();
        $variantRoomArr = [];
        $propertyTypeAttributes = $projectPropertyType->attributes->toArray();
        $roomTypeAttributes = [];

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertyTypeId)->get()->toArray();
         
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
 
        return view( 'admin.project.variants.apartment.edit' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'propertyTypeID', $propertyTypeID )
                        ->with( 'project_property_type_attributes', $propertyTypeAttributes )
                        ->with( 'unit_type_arr', $unitTypeArr )
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
       
        $unitVariant = UnitVariant::find($id);
        $unitVariant->unit_variant_name = ucfirst($request->input('unit_variant_name'));
        $unitVariant->unit_type_id = $request->input('unit_type');
        $unitVariant->carpet_area = $request->input('carpet_area');
        $unitVariant->built_up_area = $request->input('builtup_area');
        $unitVariant->super_built_up_area = $request->input('superbuiltup_area');
        $unitVariant->per_sq_ft_price = $request->input('per_sq_ft_price');
        $attributedata = $request->input('attributes');
        $variantattributedata=[];
        if(!empty($attributedata))
        {
            foreach ($attributedata as $key=>$value)
               $variantattributedata[$key]= ucfirst($value);    
        }
        $attributeStr = serialize( $variantattributedata );
        $unitVariant->variant_attributes = $attributeStr;
        $unitVariant->save();

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
    
    public function getPropertyTypeData($projectId, Request $request)
    {
        $project = Project::find( $projectId );
        $propertyTypeId = $request->input('property_type_id');
        
        $unitTypes = $project->getUnitTypesToArray( $propertyTypeId ); 
        $propertyTypeAttributes = ProjectPropertyType::find( $propertyTypeId )->attributes->toArray();
        
        $unitTypeStr ='';
        foreach($unitTypes as $unitType)
        {
            $unitTypeStr .='<option value="'.$unitType->id.'">'.$unitType->unittype_name .'</option>';
        }
       
        $attributes ='';
         foreach($propertyTypeAttributes as $attribute)
         {
            $attributes.='<div class="col-md-4">';
            $attributes.='<div class="form-group">';
            $attributes.='<label class="form-label">'.$attribute['label'].'</label>';
            
            if('textbox' === $attribute['control_type'])
                $attributes.='<input type="text" class="form-control" name="attributes['.property_type_slug($attribute['label']).']"  placeholder="Enter '.$attribute['label'].'">';
            elseif('select' === $attribute['control_type'])
            {
               $options = explode(',', $attribute['defaults']);
               $attributes.='<select name="attributes['.property_type_slug($attribute['label']).']" class="select2 form-control">';
               $attributes.='<option value="">Select '.$attribute['label'].'</option>';   
              foreach($options as $option)
              {
                 $attributes.='<option  value="'.property_type_slug($option).'">'.$option.'</option>';
              }
            $attributes.='</select>';
            }
             elseif('multiple' === $attribute['control_type'])
             {
                 $options = explode(',', $attribute['defaults']);
                     
                $attributes.='<select multiple name="attributes['.property_type_slug($attribute['label']).'][]" class="select2 form-control">';
                $attributes.='<option value="">Select '.$attribute['label'].'</option>';   
                foreach($options as $option)
                {
                 $attributes.='<option   value="'. property_type_slug($option).'">'.$option.'</option>';
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
