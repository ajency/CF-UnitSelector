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

use \Session;

class BookingController extends Controller {

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

	public function storeSessionData($unitId)
	{
			$Duration = EXPIREDURATION;
			Session::put('unitId', $unitId);
			Session::put('startTime', time());
			Session::put('expireDuration', ($Duration * 60));
	}

	public function getUnitInfo($unitId)
	{
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
			$unit['per_sq_ft_price'] = $unit_variant->per_sq_ft_price;


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
			$unit['booking_amount'] = $this->getUnitAmount($unitId,'booking_amount');
			$unit['selling_amount'] = $this->getUnitAmount($unitId,'sale_value');

			Session::put('bookingAmount', $unit['booking_amount']);

			return $unit;

	}

	public function updateUnitStatus($unitId,$status)
	{
			$unit = Unit::find($unitId);
      $unit->availability = $status;
      $unit->save();

      return true;
	}

	public function getUnitAmount($unitId,$amountType)
	{
		  $sender_url = BOOKING_SERVER_URL;
	    $sender_url .= ($amountType == 'booking_amount') ? GET_BOOKING_AMOUNT : GET_SELLING_AMOUNT;

	    /* $_POST Parameters to Send */
	    $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&unit_id=".$unitId; 

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
	        $result= $c;
	    }
	    else{

	        $result = $o;

	       }

	   /* Check HTTP Code */
	   $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

	   curl_close($c); 

	   return $result;

	}

	public function bookNow($projectId , $unitId)
	{
			$project = Project ::find($projectId); 
			
			$setSession = $this->storeSessionData($unitId);
			$unitInfo = $this->getUnitInfo($unitId);

			if ($unitInfo['availability'] =="available"){ 
					$this->updateUnitStatus($unitId,'blocked');
			}
			/*else
			{
					//REDIRECT
					return redirect("/project/".$projectId."#unit-view/".$unitId); 
			}**/

			$commonFloorData = unserialize( $project->projectMeta()->where( 'meta_key', 'cf' )->first()->meta_value );
			$property_page_link = ($commonFloorData['property_page_link']!='')?CF_WEBSITE_URL.$commonFloorData['property_page_link']:'#';
 			 
			return view( 'frontend.booknow' )->with( 'project' , $project->toArray())
																			 ->with('unit', $unitInfo)
	                                     ->with( 'property_page_link' , $property_page_link);

	}

	public function makeBooking($projectId ,$unitId, Request $request)
	{
			
			$requestData = $request->all();
			$buyerData = $requestData['buyerData'];
			
			$sender_url = BOOKING_SERVER_URL;
	    $sender_url .= MAKE_BOOKING;

	    /* $_POST Parameters to Send */
	    $params = "token=".config('constant.api_token')."&user=".config('constant.api_user'); 
	    $params .= "&".$buyerData; 
	    $params .= "&booking_status=".PAYMENT_STATUS_INITIALIZED."&old_status=".BOOKING_HISTORY_STATUS_START_BOOKING."&new_status=".BOOKING_HISTORY_STATUS_BOOKING_INITIALIZED."&comments=".BOOKING_HISTORY_COMMENT_BUYER_OPTION;
 
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
	        $result= $c;
	    }
	    else{

	        $result = $o;

	       }

	   /* Check HTTP Code */
	   $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

	   curl_close($c); 
	   $output = json_decode($result,true);

	   if($output['message'] == 'SUCCESS')
	   {
	   		$buyerId = $output['buyer_id'];
	   		$buyerEmail = $output['buyer_email'];
	   		$buyerName = $output['buyer_name'];
	   		$bookingId = $output['booking_id'];

	   		Session::put('buyerId', $buyerId);
	   		Session::put('buyerEmail', $buyerEmail);
	   		Session::put('buyerName', $buyerName);
				Session::put('bookingId', $bookingId);

	   }
	   return $result;

	}

	public function makePayment($projectId , $unitId, Request $request)
	{
			if($request->get('mihpayid')!='')
			{ 
					if($request->get('status')=="success"){
						 
					}
					else
					{

					}
					 // pay_page( array ('key' => $merchantId, 'txnid' => $booking_payment_id, 'amount' => $bookingAmount,
		    //             'firstname' => $buyerName, 'email' => $buyerEmailId, 'phone' => $buyerPhone,
		    //             'productinfo' => $unitId, 'surl' => 'project/successfullpayment/'.$unitId, 'furl' => 'project/paymentfailed/'.$unitId, 'udf1'=>$booking_payment_id,'udf2'=>$bookingId, 'udf3'=>$buyerName, 'udf4'=>$buyerEmailId, 'udf5'=>$buyerPhone), 
		    //             $salt); 

			}
			else
			{
					//Session timeout 30mins
					$difference= time() - Session::get('startTime');
					if(Session::get('expireDuration') < $difference){
						//update Unit status
							$this->updateUnitStatus($unitId,'available');
						
						// redirect
							return redirect("/project/".$projectId."#unit-view/".$unitId); 
					}


				/***
					PAY U Changes
					renamed function response to payuresponse
					renamed Class Response to PayuResponse
				**/

					include(app_path() . '\Helpers\payu.php');
					$project =Project :: find($projectId);
					$merchantId = $project->merchant_id;
					$salt = $project->salt;


					$bookingId= $request->get('booking_id');
		      $bookingAmount= $request->get('booking_amount');
		      $buyerEmailId = $request->get('buyer_email');
		      $buyerName= $request->get('buyer_name');
		      $buyerPhone= $request->get('buyer_phone');

		      //$booking_payment_id=uniqid();
		      //make entry in booking history and payment history
		      $bookingHistory = $paymentHistory = []
		      $bookingHistory['old_status']=BOOKING_HISTORY_STATUS_BOOKING_INITIALIZED;
          $bookingHistory['new_status']=BOOKING_HISTORY_STATUS_BOOKING_PROGRESS;
          $bookingHistory['comment']=BOOKING_HISTORY_COMMENT_PAYMENT_INITIALIZED;
          
          $paymentHistory['payment_status']=PAYMENT_STATUS_INITIALIZED;
          $paymentHistory['history_is_active']=PAYMENT_HISTORY_ACTIVE;

          $this->addBookingAndPaymentHistory($bookingId, $bookingHistory,$paymentHistory);
		      

					try{   
						
								$result=pay_page( array ('key' => $merchantId, 'txnid' => $bookingId, 'amount' => $bookingAmount,
		                'firstname' => $buyerName, 'email' => $buyerEmailId, 'phone' => $buyerPhone,
		                'productinfo' => $unitId, 'surl' => 'project/successfullpayment/'.$unitId, 'furl' => 'project/paymentfailed/'.$unitId, 'udf1'=>$bookingId,'udf2'=>$bookingId, 'udf3'=>$buyerName, 'udf4'=>$buyerEmailId, 'udf5'=>$buyerPhone), 
		                $salt); exit;
								 
								if(strpos($result,'Exception') !== false){  
									 	$this->updateUnitStatus($unitId,'available');
									 	return redirect("/project/".$projectId."#unit-view/".$unitId); 
										/*$unit_status = $BookingInfo->availablity_available;
										$redirectionUrl = "/book-your-property";
										$txt = "Due to some reason payment process has been cancelled to book your property at commonfloor.com";
										$subject = 'Thanks for your interest in buying property';
										//self::updateUnitInfoStatus($unit_id,$unit_status);
										self::sendEmail($login_id,$name,$txt,$subject);
										$this->_redirect($redirectionUrl);*/
								}
					}catch(Exception $e){ 
							echo $e;
							//$redirectionUrl = "/book-your-property";
							//$this->_redirect($redirectionUrl);
							// $redirectionUrl = "/book-your-property";
							// $this->_redirect($redirectionUrl);
					}

			}

		  

	}

	public function addBookingAndPaymentHistory($bookingId, $bookingHistory , $paymentHistory)
	{
			$sender_url = BOOKING_SERVER_URL;
	    $sender_url .= ADD_BOOKING_PAYMENT_HISTORY;

	    /* $_POST Parameters to Send */
	    $params = "token=".config('constant.api_token')."&user=".config('constant.api_user'); 
	    $params .= "&booking_status=".PAYMENT_STATUS_INITIALIZED."&old_status=".BOOKING_HISTORY_STATUS_START_BOOKING."&new_status=".BOOKING_HISTORY_STATUS_BOOKING_INITIALIZED."&comments=".BOOKING_HISTORY_COMMENT_BUYER_OPTION;
 			$params .= "&booking_status=".PAYMENT_STATUS_INITIALIZED."&old_status=".BOOKING_HISTORY_STATUS_START_BOOKING."&new_status=".BOOKING_HISTORY_STATUS_BOOKING_INITIALIZED."&comments=".BOOKING_HISTORY_COMMENT_BUYER_OPTION;


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
	        $result= $c;
	    }
	    else{

	        $result = $o;

	       }

	   /* Check HTTP Code */
	   $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

	   curl_close($c); 
	   $output = json_decode($result,true);

	   if($output['message'] == 'SUCCESS')
	   {
	   		$buyerId = $output['buyer_id'];
	   		$buyerEmail = $output['buyer_email'];
	   		$buyerName = $output['buyer_name'];
	   		$bookingId = $output['booking_id'];

	   		Session::put('buyerId', $buyerId);
	   		Session::put('buyerEmail', $buyerEmail);
	   		Session::put('buyerName', $buyerName);
				Session::put('bookingId', $bookingId);

	   }
	   return $result;

	}


}
