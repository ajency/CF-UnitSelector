@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#"> Unit</a> </li>
    <li><a href="#" class="active">Edit Unit</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">    
    <h2><span class="semi-bold">Edit</span> Unit</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="grid simple">
   @include('admin.project.flashmessage')
    <div class="grid-title no-border">
        <h3> <i class="fa fa-angle-double-right text-primary"></i> Apartment <span class="semi-bold">Details</span></h3>
    </div>
    <div class="grid-body no-border">
        <form action="{{ url('/admin/project/' . $project['id'] .'/apartment-unit/'.$unit['id']) }}"  method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input {{ $disabled }} type="text" class="form-control" name="unit_name" placeholder="Enter Name" value="{{ $unit['unit_name'] }}" data-parsley-required>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Building</label>
                        <select {{ $disabled }} name="building_id" class="select2 form-control apartment-unit-building m-b-5" data-parsley-required  >
                            <option value="">Select building</option>
                           @foreach($buildings as $building)
                            <option  @if($unit['building_id']==$building['id']){{'selected'}} @endif  data-no-of-floors="{{ $building['no_of_floors'] }}" value="{{ $building['id'] }}">{{ $building['building_name'] }}</option>
                            @endforeach
                        </select>
                        <!--<a data-toggle="modal" data-target=".bs-example-modal-lg1" href="#">
                            + Add Building
                        </a>-->
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group select-floor @if(!$unit['building_id']){{'hidden'}}@endif" >
                        <label class="form-label">Floor</label>
                        <select {{ $disabled }} id="floor" name="floor" onchange="getPositions(this);" {{ ($unit['floor_group_id']) ? 'disabled' : '' }}  class="select2 form-control apartment-unit-floor-no m-b-5" >
                            <option value="">Select Floor</option>
                            @for($i=1; $i<= $floors ; $i++)
                            <option  @if($unit['floor']==$i){{'selected'}} @endif value="{{ $i }}">{{ $i }}</option>
                            @endfor
                        </select>
                        @if($unit['floor_group_id'])
                        <input type="hidden" name="floor" value="{{ $unit['floor'] }}">
                        @endif

                                </div> 
                </div>
                 
                
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group @if(!$unit['floor']){{'hidden'}}@endif select-position">
                        <label class="form-label">Position</label>
                        <select {{ $disabled }} id="flat_position" required="" name="position" class="select2 form-control">
                            <option value="">Select Position</option>
                             @foreach($availabelpositions as $availabelposition)
                            <option  @if($unit['position']==$availabelposition){{'selected'}} @endif value="{{ $availabelposition }}">{{ $availabelposition }}</option>
                            @endforeach
                        </select>
                    </div> 

                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Variant<span class="text-primary">*</span></label>

                        <select {{ $disabled }} name="unit_variant" class="select2 form-control m-b-5" data-parsley-required>
                            <option value="">Select Unit Variant</option>
                             @foreach($unit_variant_arr as $unit_variant)
                            <option @if($unit['unit_variant_id']==$unit_variant['id']){{'selected'}}@endif value="{{$unit_variant['id']}}">{{$unit_variant['unit_variant_name']}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                <div class="form-group">
                        <label class="form-label">Direction<span class="text-primary">*</span></label>
                        <select {{ $disabled }}  class="select2 form-control m-b-5" name="direction" data-parsley-required>
                           <option value="">Select Direction</option>  
                           @foreach($defaultDirection as $direction)
                            <option  @if($unit['direction']==$direction['id']){{'selected'}}@endif value="{{$direction['id']}}">{{$direction['label']}}</option>
                            @endforeach
                        </select>
                     
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Status</label>
                        <select @if(isAgent() && $unit['availability']=='booked_by_agent'){{'disabled'}}@endif @if($unit['availability']=='blocked' || $unit['availability']=='payment_in_progress'){{'disabled'}}@endif  class="select2 form-control" name="unit_status">
                            <option @if($unit['availability']=='available'){{'selected'}}@endif value="available">Available</option>
                            <option @if($unit['availability']=='payment_in_progress'){{'selected'}}@endif value="payment_in_progress">Payment In Progress</option>
                            <option @if($unit['availability']=='sold'){{'selected'}}@endif value="sold">Sold</option>
                            <option @if($unit['availability']=='not_released'){{'selected'}}@endif value="not_released">Not Released</option>
                            <option @if($unit['availability']=='blocked'){{'selected'}}@endif value="blocked">Blocked</option>
                            <option @if($unit['availability']=='booked_by_agent'){{'selected'}}@endif value="booked_by_agent">Booked By Agent</option>
                            <option @if($unit['availability']=='archived'){{'selected'}}@endif value="archived">Archived</option>
                        </select>
                        @if($unit['availability']=='blocked' || $unit['availability']=='payment_in_progress')
                        <input type="hidden" name="unit_status" value="{{ $unit['availability'] }}">
                        @endif
                    </div>
                </div>
                @if($unit['availability']=='booked_by_agent')     
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Booked By</label>
                        <br>
                        {{($unit['agent_name']!='') ?'By '.$unit['agent_name']:''}} On 
                        {{ date('d/m/Y',strtotime($unit['booked_at'])) }}
                        
                    </div>
                </div>
             @endif 
            </div>
    @if(!empty($projectAttributes))
             <hr>
           <div class="m-l-5 no-border">
            <h3><i class="fa fa-angle-double-right text-primary"></i> <span class="semi-bold"> Views</span></h3>
        </div>
        <div class="row m-b-5">
        <?php $i=0;?>
        @foreach($projectAttributes as $attribute)
         <?php
            $value = (isset($unit['views'][property_type_slug($attribute['label'])])) ? $unit['views'][property_type_slug($attribute['label'])] : ''
            ?>
            <div class="col-md-3">
        <div class="checkbox check-primary" >
            <input {{ $disabled }} @if($value== $attribute['label']){{'checked'}}@endif type="checkbox" id="{{$attribute['label']}}" value="{{$attribute['label']}}" name="views[{{property_type_slug($attribute['label'])}}]" aria-label="...">
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
                    <input type="hidden" id="addanother" name="addanother" value="">
                    <input type="hidden" name="_method" value="PUT">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                    <button type="button" class="btn btn-danger btn-cons delete-unit" data-unit-id="{{  $unit['id'] }} " data-unit-type="apartment-unit">Delete</button>
                    <a  href="{{ url('/admin/project/'. $project['id'] .'/apartment-unit') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                </div>
            </div>
       </form>

    </div>
</div>

<!-- END PLACE PAGE CONTENT HERE -->
@endsection
 