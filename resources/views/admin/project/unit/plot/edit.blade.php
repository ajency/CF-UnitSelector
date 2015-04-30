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
    <h2><span class="semi-bold">Add</span> Unit </h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="grid simple">
    <div class="grid-title">
        <h3>Plot <span class="semi-bold">Details</span></h3>
    </div>

    <div class="grid-body">
        <form action="/admin/project/{{ $project['id'] }}/plot-unit/{{$unit['id']}}" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" value="{{$unit['unit_name']}}" name="unit_name" placeholder="Enter Name" data-parsley-required>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Variant</label>
                        <select name="unit_variant" class="select2 form-control" data-parsley-required>
                            <option value="">Select Unit Variant</option>
                            @foreach($unit_variant_arr as $unit_variant)
                            <option @if($unit['unit_variant_id']==$unit_variant['id']){{'selected'}}@endif value="{{$unit_variant['id']}}">{{$unit_variant['unit_variant_name']}}</option>
                            @endforeach
                        </select>
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
            <div class="form-actions">  
                <div class="pull-right">
                     <input type="hidden" id="addanother" name="addanother" value="">
                    <input type="hidden" name="_method" value="PUT">
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