<?php

namespace CommonFloor\Http\Controllers\Rest;

use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Http\Controllers\Admin\ProjectBunglowUnitController;
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
         
        $agentId = Input::get( 'agent_id' ); 
        
        if (Auth::check())
        {
            $projectJsonData = $this->projectGateway->getProjectStepTwoDetails( $projectId ,$agentId );
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
    
    public function projectDetails( $projectId ) {
 
        $projectData = $this->projectGateway->getProjectDetails( $projectId );
 
        return response()->json( [
                            'data' => $projectData
                        ], 200, [], JSON_NUMERIC_CHECK );
    }

    public function projectData( $projectId ) {
 
        $projectData = [];
        $projectStepOneJson = ProjectJson::where('project_id', $projectId)
                                        ->where('type', 'step_one')->get()->first();  
        $stepOneData = $projectStepOneJson->project_json; 
         
        $projectStepTwoJson = ProjectJson::where('project_id', $projectId)
                                        ->where('type', 'step_two')->get()->first();
        $stepTwoData = $projectStepTwoJson->project_json;

        if(!empty($stepTwoData))                             //UPDATE CURRENT UNIT STATUS TO JSON DATA
        {
            $unitData = [];
            $units = $stepTwoData['units'];
            foreach ($units as $unit)
            {
                $unit['availability']=  \CommonFloor\Unit::find($unit['id'])->availability;
                $unitData[]=$unit;
            }
            $stepTwoData['units']=$unitData;
        }
             

        $projectData = $stepOneData + $stepTwoData;  
 
        return response()->json( [
                            'data' => $projectData
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
        \Session::flash('success_message','Project Successfully Published');
        return response()->json( [
                            'code' => '',
                            'message' => 'Project json updated successfully'
                    ], 203 );
    }

    public static function getSecureHash($url, $post_params, $api_key, $ts){
        
        if(!is_null($post_params)){
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
                $query_map[$param_split[0]] = $param_split[1];
            }

            
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

    // @todo remove authorization check
    public function getAPICities(){
        
        $api_key = CF_API_KEY;
        $base_url = GET_CITIES_API_URL;
        $url = $base_url . '?api_key=' .$api_key;
        $post_params = NULL;
        $ts = time();
        $secure_hash = ProjectController::getSecureHash($url, $post_params, $api_key, $ts);
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
            'message' => '',
            'data' => $o
            );
        $status_code = 200 ;


        return response()->json( $json_resp, $status_code);
    }

    public function getAPIAreaByCity(){
        $getVar = Input::get();
        $city = $getVar['city'];
        $area_str = $getVar['area_str'];
        $result_name = array();
        $api_key = CF_API_KEY;
        $base_url = GET_AREA_BY_CITY_API_URL.''.$city.'&str='.$area_str;
        $url = $base_url . '&api_key=' .$api_key;
        $post_params = NULL;
        $ts = time();
        $secure_hash = ProjectController::getSecureHash($url, $post_params, $api_key, $ts);
        $sender_url = $base_url . '&sign=' . (string)$secure_hash . '&timestamp=' . $ts; 

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
        else{
            $area_array = json_decode($o);
            
            // dd($area_array);
            foreach ($area_array as $area_entry) {
                $tildeCheck = strpos($area_entry, '~');
                if ($tildeCheck!==false) {
                    $area_name_arr = explode('~', $area_entry);
                    $area_name = $area_name_arr[0];

                    $zone_name_arr = explode('|', $area_entry);
                    $zone_name = end($zone_name_arr);

                    $areaSearchCheck = strpos(strtolower($area_name), strtolower($area_str));

                    if ( $areaSearchCheck !==false) {
                        $result_name[$zone_name] = $area_name;
                    }
                }
            }

        }
        curl_close($c); 
     


        $json_resp = array(
            'code' => 'areas_returned' , 
            'message' => '',
            'data' => $result_name
            );
        $status_code = 200 ;

        return response()->json( $json_resp, $status_code);
        
    }

    public function getProjectsByArea(){
        $getVar = Input::get();
        $city = $getVar['city'];
        $area_zone = $getVar['area_zone'];

        $result = array();
        $api_key = CF_API_KEY;
        $base_url = GET_PROPERTIES_BY_AREA_API_URL.$area_zone.'&city='.$city;
        $url = $base_url.'&api_key='.$api_key;
        $post_params = NULL;

        $ts = time();
        $secure_hash = ProjectController::getSecureHash($url, $post_params, $api_key, $ts);
        $sender_url = $base_url.'&sign='.(string)$secure_hash.'&timestamp='.$ts; 

        //dd($sender_url);
        
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
        else{
            $result_json  = json_decode($o);
            
            if($result_json && !is_null($result_json->status) && $result_json->status != '0'){
                $total_page = (int)$result_json->results->total_page;
                
                $projects = $result_json->results->projects; 
                foreach ($projects as $project) {
                    $project_info = array();
                    $project_info['property_id'] = $project->property_id;
                    $project_info['name'] = $project->name;
                    $project_info['address'] = $project->address;
                    $project_info['builder_name'] = $project->builder_name;
                    $project_info['builder_image_url'] = ProjectController::builderImageUrl($project->builder_name);
                    $project_info['property_page_link'] = $project->public_url;
                    $result[] =$project_info;
                }

                if($total_page > 1){
                    $index = 2;
                    while ($index<=$total_page) {
                        // make curl request again
                        $result_json = ProjectController::get_property_by_area_curl($city,$area_zone,$index);
                        if (!is_null($result_json)) {
                            $projects = $result_json->results->projects;

                            foreach ($projects as $project) {
                                $project_info = array();
                                $project_info['property_id'] = $project->property_id;
                                $project_info['name'] = $project->name;
                                $project_info['address'] = $project->address;
                                $project_info['builder_name'] = $project->builder_name;
                                $project_info['builder_image_url'] = ProjectController::builderImageUrl($project->builder_name);
                                $result[] =$project_info;
                            }
                        }


                        $index++;
                    }
                }


            }

        }
        curl_close($c); 

        $json_resp = array(
            'code' => 'projects_returned' , 
            'message' => '',
            'data' => $result
            );
        $status_code = 200 ;

        return response()->json( $json_resp, $status_code);
    }


    public static function builderImageUrl($builder_name){
        $builder_name = strtolower($builder_name);
        $builder_name = str_replace( array(".","'",",","-","(",")"),
                            array("","","",""," "," "), 
                            $builder_name);
        $builder_name = str_replace("  "," ",$builder_name);
        $builder_name = str_replace(" ", "-", trim($builder_name)); 

        $builder_img_src = "http://www.commonfloor.com/public/images/builder/" . $builder_name ."-logo.gif";

        return $builder_img_src; 
    }

    public static function get_property_by_area_curl($city,$area_zone,$page){
            $api_key = CF_API_KEY;
            $base_url = GET_PROPERTIES_BY_AREA_API_URL.$area_zone.'&page=' . $page.'&city='.$city;
            $url = $base_url.'&api_key='.$api_key;
            $post_params = NULL;

            $ts = time();
            $secure_hash = ProjectController::getSecureHash($url, $post_params, $api_key, $ts);
            $sender_url = $base_url.'&sign='.(string)$secure_hash.'&timestamp='.$ts;



            $c = curl_init();
            curl_setopt($c, CURLOPT_URL, $sender_url);

            curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
            curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
            $o = curl_exec($c); 

            if (curl_errno($c)) {
              
              $result_json  = NULL;

          }
          else{

            $result_json  = json_decode($o);

        }

        curl_close($c); 
        return $result_json;  

    }

    public function getBookingAmount(){
        $getVar = Input::get();
        $unitId = $getVar['unit_id'];
        $sender_url = BOOKING_SERVER_URL;
        $sender_url .= GET_BOOKING_AMOUNT; 

        /* $_POST Parameters to Send */
        $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&unit_id=".$unitId; 

        /* Update URL to container Query String of Paramaters */
        //$sender_url .= '?' . http_build_query($params);

        $c = curl_init();
        curl_setopt($c, CURLOPT_URL, $sender_url);
        curl_setopt($c, CURLOPT_POST, 1);
        curl_setopt($c, CURLOPT_POSTFIELDS, $params);

        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
        $o = curl_exec($c); 
        
        if (curl_errno($c)) {
          $result_json  = NULL;
          $json_resp = array(
            'code' => 'error_in_fetching_amount' , 
            'message' => curl_error($c) ,
            'data' => $result_json
            );
          $status_code = 400 ;
          return response()->json( $json_resp, $status_code);
        }
        else{

            $result_json  = json_decode($o);

        }
        /* Check HTTP Code */
        $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

        // dd($status);

        curl_close($c); 
     
        $json_resp = array(
            'code' => 'success_booking_amount_returned' , 
            'message' => 'Booking Amount',
            'data' => $result_json
            );
        $status_code = 200 ;

        return response()->json( $json_resp, $status_code);

    }

    public function getSellingAmount(){
        $getVar = Input::get();
        $unitId = $getVar['unit_id'];
        $sender_url = BOOKING_SERVER_URL;
        $sender_url .= GET_SELLING_AMOUNT;

        /* $_GET Parameters to Send */
        //$params = array('unit_id' => $unitId);
        $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&unit_id=".$unitId; 

        /* Update URL to container Query String of Paramaters */
        //$sender_url .= '?' . http_build_query($params);

        $c = curl_init();
        curl_setopt($c, CURLOPT_URL, $sender_url);
        curl_setopt($c, CURLOPT_POST, 1);
        curl_setopt($c, CURLOPT_POSTFIELDS, $params);

        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
        $o = curl_exec($c); 
        
        if (curl_errno($c)) {
          $result_json  = NULL;
          $json_resp = array(
            'code' => 'error_in_fetching_amount' , 
            'message' => curl_error($c) ,
            'data' => $result_json
            );
          $status_code = 400 ;
          return response()->json( $json_resp, $status_code);
        }
        else{

            $result_json  = json_decode($o);

        }
        /* Check HTTP Code */
        $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

        // dd($status);

        curl_close($c); 
     
        $json_resp = array(
            'code' => 'total_selling_amount_returned' , 
            'message' => 'Selling Amount',
            'data' => $result_json
            );
        $status_code = 200 ;

        return response()->json( $json_resp, $status_code);

    }

    public function getUnitPaymentPlan(){
        $getVar = Input::get();
        $unitId = $getVar['unit_id'];
        $sender_url = BOOKING_SERVER_URL;
        $sender_url .= GET_UNIT_PAYMENT_PLAN;

        /* $_GET Parameters to Send */
        //$params = array('unit_id' => $unitId);
        $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&unit_id=".$unitId; 

        /* Update URL to container Query String of Paramaters */
       // $sender_url .= '?' . http_build_query($params);

        $c = curl_init();
        curl_setopt($c, CURLOPT_URL, $sender_url);
        curl_setopt($c, CURLOPT_POST, 1);
        curl_setopt($c, CURLOPT_POSTFIELDS, $params);

        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
        $o = curl_exec($c); 
        
        if (curl_errno($c)) {
          $result_json  = NULL;
          $json_resp = array(
            'code' => 'error_in_fetching_plan' , 
            'message' => curl_error($c) ,
            'data' => $result_json
            );
          $status_code = 400 ;
          return response()->json( $json_resp, $status_code);
        }
        else{

            $result_json  = json_decode($o);

        }
        /* Check HTTP Code */
        $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

        // dd($status);

        curl_close($c); 
     
        $json_resp = array(
            'code' => 'unit_payment_plan_returned' , 
            'message' => 'Unit Payment Plan',
            'data' => $result_json
            );
        $status_code = 200 ;

        return response()->json( $json_resp, $status_code);

    }

    public function getUnitPriceSheet(){
        $getVar = Input::get();
        $unitId = $getVar['unit_id'];
        // $project_id = $getVar['project_id'];
        $sender_url = BOOKING_SERVER_URL;
        $sender_url .= GET_UNIT_PRICE_SHEET;
 
        /* $_GET Parameters to Send */
        // $params = array('unit_id' => $unitId, 'project_id'=> $project_id);
        // $params = array('unit_id' => $unitId);
        $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&unit_id=".$unitId; 

        /* Update URL to container Query String of Paramaters */
        //$sender_url .= '?' . http_build_query($params);

        $c = curl_init();
        curl_setopt($c, CURLOPT_URL, $sender_url);
        curl_setopt($c, CURLOPT_POST, 1);
        curl_setopt($c, CURLOPT_POSTFIELDS, $params);

        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
        $o = curl_exec($c); 
        
        if (curl_errno($c)) {
          $result_json  = NULL;
          $json_resp = array(
            'code' => 'error_in_fetching_price_sheet' , 
            'message' => curl_error($c) ,
            'data' => $result_json
            );
          $status_code = 400 ;
          return response()->json( $json_resp, $status_code);   
        }
        else{
            $result_json  = json_decode($o);

        }
        /* Check HTTP Code */
        $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

        // dd($status);

        curl_close($c); 
     
        $json_resp = array(
            'code' => 'price_sheet_returned' , 
            'message' => 'Price Sheet',
            'data' => $result_json
            );
        $status_code = 200 ;

        return response()->json( $json_resp, $status_code);        

    }

    public function addUnitToBookingCrm(){
        $getVar = Input::get();
        $unitId = $getVar['unit_id'];
        $unitName = $getVar['unit_name'];
        $projectId = $getVar['project_id'];        
        $result = ProjectBunglowUnitController::add_unit_to_booking_crm($unitId,$unitName,$projectId);

        if(is_null($result)){
          $json_resp = array(
            'code' => 'error_in_adding_unit' , 
            'message' => curl_error($result) 
            );
          $status_code = 400 ;
        }
        else{
            $json_resp = array(
                'code' => 'unit_added' , 
                'message' => 'Unit Added',
                'data' => $result
                );
            $status_code = 200 ;
        }

        return response()->json( $json_resp, $status_code);          
    }



}


