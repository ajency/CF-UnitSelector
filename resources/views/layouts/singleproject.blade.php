@extends('layouts.master')

@section('innermenu')

    <!-- BEGIN INNER MENU -->
    <div class="inner-menu nav-collapse">   
        <div id="inner-menu">
            <div class="inner-wrapper" >    
                <h2 class="text-white b-g b-b p-b-20">{{ $project_title }}</h2>
            </div>
            <div class="inner-menu-content">
                <p class="menu-title">Project <span class="pull-right"><i class="icon-refresh"></i></span></p>
            </div>
            <ul class="big-items">
                <li>
                    <span class="fa fa-check text-success"></span><a href="project-svg.html" > SVGs</a>
                </li>
                <li class="active">
                    <a href="project-settings.html">Settings</a>
                </li>
            </ul>

            <div class="inner-menu-content" >            
                <p class="menu-title">Building</p>    
            </div>
            <ul class="big-items">
                <li>
                    <a href="building-properties.html">Properties</a>
                </li>
                <li>
                    <a href="building-svg.html">SVGs</a>
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

@endsection