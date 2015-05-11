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
            <div class="grid-body no-border"> 
                <br>
                <form id="add_project" method="POST" action="/admin/user/{{ $user['id'] }}" data-parsley-validate>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Name</label>
                                <input type="text" name="name" class="form-control" placeholder="Enter User Name" value="{{ $user['name'] }}" data-parsley-required>
                                <div class="text-danger"><span class="fa fa-asterisk"></span> This field is required</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" name="email" class="form-control" placeholder="Enter Email ID" data-parsley-type="email" value="{{ $user['email'] }}" data-parsley-required>
                                <div class="text-danger"><span class="fa fa-asterisk"></span> This field is required</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Phone Number</label>
                                <input type="text" name="phone_number" class="form-control" placeholder="Enter Phone Number" value="{{ $user['phone'] }}" data-parsley-required>
                                <div class="text-danger"><span class="fa fa-asterisk"></span> This field is required</div>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="user_status" class="select2 form-control" data-parsley-required>
                                    <option value="">Select a Status</option>
                                    <option @if($user['status']=='active'){{'selected'}}@endif value="active">Active</option>
                                    <option @if($user['status']=='inactive'){{'selected'}}@endif value="inactive">Inactive</option>
                                </select>
                                <div class="text-danger"><span class="fa fa-asterisk"></span> This field is required</div>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions "> 
                        <div class="pull-right">
                            <input type="hidden" id="addanother" name="addanother" value="">
                            <input type="hidden" name="_method" value="PUT">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                            <button type="button" onclick="saveAndAddAnother();" class="btn btn-default btn-cons">Save And Add Another</button>
                            <button type="reset" class="hidden" />
                            <a href="{{ url('admin/user') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                            
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
 <div class="grid simple">
			              		<div class="grid-title">
			              			<h3>Change <span class="semi-bold">Password</span></h3>
			              		</div>
			                	<div class="grid-body "> <br>
									<form id="change_password" action="/admin/user/{{ $user['id'] }}/changepassword" novalidate="novalidate" data-parsley-validate>
									<div class="row">
					                    	<div class="col-md-4">
		                                        <div class="form-group">
		                                            <label class="form-label">Current Password</label>
                                                            <input type="password" name="currentpassword" class="form-control" placeholder="Enter Password" data-parsley-required onchange="validateUserPassword(this,{{ $user['id'] }})"><div class="cf-loader hidden"></div>
		                                        <div class="text-danger"><span class="fa fa-asterisk"></span> This field is required</div>
		                                        </div>
		                                    </div>
		                                     <div class="col-md-4">
		                                        <div class="form-group">
		                                            <label class="form-label">New Password</label>
                                                            <input type="password" name="newpassword" id="newpassword" class="form-control" placeholder="Re-enter Password" data-parsley-required>
		                                            <div class="text-danger"><span class="fa fa-asterisk"></span> This field is required</div>
		                                        </div>
		                                    </div>
					                          <div class="col-md-4">
		                                        <div class="form-group">
		                                            <label class="form-label">Confirm Password</label>
		                                            <input type="password" name="confirmpassword" data-parsley-required data-parsley-equalto="#newpassword" class="form-control" placeholder="Re-enter Password">
		                                            <div class="text-danger"><span class="fa fa-asterisk"></span> This field is required</div>
		                                        </div>
		                                    </div>
										</div>
					                   <div class="form-actions">  
											<div class="pull-right">
											  <button type="submit" class="btn btn-primary btn-cons">Confirm Password</button>
											  <button type="submit" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button>
											</div>
										</div>
									</form>
			                	</div>
			              	</div>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection