<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Project;
use CommonFloor\Unit;
use CommonFloor\UnitType;
use CommonFloor\Building;
use CommonFloor\FloorLayout;
use CommonFloor\UnitVariant;
use CommonFloor\Defaults;
use \Session;
use \Excel;

class ProjectApartmentUnitController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
   
    public function index($projectId) {
        $project = Project::find($projectId);
        $phases = $project->projectPhase()->lists('id');
        $buildings = Building::whereIn('phase_id', $phases)->lists('id');
        $units = Unit::whereIn('building_id', $buildings)->get();
        return view('admin.project.unit.apartment.list')
                        ->with('project', $project->toArray())
                        ->with('current', 'apartment-unit')
                        ->with('units', $units);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($projectId) {

        $project = Project::find($projectId);
        $phases = $project->projectPhase()->lists('id');
        $projectAttributes = $project->attributes->toArray();
        $defaultDirection = Defaults::where('type','direction')->get()->toArray();
        $buildings = Building::whereIn('phase_id', $phases)->get();
        $propertyTypes = $project->projectPropertyTypes()->whereIn( 'property_type_id', [APARTMENTID,PENTHOUSEID] )->get()->toArray();
        $unitVariantArr = $projectPropertyTypes = $unitTypeIdArr= [];
        
        foreach($propertyTypes as $propertyType)
        {
            $projectPropertyTypes[]  = ['NAME'=>get_property_type($propertyType['property_type_id']),'ID'=>$propertyType['id']];
 
        } 
 
        if(count($projectPropertyTypes)==1)
        {
           $unitTypeArr = UnitType::where( 'project_property_type_id', $projectPropertyTypes[0]['ID'] )->get();
         
            foreach($unitTypeArr as $unitType)
                $unitTypeIdArr[] =$unitType['id'];
           
            $unitVariantArr = UnitVariant::whereIn('unit_type_id',$unitTypeIdArr)->get()->toArray(); 
        }

        
        return view('admin.project.unit.apartment.create')
                        ->with('project', $project->toArray())
                        ->with('projectPropertyTypes', $projectPropertyTypes)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('projectAttributes', $projectAttributes)
                        ->with('defaultDirection', $defaultDirection)
                        ->with('current', 'apartment-unit')
                        ->with('buildings', $buildings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($projectId, Request $request) {

        $unit = new Unit;
        $unit->unit_name = ucfirst($request->get('unit_name'));
        $unit->unit_variant_id = $request->get('unit_variant_id');
        $unit->building_id = $request->get('building_id');
        $unit->floor = $request->get('floor');
        $unit->position = $request->get('position');
        $unit->availability = $request->get('unit_status');
        $unit->direction = $request->input('direction');
        $views = $request->input('views');
        $unitviews=[];
        if(!empty($views))
        {
            foreach ($views as $key=>$view)
               $unitviews[$key]= ucfirst($view);    
        }
        $viewsStr = serialize( $unitviews );
        $unit->views = $viewsStr;
        
        $unit->save();
        Session::flash('success_message','Unit Successfully Created');

        $addanother = $request->input('addanother');
        if ($addanother == 1)
            return redirect(url('/admin/project/' . $projectId . '/apartment-unit/create'));
        else
            return redirect(url('/admin/project/' . $projectId . '/apartment-unit/' . $unit->id . '/edit'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($projectId, $unitId) {
        $project = Project::find($projectId);
        $project = Project::find($projectId);
        $projectAttributes = $project->attributes->toArray();
        $defaultDirection = Defaults::where('type','direction')->get()->toArray();
        $phases = $project->projectPhase()->lists('id');

        $buildings = Building::whereIn('phase_id', $phases)->get()->toArray();

        $unit = Unit::find($unitId)->toArray();
        $building = Building::find($unit['building_id'])->toArray();
        $floors = $building['no_of_floors'];
        
        $positions =[];
        $unitPositions = Unit :: where('building_id',$unit['building_id'])->where('floor',$unit['floor'])->where('id','!=',$unit['id'])->get()->toArray();
        foreach($unitPositions as $unitPosition)
            $positions[] = $unitPosition['position'];
        
 
        $availabelpositions = [];
         for ($i = 1; $i<=40 ; $i++)
        {
            if(in_array($i,$positions))
                continue;
             
            $availabelpositions [] =$i;
            
        }
        
 

        $projectPropertytypes = $project->projectPropertyTypes()->whereIn( 'property_type_id', [APARTMENTID,PENTHOUSEID] )->get()->toArray();
        
        $variantId = $unit['unit_variant_id'];
        $unitType = UnitVariant::find($variantId)->unitType()->first();
        $unitTypeId = $unitType->id;
        $unitVariantArr = UnitVariant::where('unit_type_id',$unitTypeId)->get()->toArray();

        return view('admin.project.unit.apartment.edit')
                        ->with('project', $project->toArray())
                        ->with('projectAttributes', $projectAttributes)
                        ->with('current', 'apartment-unit')
                        ->with('buildings', $buildings)
                        ->with('floors', $floors)
                        ->with('availabelpositions', $availabelpositions)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('defaultDirection', $defaultDirection)
                        ->with('unit', $unit);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($project_id, $id, Request $request) {
 
        $unit = Unit::find($id);
        $unit->unit_name = ucfirst($request->get('unit_name'));
        $unit->unit_variant_id = $request->get('unit_variant');
        $unit->building_id = $request->get('building_id');
        $unit->floor = $request->get('floor');
        $unit->position = $request->get('position');
        $unit->availability = $request->get('unit_status');
        $unit->direction = $request->input('direction');
        $views = $request->input('views');
        $unitviews=[];
        if(!empty($views))
        {
            foreach ($views as $key=>$view)
               $unitviews[$key]= ucfirst($view);    
        }
        $viewsStr = serialize( $unitviews );
        $unit->views = $viewsStr;
        $unit->save();
        Session::flash('success_message','Unit Successfully Updated');

        $addanother = $request->input('addanother');
        if ($addanother == 1)
            return redirect(url('/admin/project/' . $project_id . '/apartment-unit/create'));
        else
            return redirect("/admin/project/" . $project_id . "/apartment-unit/" . $id . '/edit');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        //
    }
    
    public function getAvailablePosition($projectId, Request $request)
    {  
        $buildingId = $request['buildingId'];
        $floor = $request['floor'];
        $unitPositions = Unit :: where('building_id',$buildingId)->where('floor',$floor)->get()->toArray();
        $positions =[];
        foreach($unitPositions as $unitPosition)
            $positions[] = $unitPosition['position'];
        
        $str ='<option value="">Select Position</option>';
        for ($i = 1; $i<=40 ; $i++)
        {
            if(in_array($i,$positions))
                continue;
            
            $str .='<option value="'.$i.'">'.$i.'</option>';
        }
        
       return response()->json( [
            'code' => 'available_poition',
            'message' => '',
            'data' => $str
        ], 201 );
    }
    
     
    public function validateBuildingUnitName($projectId,Request $request) {
       
        $name = $request->input('name');
        $buildingId = $request->input('buildingId');
        $unitId = $request->input('unitId');
        
        $msg = '';
        $flag = true;

        if ($unitId)
        {
            $unitData = Unit::where('building_id',$buildingId)->where('unit_name', $name)->where('id', '!=', $unitId)->get()->toArray();
        }
        else
        {
            $unitData = Unit::where('building_id',$buildingId)->where('unit_name', $name)->get()->toArray();
        }

        if (!empty($unitData)) {
            $msg = 'Unit Name Already Taken';
            $flag = false;
        }


        return response()->json([
                    'code' => 'unit_name_validation',
                    'message' => $msg,
                    'data' => $flag,
                        ], 200);
    }
    
  
    
    
   public function unitImport($projectId, Request $request) 
   {
        $project = Project::find($projectId);
        $unit_file = $request->file('unit_file')->getRealPath();
         
       
        if ($request->hasFile('unit_file'))
        {
            Excel::load($unit_file, function($reader)use($project) {
            
            $results = $reader->toArray(); //dd($results);
            if(count($results[0])==12)
             {   
                $i=0;
               foreach($results as $result)
               {
                    $i++;
                   $name = $result['name'];
                   if(isset($result['apartment_variant_id']))
                   {
                        $propertyTypeId = APARTMENTID;
                        $variantId = intval($result['apartment_variant_id']);
                   }
                   elseif(isset($result['penthouse_variant_id']))
                   {
                       $propertyTypeId = PENTHOUSEID;
                       $variantId = intval($result['penthouse_variant_id']);
                   }
                   else
                      $variantId = ''; 
                   
                   $position =  intval($result['position']) ; 
                   $floor = intval($result['floor']) ;  
                   $buildingId =  intval($result['building_id']) ; 
                   $availability = $result['status_id']; 
                   $views = $result['views']; 
                   $direction = intval($result['direction_id']);
                   
                   if($name =='')
                   {
                       $errorMsg[] ='Unit Name Is Empty On Row No '.$i;
                       continue;
                   }
                        
                   
                   if($variantId =='')
                   {
                        $errorMsg[] ='Variant Id Is Empty On Row No '.$i.'<br>';
                        continue;
                   }
                   
                   if($availability =='')
                   {
                       $errorMsg[] ='Status Id Is Empty On Row No '.$i;
                        continue;
                   }
                   
                   if($direction =='')
                   {
                        $errorMsg[] ='Direction Id Is Empty On Row No '.$i;
                        continue;
                   }
                   
                   if($buildingId =='')
                   {
                       $errorMsg[] ='Building Id Is Empty On Row No '.$i;
                        continue;
                   }
                   
                   if($floor =='' && $floor==0)
                   {
                       $errorMsg[] ='Floor Is Empty On Row No '.$i;
                        continue;
                   }
                   
                   if($position =='')
                   {
                       $errorMsg[] ='Position Is Empty On Row No '.$i;
                        continue;
                   }
                   
                   $defaultDirections = Defaults::where('type','direction')->get()->lists('id');
                   if(!in_array($direction,$defaultDirections))
                   {
                       $errorMsg[] ='Invalid Direction Id  On Row No '.$i;
                        continue;
                   }
                   
                   $phases = $project->projectPhase()->lists('id');
                   $buildings = Building::whereIn('phase_id', $phases)->lists('id');
                   if(!in_array($buildingId,$buildings))
                   {
                       $errorMsg[] ='Invalid Building Id  On Row No '.$i;
                        continue;
                   }
                 
                   //UNIT NAME VALIDATION
                    $unitData = Unit::where('building_id',$buildingId)->where('unit_name', $name)->get()->toArray();
                    if (!empty($unitData)) 
                    {
                        $errorMsg[] ='Unit Name Already Exist On Row No '.$i ;    
                       continue;
                    }
                   
                    $num_of_floors = Building::find($buildingId)->no_of_floors;
                    if ($num_of_floors >= $floor) 
                    {
                        $errorMsg[] ='Invalid Floor No On Row No'.$i ;    
                        continue;
                    }

                    //Unit exist at that position
                    $unitposition = Unit::where('building_id',$buildingId)->where('floor', $floor)->where('position', $position)->get()->toArray(); 
                   if (!empty($unitposition))
                   {
                       $errorMsg[] ='Invalid Position  On Row No '.$i;
                       continue;
                   }
 
                   $projectPropertyTypeId = $project->projectPropertyTypes()->where( 'property_type_id', $propertyTypeId )->first()->id;
                   $unitTypeIds = UnitType::where( 'project_property_type_id', $projectPropertyTypeId )->get()->lists('id');
                   $unitVariantIds = UnitVariant::whereIn('unit_type_id',$unitTypeIds)->get()->lists('id');
                                     
                   if(!in_array($variantId,$unitVariantIds))
                   {
                       $errorMsg[] ='Invalid Variant Id  On Row No '.$i ;
                        continue;
                   }
                   
                     
                    $unit =new Unit();
                    $unit->unit_name = ucfirst($name);
                    $unit->unit_variant_id = $variantId;
                    $unit->building_id = $buildingId;
                    $unit->floor =$floor;
                    $unit->position = $position;
                    $unit->availability = $availability;
                    $unit->direction = $direction;
                    $views = $views;
                    $unitviews=[];
                    if($views!='')
                    {
                        $views = explode(',',$views); 
                        foreach ($views as $view)
                           $unitviews[property_type_slug($view)]= ucfirst($view);    
                    }
                    $viewsStr = serialize( $unitviews );
                    $unit->views = $viewsStr;
                    $unit->save();

                  
               }
                Session::flash('success_message','Unit Successfully Imported');
            }
             else
                 $errorMsg[] ='Column Count does not match';
     

                Session::flash('error_message',$errorMsg);
 
            });
            
            
        }
       
       
       return redirect("/admin/project/" . $projectId . "/apartment-unit/");
 
       
   }

}
