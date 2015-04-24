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
        <h3>Apartment <span class="semi-bold">Details</span></h3>
    </div>

    <div class="grid-body">
        <form action="{{ url('/admin/project/' . $project['id'] .'/apartment-variant') }}" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="unit_variant_name" placeholder="Enter Name" data-parsley-required>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Unit Type</label>
                        <select name="unit_type" class="select2 form-control" data-parsley-required>
                            <option value="">Select Type</option>
                            @foreach($unitTypes as $unitType)
                            <option value="{{ $unitType->id }}">{{ $unitType->unittype_name }}</option>
                            @endforeach
                        </select>
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Carpet Area</label>
                        <input type="text" class="form-control" name="carpet_area" value="" placeholder="Enter Carpet Area">
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Built Up Area</label>
                        <input type="text" class="form-control" name="builtup_area" value="" placeholder="Enter Built Up Area">
                    </div> 
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Super Built Up Area</label>
                        <input type="text" class="form-control" name="superbuiltup_area" value="" placeholder="Enter Super Built Up Area">
                    </div> 
                </div>
                 <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Per sq ft Price</label>
                                <input type="text" class="form-control" name="per_sq_ft_price" value="" placeholder="Enter Per sq ft Price">
                            </div> 
                        </div>
                @foreach($projectPropertyTypeAttributes as $attribute)
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">{{ $attribute['label'] }}</label>
                        @if('textbox' === $attribute['control_type'])
                        <input type="text" class="form-control" name="attributes[{{ property_type_slug($attribute['label']) }}]"  
                                placeholder="Enter {{ $attribute['label'] }}">
                        @elseif('select' === $attribute['control_type'])
                        <?php
                        $options = explode(',', $attribute['defaults']);
                        ?>
                        <select name="attributes[{{property_type_slug($attribute['label'])}}]" class="select2 form-control">
                            <option value="">Select {{$attribute['label']}}</option>   
                            @foreach($options as $option)
                            <option  value="{{property_type_slug($option)}}">{{$option}}</option>
                            @endforeach
                        </select>
                        @elseif('multiple' === $attribute['control_type'])
                        <?php
                        $options = explode(',', $attribute['defaults']);
                        ?>
                        <select multiple name="attributes[{{property_type_slug($attribute['label'])}}][]" class="select2 form-control">
                            <option value="">Select {{$attribute['label']}}</option>   
                            @foreach($options as $option)
                            <option   value="{{property_type_slug($option)}}">{{$option}}</option>
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
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i>Save</button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- END PLACE PAGE CONTENT HERE -->
@endsection