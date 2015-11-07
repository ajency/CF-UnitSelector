@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Buildings</a> </li>
    <li><a href="#" class="active">Add Building</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
  <div class="page-title">
                        
                    <h2><span class="semi-bold">Building </span> Add</h2>
                    </div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="grid simple">
<form onsubmit="return validateBuildingFloors(this);" data-parsley-validate method="POST" action="{{ url('admin/project/'. $project['id'] .'/building') }}">    
                <div class="grid-body grid-padding no-border">
                    <div class=" m-t-15 m-b-15 no-border">
                        <div class="row">
                            <div class="col-md-4">
                                <h3><i class=
                                       "fa fa-angle-double-right text-primary"></i>
                                    <span class="semi-bold">Building</span>
                                    Details</h3>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                            <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Building Name<span class="text-primary">*</span></label>
                                       <input required="" type="text" class="form-control" name="building_name" placeholder="Enter Building Name" data-parsley-required onchange="validateBuildingName(this,0);" ><div class="cf-loader hidden"></div>
                                        </div>

                                    </div>
                        
                                    <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Number of Floors<span class="text-primary">*</span></label>
                                        <select id="phase" name="no_of_floors" class="select2 form-control m-b-5" data-parsley-required>
                                                <option value="">Select Floors</option>
                                                @for($i=1 ;  $i<=100; $i++)
                                                <option value="{{ $i }}">{{ $i }}</option>
                                                @endfor
                                            </select>
                                             
                                        </div>
                        
                                    </div>
                     <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Floor Rise <span class="text-primary">*</span></label>
                                       <input required="" type="text" class="form-control" name="floor_rise"    placeholder="Enter Floor Rise" data-parsley-required data-parsley-type="number" > 
                                        </div>

                                    </div>
                                     
                                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Phase<span class="text-primary">*</span></label>
                                @if($project['has_phase']=='yes')
                                <select  class="select2 form-control m-b-5" name="phase_id" data-parsley-required>
                                   <option value="">Select Phase</option>  
                                   @foreach($phases as $phase)
                                    <option value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
                                    @endforeach
                                </select>
                                @else
                                <select  class="select2 form-control m-b-5" name="phase_id" disabled>
                                    <option value="">Select Phase</option>
                                   @foreach($phases as $phase)
                                    <option selected value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
                                    @endforeach
                                </select>
                                <input type="hidden" name="phase_id" value="{{$phase['id']}}">
                                @endif
                                             
                                        </div>
                                    </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Has Master<span class="text-primary">*</span></label>
                        <div class="radio radio-primary">        
                                        <input id="master_yes" type="radio" name="has_master" value="yes" checked>
                        <label for="master_yes" class="form-label">Yes</label>
                        <input id="master_no" type="radio" name="has_master" value="no" >
                        <label for="master_no" class="form-label">No</label>
                         </div>                    
                                        </div>
                                    </div>
                                </div>

                             <hr/>
            <div class="row floor-groups">
                <div class="m-l-5 no-border">
                    <h3><i class="fa fa-angle-double-right text-primary"></i> Floor   <span class="semi-bold">Group</span></h3>
                </div>
                 

                 <div class="col-md-5">
                   <div class="add-unit floor_group_block">
                        <div class="row p-t-10 p-r-15 p-l-15">
                            <div class="col-md-12">
                            <input type="text" name="floor_group_name[]" value="" class="form-control">
                            <input type="hidden" name="floor_group_id[]" value="" class="form-control">
                            &nbsp;
                           <input type="text" name="group_floors[]" value="" class="form-control">
                        <div class="text-right">
                            <a tabindex="0" class="add-floor-group-btn btn btn-link"><i class="fa fa-"></i> Add Floor Group</a>
                        </div> </div>
                        </div>
                        </div>
                    </div> 
                </div>
                     
                    <div class="row">
                        <div class="col-md-12">
                             <div class="form-actions">
                                    <div class="text-right">
                                       <input type="hidden" value="{{ csrf_token()}}" name="_token"/>    
                            <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-plus-circle"></i> Create</button>
                             <button class="btn btn-default btn-cons" type="submit"><i class="fa fa-ban"></i>
                                            Cancel</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                </form>

            </div>
 <script>
    var BASEURL = '{{ url() }}';
    var BUILDING_ID = '{{ $building->id }}';
 

</script>
@endsection
