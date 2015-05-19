@extends('layouts.singleproject')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit' ) }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#" class="active">Project SVGs</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
<div class="page-title">
    <h2>Project<span class="semi-bold"> SVGs</span></h2>
</div>


@include('admin.project.svg.googleearth') 
@include('admin.project.svg.projectmaster')

@endsection