@extends('layouts.singleproject')

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