<?php

namespace CommonFloor\Http\Controllers\Auth;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Registrar;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Auth;

class AuthController extends Controller {
    /*
      |--------------------------------------------------------------------------
      | Registration & Login Controller
      |--------------------------------------------------------------------------
      |
      | This controller handles the registration of new users, as well as the
      | authentication of existing users. By default, this controller uses
      | a simple trait to add these behaviors. Why don't you explore it?
      |
     */

use AuthenticatesAndRegistersUsers;

    /**
     * Create a new authentication controller instance.
     *
     * @param  \Illuminate\Contracts\Auth\Guard  $auth
     * @param  \Illuminate\Contracts\Auth\Registrar  $registrar
     * @return void
     */
    public function __construct( Guard $auth, Registrar $registrar ) {
        $this->auth = $auth;
        $this->registrar = $registrar;

        $this->middleware( 'guest', ['except' => 'getLogout'] );
    }
    
    //CUSTOMIZED LOGIN METHOD
    /*
    *****Things added to file ***
    postLogin
    Illuminate\Http\Request
    Auth

    */
    public function postLogin(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        if (Auth::attempt(['email' => $email, 'password' => $password, 'status' => 'active']))
        {
            return redirect()->intended('admin/project');
        }
        
        return redirect('/auth/login')->withErrors([
            'email' => 'The credentials you entered did not match our records. Try again?',
        ]);
    }

    public function redirectPath() {
        if (property_exists( $this, 'redirectPath' )) {
            return $this->redirectPath;
        }

        return property_exists( $this, 'redirectTo' ) ? $this->redirectTo : url( 'admin' );
    }

}
