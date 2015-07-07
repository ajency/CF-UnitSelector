<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use File;
use \Input;
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
    public function store($buildingId, Request $request) {
        $building = Building::find($buildingId);
        $projectId = $request->get('projectId');
        $targetDir = public_path() . "/projects/" . $projectId . "/buildings/" . $buildingId;
        File::makeDirectory($targetDir, $mode = 0755, true, true);
        $newFilename = '';
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            list($width, $height) = getimagesize($file);
    
            if(($width >=1600 && $height >=800) && ($height==($width/2)))
            {
                $fileName = $file->getClientOriginalName();
                $fileData = explode('.', $fileName);
                $newFilename = $fileName;
                $request->file('file')->move($targetDir, $newFilename);


                $media = new Media();
                $media->image_name = $newFilename;
                $media->mediable_id = $buildingId;
                $media->mediable_type = 'CommonFloor\Building';
                $media->save();
                $mediaId = $media->id;
                $buildingMaster = $building->building_master;
                $file =  $fileData[0];
                $fileArr = explode('-', $file);
                $position = $fileArr[1];

                $buildingMaster[$position] = $media->id;
                $building->building_master = $buildingMaster;
                $building->save();
                $code ='201';
                $message ='Building Master Image Added';
                
            }
            else
            {
                $code ='200';
                $message ='Invalid Image dimensions';
                $newFilename ='';
                $mediaId ='';
                $position ='';
            }
        }
        return response()->json([
                    'code' => 'building_media_added',
                    'message' => $message,
                    'data' => [
                        'media_id' => $mediaId,
                        'position' => $position,
                        'filename' => $file,
                        'image_path' => url() . '/projects/' . $projectId . '/buildings/' . $buildingId . '/' . $newFilename
                    ]
                        ], $code);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($buildingId, $id) {

        $type = Input::get('type');
        $refference = Input::get('refference');
        $projectId = Input::get( 'projectId' );

        $building = Building::find($buildingId);
        $metaValue = $building->building_master;
        $breakpoints = $building->breakpoints; 
        $data = [];
        
        $breakpoints = (!empty($breakpoints))?unserialize($breakpoints):[];
        $breakpointKey = array_search ($refference, $breakpoints);
        unset($breakpoints[$breakpointKey]);
        $breakpoints = serialize($breakpoints);
        
        $metaValueKey = array_search ($id, $metaValue);
        $metaValue[$metaValueKey]='';
  
        $building->breakpoints = $breakpoints;
        $building->building_master = $metaValue;
        $building->save();
       
        $media = Media::find( $id );
        $targetDir = public_path() . "/projects/" . $projectId . "/buildings/" . $buildingId . "/".$media->image_name;
        //unlink($targetDir);
        \File::delete($targetDir);
        if(file_exists ( $targetDir ))
          \File::delete($targetDir);
        
        $media->delete();

        return response()->json([
                    'code' => 'media_deleted',
                    'message' => 'SVG Successfully Deleted'
                        ], 204);
    }
    
     public function updateBreakPoint($buildingId)
    {
        $position = Input::get( 'position' ); 
        $building = Building::find($buildingId);
        $building->breakpoints = serialize($position);
        $building->save(); 
        
         return response()->json( [
            'code' => 'master_breakpoints',
            'message' => 'Break Points Successfully Updated', 
                ], 201 );
    }

}
