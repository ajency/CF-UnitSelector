<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\UnitVariant;
use CommonFloor\Unit;
use CommonFloor\UnitType;
use CommonFloor\Defaults;
use \Session;
use \Excel;
use Auth;
use CommonFloor\AgentUnit; 
use CommonFloor\Http\Controllers\Admin\ProjectBunglowUnitController;
use CommonFloor\PropertyTypeGroup;

class ProjectPlotUnitController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
 
    public function index($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];
        $projectPropertytypeId = 0;
        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == PLOTID)
                $projectPropertytypeId = $propertyTypes['id'];
        }
        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = $unitVariantIdArr = [];
        foreach ($unitTypeArr as $unitType)
            $unitTypeIdArr[] = $unitType['id'];

        $unitvariantArr = UnitVariant::whereIn('unit_type_id', $unitTypeIdArr)->get()->toArray();
        foreach ($unitvariantArr as $unitvariant)
            $unitVariantIdArr[] = $unitvariant['id'];

        if(isAgent())
        {
            $userId =Auth::user()->id;
            $unitIds = AgentUnit :: where(['project_id'=>$id, 'user_id'=>$userId])->get()->lists('unit_id');
            $unitArr = Unit::whereIn('id',$unitIds)->whereIn('unit_variant_id',$unitVariantIdArr)->orderBy('unit_name')->get();
        }
        else
           $unitArr = Unit::whereIn('unit_variant_id',$unitVariantIdArr)->orderBy('unit_name')->get();

        return view('admin.project.unit.plot.list')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_arr', $unitArr)
                        ->with('current', 'plots-unit');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectAttributes = $project->attributes->toArray();
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $defaultDirection = Defaults::where('type','direction')->get()->toArray();
        $propertyTypeArr = [];
        $projectPropertytypeId = 0;
        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == PLOTID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $propertyTypeGroups = PropertyTypeGroup::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType)
            $unitTypeIdArr[] = $unitType['id'];

        $unitVariantArr = UnitVariant::whereIn('unit_type_id', $unitTypeIdArr)->get()->toArray();
        $phases = $project->projectPhase()-> where('status','not_live')->get()->toArray(); 

        return view('admin.project.unit.plot.add')
                        ->with('project', $project->toArray())
                        ->with('projectAttributes', $projectAttributes)
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('phases', $phases)
                        ->with('defaultDirection', $defaultDirection)
                        ->with('projectPropertytypeId', $projectPropertytypeId)
                        ->with('propertyTypeGroups', $propertyTypeGroups)
                        ->with('current', 'plots-unit');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($project_id, Request $request) {
        $cfProjectId = Project::find($project_id)->cf_project_id;
        $unit = new Unit();
        $unitName = ucfirst($request->input('unit_name'));
        $unit->unit_name = $unitName;
        
        $unit->unit_variant_id = $request->input('unit_variant');
        $unit->availability = $request->input('unit_status');
        $unit->phase_id = $request->input('phase');
        $unit->property_type_group_id = $request->input('property_type_group');
        $unit->direction = $request->input('direction');
        $unit->tour_url = $request->input('tour_url');
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
        $unitid = $unit->id;
        Session::flash('success_message','Unit Successfully Created');
        
        if(ProjectBunglowUnitController::add_unit_to_booking_crm($unitid,$unitName,$cfProjectId))
            Session::flash('success_message','Unit Successfully Created And Updated To CRM');
        else
            Session::flash('success_error','Failed To Update Unit Data Into CRM');

        $addanother = $request->input('addanother');
        if ($addanother == 1)
            return redirect(url("/admin/project/" . $project_id . "/plots-unit/create"));
        else
            return redirect("/admin/project/" . $project_id . "/plots-unit/" . $unitid . '/edit');
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
    public function edit($project_id, $id, ProjectRepository $projectRepository) {
        $unit = Unit::find($id);
        $project = $projectRepository->getProjectById($project_id); 
        $projectAttributes = $project->attributes->toArray();
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $defaultDirection = Defaults::where('type','direction')->get()->toArray();
        $propertyTypeArr = [];

        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == PLOTID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $propertyTypeGroups = PropertyTypeGroup::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType)
            $unitTypeIdArr[] = $unitType['id'];

        $unitVariantArr = UnitVariant::whereIn('unit_type_id', $unitTypeIdArr)->get()->toArray();
        $phases = $project->projectPhase()-> where('status','not_live')->get()->toArray(); 
        
        $isUnitPhaseInPhases =[];
        foreach ($phases as $key => $phase) {
            if($phase['id'] == $unit->phase_id)
            {    
                $isUnitPhaseInPhases[] =$unit->phase_id;
            }

        }
        
        if(empty($isUnitPhaseInPhases))
            $phases[]= $project->projectPhase()->where('id',$unit->phase_id)->first()->toArray();
        
        $disabled =(isAgent())?'disabled':'';  
        $unit['agent_name']='';
        if($unit->availability=='booked_by_agent' && $unit->agent_id!=0)
        {
            $username = \CommonFloor\User::find($unit->agent_id)->name;
            $unit['agent_name']=$username;
        }

        return view('admin.project.unit.plot.edit')
                        ->with('project', $project->toArray())
                        ->with('projectAttributes', $projectAttributes)
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('unit', $unit->toArray())
                        ->with('phases', $phases)
                        ->with('defaultDirection', $defaultDirection)
                        ->with('projectPropertytypeId', $projectPropertytypeId)
                        ->with('propertyTypeGroups', $propertyTypeGroups)
                        ->with('disabled', $disabled)
                        ->with('current', 'plots-unit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($project_id, $id, Request $request) {
        $unit = Unit::find($id);
        $status =$request->input('unit_status');

        if($status == 'blocked' || $status == 'payment_in_progress')
        {
          Session::flash('error_message','Error !!! Cannot update unit as it is used for booking');    
          return redirect("/admin/project/" . $project_id . "/plots-unit/" . $id . '/edit');
        }

        if(!isAgent())      //NOT AGENT HE CAN UPDATE OTHER DETAILS
        {
            $unit->unit_name = ucfirst($request->input('unit_name'));
            $unit->unit_variant_id = $request->input('unit_variant');
            $unit->phase_id = $request->input('phase');
            $unit->direction = $request->input('direction');
            $unit->property_type_group_id = $request->input('property_type_group');
            $unit->tour_url = $request->input('tour_url');
            $views = $request->input('views');
            $unitviews=[];
            if(!empty($views))
            {
                foreach ($views as $key=>$view)
                   $unitviews[$key]= ucfirst($view);    
            }
            $viewsStr = serialize( $unitviews );
            $unit->views = $viewsStr;
        }
        else{
            if($status=='booked_by_agent')
            {
                $unit->agent_id =  Auth::user()->id;
                
                
            }
        
        } 
        $unit->booked_at = date('Y-m-d H:i:s');
        $unit->availability = $status;
        $unit->save();
        Session::flash('success_message','Unit Successfully Updated');

        $addanother = $request->input('addanother');
        if ($addanother == 1)
            return redirect("/admin/project/" . $project_id . "/plots-unit/create");
        else
            return redirect("/admin/project/" . $project_id . "/plots-unit/" . $id . '/edit');
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
    
   public function unitImport($projectId, Request $request) 
   {
        $project = Project::find($projectId);
        $unit_file = $request->file('unit_file')->getRealPath();
        $extension = $request->file('unit_file')->getClientOriginalExtension(); 
       
        if ($request->hasFile('unit_file') && $extension=='csv')
        {
            Excel::load($unit_file, function($reader)use($project) {
            $errorMsg = [];
            $results = $reader->toArray();//dd($results);
            $cfProjectId = $project->cf_project_id;
            
            if(!empty($results))
            {
             if(count($results[0])==10)
             {
                 $i=0;
               foreach($results as $result)
               {
                   $i++;
                   $name = $result['name']; 
                   $variantId = intval($result['variant_id']);
                   $availability = $result['status_id']; 
                   $views = $result['views']; 
                   $direction = intval($result['direction_id']); 
                   $phaseId =  intval($result['phase_id']); 
                   
                   if($name =='')
                   {
                       $errorMsg[] ='Unit Name Is Empty On Row No '.$i;
                       continue;
                   }
                        
                   
                   if($variantId =='' || $variantId =='#N/A')
                   {
                        $errorMsg[] ='Variant Id Is Empty On Row No '.$i.'<br>';
                        continue;
                   }
                   
                   if($availability =='' || $availability =='#N/A')
                   {
                       $errorMsg[] ='Status Id Is Empty On Row No '.$i;
                        continue;
                   }
                   
                   if($direction =='' || $direction =='#N/A')
                   {
                        $errorMsg[] ='Direction Id Is Empty On Row No '.$i;
                        continue;
                   }
                   
                   if($phaseId =='' || $phaseId =='#N/A')
                   {
                       $errorMsg[] ='Phase Id Is Empty On Row No '.$i;
                        continue;
                   }
                   
                   $projectViews = $project->attributes->lists('label');  
                   if(empty($projectViews) && $views!='')
                   {
                       $errorMsg[] ='Cannot Add Views To Unit Since No Views Created For Project  On Row No '.$i;
                       continue;
                   }
                   
                   $phases = $project->projectPhase()->where('status','not_live')->get()->lists('id');
                   if(!in_array($phaseId,$phases))
                   {
                        $errorMsg[] ='Invalid Phase Id  On Row No '.$i;
                        continue;
                   }
                   
                   $defaultDirections = Defaults::where('type','direction')->get()->lists('id');
                   if(!in_array($direction,$defaultDirections))
                   {
                       $errorMsg[] ='Invalid Direction Id  On Row No '.$i;
                        continue;
                   }
     
                   //UNIT NAME VALIDATION
 
                   $projectPropertyTypeId = $project->projectPropertyTypes()->where( 'property_type_id', PLOTID )->first()->id;
                   $unitTypeIds = UnitType::where( 'project_property_type_id', $projectPropertyTypeId )->get()->lists('id');
                   $unitVariantIds = UnitVariant::whereIn('unit_type_id',$unitTypeIds)->get()->lists('id');
                   if(!in_array($variantId,$unitVariantIds))
                   {
                       $errorMsg[] ='Invalid Variant Id  On Row No '.$i ;
                        continue;
                   }
                   
                   $unitData = Unit::whereIn('unit_variant_id',$unitVariantIds)->where('unit_name', $name)->get()->toArray();
 
                   if (!empty($unitData)) 
                   {
                       $errorMsg[] ='Unit Name Already Exist On Row No '.$i ;
                       continue;
                   }
 
                    $unit =new Unit();
                    $unitName = ucfirst($name);
                    $unit->unit_name = $unitName;
                    $unit->unit_variant_id = $variantId;
                    $unit->availability = $availability;
                    $unit->direction = $direction;
                    $unit->phase_id = $phaseId;
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
                   
                    ProjectBunglowUnitController::add_unit_to_booking_crm($unit->id,$unitName,$cfProjectId);
                    Session::flash('success_message','Unit Successfully Imported');
                 
               }
                   
             }
             else
                 $errorMsg[] ='Column Count does not match';
            
            }
             else
                 $errorMsg[] ='No Data Found';
     
                if(!empty($errorMsg))   
                    Session::flash('error_message',$errorMsg);  


            });
            
          
        }
       else
           Session::flash('error_message','Invalid file format. Upload .csv file');
       
       return redirect("/admin/project/" . $projectId . "/plots-unit/");
 
       
   }

}
