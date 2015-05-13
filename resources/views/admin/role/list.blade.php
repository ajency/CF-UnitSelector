@extends('layouts.master')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="#" class="active">Role</a> </li>
 </ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Role</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Role</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/role/create') }}" ><i class="fa fa-plus"></i> Add User</a>
            </div>
            <div class="grid-body">
                <table class="table table-striped roleList" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($roles as $role)
                            <tr class="">
                                <td><a href="{{ url( '/admin/role/' . $role['id'] . '/edit') }}">{{ $role['name'] }}</a></td>
                                <td>{{ date('d/m/Y',strtotime($role['created_at'])) }}</td>
                                <td>{{  date('d/m/Y',strtotime($role['updated_at'])) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

@endsection