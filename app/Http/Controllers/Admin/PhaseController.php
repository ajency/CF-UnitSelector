<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use CommonFloor\Phase;

class PhaseController extends Controller {

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
    public function store( Request $request ) {
        $project_id = $request->input( 'project_id' );
        $phase_name = $request->input( 'phase_name' );

        $phase = new Phase();
        $phase->project_id = $project_id;
        $phase->phase_name = $phase_name;
        $phase->save();

        $phase_id = $phase->id;

        return response()->json( [
                    'code' => 'phase_created',
                    'message' => 'Phase Successfully Created',
                    'data' => [
                        'phase_id' => $phase_id
                    ]
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
        Phase::find( $id )->delete();

        return response()->json( [
                    'code' => 'phase_deleted',
                    'message' => 'Phase Successfully Deleted'
                        ], 204 );
    }

}
