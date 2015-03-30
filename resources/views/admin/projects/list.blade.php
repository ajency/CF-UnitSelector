@extends('layouts.master')

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Projects</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Projects</span></h4>
            </div>
            <div class="grid-body">
                <table class="table table-striped" id="example2" >
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
                            <tr class="">
                                <td><a href="{{ "/admin/projects/" . $project['id'] . "/edit" }}">{{ $project['project_title'] }}</a></td>
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
@endsection