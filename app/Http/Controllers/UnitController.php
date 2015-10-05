<?php namespace CommonFloor\Http\Controllers;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;

use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\UnitVariant;
use CommonFloor\Unit;
use CommonFloor\Defaults;
use CommonFloor\ProjectPropertyType;

class UnitController extends Controller {

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

		public function makePament($projectId , $unitId, ProjectRepository $projectRepository, Request $request)
	{
			
    	paymentAction()

  

			return redirect("/project/".$projectId."/successfullpayment/".$unitId);
	}



	public function successfullPayment($projectId , $unitId, ProjectRepository $projectRepository)
	{

		$project = $projectRepository->getProjectById($projectId);
 
		$commonFloorData = unserialize( $projectRepository->getProjectById( $projectId )->projectMeta()->where( 'meta_key', 'cf' )->first()->meta_value );
		$property_page_link = ($commonFloorData['property_page_link']!='')?CF_WEBSITE_URL.$commonFloorData['property_page_link']:'#';
 
		return view( 'frontend.successfullpayment' )->with( 'project_title' , $project['project_title'])
																				->with( 'project_id' , $project['id'])
                                         ->with( 'property_page_link' , $property_page_link);
 
	}

	public function failedPayment($unitId)
	{

	}

	public function cancelBooking()
	{

		refund_amount($BookingInfo,$booking_id,$unit_id);
	}

	// public function addBookingToCrm($projectId , $unitId, ProjectRepository $projectRepository, Request $request){
 //        $sender_url = "http://127.0.0.1:8000/";//BOOKING_SERVER_URL;
 //        $sender_url .= DO_BOOKING;
 //        $data = $request->all();
   
 //        $buyerData =  $data['buyerData'];

 //        /* $_GET Parameters to Send */
 //        //$params = array('unit_id' => $unitId,'unit_name' => $unitName,'project_id' => $projectId );
 //         $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&".$buyerData."&project_id=".$projectId; 
      
 //        /* Update URL to container Query String of Paramaters */
 //        //$sender_url .= '?' . http_build_query($params);

 //        $c = curl_init();
 //        curl_setopt($c, CURLOPT_URL, $sender_url);
 //        curl_setopt($c, CURLOPT_POST, 1);
 //        curl_setopt($c, CURLOPT_POSTFIELDS, $params);

 //        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
 //        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
 //        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
 //        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
 //        $o = curl_exec($c); 

 //        if (curl_errno($c)) {
 //            $result= $c;
 //        }
 //        else{

 //            $result = $o;

 //           }

 //       /* Check HTTP Code */
 //       $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

 //       curl_close($c); 

 //       return $result;      
 //    }



	

	public function paymentDetails($projectId , $unitId, ProjectRepository $projectRepository)
	{
		$project = $projectRepository->getProjectById($projectId);
		$unit = Unit::find($unitId)->toArray();
		
		// get units variant data
    $unit_variant_id = $unit['unit_variant_id'];

    $building_id = $unit['building_id'];

    if ($building_id!= 0) {
        // BUILDING DATA
        $building = Building::find($building_id);
        $unit['building'] =  array(
                                    'id' => $building->id,
                                    'name' => $building->building_name,  
                                    'no_of_floors' => $building->no_of_floors, 
                                  );
        
    }else{
        $unit['building'] = array();
    }
    
    // UNIT VARIANT DATA
    $unit_variant = UnitVariant::find($unit_variant_id);
    $unit['carpet_area'] = $unit_variant->carpet_area;
    $unit['built_up_area'] = $unit_variant->built_up_area;
    $unit['super_built_up_area'] = $unit_variant->super_built_up_area;
    $unit['per_sq_ft_price'] = $unit_variant->per_sq_ft_price;
    $unit['size'] = $unit_variant->size;

    $unitType = $unit_variant->unitType()->first();
    $unitTypeId = $unitType->id;
    
    $propertyTypeId = $unitType->project_property_type_id;
    $unitTypeName = $unitType->unittype_name;

    $defaultPropertyTypeId = ProjectPropertyType::find($propertyTypeId)->property_type_id;
    
    $default = Defaults::find($defaultPropertyTypeId);

    $propertyTypeName = $default->label;
    
    $default = Defaults::find($unitTypeName);
    $unitTypeLabel = $default->label;

    $unit['property_type'] = $propertyTypeName;
    $unit['unit_type'] = $unitTypeLabel;

 		//dd($unit);
		$commonFloorData = unserialize( $projectRepository->getProjectById( $projectId )->projectMeta()->where( 'meta_key', 'cf' )->first()->meta_value );
		$property_page_link = ($commonFloorData['property_page_link']!='')?CF_WEBSITE_URL.$commonFloorData['property_page_link']:'#';
 
		return view( 'frontend.unitpayment' )->with( 'project_title' , $project['project_title'])
																				->with( 'project_id' , $project['id'])
																				 ->with('unit', $unit)
                                         ->with( 'property_page_link' , $property_page_link);

	}
    
/******CF CODE********/
//From codebase.rtf
// need config.ini to fatch booking info (bookingCrmAuthKey,user,getBookingAmt,getTotalSaleValue)
	//need to host booking engine crm to access API
	public function getAmount($id,$value){
        

        //echo $_POST['project_id'];
        $c = curl_init();
        $this->_helper->viewRenderer->setNoRender();
        //$bookingInfo = new Zend_Config_Ini(Zend_Registry::get("corePath") . "/config.ini", "bookingcrm");
        $bookingInfo = ['user'=>'19','bookingCrmAuthKey'='43e-22a3c758e02ebdf0472b']
        $authKey=$bookingInfo['bookingCrmAuthKey'];
        $this->params['user']=$bookingInfo['user'];
        $this->params['token']=$authKey;
        $getBookingAmtURL=$bookingInfo->getBookingAmt;
        $getTotalSaleValue=$bookingInfo->getTotalSaleValue;
        if($value=="booking_amount"){
            $wsUrl=$getBookingAmtURL;
        }else{
            $wsUrl=$getTotalSaleValue;
        }
        $this->params['unit_id']=$id;

        $qs= http_build_query($this->params);

        curl_setopt($c, CURLOPT_URL, $wsUrl);
        curl_setopt($c, CURLOPT_POST, true);
        curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
        //curl_setopt($c,CURLOPT_HTTPHEADER,array('X-Authorization: '.$authKey));
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
        $o = curl_exec($c); 

        if (curl_errno($c)) {
          $sad = curl_error($c);
            print_r($sad);
          throw new Exception($sad);
        }   
        
        $info=curl_getinfo($c,CURLINFO_HTTP_CODE);
        curl_close($c);
        $str=substr($info, 0,1);
        if($str==2){
            return ($o);
        }else{
            return "Error code";
        }
    }

  //fetch from unit selector directly
  public function updateUnitInfoStatus()
  {

        $c = curl_init();
        $unitSelector = new Zend_Config_Ini(Zend_Registry::get("corePath") . "/config.ini", "unitselectorapi");
        $getUnitURL=$unitSelector->unitSummary;
        $authKey=$unitSelector->unitSelectorAuthKey;
        $wsUrl=$getUnitURL . $unit_id;
        $this->params['status'] = $unit_status;
      
        $qs= http_build_query($this->params);

        curl_setopt($c, CURLOPT_URL, $wsUrl);
        curl_setopt($c, CURLOPT_POST, true);
        curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($c,CURLOPT_HTTPHEADER,array('X-Authorization: '.$authKey));
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
        
        $o = curl_exec($c); 
        //return ($o);

        if (curl_errno($c)) {
          $sad = curl_error($c);
          throw new Exception($sad);
        }
        $info=curl_getinfo($c,CURLINFO_HTTP_CODE);
        curl_close($c);
        $str=substr($info, 0,1);
        if($str==2){
            return ($o);
        }else{
            return "Error code";
        }

        // echo "string";
        // if (curl_errno($c)) {
        //   $sad = curl_error($c);
        //   throw new Exception($sad);
        // }
        // curl_close($c);
        //return $o;

  }

  public function getUnitInfo($unit_id)
  {
  	//Get unit info (no need for API we can directly access)
  }

  //On click of continue button save buyer information and booking information
  public function storeBookingUser($data)
  {
  	
  	saveBuyerAction()

  	//Need the following

  	/*saveBookingBuyer($data_to_insert)
  		Currently logged in buyer id been passed , what id are we suppose to pass?
  	*/
  	/*
			PropertyBooking::saveBookingData
			PropertyBooking::saveBookingHistory
  	*/


  } 

  public function saveBuyerAction()
    {   
        //$returnValue = $this->_request->getParams();
        $data_to_insert['buyer_id'] = $_SESSION[SessionManager::LOGIN_SESSION_NAME_SPACE]['user_id'];
        $data_to_insert['buyer_name'] = $this->_request->getParam("buyer_name");
        $data_to_insert['email'] = $this->_request->getParam("email");
        $data_to_insert['phone'] = $this->_request->getParam("phone");
        $data_to_insert['pan_card_number'] = $this->_request->getParam("pan_card_number");
        $data_to_insert['buyer_type'] = $this->_request->getParam("buyer_type");
        $data_to_insert['address_line_1'] = $this->_request->getParam("address_line_1");
        $data_to_insert['address_line_2'] = $this->_request->getParam("address_line_2");
        $data_to_insert['city'] = $this->_request->getParam("city");
        $data_to_insert['state'] = $this->_request->getParam("state");
        $data_to_insert['country'] = $this->_request->getParam("country");
        $data_to_insert['pincode'] = $this->_request->getParam("pin_code");
        self::saveBookingBuyer($data_to_insert);
        $BookingData = new Zend_Config_Ini(Zend_Registry::get("corePath") . "/config.ini", "bookingcrm");
        $unit_id = $_SESSION['login']['Booking']['unit_id'];
        self::saveBookingInfo($unit_id,$BookingData,$data_to_insert['buyer_id']); 
        
        exit;
    }


  public function saveBookingInfo($unit_id,$BookingData,$buyer_id){

        $payment_status_initialized=$BookingData->payment_status_initialized;

        $booking_history_old_status=$BookingData->booking_history_status_booking_start;
        $booking_history_new_status=$BookingData->booking_history_status_booking_initialized;
        $booking_history_comment=$BookingData->booking_history_comment_buyer_option;

        $booking_id = uniqid();
        if(!empty($buyer_id)){
            PropertyBooking::saveBookingData($booking_id,$buyer_id,$unit_id,$booking_history_new_status);
            $booking_history_id=rand(100000,999999);
            $updated_by=$_SESSION['public_user_auth']['public_user_name'];

            $_SESSION['login']['Booking']['booking_id'] = $booking_id;

            PropertyBooking::saveBookingHistory($booking_history_id,$booking_id,$booking_history_old_status,$booking_history_new_status,$booking_history_comment,$updated_by);
            
        }
    }
 
 
public function bookNow()
{
			 //$UnitValue=self::getUnitInfo($unit_id);

			//$_REQUEST['booking_amount']=self::getAmount($unit_id,"booking_amount"); 
			
			//$_REQUEST['totalSaleValue']=self::getAmount($unit_id,"sale_value"); 

			//why is session and request set?
		 /*if($dataValue['data']->unit->status =="available"){ 
				$statusmsg=self::updateUnitInfoStatus($unit_id,$unit_status);
			}
			else
			{
					//error
				$_REQUEST['errormsg']='Unit is already booked please choose another unit';
			}*/
             

}

 public function paymentAction(){
        $BookingInfo = new Zend_Config_Ini(Zend_Registry::get("corePath") . "/config.ini", "bookingcrm");

        $booking_id=$_SESSION['login']['Booking']['booking_id'];
        $unit_id=$_SESSION['login']['Booking']['unit_id'];
        $booking_amount=$_SESSION['login']['Booking']['bookingAmount'];
        $login_id=$_SESSION['public_user_auth']['public_user_email'];
        $name=$_SESSION['public_user_auth']['public_user_name'];

        if ( count( $_POST ) && isset( $_POST['mihpayid'] ) && ! empty( $_POST['mihpayid'] ) ) {
            
            // echo $_POST['mihpayid'];
            // print_r($_POST);
            // exit;
            $_SESSION['login']['Booking']['payment_id']= $_POST['udf2'];
            $booking_payment_id=$_POST['udf2'];
            
            if($_POST['status']=="success"){
                $txt = "Please login to check your booked property at commonfloor.com";
                $subject = 'Thanks for booking your property';
                self::sendEmail($login_id,$name,$txt,$subject);
                $val_mihpayid=$_POST['mihpayid'];
                $payment_status=$BookingInfo->payment_status_successful;
                $payment_history_is_active=$BookingInfo->payment_history_active;
                self::savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$val_mihpayid);
            }else{

                $txt = "Due to some reason payment process has been cancelled to book your property at commonfloor.com";
                $subject = 'Error while booking your property';
                self::sendEmail($login_id,$name,$txt,$subject);

                $payment_status=$BookingInfo->payment_status_successful;
                $payment_history_is_active=$BookingInfo->payment_history_inactive;
                self::savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,"");    
            }
            pay_page( array ('key' => 'gtKFFx', 'txnid' => $booking_payment_id, 'amount' => $booking_amount,
            'firstname' => $_POST['udf3'], 'email' => $_POST['udf4'], 'phone' => $_POST['udf5'],
            'productinfo' => $unit_id, 'surl' => '/manage-property-bookings/booking', 'furl' => '/book-your-property', 'udf1'=>$booking_id,'udf2'=>$booking_payment_id), 
            'eCwWELxi');
        }
        else{

            $booking_payment_id=uniqid();
            $_SESSION['login']['Booking']['booking_payment_id']=$booking_payment_id;
            $booking_history_old_status=$BookingInfo->booking_history_status_booking_initialized;
            $booking_history_new_status=$BookingInfo->booking_history_status_booking_progress;
            $booking_history_comment=$BookingInfo->booking_history_comment_payment_initialized;
            $payment_status=$BookingInfo->payment_status_initialized;
            $payment_history_is_active=$BookingInfo->payment_history_active;
            self::savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,"");
            self::saveBookingHistory($booking_id,$booking_history_old_status,$booking_history_new_status,$booking_history_comment);
            $difference = time() - $_SESSION['login']['Booking']['startTime'];
            $this->getHelper('viewRenderer')->setNoRender();
            if($_SESSION['login']['Booking']['expireDuration'] < $difference){
                $unit_status = $BookingInfo->availablity_available;
                $redirectionUrl = "/book-your-property";
                //self::updateUnitInfo($unit_id,$availablity[0]);
                $txt = "Due to some reason payment process has been cancelled to book your property at commonfloor.com";
                $subject = 'Thanks for your interest in buying property';
                self::updateUnitInfoStatus($unit_id,$unit_status);
                self::sendEmail($login_id,$name,$txt,$subject);
                $this->_redirect($redirectionUrl);
            }else{
                try{
                    $result=pay_page( array ('key' => 'gtKFFx', 'txnid' => $booking_payment_id, 'amount' => $booking_amount,
                'firstname' => $_POST['bookingName'], 'email' => $login_id, 'phone' => $_POST['bookingMobileNum'],
                'productinfo' => $unit_id, 'surl' => '/manage-property-bookings/booking', 'furl' => '/book-your-property', 'udf1'=>$booking_id,'udf2'=>$booking_payment_id, 'udf3'=>$_POST['bookingName'], 'udf4'=>$login_id, 'udf5'=>$_POST['bookingMobileNum']), 
                'eCwWELxi');
                    if(strpos($result,'Exception') !== false){
                        $unit_status = $BookingInfo->availablity_available;
                        $redirectionUrl = "/book-your-property";
                        $txt = "Due to some reason payment process has been cancelled to book your property at commonfloor.com";
                        $subject = 'Thanks for your interest in buying property';
                        //self::updateUnitInfoStatus($unit_id,$unit_status);
                        self::sendEmail($login_id,$name,$txt,$subject);
                        $this->_redirect($redirectionUrl);
                    }
                }catch(Exception $e){
                    echo $e;
                    $redirectionUrl = "/book-your-property";
                    $this->_redirect($redirectionUrl);
                    // $redirectionUrl = "/book-your-property";
                    // $this->_redirect($redirectionUrl);
                }

            }
        }
            
    }


      public function savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$val_mihpayid){ 

        PropertyBooking::savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$val_mihpayid);
    }

    public function saveBookingHistory($booking_id,$booking_history_old_status,$booking_history_new_status,$booking_history_comment){
        $booking_history_id=rand(100000,999999);
        $updated_by=$_SESSION['public_user_auth']['public_user_name'];
        PropertyBooking::saveBookingHistory($booking_history_id,$booking_id,$booking_history_old_status,$booking_history_new_status,$booking_history_comment,$updated_by);
    }

    private function refund_amount($BookingInfo,$booking_id,$unit_id){
        $payuUrl=$BookingInfo->payuUrl;
        $key = "gtKFFx";
        $salt = "eCwWELxi";
        $command = "cancel_refund_transaction";//"verify_payment";//cancel_refund_transaction
        $var1 =$_POST['mihpayid'];
        $var2 = rand(1000000,9999999);//uniqid();
        $var3 = $_POST['booking_amount']; // Transaction ID//miahpaid  var 2 generate var 3 --full amt
        //$var2 = "4675764";//"7893238"; // to be used in case of refund
        //$var3 = "10"; // to be used in case of refund
       
        $hash_str = $key  . '|' . $command . '|' . $var1 . '|' . $salt ;
        $hash = strtolower(hash('sha512', $hash_str));

        $r = array('key' => $key , 'hash' =>$hash , 'var1' => $var1, 'command' => $command,'var2' => $var2,'var3' => $var3);
        
        $qs= http_build_query($r);
        $wsUrl = $payuUrl;//"https://test.payu.in/merchant/postservice.php?form=2";
        //$wsUrl = "https://info.payu.in/merchant/postservice?form=1";

        $c = curl_init();
        curl_setopt($c, CURLOPT_URL, $wsUrl);
        curl_setopt($c, CURLOPT_POST, 1);
        curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
        $o = curl_exec($c);
        if (curl_errno($c)) {
          $sad = curl_error($c);
          throw new Exception($sad);
        }
        curl_close($c);

        $valueSerialized = @unserialize($o);
        if($o === 'b:0;' || $valueSerialized !== false) {
          print_r($valueSerialized);
        }
        $data= json_decode($o);
        // echo $data->msg;
        //echo $data->status;
        $booking_history_old_status=$BookingInfo->booking_history_status_refund_inititated;
        if($data->status==1){   
            $booking_history_new_status=$BookingInfo->booking_history_status_refund_completed;
            $booking_history_comment=$BookingInfo->booking_history_comment_refund_completed; 
            self::updateBookingInfo($booking_id,$booking_history_old_status);   
            self::updateUnitInfo($booking_id,$BookingInfo,$unit_id);   
        }else{
            $booking_history_new_status=$BookingInfo->booking_history_status_refund_Error;
            $booking_history_comment=$BookingInfo->booking_history_comment_refund_not_completed;
        }
        self::updateBookingHistory($booking_id,$booking_history_old_status,$booking_history_new_status,$booking_history_comment);
        echo $data->status;
    }


    public function sendEmail($login_id,$name,$txt,$subject){

        require_once('util/CFMail.php');
        // $txt = "Payment process has been initiated to book your property at commonfloor.com";
        // $subject = 'Thanks for booking your property';

        $mail = new CFMail();
        $mail->setBodyHtml($txt);
        $mail->setSubject($subject);
        $mail->setCategory(CFMail::MAIL_TYPE_CONFIRM_PAYMENT);
        $mail->setFrom('support@commonfloor.com','CF Support');
        $mail->addTo($login_id, $name);  
        try
        {
            $mail->send();
        }
        catch(Exception $e)
        {
            $logger = Zend_Registry::get('logger');
            $logger->crit("Faced exception " . $e->getMessage() . " while trying to send payment email from Authorize to $login_id");
        }
    }



}
