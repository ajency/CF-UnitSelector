<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\RoomType;
use CommonFloor\Attribute;
use CommonFloor\ProjectPropertyType;

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
    public function create( $id, ProjectRepository $projectRepository ) {
        $project = $projectRepository->getProjectById( $id );
        $roomTypeArr = $project->roomTypes()->get();
        $roomtypeAttribute = [];
        $propertytypeAttribute = [];
        $projectPropertytype = [];
        $projectPropertytypeArr = $project->projectPropertyTypes()->get()->toArray();
      
       
        foreach ($projectPropertytypeArr as $propertyTypes) { 
            $propertytypeAttribute[$propertyTypes['property_type_id']]['PROJECTPROPERTYTYPEID'] = $propertyTypes['id'];
            $propertytypeAttribute[$propertyTypes['property_type_id']]['ATTRIBUTES'] = 
                    ProjectPropertyType::find($propertyTypes['id'])->attributes->toArray();
            $projectPropertytype [] = $propertyTypes['property_type_id'];
        }


        foreach ($roomTypeArr as $roomType) {
            $roomtypeAttribute[$roomType['id']]['NAME'] = $roomType['name'];
            $roomtypeAttribute[$roomType['id']]['ATTRIBUTES'] = $roomType->attributes->toArray();
        }

        return view( 'admin.project.roomtype' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'projectpropertytypeAttribute', $propertytypeAttribute )
                        ->with( 'roomtypeAttributes', $roomtypeAttribute )
                        ->with( 'project_property_type', $projectPropertytype )
                        ->with( 'current', 'room_type' );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( Request $request ) {
        $projectId = $request->input( 'project_id' );
        $roomtype_name = $request->input( 'roomtypename' );

        $roomtype = new RoomType();
        $roomtype->project_id = $projectId;
        $roomtype->name = $roomtype_name;
        $roomtype->save();

        $roomtypeId = $roomtype->id;


        return response()->json( [
                    'code' => 'room_type',
                    'message' => 'Room Type Successfully Created',
                    'data' => ['roomtype_id' => $roomtypeId]
                        ], 201 );
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
    public function edit( $id ) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update( $project_id, $reffereceId, Request $request ) {

        $reffereceType = $request->input( 'reffrence_type' );
        $datainput = $request->input( 'roomtypeattrData' );
        $data = [];
        $attribute = [];
        foreach ($datainput as $input) {
            $data[$input['name']][] = $input['value'];
        }

        $attributeNameArr = $data['attribute_name_' . $reffereceId];
        $controlTypeArr = $data['controltype_' . $reffereceId];
        $controlValueArr = (isset( $data['controltypevalues_' . $reffereceId] )) ? $data['controltypevalues_' . $reffereceId] : [];
        $attributeIdArr = $data['attribute_id_' . $reffereceId];

        if ( 'room_type' === $reffereceType ) {
            $roomType = RoomType::find( $reffereceId );
            $roomtypeName = $data['room_typename_' . $reffereceId][0];

            $roomType->name = $roomtypeName;
            $roomType->save();

            $objecttype = 'RoomType';
        } elseif ('property_type' === $reffereceType) {
            $project = Project::find( $project_id );
            $objecttype = 'PropertyType';
            $reffereceidArr = explode( '_', $reffereceId );
            $reffereceId = $reffereceidArr[1];
            $projectPropertytype = ProjectPropertyType::find( $reffereceId );
        }


        if (!empty( $attributeNameArr )) {
            foreach ($attributeNameArr as $key => $attributeName) {
                $attributeName = ucfirst($attributeName);
                $controlType = $controlTypeArr[$key];
                $controlValues = (isset( $controlValueArr[$key] )) ? $controlValueArr[$key] : '';
                $attributeId = $attributeIdArr[$key];

                if ($attributeId == '') {
                    if ($attributeName != '')
                        $attribute[] = new Attribute( ['label' => $attributeName, 'control_type' => $controlType, 'defaults' => $controlValues,
                            'object_type' => $objecttype, 'object_id' => $reffereceId] );
                } else {
                    $data = array("label" => $attributeName, "control_type" => $controlType, 'defaults' => $controlValues);
                    Attribute::where( 'id', $attributeId )->update( $data );
                }
            }

            if (!empty( $attribute )) {
                if ('room_type' === $reffereceType)
                    $roomType->attributes()->saveMany( $attribute );
                elseif ('property_type' === $reffereceType)
                    $projectPropertytype->attributes()->saveMany( $attribute );
            }
        }


        return response()->json( [
                    'code' => 'room_type_attributes',
                    'message' => 'Room Type Attributes Successfully Created',
                    'data' => ['refferece_id' => $reffereceId]
                        ], 201 );
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy( $project_id, $id ) {
        RoomType::find( $id )->delete();

        return response()->json( [
                    'code' => 'roomtype_deleted',
                    'message' => 'Room Type Successfully Deleted'
                        ], 204 );
    }
    
    public function deleteRoomTypeAttribute( $project_id, $id ) {
        Attribute::find( $id )->delete();

        return response()->json( [
                    'code' => 'roomtypeattribute_deleted',
                    'message' => 'Room Type Attribute Successfully Deleted'
                        ], 204 );
    }

}
