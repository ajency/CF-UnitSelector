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
                <a href="{{ url( 'admin/project/' . $project['id']) }}">@if($current === 'settings')<span class='fa fa-check text-success'></span>@endif Configuration</a>
            </li>
            <li class="{{ $current === 'cost' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/cost') }}">@if($current === 'cost')<span class='fa fa-check text-success'></span>@endif Cost</a>
            </li>
            <li class="{{ $current === 'svg' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/svg' ) }}" >@if($current === 'svg')<span class='fa fa-check text-success'></span>@endif SVGs</a>
            </li>
            <li class="{{ $current === 'project_users' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/user' ) }}" >@if($current === 'project_users')<span class='fa fa-check text-success'></span>@endif Users</a>
            </li>
            <li class="{{ $current === 'mastersvgtool' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/master/authoring-tool/') }}">@if($current === 'mastersvgtool')<span class='fa fa-check text-success'></span>@endif SVG Authoring Tool</a>
            </li>
        </ul> 
        @foreach(project_property_types($project['id']) as $propertyTypeId => $projectPropertyType)
        <?php
           if($projectPropertyType === 'Apartments' ||  $projectPropertyType === 'Penthouse')
           {
               $apartmentPenthouse[] =  $projectPropertyType;
               continue;
           } 
        ?>
        <div class="inner-menu-content" >            
            <p class="menu-title">{{ $projectPropertyType }}</p>    
        </div>
        <ul class="big-items">
            <li class="{{ $current === property_type_slug($projectPropertyType) . '-variant' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/' . property_type_slug($projectPropertyType) . '-variant/') }}">@if($current === property_type_slug($projectPropertyType) . '-variant')<span class='fa fa-check text-success'></span>@endif Configuration</a>
            </li>
            <li class="{{ $current === property_type_slug($projectPropertyType) . '-unit' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/' . property_type_slug($projectPropertyType) . '-unit/') }}">@if($current === property_type_slug($projectPropertyType) . '-unit')<span class='fa fa-check text-success'></span>@endif Units</a>
            </li>

        </ul>
        @endforeach
       
        @if(isset($apartmentPenthouse))
        <?php
        $apartmentpenthouse= implode("/",$apartmentPenthouse);
        ?>
        <div class="inner-menu-content" >            
            <p class="menu-title">{{ $apartmentpenthouse }}</p>    
        </div>
        <ul class="big-items">
            <li class="{{ $current === 'floor-layout' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/floor-layout') }}">@if($current === 'floor-layout')<span class='fa fa-check text-success'></span>@endif Floor Layouts</a>
            </li>
            <li class="{{ $current === 'building' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/building') }}">@if($current === 'building')<span class='fa fa-check text-success'></span>@endif Buildings</a>
            </li>
            <li class="{{ $current === 'apartment-variant' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/apartment-variant/') }}">@if($current === 'apartment-variant')<span class='fa fa-check text-success'></span>@endif Configuration</a>
            </li>
            <li class="{{ $current === 'apartment-unit' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/apartment-unit/') }}">@if($current === 'apartment-unit')<span class='fa fa-check text-success'></span>@endif Units</a>
            </li>

        </ul>
        @endif
    </div> 
</div>
<!-- END INNER MENU -->
<script>
    var PROJECTID = {{ $project['id'] }};
</script>
@endsection