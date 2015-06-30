<?php namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use CommonFloor\User;
use CommonFloor\Role;
use Illuminate\Support\Facades\Mail;
use CommonFloor\UserRole;
use CommonFloor\UserProject;
use CommonFloor\Project;
use \Session;
use CommonFloor\UnitVariant;
use CommonFloor\UnitType;
use CommonFloor\Unit;
use CommonFloor\AgentUnit;
use \Excel;



class AgentController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$users = User::where('is_agent','yes')->orderBy('name')->get()->toArray();
        return view('admin.agent.list')
                        ->with('users', $users)
                        ->with('menuFlag', FALSE);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return view('admin.agent.add')->with('menuFlag', FALSE);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		$name = $request->input('name');
        $email = $request->input('email');
        $phone_number = $request->input('phone_number');
        $user_status = $request->input('user_status');
        $password = UserController::random_password();

        $user = new User();
        $user->name = ucfirst($name);
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->phone = $phone_number;
        $user->is_agent = 'yes';
        $user->status = $user_status;
        $user->save();
        $userId = $user->id;
        
        $userRole = new UserRole();
        $userRole->user_id = $userId;
        $userRole->role_id = Role :: where('name','cf-agent')->pluck('id');
        $userRole->save();
 
        $data =[];
        $data['name'] = $name;
        $data['email'] = $email;
        $data['password'] = $password;
 
        Mail::send('admin.user.registermail', ['user'=>$data], function($message)use($data)
        {  
            $message->to($data['email'], $data['name'])->subject('Welcome to CommonFloor Unit Selector!');
        });
        
         
        Session::flash('success_message','Agent created successfully. An email has been sent to the user email address with the login instruction');
        $addanother = $request->input('addanother');

        if ($addanother == 1)
            return redirect("/admin/agent/create");
        else
            return redirect("/admin/agent/" . $userId . "/edit");
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
    public function edit($id) { 
        
        $user = User::find($id)->toArray();
        $roles = Role::all()->toArray(); 
        $defaultRole = getDefaultRole($id);
        $userProjects = getUserAssignedProject($id);
        $userProjectData =[];
       
        if($defaultRole['PROJECT_ACCESS']=='specific')
        {
            foreach($userProjects as $key=> $userProject)
            { 
                $userProjects[$key]['project_name']= Project :: find($userProject['project_id'])->project_title;

            }
        }
         
    
        $user['default_role_id'] = $defaultRole['role_id'];
        $user['project_access'] = $defaultRole['PROJECT_ACCESS'];
        
        return view('admin.agent.edit')
                        ->with('roles', $roles)
                        ->with('user', $user)
                        ->with('userProjects', $userProjects)
                        ->with('flag', FALSE)
                        ->with('menuFlag', FALSE);
    }

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request)  
	{
		$name = $request->input('name');
        $email = $request->input('email');
        $phone_number = $request->input('phone_number');
        $user_status = $request->input('user_status');
        $user_role = $request->input('user_role');

        $user = User::find($id);
        $user->name = ucfirst($name);
        $user->phone = $phone_number;
        
        $user->email = $email;
        $user->status = $user_status;
        
        $user->save();

        Session::flash('success_message','Agent Successfully Updated');    
        $addanother = $request->input('addanother');

        if ($addanother == 1)
            return redirect("/admin/agent/create");
        else
            return redirect("/admin/agent/" . $id . "/edit");
	}
    
    public function changePassword($userId, Request $request) {
        $newpassword = $request->input('newpassword');
        $is_profile = $request->input('is_profile');

        $user = User::find($userId);
        $user->password = Hash::make($newpassword);
        $user->save();
        
         Session::flash('success_message','Password Successfully Updated');
        
        if ($is_profile == 1)
            return redirect("/admin/agent/" . $userId . "/profile");
        else
             return redirect("/admin/agent/" . $userId . "/edit");
    }
    
    public function agentUnitImport($userId, Request $request)
    {
        
        $projectId = $request->input('project_id');

        $unit_file = $request->file('unit_file')->getRealPath();
        
         
       
        if ($request->hasFile('unit_file'))
        {
             Excel::load($unit_file, function($reader)use($projectId,$userId) {
                
                $agentUnit = AgentUnit :: where('project_id',$projectId)->delete(); 
                $project = Project::find($projectId); 
                $projectPropertyTypes = $project->projectPropertyTypes()->get()->toArray(); 
                $projectUnits = [];
                $errorMsg = []; 

                foreach ($projectPropertyTypes as $propertyType) {
                    $propertyTypeId = $propertyType['property_type_id'];
                    $projectpropertyTypeId = $propertyType['id'];
                    $unitTypeIds = UnitType::where( 'project_property_type_id', $projectpropertyTypeId )->get()->lists('id');
                    $unitVariantIds = UnitVariant::whereIn('unit_type_id',$unitTypeIds)->get()->lists('id');
                    $units = Unit ::whereIn('unit_variant_id',$unitVariantIds)->get()->lists('id');
                    $projectUnits = array_merge($projectUnits,$units);
                }    
                 
                $results = $reader->toArray(); 
                $unitIds =[];     
               if(!empty($results))
               {
                 if(count($results[0])==4)
                 {
                     $i=0;
                   foreach($results as $result)
                   {  $i++;
                       $unitId = intval($result['unit_id']);
                       $access = $result['has_access_yesno']; 


                       if($unitId =='' || $unitId =='0')
                       {
                            $errorMsg[] ='Unit Id Is Empty On Row No '.$i.'<br>';
                            continue;
                       }

                       if($access =='')
                       {
                           $errorMsg[] ='Has Access Id Is Empty On Row No '.$i;
                            continue;
                       }

                       if(!in_array($unitId,$projectUnits))
                       {
                           $errorMsg[] ='Invalid Unit Id  On Row No '.$i ;
                            continue;
                       }
                       if($access =='yes')
                       {
                          $agentUnit = new AgentUnit();
                          $agentUnit->user_id = $userId;
                          $agentUnit->project_id = $projectId;   
                          $agentUnit->unit_id = $unitId; 
                          $agentUnit->save();   
                           
                           
                       }
     
                     Session::flash('success_message','Unit Successfully Assigned');

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
       
       
       return redirect("/admin/agent/" . $userId . "/edit/");
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

}
