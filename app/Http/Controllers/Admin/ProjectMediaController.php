<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \File;
use \Input;
use CommonFloor\ProjectMeta;
use CommonFloor\Media;

class ProjectMediaController extends Controller {

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
    public function store($project_id, Request $request) {

        $type = Input::get('type');

        $targetDir = public_path() . "/projects/" . $project_id . "/" . $type . "/";
        $imageUrl = url() . "/projects/" . $project_id . "/" . $type . "/";

        File::makeDirectory($targetDir, $mode = 0755, true, true);

        if ($request->hasFile('file')) {

            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $fileExt = $file->guessClientExtension();
            $newFilename = rand() . '_' . $project_id . '.' . $fileExt;

            $request->file('file')->move($targetDir, $newFilename);
        }

        $media = new Media();
        $media->image_name = $newFilename;
        $media->mediable_id = $project_id;
        $media->mediable_type = 'CommonFloor\Project';
        $media->save();

        $mediaId = $media->id;

        $projectMeta = new ProjectMeta();
        $metaValue = $projectMeta->where(['meta_key' => $type, 'project_id' => $project_id])->pluck('meta_value'); 
         
        if (!empty($metaValue)) {
            
            $metaValue= ($type=='master')?$metaValue.'||'.$mediaId:$mediaId;
            $data = array("meta_value" => $metaValue);
            $projectMeta->where(['meta_key' => $type, 'project_id' => $project_id])->update( $data );
            
        } else {
            $projectMeta->project_id = $project_id;
            $projectMeta->meta_key = $type;
            $projectMeta->meta_value = $mediaId;
            $projectMeta->save();
        }

        if ($type == 'google_earth')
            $message = 'Google Earth';
        elseif ($type == 'master')
            $message = 'Project Master';
        elseif ($type == 'skyview')
            $message = 'Sky view';

        return response()->json([
                    'code' => $type . 'image_uploaded',
                    'message' => $message . ' Image Successfully Uploaded',
                    'data' => [
                        'image_path' => $imageUrl . $newFilename
                    ]
                        ], 201);
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
    public function destroy($id) {
        //
    }

}
