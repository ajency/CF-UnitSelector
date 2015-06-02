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
<form data-parsley-validate method="POST" action="{{ url('admin/project/'. $project['id'] .'/building') }}">    
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
                                       <input required="" type="text" class="form-control" name="building_name" placeholder="Enter Building Name" data-parsley-required>
                                        </div>

                                    </div>
                                    <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Building Abbrevation<span class="text-primary">*</span></label>
                                        
                                        <input type="text" name="abbrevation" id="abbrevation" placeholder="Enter Building Abbrevation" class="form-control" data-parsley-required>
 
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
                                    </div>

                    <div class="row">
                                   <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Phase<span class="text-primary">*</span></label>
                                        <select  name="phase_id" class="select2 form-control m-b-5" data-parsley-required>
                                    <option value="">Select Phase</option>
                                    @foreach( $phases as $phase )
                                    <option value="{{ $phase['id'] }}">{{ $phase['phase_name'] }}</option>
                                    @endforeach
                                </select>
                                             
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
