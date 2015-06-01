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
                        @if($project['has_phase']=='yes')
                        <select  class="select2 form-control m-b-5" name="phase">
                           <option value="">Select Phase</option>  
                           @foreach($phases as $phase)
                            <option value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
                            @endforeach
                        </select>
                        @else
                        <select  class="select2 form-control m-b-5" name="phase" disabled>
                            <option value="">Select Phase</option>
                           @foreach($phases as $phase)
                            <option selected value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
                            @endforeach
                        </select>
                        <input type="hidden" name="phase" value="{{$phase['id']}}">
                        @endif

                        <span class="error"><span for="form3LastName" class="error">This field is required.</span></span>
                    </div>
                </div>

                 </div>
                <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Direction<span class="text-primary">*</span></label>
                        <select  class="select2 form-control m-b-5" name="direction">
                           <option value="">Select Direction</option>  
                           @foreach($defaultDirection as $direction)
                            <option value="{{$direction['id']}}">{{$direction['label']}}</option>
                            @endforeach
                        </select>
                        <span class="error"><span for="form3LastName" class="error">This field is required.</span></span>
                    </div>
                </div>
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
                <div class="row">
                @foreach($projectAttributes as $attribute)
                <div class="col-md-4">
                    <div class="form-group">
                        <div class="checkbox check-primary pull-left" >    
                            <input type="checkbox" id="{{$attribute['label']}}" value="{{$attribute['label']}}" name="views[{{property_type_slug($attribute['label'])}}]" aria-label="...">
                            <label for="{{$attribute['label']}}">{{$attribute['label']}}</label> 
                         </div>
                    </div>
                </div>
                @endforeach
                </div>
           <hr>
           <div class="m-l-5 no-border">
            <h3><i class="fa fa-angle-double-right text-primary"></i> Project<span class="semi-bold"> Views</span></h3>
        </div>
        <div class="row m-b-5">
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox1" aria-label="...">
                        <label for="checkbox1">Garden</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox2" aria-label="...">
                        <label for="checkbox2">Swimming Pool</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox3" aria-label="...">
                        <label for="checkbox3">Play Area</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox4" aria-label="...">
                        <label for="checkbox4">Health Facilities</label>
        </div>
        </div>
        </div>
        <div class="row m-b-5">
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox5" aria-label="...">
                        <label for="checkbox5">Recreation Facilities</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox6" aria-label="...">
                        <label for="checkbox6">Security</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox7" aria-label="...">
                        <label for="checkbox7">Intercom</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox8" aria-label="...">
                        <label for="checkbox8">Club House</label>
        </div>
        </div>
        </div>
        <div class="row m-b-5">
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox9" aria-label="...">
                        <label for="checkbox9">Rain Water Harvesting</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox10" aria-label="...">
                        <label for="checkbox10">Cafeteria</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox12" aria-label="...">
                        <label for="checkbox12">Library</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox13" aria-label="...">
                        <label for="checkbox13">Tennis Court</label>
        </div>
        </div>
        </div>
           <div class="row m-b-5">
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox14" aria-label="...">
                        <label for="checkbox14">Badminton Court</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox15" aria-label="...">
                        <label for="checkbox15">Gymnasium</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox16" aria-label="...">
                        <label for="checkbox16">Bank</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox17" aria-label="...">
                        <label for="checkbox17">Atm</label>
        </div>
        </div>
        </div>
          <div class="row m-b-5">
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox18" aria-label="...">
                        <label for="checkbox18">Indoor Games</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox19" aria-label="...">
                        <label for="checkbox19">Basket Ball Court</label>
        </div>
        </div>
        <div class="col-md-3">
        <div class="checkbox check-primary" >
                        <input type="checkbox" id="checkbox20" aria-label="...">
                        <label for="checkbox20">Community Hall</label>
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

