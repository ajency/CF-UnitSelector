<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use File;
use CommonFloor\Media;
use CommonFloor\FloorLayout;

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
    public function store( $floorLayoutId, Request $request ) {
        $projectId = $request->get( 'project_id' );
        $targetDir = public_path() . "/projects/" . $projectId . "/floor-layouts/" . $floorLayoutId;
        File::makeDirectory( $targetDir, $mode = 0755, true, true );
        $newFilename = '';
        if ($request->hasFile( 'file' )) {
            $file = $request->file( 'file' );
            $fileName = $file->getClientOriginalName();
            $fileExt = $file->guessClientExtension();
            $newFilename = $fileName;
            $request->file( 'file' )->move( $targetDir, $newFilename );
        }

        $media = new Media();
        $media->image_name = $newFilename;
        $media->mediable_id = $floorLayoutId;
        $media->mediable_type = 'CommonFloor\FloorLayout';

        $type = $request->get( 'media_type' );
        $floorLayout = FloorLayout::find( $floorLayoutId );
        $floorLayout->svgs()->save( $media );
        $floorLayout->$type = $media->id;
        $floorLayout->save();

        return response()->json( [
                    'code' => 'floorlayout_media_added',
                    'message' => 'Floor layout svg added',
                    'data' => [
                        'media_id' => $media->id,
                        'media_path' => url() . '/projects/' . $projectId . '/floor-layouts/' . $floorLayoutId . '/' . $newFilename
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
        //
    }

}
