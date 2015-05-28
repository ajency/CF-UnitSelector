@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Villa Unit</a> </li>
    <li><a href="#" class="active">Add Unit</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">
    <h2><span class="semi-bold">Add </span> Unit</h2>
</div>

<div class="grid simple">
    <div class="grid-title no-border">
        <h3 > <i class="fa fa-angle-double-right text-primary"></i> Villa <span class="semi-bold">Details</span></h3>
    </div>
    <form action="/admin/project/{{ $project['id'] }}/bunglow-unit" method="POST" data-parsley-validate>     
        <div class="grid-body no-border ">

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name<span class="text-primary">*</span></label>
                        <input type="text" class="form-control" name="unit_name" placeholder="Enter Name" data-parsley-required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Variant<span class="text-primary">*</span></label>

                        <select name="unit_variant" class="select2 form-control m-b-5" data-parsley-required>
                            <option value="">Select Unit Variant</option>
                            @foreach($unit_variant_arr as $unit_variant)
                            <option value="{{$unit_variant['id']}}">{{$unit_variant['unit_variant_name']}}</option>
                            @endforeach
                        </select>
                   </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Phase<span class="text-primary">*</span></label>
                        <select  class="select2 form-control m-b-5" name="phase">
                           <option value="">Select Phase</option>  
                           @foreach($phases as $phase)
                            <option value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
                            @endforeach
                        </select>
                        <span class="error"><span for="form3LastName" class="error">This field is required.</span></span>
                    </div>
                </div>
                 </div>
                <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Status<span class="text-primary">*</span></label>
                        <select  class="select2 form-control m-b-5" name="unit_status">
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                            <option value="not_released">Not Released</option>
                            <option value="blocked">Blocked</option>
                            <option value="archived">Archived</option>
                        </select>
                        <span class="error"><span for="form3LastName" class="error">This field is required.</span></span>
                    </div>
                </div>
                </div>
           


            <div class="form-actions">  
                <div class="text-right">
                    <input type="hidden" id="addanother" name="addanother" value="">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-plus-circle"></i> Create</button>
                    <button type="button" onclick="saveAndAddAnother();" class="btn btn-default btn-cons">Save And Create Another</button>
                </div>
            </div>

        </div>
    </form>
</div>


<!-- END PLACE PAGE CONTENT HERE -->
@endsection

