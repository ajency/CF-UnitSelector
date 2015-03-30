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

        $projectMeta = [
            new ProjectMeta( ['meta_key' => 'floor_rise'] ),
            new ProjectMeta( ['meta_key' => 'stamp_duty'] ),
            new ProjectMeta( ['meta_key' => 'registration_amount'] ),
            new ProjectMeta( ['meta_key' => 'VAT'] ),
            new ProjectMeta( ['meta_key' => 'service_tax'] ),
            new ProjectMeta( ['meta_key' => 'service_tax_above_1cr'] ),
            new ProjectMeta( ['meta_key' => 'infrastructure_charge'] ),
            new ProjectMeta( ['meta_key' => 'membership_fees'] )
        ];

        $project->projectMeta()->saveMany( $projectMeta );

        return $project;
    }

    public function updateProject( $projectId, $projectData ) {

        $project = new Project();

        if (isset( $projectData['project_update'] ) && $projectData['project_update'] == 'DETAILS') {

            $project_title = $projectData['project_title'];
            $project_address = $projectData['project_address'];
            $property_types = implode( "||", $projectData['property_types'] );

            $data = array("project_title" => $project_title,
                "project_address" => $project_address,
                "property_types" => $property_types);

            $project->where( 'id', $projectId )->update( $data );
        } else {
            // update project meta
            foreach ($projectData as $meta_key => $meta_value) {
                $key_arr = explode( "_", $meta_key );
                $projectmetaId = $key_arr[0];

                $data = array("meta_value" => $meta_value);
                ProjectMeta::where( 'id', $projectmetaId )->update( $data );
            }
        }
        return $project;
    }

    public function getProjectById( $projectId ) {
        $project = Project::findOrFail( $projectId );
        return $project;
    }

}
