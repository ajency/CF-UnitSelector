<?php

namespace CommonFloor\Repositories;

use CommonFloor\Project;
use CommonFloor\ProjectMeta;
use CommonFloor\UnitType;
use CommonFloor\ProjectPropertyType;
use Auth;
use CommonFloor\ProjectJson;
use CommonFloor\Defaults;
use CommonFloor\Attribute;
use CommonFloor\Phase;
use CommonFloor\UserProject;

/**
 * Description of ProjectRepository
 *
 * @author surajair
 */
class ProjectRepository implements ProjectRepositoryInterface {

    private $project;

    public function __construct(Project $project) {
        $this->project = $project;
    }

    public function createProject($projectData) {
        $project = new Project();
        $project->project_title = ucfirst($projectData['project_title']);
        $project->project_address = ucfirst($projectData['project_address']);
        $project->cf_project_id = $projectData['cf_project_id'];
        $project->city = $projectData['city'];
        $project->area_name = $projectData['select_area_list'];
        $project->area_code = $projectData['area_code'];
        $project->measurement_units = 'Sq. Ft.';
        $project->has_phase = 'no';
        $project->created_by = $project->updated_by = Auth::user()->id;
        $project->save();

        //CREATE DFAULT PHASE
        $phase = new Phase();
        $phase->project_id = $project->id;
        $phase->phase_name = 'Default';
        $phase->save();

        $commonFloorData = [
            'project_title' => $projectData['hidden_project_title'],
            'project_address' => $projectData['hidden_project_address'],
            'builder_name' => $projectData['builder_name'],
            'builder_link' => $projectData['builder_link'],
            'project_image' => $projectData['project_image'],
            'property_page_link' => $projectData['property_page_link'],
        ];

        $defaultMaster = [];
        $defaultShadow = [];

        // add project meta
        $projectMeta = [
            //new ProjectMeta(['meta_key' => 'floor_rise']),
            new ProjectMeta(['meta_key' => 'stamp_duty']),
            new ProjectMeta(['meta_key' => 'registration_amount']),
            new ProjectMeta(['meta_key' => 'VAT']),
            new ProjectMeta(['meta_key' => 'service_tax']),
            new ProjectMeta(['meta_key' => 'service_tax_above_1cr']),
            new ProjectMeta(['meta_key' => 'infrastructure_charge']),
            new ProjectMeta(['meta_key' => 'membership_fees']),
            new ProjectMeta(['meta_key' => 'builder_name',
                'meta_value' => $projectData['builder_name']]),
            new ProjectMeta(['meta_key' => 'builder_link',
                'meta_value' => $projectData['builder_link']]),
            new ProjectMeta(['meta_key' => 'project_image',
                'meta_value' => $projectData['project_image']]),
            new ProjectMeta(['meta_key' => 'cf',
                'meta_value' => serialize($commonFloorData)]),
            new ProjectMeta(['meta_key' => 'master',
                'meta_value' => serialize($defaultMaster)
                    ]),
            new ProjectMeta(['meta_key' => 'shadow',
                'meta_value' => serialize($defaultShadow)
                    ]),
            /*new ProjectMeta(['meta_key' => 'google_earth',
                'meta_value' => ''
                    ]),*/
            new ProjectMeta(['meta_key' => 'skyview',
                'meta_value' => ''
                    ]),
            new ProjectMeta(['meta_key' => 'breakpoints',
                'meta_value' => serialize([])]),
            new ProjectMeta(['meta_key' => 'filters',
                'meta_value' => serialize([])]),
        ];

        $project->projectMeta()->saveMany($projectMeta);

        //create json record
        $projectJson = new ProjectJson;
        $projectJson->project_json = [];
        $projectJson->type = 'step_one';
        $projectJson->project_id = $project->id;
        $projectJson->save();

        $projectJson = new ProjectJson;
        $projectJson->project_json = [];
        $projectJson->type = 'step_two';
        $projectJson->project_id = $project->id;
        $projectJson->save();
        
        $userId = Auth::user()->id;
        $defaultRole = getDefaultRole($userId);
        $userRoleId  = $defaultRole['id'];
        if($defaultRole['PROJECT_ACCESS']=='specific')          //User with specific access assign project
        {
            $userProject = new UserProject();
            $userProject->role_user_id = $userRoleId;
            $userProject->project_id = $project->id;
            $userProject->save();
        
        }
             
            
        return $project;
    }

    public function updateProject($projectId, $projectData) {

        $project = Project::find($projectId);
    
        $project_title = ucfirst($projectData['project_title']);
        $project_address = ucfirst($projectData['project_address']);
        $property_types_arr = (isset($projectData['property_types'])) ? $projectData['property_types'] : []; 
        $merchant_id = $projectData['merchant_id'];
        $salt = $projectData['salt'];
        $property_measurement_units = $projectData['measurement_units'];
        $property_has_phases = $projectData['has_phases'];
        $property_has_master = $projectData['has_master'];

        $project->project_title = $project_title;
        $project->project_address = $project_address;
        $project->merchant_id = $merchant_id;
        $project->salt = $salt;
        $project->measurement_units = $property_measurement_units;
        $project->has_phase = $property_has_phases;
        $project->has_master = $property_has_master;
        $project->updated_by = Auth::user()->id;
        $project->save();
        
        if($property_has_phases=='no')
        {
            $hasphases = Phase::where('project_id',$projectId)->get()->toArray();
            if(empty($hasphases))
            {
                $phase = new Phase();
                $phase->project_id = $projectId;
                $phase->phase_name = 'Default';
                $phase->save();
            }
            elseif (count($hasphases)==1) {
                $phase = Phase::find($hasphases[0]['id']);
                $phase->project_id = $projectId;
                $phase->phase_name = 'Default';
                $phase->save();
            
            }
            else {
                $project->has_phase = 'yes';
                $project->save();
            }
        }
 

        //Get Project Property Type
        $existingpropertyTypeArr = [];
        $projectPropertytypes = $project->projectPropertyTypes()->get()->toArray();

        foreach ($projectPropertytypes as $property_types) {
            $existingpropertyTypeArr [] = $property_types['property_type_id'];
        }

        $newpropertyType = array_diff($property_types_arr, $existingpropertyTypeArr);
        $deletedpropertyType = array_diff($existingpropertyTypeArr, $property_types_arr); 

        if (!empty($deletedpropertyType))
            ProjectPropertyType::whereIn('property_type_id' ,$deletedpropertyType)->where('project_id' , $projectId)->delete();

        if (!empty($newpropertyType)) {
            $property_types_arr = [];
            foreach ($newpropertyType as $type) {
                $property_types_arr[] = new ProjectPropertyType(['property_type_id' => $type]);
            }
           
            $project->projectPropertyTypes()->saveMany($property_types_arr);
        }
        
         

        //unit type
        $propertyunitArr = (isset($projectData['unittype'])) ? $projectData['unittype'] : []; //dd($propertyunitArr);
        $unitkeyArr = (isset($projectData['unittypekey'])) ? $projectData['unittypekey'] : []; //dd($unitkeyArr);
        $unitCustomeArr = (isset($projectData['unittypecustome'])) ? $projectData['unittypecustome'] : []; //dd($unitCustomeArr);

        if (!empty($propertyunitArr)) {

            foreach ($propertyunitArr as $propertytypeId => $unit_arr) {

                foreach ($unit_arr as $key => $unitname) {

                    if ($unitname == '')
                        continue;

                    $projectPropertyTypeId = ProjectPropertyType::where(['project_id' => $project->id, 'property_type_id' => $propertytypeId])->pluck('id');

                    if ((isset($unitCustomeArr[$propertytypeId][$key])) && $unitCustomeArr[$propertytypeId][$key] === 'CUSTOME') {
                        $propertyTypeIds = [ "1" => "villa_unit_types", "2" => "plot_unit_types", "3" => "appartment_unit_types", "4" => "penthouse_unit_types"];
                        $default = new Defaults();
                        $default->type = 'custome_' . $propertyTypeIds[$propertytypeId];
                        $default->label = $unitname;
                        $default->serialize_data = serialize([]);
                        $default->save();
                        $unitname = $default->id;
                    }

                    if ((isset($unitkeyArr[$propertytypeId][$key])) && $unitkeyArr[$propertytypeId][$key] == '') {
                        $unittype = new UnitType();

                        $unittype->project_property_type_id = $projectPropertyTypeId;
                        $unittype->unittype_name = ucfirst($unitname);
                        $unittype->save();
                    } else {

                        $unittype_id = $unitkeyArr[$propertytypeId][$key];
                        $data = array("unittype_name" => ucfirst($unitname));
                        UnitType::where('id', $unittype_id)->update($data);
                    }
                }

            }
        }
        //ATTRIBUTES
        $objecttype = 'Property';
        $projectAttributes = $projectData['projectattributes'];
        $projectAttributeIds = $projectData['projectattributeId'];
        $attributes =[];
        foreach ($projectAttributes as $key => $attribute) {
            $projectAttributeId = $projectAttributeIds[$key];
            if ($projectAttributeId == '') {
                if ($attribute != '')
                    $attributes[] = new Attribute(['label' => ucfirst($attribute), 'control_type' => 'checkbox', 'defaults' => '',
                        'object_type' => $objecttype, 'object_id' => $projectId]);
            } else {
                $data = array("label" => ucfirst($attribute));
                Attribute::where('id', $projectAttributeId)->update($data);
            }
            
        }
        if (!empty($attributes)) {
            $project->attributes()->saveMany($attributes);
        }
        
        $objecttype = 'PropertyType';
        $projectPropertytypes = $project->projectPropertyTypes()->get()->toArray();
        if (!empty($projectPropertytypes)) {

            foreach ($projectPropertytypes as $projectpropertytype) {
                
                $propertytypeId = $projectpropertytype['property_type_id'];
                $projectPropertyTypeId = $projectpropertytype['id'];
  
                $attributeNameArr = $projectData['attribute_name_' . $propertytypeId];
                $controlTypeArr = $projectData['controltype_' . $propertytypeId];
                $controlValueArr = (isset($projectData['controltypevalues_' . $propertytypeId])) ? $projectData['controltypevalues_' . $propertytypeId] : [];
                $attributeIdArr = $projectData['attribute_id_' . $propertytypeId];
                $attributes = [];
                
                 if (!empty($attributeNameArr)) {
                    foreach ($attributeNameArr as $key => $attributeName) {
                        $attributeName = ucfirst($attributeName);
                        $controlType = $controlTypeArr[$key];
                        $controlValues = (isset($controlValueArr[$key])) ? $controlValueArr[$key] : '';
                        $attributeId = $attributeIdArr[$key];

                        if ($attributeId == '') {
                            if ($attributeName != '' && $controlType!='')
                                $attributes[] = new Attribute(['label' => $attributeName, 'control_type' => $controlType, 'defaults' => $controlValues,
                                    'object_type' => $objecttype, 'object_id' => $projectPropertyTypeId]);
                        } else {
                            $data = array("label" => $attributeName, "control_type" => $controlType, 'defaults' => $controlValues);
                            Attribute::where('id', $attributeId)->update($data);
                        }
                        if (!empty($attributes)) {
                            ProjectPropertyType::find($projectPropertyTypeId)->attributes()->saveMany($attributes);
                        }
                    }
                }
                
            }
        }
 
        return $project;
    }

    public function getProjectById($projectId) {
        $project = $this->project->find($projectId);
        return $project;
    }

}
