@extends('layouts.singleproject')

@section('content')
    <div class="page-title">	
        <h2><span class="semi-bold">Project</span> Settings</h2>
    </div>
    @include('admin.project.includes.details')
    @include('admin.project.includes.phases')
    @include('admin.project.includes.costs')
    
@endsection