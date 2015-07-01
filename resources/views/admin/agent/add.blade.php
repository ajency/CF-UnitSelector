@extends('layouts.master')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/user">Agent</a> </li>
    <li><a href="#" class="active">Add Agent</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Add</span> Agent</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-body no-border"> 
                <br>
                <form id="add_project" method="POST" action="{{ url('admin/agent') }}" data-parsley-validate>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Name<span class="text-primary">*</span></label>
                                <input type="text" name="name" class="form-control m-b-5" placeholder="Enter User Name" data-parsley-required>
                                                           </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Email<span class="text-primary">*</span></label>
                                <input type="email" name="email" onchange="validateEmail(this, 0)" class="form-control m-b-5" placeholder="Enter Email ID" data-parsley-type="email" data-parsley-required> <span class="cf-loader hidden"></span>
                                
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Phone Number<span class="text-primary">*</span></label>
                                <input type="text" name="phone_number" class="form-control m-b-5" placeholder="Enter Phone Number" data-parsley-required onchange="validatePhone(this, 0)" data-parsley-type="number"><span class="cf-loader hidden"></span>
                                
                            </div>
                        </div>
                        </div>
                         <div class="row">
 
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Status<span class="text-primary">*</span></label>
                                    <select id="user_status" name="user_status" class="select2 form-control m-b-5" data-parsley-required>
                                        <option value="">Select a Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    
                                </div>
                            </div>
                       </div>
                              

                    <div class="form-actions "> 
                        <div class="pull-right">
                            <input type="hidden" id="addanother" name="addanother" value="">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-plus-circle"></i> Create</button>
                            <button type="button" onclick="saveAndAddAnother();" class="btn btn-default btn-cons">Save And Create Another</button>
                            <button type="reset" class="hidden" />
                            <a href="{{ url('admin/user') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>

                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- END PLACE PAGE CONTENT HERE -->
@endsection