@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Villa Variants</a> </li>
    <li><a href="#" class="active">Add Unit Variants</a> </li>
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
    <div class="grid-title no-border">
        <h3 > <i class="fa fa-angle-double-right text-primary"></i> Villa <span class="semi-bold">Details</span></h3>
    </div>
    <form action="/admin/project/{{ $project['id'] }}/bunglow-variant" method="POST" data-parsley-validate>
        <div class="grid-body no-border">
            <div class="row">
                <div class="col-md-12">

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Name<span class="text-primary">*</span></label>
                                <div class="input-with-icon">
                                    <input type="text" class="form-control" name="unit_variant_name" placeholder="Enter Name" data-parsley-required>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Unit Type<span class="text-primary">*</span></label>
                                <div class="input-with-icon">

                                    <select name="unit_type" class="select2 form-control select2-offscreen" data-parsley-required>
                                        <option value="">Select Unit Type</option>
                                        @foreach($unitTypes as $unitTypeId=> $unitType)
                                        <option value="{{$unitTypeId}}">{{$unitType}}</option>
                                        @endforeach
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Carpet Area<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <div class="input-with-icon">
                                    <input type="text" class="form-control" name="carpet_area" value="" placeholder="Enter Carpet Area" data-parsley-required data-parsley-type="number">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Built Up Area<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <div class="input-with-icon">
                                    <input type="text" class="form-control" name="builtup_area" value="" placeholder="Enter Built Up Area" data-parsley-required data-parsley-type="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Super Built Up Area<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <div class="input-with-icon">
                                    <input type="text" class="form-control" name="superbuiltup_area" value="" placeholder="Enter Super Built Up Area" data-parsley-required data-parsley-type="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Price<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <div class="input-with-icon">
                                    <input type="text" class="form-control" name="per_sq_ft_price" value="" placeholder="Enter Per sq ft Price" data-parsley-required data-parsley-type="number">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        @foreach($project_property_type_attributes as $attributes)
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">{{$attributes['label']}}</label>

                                <div class="input-with-icon">
                                    @if('textbox' === $attributes['control_type'])
                                    <input type="text" class="form-control" name="villa_attributes[{{property_type_slug($attributes['label'])}}]"  placeholder="Enter {{$attributes['label']}}">
                                    @elseif('number' === $attributes['control_type'])
                                    <input type="number" class="form-control" name="villa_attributes[{{property_type_slug($attributes['label'])}}]" value="" placeholder="Enter {{$attributes['label']}}">
                                    @elseif('select' === $attributes['control_type'])
                                    <?php
                                    $options = explode(',', $attributes['defaults']);
                                    ?>
                                    <select name="villa_attributes[{{property_type_slug($attributes['label'])}}]" class="select2 form-control select2-offscreen">
                                        <option value="">Select {{$attributes['label']}}</option>   
                                        @foreach($options as $option)
                                        <option  value="{{property_type_slug($option)}}">{{$option}}</option>
                                        @endforeach
                                    </select>
                                    @elseif('multiple' === $attributes['control_type'])
                                    <?php
                                    $options = explode(',', $attributes['defaults']);
                                    ?>
                                    <select multiple name="villa_attributes[{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
                                        <option value="">Select {{$attributes['label']}}</option>   
                                        @foreach($options as $option)
                                        <option value="{{property_type_slug($option)}}">{{$option}}</option>
                                        @endforeach
                                    </select>
                                    @endif  
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>

                </div>
            </div>
            <hr/>
            <div id="addFloorlevel"> 
                <?php $i = 1; ?>
                <div class="row" id="level_0">
                    <div class="m-l-5 no-border">
                        <button type="button" class="btn btn-small btn-default pull-right m-r-25 add_level" ><i class="fa fa-plus"></i> Add New Level</button>
                        <h3><i class="fa fa-angle-double-right text-primary"></i> Room <span class="semi-bold">Details</span></h3>
                    </div>
                    <div class="grid simple" style="margin-bottom:0;">
                        <div class="grid-body no-border" style="padding-bottom:0;">
                            <div class="grid simple vertical orange">
                                <div class="grid-title">
                                    <h4>Level 0</h4>
                                    <input type="hidden" value="0" name="levels[]">
                                </div>
                                <div class="grid-body"><h4> <span class="semi-bold">Layouts</span></h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="grid simple">
                                                <div class="grid-body">
                                                    <div class="inline">2D Layout</div>
                                                    <input type="hidden" name="image_0_2d_id" id="image_0_2d_id" value=""> 
                                                    <div class="pull-right" id="2d_0_image">

                                                        <div class="img-hover img-thumbnail">
                                                            <div id="pickfiles_0_2d" style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                                                <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                    <i class="fa fa-image" style="font-size:30px;"></i>
                                                                    <p class="">Select File</p>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="grid simple" >
                                                <div class="grid-body">
                                                    <div class="inline">3D Layout</div>
                                                    <input type="hidden" name="image_0_3d_id" id="image_0_3d_id" value="">            
                                                    <div class="pull-right" id="3d_0_image">
                                                        <div class="img-hover img-thumbnail">
                                                            <div id="pickfiles_0_3d" style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                                                <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                    <i class="fa fa-image" style="font-size:30px;"></i>
                                                                    <p class="">Select File</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row user-description-box">
                                        <div class="col-md-4">
                                            <div>
                                                <label class="form-label">Select Room</label>
                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <select name="room_type[]" onchange="openRoomTypeModal(this, 0)" class="select2 form-control">
                                                            <option value="">Select Room</option>
                                                            @foreach($availableRoomTypes as $room_type)
                                                            <option value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                                            @endforeach
                                                            <option value="add_new">Add New</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <button type="button" onclick="getRoomTypeAttributes(this, 0);" class="btn btn-white"><i class="fa fa-plus inline"></i> Add Room to Level</button>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                        <div class="col-md-8"></div>
                                    </div>
                                    <div class="room_attributes_block">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="level_1">
                    <div class="no-border">

                        <div class="grid simple" style="margin-bottom:0;">
                            <div class="grid-body no-border" style="padding-bottom:0;">
                                <div class="grid simple vertical orange">
                                    <div class="grid-title">
                                        <h4>Level 1</h4>
                                        <input type="hidden" value="1" name="levels[]">
                                    </div>
                                    <div class="grid-body"><h4> <span class="semi-bold">Layouts</span></h4>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="grid simple">
                                                    <div class="grid-body">
                                                        <div class="inline">2D Layout</div>
                                                        <input type="hidden" name="image_1_2d_id" id="image_1_2d_id" value="">   
                                                        <div class="pull-right" id="2d_1_image">
                                                            <div class="img-hover img-thumbnail">
                                                                <div id="pickfiles_1_2d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                                                    <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                        <i class="fa fa-image" style="font-size:30px;"></i>
                                                                        <p class="">Select File</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="grid simple" >
                                                    <div class="grid-body">
                                                        <div class="inline">3D Layout</div>
                                                        <input type="hidden" name="image_1_3d_id" id="image_1_3d_id" value="">    
                                                        <div class="pull-right" id="3d_1_image">
                                                            <div class="img-hover img-thumbnail">
                                                                <div id="pickfiles_1_3d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                                                    <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                        <i class="fa fa-image" style="font-size:30px;"></i>
                                                                        <p class="">Select File</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row user-description-box">
                                            <div class="col-md-4">
                                                <div>
                                                    <label class="form-label">Select Room</label>
                                                    <div class="row">
                                                        <div class="col-md-9">
                                                            <select onchange="openRoomTypeModal(this, 0)" name="room_type[]" class="select2 form-control">
                                                                <option value="">Select Room</option>
                                                                @foreach($availableRoomTypes as $room_type)
                                                                <option  value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                                                @endforeach
                                                                <option value="add_new">Add New</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <button type="button" onclick="getRoomTypeAttributes(this, 1);" class="btn btn-white"><i class="fa fa-plus inline"></i> Add Room to Level</button>
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div class="col-md-8"></div>
                                        </div>

                                        <div class="room_attributes_block">

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <input type="hidden" id="counter" name="counter" value="{{$i}}">
            <hr/>
            <div>
                <div class="m-l-5 no-border">
                    <h3><i class="fa fa-angle-double-right text-primary"></i><span class="semi-bold"> Layouts</span></h3>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="grid simple">
                            <div class="grid-title no-border">
                                <h4 style="margin-left:10px;">
                                    External <span class="semi-bold">3D</span>
                                    <input type="hidden" name="image_external_3d_id" id="image_external_3d_id" value="">    
                                </h4>
                            </div>
                            <div class="grid-body no-border" id="3d_external_img">
                                <div class="col-md-3" >
       
                                    <div class="img-hover img-thumbnail">
                                        <div id="pickfiles_ext3d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                            <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                <i class="fa fa-image" style="font-size:30px;"></i>
                                                <p class="">Select File</p>
                                            </div>
                                        </div>
                                    </div>

                                                         
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-md-12">
                        <div class="grid simple">
                            <div class="grid-title no-border">

                                <h4 style="margin-left:10px;" class="inline">
                                    <span class="semi-bold">Gallery</span>&nbsp;
                                    <a id="pickfiles_gallery" class="file-input-wrapper btn btn-default  btn btn-small"><i class="fa fa-image"></i> Select file (s)</a>
                                </h4>

                            </div>
                            <div class="grid-body no-border">
                                <div class="row" id="variant_gallery">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>   <div class="form-actions">  
                <div class="text-right">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>

                    <button  type="button" onclick="saveVariantConfig();" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>

                    <a  href=""><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                </div>
            </div>
            <!-- END PLACE PAGE CONTENT HERE -->
        </div>
</div>
</form>
<!-- END PAGE CONTAINER -->
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title text-left" id="myModalLabel">Room Details</h4>
            </div>
            <div class="modal-body">
                <iframe level="" id="roomtypeiframe" width="100%" src="/admin/project/{{ $project['id']}}/roomtype/create"></iframe>
            </div>
            <div class="modal-footer">
                <button type="button" onClick="updateRoomAttributes();" class="btn btn-primary updateattribute hidden"><i class="fa fa-check"></i> Update Room Attributes</button>
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>

            </div>

        </div>
    </div>
</div>


<!-- END PLACE PAGE CONTENT HERE -->
<script>
    var BASEURL = '{{ url() }}';
    var FLOORLEVELS = ['0', '1'];
    var variantId = 0;
    

    function openRoomTypeModal(obj, id)
    {
        if (obj.value == 'add_new')
        {
                $('#myModal').modal('show');
                $("#roomtypeiframe").attr("src", "/admin/project/{{ $project['id']}}/roomtype/create");
            }
         else
        {
            if(id)
            {
                $("#roomtypeiframe").attr("src", "/admin/project/{{ $project['id']}}/roomtype/" + id + "/edit");
                $(".updateattribute").removeClass("hidden");
                $('#myModal').modal('show');
            }
        }
        
       var level= $(obj).closest('.row').find('input[name="levels[]"]').val();
       $("#roomtypeiframe").attr("level", level);
       $("#roomtypeiframe").attr("roomid", id);
    }
    
    
</script>

@endsection



