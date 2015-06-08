<?php

namespace CommonFloor\Http\Controllers\Rest;

use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Gateways\ProjectGatewayInterface;
use CommonFloor\ProjectJson;
use CommonFloor\Unit;
use CommonFloor\Project;
use CommonFloor\UnitVariant;
use CommonFloor\UnitType;
use CommonFloor\Building;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use \Input;

class ProjectController extends Controller {

    private $projectGateway;

    public function __construct( ProjectGatewayInterface $projectGateway ) {
        $this->projectGateway = $projectGateway;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $projectId ) {

        try {

            if (Auth::check())
            {
                $data = $this->projectGateway->getProjectStepOneDetails( $projectId );
            }
            else
            {
                $projectJson = ProjectJson::where('project_id', $projectId)
                                        ->where('type', 'step_one')->get()->first();
                $data = $projectJson->project_json;
                 
            }

            return response()->json( [
                                'data' => $data
                            ], 200, [], JSON_NUMERIC_CHECK );
        } catch (Exception $ex) {
            return response()->json( [
                                'code' => 'Failed',
                                'message' => 'Some error message'
                            ], 403 );
        }
    }

    public function stepTwo( $projectId ) {
                

        if (Auth::check())
        {
            $projectJsonData = $this->projectGateway->getProjectStepTwoDetails( $projectId );
        }
        else
        {
            $projectJson = ProjectJson::where('project_id', $projectId)
                                        ->where('type', 'step_two')->get()->first();
            $projectJsonData = $projectJson->project_json;    
        }
        
        if(!empty($projectJsonData))                             //UPDATE CURRENT UNIT STATUS TO JSON DATA
        {
            $unitData = [];
            $units = $projectJsonData['units'];
            foreach ($units as $unit)
            {
                $unit['availability']=  \CommonFloor\Unit::find($unit['id'])->availability;
                $unitData[]=$unit;
            }
            $projectJsonData['units']=$unitData;
        }
        return response()->json( [
                            'data' => $projectJsonData
                        ], 200, [], JSON_NUMERIC_CHECK );
    }

    public function updateResponseTable( $projectId ){
        $stepOneData = $this->projectGateway->getProjectStepOneDetails( $projectId );
        $stepTwoData = $this->projectGateway->getProjectStepTwoDetails( $projectId );

        $projectJson = ProjectJson::where('project_id', $projectId)
                                ->where('type', 'step_one')->get()->first();
        $projectJson->project_json = $stepOneData;
        $projectJson->save();

        $projectJson = ProjectJson::where('project_id', $projectId)
                                ->where('type', 'step_two')->get()->first();
        $projectJson->project_json = $stepTwoData;
        $projectJson->save();
        return response()->json( [
                            'code' => '',
                            'message' => 'Project json updated successfully'
                    ], 203 );
    }

    public function updateUnit($projectId, $unitId,Request $request){

        // default response and code
        $json_resp = array(
            'code' => 'unit_status_not_updated' , 
            'message' => 'Unit status not updated',
            'data' =>array()
            );
        $status_code = 400;

        // possible unit status
        $possible_status = array('available','sold','not_released','blocked','archived');
        
        // if status data passed then update
        if (isset($request['status'])) {

            // if wrong status string is passed
            if (!in_array($request['status'], $possible_status)) {
                $json_resp = array(
                                'code' => 'incorrect_status_type' , 
                                'message' => 'New status is incorrect'
                                );
                $status_code = 400;                

            }
            else{
                $unit = Unit::find($unitId);

                // if unit is not present
                if (is_null($unit)) {
                    $json_resp = array(
                        'code' => 'unit_not_found' , 
                        'message' => 'Unit not found',
                        'data' => array()
                        );
                    $status_code = 404;
                }
                else{
                    // if unit is present
                    $unit->availability = $request['status'];
                    $updateUnit = $unit->save();

                    if ($updateUnit) {
                        $json_resp = array(
                            'code' => 'status_updated' , 
                            'message' => 'Unit status updated',
                            'data' => array('unit_id' => $unit->id  )
                            );
                        $status_code = 201; 
                    }else{
                        $json_resp = array(
                            'code' => 'status_not_updated' , 
                            'message' => 'Unit status not updated',
                            'data' => array('unit_id' => $unit->id  )
                            );
                        $status_code = 500; 
                    }

                }
               
            }

        }
        else{
            // if status not passed
            $json_resp = array(
                'code' => 'status_not_passed' , 
                'message' => 'New Unit status not passed',
                'data' => array()
                );
            $status_code = 400;
        }


        return response()->json( $json_resp, $status_code);        


    }

    public function getCfProjectUrl(Request $request){
        // default response and code
        $json_resp = array(
            'code' => 'project_url_not_fetched' , 
            'message' => 'Project url not fetched',
            'data' =>array()
            );
        $status_code = 400;

        $getVar = Input::get();
        
        // get parameter set
        if (isset($getVar['cf_id'])) {
            $cf_project_id = $getVar['cf_id'];

            // get project by cf_project id
            $project = Project::where( 'cf_project_id', '=', $cf_project_id )->first();

            // if project not found
            if (is_null($project)) {
                $json_resp = array(
                    'code' => 'project_not_found' , 
                    'message' => 'Project not found',
                    'data' =>array()
                    );
                $status_code = 404;                
            }
            else{
                // else if project found then return url
                $project_id = $project->id;

                $unit_selector_url = url()."/project/".$project_id;

                $json_resp = array(
                    'code' => 'project_url_fetched' , 
                    'message' => 'Project url fetched',
                    'data' =>array('unit_selector_url' => $unit_selector_url)
                    );
                $status_code = 200;                


            }

        }
        else{
            // get parameter not set
            $json_resp = array(
                'code' => 'missing_project_id' , 
                'message' => 'Project id missing',
                'data' => array()
                );
            $status_code = 400;
        }

        return response()->json( $json_resp, $status_code);
    }  

    public function getUnit($projectId, $unitId, Request $request) {

        $response_data = array();

        // default response and code
        $json_resp = array(
            'code' => 'unit_summary_not_fetched' , 
            'message' => 'Unit summary not fetched',
            'data' => $response_data
            );
        $status_code = 400;

        $getVar = Input::get();  

        // UNIT DATA
        $unit = Unit::find($unitId);
        

        // if unit not found
        if (is_null($unit)) {
            $json_resp = array(
                'code' => 'unit_not_found' , 
                'message' => 'Unit not found',
                'data' => $response_data
                );
            $status_code = 404;
        }
        else{
            // get unit summary
            $response_data['unit'] = array(
                                        'id'=>$unit->id,
                                        'name'=>$unit->unit_name,
                                        'position'=>$unit->position,
                                        'floor_number'=>$unit->floor,
                                        'status'=>$unit->availability,
                                     );
            // project id, project name, building id, building name, floor number, unit name, super built, built up, carpet, price per sq ft.

            // get building data if set
            $building_id = $unit->building_id;

            if ($building_id!= 0) {
                // BUILDING DATA
                $building = Building::find($building_id);
                $response_data['building'] =  array(
                                                'id' => $building->id,
                                                'name' => $building->building_name,  
                                                'no_of_floors' => $building->no_of_floors, 
                                              );
                
            }else{
                $response_data['building'] = array();
            }

            // get units variant data
            $unit_variant_id = $unit->unit_variant_id;
            
            // UNIT VARIANT DATA
            $unit_variant = UnitVariant::find($unit_variant_id);
            $response_data['unit']['carpet_area'] = $unit_variant->carpet_area;
            $response_data['unit']['built_up_area'] = $unit_variant->built_up_area;
            $response_data['unit']['super_built_up_area'] = $unit_variant->super_built_up_area;
            $response_data['unit']['per_sq_ft_price'] = $unit_variant->per_sq_ft_price;
            $response_data['unit']['size'] = $unit_variant->size;

            // get unit type data associated to the unit, query unitType table having id = unit_type_id of the above unit_variant

            $unitType = $unit_variant->unitType()->first();
            $unitTypeId = $unitType->id;


            // get the corresponding property type data associated to the unittypeId
            $unitType = UnitType::find($unitTypeId);
            $project_property_type = $unitType->projectPropertyType()->first();
            $project_id = $project_property_type->project_id;
            
            // PROJECT DATA
            $project = Project::find($project_id);
            $response_data['project_id'] = $project->id;
            $response_data['cf_project_id'] = $project->cf_project_id;
            $response_data['project_title'] = $project->project_title;
            $response_data['measurement_units'] = $project->measurement_units;

            $json_resp = array(
                'code' => 'unit_summary' , 
                'message' => 'Unit Summary',
                'data' => $response_data
                );
            $status_code = 200;            

        }

        return response()->json( $json_resp, $status_code);

    }

}
