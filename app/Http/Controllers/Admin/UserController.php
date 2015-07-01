<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use CommonFloor\User;
use CommonFloor\Role;
use \Mail;
use CommonFloor\UserRole;
use CommonFloor\UserProject;
use CommonFloor\Project;
use \Session;
use CommonFloor\AgentUnit;

class UserController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */

    public function index() {
        $users = User::where('is_agent','no')->orderBy('name')->get()->toArray();
        return view('admin.user.list')
                        ->with('users', $users)
                        ->with('menuFlag', FALSE);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        
        $roles = Role::all()->toArray();
        return view('admin.user.add')->with('roles', $roles)
                                    ->with('menuFlag', FALSE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request) {

        $name = $request->input('name');
        $email = $request->input('email');
        $phone_number = $request->input('phone_number');
        $user_status = $request->input('user_status');
        $user_role = $request->input('user_role');
        
        $password = self::random_password();

        $user = new User();
        $user->name = ucfirst($name);
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->phone = $phone_number;
        $user->status = $user_status;
        $user->save();
        $userId = $user->id;
        
        $userRole = new UserRole();
        $userRole->user_id = $userId;
        $userRole->role_id = $user_role;
        $userRole->save();
        $userRoleId = $userRole->id;
        
        /*$userProject = new UserProject();                 // DEFAULT ROLE 
        $userProject->role_user_id = $userRoleId;
        $userProject->project_id = 0;
        $userProject->save();*/
        
        $data =[];
        $data['name'] = $name;
        $data['email'] = $email;
        $data['password'] = $password;
 
        Mail::send('admin.user.registermail', ['user'=>$data], function($message)use($data)
        {  
            $message->to($data['email'], $data['name'])->subject('Welcome to CommonFloor Unit Selector!');
        });
        
    
        Session::flash('success_message','User created successfully. An email has been sent to the user email address with the login instruction');
        
        $addanother = $request->input('addanother');

        if ($addanother == 1)
            return redirect("/admin/user/create");
       else
            return redirect("/admin/user/" . $userId . "/edit");
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
        
        return view('admin.user.edit')
                        ->with('roles', $roles)
                        ->with('user', $user)
                        ->with('userProjects', $userProjects)
                        ->with('flag', FALSE)
                        ->with('menuFlag', FALSE);
    }
    
    public function profile($id) { 
        
        $user = User::find($id)->toArray();
        $roles = Role::all()->toArray(); 
        $defaultRole = getDefaultRole($id);
        $userProjects = getUserAssignedProject($id);
        
        if($defaultRole['PROJECT_ACCESS']=='specific')
        {
            foreach($userProjects as $key=> $userProject)
            { 
                $userProjects[$key]['project_name']= Project :: find($userProject['project_id'])->project_title;

            }
        }
        
        $user['default_role_id'] = $defaultRole['role_id'];
        $user['project_access'] = $defaultRole['PROJECT_ACCESS'];
        
        return view('admin.user.edit')
                        ->with('roles', $roles)
                        ->with('user', $user)
                        ->with('userProjects', $userProjects)
                        ->with('flag', TRUE)
                        ->with('menuFlag', FALSE);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request) {

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
        
        $defaultRoleId = getDefaultRole($id);  
        $userRole = UserRole::find($defaultRoleId['id']);
        $userRole->role_id = $user_role;
        $userRole->update(); 
        
  
        Session::flash('success_message','User Successfully Updated');    
        $addanother = $request->input('addanother');

        if ($addanother == 1)
            return redirect("/admin/user/create");
        else
            return redirect("/admin/user/" . $id . "/edit");
        //
    }
    
    public function profileUpdate($id, Request $request) {

        $name = $request->input('name');
        $phone_number = $request->input('phone_number');
 
  
        $user = User::find($id);
        $user->name = ucfirst($name);
        $user->phone = $phone_number;
 
        $user->save();
         
        Session::flash('success_message','User Successfully Updated');    
        $addanother = $request->input('addanother');

         
       return redirect("/admin/user/" . $id . "/profile");
 
        //
    }
    
    public static function random_password() {
    $chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    $password = substr( str_shuffle( $chars ), 0, 6 );
    return $password;
    }

    public function changePassword($userId, Request $request) {
        $newpassword = $request->input('newpassword');
        $is_profile = $request->input('is_profile');

        $user = User::find($userId);
        $user->password = Hash::make($newpassword);
        $user->save();
        
         Session::flash('success_message','Password Successfully Updated');
        
        if ($is_profile == 1)
            return redirect("/admin/user/" . $userId . "/profile");
        else
             return redirect("/admin/user/" . $userId . "/edit");
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

    public function validateCurrentPassword(Request $request) {
        $password = $request->input('password');
        $userId = $request->input('user_id');
        $msg = '';
        $flag = true;

         
        $userpassword = User::find($userId)->password;

        if (!Hash::check($password, $userpassword))
        {
            $msg = 'Invalid Current Password';
            $flag = false;
        }
               
        return response()->json([
                    'code' => 'user_password_validation',
                    'message' => $msg,
                    'data' => $flag,
                        ], 200);
    }
    
    public function validateEmail(Request $request) {
        $email = $request->input('email');
        $userId = $request->input('user_id');
        $msg ='';
        $flag =true;
 
        if($userId)
           $userData = User::where('email',$email)->where('id', '!=', $userId)->get()->toArray(); 
        else
            $userData = User::where('email',$email)->get()->toArray();

 
        if(!empty($userData))
        {
            $msg = 'User Email Already Taken';
            $flag =false;
        }
        
         
        return response()->json([
                    'code' => 'user_email_validation',
                    'message' => $msg,
                    'data' =>  $flag,
                        ], 200);
    }
    
    public function validatePhone(Request $request) {
        $phone = $request->input('phone');
        $userId = $request->input('user_id');
        $msg ='';
        $flag =true;
 
        if($userId)
           $userData = User::where('phone',$phone)->where('id', '!=', $userId)->get()->toArray(); 
        else
            $userData = User::where('phone',$phone)->get()->toArray();

 
        if(!empty($userData))
        {
            $msg = 'User Phone Already Taken';
            $flag =false;
        }
        
         
        return response()->json([
                    'code' => 'user_phone_validation',
                    'message' => $msg,
                    'data' =>  $flag,
                        ], 200);
    }
    
    public function userprojects($id,Request $request) {
        $projectid = $request->input('project_id');
        $userRoleId = User::find($id)->userRole()->first()->id; 
        
        $userProject = new UserProject();
        $userProject->role_user_id = $userRoleId;
        $userProject->project_id = $projectid;
        $userProject->save();
         
        return response()->json([
                    'code' => 'user_project',
                    'message' => 'Project Successfully Assigned',
                    'data' => $userRoleId
                        ], 201);
    }
    
    public function deleteUserproject($id,Request $request) {
        $projectid = $request->input('project_id');
        $userRoleId = User::find($id)->userRole()->first()->id; 
        
        $userProject = UserProject:: where('role_user_id',$userRoleId)->where('project_id',$projectid)->delete(); 
        
        //Agents units to be deleted
        $userunits = AgentUnit :: where('user_id',$id)->where('project_id',$projectid)->delete(); 
  
        return response()->json([
                    'code' => 'user_project',
                    'message' => 'User Project Successfully Deleted'
                        ], 204);
    }
    

}
