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
<div class="page-title inline">	
    <h2><span class="semi-bold">Add</span> Unit Variant</h2>
 </div>&nbsp;&nbsp;

   <a class="inline" data-toggle="popover" data-content="Unit variant defines the model of a unit type and can be reused across each unit which have the same specification." 
  data-original-title="" title=""><i class="fa fa-info"></i></a>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="grid simple">
    <div class="grid-title">
        <h3>{{ get_property_type($propertyTypeID) }} variant <span class="semi-bold">Details</span></h3>
    </div>

    <div class="grid-body">
        <form action="/admin/project/{{ $project['id'] }}/apartment-variant/{{ $unitVariant['id'] }}" method="POST" data-parsley-validate>
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
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                </div>
            </div>
        </form>
    </div>
</div>

@if($propertyTypeID ==1)
  @include('admin.project.variants.apartment.apartmentroom')
@else
    @include('admin.project.variantrooms')
@endif
 
<div class="grid simple">
    <div class="grid-title">
        <h3><span class="semi-bold">Layouts</span></h3>
    </div>

@if($propertyTypeID ==1)
  @include('admin.project.variants.apartment.apartmentlayouts')
@else
    @include('admin.project.variantlayouts')
@endif

    <div class="grid-body"> 
            <h5 class="semi-bold inline">Gallery</h5>
                <div class="m-b-15">
                 <input id="pickfiles_gallery" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/>
                        <button  id="uploadfiles_gallery"type="button" class="btn btn-small btn-primary">Upload</button>
                         </div>
                <div id="galleryimages">
                            @if(isset($layouts['gallery']))
                            @foreach($layouts['gallery'] as $gallery)
                            <div class="col-sm-3" id="gallery_{{ $gallery['ID'] }}">   
                                <img src="{{ $gallery['IMAGE'] }}" class="img-responsive">
                                <button onclick="deleteLayout({{ $gallery['ID'] }}, 'gallery');" type="button" class="btn btn-small btn-default m-t-10"><i class="fa fa-trash"></i> Delete</button>
                            </div>    
                                @endforeach									
                                @endif
                            
                        </div>         
 
            </div>


</div> 
<script>
            var ROOMTYPES = '';
            @foreach($availableRoomTypes as $roomType)
            ROOMTYPES += "<option value=\"{{$roomType['id']}}\">{{$roomType['name']}}</option>";
            @endforeach

            var BASEURL = '{{ url() }}';
            @if($propertyTypeID ==1)
              var FLOORLEVELS = ['0'];
            @else
               var FLOORLEVELS = [<?php echo implode(",", array_keys($variantRooms)); ?>];  
            @endif    
            var variantId = {{ $unitVariant['id'] }};
</script>
<!-- END PLACE PAGE CONTENT HERE -->
@endsection