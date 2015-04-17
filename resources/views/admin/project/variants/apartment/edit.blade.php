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
        <h3>Apartment variant <span class="semi-bold">Details</span></h3>
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
        <?php
        $i = 0;
        ?>
        <input type="hidden" name="floorlevel[]" value="{{$i}}">
        <div class="grid-body">
            <div class="row m-t-20">
                <?php $j = 1; ?>
                @foreach($variantRooms[0] as $roomId => $room)              
                <div class="form-inline">
                    <div class="form-group">
                        <input type="hidden" name="variantroomid_{{$i}}[]" value="{{ $roomId }}">
                        <select name="room_name_{{ $i }}[]" class="select2 form-control" onchange="getRoomTypeAttributes(this,{{ $unitVariant['id'] }},{{$i}});">
                            <option value="">Select Room</option>
                            @foreach($availableRoomTypes as $roomType)
                            <option {{ $room['ROOMTYPEID'] == $roomType['id'] ? 'selected' : '' }} value="{{ $roomType['id'] }}">
                                {{ $roomType['name'] }}
                            </option>
                            @endforeach
                        </select>
                        @if($j === count($variantRooms[0]))
                        <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this,{{ $unitVariant['id'] }})"><i class="fa fa-plus"></i></button>
                        @endif


                    </div> 
                </div>
                <div >
                    <!--Attributes-->     
                    <div class="m-t-10">
                        <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 text-grey">	
                            <div class="row"> 
                                @foreach($roomTypeAttributes[$room['ROOMTYPEID']] as $attributes)
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">{{$attributes['label']}}</label>
                                        <?php
                                        $value = (isset($room['ATTRIBUTES'][property_type_slug($attributes['label'])])) ? $room['ATTRIBUTES'][property_type_slug($attributes['label'])] : ''
                                        ?>
                                        @if('textbox' === $attributes['control_type'])
                                        <input type="text" class="form-control" name="attributes[{{ $i }}][{{ $room['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                        @elseif('number' === $attributes['control_type'])
                                        <input type="number" class="form-control" name="attributes[{{ $i }}][{{ $room['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                        @elseif('select' === $attributes['control_type'])
                                        <?php
                                        $options = explode(',', $attributes['defaults']);
                                        ?>
                                        <select name="attributes[{{ $i }}][{{ $room['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" class="select2 form-control">
                                            <option value="">Select {{$attributes['label']}}</option>   
                                            @foreach($options as $option)
                                            <option  @if($value==property_type_slug($option)){{'selected'}}@endif  value="{{property_type_slug($option)}}">{{$option}}</option>
                                            @endforeach
                                        </select>
                                        @elseif('multiple' === $attributes['control_type'])
                                        <?php
                                        $options = explode(',', $attributes['defaults']);
                                        ?>
                                        <select multiple name="attributes[{{ $i }}][{{ $room['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
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
                        </div>
                    </div>
                </div> 
                <?php $j++; ?>
                @endforeach 
                
                    <div class="form-inline">
                        <div class="form-group">
                            <input type="hidden" name="variantroomid_{{$i}}[]" value="">
                            <select name="room_name_{{$i}}[]" class="select2 form-control"  onchange="getRoomTypeAttributes(this,{{ $unitVariant['id'] }},{{$i}});">
                                <option value="">Select Room</option>
                                @foreach($availableRoomTypes as $roomType)
                                <option value="{{ $roomType['id'] }}">{{ $roomType['name'] }}</option>
                                @endforeach
                            </select>
                            <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this,{{ $unitVariant['id'] }})"><i class="fa fa-plus"></i></button>
                        </div> 
                    </div>
                    <div >
                        <!--Attributes-->  
                    </div>
               
            </div>
            <div class="form-actions">  
                <div class="pull-right">
                    <button onclick="saveRoomdetails({{$project['id']}},{{ $unitVariant['id'] }});"
                            type="button" class="btn btn-primary btn-cons">Save</button>
                </div>
            </div>   
        </div>
    </div>
</form>
 
<div class="grid simple">
    <div class="grid-title">
        <h3><span class="semi-bold">Layouts</span></h3>
    </div>
    <div class="grid-body">
        <form>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">2D Layout</label>
                        <div id="2dlayout_1">
                            @if(isset($layouts[0]['2d']))
                            <img src="{{ $layouts[0]['2d']['IMAGE'] }}" class="img-responsive img-thumbnail">
                            <button onclick="deleteLayout({{ $layouts[0]['2d']['ID'] }});" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                            @else
                            <input id="pickfiles_2d_0" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                            <button id="uploadfiles_2d_0" type="button" class="btn btn-small btn-primary">Upload</button>												
                            @endif
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">3D Layout</label>
                        <div id="3dlayout_2">
                            @if(isset($layouts[0]['3d']))
                            <img src="{{ $layouts[0]['3d']['IMAGE'] }}" class="img-responsive img-thumbnail">
                            <button onclick="deleteLayout({{ $layouts[0]['3d']['ID'] }});" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                            @else
                            <input id="pickfiles_3d_0" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                            <button  id="uploadfiles_3d_0"type="button" class="btn btn-small btn-primary">Upload</button>												
                            @endif
                        </div>
                    </div>
                </div>
            </div>

        </form>
    </div>


</div> 
<script>
            var ROOMTYPES = '';
            @foreach($availableRoomTypes as $roomType)
            ROOMTYPES += "<option value=\"{{$roomType['id']}}\">{{$roomType['name']}}</option>";
            @endforeach

            var BASEURL = '{{ url() }}';
            var FLOORLEVELS = ['0'];
            var variantId = {{ $unitVariant['id'] }};
</script>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection