<?php

namespace CommonFloor\Repositories;

use CommonFloor\Project;
use CommonFloor\ProjectMeta;
use CommonFloor\UnitType;
use CommonFloor\ProjectPropertyType;
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
                ProjectPropertyType::whereIn('id', $deletedpropertyType)->delete();
            
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
            $propertyunit_arr = $projectData['unittype'];  
            $unitkey_arr = $projectData['unittypekey']; 
           

            if (!empty( $propertyunit_arr )) {

                foreach ($propertyunit_arr as $propertytype_id => $unit_arr) { 
                    
                    $unit_type = [];
                    foreach ($unit_arr as $key => $unitname) {                        

                        if ((!isset($unitkey_arr[$propertytype_id][$key]))) { 
                            
                            $unittype = new UnitType();
                            
                            $project_property_type_id = ProjectPropertyType::where(['project_id' => $project->id, 'property_type_id' => $propertytype_id])->pluck('id');
                            $unittype->project_property_type_id = $project_property_type_id;
                            $unittype->unittype_name = $unitname;
                            $unittype->save();    
                                                            
                            } else {
                               
                            $unittype_id = $unitkey_arr[$propertytype_id][$key];
                            $data = array("unittype_name" => $unitname);
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
