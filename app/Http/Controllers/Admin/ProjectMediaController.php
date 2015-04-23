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
    public function store( $projectId, Request $request ) {

        $type = Input::get( 'type' );

        $targetDir = public_path() . "/projects/" . $projectId . "/" . $type . "/";
        $imageUrl = url() . "/projects/" . $projectId . "/" . $type . "/";

        File::makeDirectory( $targetDir, $mode = 0755, true, true );

        if ($request->hasFile( 'file' )) {

            $file = $request->file( 'file' );
            $fileName = $file->getClientOriginalName();
            $fileExt = $file->guessClientExtension();
             
            //$newFilename = rand() . '_' . $projectId . '.' . $fileExt;
            $newFilename = $fileName;

            $request->file( 'file' )->move( $targetDir, $newFilename );
        }

        $media = new Media();
        $media->image_name = $newFilename;
        $media->mediable_id = $projectId;
        $media->mediable_type = 'CommonFloor\Project';
        $media->save();

        $mediaId = $media->id;
        $position = 0;
        if ('master' !== $type) {
            $projectMeta = ProjectMeta::where( ['meta_key' => $type, 'project_id' => $projectId] )->first();
            $projectMeta->project_id = $projectId;
            $projectMeta->meta_key = $type;
            $projectMeta->meta_value = $mediaId;
            $projectMeta->save();
        } else {
            
            $file =  str_replace('.'.$fileExt, '', $fileName);
            $fileArr = explode('_', $file);
            $position = $fileArr[1];
            $projectMeta = ProjectMeta::where( ['meta_key' => 'master', 'project_id' => $projectId] )->first();
            $unSerializedValue = unserialize( $projectMeta->meta_value );
            $unSerializedValue[$position] = $mediaId;
            $projectMeta->meta_value = serialize( $unSerializedValue );
            $projectMeta->save();
        }

        if ('google_earth' === $type) {
            $message = 'Google Earth';
        } elseif ('master' === $type) {
            $message = 'Project Master';
        } elseif ('skyview' === $type) {
            $message = 'Sky view';
        }

        return response()->json( [
                    'code' => $type . 'image_uploaded',
                    'message' => $message . ' Image Successfully Uploaded',
                    'data' => [
                        'image_path' => $imageUrl . $newFilename,
                        'media_id' => $mediaId,
                        'position' => $position
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
    public function destroy( $project_id, $id ) { 
        $type = Input::get( 'type' ); 
        $refference = Input::get( 'refference' );
        
        $metaValue = ProjectMeta::where(['meta_key'=>$type,'project_id'=>$project_id])->pluck('meta_value');
        
        $data =[]; 
        if($type=='master')
        {
            $breakpoints = ProjectMeta::where(['meta_key'=>'breakpoints','project_id'=>$project_id])->pluck('meta_value');
            $breakpoints = unserialize($breakpoints);
            $breakpointKey = array_search ($refference, $breakpoints);
            unset($breakpoints[$breakpointKey]);
            $breakpointData =  ['meta_value'=>serialize($breakpoints)]; 
            ProjectMeta::where(['meta_key'=>'breakpoints','project_id'=>$project_id])->update( $breakpointData ); 
            
            $metaValue = unserialize($metaValue);
            $metaValueKey = array_search ($id, $metaValue);
            $metaValue[$metaValueKey]='';
            $data =  ['meta_value'=>serialize($metaValue)];  
 
        }
        else
        {
            $data =['meta_value'=>'']; 
        }
        ProjectMeta::where(['meta_key'=>$type,'project_id'=>$project_id])->update( $data ); 
       
        $media = Media::find( $id );
        $targetDir = public_path() . "/projects/" . $project_id . "/" . $type . "/".$media->image_name;
        unlink($targetDir);
        $media->delete();
        
        return response()->json( [
                    'code' => 'media_deleted',
                    'message' => 'SVG Successfully Deleted'
                        ], 204 );
    }
    
    public function updateBreakPoint($projectId)
    {
        $position = Input::get( 'position' ); 
        $projectMeta = ProjectMeta::where( ['meta_key' =>'breakpoints', 'project_id' => $projectId] )->first();
        $projectMeta->meta_value = serialize($position);
        $projectMeta->save(); 
        
         return response()->json( [
            'code' => 'master_breakpoints',
            'message' => 'Break Points Successfully Updated', 
                ], 201 );
    }

}
