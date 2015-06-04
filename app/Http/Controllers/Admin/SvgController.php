<?php namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Svg;
use CommonFloor\SvgElement;

use Illuminate\Http\Request;

class SvgController extends Controller {

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
	public function store($projectId, Request $request)
	{
		$svg = Svg::firstOrCreate( array('image_id' => $request['image_id']) );
		$svg->save();

		$svgElement = new SvgElement();
		$svgElement->svg_id = $svg->id;
        $svgElement->object_type = $request['object_type'];
        $svgElement->object_id = $request['object_id'];
        $svgElement->points = $request['points'];
        $svgElement->canvas_type = $request['canvas_type'];

        if (isset($request['other_details'])) {
        	$svgElement->other_details = $request['other_details'];
        }

        if (isset($request['primary_breakpoint'])) {
        	$svgbreakpointUpdate = SvgController::unset_primary_breakpoint($request['object_id'],$request['object_type'],$request['primary_breakpoint']);

        	if ($svgbreakpointUpdate) {
        		$svgElement->primary_breakpoint = $request['primary_breakpoint'];
        	}
        	
        }
        else{

        	$has_primary = SvgController::has_primary_breakpoint($request['object_id'],$request['object_type']);
        	
        	if(!$has_primary){
        		$svgElement->primary_breakpoint = $request['breakpoint_position'];
        	}
        }
        
        $svgElement->save();
 
		return response()->json( [
			'code' => 'svg_element_added',
			'message' => 'SVG element '.$request['canvas_type'].' added for image', 
			'data' => $svgElement
			], 200 );
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($projectid, $imageid){

		$svg = Svg::where( 'image_id', '=', $imageid )->first();
		if (!empty($svg)) {
			$svg_id = $svg->id;
			$svgElements = $svg->svgElement()->get()->toArray();
			// $svgElements = SvgElement::where( 'svg_id', '=', $svg_id )->get()->toArray();
		}
		else{
			$svgElements = array();
		}
		
        return response()->json( [
            'code' => 'svg_elements_for_image',
            'message' => '',
            'data' => $svgElements
        ], 200);		
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
	public function update($project_id, $id, Request $request)
	{
		$svgElement = SvgElement::find($id);
		
		// if (isset($request['image_id'])) {
		// 	$svgElement->image_id = $request['image_id'];
		// }
		if (isset($request['object_type'])) {
			$svgElement->object_type = $request['object_type'];
		}
		if (isset($request['object_id'])) {
			$svgElement->object_id = $request['object_id'];
		}
		if (isset($request['points'])) {
			$svgElement->points = $request['points'];
		}
		if (isset($request['canvas_type'])) {
			$svgElement->canvas_type = $request['canvas_type'];
		}
		if (isset($request['other_details'])) {
			$svgElement->other_details = $request['other_details'];
		}
        
        if (isset($request['primary_breakpoint'])) {
        	$svgbreakpointUpdate = SvgController::unset_primary_breakpoint($request['object_id'],$request['object_type'],$request['primary_breakpoint']);

        	if ($svgbreakpointUpdate) {
        		$svgElement->primary_breakpoint = $request['primary_breakpoint'];
        	}
        	
        }
        else{
        	$has_primary = SvgController::has_primary_breakpoint($request['object_id'],$request['object_type']);
        	if(!$has_primary){
        		$svgElement->primary_breakpoint = $request['breakpoint_position'];
        	}

        }

		$svgElement->save();

		return response()->json( [
			'code' => 'svg_element_updated',
			'message' => 'SVG element '.$svgElement->canvas_type.' updated for image',
			'data' => $svgElement
			], 201 );


	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id,$element_id)
	{
		$svg = SvgElement::find($element_id);
		$svg->delete();

		return response()->json( [
			'code' => 'svg_element_deleted',
			'message' => 'SVG element deleted for image', 
			], 201 );
	}

	public function downloadSvg($projectid, $imageid){

		$svgData = $_REQUEST['data'];
		$svgType = $_REQUEST['svg_type'];
		$breakpoint_position = $_REQUEST['breakpoint_position'];
		$data = base64_decode($svgData);
		$imgID = $_REQUEST['imgID'];

		if ($svgType == "master") {
			$projSubFolder = "master";
			$name = "master-".$breakpoint_position;
		}
		else if($svgType == "building_master"){
			$buildingId = $_REQUEST['building'];
			$projSubFolder = "buildings/".$buildingId;
			$name = "master-".$breakpoint_position;
		}
		else if($svgType == "google_earth"){
			$projSubFolder = "google_earth";
			$name = "map";
		}
		else{
			$projSubFolder = "svg";
			$name = uniqid("project_svg_");
		}
		 
		$path = "/projects/".$projectid."/".$projSubFolder;
		$extension = "svg";
		

		$fileData = array(
						'name' => $name,
						'extension' => $extension,
						'path' => $path 
						);

		$created_file = SvgController::createFile($fileData,$data);
        
        // $display_document_name = "project_master_svg.svg";
		// header('Content-type: image/svg+xml');
		// header("Content-Disposition: attachment; filename=".$display_document_name."");
		// echo $data;

		if (!$created_file) {
			return response()->json( [
				'code' => 'svg_file_not_created',
				'message' => 'SVG file failed to create',
				], 400 );
		}
		else{
			// update svg table with svg file name
			$svg = Svg::where( 'image_id', '=', $imgID )->first();
			$svg->svg_path = $path."/".$created_file;
			$svg->save();

			return response()->json( [
				'code' => 'svg_file_created',
				'message' => 'SVG file '.$created_file.' created'
				], 201);
		}
	}	

	public static function createFile($fileData, $content){
		
		$targetDir = public_path().$fileData['path'];

		if (!file_exists($targetDir)) {
			@mkdir($targetDir);
		}

		$filename = $targetDir."/".$fileData['name'].".".$fileData['extension'];

		if(file_put_contents($filename,$content)!=false){
			return basename($filename);
		}
		else{
			return false;
		}		
	}

	// unsets primary breakpoint for a given object id and object type combo
	public static function unset_primary_breakpoint( $object_id,$object_type,$primary_breakpoint){

		// get all svg elements having object id and object type, only one entry in the table can have primary breakpoint set

		$svgElements = SvgElement::where( 'object_type', '=', $object_type )->where( 'object_id', '=', $object_id )->get()->toArray();
		
		foreach ($svgElements as $svgElement) {
			
			// find the svg elem that has primary breakpoint and set it to null
			if (!is_null($svgElement['primary_breakpoint'])) {

				$svgElem = SvgElement::find($svgElement['id']);
				$svgElem->primary_breakpoint = null;
				$svgElem->save();
			}
		}

		return true;

	}


	// get primary breakpoints for a given object id and object type
	public static function get_primary_breakpoints($object_id = 0,$object_type=""){
    	
		if (($object_id!=0) && ($object_type!="")) {
	    	// check for all svg elements with this object type and object id
			$svgElements = SvgElement::where( 'object_type', '=', $object_type )->where( 'object_id', '=', $object_id )->get()->toArray(); 
		}
		else if(($object_id!=0) && ($object_type=="")){
	    	// check for all svg elements with this object type and object id
			$svgElements = SvgElement::where( 'object_type', '!=', 'building' )->where( 'object_id', '=', $object_id )->get()->toArray(); 
		}
		else{
			// get all svg elements
			$svgElements = SvgElement::all()->toArray(); 			 
		}
   	

		$object_breakpoints = array();

		// if no such svg element exists  , return empty array
		if (sizeof($svgElements)<1) {
			return $object_breakpoints;
		}
		

		// if svg element exists, check if svg element has primary breakpoint, if set then append to breakpoint array
		foreach ($svgElements as $svgElement) {
			
			// find the svg elem that has primary breakpoint set
			if (!is_null($svgElement['primary_breakpoint'])) {

				$object_breakpoints[] = array(
										'id' => $svgElement['id'], 
										'svg_id' => $svgElement['svg_id'], 
										'object_type' => $svgElement['object_type'], 
										'object_id' => $svgElement['object_id'], 
										'primary_breakpoint' => $svgElement['primary_breakpoint'], 
										);
			}
		}
    	
		// return array of breakpoints for each object type
		return $object_breakpoints;
	}

	// checks whether object type and object id combo has a primary breakpoint set or not
	public static function has_primary_breakpoint($object_id,$object_type){
		$elements_with_breakpoint = SvgController::get_primary_breakpoints($object_id,$object_type);

		if (sizeof($elements_with_breakpoint) == 1) {
			return true;
		}
		else
			return false;
	}

	// delete svg id and its corresponding child svg elements for a given image id
	public static function delete_svg($image_id){
		$svg = Svg::where( 'image_id', '=', $imageid )->first();
		if (!empty($svg)) {
			// @todo write code to delete svg file as well
			$svg->delete();
			return response()->json( [
				'code' => 'svg_deleted',
				'message' => 'SVG deleted for the given image', 
				], 201 );			
		}
		else{
			return response()->json( [
				'code' => 'svg_not_deleted',
				'message' => 'Could not find svg to be deleted for image', 
				], 400 );			
		}
	}

	/**
	 * input => $mediaIds = array(1,2,3,4)
	 *  	 => $units = array(
	 *						 array('building' => array(23,45,34) ),
	 *						 array('unit' => array(5,4,67) )
	 *					   )
	 */
    
    public static function getUnmarkedSvgUnits($units , $mediaIds)
    {
    	$unmarkedUnits = array();

    	// for each media id get svg
    	foreach ($mediaIds as $mediaId) {
    		$svg = Svg::where( 'image_id', '=', $mediaId )->first();

    		$svgId = $svg->id;

			// for each unitId and the svgId
    		foreach ($units as $unitType => $units) {
				// get svg element having given $unitType and unitId and svgId
    			if ($unitType=="building") {

    				foreach ($units as $unitId) {
    					$svgElements = SvgElement::where( 'svg_id', '=', $svgId )->where( 'object_type', '=', $unitType )->where( 'object_id', '=', $unitId )->get()->toArray();

 						// if svg element not there then add unitid to $unmarkedUnits
    					if (sizeof($svgElements)<1) {
    						$unmarkedUnits[] = array('object_type' => $unitType , 'object_id' => $unitId );
    					}
    				}

    			}
    			else if ($unitType=="unit") {

    				foreach ($units as $unitId) {
    						// @todo exclude object_type 'project'
    					$svgElements = SvgElement::where( 'svg_id', '=', $svgId )->where( 'object_type', '!=', 'building' )->where( 'object_id', '=', $unitId )->get()->toArray();

	 						// if svg element not there then add unitid to $unmarkedUnits
    					if (sizeof($svgElements)<1) {
    						$unmarkedUnits[] = array('object_type' => $unitType , 'object_id' => $unitId );
    					}
    				}    					

    			}

    		}

    	}


        return $unmarkedUnits;
    }
    
    /**
     * 
     */
    // public static function getUnitSvgCount($imageIds)
    // {
    //     $object_types = array('villa','apartment','plot','building');
    	
    // 	foreach ($imageIds as $breakpoint => $imageId) {
	    	
	   //  	// get svg for each image
    // 		$svg = Svg::where( 'image_id', '=', $imageId )->first();

    // 		$svgId = $svg->id;

	   //  	// get svg elements for each of the object types and svgId
	   //  	foreach ($object_types as $object_type) {
	   //  		// svg elements having object type and svgId
	   //  		$svgElements = SvgElement::where( 'svg_id', '=', $svgId )->where( 'object_type', '=', $unitType )->where( 'object_id', '=', $unitId )->get()->toArray();

	   //  		// for each svg elem check if primary breakpoint is set
	   //  	}

	   //      	// count = 0
	   //  		// for each object type check if primary breakpoint is set
	   //      			// if set increment count

	   //      // return array of object type and count
    // 	}
    // 	// get svg for given image id
    	


    //     return true;
    // }

    public static function  getUnitPrimarySvg($unitIds,$mediaIds){
    	return true;
    }

    public static function  getBreakpointUnitData($breakPointImageIds){
    	return true;
    }



}
