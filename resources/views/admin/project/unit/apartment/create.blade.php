@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
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
                        <select  class="select2 form-control" name="unit_status">
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
                        <select name="building_id" class="select2 form-control apartment-unit-building" data-parsley-required>
                            <option value="">Select building</option>
                            @foreach($buildings as $building)
                            <option data-no-of-floors="{{ $building->no_of_floors }}" value="{{ $building->id }}">{{ $building->building_name }}</option>
                            @endforeach
                        </select>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group hidden select-floor">
                        <label class="form-label">Floor</label>
                        <select id="floor" name="floor_number"   class="select2 form-control">
                            <option value="">Select Floor</option>
                        </select>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group hidden select-position">
                        <label class="form-label">Position</label>
                        <select id="flat_position" required="" name="position_on_floor" class="select2 form-control">
                            <option value="">Select Position</option>
                        </select>
                    </div> 

                </div>
            </div>
            <div class="form-actions">  
                <div class="pull-right">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- END PLACE PAGE CONTENT HERE -->
@endsection