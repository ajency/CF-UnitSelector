@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Villa Variants</a> </li>
    <li><a href="#" class="active">Edit Unit Variant</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Edit</span> Unit Variant</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="grid simple">
    <div class="grid-title no-border">
        <h3 > <i class="fa fa-angle-double-right text-primary"></i> Villa <span class="semi-bold">Details</span></h3>
    </div>
    <form action="/admin/project/{{ $project['id'] }}/bunglow-variant/{{ $unitVariant['id'] }}" method="POST" data-parsley-validate>
        <div class="grid-body no-border">
            <div class="row">
                <div class="col-md-12">

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Name<span class="text-primary">*</span></label>
                                
                                    <input type="text" class="form-control" name="unit_variant_name" value="{{ $unitVariant['unit_variant_name'] }}" placeholder="Enter Name" data-parsley-required>
                               
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Unit Type<span class="text-primary">*</span></label>
                                <select name="unit_type" class="select2 form-control select2-offscreen" data-parsley-required>
                                        <option value="">Select Unit Type</option>
                                        @foreach($unitTypes as $unitTypeId=> $unitType)
                                        <option  @if($unitVariant['unit_type_id']==$unitTypeId){{'selected'}}@endif  value="{{$unitTypeId}}">{{$unitType}}</option>
                                        @endforeach
                                    </select>
                                </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Carpet Area<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <input type="text" class="form-control" name="carpet_area" value="{{ $unitVariant['carpet_area'] }}" placeholder="Enter Carpet Area" data-parsley-required data-parsley-type="number">
                             </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Built Up Area<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <input type="text" class="form-control" name="builtup_area" value="{{ $unitVariant['built_up_area'] }}"  placeholder="Enter Built Up Area" data-parsley-required data-parsley-type="number">
                             </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Super Built Up Area<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <input type="text" class="form-control" name="superbuiltup_area"  value="{{ $unitVariant['super_built_up_area'] }}" placeholder="Enter Super Built Up Area" data-parsley-required data-parsley-type="number">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Price<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <input type="text" class="form-control" name="per_sq_ft_price"  value="{{ $unitVariant['per_sq_ft_price'] }}" placeholder="Enter Per sq ft Price" data-parsley-required data-parsley-type="number">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        @foreach($project_property_type_attributes as $attributes)
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">{{$attributes['label']}}</label>

                                <div>
                                    <?php
                                    $value = (isset($unitVariant['variant_attributes'][property_type_slug($attributes['label'])])) ? $unitVariant['variant_attributes'][property_type_slug($attributes['label'])] : ''
                                    ?>
                                    @if('textbox' === $attributes['control_type'])
                                    <input type="text" class="form-control" name="villa_attributes[{{property_type_slug($attributes['label'])}}]" value="{{ $value }}" placeholder="Enter {{$attributes['label']}}">
                                    @elseif('number' === $attributes['control_type'])
                                    <input type="number" class="form-control" name="villa_attributes[{{property_type_slug($attributes['label'])}}]" value="{{ $value }}" placeholder="Enter {{$attributes['label']}}">
                                    @elseif('select' === $attributes['control_type'])
                                    <?php
                                    $options = explode(',', $attributes['defaults']);
                                    ?>
                                    <select name="villa_attributes[{{property_type_slug($attributes['label'])}}]" class="select2 form-control">
                                        <option value="">Select {{$attributes['label']}}</option>   
                                        @foreach($options as $option)
                                        <option @if($value==property_type_slug($option)){{'selected'}}@endif  value="{{property_type_slug($option)}}">{{$option}}</option>
                                        @endforeach
                                    </select>
                                    @elseif('multiple' === $attributes['control_type'])
                                    <?php
                                    $options = explode(',', $attributes['defaults']);
                                    ?>
                                    <select multiple name="villa_attributes[{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
                                        <option value="">Select {{$attributes['label']}}</option>   
                                        @foreach($options as $option)
                                        <option {{ (!empty($value) && in_array(property_type_slug($option),$value)) ? 'selected="selected"' : '' }}  value="{{property_type_slug($option)}}">{{$option}}</option>
                                        @endforeach
                                    </select>
                                    @endif     
                                </div>
                            </div>
                        </div>
                        @endforeach
                        @foreach($projectAttributes as $attribute)
                        <?php
                        $value = (isset($unitVariant['variant_attributes'][property_type_slug($attribute['label'])])) ? $unitVariant['variant_attributes'][property_type_slug($attribute['label'])] : ''
                        ?>
                        <div class="col-md-4">
                            <div class="form-group">
                                <div class="checkbox check-primary pull-left" >    
                                    <input @if($value== $attribute['label']){{'checked'}}@endif type="checkbox" id="{{$attribute['label']}}" value="{{$attribute['label']}}" name="villa_attributes[{{property_type_slug($attribute['label'])}}]" aria-label="...">
                                    <label for="{{$attribute['label']}}">{{$attribute['label']}}</label> 
                                 </div>
                            </div>
                        </div>
                        @endforeach
                    </div>

                </div>
            </div>
            <hr/>
             <?php $i = 1; ?>
            @include('admin.project.variantrooms')
            
            <input type="hidden" id="counter" name="counter" value="{{$i}}">
            <hr/>
            <div>
                <div class="m-l-5 no-border">
                    <h3><i class="fa fa-angle-double-right text-primary"></i><span class="semi-bold"> Views</span></h3>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="grid simple">
                            <div class="grid-title no-border">
                                <h4 style="margin-left:10px;">
                                    External <span class="semi-bold">3D</span>

                                </h4>
                            </div>
                            <div class="grid-body no-border" id="3d_external_img">
                                @if(isset($layouts['external']['3d']))
                                <div class="col-md-3" >
                                    <div class="img-hover img-thumbnail">
                                        <a class="btn btn-link btn-danger overlay" onclick="deleteLayout({{ $layouts['external']['3d']['ID'] }}, 'external');"><i class="fa fa-close text-primary"></i></a>
                                        <img style="width:150px;height:93px;" id="svg1" src="{{ $layouts['external']['3d']['IMAGE'] }}"   />
                                    </div>
                                </div>
                                @else
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
                                @endif

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
                                    @if(isset($layouts['gallery']))
                                    @foreach($layouts['gallery'] as $gallery)

                                    <div class="col-md-3 gallery"  id="gallery_{{ $gallery['ID'] }}">
                                        <div class="img-hover img-thumbnail">
                                            <a class="btn btn-link btn-danger overlay" onclick="deleteLayout({{ $gallery['ID'] }}, 'gallery');"><i class="fa fa-close text-primary"></i></a>
                                            <img style="width:150px;height:93px;" id="svg1" src="{{ $gallery['IMAGE'] }}"   />
                                        </div>
                                    </div>
                                    @endforeach									
                                    @endif  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>   <div class="form-actions">  
                <div class="text-right">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <input type="hidden" name="_method" value="PUT">
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>

                    <a  href=""><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                </div>
            </div>
            <!-- END PLACE PAGE CONTENT HERE -->
        </div>
</div>
</form>
<!-- END PAGE CONTAINER -->
</div>

<div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title text-left" id="myModalLabel">Add New Room</h4>
            </div>
            <div class="modal-body">
                <iframe level="" id="roomtypeiframe" width="100%" src="/admin/project/{{ $project['id']}}/roomtype/create"></iframe>
            </div>
            <!--<div class="modal-footer">
                <button type="button" onClick="updateRoomAttributes();" class="btn btn-primary updateattribute hidden"><i class="fa fa-check"></i> Update Room Attributes</button>
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>

            </div>-->

        </div>
    </div>
</div>


<!-- END PLACE PAGE CONTENT HERE -->
<script>
    var BASEURL = '{{ url() }}';
    var FLOORLEVELS = [<?php echo implode(",", array_keys($variantRooms)); ?>];
    var variantId = {{ $unitVariant['id'] }};
    function openRoomTypeModal(obj, id)
    {
    if (obj.value == 'add_new')
            $('#myModal').modal('show');
            else
    {
    if (id)
    {
    $("#roomtypeiframe").attr("src", "/admin/project/{{ $project['id']}}/roomtype/" + id + "/edit?flag=edit");
            $(".updateattribute").removeClass("hidden");
            $('#myModal').modal('show');
    }
    }

             var level = $(obj).closest('.row').find('input[name="levels[]"]').val();
            $("#roomtypeiframe").attr("level", level);
            $("#roomtypeiframe").attr("roomid", id);
    }


</script>


@endsection



