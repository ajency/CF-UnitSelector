@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#"> Variants</a> </li>
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
        <h3><i class="fa fa-angle-double-right text-primary"></i> Plot <span class="semi-bold">Details</span></h3>
    </div>

    <div class="grid-body no-border">
        <form action="/admin/project/{{ $project['id'] }}/plot-variant" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name<span class="text-primary">*</span></label>
                        <input type="text" class="form-control" name="unit_variant_name" placeholder="Enter Name" data-parsley-required>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Type<span class="text-primary">*</span></label>
                        <select name="unit_type" class="select2 form-control m-b-5" data-parsley-required>
                            <option value="">Select Unit Type</option>
                            @foreach($unit_type_arr as $unit_type)
                            <option value="{{$unit_type['id']}}">{{$unit_type['unittype_name']}}</option>
                            @endforeach
                        </select>
                        <input type="hidden" name="property_type" id="property_type" value="{{ $projectPropertyTypeID }}">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseUnitType" aria-expanded="true" aria-controls="collapseOne">+ Add Unit Type</a>
                        <div id="collapseUnitType" class="panel-collapse collapse p-t-10" role="tabpanel" aria-labelledby="headingOne">
                            <input   name="unit_type_name" id="unit_type_name"type="text" class="form-control m-b-5" placeholder="Add Unit Type">
                            <button  onclick="addUnitType();"  type="button" class="btn btn-small btn-primary"><i class="fa fa-save"></i> Save</button>
                        </div>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Size<span class="text-primary">*</span></label>
                        <input type="text" class="form-control" name="size" value="" placeholder="Enter Size" data-parsley-required data-parsley-type="number">
                    </div> 
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Per sq ft Price<span class="text-primary">*</span></label>
                        <input type="text" class="form-control" name="per_sq_ft_price" value="" placeholder="Enter Per sq ft Price" data-parsley-required data-parsley-type="number">
                    </div> 
                </div>
                @foreach($project_property_type_attributes as $attributes)
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">{{$attributes['label']}}</label> 
                        @if('textbox' === $attributes['control_type'])
                        <input type="text" class="form-control" name="attributes[{{property_type_slug($attributes['label'])}}]"  placeholder="Enter {{$attributes['label']}}">
                        @elseif('number' === $attributes['control_type'])
                        <input type="number" class="form-control" name="attributes[{{property_type_slug($attributes['label'])}}]" value="" placeholder="Enter {{$attributes['label']}}">
                        @elseif('select' === $attributes['control_type'])
                        <?php
                        $options = explode(',', $attributes['defaults']);
                        ?>
                        <select name="attributes[{{property_type_slug($attributes['label'])}}]" class="select2 form-control">
                            <option value="">Select {{$attributes['label']}}</option>   
                            @foreach($options as $option)
                            <option  value="{{property_type_slug($option)}}">{{$option}}</option>
                            @endforeach
                        </select>
                        @elseif('multiple' === $attributes['control_type'])
                        <?php
                        $options = explode(',', $attributes['defaults']);
                        ?>
                        <select multiple name="attributes[{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
                            <option value="">Select {{$attributes['label']}}</option>   
                            @foreach($options as $option)
                            <option value="{{property_type_slug($option)}}">{{$option}}</option>
                            @endforeach
                        </select>
                        @endif  
                    </div> 
                </div>
                @endforeach    
            </div>
            <div class="form-actions">  
                <div class="pull-right">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- END PLACE PAGE CONTENT HERE -->
@endsection