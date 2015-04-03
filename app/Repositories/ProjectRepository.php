<?php

namespace CommonFloor\Repositories;

use CommonFloor\Project;
use CommonFloor\ProjectMeta;
use CommonFloor\UnitType;
use Auth;

/**
 * Description of ProjectRepository
 *
 * @author surajair
 */
class ProjectRepository implements ProjectRepositoryInterface {

    private $project;

    public function __construct( Project $project ) {
        $this->project = $project;
    }

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

        $commonFloorData = [
            'project_title' => $projectData['project_title'],
            'project_address' => $projectData['project_address'],
            'builder_name' => $projectData['builder_name'],
            'builder_link' => $projectData['builder_link'],
            'project_image' => $projectData['project_image'],
        ];

        // add project meta
        $projectMeta = [
            new ProjectMeta( ['meta_key' => 'floor_rise'] ),
            new ProjectMeta( ['meta_key' => 'stamp_duty'] ),
            new ProjectMeta( ['meta_key' => 'registration_amount'] ),
            new ProjectMeta( ['meta_key' => 'VAT'] ),
            new ProjectMeta( ['meta_key' => 'service_tax'] ),
            new ProjectMeta( ['meta_key' => 'service_tax_above_1cr'] ),
            new ProjectMeta( ['meta_key' => 'infrastructure_charge'] ),
            new ProjectMeta( ['meta_key' => 'membership_fees'] ),
            new ProjectMeta( ['meta_key' => 'builder_name',
                'meta_value' => $projectData['builder_name']] ),
            new ProjectMeta( ['meta_key' => 'builder_link',
                'meta_value' => $projectData['builder_link']] ),
            new ProjectMeta( ['meta_key' => 'project_image',
                'meta_value' => $projectData['project_image']] ),
            new ProjectMeta( ['meta_key' => 'cf',
                'meta_value' => serialize( $commonFloorData )] )
        ];

        $project->projectMeta()->saveMany( $projectMeta );

        return $project;
    }

    public function updateProject( $projectId, $projectData ) {

        $project = Project::find( $projectId );

        if (isset( $projectData['project_update'] ) && $projectData['project_update'] == 'DETAILS') {

            $project_title = $projectData['project_title'];
            $project_address = $projectData['project_address'];
            $property_types = (!empty( $projectData['property_types'] )) ? implode( "||", $projectData['property_types'] ) : '';
            $property_status = $projectData['property_status'];

            $project->project_title = $project_title;
            $project->project_address = $project_address;
            $project->property_types = $property_types;
            $project->status = $property_status;
            $project->save();

            //unit type
            $propertyunit_arr = $projectData['unittype'];
            $unitkey_arr = $projectData['unittypekey'];
            $unit_type = [];

            if (!empty( $propertyunit_arr )) {

                foreach ($propertyunit_arr as $propertytype_id => $unit_arr) {

                    foreach ($unit_arr as $key => $unitname) {

                        if ($unitkey_arr[$key] == '') {

                            $unit_type[] = new UnitType( ['property_type' => $propertytype_id, 'unittype_name' => $unitname] );
                        } else {

                            $unittype_id = $unitkey_arr[$key];
                            $data = array("unittype_name" => $unitname);
                            UnitType::where( 'id', $unittype_id )->update( $data );
                        }
                    }
                    if (!empty( $unit_type ))
                        $project->projectUnitType()->saveMany( $unit_type );
                }
            }
        } else {
            // update project meta

            unset( $projectData['phase'] );       // Remove phases 
            //project cost
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
        $project = $this->project->find( $projectId );
        return $project;
    }

}
