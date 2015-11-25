@extends('layouts.mail')

@section('content')
<!-- BEGIN PAGE TITLE -->
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


                                                       Dear {{ $user['name']}},
                                                        <br/>
                                                        <h3>Welcome to CommonFloor Unit Selector!</h3>

                                                            Your Account on CommonFloor Unit Selector has been created with the following credentials -
                                                         <br>
                                                            <br>
                                                            <span>Email:</span> {{ $user['email']}}<br>
                                                            <span>Your account has been set with a randomly generated password :</span> 
                                                            <br>
                                                            <br>

                                                            To go back to the Login page, <a href="{{  url() }}">click here</a>

                                                             or copy paste the link below in your browser to login to your account:<br>
                                                            <a href="{{  url() }}">{{  url() }}</a>

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
@endsection