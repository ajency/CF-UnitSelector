@extends('layouts.master')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/user">Role</a> </li>
    <li><a href="#" class="active">Add Role</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Add</span> Role</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-body no-border"> 
                <br>
                <form id="add_project" method="POST" action="{{ url('admin/role') }}" data-parsley-validate>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Role Name</label>
                                <input type="text" name="name" class="form-control" placeholder="Enter Role Name" data-parsley-required>
                                <div class="text-danger"><span class="fa fa-asterisk"></span>This field is required</div>	                                        
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <h3 class="m-b-20">Permissions</h3>
                    <div class="row">
                        <div class="col-md-6">
                            @foreach($permissions as $permission)
                            <a class="list-group-item">
                                <div class="row">
                                    <div class="col-md-6">{{ $permission['display_name'] }}</div>
                                    <div class="col-md-6 text-right">
                                        <input type="checkbox" id="permissions" name="permissions[]" class="text-success" value="{{ $permission['id'] }}" aria-label="..." >
                                    </div>
                                </div>
                            </a>
                            @endforeach
                        </div>

                    </div>

                    <div class="form-actions "> 
                        <div class="pull-right">
                            <input type="hidden" id="addanother" name="addanother" value="">
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

<!-- END PLACE PAGE CONTENT HERE -->
@endsection