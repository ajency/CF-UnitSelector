@extends('layouts.master')

@section('innermenu')

<!-- BEGIN INNER MENU -->
<div class="inner-menu nav-collapse">   
    <div id="inner-menu">
        <div class="inner-wrapper" >    
            <h2 class="text-white b-g b-b p-b-20">{{ $project['project_title'] }}{{ $current  }}</h2>
        </div>
        <div class="inner-menu-content">
            <p class="menu-title">Project <span class="pull-right"><i class="icon-refresh"></i></span></p>
        </div>
        <ul class="big-items">
            <li class="{{ $current === 'svg' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/svg' ) }}" >@if($current === 'svg')<span class='fa fa-check text-success'></span>@endif SVGs</a>
            </li>
            <li class="{{ $current === 'settings' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/edit') }}">@if($current === 'settings')<span class='fa fa-check text-success'></span>@endif Settings</a>
            </li>
            <li class="{{ $current === 'room_type' ? 'active' : '' }}">
                <a href="{{ url( 'admin/project/' . $project['id'] . '/roomtype/create/') }}">@if($current === 'room_type')<span class='fa fa-check text-success'></span>@endif Attributes</a>
            </li>
        </ul> 
        @foreach(project_property_types($project['id']) as $propertyTypeId => $projectPropertyType)
        <?php
           if($projectPropertyType->name === 'Apartments' ||  $projectPropertyType->name === 'Penthouse')
           {
               $apartmentPenthouse[] =  $projectPropertyType->name;
               continue;
           } 
        ?>
        <div class="inner-menu-content" >            
            <p class="menu-title">{{ $projectPropertyType->name }}</p>    
        </div>
        <ul class="big-items">
            <li class="{{ $current === property_type_slug($projectPropertyType->name) . '-variant' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/' . property_type_slug($projectPropertyType->name) . '-variant/') }}">@if($current === property_type_slug($projectPropertyType->name) . '-variant')<span class='fa fa-check text-success'></span>@endif Variants</a>
            </li>
            <li class="{{ $current === property_type_slug($projectPropertyType->name) . '-unit' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/' . property_type_slug($projectPropertyType->name) . '-unit/') }}">@if($current === property_type_slug($projectPropertyType->name) . '-unit')<span class='fa fa-check text-success'></span>@endif Units</a>
            </li>

        </ul>
        @endforeach
       
        @if(isset($apartmentPenthouse))
        <div class="inner-menu-content" >            
            <p class="menu-title">{{ implode("/",$apartmentPenthouse) }}</p>    
        </div>
        <ul class="big-items">
            <li class="{{ $current === 'floor-layout' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/floor-layout') }}">@if($current === 'floor-layout')<span class='fa fa-check text-success'></span>@endif Floor Layouts</a>
            </li>
            <li class="{{ $current === 'building' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/building') }}">@if($current === 'building')<span class='fa fa-check text-success'></span>@endif Buildings</a>
            </li>
            <li class="{{ $current === 'apartment-variant' ? 'active' : '' }}">
                <a href="{{ url('/admin/project/' . $project['id'] . '/apartment-variant/') }}">@if($current === 'apartment-variant')<span class='fa fa-check text-success'></span>@endif Variants</a>
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