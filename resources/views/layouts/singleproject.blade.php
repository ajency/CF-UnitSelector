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
                <a href="{{ url( 'admin/project/' . $project['id'] . '/roomtype/create/') }}">Room Type</a>
            </li>
        </ul> 
        
        <div class="inner-menu-content" >            
            <p class="menu-title">Unit</p>    
        </div>
        <ul class="big-items">
            <li>
                <a href="unit-properties.html">Properties</a>
            </li>
            <li>
                <a href="unit-list.html">List</a>
            </li>
        </ul>
    </div> 
</div>
<!-- END INNER MENU -->
<script>
    var PROJECTID = {{ $project['id'] }};
</script>
@endsection