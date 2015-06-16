@extends('layouts.master')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
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
<div class="grid simple">
    <div class="grid-title no-border">
                        <h3> <i class="fa fa-angle-double-right text-primary"></i> Project <span class="semi-bold">Details</span></h3>
                        </div>
    <div class="grid-body no-border">
        <div class="alert alert-info">
            <strong><i class="fa fa-info"></i></strong> The project enters the draft mode on save and will only be available on unit selector when 
                                       the project status is changed to Published.
        </div>
 
        <!-- END PAGE TITLE -->
        <!-- BEGIN PlACE PAGE CONTENT HERE -->
        <form id="add_project" method="POST" action="{{ url('admin/project') }}" data-parsley-validate>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">City<span class="text-primary">*</span></label><!-- //TODO fix the required validation  -->
                                        <select name="city" class="select2 form-control ff" data-parsley-required>

                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Area<span class="text-primary">*</span></label><!-- //TODO fix the required validation  -->
                                        <input type="text" name="select_area_list" id="autocompleteArea" placeholder="Locality Name" />
                                    </div>

                                
<!--                                     <div class="form-group">
                                        <input type="text" name="select_area_list" id="autocompleteArea" placeholder="Locality Name" class="form-control input-md" />  
                                        <div id="overlayImg"></div>
                                    </div>  -->                                   
                                    <div class="form-group">
                                        <label class="form-label">CF Project Name<span class="text-primary">*</span></label>
                                        <span class="help">From CommonFloor database</span>
                                        <select data-parsley-required name="cf_project_id" class="select2 form-control">
                                            <option value="">Choose Commonfloor Project</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" >Project Title<span class="text-primary">*</span></label> 
                                        <input  name="project_title" type="text" class="form-control m-b-5" placeholder="Enter Project Title" 
                                                data-parsley-required onchange="validateTitle(this);" > <div class="cf-loader hidden"></div>
                                        <input  name="hidden_project_title" type="hidden" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" >Address<span class="text-primary">*</span></label>
                                        <textarea  name="project_address" class="form-control" placeholder="Enter Project Address" 
                                                   data-parsley-required></textarea>
                                        <input  name="hidden_project_address" type="hidden" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6 hidden" id="commonfloor-project-details">
                                </div>

                            </div>

                            <div class="form-actions "> 
                                <div class="pull-right">
                                   <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-plus-circle"></i> Create</button>
                                    <button type="reset" class="hidden" />
                                    <a href="{{ url('admin/project') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                                </div>

                            </div>
                        </form>
    </div>
</div>
<script>
    var PROJECTID = 0;
</script>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection