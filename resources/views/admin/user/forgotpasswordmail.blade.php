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


                                                       Hi {{ $user['name']}},
                                                        <br/>
                                                        <h3>Forgot Password!</h3>

                                                            You had placed a request that you forgot your password.
                                                           <br>
                                                            <br>
                                                            We have generated a new password for you . Please use this password to login to your account.
                                                             <br>
                                                            <span>New password  :</span> <span class="bold">{{ $user['password']}}</h6></span>
                                                            <br>
                                                            <br/>

                                                            You can update the password to the one of your choice by updating on the profile page. 
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