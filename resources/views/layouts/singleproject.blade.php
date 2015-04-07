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
        @foreach($project['property_types'] as $property_type)

        @if ($property_type == '1')
           <?php  $page="appartment"; ?>
        @elseif ($property_type == '2')
          <?php  $page="bunglow"; ?>
        @elseif ($property_type == '3')
           <?php $page="land"; ?>
    
        @endif

        <div class="inner-menu-content" >            
            <p class="menu-title">{{ get_property_type($property_type) }}</p>    
        </div>
        <ul class="big-items">
            <li>
                <a href="#">View</a>
            </li>
            <li>
                <a href="{{ url( 'admin/project/' . $project['id'] . '/'.$page.'/create' ) }}">Add Variants</a>
            </li>
        </ul>
        @endforeach
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
    var PROJECTID = {
        {
            $project['id']
        }
    }
    ;
</script>
@endsection