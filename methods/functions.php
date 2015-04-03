<?php
if(isset($_REQUEST['action']) && !empty($_REQUEST['action'])) {
    $action = $_REQUEST['action'];
    switch($action) {
        case 'load_project' : load_project();break;
        case 'load_buildings' : load_buildings();break;
        case 'load_units' : load_units();break;
        case 'load_unit_types' : load_unit_types();break;
        case 'load_apartment_variants' : load_apartment_variants();break;
        case 'load_settings' : load_settings();break;
        case 'load_status' : load_status();break;
        
       
    }
}
function load_data($type){


	$file = load_file($type);
	$data = file_get_contents($file);

	$response = null;
	if($data != null)
	{
		$proper_data = json_decode($data, true);
		$response = json_encode($proper_data);
	}
		

  	return $response;
}
function load_project(){

	$project_id = $_REQUEST['project_id'];
	$file = load_file('project');
	$data = file_get_contents($file);
	
	$response = 0;
	$temp = array();
	if($data != null)
	{
		$proper_data = json_decode($data, true);
		
		foreach($proper_data as $obj){

		   if($obj['aj_id'] == $project_id)
		   		$response = json_encode($obj);
		  

		}
		
	}
		

  	echo $response;
}
function load_buildings(){

	$project_id = $_REQUEST['project_id'];
	$file = load_file('building');
	$data = file_get_contents($file);
	
	$response = 0;
	$temp = array();
	if($data != null)
	{
		$proper_data = json_decode($data, true);

		
		
		foreach($proper_data as $key => $obj){
			if($key == $project_id)
		   		$response = json_encode($obj);
		  

		}
		
	}
		

  	echo $response;
}
function load_settings(){

	$project_id = $_REQUEST['project_id'];
	$file = load_file('settings');
	$data = file_get_contents($file);
	
	$response = 0;
	$temp = array();
	if($data != null)
	{
		$proper_data = json_decode($data, true);

		
		
		foreach($proper_data as $key => $obj){
			if($key == $project_id)
		   		$response = json_encode($obj);
		  

		}
		
	}
		

  	echo $response;
}
function load_units(){

	$project_id = $_REQUEST['project_id'];
	$file = load_file('unit');
	$data = file_get_contents($file);
	
	$response = 0;
	$temp = array();
	if($data != null)
	{
		$proper_data = json_decode($data, true);

		
		
		foreach($proper_data as $key => $obj){
			if($key == $project_id)
		   		$response = json_encode($obj);
		  

		}
		
	}
		

  	echo $response;
}
function load_unit_types(){

	$project_id = $_REQUEST['project_id'];
	$file = load_file('unit_type');
	$data = file_get_contents($file);
	
	$response = 0;
	$temp = array();
	if($data != null)
	{
		$proper_data = json_decode($data, true);

		
		
		foreach($proper_data as $key => $obj){
			if($key == $project_id)
		   		$response = json_encode($obj);
		  

		}
		
	}
		

  	echo $response;
}
function load_apartment_variants(){

	$project_id = $_REQUEST['project_id'];
	$file = load_file('unit_variant');
	$data = file_get_contents($file);
	
	$response = 0;
	$temp = array();
	if($data != null)
	{
		$proper_data = json_decode($data, true);

		
		
		foreach($proper_data as $key => $obj){
			if($key == $project_id)
		   		$response = json_encode($obj);
		  

		}
		
	}
		

  	echo $response;
}
function load_status(){

	$project_id = $_REQUEST['project_id'];
	$file = load_file('status');
	$data = file_get_contents($file);
	
	$response = 0;
	$temp = array();
	if($data != null)
	{
		$proper_data = json_decode($data, true);

		
		
		foreach($proper_data as $key => $obj){
			
			if($key == $project_id)
		   		$response = json_encode($obj);
		  

		}
		
	}
		

  	echo $response;
}
function load_file($file){

	$path = "";

	switch($file){

		case 'project':
		$path = '../methods/files/project.txt';
		break;

		case 'building':
		$path = '../methods/files/building.txt';
		break;

		case 'unit':
		$path = '../methods/files/unit.txt';
		break;

		case 'unit_type':
		$path = '../methods/files/unit_type.txt';
		break;

		case 'status':
		$path = '../methods/files/status.txt';
		break;

		case 'unit_variant':
		$path = '../methods/files/unit_variant.txt';
		break;

		case 'settings':
		$path = '../methods/files/settings.txt';
		break;

		

	}
	return $path;
}