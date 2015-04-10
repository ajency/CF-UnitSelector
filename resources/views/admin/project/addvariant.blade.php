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
        <form action="/admin/project/{{ $project['id'] }}/bunglow-variant" method="POST" data-parsley-validate>
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
                            @foreach($unit_type_arr as $unit_type)
                            <option value="{{$unit_type['id']}}">{{$unit_type['unittype_name']}}</option>
                            @endforeach
                        </select>
                    </div> 
                </div>
                <!--Floor Level Start-->
                <div>
                    <div class="col-sm-12" id="levelblock_0"> 
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <h3>Level 0</h3>
                                    <input type="hidden" name="floorlevel[]" value="0">
                                </div> 
                            </div> 
                        </div>

                        <div class="form-inline">
                            <div class="form-group">
                                <input type="hidden" name="variantroomid[]" value="">
                                <select name="room_name_0[]" class="select2 form-control">
                                    <option value="">Select Room</option>
                                    @foreach($room_type_arr as $room_type)
                                    <option value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                    @endforeach
                                </select>
                                <button type="button" class="btn btn-white" onclick="addRoomAttributes(0,this)"><i class="fa fa-plus"></i></button>
                            </div> 

                        </div>
                        <!---@TODO -->
                        <!--<div class="m-t-10">
                            <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 text-grey">	
                                <h5 class="semi-bold inline">Bedroom</h5>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">View</label>
                                            <input type="text" class="form-control" name="type" placeholder="Enter View ">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label"> Size</label>
                                            <input type="number" class="form-control" name="size" placeholder="Enter Room Size">
                                        </div>
                                    </div>
    
                                </div>
    
                                <div class="text-right">
                                    <button class="btn btn-small btn-primary"><i class="fa fa-save"></i> Save</button>
                                    <button class="btn btn-small btn-default"><i class="fa fa-trash"></i> Delete</button>
                                </div>
    
                            </div>
                        </div>-->
                    </div> 
                    <div class="pull-right" id="addFloorlevel">  
                        <input type="hidden" id="counter" name="counter" value="0">
                        <button type="button" class="btn btn-small btn-default" onclick="addFloorLevel();">Add Level</button>
                    </div>
                </div> 
            </div>

            <!--End Floor Level-->
            <div class="form-actions">  
                <div class="pull-right">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>
<script>
    var ROOMTYPES = '';
    @foreach($room_type_arr as $room_type)
    ROOMTYPES +="<option value=\"{{$room_type['id']}}\">{{$room_type['name']}}</option>";
    @endforeach
</script>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection