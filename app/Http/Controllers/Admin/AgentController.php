<?php namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use CommonFloor\User;
use Illuminate\Support\Facades\Mail;
use \Session;
use CommonFloor\Http\Controllers\Admin\UserController;

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
 
        $data = UserController::emailTemplate($name,$email,$password); 
        
 
        // To send HTML mail, the Content-type header must be set
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        // Additional headers
        $headers .= 'From: CommonFloor Unit Selector <noreply@commonfloor.com>' . "\r\n";
        $headers .= 'Reply-To: noreply@commonfloor.com' . "\r\n";
 

         mail($email,"Welcome to CommonFloor Unit Selector!",$data, $headers);
         
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
