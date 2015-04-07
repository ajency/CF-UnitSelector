@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
    <li><a href="#" class="active">Add Unit Variant</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Add</span> Unit Variant</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="grid simple">
    <div class="grid-title">
        <h3>Villa <span class="semi-bold">Details</span></h3>
    </div>

    <div class="grid-body">
       <form action="/admin/project/{{ $project['id'] }}/bunglow" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="unit_variant_name" placeholder="Enter Name" data-parsley-required>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Type</label>
                        <select name="unit_type" class="select2 form-control" data-parsley-required>
                            <option value="">Select Type</option>
                            @foreach($unit_tpe_arr as $unit_type)
                            <option value="{{$unit_type['id']}}">{{$unit_type['unittype_name']}}</option>
                            @endforeach
                        </select>
                    </div> 
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="add-unit-types">
                        <h5 class="semi-bold inline">Floors/Levels</h5>
                        <div class="form-inline m-b-10">
                            <div class="form-group">
                                <input type="hidden" name="floor_level_key[]" value="">
                                <input type="text" class="form-control" name="floor_level[]" value="Ground Floor">
                                <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div>
                        <div class="form-inline m-b-10">
                            <div class="form-group">
                                <input type="hidden" name="floor_level_key[]" value="">
                                <input type="text" class="form-control" name="floor_level[]" value="First Floor">
                                
                                <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div>
                        <div class="form-inline">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Add Floor">
                                <button class="btn btn-white"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
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