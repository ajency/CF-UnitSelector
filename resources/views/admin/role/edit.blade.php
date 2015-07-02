@extends('layouts.master')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/user">Role</a> </li>
    <li><a href="{{ url( 'admin/role/' . $role['id'].'/edit') }}">{{ $role['name'] }}</a> </li>
    <li><a href="#" class="active">Edit Role</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Edit</span> Role</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-body no-border"> 
                <br>
                <form id="add_project" method="POST" action="{{ url('admin/role/'.$role['id']) }}" data-parsley-validate>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Role Name<span class="text-primary">*</span></label>
                                <input type="text" name="name" class="form-control m-b-5" placeholder="Enter Role Name" value="{{ $role['display_name'] }}" data-parsley-required>
                            </div>
                        </div>
                    </div>
                    <hr/>
                  <div class="m-l-5 no-border">
                <h3><i class="fa fa-angle-double-right text-primary"></i> Permissions</h3>
                      <input data-parsley-required data-parsley-required-message = "Need To Select Atleast 1 Permission" type="checkbox" id="permissions" name="permissions[]" class="text-success hidden" aria-label="..." >  
            </div>
                    <div class="row">
                        <div class="col-md-12">
                            @foreach($permissions as $permission)
                            <a class="list-group-item">
                                <div class="row">
                                    <div class="col-md-6">{{ $permission['display_name'] }}</div>
                                    <div class="col-md-6 text-right">
                                        <input {{ (in_array($permission['id'],$permissionrole)) ? 'checked' : '' }} type="checkbox" id="{{ $permission['name'] }}" name="permissions[]" class="text-success" value="{{ $permission['id'] }}" aria-label="..." >
                                    </div>
                                </div>
                            </a>
                            @endforeach
                        </div>

                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <a class="list-group-item">
                                <div class="pull-right">
                                        <div class="radio radio-primary">
                                        <input required type="radio" id="project_access_all" name="project_access" value="all" aria-label="..." checked >
                                        <label for="project_access_all" class="form-label">All &nbsp;</label> 
                                        <input required type="radio" id="project_access_specific" name="project_access" value="specific" aria-label="..." {{ ($role['project_access']=='specific') ? 'checked' : '' }} >
                                        <label for="project_access_specific" class="form-label">Specific &nbsp;</label> 

                                        </div>
                                    </div>
                                <label class="form-label">Project Access</label>
                                    
                            </a>
                            @foreach($projectPermissions as $projectPermission)
                            <a class="list-group-item">
                                <div class="row">
                                    <div class="col-md-6">{{ $projectPermission['display_name'] }}</div>
                                    <div class="col-md-6 text-right">
                                        <input {{ (in_array($projectPermission['id'],$permissionrole)) ? 'checked' : '' }} type="checkbox" id="{{ $permission['name'] }}" name="permissions[]" class="text-success" value="{{ $projectPermission['id'] }}" aria-label="..." >
                                    </div>
                                </div>
                            </a>
                            @endforeach
                        </div>

                    </div>

                    
                    <div class="form-actions "> 
                        <div class="pull-right">
                            <input type="hidden" id="addanother" name="addanother" value="">
                            <input type="hidden" name="_method" value="PUT">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                             
                            <button type="reset" class="hidden" />
                            <a href="{{ url('admin/role') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>

                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- END PLACE PAGE CONTENT HERE -->
@endsection