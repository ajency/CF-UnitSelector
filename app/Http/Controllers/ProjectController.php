<?php

namespace CommonFloor\Http\Controllers;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;

class ProjectController extends Controller {

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $projectId, ProjectRepository $projectRepository ) {
        $project = $projectRepository->getProjectById( $projectId );

        if ($project === null) {
            abort( 404 );
        }

        return view( 'frontend.projectview' )->with( $project->toArray() );
    }
}
