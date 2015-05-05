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
    <h2><span class="semi-bold">Add</span> Building</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h3 class="inline"><span class="semi-bold">Building</span> Details</h3> 
                <div class="clearfix"></div>
            </div>
            <div class="grid-body">
                <form data-parsley-validate method="POST" action="{{ url('admin/project/'. $project['id'] .'/building') }}">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Name</label>
                                <input required="" type="text" class="form-control" name="building_name" placeholder="Enter Building Name">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group object-phases" data-object-type="building">
                                <label class="form-label">Phase</label>
                                <select  name="phase_id" class="select2 form-control m-b-5">
                                    <option value="">Select Phase</option>
                                    @foreach( $phases as $phase )
                                    <option value="{{ $phase->id }}">{{ $phase->phase_name }}</option>
                                    @endforeach
                                </select>
                             
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapsephase" aria-expanded="true" aria-controls="collapseOne">+ Add Phase</a>
                                <div id="collapsephase" class="panel-collapse collapse p-t-10" role="tabpanel" aria-labelledby="headingOne">
                                    <input type="text" class="form-control phase-name m-b-10" placeholder="Add Phase">
                                    <button type="button" class="btn btn-small btn-primary add-phase-btn"><i class="fa fa-save"></i> Save</button>
                                </div>
                            </div> 
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Number of Floors</label>
                                <input type="number" data-parsley-min="1" required="" class="form-control" name="no_of_floors" placeholder="Enter Number of Floors">
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">  
                        <div class="pull-right">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>    
                            <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                            <button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
