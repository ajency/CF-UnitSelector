@extends('layouts.master')

@section('breadcrumb')
    <!-- BEGIN BREADCRUMBS -->
    <ul class="breadcrumb">
        <li>
            <p>YOU ARE HERE</p>
        </li>
        <li><a href="/admin">Dashboard</a> </li>
        <li><a href="/admin/projects">Projects</a> </li>
        <li><a href="#" class="active">Add</a> </li>
    </ul>
    <!-- END BREADCRUMBS -->
@endsection

@section('content')
    <!-- BEGIN PAGE TITLE -->
    <div class="page-title">	
        <h2><span class="semi-bold">Add</span> Project</h2>
    </div>
    <!-- END PAGE TITLE -->
    <!-- BEGIN PlACE PAGE CONTENT HERE -->
    <div class="row">
        <div class="col-md-12">
            <div class="grid simple">

                <div class="grid-body no-border"> <br>
                    <form id="add_project" action="#" novalidate="novalidate">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="form-label">City</label>
                                    <select id="city" class="select2 form-control">
                                        <option>City 1</option>
                                        <option>City 2</option>
                                        <option>City 3</option>
                                        <option>City 4</option>
                                        <option>City 5</option>
                                    </select>
                                </div>        			                    
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="form-label">Sellable unit types</label>
                                    <select id="unit_types" class="select2 form-control" multiple>
                                        <option>Apartments</option>
                                        <option>Bungalows/Villas</option>
                                        <option>Land</option>
                                        <option>Penthouse</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">List of Projects</label>
                                    <span class="help">From CommonFloor database</span>
                                    <input type="text" class="form-control">
                                </div>

                            </div>
                            <div class="col-md-6">
                                <div class="user-description-box">
                                    <h4 class="semi-bold no-margin">Goyal Footprints</h4>
                                    <br>
                                    <p><i class="fa fa-rupee"></i>Rs 41.98 Lakhs - 58.10 Lakhs</p>
                                    <p><i class="fa fa-arrows-alt"></i>763 - 1094 Sq. Ft.</p>
                                    <p><i class="fa fa-map-marker"></i>Near provident Harmony Apartments, Thanisandra Main Road</p>
                                    <p><i class="fa fa-clock-o"></i>Under Construction</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">  
                            <div class="pull-right">
                                <button type="submit" class="btn btn-primary btn-cons">Save</button>
                                <button type="button" class="btn btn-white btn-cons">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- END PLACE PAGE CONTENT HERE -->
@endsection