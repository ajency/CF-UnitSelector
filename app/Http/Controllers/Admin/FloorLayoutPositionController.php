<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\FloorLayoutPosition;

class FloorLayoutPositionController extends Controller {

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
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( $floorLayoutId, Request $request ) {
        $formData = $request->all();
        
        $floorPositions = FloorLayoutPosition::where('floor_layout_id',$floorLayoutId)
                                ->where('position', $formData['position'])->get();
        if($floorPositions->count() == 0)
            $floorPosition = new FloorLayoutPosition;
        else
            $floorPosition = $floorPositions->get(0);
        
        $floorPosition->floor_layout_id = $formData['floor_layout_id'];
        $floorPosition->position = $formData['position'];
        $floorPosition->unit_variant_id = $formData['unit_variant_id'];
        $floorPosition->save();
        return response()->json( [
                    'code' => 'position_updated',
                    'message' => 'Position details saved',
                    'data' => $floorPosition->toArray()
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
