@extends('layouts.master')

@section('innermenu')

<!-- BEGIN INNER MENU -->
<div class="inner-menu nav-collapse">   
    <div id="inner-menu">
        <div class="inner-wrapper" >    
            <h2 class="text-white b-g b-b p-b-10">{{ $project['project_title'] }}</h2>
        </div>
        <div class="inner-menu-content">
         <a href="{{ url( 'admin/project/' . $project['id'] . '/summary' ) }}" >   <p class="menu-title">Project <span class="pull-right"><i class="icon-refresh"></i></span></p></a>
        </div>
        <ul class="big-items">
            <li class="{{ $current === 'settings' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id']) }}">@if($current === 'settings')@endif Configuration</a>
            </li>
            @if(hasPermission($project['id'],['configure_project']))
            <li class="{{ $current === 'cost' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/cost') }}">@if($current === 'cost')@endif Cost</a>
            </li>
            @endif
            @if(hasPermission($project['id'],['svg_auth_tool']))
            <li class="{{ $current === 'svg' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/svg' ) }}" >@if($current === 'svg')@endif SVGs</a>
            </li>
            @endif
            @if(hasPermission($project['id'],['configure_project']))
            <li class="{{ $current === 'filters' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/filters') }}">@if($current === 'filters')@endif Filters</a>
            </li>
            @endif
                  
        </ul> 
 
        @foreach(project_property_types($project['id']) as $propertyTypeId => $projectPropertyType)
        <?php
           if($projectPropertyType === 'Apartments' ||  $projectPropertyType === 'Penthouses')
           {
               $apartmentPenthouse[] =  $projectPropertyType;
               continue;
           } 
        ?>
        <div class="inner-menu-content" >            
            <p class="menu-title">{{ $projectPropertyType }}</p>    
        </div>
        <ul class="big-items">
            @if(hasPermission($project['id'],['configure_project']))
            <li class="{{ $current === property_type_slug($projectPropertyType) . '-variant' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/' . property_type_slug($projectPropertyType) . '-variant/') }}">@if($current === property_type_slug($projectPropertyType) . '-variant')@endif Configuration</a>
            </li>
            @endif
            @if(hasPermission($project['id'],['configure_unit','unit_status_update']))
            <li class="{{ $current === property_type_slug($projectPropertyType) . '-unit' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/' . property_type_slug($projectPropertyType) . '-unit/') }}">@if($current === property_type_slug($projectPropertyType) . '-unit')@endif Units</a>
            </li>
            @endif

        </ul>
        @endforeach
       
       
        @if(isset($apartmentPenthouse) && hasPermission($project['id'],['configure_project','configure_building','configure_unit','unit_status_update','svg_auth_tool']))
        <?php
        $apartmentpenthouse= implode("/",$apartmentPenthouse);
        ?>
        <div class="inner-menu-content" >            
            <p class="menu-title">{{ $apartmentpenthouse }}</p>    
        </div>
        <ul class="big-items">
            @if(hasPermission($project['id'],['configure_building','svg_auth_tool']))
            <li class="{{ $current === 'building' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/building') }}">@if($current === 'building')@endif Buildings</a>
            </li>
            @endif
            @if(hasPermission($project['id'],['configure_project']))
            <li class="{{ $current === 'apartment-variant' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/apartment-variant/') }}">@if($current === 'apartment-variant')@endif Configuration</a>
            </li>
            @endif
             @if(hasPermission($project['id'],['configure_unit','unit_status_update']))
            <li class="{{ $current === 'apartment-unit' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/apartment-unit/') }}">@if($current === 'apartment-unit')@endif Units</a>
            </li>
             @endif

        </ul>
        @endif
    </div> 
</div>
<!-- END INNER MENU -->
<script>
    var PROJECTID = {{ $project['id'] }};
</script>
@endsection