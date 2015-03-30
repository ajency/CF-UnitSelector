<?php

namespace CommonFloor\Repositories;

use CommonFloor\Project;
use Auth;

/**
 * Description of ProjectRepository
 *
 * @author surajair
 */
class ProjectRepository implements ProjectRepositoryInterface {

    public function createProject( $projectData ) {
        $project = new Project();
        $project->project_title = $projectData['project_title'];
        $project->project_address = $projectData['project_address'];
        $project->property_types = implode( "||", $projectData['property_types'] );
        $project->cf_project_id = $projectData['cf_project_id'];
        $project->city = $projectData['city'];
        $project->project_title = $projectData['project_title'];
        $project->created_by = $project->updated_by = Auth::user()->id;
        $project->save();
        
        // add project meta
        
        
        return $project;
    }

    public function getProjectById( $projectId ) {
        $project = Project::findOrFail( $projectId );
        return $project;
    }

}
