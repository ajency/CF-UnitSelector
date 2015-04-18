@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
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
    <div class="grid-title">
        <h3>Apartment <span class="semi-bold">Unit Details</span></h3>
    </div>

    <div class="grid-body">
        <form action="{{ url('/admin/project/' . $project['id'] .'/apartment-unit/'.$unit['id']) }}" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="unit_name" value="{{ $unit['unit_name'] }}" placeholder="Enter Name" data-parsley-required>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Status</label>
                        <select  class="select2 form-control" name="unit_status">
                            <option @if($unit['availability']=='available'){{'selected'}}@endif value="available">Available</option>
                            <option @if($unit['availability']=='sold'){{'selected'}}@endif value="sold">Sold</option>
                            <option @if($unit['availability']=='not_released'){{'selected'}}@endif value="not_released">Not Released</option>
                            <option @if($unit['availability']=='blocked'){{'selected'}}@endif value="blocked">Blocked</option>
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
                            <option  @if($unit['building_id']==$building->id){{'selected'}} @endif  data-no-of-floors="{{ $building->no_of_floors }}" value="{{ $building->id }}">{{ $building->building_name }}</option>
                            @endforeach
                        </select>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group select-floor">
                        <label class="form-label">Floor</label>
                        <select id="floor" name="floor"   class="select2 form-control apartment-unit-floor-no">
                            <option value="">Select Floor</option>
                             @for($i=1; $i<= $floors ; $i++)
                            <option  @if($unit['floor']==$i){{'selected'}} @endif value="{{ $i }}">{{ $i }}</option>
                            @endfor
                        </select>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group select-position">
                        <label class="form-label">Position</label>
                        <select id="flat_position" required="" name="position" class="select2 form-control">
                            <option value="">Select Position</option>
                            <option @if($unit['position']=='1'){{'selected'}} @endif value="1">1</option>
                            <option @if($unit['position']=='2'){{'selected'}} @endif value="2">2</option>
                            <option @if($unit['position']=='3'){{'selected'}} @endif value="3">3</option>
                            <option @if($unit['position']=='4'){{'selected'}} @endif value="4">4</option>
                        </select>
                    </div> 

                </div>
            </div>
            <div class="form-actions">  
                <div class="pull-right">
                    <input type="hidden" name="_method" value="PUT">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- END PLACE PAGE CONTENT HERE -->
@endsection