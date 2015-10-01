@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">{{ get_property_type( $propertyTypeId ) }} Group</a> </li>
    <li><a href="#" class="active">Add {{ get_property_type( $propertyTypeId ) }} Group</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
  <div class="page-title">
                        
                    <h2><span class="semi-bold">{{ get_property_type( $propertyTypeId ) }} Group </span> Add</h2>
                    </div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="grid simple">
<form data-parsley-validate method="POST" action="{{ url('admin/project/' . $project['id'] . '/' . property_type_slug(get_property_type( $propertyTypeId )) . '/' . $projectPropertyTypeId . '/group') }}">    
                <div class="grid-body grid-padding no-border">
                    <div class=" m-t-15 m-b-15 no-border">
                        <div class="row">
                            <div class="col-md-4">
                                <h3><i class=
                                       "fa fa-angle-double-right text-primary"></i>
                                    <span class="semi-bold">{{ get_property_type( $propertyTypeId ) }} Group</span>
                                    Details</h3>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                            <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Gruop Name<span class="text-primary">*</span></label>
                                       <input required="" type="text" class="form-control" name="group_name" placeholder="Enter Group Name" data-parsley-required onchange="validateBuildingName(this,0);" ><div class="cf-loader hidden"></div>
                                        </div>

                                    </div>
                        
                                     
 
                           
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
 
@endsection
