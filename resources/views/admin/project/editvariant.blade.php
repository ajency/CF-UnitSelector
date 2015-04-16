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
                        <label class="form-label">Unit Type</label>
                        <select name="unit_type" class="select2 form-control" data-parsley-required>
                            <option value="">Select Unit Type</option>
                            @foreach($unit_type_arr as $unit_type)
                            <option  @if($unitVariant['unit_type_id']==$unit_type['id']){{'selected'}}@endif  value="{{$unit_type['id']}}">{{$unit_type['unittype_name']}}</option>
                            @endforeach
                        </select>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Carpet Area</label>
                        <input type="text" class="form-control" name="carpet_area" value="{{ $unitVariant['carpet_area'] }}" placeholder="Enter Carpet Area">
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Built Up Area</label>
                        <input type="text" class="form-control" name="builtup_area" value="{{ $unitVariant['built_up_area'] }}" placeholder="Enter Built Up Area">
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Super Built Up Area</label>
                        <input type="text" class="form-control" name="superbuiltup_area" value="{{ $unitVariant['super_built_up_area'] }}" placeholder="Enter Super Built Up Area">
                    </div> 
                </div>

                @foreach($project_property_type_attributes as $attributes)
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">{{$attributes['label']}}</label>
                        <?php
                        $value = (isset($unitVariant['variant_attributes'][property_type_slug($attributes['label'])])) ? $unitVariant['variant_attributes'][property_type_slug($attributes['label'])] : ''
                        ?>
                        @if('textbox' === $attributes['control_type'])
                        <input type="text" class="form-control" name="attributes[{{property_type_slug($attributes['label'])}}]" value="{{ $value }}" placeholder="Enter {{$attributes['label']}}">
                        @elseif('select' === $attributes['control_type'])
                        <?php
                        $options = explode(',', $attributes['defaults']);
                        ?>
                        <select name="attributes[{{property_type_slug($attributes['label'])}}]" class="select2 form-control">
                            <option value="">Select {{$attributes['label']}}</option>   
                            @foreach($options as $option)
                            <option @if($value==property_type_slug($option)){{'selected'}}@endif  value="{{property_type_slug($option)}}">{{$option}}</option>
                            @endforeach
                        </select>
                        @elseif('multiple' === $attributes['control_type'])
                        <?php
                        $options = explode(',', $attributes['defaults']);
                        ?>
                        <select multiple name="attributes[{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
                            <option value="">Select {{$attributes['label']}}</option>   
                            @foreach($options as $option)
                            <option {{ (!empty($value) && in_array(property_type_slug($option),$value)) ? 'selected="selected"' : '' }}  value="{{property_type_slug($option)}}">{{$option}}</option>
                            @endforeach
                        </select>
                        @endif        
                    </div> 
                </div>
                @endforeach


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
<form method="POST" id="formroomdetails" name="formroomdetails">
    <div class="grid simple">
        <div class="grid-title">
            <h3>Room <span class="semi-bold">Details</span></h3>
        </div>

        <div class="grid-body">
            <div class="row m-t-20">

                <?php $i = 0; ?>
                @foreach($floorlevelRoomAttributes as $level=>$roomAttributes)
                <div class="col-sm-12" id="levelblock_{{$i}}"> 
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <h3>Level {{$i}}</h3>
                                <input type="hidden" name="floorlevel" value="{{$i}}">
                            </div> 
                        </div> 
                    </div>
                    @foreach($roomAttributes as $variantRoomId=> $attributes)              
                    <div class="form-inline">
                        <div class="form-group">
                            <input type="hidden" name="variantroomid_{{$i}}" value="{{$variantRoomId}}">
                            <select name="room_name_{{$i}}" class="select2 form-control">
                                <option value="">Select Room</option>
                                @foreach($room_type_arr as $room_type)
                                <option  @if($attributes['ROOMTYPEID']==$room_type['id']){{'selected'}}@endif value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                @endforeach
                            </select>
                            <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this)"><i class="fa fa-plus"></i></button>
                        </div> 

                    </div>
                    @endforeach   
                </div> 
                <?php $i++; ?>   
                @endforeach
                <div class="col-sm-12" id="levelblock_{{$i}}"> 
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <h3>Level {{$i}}</h3>
                                <input type="hidden" name="floorlevel" value="{{$i}}">
                            </div> 
                        </div> 
                    </div>

                    <div class="form-inline"> 
                        <div class="row">
                        <div class="col-md-4">
                        <div class="form-group full-width">
                            <input type="hidden" name="variantroomid_{{$i}}" value="">
                            <div class="full-width">
                            <select name="room_name_{{$i}}" class="select2 form-control">
                                <option value="">Select Room</option>
                                @foreach($room_type_arr as $room_type)
                                <option value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                @endforeach
                            </select>
                            <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this)"><i class="fa fa-plus"></i></button>
                        </div>
                        </div> 
                       
</div>  <div class="col-md-8"></div>
                    </div>
</div>
                </div> 
                <div class="pull-right" id="addFloorlevel">  
                    <input type="hidden" id="counter" name="counter" value="{{$i}}">
                    <button type="button" class="btn btn-small btn-default" onclick="addFloorLevel();">Add Level</button>
                </div>

            </div>




            <div class="form-actions">  
                <div class="pull-right">
                    <button onclick="saveRoomdetails({{$project['id']}},{{ $unitVariant['id'] }});" type="button" class="btn btn-primary btn-cons">Save</button>
                </div>
            </div>   
        </div>
    </div>
</form>

<div class="grid simple">
    <div class="grid-title">
        <h3><span class="semi-bold">Layouts</span></h3>
    </div>
    @foreach($floorlevelRoomAttributes as $level=>$roomAttributes)
    <div class="grid-body">
        <form>
            <h5 class="semi-bold inline">Level {{$level}}</h5>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">2D Layout</label>
                        <div id="2dlayout_{{$level}}">
                            @if(isset($levellayout[$level]['2d']))
                                <img src="{{ $levellayout[$level]['2d']['IMAGE'] }}" class="img-responsive img-thumbnail">
                                <button onclick="deleteLayout({{ $levellayout[$level]['2d']['ID'] }});" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                            @else
                            <input id="pickfiles_2d_{{$level}}" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                            <button id="uploadfiles_2d_{{$level}}" type="button" class="btn btn-small btn-primary">Upload</button>												
                            @endif
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">3D Layout</label>
                        <div id="3dlayout_{{$level}}">
                            @if(isset($levellayout[$level]['3d']))
                                <img src="{{ $levellayout[$level]['3d']['IMAGE'] }}" class="img-responsive img-thumbnail">
                                <button onclick="deleteLayout({{ $levellayout[$level]['3d']['ID'] }});" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                            @else
                            <input id="pickfiles_3d_{{$level}}" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                            <button  id="uploadfiles_3d_{{$level}}"type="button" class="btn btn-small btn-primary">Upload</button>												
                            @endif
                        </div>
                    </div>
                </div>
            </div>
 
        </form>
    </div>
    @endforeach
    
    
</div> 
<script>  
var ROOMTYPES = '';
@foreach($room_type_arr as $room_type)
ROOMTYPES += "<option value=\"{{$room_type['id']}}\">{{$room_type['name']}}</option>";
@endforeach

var BASEURL = '{{ url() }}';
var FLOORLEVELS = [<?php echo implode(",",  array_keys($floorlevelRoomAttributes));?>]; 
var variantId = {{ $unitVariant['id'] }};
</script>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection