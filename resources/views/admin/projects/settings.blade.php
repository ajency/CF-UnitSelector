@extends('layouts.singleproject')

@section('content')
    <div class="page-title">	
        <h2><span class="semi-bold">Project</span> Settings</h2>
    </div>
    <form action="/admin/projects/{{ $id }}/update" method="POST">
    @include('admin.projects.includes.phases')
    @include('admin.projects.includes.costs')
    </form>
@endsection