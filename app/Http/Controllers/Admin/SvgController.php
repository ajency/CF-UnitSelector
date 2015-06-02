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
			$svgElement->primary_breakpoint = $request['primary_breakpoint'];
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
		$data = base64_decode($svgData);

		$path = "/projects/".$projectid."/svg";
		$extension = "svg";
		$name = uniqid("project_svg_");

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
				'message' => 'SVG file created',
				], 400 );
		}
		else{
			// update svg table with svg file name
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

}
