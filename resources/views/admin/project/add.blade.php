@extends('layouts.master')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
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
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-body no-border"> 
                <br>
                <form id="add_project" method="POST" action="{{ url('admin/project') }}" data-parsley-validate>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">City <span class="text-primary">*</span></label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right"  title="Location of the project"></i>                                <!-- //TODO fix the required validation  -->
                                <select name="city" class="select2 form-control" data-parsley-required>
                                    <option value="">Choose City</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="DelhiNCR">DelhiNCR</option>
                                    <option value="Gurgaon">Gurgaon</option>
                                    <option value="GreaterNoida">GreaterNoida</option>
                                    <option value="Ghaziabad">Ghaziabad</option>
                                    <option value="Faridabad">Faridabad</option>
                                    <option value="Bhiwadi">Bhiwadi</option>
                                    <option value="Dharuhera">Dharuhera</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="NaviMumbai">NaviMumbai</option>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="Jaipur">Jaipur</option>
                                    <option value="Thane">Thane</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Mysore">Mysore</option>
                                    <option value="Lucknow">Lucknow</option>
                                    <option value="Kochi">Kochi</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">CF Project Name <span class="text-primary">*</span></label>
                                <span class="help">From CommonFloor database</span>
                                <select data-parsley-required name="cf_project_id" class="select2 form-control">
                                    <option value="">Choose Commonfloor Project</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label" >Project Title<span class="text-primary">*</span></label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right"  title=" Project Title to be displayed on unit selector page"></i> 
                                <input  name="project_title" type="text" class="form-control" placeholder="Enter Project Title" 
                                        data-parsley-required>
                                <input  name="hidden_project_title" type="hidden" class="form-control">
                            </div>
                            <div class="form-group">
                                <label class="form-label" >Address<span class="text-primary">*</span></label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right"  title=" Project Address to be displayed on unit selector page "></i>
                                <textarea  name="project_address" class="form-control" placeholder="Enter Project Address" 
                                           data-parsley-required></textarea>
                                <input  name="hidden_project_address" type="hidden" class="form-control">
                            </div>

                            <div class="form-group">
                                <label class="form-label" >Property Types <span class="text-primary">*</span></label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right"  title=" Property Types in the project available for sale "></i>
                                <select placeholder="Add Property Type" name="property_types[]" 
                                        data-parsley-required class="select2 form-control" multiple="multiple" >
                                   @foreach($property_type as $type) 
                                    <option value="{{$type['id']}}">{{$type['name']}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 hidden" id="commonfloor-project-details">
                        </div>
                         
                    </div>
 
                    <div class="form-actions "> 
                   <div class="pull-right">
                    <a class="inline" data-toggle="popover" data-content="The project enters the draft mode on save and will only be available on unit selector when 
               the project status is changed to Published." data-original-title="" title=""><i class="fa fa-info"></i></a>&nbsp;
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                            <button type="reset" class="hidden" />
                            <a href="{{ url('admin/project') }}"><button type="button" class="btn btn-white btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                        </div>
                      
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection