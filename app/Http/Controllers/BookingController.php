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
			$Duration = '1';
			Session::put('unitId', $unitId);
			Session::put('startTime', time());
			Session::put('startTime', ($Duration * 60));
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
			else
			{
					//REDIRECT
			}

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
	    $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&".$buyerData; 
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
	   if($result['message'] == 'SUCCESS')
	   {
	   		$buyerId = $result['buyer_id'];
	   		$bookingId = $result['booking_id'];
	   		Session::put('buyerId', $buyerId);
				Session::put('bookingId', $bookingId);

	   }
	   return $result;

	}


}
