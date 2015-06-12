<?php namespace CommonFloor\Http\Controllers\Rest;
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;

use CommonFloor\Unit;
use CommonFloor\Project;
use CommonFloor\UnitVariant;
use CommonFloor\UnitType;
use CommonFloor\Building;
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

    public static function getSecureHash($url, $post_params, $api_key, $ts){
        
        if($post_params){
            $url = $url."&".$post_params;
        }

        $split_url = explode('?', $url);
        $base_url = $split_url[0];

        $params=array();

        if (count($split_url) > 1){
            $params= explode("&", $split_url[1]);
        }
        #print 'params',params
        $query_map=array();

        if(count($params) > 0){
            foreach ($params as $param) {
                $param_split= explode('=', $param);
            }

            $query_map[$param_split[0]] = $param_split[1];
        }

        # add time stamp if any param exists
        $query_map['timestamp'] = $ts;
        
        $keys = array_keys($query_map);  

        sort( $keys );
        $new_url = '?' ;

        if (in_array('api_key', $keys)) {
            foreach (array_keys($keys, 'api_key') as $index) {
                unset($keys[$index]);
            }
        }

        foreach ($keys as $key) {
            $new_url .= urlencode($key) . '=' . urlencode($query_map[$key]) . '&';
        }

        // echo 'new_url'.$new_url;

        $new_url_with_key = $new_url . 'api_key='.$api_key;
        $md5_seed_url= $base_url .''. $new_url_with_key;
        $md5_hash = md5($md5_seed_url);
        // echo 'md5_seed_url'.$md5_seed_url;


        return $md5_hash;        
    }

    public function getAPICities(){
        $api_key = 'nk8qh4vtri7l3hwotbsdtv2zl3p5u168';
        $base_url = 'http://www.commonfloor.com/api/geo-local-v2/get-cities';
        $url = $base_url . '?api_key=' .$api_key;
        $post_params = NULL;
        $ts = time();
        $secure_hash = UnitController::getSecureHash($url, $post_params, $api_key, $ts);
        $sender_url = $base_url . '?sign=' . (string)$secure_hash . '&timestamp=' . $ts; 

        $c = curl_init();
        curl_setopt($c, CURLOPT_URL, $sender_url);

        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
        $o = curl_exec($c); 
        if (curl_errno($c)) {
          $sad = curl_error($c);
 
          // get parameter not set
          $json_resp = array(
            'code' => 'incorrect_api_request' , 
            'message' => 'Incorrect API request',
            'data' => array()
            );
          $status_code = $sad;


          return response()->json( $json_resp, $status_code);
        }
        curl_close($c); 


        $json_resp = array(
            'code' => 'cities_returned' , 
            'message' => 'Cities',
            'data' => $o
            );
        $status_code = 200 ;


        return response()->json( $json_resp, $status_code);
    }




}
