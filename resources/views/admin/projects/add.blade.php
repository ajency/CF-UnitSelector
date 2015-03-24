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
                <form id="add_project" method="POST" action="/admin/projects" data-parsley-validate>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="form-label">City</label>
                                <select name="city" required="" class="select2 form-control">
                                    <option value="">Choose City</option>
                                    <option>Mumbai</option>
                                    <option>Pune</option>
                                    <option>Delhi</option>
                                    <option>Kolkata</option>
                                    <option>Chennai</option>
                                    <option>Nagpur</option>
                                </select>
                            </div>        			                    
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="form-label">Sellable unit types</label>
                                <select placeholder="Add sellable unit types" name="sellable_unit_types[]" 
                                        required="" class="select2 form-control" multiple="multiple">
                                    <option value="1">Apartment</option>
                                    <option value="2">Bungalows/Villas</option>
                                    <option value="3">Land</option>
                                    <option value="4">Penthouse</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">List of Projects</label>
                                <span class="help">From CommonFloor database</span>
                                <select name="cf_project_id" required="" class="select2 form-control">
                                    <option value="">Choose Commonfloor Project</option>
                                </select>
                            </div>

                        </div>
                        <div class="col-md-6">
                            <div class="user-description-box hidden" id="commonfloor-project-details">

                            </div>
                        </div>
                    </div>
                    <div class="form-actions">  
                        <div class="pull-right">
                            <input type="hidden" value="{{ csrf_token() }}" name="_token"/>
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