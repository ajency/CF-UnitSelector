<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FloorLayoutMediaController extends Controller {

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
    public function store($floorLayoutId) {
        $targetDir = public_path() . "/projects/" . $projectId . "/floor-layouts/";
        $imageUrl = \url() . "/projects/" . $projectId . "/floor-layouts/";
        File::makeDirectory( $targetDir, $mode = 0755, true, true );
        if ($request->hasFile( 'file' )) {
            $file = $request->file( 'file' );
            $fileName = $file->getClientOriginalName();
            $fileExt = $file->guessClientExtension();
            $newFilename = $fileName . '.' . $fileExt;
            $request->file( 'file' )->move( $targetDir, $newFilename );
        }
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
