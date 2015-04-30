@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Floor layouts</a> </li>
    <li><a href="#" class="active">Edit Floor layout</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Edit</span> Floor Layout</h2>
</div>

<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <div class="row">
        <div class="col-md-12">
            <div class="grid simple">
                <div class="grid-title" role="tab" id="headingOne">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <div class="pull-right"><i class="fa fa-angle-up "></i>
                            <i class="fa fa-angle-down grid-angle-down"></i>
                        </div>
                        <h3 ><span class="semi-bold">Floor Layout</span> Details</h3> 
                    </a>
                </div>
                <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                    <div class="grid-body">
                        <form data-parsley-validate method="POST" action="{{ url('admin/project/'. $project['id'] .'/floor-layout/'.$floorLayout->id) }}"> 
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Name</label>
                                        <input type="hidden" name="floor_layout_id" value="{{ $floorLayout->id }}" />
                                        <input type="text" required="" class="form-control" name="layout_name" 
                                               placeholder="Enter Floor Name" value="{{ $floorLayout->layout_name }}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Number of Flats</label>
                                        <input data-parsley-min="1" type="number" class="form-control" required name="no_of_flats" 
                                               value="{{ $floorLayout->no_of_flats }}" />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div>
                                <h4 class="inline">Floor Layout Detailed SVG</span></h4>
                                <div id="floor-layout-detailed_svg-container"> 
                                    <input type="button" name="fileToUpload" class="btn btn-small master_pickfiles" value="Select your file"/> 
                                    <button type="button" class="btn hidden btn-small btn-primary master_uploadfiles" >Upload</button>
                                    <div class="row selectedImages m-t-15">
                                    </div>
                                    <input type="hidden" name="detailed_svg" value="0" />
                                    <div class="uploaded-image">
                                        @if($floorLayout->hasDetailedSvg())
                                        <object data="{{ $floorLayout->getDetailedSvgPath() }}" width="150" ></object>
                                        @endif
                                    </div> 
                                </div>
                            </div>
                            <hr/>
                            <div>
                                <h4 class="inline">Floor Layout Basic SVG</span></h4>
                                <div id="floor-layout-basic_svg-container"> 
                                    <input type="button" name="fileToUpload" class="btn btn-small master_pickfiles" 
                                           value="Select your file" data-filename-placement="inside"/> 
                                    <button type="button" class="btn btn-small hidden btn-primary master_uploadfiles" >Upload</button>
                                    <div class="row selectedImages m-t-15">
                                    </div>
                                    <input type="hidden" name="basic_svg" value="0" />
                                    <div class="uploaded-image">
                                        @if($floorLayout->hasBasicSvg())
                                        <object data="{{ $floorLayout->getBasicSvgPath() }}" width="150" ></object>
                                        @endif
                                    </div> 
                                </div> 
                            </div>
                            <div class="form-actions">  
                                <div class="pull-right">
                                    <input type="hidden" name="_method" value="PUT">
                                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                                    <button type="submit" class="btn btn-primary btn-cons">Save</button>
                                    <a href="{{ url('admin/project/'. $project['id'] .'/floor-layout') }}" class="btn btn-default btn-cons">
                                        Cancel
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="grid simple floor-position">
                <div class="grid-title" role="tab" id="headingTwo">
                    <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" 
                       aria-controls="collapseTwo">
                        <div class="pull-right"><i class="fa fa-angle-down grid-angle-down"></i>
                            <i class="fa fa-angle-up "></i>
                        </div>
                        <h3 ><span class="semi-bold">Position</span> Details</h3> 
                    </a>
                </div>
                <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                    @for($i = 1; $i <= $floorLayout->no_of_flats; $i++)
                    <form data-parsley-validate>
                        <div class="grid-body"><h3>Position {{ $i }}</h3>
                            <div class="row m-b-15">
                                <div class="col-md-9">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Property Type</label>
                                                <select onchange="getPropertTypeData(this, 0);" name="property_type" class="select2 form-control" data-parsley-required>
                                                    <option value="">Select Type</option>
                                                    @foreach($projectPropertyTypes as $projectPropertyType)
                                                    <option {{ ( isset($propertyTypeIds[$i]) && $propertyTypeIds[$i] === $projectPropertyType['ID'] ) ? 'selected' : '' }} value="{{ $projectPropertyType['ID'] }}">{{ $projectPropertyType['NAME'] }}</option>
                                                    @endforeach
                                                </select>
                                            </div> 
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <div>
                                                    <label class="form-label">Unit Type</label>
                                                </div>

                                                <select name="unit_type" class="floor-layout-unit-types full-width" onchange="getVariants(this,{{ $floorLayout->id }});">
                                                    <option value="">Choose Unit Type</option>
                                                    @if(isset($propertyTypeIds[$i]) && isset($unitTypes[$propertyTypeIds[$i]]))
                                                    @foreach($unitTypes[$propertyTypeIds[$i]] as $unitType) 
                                                    <option {{ (isset($unitTypeIds[$i]) && $unitTypeIds[$i] === $unitType['id']) ? 'selected' : '' }}  value="{{ $unitType['id'] }}">{{ $unitType['unittype_name'] }}</option>
                                                    @endforeach
                                                    @endif

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <div>
                                                    <label class="form-label">Unit Variant</label>
                                                </div>

                                                <select required="" name="unit_variant_id" class="full-width">
                                                    @if( isset($unitTypeIds[$i]) && isset($allUnitVariants[$unitTypeIds[$i]]) )
                                                    @foreach($allUnitVariants[$unitTypeIds[$i]] as $unitTypeId => $unitVariant)
                                                    <option {{ isset($floorLayoutPositions[$i]) && $floorLayoutPositions[$i]['unit_variant_id'] === $unitVariant['id'] ? 'selected' : '' }} 
                                                        class="unittype-{{ $unitTypeId }}" value="{{ $unitVariant['id'] }}">
                                                        {{ $unitVariant['unit_variant_name'] }}
                                                </option>
                                                @endforeach
                                                @else 
                                                <option value="">Choose Variant</option>
                                                @endif

                                            </select>
                                        </div>
                                    </div> 
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="pull-right">
                                    <input type="hidden" name="position" value="{{ $i }}" />
                                    <input type="hidden" name="floor_layout_id" value="{{ $floorLayout->id }}" />
                                    <button type="button" class="btn btn-small btn-primary save-position">
                                        <i class="fa fa-save"></i> Save
                                    </button>
                                    <div class="cf-loader hidden"></div>
                                </div>

                            </div>
                        </div>
                    </div>

                </form>
                @endfor
            </div>
        </div>

    </div> 
</div>
</div>
@endsection
