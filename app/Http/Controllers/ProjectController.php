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
            $data = $projectRepository->getProjectById( $projectId );

            if ($data === null) {
            abort( 404 );
            }


           
        }
        else
        {
            $data  = ProjectJson::where('project_id', $projectId)
                                        ->where('type', 'step_one')->get()->first()->project_json;
                            
            if (empty($data)) {
            abort( 404 );
            }                          
            
        }
 
        return view( 'frontend.projectview' )->with( 'id' , $data['id'])
                                            ->with( 'project_title' , $data['project_title']);
    }
}
