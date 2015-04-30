@extends('layouts.singleproject')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#" class="active">Project Settings</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
    <div class="page-title">	
        <h2><span class="semi-bold">Project</span> Settings</h2>
    </div>
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    @include('admin.project.includes.details')
    @include('admin.project.includes.phases')
    @include('admin.project.includes.costs')
    </div>
@endsection