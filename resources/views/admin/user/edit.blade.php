@extends('layouts.master')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/user">User</a> </li>
    <li><a href="{{ url( 'admin/user/' . $user['id'].'/edit') }}">{{ $user['name'] }}</a> </li>
    <li><a href="#" class="active">Edit User</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Edit</span> User</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
             @include('admin.project.flashmessage')
             <div class="grid-title no-border">
                        <h3> <i class="fa fa-angle-double-right text-primary"></i> User <span class="semi-bold">Details</span></h3>
                        </div>
            <div class="grid-body no-border"> 
               
                <form id="add_project" method="POST" action="{{ ($flag)?'/admin/user/'.$user['id'].'/profileupdate':'/admin/user/'.$user['id'] }}" data-parsley-validate>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Name<span class="text-primary">*</span></label>
                                <input type="text" name="name" class="form-control m-b-5" placeholder="Enter User Name" value="{{ $user['name'] }}" data-parsley-required>
                                </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Email<span class="text-primary">*</span></label>
                                <input type="email" name="email" class="form-control m-b-5" onchange="validateEmail(this,{{ $user['id'] }})" placeholder="Enter Email ID" data-parsley-type="email" value="{{ $user['email'] }}" data-parsley-required readonly><div class="cf-loader hidden"></div>
                                                     </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Phone Number<span class="text-primary">*</span></label>
                                <input type="text" name="phone_number" class="form-control m-b-5" placeholder="Enter Phone Number" value="{{ $user['phone'] }}" data-parsley-required onchange="validatePhone(this,{{ $user['id'] }})"><span class="cf-loader hidden"></span>
                                         </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Role<span class="text-primary">*</span></label>
                                <select name="user_role" class="select2 form-control m-b-5" data-parsley-required {{ ($flag)?'disabled':'' }}>
                                    <option value="">Select Role</option>
                                    @foreach($roles as $role)
                                    <option @if($user['default_role_id']==$role['id']){{'selected'}}@endif value="{{$role['id']}}">{{$role['display_name']}}</option>
                                    @endforeach
                                </select>
                                               </div>
                        </div>
 
                         
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Status<span class="text-primary">*</span></label>
                                    <select name="user_status" class="select2 form-control m-b-5" data-parsley-required {{ ($flag)?'disabled':'' }}>
                                        <option value="">Select a Status</option>
                                        <option @if($user['status']=='active'){{'selected'}}@endif value="active">Active</option>
                                        <option @if($user['status']=='inactive'){{'selected'}}@endif value="inactive">Inactive</option>
                                    </select>
                                                                 </div>
                            </div>
                         
                    </div>      
                    <div class="form-actions "> 
                        <div class="pull-right">
                            <input type="hidden" id="addanother" name="addanother" value="">
                            <input type="hidden" name="_method" value="PUT">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                            @if(!$flag)
                            <button type="button" onclick="saveAndAddAnother();" class="btn btn-default btn-cons">Save And Add Another</button>
                           
                            <button type="reset" class="hidden" />
                            <a href="{{ url('admin/user') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                             @endif
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="grid simple">
     <div class="grid-title no-border">
                        <h3> <i class="fa fa-angle-double-right text-primary"></i> Change <span class="semi-bold">Password</span></h3>
                        </div>
    <div class="grid-body no-border">
        <form method="POST" id="change_password" action="/admin/user/{{ $user['id'] }}/changepassword" novalidate="novalidate" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Current Password<span class="text-primary">*</span></label>
                        <input type="password" name="currentpassword" class="form-control m-b-5" placeholder="Enter Password" data-parsley-required onchange="validateUserPassword(this,{{ $user['id'] }})"><div class="cf-loader hidden"></div>
                                        </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">New Password<span class="text-primary">*</span></label>
                        <input type="password" name="newpassword" id="newpassword" class="form-control m-b-5" placeholder="Re-enter Password" data-parsley-required>
                                         </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Confirm Password<span class="text-primary">*</span></label>
                        <input type="password" name="confirmpassword" data-parsley-required data-parsley-equalto="#newpassword" class="form-control m-b-5" placeholder="Re-enter Password">
                                          </div>
                </div>
            </div>
            <div class="form-actions">  
                <div class="pull-right">
                    <input type="hidden" id="is_profile" name="is_profile" value="{{ ($flag)?'1':'0' }}">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons">Confirm Password</button>
 
                </div>
            </div>
        </form>
    </div>
</div>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection