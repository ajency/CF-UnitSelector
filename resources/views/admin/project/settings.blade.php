@extends('layouts.singleproject')

@section('content')
    <div class="page-title">	
        <h2><span class="semi-bold">Project</span> Settings</h2>
    </div>
    @include('admin.project.includes.details')
    <form action="/admin/project/{{ $project['id'] }}" method="POST" data-parsley-validate>
    @include('admin.project.includes.phases')
    @include('admin.project.includes.costs')
    </form>
@endsection