@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Plot Variants</a> </li>
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
    <div class="grid-title no-border">
        <h3 > <i class="fa fa-angle-double-right text-primary"></i> Plot <span class="semi-bold">Details</span></h3>
    </div>
    <form action="/admin/project/{{ $project['id'] }}/plots-variant" method="POST" data-parsley-validate>
        <div class="grid-body no-border">
            <div class="row">
                <div class="col-md-12">

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Name<span class="text-primary">*</span></label>
                                <input type="text" class="form-control m-b-5" name="unit_variant_name" placeholder="Enter Name" data-parsley-required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Unit Type<span class="text-primary">*</span></label>

                                <select name="unit_type" class="select2 form-control select2-offscreen m-b-5" data-parsley-required>
                                        <option value="">Select Unit Type</option>
                                        @foreach($unitTypes as $unitTypeId=> $unitType)
                                        <option value="{{$unitTypeId}}">{{ $unitType }}</option>
                                        @endforeach
                                    </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Size<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <input type="text" class="form-control m-b-5" name="size" value="" placeholder="Enter Size" data-parsley-required data-parsley-type="number">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Price<span class="text-primary">*</span></label>
                                <small class="text-muted">/ ({{ $project['measurement_units'] }})</small>
                                <input type="text" class="form-control m-b-5" name="per_sq_ft_price" value="" placeholder="Enter Per sq ft Price" data-parsley-required data-parsley-type="number">
                            </div>
                        </div>
                        @foreach($propertyTypeAttributes as $propertyTypeAttribute)
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">{{ $propertyTypeAttribute['label'] }}<span class="text-primary">*</span></label> 
                                @if('textbox' === $propertyTypeAttribute['control_type'])
                                <input type="text" class="form-control m-b-5" name="attributes[{{ $propertyTypeAttribute['label'] }}]"  placeholder="Enter {{ $propertyTypeAttribute['label'] }}" data-parsley-required>
                                @elseif('number' === $propertyTypeAttribute['control_type'])
                                <input type="number" class="form-control m-b-5" name="attributes[{{ $propertyTypeAttribute['label'] }}]" value="" placeholder="Enter {{ $propertyTypeAttribute['label'] }}" data-parsley-required data-parsley-type="number">
                                @elseif('select' === $propertyTypeAttribute['control_type'])
                                <?php
                                $options = explode(',', $propertyTypeAttribute['defaults']);
                                ?>
                                <select name="attributes[{{ $propertyTypeAttribute['label'] }}]" class="select2 form-control m-b-5" data-parsley-required>
                                    <option value="">Select {{$propertyTypeAttribute['label']}}</option>   
                                    @foreach($options as $option)
                                    <option  value="{{ $option }}">{{ $option }}</option>
                                    @endforeach
                                </select>
                                @elseif('multiple' === $propertyTypeAttribute['control_type'])
                                <?php
                                $options = explode(',', $propertyTypeAttribute['defaults']);
                                ?>
                                <select multiple name="attributes[{{ $propertyTypeAttribute['label'] }}][]" class="select2 form-control m-b-5" data-parsley-required>
                                    <option value="">Select {{ $propertyTypeAttribute['label'] }}</option>   
                                    @foreach($options as $option)
                                    <option value="{{ $option }}">{{ $option }}</option>
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
                    <button  type="submit"   class="btn btn-primary btn-cons"><i class="fa fa-plus-circle"></i> Create</button>
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
    var variantId = 0;

</script>

@endsection



