<?php

namespace CommonFloor\Http\Controllers;

use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Repositories\ProjectRepository;
use Illuminate\Support\Facades\Auth;
use CommonFloor\ProjectJson;

class ProjectController extends Controller {

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $projectId, ProjectRepository $projectRepository ) {
        
         if (Auth::check())
        {
            $project = $projectRepository->getProjectById( $projectId )->toArray();
           
        }
        else
        {
            $project = ProjectJson::where('project_id', $projectId)
                                        ->where('type', 'step_two')->get()->first();
                                     
            
        }

        if ($project === null) {
            abort( 404 );
        }
        

        return view( 'frontend.projectview' )->with( 'id' , $project['id'])
                                            ->with( 'project_title' , $project['project_title']);
    }
}
