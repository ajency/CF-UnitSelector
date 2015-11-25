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
        
        $agentId = \Request::segment(3);
        if($agentId!='')
        {
            $userRoleId = \CommonFloor\User::find($agentId)->userRole()->first()->id; 
            $isAssignedProject = \CommonFloor\UserRole::find($userRoleId)->userProject()->where('project_id', $projectId)->get()->toArray(); 
            if (empty($isAssignedProject)) {
                abort( 404 );
            }
    
        }
        
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
        $commonFloorData = unserialize( $projectRepository->getProjectById( $projectId )->projectMeta()->where( 'meta_key', 'cf' )->first()->meta_value );
        
        $property_page_link = ($commonFloorData['property_page_link']!='')?CF_WEBSITE_URL.$commonFloorData['property_page_link']:'#';
 
        return view( 'frontend.reactprojectview' )->with( 'id' , $data['id'])
                                            ->with( 'project_title' , $data['project_title'])
                                            ->with( 'property_page_link' , $property_page_link)
                                            ->with( 'agent_id' , $agentId)
                                            ->with( 'unitSelectorAuthKey' , unitSelectorAuthKey);
    }
}
