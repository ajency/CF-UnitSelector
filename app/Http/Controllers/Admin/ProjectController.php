<?php

namespace CommonFloor\Http\Controllers\admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\repositories\ProjectRepository;
use CommonFloor\Project;

class ProjectController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {

        $projects = Project::all()->toArray();
        return view( 'admin.projects.list' )->with( 'projects', $projects );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        return view( 'admin.projects.add' );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( Request $request, ProjectRepository $projectRepository ) {

        $project = $projectRepository->createProject( $request->all() );
        if ($project !== null) {
            return redirect( "/admin/project" );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $id ) {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit( $id, ProjectRepository $projectRepository ) {
        $project = $projectRepository->getProjectById( $id );

        return view( 'admin.projects.settings', $project->toArray() );
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
