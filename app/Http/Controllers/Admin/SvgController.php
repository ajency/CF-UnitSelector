<?php namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Svg;

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
		$svg = new Svg();
		$svg->image_id = $request['image_id'];
        $svg->object_type = $request['object_type'];
        $svg->object_id = $request['object_id'];
        $svg->points = $request['points'];
        $svg->canvas_type = $request['canvas_type'];

        if (isset($request['other_details'])) {
        	$svg->other_details = $request['other_details'];
        }
        
        $svg->save();
 
		return response()->json( [
			'code' => 'svg_element_added',
			'message' => 'SVG element '.$request['canvas_type'].' added for image', 
			], 200 );
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($projectid, $imageid){

		$svgElements = Svg::where( 'image_id', '=', $imageid )->get()->toArray();
        // $temp = [];
        // foreach ($svgElements as $value) {
        // 	$val = unserialize($value['points']);
        // 	$value['points'] = $val;
        // 	$temp[] = $value;
        // }
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
		$svg = Svg::find($id);
		
		if (isset($request['image_id'])) {
			$svg->image_id = $request['image_id'];
		}
		if (isset($request['object_type'])) {
			$svg->object_type = $request['object_type'];
		}
		if (isset($request['object_id'])) {
			$svg->object_id = $request['object_id'];
		}
		if (isset($request['points'])) {
			$svg->points = $request['points'];
		}
		if (isset($request['canvas_type'])) {
			$svg->canvas_type = $request['canvas_type'];
		}
		$svg->save();

		return response()->json( [
			'code' => 'svg_element_updated',
			'message' => 'SVG element '.$svg->canvas_type.' updated for image', 
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
		$svg = Svg::find($element_id);
		$svg->delete();

		return response()->json( [
			'code' => 'svg_element_deleted',
			'message' => 'SVG element deleted for image', 
			], 201 );
	}

	public function downloadSvg($projectid, $imageid){

		$svgData = $_REQUEST['data'];
		$data = base64_decode($svgData);
		$display_document_name = "project_master_svg.txt";
        
		header('Content-Type: text/plain');
		header("Content-Disposition: attachment; filename=".$display_document_name."");
		echo $data;
	}	

}
