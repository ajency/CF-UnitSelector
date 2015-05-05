<?php

namespace CommonFloor\Repositories;

use CommonFloor\Project;
use CommonFloor\ProjectMeta;
use CommonFloor\UnitType;
use CommonFloor\ProjectPropertyType;
use Auth;
use CommonFloor\ProjectJson;

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
        $project->project_title = ucfirst($projectData['project_title']);
        $project->project_address = ucfirst($projectData['project_address']);
        $property_types = $projectData['property_types'];   
        $project->cf_project_id = $projectData['cf_project_id'];
        $project->city = $projectData['city'];
        $project->project_title = $projectData['project_title'];
        $project->created_by = $project->updated_by = Auth::user()->id;
        $project->save();
        
        $projectpropertyType=[];
        foreach ($property_types as $type)
        {
            $projectpropertyType[]= new ProjectPropertyType(['property_type_id'=>$type]);
        }
        $project->projectPropertyTypes()->saveMany($projectpropertyType);

        $commonFloorData = [
            'project_title' => $projectData['hidden_project_title'],
            'project_address' => $projectData['hidden_project_address'],
            'builder_name' => $projectData['builder_name'],
            'builder_link' => $projectData['builder_link'],
            'project_image' => $projectData['project_image'],
        ];

        $defaultMaster = [];
        
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
                'meta_value' => serialize( $commonFloorData )] ),
            new ProjectMeta( ['meta_key' => 'master',
                'meta_value' => serialize($defaultMaster)
            ]),
            new ProjectMeta( ['meta_key' => 'google_earth',
                'meta_value' => ''
            ]),
            new ProjectMeta( ['meta_key' => 'skyview',
                'meta_value' => ''
            ]),
            new ProjectMeta( ['meta_key' => 'breakpoints',
                'meta_value' => serialize([])] ),
        ];

        $project->projectMeta()->saveMany( $projectMeta );

        //create json record
        $projectJson = new ProjectJson;
        $projectJson->project_json = [];
        $projectJson->type = 'step_two';
        $projectJson->project_id = $project->id;
        $projectJson->save();

        return $project;
    }

    public function updateProject( $projectId, $projectData ) {

        $project = Project::find( $projectId );

        if (isset( $projectData['project_update'] ) && 'DETAILS'===$projectData['project_update']) {

            $project_title = ucfirst($projectData['project_title']);
            $project_address = ucfirst($projectData['project_address']);
            $property_types_arr = $projectData['property_types'];
            $property_status = $projectData['property_status'];

            $project->project_title = $project_title;
            $project->project_address = $project_address;
            $project->status = $property_status;
            $project->save(); 
            
            //Get Project Property Type
            $existingpropertyTypeArr =[];
            $projectPropertytype = $project->projectPropertyTypes()->select('property_type_id')->get()->toArray();
            foreach ($projectPropertytype as $property_types)
              foreach ($property_types as $types)  
                    $existingpropertyTypeArr []= $types;
          
            $newpropertyType = array_diff($property_types_arr,$existingpropertyTypeArr); 
            $deletedpropertyType = array_diff($existingpropertyTypeArr,$property_types_arr);  
            
            if(!empty($deletedpropertyType))
                ProjectPropertyType::where(['property_type_id'=>$deletedpropertyType,'project_id'=>$projectId])->delete();
            
            if(!empty($newpropertyType))
            {
                $property_types_arr=[];
               foreach ($newpropertyType as $type)
                {
                    $property_types_arr[]= new ProjectPropertyType(['property_type_id'=>$type]);
                }  
              $project->projectPropertyTypes()->saveMany($property_types_arr);
            }

            //unit type
            $propertyunitArr = (isset($projectData['unittype']))?$projectData['unittype']:[];  
            $unitkeyArr = (isset($projectData['unittypekey']))?$projectData['unittypekey']:[]; 

            if (!empty( $propertyunitArr )) {

                foreach ($propertyunitArr as $propertytypeId => $unit_arr) { 
                    
                    foreach ($unit_arr as $key => $unitname) {                        

                        if ((!isset($unitkeyArr[$propertytypeId][$key]))) { 
                            
                            $unittype = new UnitType();
                            
                            $projectPropertyTypeId = ProjectPropertyType::where(['project_id' => $project->id, 'property_type_id' => $propertytypeId])->pluck('id');
                            $unittype->project_property_type_id = $projectPropertyTypeId;
                            $unittype->unittype_name = ucfirst($unitname);
                            $unittype->save();    
                                                            
                            } else {
                               
                            $unittype_id = $unitkeyArr[$propertytypeId][$key];
                            $data = array("unittype_name" => ucfirst($unitname));
                            UnitType::where( 'id', $unittype_id )->update( $data );
                        }
                        
                    } 
                   
                        
                }  
            }
        } else {
            // update project meta

            unset( $projectData['phase'] );       // Remove phases 
            //project cost
            foreach ($projectData as $meta_key => $meta_value) {
                $keyArr = explode( "_", $meta_key );
                $projectmetaId = $keyArr[0];

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
