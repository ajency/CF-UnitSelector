<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Project;
use CommonFloor\ProjectPropertyType;
use CommonFloor\UnitVariant;
use CommonFloor\UnitType;
use CommonFloor\RoomType;
use CommonFloor\Media;

class ProjectApartmentVariantController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index( $projectId ) {
        $project = Project::find( $projectId );
        $propertyTypeArr = [];
        $projectPropertytypeId = 0;
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $projectPropertytypeId = $project->getProjectPropertyTypeId( 1 );

        $unitTypeArr = UnitType::where( 'project_property_type_id', $projectPropertytypeId )->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType) {   
            $unitTypeIdArr[] = $unitType['id'];
        }
        $unitVariants = UnitVariant::whereIn( 'unit_type_id', $unitTypeIdArr )->orderBy( 'unit_variant_name' )->get()->toArray();
        return view( 'admin.project.variants.apartment.list' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'unitVariants', $unitVariants )
                        ->with( 'current', 'apartment-variant' );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
        $project = Project::find( $projectId );
        $projectPropertyType = $project->projectPropertyTypes()->where( 'property_type_id', 1 )->first(); // 1 is Apartment
        $unitTypes = $project->getUnitTypesToArray( $projectPropertyType->id );
        $propertyTypeAttributes = ProjectPropertyType::find( $projectPropertyType->id )->attributes->toArray();
        return view( 'admin.project.variants.apartment.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'apartment-variant' )
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
        $unitVariant->unit_variant_name = $request->input( 'unit_variant_name' );
        $unitVariant->unit_type_id = $request->input( 'unit_type' );
        $unitVariant->carpet_area = $request->input( 'carpet_area' );
        $unitVariant->built_up_area = $request->input( 'builtup_area' );
        $unitVariant->super_built_up_area = $request->input( 'superbuiltup_area' );
        $attributedata = $request->input( 'attributes' );
        $attributeStr = serialize( $attributedata );
        $unitVariant->variant_attributes = $attributeStr;
        $unitVariant->save();
        $unitVariantID = $unitVariant->id;

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
        $projectPropertyTypes = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypes = [];
        $projectPropertyTypeId = 0;
        foreach ($projectPropertyTypes as $propertyType) {
            $propertyTypes[] = $propertyType['property_type_id'];

            if ($propertyType['property_type_id'] == '1') {
                $projectPropertyTypeId = $propertyType['id'];
            }
        }

        $availableRoomTypes = $project->roomTypes()->get()->toArray();
        $variantRooms = $unitVariant->variantRoomAttributes()->get()->toArray();
        $variantRoomArr[0] = [];
        $propertyTypeAttributes = ProjectPropertyType::find( $projectPropertyTypeId )->attributes->toArray();
        $roomTypeAttributes = [];

        $unitTypes = [];
        foreach ($variantRooms as $variantRoom) {
            $variantRoomArr[0][$variantRoom['id']]['ROOMTYPEID'] = $variantRoom['roomtype_id'];
            $variantRoomArr[0][$variantRoom['id']]['ATTRIBUTES'] = unserialize($variantRoom['variant_room_attributes']);
            
            $roomTypeAttributes[$variantRoom['roomtype_id']] = RoomType::find($variantRoom['roomtype_id'])->attributes->toArray();
        }

        $variantMeta = $unitVariant->variantMeta()->get()->toArray();

        $layouts = [];
        foreach ($variantMeta as $meta) {
            $metakey = explode( "-", $meta['meta_key'] );
            $level = $metakey[0];
            $type = $metakey[1];
            $mediaId = $meta['meta_value'];
            if (is_numeric( $mediaId )) {
                $imageName = Media::find( $mediaId )->image_name;
                 
                $layouts[0][$type]['ID'] = $mediaId;
                $layouts[0][$type]['IMAGE'] = url() . "/projects/" . $projectId . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
            }
        }
 

        return view( 'admin.project.variants.apartment.edit' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'project_property_type', $propertyTypes )
                        ->with( 'project_property_type_attributes', $propertyTypeAttributes )
                        ->with( 'unit_type_arr', $unitTypes )
                        ->with( 'availableRoomTypes', $availableRoomTypes )
                        ->with( 'unitVariant', $unitVariant->toArray() )
                        ->with( 'variantRooms', $variantRoomArr )
                        ->with( 'layouts', $layouts )
                        ->with( 'roomTypeAttributes', $roomTypeAttributes )
                        ->with( 'current', '' );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update( $id ) {
        //
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

}
