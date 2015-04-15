<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Project;
use CommonFloor\ProjectPropertyType;
use CommonFloor\UnitVariant;
use CommonFloor\UnitType;
use CommonFloor\Media;

class ProjectApartmentVariantController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index( $projectId ) {
        $project = Project::find( $projectId );
        return view( 'admin.project.variants.apartment.list' )
                        ->with( 'project', $project->toArray() )
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
        $unitVariant->build_up_area = $request->input( 'buildup_area' );
        $unitVariant->super_build_up_area = $request->input( 'superbuildup_area' );
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
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];

        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == '1')
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where( 'project_property_type_id', $projectPropertytypeId )->get()->toArray();
        $roomTypeArr = $project->roomTypes()->get()->toArray();
        $variantRooms = $unitVariant->variantRoomAttributes()->get()->toArray();
        $variantRoomArr = [];
        $propertyTypeAttributes = ProjectPropertyType::find( $projectPropertytypeId )->attributes->toArray();
        $roomTypeAttributes = [];


        foreach ($variantRooms as $room) {
            $variantRoomArr[][$room['id']]['ROOMTYPEID'] = $room['roomtype_id'];
            $variantRoomArr[][$room['id']]['ATTRIBUTES'] = $room['variant_room_attributes'];
        }

        $variantMeta = $unitVariant->variantMeta()->get()->toArray();
        $levelImages = [];

        foreach ($variantMeta as $meta) {
            $metakey = explode( "-", $meta['meta_key'] );
            $level = $metakey[0];
            $type = $metakey[1];
            $mediaId = $meta['meta_value'];
            if (is_numeric( $mediaId )) {
                $media = Media::find( $mediaId )->image_name;
                $imageName = $media->image_name;
                $levelImages[$level][$type]['ID'] = $mediaId;
                $levelImages[$level][$type]['IMAGE'] = url() . "/projects/" . $project_id . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
            }
        }


        return view( 'admin.project.variants.apartment.edit' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'project_property_type', $propertyTypeArr )
                        ->with( 'project_property_type_attributes', $propertyTypeAttributes )
                        ->with( 'unit_type_arr', $unitTypeArr )
                        ->with( 'room_type_arr', $roomTypeArr )
                        ->with( 'unitVariant', $unitVariant->toArray() )
                        ->with( 'floorlevelRoomAttributes', $variantRoomArr )
                        ->with( 'roomTypeAttributes', $roomTypeAttributes )
                        ->with( 'levellayout', $levelImages )
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
