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
    <h2 class="inline"><span class="semi-bold">Add</span> Unit Variant</h2>
      <div class="user-description-box inline">
                <p>Unit variant defines the model of a unit type and can be reused across each unit which have the same specification.</p>
            </div>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

    <div class="grid simple">
        <div class="grid-title"  role="tab" id="headingOne">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

                <div class="pull-right"><i class="fa fa-angle-up "></i>
                    <i class="fa fa-angle-down grid-angle-down"></i>
                </div>             
                <h3>Villa <span class="semi-bold">Details</span></h3>
       
            </a>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
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
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Per sq ft Price</label>
                                <input type="text" class="form-control" name="per_sq_ft_price" value="{{ $unitVariant['per_sq_ft_price'] }}" placeholder="Enter Per sq ft Price">
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
                                @elseif('number' === $attributes['control_type'])
                                <input type="number" class="form-control" name="attributes[{{property_type_slug($attributes['label'])}}]" value="{{ $value }}" placeholder="Enter {{$attributes['label']}}">
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
    </div>
    <form method="POST" id="formroomdetails" name="formroomdetails">
        <div class="grid simple">
            <div class="grid-title" role="tab" id="headingTwo">

                <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <div class="pull-right"><i class="fa fa-angle-down grid-angle-down"></i>
                        <i class="fa fa-angle-up "></i>
                    </div>
                    <h3 class="inline">Room <span class="semi-bold">Details</span></h3>
                    <div class="user-description-box inline">
<p>Add rooms (which are created on attributes page) which are present at each level (floor).
Click on Add Level button to add new levels. </p>

         </div>
                </a>
            </div>
            <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div class="grid-body">
                    <div class="row m-t-20">
                        <?php $i = 0; ?>
                        @foreach($floorlevelRoomAttributes as $level=>$roomTypes)
                        <div class="col-sm-12" id="levelblock_{{$i}}"> 
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <h3>Level {{$i}}</h3>
                                        <input type="hidden" name="floorlevel[]" value="{{$i}}">
                                    </div> 
                                </div> 
                            </div>
                            <?php $j = 1; ?>
                            @foreach($roomTypes as $variantRoomId=> $roomType)              
                            <div class="form-inline">
                                <div class="form-group">
                                    <input type="hidden" name="variantroomid_{{$i}}[]" value="{{$variantRoomId}}">
                                    <select name="room_name_{{$i}}[]" class="select2 form-control" onchange="getRoomTypeAttributes(this,{{ $unitVariant['id'] }},{{$i}});">
                                        <option value="">Select Room</option>
                                        @foreach($room_type_arr as $room_type)
                                        <option @if($roomType['ROOMTYPEID']==$room_type['id']){{'selected'}}@endif   value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                        @endforeach
                                    </select>
                                    @if($j === count($roomTypes))
                                    <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this,{{ $unitVariant['id'] }})"><i class="fa fa-plus"></i></button>
                                    @endif
                                </div>
                            </div>
                            <div >
                                <!--Attributes-->     
                                <div class="m-t-10">
                                    <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 text-grey">	
                                        <div class="row"> 
                                            @foreach($roomTypeAttributes[$roomType['ROOMTYPEID']] as $attributes)
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">{{$attributes['label']}}</label>
                                                    <?php
                                                    $value = (isset($roomType['ATTRIBUTES'][property_type_slug($attributes['label'])])) ? $roomType['ATTRIBUTES'][property_type_slug($attributes['label'])] : ''
                                                    ?>
                                                    @if('textbox' === $attributes['control_type'])
                                                    <input type="text" class="form-control" name="attributes[{{ $i }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                                    @elseif('number' === $attributes['control_type'])
                                                    <input type="number" class="form-control" name="attributes[{{ $i }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                                    @elseif('select' === $attributes['control_type'])
                                                    <?php
                                                    $options = explode(',', $attributes['defaults']);
                                                    ?>
                                                    <select name="attributes[{{ $i }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" class="select2 form-control">
                                                        <option value="">Select {{$attributes['label']}}</option>   
                                                        @foreach($options as $option)
                                                        <option  @if($value==property_type_slug($option)){{'selected'}}@endif  value="{{property_type_slug($option)}}">{{$option}}</option>
                                                        @endforeach
                                                    </select>
                                                    @elseif('multiple' === $attributes['control_type'])
                                                    <?php
                                                    $options = explode(',', $attributes['defaults']);
                                                    ?>
                                                    <select multiple name="attributes[{{ $i }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
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
                        </div> 
                        <?php $i++; ?>   
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
                                    <select name="room_name_{{$i}}[]" class="select2 form-control" onchange="getRoomTypeAttributes(this,{{ $unitVariant['id'] }},{{$i}});">
                                        <option value="">Select Room</option>
                                        @foreach($room_type_arr as $room_type)
                                        <option value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                        @endforeach
                                    </select>

                                    <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this,{{ $unitVariant['id'] }})"><i class="fa fa-plus"></i></button>

                                </div>
                            </div>
                            <div >
                                <!--Attributes-->  
                            </div>
                        </div>
                        <div class="pull-right" id="addFloorlevel">  
                            <input type="hidden" id="counter" name="counter" value="{{$i}}">
                            <button type="button" class="btn btn-small btn-default" onclick="addFloorLevel({{ $unitVariant['id'] }});">Add Level</button>
                        </div> 
                    </div> 

                    <div class="form-actions">  
                        <div class="pull-right">
                            <button onclick="saveRoomdetails({{$project['id']}},{{ $unitVariant['id'] }});" type="button" class="btn btn-primary btn-cons">Save</button>
                        </div>
                    </div> 
                </div>

            </div>
        </div>
</div>
</form>
<div class="grid simple">
    <div class="grid-title" role="tab" id="headingThree">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <div class="pull-right"><i class="fa fa-angle-down grid-angle-down"></i>
                <i class="fa fa-angle-up "></i>
            </div>
            <h3><span class="semi-bold">Layouts</span></h3>
        </a>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree"> 
        <div class="grid-body"> 
            <h5 class="semi-bold inline">External</h5>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">3D Layout</label>
                        <div id="ext3dlayout">
                            @if(isset($levellayout['external']['3d']))
                            <img src="{{ $levellayout['external']['3d']['IMAGE'] }}" class="img-responsive img-thumbnail">
                            <button onclick="deleteLayout({{ $levellayout['external']['3d']['ID'] }}, 'external');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                            @else
                            <input id="pickfiles_ext3d" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                            <button  id="uploadfiles_ext3d"type="button" class="btn btn-small btn-primary">Upload</button>												
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @foreach($floorlevelRoomAttributes as $level=>$roomAttributes)

        <div class="grid-body">
            <form>
                <h5 class="semi-bold inline">Level {{$level}}</h5>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group object-layouts" data-object-type="2d">
                            <label class="form-label">2D Layout</label>
                            <div id="2dlayout_{{$level}}">
                                @if(isset($levellayout[$level]['2d']))
                                <img src="{{ $levellayout[$level]['2d']['IMAGE'] }}" class="img-responsive">
                                <button onclick="deleteLayout({{ $levellayout[$level]['2d']['ID'] }}, '2d');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
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
                                <button onclick="deleteLayout({{ $levellayout[$level]['3d']['ID'] }}, '3d');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
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
        <div class="grid-body"> 
            <h5 class="semi-bold inline">Gallery</h5>
                <div>
                 <input id="pickfiles_gallery" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                        <button  id="uploadfiles_gallery"type="button" class="btn btn-small btn-primary">Upload</button>
                         </div>
                <div id="galleryimages">
                            @if(isset($levellayout['gallery']))
                            @foreach($levellayout['gallery'] as $gallery)
                            <div class="col-sm-3" id="gallery_{{ $gallery['ID'] }}">   
                                <img src="{{ $gallery['IMAGE'] }}" class="img-responsive img-thumbnail">
                                <button onclick="deleteLayout({{ $gallery['ID'] }}, 'gallery');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                            </div>    
                                @endforeach									
                                @endif
                            
                        </div>         
 
            </div>
 
    </div>    

</div> 
<script>
            var ROOMTYPES = '';
            @foreach($room_type_arr as $room_type)
            ROOMTYPES += "<option value=\"{{$room_type['id']}}\">{{$room_type['name']}}</option>";
            @endforeach

            var BASEURL = '{{ url() }}';
            var FLOORLEVELS = [<?php echo implode(",", array_keys($floorlevelRoomAttributes)); ?>];
            var variantId = {{ $unitVariant['id'] }};
</script>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection