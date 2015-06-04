@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#"> Unit</a> </li>
    <li><a href="#" class="active">Add Unit</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Add</span> Unit</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="grid simple">
   
    <div class="grid-title no-border">
        <h3> <i class="fa fa-angle-double-right text-primary"></i> Apartment <span class="semi-bold">Details</span></h3>
    </div>
    <div class="grid-body no-border">
        <form action="{{ url('/admin/project/' . $project['id'] .'/apartment-unit') }}" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name <span class="text-primary">*</span></label>
                        <input type="text" class="form-control" name="unit_name" placeholder="Enter Name" data-parsley-required>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Building <span class="text-primary">*</span></label>
                        <select name="building_id" class="select2 form-control apartment-unit-building m-b-5" data-parsley-required>
                            <option value="">Select building</option>
                            @foreach($buildings as $building)
                            <option data-no-of-floors="{{ $building->no_of_floors }}" value="{{ $building->id }}">{{ $building->building_name }}</option>
                            @endforeach
                        </select>
                        <!--<a data-toggle="modal" data-target=".bs-example-modal-lg1" href="#">
                            + Add Building
                        </a>-->
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group select-floor" >
                        <label class="form-label">Floor <span class="text-primary">*</span></label>
                        <select id="floor" name="floor" onchange="getPositions(this);"   class="select2 form-control apartment-unit-floor-no m-b-5" data-parsley-required>
                            <option value="">Select Floor</option>
                        </select>
         
                    </div> 
                </div>
                
                
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group select-position">
                        <label class="form-label">Position <span class="text-primary">*</span></label>
                        <select id="flat_position" required="" name="position" class="select2 form-control" data-parsley-required>
                            <option value="">Select Position</option>
                             
                        </select>
                    </div> 

                </div>
            @if(count($projectPropertyTypes) > 1)
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Property Type<span class="text-primary">*</span></label>

                        <select onchange="getVariants(this);" name="property_type" class="select2 form-control m-b-5" data-parsley-required>
                            <option value="">Select Property Variant</option>
                            @foreach($projectPropertyTypes as $projectPropertyType)
                            <option value="{{ $projectPropertyType['ID'] }}">{{ $projectPropertyType['NAME'] }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                
                @endif
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Variant<span class="text-primary">*</span></label>

                        <select name="unit_variant_id" class="select2 form-control m-b-5" data-parsley-required>
                            <option value="">Select Unit Variant</option>
                            @foreach($unit_variant_arr as $unit_variant)
                            <option value="{{$unit_variant['id']}}">{{$unit_variant['unit_variant_name']}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                 
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Status <span class="text-primary">*</span></label>
                        <select  class="select2 form-control" required="" name="unit_status" data-parsley-required>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                            <option value="not_released">Not Released</option>
                            <option value="blocked">Blocked</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>
            </div> 
                    <div class="form-actions">  
                <div class="text-right">
                    <input type="hidden" id="addanother" name="addanother" value="">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-plus-circle"></i> Create</button>
                    <button type="button" onclick="saveAndAddAnother();" class="btn btn-default btn-cons">Save And Create Another</button>
                    <a  href="{{ url('/admin/project/'. $project['id'] .'/apartment-unit') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                </div>
            </div>
       </form>

    </div>
</div>

<!-- END PLACE PAGE CONTENT HERE -->
@endsection
 