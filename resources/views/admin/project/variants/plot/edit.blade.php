@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Plot Variants</a> </li>
    <li><a href="#" class="active">Add Unit Variants</a> </li>
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
    @include('admin.project.flashmessage')
    <div class="grid-title no-border">
        <h3 > <i class="fa fa-angle-double-right text-primary"></i> Plot <span class="semi-bold">Details</span></h3>
    </div>
    <form action="/admin/project/{{ $project['id'] }}/plots-variant/{{ $unitVariant['id'] }}" method="POST" data-parsley-validate>
        <div class="grid-body no-border">
            <div class="row">
                <div class="col-md-12">

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Name<span class="text-primary">*</span></label>
                                <input type="text" class="form-control m-b-5" name="unit_variant_name" placeholder="Enter Name"  value="{{ $unitVariant['unit_variant_name'] }}" data-parsley-required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Unit Type<span class="text-primary">*</span></label>

                                <select name="unit_type" class="select2 form-control select2-offscreen m-b-5" data-parsley-required>
                                        <option value="">Select Unit Type</option>
                                        @foreach($unitTypes as $unitTypeId=> $unitType)
                                        <option @if($unitVariant['unit_type_id']==$unitTypeId){{'selected'}}@endif value="{{$unitTypeId}}">{{ $unitType }}</option>
                                        @endforeach
                                    </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Size<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <input type="text" class="form-control m-b-5" name="size" value="{{ $unitVariant['size'] }}" placeholder="Enter Size" data-parsley-required data-parsley-type="number">
                           </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Price<span class="text-primary">*</span></label>
                                <input type="text" class="form-control m-b-5" name="per_sq_ft_price" value="{{ $unitVariant['per_sq_ft_price'] }}" placeholder="Enter Per sq ft Price" data-parsley-required data-parsley-type="number">
                           </div>
                        </div>
                        @foreach($propertyTypeAttributes as $propertyTypeAttribute)
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">{{ $propertyTypeAttribute['label'] }}<span class="text-primary">*</span></label> 
                                <?php
                                $value = (isset($unitVariant['variant_attributes'][ $propertyTypeAttribute['label'] ])) ? $unitVariant['variant_attributes'][ $propertyTypeAttribute['label'] ] : ''
                                ?>
                                @if('textbox' === $propertyTypeAttribute['control_type'])
                                <input type="text" class="form-control m-b-5" name="attributes[{{ $propertyTypeAttribute['label'] }}]" value="{{ $value }}" placeholder="Enter {{ $propertyTypeAttribute['label'] }}" data-parsley-required>
                                @elseif('number' === $propertyTypeAttribute['control_type'])
                                <input type="text" class="form-control m-b-5" name="attributes[{{ $propertyTypeAttribute['label'] }}]" value="{{ $value }}" placeholder="Enter {{ $propertyTypeAttribute['label'] }}" data-parsley-required data-parsley-type="number" data-parsley-min="0">
                                @elseif('select' === $propertyTypeAttribute['control_type'])
                                <?php
                                $options = explode(',', $propertyTypeAttribute['defaults']);
                                ?>
                                <select name="attributes[{{ $propertyTypeAttribute['label'] }}]" class="select2 form-control m-b-5" data-parsley-required>
                                    <option value="">Select {{ $propertyTypeAttribute['label'] }}</option>   
                                    @foreach($options as $option)
                                    <option @if($value== $option ){{'selected'}}@endif  value="{{ $option }}">{{ $option }}</option>
                                    @endforeach
                                </select>
                                @elseif('multiple' === $propertyTypeAttribute['control_type'])
                                <?php
                                $options = explode(',', $propertyTypeAttribute['defaults']);
                                ?>
                                <select multiple name="attributes[{{ $propertyTypeAttribute['label'] }}][]" class="select2 form-control m-b-5" data-parsley-required>
                                    <option value="">Select {{ $propertyTypeAttribute['label'] }}</option>   
                                    @foreach($options as $option)
                                    <option {{ (!empty($value) && in_array( $option ,$value)) ? 'selected="selected"' : '' }}  value="{{ $option }}">{{ $option }}</option>
                                    @endforeach
                                </select>
                                @endif
                            </div> 
                        </div>
                        @endforeach  
                    </div>

                </div>
            </div>
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
                            <div class="grid-body no-border" id="3d_external_image">
                                @if(isset($layouts['external']['3d']))
                                 
                                    <div class="img-hover img-thumbnail"  id="3d-{{ $layouts['external']['3d']['ID'] }}" data-level="external">
                                        <a class="btn btn-link btn-danger overlay" onclick="deleteLayout({{ $layouts['external']['3d']['ID'] }}, 'external');"><i class="fa fa-close text-primary"></i></a>
                                        <img style="width:150px;height:93px;" id="svg1" src="{{ $layouts['external']['3d']['IMAGE'] }}"   />
                                    </div>
                           
                               @endif
                                 
                                    <div class="img-hover img-thumbnail upload-img-block {{(isset($layouts['external']['3d']))? 'hidden':'' }}">
                                        <div id="pickfiles_ext3d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;" tabindex="0">
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
                <hr/>
                <div class="row">
                    <div class="col-md-12">
                        <div class="grid simple">
                            <div class="grid-title no-border">

                                <h4 style="margin-left:10px;" class="inline">
                                    <span class="semi-bold">Gallery</span>&nbsp;
                                    <button type="button"id="pickfiles_gallery" class="file-input-wrapper btn btn-default  btn btn-small"><i class="fa fa-image" ></i> Select file (s)</button>
                                </h4>

                            </div>
                            <div class="grid-body no-border">
                                <div class="row" id="variant_gallery">
                                    @if(isset($layouts['gallery']))
                                    @foreach($layouts['gallery'] as $gallery)

                                    <div class="col-md-3 gallery"  id="gallery-{{ $gallery['ID'] }}">
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
                    <button  type="submit"   class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                    <button type="button" class="btn btn-danger btn-cons delete-varint" data-variant-id="{{  $unitVariant['id'] }} " data-variant-type="plots-variant">Delete</button> 
                    <a  href="{{ url('/admin/project/'. $project['id'] .'/plot-variant') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button></a>
                </div>
            </div>
            <!-- END PLACE PAGE CONTENT HERE -->
        </div>
</div>
</form>
<!-- END PAGE CONTAINER -->
</div>



<!-- END PLACE PAGE CONTENT HERE -->
<script>
    var BASEURL = '{{ url() }}';
    var variantId = {{ $unitVariant['id'] }};

</script>

@endsection



