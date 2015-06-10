<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use CommonFloor\User;
use CommonFloor\Role;
use Illuminate\Support\Facades\Mail;
use CommonFloor\UserRole;
use CommonFloor\UserProject;


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
        
        $password = $this->random_password();

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
        
        $userProject = new UserProject();
        $userProject->role_user_id = $userRoleId;
        $userProject->project_id = 0;
        $userProject->save();
        
        $data = $this->emailTemplate($name,$email,$password); 
        
 
        // To send HTML mail, the Content-type header must be set
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        // Additional headers
        $headers .= 'From: CommonFloor Unit Selector <noreply@commonfloor.com>' . "\r\n";
        $headers .= 'Reply-To: noreply@commonfloor.com' . "\r\n";
 

         mail($email,"Welcome to CommonFloor Unit Selector!",$data, $headers);
         

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
        $user['default_role_id'] = $defaultRole['role_id'];
        
        return view('admin.user.edit')
                        ->with('roles', $roles)
                        ->with('user', $user)
                        ->with('flag', FALSE)
                        ->with('menuFlag', FALSE);
    }
    
    public function profile($id) { 
        
        $user = User::find($id)->toArray();
        $roles = Role::all()->toArray(); 
        $defaultRole = getDefaultRole($id);
        $user['default_role_id'] = $defaultRole['role_id'];
        
        return view('admin.user.edit')
                        ->with('roles', $roles)
                        ->with('user', $user)
                        ->with('flag', TRUE);
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
        $is_profile = $request->input('is_profile');

        $user = User::find($id);
        $user->name = ucfirst($name);
        $user->phone = $phone_number;
        
        if(!$is_profile)
        {
            $user->email = $email;
            $user->status = $user_status;
        }
        $user->save();
        
        if(!$is_profile)
        {
            $defaultRoleId = getDefaultRole($id);  
            $userRole = UserRole::find($defaultRoleId['id']);
            $userRole->role_id = $user_role;
            $userRole->update(); 
        }
  
        $addanother = $request->input('addanother');

        if ($addanother == 1)
            return redirect("/admin/user/create");
        elseif ($is_profile == 1)
            return redirect("/admin/user/" . $id . "/profile");
        else
            return redirect("/admin/user/" . $id . "/edit");
        //
    }
    
    public function random_password() {
    $chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    $password = substr( str_shuffle( $chars ), 0, 6 );
    return $password;
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
    
    public function emailTemplate($name,$email,$password)
    {
        $html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Email</title>
                <style type="text/css">
                    /* /\/\/\/\/\/\/\/\/ CLIENT-SPECIFIC STYLES /\/\/\/\/\/\/\/\/ */
                    #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
                    .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
                    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */
                    body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
                    table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
                    img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

                    /* /\/\/\/\/\/\/\/\/ RESET STYLES /\/\/\/\/\/\/\/\/ */
                    body{margin:0; padding:0;}
                    img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
                    table{border-collapse:collapse !important;}
                    body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}

                    /* /\/\/\/\/\/\/\/\/ TEMPLATE STYLES /\/\/\/\/\/\/\/\/ */

                    /* ========== Page Styles ========== */

                    #bodyCell{padding:20px;}
                    #templateContainer{width:600px;}

                    /**
                    * @tab Page
                    * @section background style
                    * @tip Set the background color and top border for your email. You may want to choose colors that match your company\'s branding.
                    * @theme page
                    */
                    body, #bodyTable{
                        /*@editable*/ background-color:#DEE0E2;
                    }

                    /**
                    * @tab Page
                    * @section background style
                    * @tip Set the background color and top border for your email. You may want to choose colors that match your company\'s branding.
                    * @theme page
                    */
                    #bodyCell{
                        /*@editable*/ border-top:4px solid #BBBBBB;
                    }

                    /**
                    * @tab Page
                    * @section email border
                    * @tip Set the border for your email.
                    */
                    #templateContainer{
                        /*@editable*/ border:1px solid #BBBBBB;
                    }

                    /**
                    * @tab Page
                    * @section heading 1
                    * @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
                    * @style heading 1
                    */
                    h1{
                        /*@editable*/ color:#202020 !important;
                        display:block;
                        /*@editable*/font-family:Arial;
                        /*@editable*/ font-size:26px;
                        /*@editable*/ font-style:normal;
                        /*@editable*/ font-weight:bold;
                        /*@editable*/ line-height:100%;
                        /*@editable*/ letter-spacing:normal;
                        margin-top:0;
                        margin-right:0;
                        margin-bottom:10px;
                        margin-left:0;
                        /*@editable*/ text-align:left;
                    }

                    /**
                    * @tab Page
                    * @section heading 2
                    * @tip Set the styling for all second-level headings in your emails.
                    * @style heading 2
                    */
                    h2{
                        /*@editable*/ color:#404040 !important;
                        display:block;
                        /*@editable*/ font-family:Arial;
                        /*@editable*/ font-size:20px;
                        /*@editable*/ font-style:normal;
                        /*@editable*/ font-weight:bold;
                        /*@editable*/ line-height:100%;
                        /*@editable*/ letter-spacing:normal;
                        margin-top:0;
                        margin-right:0;
                        margin-bottom:10px;
                        margin-left:0;
                        /*@editable*/ text-align:left;
                    }

                    /**
                    * @tab Page
                    * @section heading 3
                    * @tip Set the styling for all third-level headings in your emails.
                    * @style heading 3
                    */
                    h3,{
                        /*@editable*/ color:#606060 !important;
                        display:block;
                        /*@editable*/ font-family:Arial;
                        /*@editable*/ font-size:16px;
                        /*@editable*/ 
                        /*@editable*/ font-weight:normal;
                        /*@editable*/ line-height:100%;
                        /*@editable*/ letter-spacing:normal;
                        margin-top:0;
                        margin-right:0;
                        margin-bottom:10px;
                        margin-left:0;
                        /*@editable*/ text-align:left;
                    }
                    .bold{
                        color: #f68121 !important;
                        font-family:Arial;
                        font-size: 15px;
                        margin-bottom: 10px;
                    }
                    /**
                    * @tab Page
                    * @section heading 4
                    * @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
                    * @style heading 4
                    */
                    h4{
                        /*@editable*/ color:#808080 !important;
                        display:block;
                        /*@editable*/ font-family:Arial;
                        /*@editable*/ font-size:14px;
                        /*@editable*/ 
                        /*@editable*/ font-weight:normal;
                        /*@editable*/ line-height:100%;
                        /*@editable*/ letter-spacing:normal;
                        margin-top:0;
                        margin-right:0;
                        margin-bottom:10px;
                        margin-left:0;
                        /*@editable*/ text-align:left;
                    }

                    /* ========== Header Styles ========== */

                    /**
                    * @tab Header
                    * @section preheader style
                    * @tip Set the background color and bottom border for your email\'s preheader area.
                    * @theme header
                    */
                    #templatePreheader{
                        /*@editable*/ background-color:#F4F4F4;
                        /*@editable*/ border-bottom:1px solid #CCCCCC;
                    }

                    /**
                    * @tab Header
                    * @section preheader text
                    * @tip Set the styling for your email\'s preheader text. Choose a size and color that is easy to read.
                    */
                    .preheaderContent{
                        /*@editable*/ color:#808080;
                        /*@editable*/ font-family:Arial;
                        /*@editable*/ font-size:10px;
                        /*@editable*/ line-height:125%;
                        /*@editable*/ text-align:left;
                    }

                    /**
                    * @tab Header
                    * @section preheader link
                    * @tip Set the styling for your email\'s preheader links. Choose a color that helps them stand out from your text.
                    */
                    .preheaderContent a:link, .preheaderContent a:visited, /* Yahoo! Mail Override */ .preheaderContent a .yshortcuts /* Yahoo! Mail Override */{
                        /*@editable*/ color:#606060;
                        /*@editable*/ font-weight:normal;
                        /*@editable*/ text-decoration:underline;
                    }

                    /**
                    * @tab Header
                    * @section header style
                    * @tip Set the background color and borders for your email\'s header area.
                    * @theme header
                    */
                    #templateHeader{
                        /*@editable*/ background-color:#F4F4F4;
                        /*@editable*/ border-top:1px solid #FFFFFF;
                        /*@editable*/ border-bottom:1px solid #CCCCCC;
                    }

                    /**
                    * @tab Header
                    * @section header text
                    * @tip Set the styling for your email\'s header text. Choose a size and color that is easy to read.
                    */
                    .headerContent{
                        /*@editable*/ color:#505050;
                        /*@editable*/ font-family:Arial;
                        /*@editable*/ font-size:20px;
                        /*@editable*/ font-weight:bold;
                        /*@editable*/ line-height:100%;
                        /*@editable*/ padding-top:10;
                        /*@editable*/ padding-right:10;
                        /*@editable*/ padding-bottom:10;
                        /*@editable*/ padding-left:10;
                        /*@editable*/ text-align:left;
                        /*@editable*/ vertical-align:middle;


                    }
                    a{
                        color:#9E9D9D !important;
                        font-size: 13px;
                    }
                    a:hover{
                        color:#f68121!important;
                    }
                    /**
                    * @tab Header
                    * @section header link
                    * @tip Set the styling for your email\'s header links. Choose a color that helps them stand out from your text.
                    */
                    .headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{
                        /*@editable*/ color:#EB4102;
                        /*@editable*/ font-weight:normal;
                        /*@editable*/ text-decoration:underline;
                    }

                    #headerImage{
                        height:auto;
                        max-width:600px;
                    }

                    /* ========== Body Styles ========== */

                    /**
                    * @tab Body
                    * @section body style
                    * @tip Set the background color and borders for your email\'s body area.
                    */
                    #templateBody{
                        /*@editable*/ background-color:#F4F4F4;
                        /*@editable*/ border-top:1px solid #FFFFFF;
                        /*@editable*/ border-bottom:1px solid #CCCCCC;
                    }

                    /**
                    * @tab Body
                    * @section body text
                    * @tip Set the styling for your email\'s main content text. Choose a size and color that is easy to read.
                    * @theme main
                    */
                    .bodyContent{
                        /*@editable*/ color:#505050;
                        /*@editable*/font-family:Arial;
                        /*@editable*/ font-size:14px;
                        /*@editable*/ line-height:150%;
                        padding-top:20px;
                        padding-right:20px;
                        padding-bottom:20px;
                        padding-left:20px;
                        /*@editable*/ text-align:left;
                    }

                    /**
                    * @tab Body
                    * @section body link
                    * @tip Set the styling for your email\'s main content links. Choose a color that helps them stand out from your text.
                    */
                    .bodyContent a:link, .bodyContent a:visited, /* Yahoo! Mail Override */ .bodyContent a .yshortcuts /* Yahoo! Mail Override */{
                        /*@editable*/ color:#EB4102;
                        /*@editable*/ font-weight:normal;
                        /*@editable*/ text-decoration:underline;
                    }

                    .bodyContent img{
                        display:inline;
                        height:auto;
                        max-width:560px;
                    }

                    /* ========== Footer Styles ========== */

                    /**
                    * @tab Footer
                    * @section footer style
                    * @tip Set the background color and borders for your email\'s footer area.
                    * @theme footer
                    */
                    #templateFooter{
                        /*@editable*/ background-color:#F4F4F4;
                        /*@editable*/ border-top:1px solid #FFFFFF;
                    }

                    /**
                    * @tab Footer
                    * @section footer text
                    * @tip Set the styling for your email\'s footer text. Choose a size and color that is easy to read.
                    * @theme footer
                    */
                    .footerContent{
                        /*@editable*/ color:#808080;
                        /*@editable*/ font-family:Arial;
                        /*@editable*/ font-size:10px;
                        /*@editable*/ line-height:150%;
                        padding-top:20px;
                        padding-right:20px;
                        padding-bottom:20px;
                        padding-left:20px;
                        /*@editable*/ text-align:left;
                    }

                    /**
                    * @tab Footer
                    * @section footer link
                    * @tip Set the styling for your email\'s footer links. Choose a color that helps them stand out from your text.
                    */
                    .footerContent a:link, .footerContent a:visited, /* Yahoo! Mail Override */ .footerContent a .yshortcuts, .footerContent a span /* Yahoo! Mail Override */{
                        /*@editable*/ color:#606060;
                        /*@editable*/ font-weight:normal;
                        /*@editable*/ text-decoration:underline;
                    }

                    /* /\/\/\/\/\/\/\/\/ MOBILE STYLES /\/\/\/\/\/\/\/\/ */

                    @media only screen and (max-width: 480px){
                        /* /\/\/\/\/\/\/ CLIENT-SPECIFIC MOBILE STYLES /\/\/\/\/\/\/ */
                        body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} /* Prevent Webkit platforms from changing default text sizes */
                        body{width:100% !important; min-width:100% !important;} /* Prevent iOS Mail from adding padding to the body */

                        /* /\/\/\/\/\/\/ MOBILE RESET STYLES /\/\/\/\/\/\/ */
                        #bodyCell{padding:10px !important;}

                        /* /\/\/\/\/\/\/ MOBILE TEMPLATE STYLES /\/\/\/\/\/\/ */

                        /* ======== Page Styles ======== */

                        /**
                        * @tab Mobile Styles
                        * @section template width
                        * @tip Make the template fluid for portrait or landscape view adaptability. If a fluid layout doesn\'t work for you, set the width to 300px instead.
                        */
                        #templateContainer{
                            max-width:600px !important;
                            /*@editable*/ width:100% !important;
                        }

                        /**
                        * @tab Mobile Styles
                        * @section heading 1
                        * @tip Make the first-level headings larger in size for better readability on small screens.
                        */
                        h1{
                            /*@editable*/ font-size:24px !important;
                            /*@editable*/ line-height:100% !important;
                        }

                        /**
                        * @tab Mobile Styles
                        * @section heading 2
                        * @tip Make the second-level headings larger in size for better readability on small screens.
                        */
                        h2{
                            /*@editable*/ font-size:20px !important;
                            /*@editable*/ line-height:100% !important;
                        }

                        /**
                        * @tab Mobile Styles
                        * @section heading 3
                        * @tip Make the third-level headings larger in size for better readability on small screens.
                        */
                        h3{
                            /*@editable*/ font-size:18px !important;
                            /*@editable*/ line-height:100% !important;
                        }

                        /**
                        * @tab Mobile Styles
                        * @section heading 4
                        * @tip Make the fourth-level headings larger in size for better readability on small screens.
                        */
                        h4{
                            /*@editable*/ font-size:16px !important;
                            /*@editable*/ line-height:100% !important;
                        }

                        /* ======== Header Styles ======== */

                        #templatePreheader{display:none !important;} /* Hide the template preheader to save space */

                        /**
                        * @tab Mobile Styles
                        * @section header image
                        * @tip Make the main header image fluid for portrait or landscape view adaptability, and set the image\'s original width as the max-width. If a fluid setting doesn\'t work, set the image width to half its original size instead.
                        */
                        #headerImage{
                            height:auto !important;
                            /*@editable*/ max-width:600px !important;
                            /*@editable*/ width:100% !important;
                        }

                        /**
                        * @tab Mobile Styles
                        * @section header text
                        * @tip Make the header content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                        */
                        .headerContent{
                            /*@editable*/ font-size:20px !important;
                            /*@editable*/ line-height:125% !important;
                        }

                        /* ======== Body Styles ======== */

                        /**
                        * @tab Mobile Styles
                        * @section body text
                        * @tip Make the body content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                        */
                        .bodyContent{
                            /*@editable*/ font-size:18px !important;
                            /*@editable*/ line-height:125% !important;
                        }

                        /* ======== Footer Styles ======== */

                        /**
                        * @tab Mobile Styles
                        * @section footer text
                        * @tip Make the body content text larger in size for better readability on small screens.
                        */
                        .footerContent{
                            /*@editable*/ font-size:14px !important;
                            /*@editable*/ line-height:115% !important;
                        }

                        .footerContent a{display:block !important;} /* Place footer social and utility links on their own lines, for easier access */




                    }
                </style>
            </head>
            <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" >
                <center>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" >
                        <tr >
                            <td align="center" valign="top" id="bodyCell">
                                <!-- BEGIN TEMPLATE // -->
                                <table border="0" cellpadding="0" cellspacing="0" id="templateContainer" style=" border-bottom: 5px solid #f68121!important;  border: 1px solid #BBBBBB;">
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- BEGIN PREHEADER // -->

                                            <!-- // END PREHEADER -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- BEGIN HEADER // -->
                                            <table border="0" cellpadding="10px" cellspacing="0" width="100%" id="templateHeader" style="  background-color: #F4F4F4; border-top: 1px solid #FFFFFF; border-bottom: 1px solid #CCCCCC;">
                                                <tr>
                                                    <td valign="top" class="headerContent">
                                                        <img src="http://phase1.cfunitselectortest.com/images/inner-header-logo.png"/>
                                                    </td>

                                                </tr>
                                            </table>
                                            <!-- // END HEADER -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- BEGIN BODY // -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
                                                <tr>
                                                    <td valign="top" class="bodyContent" mc:edit="body_content" style="color: #505050;font-family: Arial;font-size: 14px;line-height: 150%;padding-top: 20px;padding-right: 20px;padding-bottom: 20px;padding-left: 20px;text-align: left;">


                                                       Dear ' . $name. ',
                                                        <br/>
                                                        <h3>Welcome to CommonFloor Unit Selector!</h3>

                                                            Your Account on CommonFloor Unit Selector has been created with the following credentials -
                                                         <br>
                                                            <br>
                                                            <span>Email:</span> ' . $email. '<br>
                                                            <span>Your account has been set with a randomly generated password :</span> <span class="bold">' . $password. '</h6></span>
                                                            <br>
                                                            <br>

                                                            To go back to the Login page, <a href="' . url() . '">click here</a>

                                                             or copy paste the link below in your browser to login to your account:<br>
                                                            <a href="' . url() . '"> ' . url() . '</a>

                                                            <br/>

                                                            You can update the password to the one of your choice from the profile page.
                                                            <br/>
                                                            <br/>
                                                            If you need any further assitance, feel free to reach us at 1800 180 180 180 or email us at <a href="#">support@commonfloor.com</a> 
                                                        <br/>
                                                <br/>
                                                            Thanks,
                                                            <br/>
                                                            Team CommonFloor Unit Selector
                                                     </td>
                                                </tr>
                                            </table>
                                            <!-- // END BODY -->
                                        </td>
                                    </tr>

                                </table>
                                <!-- // END TEMPLATE -->
                            </td>
                        </tr>
                    </table>
                </center>
            </body>
        </html>';
 
        return $html;
        
    }

}
