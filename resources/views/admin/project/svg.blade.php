@extends('layouts.singleproject')

@section('content')
<div class="page-title">	
    <h2>Project <span class="semi-bold">SVGs</span></h2>
</div>
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
@include('admin.project.svg.googleearth')
@include('admin.project.svg.skyview')
@include('admin.project.svg.projectmaster')
</div>
@endsection