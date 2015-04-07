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
        <form action="/admin/project/{{ $project['id'] }}/bunglow/{{ $unitVariant['id'] }}" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="unit_variant_name" value="{{ $unitVariant['unit_variant_name'] }}" placeholder="Enter Name" data-parsley-required>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Type</label>
                        <select name="unit_type" class="select2 form-control" data-parsley-required>
                            <option value="">Select Type</option>
                            @foreach($unit_tpe_arr as $unit_type)
                            <option @if($unitVariant['unit_type_id']==$unit_type['id']){{'selected'}}@endif value="{{$unit_type['id']}}">{{$unit_type['unittype_name']}}</option>
                            @endforeach
                        </select>
                    </div> 
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="add-unit-types">
                        <h5 class="semi-bold inline">Floors/Levels</h5>
                        @foreach($variantFloorlevel as $floorlevel)
                        <div class="form-inline m-b-10">
                            <div class="form-group">
                                <input type="hidden" name="floor_level_key[]" value="{{$floorlevel['id']}}">
                                <input type="text" class="form-control" name="floor_level[]" value="{{$floorlevel['floor_level_name']}}">
                                <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div>
                        @endforeach
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
                    <input type="hidden" name="_method" value="PUT">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>

@foreach($variantFloorlevel as $floorlevel)
<div class="grid simple">
    <div class="grid-title">
        <h3>{{$floorlevel['floor_level_name']}} <span class="semi-bold">Details</span></h3>
    </div>

    <div class="grid-body">
        <form>
            <div class="form-inline">
                <div class="form-group">
                    <select id="room_name" class="select2 form-control">
                        <option value="">Select Room</option>
                        <option>Bedroom</option>
                        <option>Hall</option>
                        <option>Dining Room</option>
                    </select>
                </div> 
                <div class="form-group pull-right">
                    <input type="text" class="form-control" placeholder="Add Room">
                    <button class="btn btn-white"><i class="fa fa-plus"></i></button>
                </div>
            </div>

            <div class="m-t-10">
                <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 text-grey">	
                    <h5 class="semi-bold inline">Bedroom</h5>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Type</label>
                                <input type="text" class="form-control" name="type" placeholder="Enter Room Type">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Room Size</label>
                                <input type="number" class="form-control" name="size" placeholder="Enter Room Size">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Length x Width</label>
                                <input type="text" class="form-control" name="lengthwidth" placeholder="Enter Length and Width">
                            </div>
                        </div>
                    </div>

                    <div class="text-right">
                        <button class="btn btn-small btn-primary"><i class="fa fa-save"></i> Save</button>
                        <button class="btn btn-small btn-default"><i class="fa fa-trash"></i> Delete</button>
                    </div>

                </div>
            </div>
        </form>
    </div>
</div>
@endforeach

<!-- END PLACE PAGE CONTENT HERE -->
@endsection
