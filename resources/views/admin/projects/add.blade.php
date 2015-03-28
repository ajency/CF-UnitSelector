@extends('layouts.master')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li>
        <p>YOU ARE HERE</p>
    </li>
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/projects">Projects</a> </li>
    <li><a href="#" class="active">Add Project</a> </li>
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

            <div class="grid-body no-border"> 
                <br>
                <form id="add_project" method="POST" action="/admin/projects" data-parsley-validate>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">City <span class="text-primary">*</span></label>
                                <select name="city" requiredd class="select2 form-control">
                                    <option value="">Choose City</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Delhi">Delhi</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">CF Project Name <span class="text-primary">*</span></label>
                                <span class="help">From CommonFloor database</span>
                                <select name="cf_project_id" required="" class="select2 form-control">
                                    <option value="">Choose Commonfloor Project</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Project Title<span class="text-primary">*</span></label>
                                <input required name="project_title" type="text" class="form-control" placeholder="Enter Project Title" value="">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Address<span class="text-primary">*</span></label>
                                <textarea required name="project_address" class="form-control" placeholder="Enter Project Address"></textarea>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Property types <span class="text-primary">*</span></label>
                                <select placeholder="Add sellable unit types" name="property_types[]" 
                                        required="" class="select2 form-control" multiple="multiple">
                                    <option value="1">Apartment</option>
                                    <option value="2">Bungalows/Villas</option>
                                    <option value="3">Land</option>
                                </select>
                                <br />
                                <div class="property-type">
                                    <label class="form-label">Unit types. Enter comma separated values. <span class="text-primary">*</span></label>
                                    <div class="property-type-1">
                                        <input name="property_type[apartment]" type="text" class="form-control" 
                                               placeholder="Enter apartment unit types" value="">
                                    </div>
                                    <div class="property-type-2">
                                        <input name="property_type[bungalows_villas]" type="text" 
                                               class="form-control" placeholder="Enter Bungalows/Villas unit types" value="">
                                    </div>
                                    <div class="property-type-3">
                                        <input name="property_type[land]" type="text" class="form-control" 
                                               placeholder="Enter land unit types" value="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 hidden" id="commonfloor-project-details">
                        </div>
                    </div>

                    <div class="form-actions">  
                        <div class="pull-right">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <button type="submit" class="btn btn-primary btn-cons">Save</button>
                            <button type="reset" class="hidden" />
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