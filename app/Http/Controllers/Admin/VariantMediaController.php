<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \File;
use \Input;
use CommonFloor\Media;
use CommonFloor\VariantMeta;

class VariantMediaController extends Controller {

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
    public function store($id, Request $request) {
        $level = Input::get('level');
        $layout = Input::get('layout');
        $projectId = Input::get('projectId');
        $foldername = ($id)?$id:'temp';

        $targetDir = public_path() . "/projects/" . $projectId . "/variants/" . $foldername . "/";
        $imageUrl = url() . "/projects/" . $projectId . "/variants/" . $foldername . "/";

        File::makeDirectory($targetDir, $mode = 0755, true, true);

        if ($request->hasFile('file')) {

            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $fileExt = $file->guessClientExtension();
            $newFilename = rand() . '_' . $id . '.' . $fileExt;

            $request->file('file')->move($targetDir, $newFilename);
        }
        
        
        $media = new Media();
        $media->image_name = $newFilename;
        $media->mediable_id = $id;
        $media->mediable_type = 'CommonFloor\UnitVariant';
        $media->save();

        $mediaId = $media->id;
        if($id)
        {
            if($level=='gallery')
            {
                $variantMetaData = VariantMeta::where(['unit_variant_id'=>$id ,'meta_key'=>'gallery'])->first()->toArray(); 
                $metaValue = unserialize($variantMetaData['meta_value']);
                $variantMetaId = $variantMetaData['id'];
                $metaValue[$mediaId]  = $mediaId;

                $variantMeta = VariantMeta::find($variantMetaId);
                $variantMeta->meta_value = serialize($metaValue);
                $variantMeta->save();

            }
            else {

                $variantMeta = new VariantMeta();
                $variantMeta->unit_variant_id = $id;
                $variantMeta->meta_key = $level.'-'.$layout;
                $variantMeta->meta_value = $mediaId;
                $variantMeta->save();

            }
        }

        return response()->json([
                    'code' => 'image_uploaded',
                    'message' => 'Floor ' . $level . ' Image Successfully Uploaded',
                    'data' => [
                        'image_path' => $imageUrl . $newFilename,
                        'media_id' => $mediaId,
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
    public function destroy($variantId,$id) {
        
        $type = Input::get( 'type' ); 
        $projectId = Input::get( 'projectId' );
 
        if($type=='gallery')
        {
            $variantMetaData = VariantMeta::where(['unit_variant_id'=>$variantId ,'meta_key'=>'gallery'])->first()->toArray(); 
            $metaValue = unserialize($variantMetaData['meta_value']);
            $variantMetaId = $variantMetaData['id'];
            unset($metaValue[$id]);
            
            $variantMeta = VariantMeta::find($variantMetaId);
            $variantMeta->meta_value = serialize($metaValue);
            $variantMeta->save();
            
        }
        else
        {
            if($variantId)
                 VariantMeta::where('meta_value',$id)->delete();
        }
 
        $media = Media::find( $id );
        $targetDir = public_path() . "/projects/" . $projectId . "/variants/" . $variantId . "/".$media->image_name;
        unlink($targetDir);
        $media->delete();

        return response()->json( [
                    'code' => 'media_deleted',
                    'message' => 'Layout Successfully Deleted'
                        ], 204 );
        
    }

}
