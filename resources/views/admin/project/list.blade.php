@extends('layouts.master')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="#" class="active">Projects</a> </li>
 </ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Projects</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            @include('admin.project.flashmessage')
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Projects</span></h4>
                
                @if(hasPermission(0,['add_project']))
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/create') }}" ><i class="fa fa-plus"></i> Add Project</a>
                @endif
            </div>
            <div class="grid-body">
                <table class="table table-bordered" id="example2" >
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>Created On</th>
                            <th>Created By</th>
                            <th>Modified On</th>
                            <th>Modified By</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($projects as $project)
                            <tr class="" onclick="location.href='{{ url( '/admin/project/' . $project['id'].'/summary') }}'">
                                <td>{{ $project['project_title'] }}</td>
                                <td>{{ $project['city'] }}</td>
                                <td>{{ ucfirst($project['status']) }}</td>
                                <td>{{ date('d/m/Y',strtotime($project['created_at'])) }}</td>
                                <td class="center">{{ $project['created_by'] }}</td>
                                <td>{{  date('d/m/Y',strtotime($project['updated_at'])) }}</td>
                                <td class="center">{{ $project['updated_by'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    // $('#example2.projectList').on('click', function () {
    //     columnDefs: [
    //        { type: 'date-dd-mm-yyyy', targets: 3 },
    //        { type: 'date-dd-mm-yyyy', targets: 5 }        
    //      ]
    // });
 
</script>
@endsection