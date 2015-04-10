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
        <form action="/admin/project/{{ $project['id'] }}/bunglow-variant/{{ $unitVariant['id'] }}" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="unit_variant_name" placeholder="Enter Name" data-parsley-required value="{{ $unitVariant['unit_variant_name'] }}">
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Type</label>
                        <select name="unit_type" class="select2 form-control" data-parsley-required>
                            <option value="">Select Type</option>
                            @foreach($unit_type_arr as $unit_type)
                            <option  @if($unitVariant['unit_type_id']==$unit_type['id']){{'selected'}}@endif  value="{{$unit_type['id']}}">{{$unit_type['unittype_name']}}</option>
                            @endforeach
                        </select>
                    </div> 
                </div>
                <!--Floor Level Start-->
                <div>
                    <?php $i=0;?>
                    @foreach($floorlevelRoomAttributes as $level=>$roomAttributes)
                        <div class="col-sm-12" id="levelblock_{{$i}}"> 
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <h3>Level {{$i}}</h3>
                                    <input type="hidden" name="floorlevel[]" value="{{$i}}">
                                </div> 
                            </div> 
                        </div>
                         @foreach($roomAttributes as $variantRoomId=> $attributes)              
                        <div class="form-inline">
                            <div class="form-group">
                                <input type="hidden" name="variantroomid_{{$i}}[]" value="{{$variantRoomId}}">
                                <select name="room_name_{{$i}}[]" class="select2 form-control">
                                    <option value="">Select Room</option>
                                    @foreach($room_type_arr as $room_type)
                                    <option  @if($attributes['ROOMTYPEID']==$room_type['id']){{'selected'}}@endif value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                    @endforeach
                                </select>
                                <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}},this)"><i class="fa fa-plus"></i></button>
                            </div> 

                        </div>
                         @endforeach   
                    </div> 
                     <?php $i++;?>   
                    @endforeach
                    <div class="col-sm-12" id="levelblock_{{$i}}"> 
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <h3>Level {{$i}}</h3>
                                    <input type="hidden" name="floorlevel[]" value="{{$i}}">
                                </div> 
                            </div> 
                        </div>
                            
                        <div class="form-inline">
                            <div class="form-group">
                                <input type="hidden" name="variantroomid_{{$i}}[]" value="">
                                <select name="room_name_{{$i}}[]" class="select2 form-control">
                                    <option value="">Select Room</option>
                                    @foreach($room_type_arr as $room_type)
                                    <option value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                    @endforeach
                                </select>
                                <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}},this)"><i class="fa fa-plus"></i></button>
                            </div> 

                        </div>
                      
                    </div> 
                    <div class="pull-right" id="addFloorlevel">  
                        <input type="hidden" id="counter" name="counter" value="{{$i}}">
                        <button type="button" class="btn btn-small btn-default" onclick="addFloorLevel();">Add Level</button>
                    </div>
                </div> 
            </div>

            <!--End Floor Level-->
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
<script>
    var ROOMTYPES = '';
    @foreach($room_type_arr as $room_type)
    ROOMTYPES +="<option value=\"{{$room_type['id']}}\">{{$room_type['name']}}</option>";
    @endforeach
</script>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection