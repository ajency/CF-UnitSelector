<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \File;

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
    public function store($project_id,Request $request) {
         dd($request);
        $type = $request->get('parameters')['type']; 
        $targetDir = storage_path() . "/projects/" . $project_id . "/";
        File::makeDirectory($targetDir, $mode = 0777, true, true);
        
        if ($request->hasFile('file')) {
     
            $file = $request->file('file');
            $file_name = $file->getClientOriginalName();
            $request->file('file')->move($targetDir,$file_name);
           
        }
        
         return response()->json( [
                    'code' => $type.'image_uploaded',
                    'message' => 'Google Earth Image Successfully Uploaded',
                    'data' => [
                        'image_path' => $targetDir.$file_name
                    ]
                        ], 201 );
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
