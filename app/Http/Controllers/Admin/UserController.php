<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use CommonFloor\User;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $users = User::orderBy('name')->get()->toArray();
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

        return view('admin.user.add')->with('menuFlag', FALSE);
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
        $password = rand();

        $user = new User();
        $user->name = ucfirst($name);
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->phone = $phone_number;
        $user->status = $user_status;
        $user->save();
        $userId = $user->id;

        $data = 'Dear ' . $name;
        $data .='Welcome to CommonFloor Unit Selector!';
        $data .='Your Account on CommonFloor Unit Selector has been created with the following credentials -';
        $data .='Login Email address : ';
        $data .='Your account has been set with a randomly generated password :'.$password;
        $data .= '<a href="' . url() . '"><button class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button></a>';
        $data .='or copy paste the link below in your browser to login to your account';
        $data .= url();
        $data .='You can update the password to one of your choice from the profile page.';
        $data .='Thanks,';
        $data .='Team CommonFloor Unit Selector';

         mail($email,"Welcome to CommonFloor Unit Selector!",$data);

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
        $user = User::find($id);

        return view('admin.user.edit')
                        ->with('user', $user->toArray())
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

        $user = User::find($id);
        $user->name = ucfirst($name);
        $user->email = $email;
        $user->phone = $phone_number;
        $user->status = $user_status;
        $user->save();


        $addanother = $request->input('addanother');

        if ($addanother == 1)
            return redirect("/admin/user/create");
        else
            return redirect("/admin/user/" . $id . "/edit");
        //
    }

    public function changePassword($userId, Request $request) {
        $newpassword = $request->input('newpassword');

        $user = User::find($userId);
        $user->password = Hash::make($newpassword);
        $user->save();

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

}
