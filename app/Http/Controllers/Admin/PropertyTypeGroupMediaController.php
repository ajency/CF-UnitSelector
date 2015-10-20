<?php namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use File;
use \Input;
use CommonFloor\Media;
use CommonFloor\PropertyTypeGroup;
use CommonFloor\Svg;
use CommonFloor\SvgElement;
use \DomDocument;


class PropertyTypeGroupMediaController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store($groupId, Request $request) {

        $type = Input::get( 'type' ); 
        $group = PropertyTypeGroup::find($groupId);
        $projectId = $request->get('projectId');
        $targetDir = public_path() . "/projects/" . $projectId . "/group/" . $groupId;
        File::makeDirectory($targetDir, $mode = 0755, true, true);
        $newFilename = '';
        if ($request->hasFile('file')) {
            $file = $request->file('file');
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

                    $svgPath  = $targetDir. '/'.$newFilename;
                    $xdoc = new DomDocument();
                    $xdoc->Load($svgPath);
                    $paths = $xdoc->getElementsByTagName('path');
                    if(!empty($paths))
                    {
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
    
                        }
                    }

                    $polygons = $xdoc->getElementsByTagName('polygon');
                    if(!empty($polygons))
                    {
                        foreach ($polygons as $key => $polygon) {
                            $cordinated = $polygon->getAttributeNode('points');
                            $points= $cordinated->value;  

                            $other_details['class']='layer unassign';
                            $svgElement = new SvgElement();
                            $svgElement->svg_id = $svg->id;
                            $svgElement->object_type = 'unassign';
                            $svgElement->object_id = 0;
                            $svgElement->points =$points;
                            $svgElement->canvas_type = 'polygon';
                            $svgElement->other_details = $other_details;
                            $svgElement->save();
    
                        }
                    }
                    

                    $mediaId ='';
                    $message =  $fileName .' Svg Successfully Uploaded';
                    $code ='201';
                    \File::delete($targetDir. $newFilename);

            }
            else
            {
            //if(($width >=1600 && $height >=800) && ($height==($width/2)))
            //{
                $fileName = $file->getClientOriginalName();
                $fileData = explode('.', $fileName);
                $newFilename = $fileName;
                $request->file('file')->move($targetDir, $newFilename);


                $media = new Media();
                $media->image_name = $newFilename;
                $media->mediable_id = $groupId;
                $media->mediable_type = 'CommonFloor\PropertyTypeGroup';
                $media->save();
                $mediaId = $media->id;

                if ('shadow' === $type) {
                    $shadowImages =  $group->shadow_images;
                    $file =  $fileData[0];
                    $fileArr = explode('-', $file);
                    $position = $fileArr[1];

                    $shadowImages[$position] = $media->id;
                    $group->shadow_images = $shadowImages;
                    $group->save();
                    $code ='201';
                    $message ='Shadow Image Added';
                } 
                else
                {
                    $groupMaster = $group->group_master;
                    $file =  $fileData[0];
                    $fileArr = explode('-', $file);
                    $position = $fileArr[1];

                    $groupMaster[$position] = $media->id;
                    $group->group_master = $groupMaster;
                    $group->save();
                    $code ='201';
                    $message ='Group Master Image Added'; 
                }
          }      
                
           /* }
            else
            {
                $code ='200';
                $message ='Invalid Image dimensions';
                $newFilename ='';
                $mediaId ='';
                $position ='';
            }*/
        }
        return response()->json([
                    'code' => 'group_media_added',
                    'message' => $message,
                    'data' => [
                        'media_id' => $mediaId,
                        'position' => $position,
                        'filename' => $file,
                        'image_path' => url() . '/projects/' . $projectId . '/group/' . $groupId . '/' . $newFilename
                    ]
                        ], $code);
    }

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */

	public function destroy($groupId, $id) {

        $type = Input::get('type');
        $refference = Input::get('refference');
        $projectId = Input::get( 'projectId' );


        $group = PropertyTypeGroup::find($groupId);
        $metaValue = $group->group_master;
        $shadowImages = $group->shadow_images;
        $breakpoints = $group->breakpoints; 
        $data = [];
        if($type=='master')
        {
            //$breakpoints = (!empty($breakpoints))?unserialize($breakpoints):[];
            $breakpointKey = array_search ($refference, $breakpoints);
            unset($breakpoints[$breakpointKey]);
            //$breakpoints = serialize($breakpoints);

            //$shadowImages = (!empty($shadowImages))?unserialize($shadowImages):[];
            $shadowImagesKey = array_search ($refference, $shadowImages);
            unset($shadowImages[$shadowImagesKey]);
           // $shadowImages = $shadowImages;
            
            $metaValueKey = array_search ($id, $metaValue);
            $metaValue[$metaValueKey]='';
      
            $group->breakpoints = $breakpoints;
            $group->shadow_images = $shadowImages;
            $group->group_master = $metaValue;
            $group->save();
        }
        elseif($type=='shadow')
        {   
            
            $position = array_search($id, $shadowImages); 
            unset($shadowImages[$position]);  

            $group->shadow_images = $shadowImages;
            $group->save();  
 
        }
       
        $media = Media::find( $id );
        $targetDir = public_path() . "/projects/" . $projectId . "/group/" . $groupId . "/".$media->image_name;
        //unlink($targetDir);
        \File::delete($targetDir);
 
        $media->delete();

        return response()->json([
                    'code' => 'media_deleted',
                    'message' => 'SVG Successfully Deleted'
                        ], 204);
    }
    
     public function updateBreakPoint($groupId)
    {
        $position = Input::get( 'position' ); 
        if(!empty($position))
        {
            $group = PropertyTypeGroup::find($groupId);
            $group->breakpoints = $position;
            $group->save();
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
