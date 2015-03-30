@extends('layouts.singleproject')

@section('content')
    <div class="page-title">	
        <h2><span class="semi-bold">Project</span> Settings</h2>
    </div>
    <form action="/admin/project/{{ $project['id'] }}/update" method="POST">
    @include('admin.project.includes.phases')
    @include('admin.project.includes.costs')
    </form>
@endsection