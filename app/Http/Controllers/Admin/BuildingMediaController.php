<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use File;
use CommonFloor\Media;
use CommonFloor\Building;

class BuildingMediaController extends Controller {

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
    public function store( $buildingId, Request $request ) {
        $building = Building::find( $buildingId );
        $projectId = $request->get('projectId');
        $targetDir = public_path() . "/projects/" . $projectId . "/buildings/" . $buildingId;
        File::makeDirectory( $targetDir, $mode = 0755, true, true );
        $newFilename = '';
        if ($request->hasFile( 'file' )) {
            $file = $request->file( 'file' );
            $fileName = $file->getClientOriginalName();
            $newFilename = $fileName;
            $request->file( 'file' )->move( $targetDir, $newFilename );
        }

        $media = new Media();
        $media->image_name = $newFilename;
        $media->mediable_id = $buildingId;
        $media->mediable_type = 'CommonFloor\Building';
        $media->save();
        $section = $request->get( 'section' );
        $buildingMaster = $building->building_master;
        if (strpos( $section, '-' ) !== false) {
            $sectionImages = $buildingMaster[$section];
            $sectionImages[] = $media->id;
            $buildingMaster[$section] = array_unique( $sectionImages );
        } else {
            $buildingMaster[$section] = $media->id;
        }
        $building->building_master = $buildingMaster;
        $building->save();

        return response()->json( [
                    'code' => 'building_media_added',
                    'message' => 'building added',
                    'data' => [
                        'media_id' => $media->id,
                        'media_path' => url() . '/projects/' . $projectId . '/buildings/' . $buildingId . '/' . $newFilename
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
