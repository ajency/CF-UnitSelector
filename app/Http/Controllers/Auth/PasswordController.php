<?php

namespace CommonFloor\Http\Controllers\Auth;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\ResetsPasswords;
use CommonFloor\Http\Controllers\Admin\UserController;
use CommonFloor\User;
use \Session;
use \Mail;

class PasswordController extends Controller {
    /*
      |--------------------------------------------------------------------------
      | Password Reset Controller
      |--------------------------------------------------------------------------
      |
      | This controller is responsible for handling password reset requests
      | and uses a simple trait to include this behavior. You're free to
      | explore this trait and override any methods you wish to tweak.
      |
     */

    use ResetsPasswords;

    /**
     * Create a new password controller instance.
     *
     * @param  \Illuminate\Contracts\Auth\Guard  $auth
     * @param  \Illuminate\Contracts\Auth\PasswordBroker  $passwords
     * @return void
     */
    public function __construct( Guard $auth, PasswordBroker $passwords ) {
        $this->auth = $auth;
        $this->passwords = $passwords;

        $this->middleware( 'guest' );
    }
    
    public function postEmail(Request $request)
    {
        $email = $request->input('email');
        $userController = new UserController();
        $password = $userController->random_password();

        $is_user = User::where('email',$email)->first();  
        if(empty($is_user))
        {
           Session::flash('error_message','Email Not Registered');    
           return redirect("/password/email");
        }
        $name = $is_user['name'];
        $is_user->password = Hash::make($password);
        $is_user->save();
        
        $data =[];
        $data['name'] = $name;
        $data['email'] = $email;
        $data['password'] = $password;
 
        Mail::send('admin.user.forgotpasswordmail', ['user'=>$data], function($message)use($data)
        {  
            $message->to($data['email'], $data['name'])->subject('Forgot Password');
        });
                
        Session::flash('success_message','Password Sent.');    
        return redirect("/password/email");
        
    }
    

}
