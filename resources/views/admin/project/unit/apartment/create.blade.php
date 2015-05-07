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
    <div class="grid-title">
        <h3>Apartment <span class="semi-bold">Unit Details</span></h3>
    </div>

    <div class="grid-body">
         <form action="{{ url('/admin/project/' . $project['id'] .'/apartment-unit') }}" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="unit_name" placeholder="Enter Name" data-parsley-required>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Status</label>
                        <select  class="select2 form-control" required="" name="unit_status">
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                            <option value="not_released">Not Released</option>
                            <option value="blocked">Blocked</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Building</label>
                        <select name="building_id" class="select2 form-control apartment-unit-building m-b-5" data-parsley-required>
                            <option value="">Select building</option>
                            @foreach($buildings as $building)
                            <option data-no-of-floors="{{ $building->no_of_floors }}" value="{{ $building->id }}">{{ $building->building_name }}</option>
                            @endforeach
                        </select>
                        <a data-toggle="modal" data-target=".bs-example-modal-lg1" href="#">
                        + Add Building
                        </a>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group hidden select-floor" >
                        <label class="form-label">Floor</label>
                        <select id="floor" name="floor" onchange="getPositions(this.value);"   class="select2 form-control apartment-unit-floor-no m-b-5">
                            <option value="">Select Floor</option>
                        </select>
                        <a data-toggle="modal" data-target=".bs-example-modal-lg2" href="#">
                        + Add floor Layout
                        </a>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group hidden select-position">
                        <label class="form-label">Position</label>
                        <select id="flat_position" required="" name="position" class="select2 form-control">
                            <option value="">Select Position</option>
      
                        </select>
                    </div> 

                </div>
            </div>
            <div class="form-actions">  
                <div class="pull-right">
                    <input type="hidden" id="addanother" name="addanother" value="">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                    <button type="button" onclick="saveAndAddAnother();" class="btn btn-default btn-cons">Save And Add Another</button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- END PLACE PAGE CONTENT HERE -->
@endsection

<!-- Modal -->
<div class="modal fade bs-example-modal-lg1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-left" id="myModalLabel">Add Building</h4>
      </div>
      <div class="modal-body">
        <iframe width="100%"></iframe>
      </div>
      
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade bs-example-modal-lg2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-left" id="myModalLabel">Add Floor Layout</h4>
      </div>
      <div class="modal-body">
        <iframe width="100%"></iframe>
      </div>
     
    </div>
  </div>
</div>
