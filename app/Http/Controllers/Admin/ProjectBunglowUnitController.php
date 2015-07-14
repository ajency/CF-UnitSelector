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
use CommonFloor\Phase;
use CommonFloor\Defaults;
use \Session;
use \Excel;
use Auth;
use CommonFloor\AgentUnit;    

class ProjectBunglowUnitController extends Controller {

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

            if ($propertyTypes['property_type_id']==BUNGLOWID)
                $projectPropertytypeId = $propertyTypes['id'];
        }
        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = $unitVariantIdArr= [];
        foreach($unitTypeArr as $unitType)
            $unitTypeIdArr[] =$unitType['id'];
       
        $unitvariantArr = UnitVariant::whereIn('unit_type_id',$unitTypeIdArr)->get()->toArray();
        foreach($unitvariantArr as $unitvariant)
            $unitVariantIdArr[] =$unitvariant['id'];
        
        if(isAgent())
        {
            $userId =Auth::user()->id;
            $unitIds = AgentUnit :: where(['project_id'=>$id, 'user_id'=>$userId])->get()->lists('unit_id');
            $unitArr = Unit::whereIn('id',$unitIds)->whereIn('unit_variant_id',$unitVariantIdArr)->orderBy('unit_name')->get();
        }
        else
           $unitArr = Unit::whereIn('unit_variant_id',$unitVariantIdArr)->orderBy('unit_name')->get(); 
  
        return view('admin.project.listunit')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_arr', $unitArr)
                        ->with('current', 'bunglow-unit');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($id, ProjectRepository $projectRepository) {

        $project = $projectRepository->getProjectById($id);
        $projectAttributes = $project->attributes->toArray();
        $defaultDirection = Defaults::where('type','direction')->get()->toArray();
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];
        $projectPropertytypeId = 0;
        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id']==BUNGLOWID)
                $projectPropertytypeId = $propertyTypes['id'];
        }
        
        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach($unitTypeArr as $unitType)
            $unitTypeIdArr[] =$unitType['id'];
       
        $unitVariantArr = UnitVariant::whereIn('unit_type_id',$unitTypeIdArr)->get()->toArray();
        $phases = $project->projectPhase()->where('status','not_live')->get()->toArray();

        return view('admin.project.addunit')
                        ->with('project', $project->toArray())
                        ->with('projectAttributes', $projectAttributes)
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('phases', $phases)
                        ->with('defaultDirection', $defaultDirection)
                        ->with('projectPropertytypeId', $projectPropertytypeId)
                        ->with('current', 'bunglow-unit');
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
        $unitid = $unit->id;
        Session::flash('success_message','Unit Successfully Created');
        
        if(self::add_unit_to_booking_crm($unitid,$unitName,$cfProjectId))
            Session::flash('success_message','Unit Successfully Created And Updated To CRM');
        else
            Session::flash('success_error','Failed To Update Unit Data Into CRM');
        
        $addanother = $request->input('addanother');
        
        if($addanother==1)
            return redirect("/admin/project/" . $project_id . "/bunglow-unit/create");
        else
            return redirect("/admin/project/" . $project_id . "/bunglow-unit/" . $unitid . '/edit');
        
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
        $defaultDirection = Defaults::where('type','direction')->get()->toArray();
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];

        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id']==BUNGLOWID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = []; 
        foreach($unitTypeArr as $unitType)
            $unitTypeIdArr[] =$unitType['id'];
       
        $unitVariantArr = UnitVariant::whereIn('unit_type_id',$unitTypeIdArr)->get()->toArray();
        $phases = $project->projectPhase()->where('status','not_live')->get()->toArray();
        
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
        if($unit->availability=='booked_by_agent')
        {
            $username = \CommonFloor\User::find($unit->agent_id)->name;
            $unit['agent_name']=$username;
        }
         
      
        return view('admin.project.editunit')
                        ->with('project', $project->toArray())
                        ->with('projectAttributes', $projectAttributes)
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unit_variant_arr', $unitVariantArr)
                        ->with('unit', $unit->toArray())
                        ->with('phases', $phases)
                        ->with('defaultDirection', $defaultDirection)
                        ->with('projectPropertytypeId', $projectPropertytypeId)
                        ->with('disabled', $disabled)
                        ->with('current', 'bunglow-unit');
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
        if(!isAgent())      //NOT AGENT HE CAN UPDATE OTHER DETAILS
        {
            $unit->unit_name = ucfirst($request->input('unit_name'));
            $unit->unit_variant_id = $request->input('unit_variant');
            $unit->phase_id = $request->input('phase');
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
        }
        else{
            if($status=='booked_by_agent')
            {
                $unit->agent_id =  Auth::user()->id;
                $unit->booked_at = date('Y-m-d H:i:s');
                
            }
        
        }
        
        $unit->availability = $status;
        $unit->save();
        Session::flash('success_message','Unit Successfully Updated');
        $addanother = $request->input('addanother');
        
        if($addanother==1)
            return redirect("/admin/project/" . $project_id . "/bunglow-unit/create");
        else
            return redirect("/admin/project/" . $project_id . "/bunglow-unit/" . $id . '/edit');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($projectId, $id) {
        $unit = Unit::find($id); 
        \CommonFloor\AgentUnit::where('unit_id',$id)->delete();  
        \CommonFloor\SvgElement::where('object_id',$id)->delete();  
        $unit->delete();
        
        Session::flash('success_message','Unit successfully deleted');
        if(self::delete_unit_from_booking_crm($id))
            Session::flash('success_message','Unit successfully deleted And Updated To CRM');
        else
            Session::flash('success_error','Failed To Update Unit Data Into CRM');
    
        return response()->json( [
                    'code' => 'unt_deleted',
                    'message' => 'Unit deleted successfully',
         
                        ], 204 );
    }
    
    public function updateStatus($project_id, $id, Request $request) {
        $unit = Unit::find($id);
        $status =$request->input('unit_status');
        if(isAgent() && $status=='booked_by_agent')
        {
            $unit->agent_id =  Auth::user()->id;
            $unit->booked_at = date('Y-m-d H:i:s');

        }
        $unit->availability = $status;
        $unit->save();
        
        return response()->json([
                    'code' => 'unit_name_validation',
                    'message' => 'Unit Status Successfully updated',
                    'data' => [
                        'status' => ucfirst($status)
                    ]
                        ], 202);
    }
    
 
    public function validateUnitName($projectId,Request $request) {
        $name = $request->input('name');
 
        $projectPropertytypeId = $request->input('projectPropertytypeId');
        $unitId = $request->input('unitId');
        
        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = $unitVariantIdArr= [];
        foreach($unitTypeArr as $unitType)
            $unitTypeIdArr[] =$unitType['id'];
       
        $unitvariantArr = UnitVariant::whereIn('unit_type_id',$unitTypeIdArr)->get()->toArray();
        foreach($unitvariantArr as $unitvariant)
            $unitVariantIdArr[] =$unitvariant['id'];
        
        $msg = '';
        $flag = true;

        if ($unitId)
            $unitData = Unit::whereIn('unit_variant_id',$unitVariantIdArr)->where('unit_name', $name)->where('id', '!=', $unitId)->get()->toArray();
        else
            $unitData = Unit::whereIn('unit_variant_id',$unitVariantIdArr)->where('unit_name', $name)->get()->toArray();


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
        $extension = $request->file('unit_file')->getClientOriginalExtension();

        if ($request->hasFile('unit_file') && $extension=='csv')
        {
            Excel::load($unit_file, function($reader)use($project) {
            $results = $reader->toArray();//dd($results);
            $errorMsg = []; 
            $cfProjectId = $project->cf_project_id;
            
            if(!empty($results))
            {
             if(count($results[0])==10)
             {
                 $i=0;
               foreach($results as $result)
               {  $i++;
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
 
                   $projectPropertyTypeId = $project->projectPropertyTypes()->where( 'property_type_id', BUNGLOWID )->first()->id;
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
                
                self::add_unit_to_booking_crm($unit->id,$unitName,$cfProjectId);
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
       
       return redirect("/admin/project/" . $projectId . "/bunglow-unit/");
 
       
   }

  public static function add_unit_to_booking_crm($unitId,$unitName,$projectId){
        $sender_url = BOOKING_SERVER_URL;
        $sender_url .= ADD_BOOKING_UNIT;

        /* $_GET Parameters to Send */
        //$params = array('unit_id' => $unitId,'unit_name' => $unitName,'project_id' => $projectId );
         $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&unit_id=".$unitId."&unit_name=".$unitName."&project_id=".$projectId; 
      
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
    
    public static function delete_unit_from_booking_crm($unitId){
        $sender_url = BOOKING_SERVER_URL;
        $sender_url .= ADD_BOOKING_UNIT;

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

}
