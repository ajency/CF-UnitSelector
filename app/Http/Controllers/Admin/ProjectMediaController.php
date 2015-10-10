<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \File;
use \Input;
use CommonFloor\ProjectMeta;
use CommonFloor\Media;
use CommonFloor\Svg;
use CommonFloor\SvgElement;
use \DomDocument;


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
            list($width, $height) = getimagesize($file);

            if ('svgUploader' === $type) {

                    $position = Input::get( 'position' );  
                    $masterImageId = Input::get( 'masterImageId' );
                    $svg = Svg::firstOrCreate( array('image_id' => $masterImageId) );
                    $svg->save();

                    $fileName = $file->getClientOriginalName();
                    $fileData = explode('.', $fileName);
                    $newFilename = $fileName;
                    $request->file( 'file' )->move( $targetDir, $newFilename );

                    $svgPath  = $targetDir. $newFilename;
                    $xdoc = new DomDocument();
                    $xdoc->Load($svgPath);
                    $paths = $xdoc->getElementsByTagName('path');

                    foreach ($paths as $key => $path) {
                        $cordinated = $path->getAttributeNode('d');
                        $points = $cordinated->value;  

                        $other_details['class']='layer unassign';
                        $svgElement = new SvgElement();
                        $svgElement->svg_id = $svg->id;
                        $svgElement->object_type = 'unassign';
                        $svgElement->object_id = 0;
                        $svgElement->points =$points;
                        $svgElement->canvas_type = 'path';
                        $svgElement->other_details = $other_details;
                        $svgElement->save();

                        $mediaId ='';
                        $message =  $fileName .' Svg Successfully Uploaded';
                        $code ='201';
    
                    }
                    \File::delete($targetDir. $newFilename);

            }
            else
            {

                    $fileName = $file->getClientOriginalName();
                    $fileData = explode('.', $fileName);

                    //$newFilename = rand() . '_' . $projectId . '.' . $fileExt;
                    $newFilename = $fileName;

                    $request->file( 'file' )->move( $targetDir, $newFilename );
                
           

                    $media = new Media();
                    $media->image_name = $newFilename;
                    $media->mediable_id = $projectId;
                    $media->mediable_type = 'CommonFloor\Project';
                    $media->save();

                    $mediaId = $media->id;
                    $position = 0;
                    /*if ('google_earth' === $type) {
                        $projectMeta = ProjectMeta::where( ['meta_key' => $type, 'project_id' => $projectId] )->first();
                        $projectMeta->project_id = $projectId;
                        $projectMeta->meta_key = $type;
                        $projectMeta->meta_value = $mediaId;
                        $projectMeta->save();
                    }
                    else*/
                    if ('shadow' === $type) {
                        $position = Input::get( 'position' );  
                        $projectMeta = ProjectMeta::where( ['meta_key' => $type, 'project_id' => $projectId] )->first();
                        $unSerializedValue = unserialize( $projectMeta->meta_value );
                        $unSerializedValue[$position] = $mediaId;
                        $projectMeta->meta_value = serialize( $unSerializedValue );
                        $projectMeta->save();
                    } else {

                        $file =  $fileData[0];
                        $fileArr = explode('-', $file);
                        $position = $fileArr[1];
                        $projectMeta = ProjectMeta::where( ['meta_key' => 'master', 'project_id' => $projectId] )->first();
                        $unSerializedValue = unserialize( $projectMeta->meta_value );
                        $unSerializedValue[$position] = $mediaId;
                        $projectMeta->meta_value = serialize( $unSerializedValue );
                        $projectMeta->save();
                    }

                    /*if ('google_earth' === $type) {
                        $message = 'Google Earth Image Successfully Uploaded';
                    } else*/

                    if ('master' === $type) {
                        $message = 'Project Master Image Successfully Uploaded';
                    }
                    /* elseif ('skyview' === $type) {
                        $message = 'Sky view Image Successfully Uploaded';
                    }*/
                    elseif ('shadow' === $type) {
                        $message = 'Shadow Image Successfully Uploaded';
                    }
                    
                    $code ='201';


            }
    
            
         }    

        return response()->json( [
                    'code' => $type . 'image_uploaded',
                    'message' => $message ,
                    'data' => [
                        'image_path' => $imageUrl . $newFilename,
                        'media_id' => $mediaId,
                        'position' => $position,
                        'filename' => $newFilename
                    ]
            ], $code );
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

            $shadowImages = ProjectMeta::where(['meta_key'=>'shadow','project_id'=>$project_id])->pluck('meta_value');
            $shadowImages = unserialize($shadowImages);
            
            if(!empty($breakpoints) && in_array($refference, $breakpoints))
            {
                $breakpointKey = array_search ($refference, $breakpoints);
                unset($breakpoints[$breakpointKey]);
                unset($shadowImages[$breakpointKey]);
            }
            $breakpointData =  ['meta_value'=>serialize($breakpoints)]; 
            ProjectMeta::where(['meta_key'=>'breakpoints','project_id'=>$project_id])->update( $breakpointData ); 
            
            $shadowData =  ['meta_value'=>serialize($shadowImages)]; 
            ProjectMeta::where(['meta_key'=>'shadow','project_id'=>$project_id])->update( $shadowData ); 
            

            $metaValue = unserialize($metaValue);
            $metaValueKey = array_search ($id, $metaValue);
            $metaValue[$metaValueKey]='';
            $data =  ['meta_value'=>serialize($metaValue)];  
 
        }
        elseif($type=='shadow')
        {           

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
        //unlink($targetDir);
        \File::delete($targetDir);
        $media->delete();
        
        return response()->json( [
                    'code' => 'media_deleted',
                    'message' => 'SVG Successfully Deleted'
                        ], 204 );
    }
    
    public function updateBreakPoint($projectId)
    {
        $position = Input::get( 'position' ); 
        if(!empty($position))
        {
            $projectMeta = ProjectMeta::where( ['meta_key' =>'breakpoints', 'project_id' => $projectId] )->first();
            $projectMeta->meta_value = serialize($position);
            $projectMeta->save();

            $shadowImages = ProjectMeta::where(['meta_key'=>'shadow','project_id'=>$projectId])->pluck('meta_value');
            $shadowImages = unserialize($shadowImages);

            $newShadowImages = [];
            foreach ($position as $key => $value) {
                if(isset($shadowImages[$value]))
                    $newShadowImages[$value] = $shadowImages[$value];
            }
  
            $shadowData =  ['meta_value'=>serialize($newShadowImages)]; 
            ProjectMeta::where(['meta_key'=>'shadow','project_id'=>$projectId])->update( $shadowData ); 

            $msg = 'Break Points Successfully Updated';
            $code = '201';
        }
        else
        {
            $msg = 'Break Points Not Selected';
            $code = '200';
        }
        
        
         return response()->json( [
            'code' => 'master_breakpoints',
            'message' => $msg, 
                ], $code );
 
    }
 

}
