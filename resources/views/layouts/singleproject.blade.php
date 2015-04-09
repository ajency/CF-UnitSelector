@extends('layouts.master')

@section('innermenu')

<!-- BEGIN INNER MENU -->
<div class="inner-menu nav-collapse">   
    <div id="inner-menu">
        <div class="inner-wrapper" >    
            <h2 class="text-white b-g b-b p-b-20">{{ $project['project_title'] }}</h2>
        </div>
        <div class="inner-menu-content">
            <p class="menu-title">Project <span class="pull-right"><i class="icon-refresh"></i></span></p>
        </div>
        <ul class="big-items">
            <li class="{{ $current === 'svg' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/svg' ) }}" > SVGs</a>
            </li>
            <li class="{{ $current === 'settings' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/edit') }}">Settings</a>
            </li>
            <li class="{{ $current === 'room_type' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/roomtype/create/') }}">Attributes</a>
            </li>
        </ul> 
        @foreach(project_property_types($project['id']) as $propertyTypeId => $projectPropertyType)
            <div class="inner-menu-content" >            
                <p class="menu-title">{{ $projectPropertyType->name }}</p>    
            </div>
            <ul class="big-items">
                <li>
                    <a href="{{ url('/admin/project/' . $project['id'] . '/' . property_type_slug($projectPropertyType->name) . '-variant/create') }}">View Variants</a>
                </li>
                <li>
                    <a href="{{ url('/admin/project/' . $project['id'] . '/' . property_type_slug($projectPropertyType->name) . '-variant/create') }}">View Units</a>
                </li>
            </ul>
        @endforeach
    </div> 
</div>
<!-- END INNER MENU -->
<script>
    var PROJECTID = {{ $project['id'] }};
</script>
@endsection