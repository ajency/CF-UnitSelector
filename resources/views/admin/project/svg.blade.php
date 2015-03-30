@extends('layouts.singleproject')

@section('content')
<div class="page-title">	
    <h2>Project <span class="semi-bold">SVGs</span></h2>
</div>

@include('admin.project.svg.googleearth')
@include('admin.project.svg.projectmaster')

@endsection