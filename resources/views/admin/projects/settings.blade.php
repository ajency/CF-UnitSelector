@extends('layouts.singleproject')

@section('content')
    <div class="page-title">	
        <h2><span class="semi-bold">Project</span> Settings</h2>
    </div>
    @include('admin.projects.includes.phases')
    @include('admin.projects.includes.costs')
@endsection