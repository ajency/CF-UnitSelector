@extends('layouts.master')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="#" class="active">Roles</a> </li>
 </ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Roles</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
             @include('admin.project.flashmessage')
            <div class="grid-title">
                <a class="btn btn-primary pull-right" href="{{ url('/admin/role/create') }}" ><i class="fa fa-plus"></i> Add Role</a>
                <h4>List of <span class="semi-bold">Roles</span></h4>
            </div>
            <div class="grid-body">
                <table class="table table-bordered roleList userList" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="date-sort">Created On</th>
                            <th class="date-sort">Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($roles as $role)
                            <tr class="" onclick="location.href='{{ url( '/admin/role/' . $role['id'] . '/edit') }}'">
                                <td>{{ $role['display_name'] }}</td>
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