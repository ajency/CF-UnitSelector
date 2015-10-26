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
                        <input type="text" class="form-control" name="unit_name" placeholder="Enter Name" data-parsley-required onchange="validateUnitName(this,{{ $projectPropertytypeId }},0);" ><div class="cf-loader hidden"></div>
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
                        <label class="form-label">Group<span class="text-primary">*</span></label>

                        <select name="property_type_group" class="select2 form-control m-b-5" data-parsley-required>
                            <option value="">Select Group</option>
                            @foreach($propertyTypeGroups as $propertyTypeGroup)
                            <option value="{{$propertyTypeGroup['id']}}">{{$propertyTypeGroup['property_type_group_name']}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                 </div>
                <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Phase<span class="text-primary">*</span></label>
                        @if($project['has_phase']=='yes')
                        <select  class="select2 form-control m-b-5" name="phase" data-parsley-required>
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

                         
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Direction<span class="text-primary">*</span></label>
                        <select  class="select2 form-control m-b-5" name="direction" data-parsley-required>
                           <option value="">Select Direction</option>  
                           @foreach($defaultDirection as $direction)
                            <option value="{{$direction['id']}}">{{$direction['label']}}</option>
                            @endforeach
                        </select>
                        
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Status<span class="text-primary">*</span></label>
                        <select  class="select2 form-control m-b-5" name="unit_status" data-parsley-required>
                            <option value="available">Available</option>
                            <option value="payment_in_progress">Payment In Progress</option>
                            <option value="sold">Sold</option>
                            <option value="not_released">Not Released</option>
                            <option value="blocked">Blocked</option>
                            <option value="booked_by_agent">Booked By Agent</option>
                            <option value="archived">Archived</option>
                        </select>
                        
                    </div>
                </div>
                </div>
         @if(!empty($projectAttributes)) 
           <hr>
           <div class="m-l-5 no-border">
            <h3><i class="fa fa-angle-double-right text-primary"></i> <span class="semi-bold"> Views</span></h3>
        </div>
        <div class="row m-b-5">
        <?php $i=0;?>
        @foreach($projectAttributes as $attribute)
            <div class="col-md-3">
        <div class="checkbox check-primary" >
            <input type="checkbox" id="{{$attribute['label']}}" value="{{$attribute['label']}}" name="views[{{property_type_slug($attribute['label'])}}]" aria-label="...">
             <label for="{{$attribute['label']}}">{{$attribute['label']}}</label> 
        </div>
        </div>

        <?php $i++;?>
        @if($i==4)
        </div>
        <div class="row m-b-5">
        <?php $i=0;?>
        @endif 
        @endforeach
 
        </div>
        @endif
            <div class="form-actions">  
                <div class="text-right">
                    <input type="hidden" id="projectPropertytypeId" name="projectPropertytypeId" value="{{ $projectPropertytypeId }}">
                    <input type="hidden" id="addanother" name="addanother" value="">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-plus-circle"></i> Create</button>
                    <button type="button" onclick="saveAndAddAnother();" class="btn btn-default btn-cons">Save And Create Another</button>
                    <a  href="{{ url('/admin/project/'. $project['id'] .'/bunglow-unit') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                </div>
            </div>

        </div>
    </form>
</div>


<!-- END PLACE PAGE CONTENT HERE -->
@endsection

