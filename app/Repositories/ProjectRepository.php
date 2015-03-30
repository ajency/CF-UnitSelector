<?php

namespace CommonFloor\Repositories;

use CommonFloor\Project;
use CommonFloor\ProjectMeta;
use Auth;

/**
 * Description of ProjectRepository
 *
 * @author surajair
 */
class ProjectRepository implements ProjectRepositoryInterface {

    public function createProject($projectData) {
        $project = new Project();
        $project->project_title = $projectData['project_title'];
        $project->project_address = $projectData['project_address'];
        $project->property_types = implode("||", $projectData['property_types']);
        $project->cf_project_id = $projectData['cf_project_id'];
        $project->city = $projectData['city'];
        $project->project_title = $projectData['project_title'];
        $project->created_by = $project->updated_by = Auth::user()->id;
        $project->save();

        // add project meta
       
        $projectMeta = [
            new ProjectMeta(['meta_key' => 'floor_rise']),
            new ProjectMeta(['meta_key' => 'stamp_duty']),
            new ProjectMeta(['meta_key' => 'registration_amount']),
            new ProjectMeta(['meta_key' => 'VAT']),
            new ProjectMeta(['meta_key' => 'service_tax']),
            new ProjectMeta(['meta_key' => 'service_tax_above_1cr']),
            new ProjectMeta(['meta_key' => 'infrastructure_charge']),
            new ProjectMeta(['meta_key' => 'membership_fees'])
        ];

        $project->projectMeta()->saveMany($projectMeta);

        return $project;
    }

    public function getProjectById($projectId) {
        $project = Project::findOrFail($projectId);
        return $project;
    }

}
