<?php namespace CommonFloor\Http\Controllers\Rest;
use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;

use CommonFloor\Defaults;
use CommonFloor\Unit;
use CommonFloor\Project;
use CommonFloor\ProjectMeta;
use CommonFloor\UnitVariant;
use CommonFloor\UnitType;
use CommonFloor\Building;
use CommonFloor\Phase;
use CommonFloor\ProjectPropertyType;
use \Input;


use Illuminate\Http\Request;
use Chrisbjr\ApiGuard\Http\Controllers\ApiGuardController;

class UnitController extends ApiGuardController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}


    /**
     * Update unit status
     */
    public function updateUnit($unitId,Request $request){

        // default response and code
        $json_resp = array(
            'code' => 'unit_status_not_updated' , 
            'message' => 'Unit status not updated',
            'data' =>array()
            );
        $status_code = 400;

        // possible unit status
        $possible_status = array('available','sold','not_released','blocked','booked_by_agent','archived');
        
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
                            'data' => array('unit_id' => $unit->id,
                                            'name'=>$unit->unit_name,
                                            'status'=>$unit->availability
                                      )
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

    /**
     * Project Unit Selector Url
     */
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

    /**
     * Unit summary
     */
    public function getUnit($unitId, Request $request) {

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
            
            $propertyTypeId = $unitType->project_property_type_id;
            $unitTypeName = $unitType->unittype_name;

            $defaultPropertyTypeId = ProjectPropertyType::find($propertyTypeId)->property_type_id;
            
            $default = Defaults::find($defaultPropertyTypeId);
        
            $projectTypeName = $default->label;
            
            $default = Defaults::find($unitTypeName);
            $unitTypeLabel = $default->label;

            $response_data['project_type'] = $projectTypeName;
            $response_data['unit']['unit_type'] = $unitTypeLabel;


            // get the corresponding property type data associated to the unittypeId
            $unitType = UnitType::find($unitTypeId);
            $project_property_type = $unitType->projectPropertyType()->first();
            $project_id = $project_property_type->project_id;
            
            // PROJECT DATA
            $project = Project::find($project_id);
            $response_data['project_id'] = $project->id;
            $response_data['project_address'] = $project->project_address;
            $response_data['city'] = $project->city;
            $response_data['area_code'] = $project->area_code;
            $response_data['area_name'] = $project->area_name;
            $response_data['cf_project_id'] = $project->cf_project_id;
            $response_data['project_title'] = $project->project_title;
            $response_data['measurement_units'] = $project->measurement_units;
            $response_data['has_phase'] = $project->has_phase;

            // PROJECT META DATA - builder name
            $projectBuilderName = ProjectMeta::where( 'project_id', '=', $project_id )->where( 'meta_key', '=', 'builder_name' )->first();
            $response_data['builder_name'] = $projectBuilderName->meta_value;

            // append phase data to unit if it has phase
            if ($response_data['has_phase'] === 'yes') {

                if ($unit->phase_id == 0) {
                    $units_building_id = $unit->building_id;
                    $units_building = Building::find($units_building_id);
                    $unit_phase_id = $units_building->phase_id;
                }
                else{
                    $unit_phase_id = $unit->phase_id;
                }

                $phase = Phase::find($unit_phase_id);
                $unit_phase_name = $phase->phase_name;
                $unit_phase_status = $phase->status;
                $response_data['unit']['phase_name'] = $unit_phase_name;
                $response_data['unit']['phase_status'] = $unit_phase_status;
                $response_data['unit']['url'] = url( 'project/'.$project_id.'#unit-view/'.$unitId);
            }

            $json_resp = array(
                'code' => 'unit_summary' , 
                'message' => 'Unit Summary',
                'data' => $response_data
                );
            $status_code = 200;            

        }

        return response()->json( $json_resp, $status_code);

    }

    /**
     * Get unit status
     */
    public function getUnitStatus(Request $request){

    	// $response = array(
    	// 			'status' => 0,
    	// 			'error' => array(
    	// 						'code' => , 
    	// 						'message' => , 
    	// 						'http_code' => , 
    	// 						),
    	// 			'data' => array(),
    	// 			 );
        // default response and code
        $json_resp = array(
            'code' => 'unit_status_not_fetched' , 
            'message' => 'Unit Status not fetched',
            'data' =>array()
            );
        $status_code = 400;

        $getVar = Input::get();
        
        // get parameter set
        if (isset($getVar['unit_id'])) {
            $unitId = $getVar['unit_id'];

            // get unit
            $unit = Unit::find($unitId);

            // if project not found
            if (is_null($unit)) {
                $json_resp = array(
                    'code' => 'unit_not_found' , 
                    'message' => 'Unit not found',
                    'data' =>array()
                    );
                $status_code = 404;                
            }
            else{
                // else if project found then return url
                $unit_id = $unit->id;

                $json_resp = array(
                    'code' => 'unit_status_fetched' , 
                    'message' => 'Unit status fetched',
                    'data' =>array(
                            'id' => $unit->id,
                            'unit_name' => $unit->unit_name,
                            'status' => $unit->availability
                            )
                    );
                $status_code = 200;                


            }

        }
        else{
            // get parameter not set
            $json_resp = array(
                'code' => 'missing_unit_id' , 
                'message' => 'Unit id missing',
                'data' => array()
                );
            $status_code = 400;
        }

        return response()->json( $json_resp, $status_code);
    }



}
