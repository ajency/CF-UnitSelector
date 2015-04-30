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
    <h2 ><span class="semi-bold">Add</span> Unit Variant</h2>
</div>&nbsp;&nbsp;
<a class="inline" data-toggle="popover" data-trigger="hover" data-content="Unit variant defines the model of a unit type and can be reused across each unit which have the same specification." data-original-title="" title=""><i class="fa fa-info"></i></a>

<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

    <div class="grid simple">
        <div class="grid-title"  role="tab" id="headingOne">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

                <div class="pull-right"><i class="fa fa-angle-up "></i>
                    <i class="fa fa-angle-down grid-angle-down"></i>
                </div>             
                <h3>Plot <span class="semi-bold">Details</span></h3>

            </a>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="grid-body">
                <form action="/admin/project/{{ $project['id'] }}/plot-variant/{{ $unitVariant['id'] }}" method="POST" data-parsley-validate>
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
                                <label class="form-label">Size</label>
                                <input type="text" class="form-control" name="size" value="{{ $unitVariant['size'] }}" placeholder="Enter Carpet Area" data-parsley-required>
                            </div> 
                        </div>
                         
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Per sq ft Price</label>
                                <input type="text" class="form-control" name="per_sq_ft_price" value="{{ $unitVariant['per_sq_ft_price'] }}" placeholder="Enter Per sq ft Price" data-parsley-required>
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
                            <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
 

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
                                @if(isset($layouts['external']['3d']))
                                <img src="{{ $layouts['external']['3d']['IMAGE'] }}" class="img-responsive img-thumbnail">
                                <button onclick="deleteLayout({{ $layouts['external']['3d']['ID'] }}, 'external');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>     
                                @else
                                <input id="pickfiles_ext3d" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                                <button  id="uploadfiles_ext3d"type="button" class="btn hidden btn-small btn-primary">Upload</button>												
                                <div class="row selectedImages">
                                </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
            <div class="grid-body"> 
                <h5 class="semi-bold inline">Gallery</h5>
                <div>
                    <input id="pickfiles_gallery" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                    <button  id="uploadfiles_gallery"type="button" class="btn btn-small hidden btn-primary">Upload</button>
                    <div class="row selectedImages">
                    </div>         
                </div>
                <div id="galleryimages">
                    @if(isset($layouts['gallery']))
                    @foreach($layouts['gallery'] as $gallery)
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
        var BASEURL = '{{ url() }}';
        var FLOORLEVELS = [0];
        var variantId = {{ $unitVariant['id'] }};
    </script>
    <!-- END PLACE PAGE CONTENT HERE -->
    @endsection