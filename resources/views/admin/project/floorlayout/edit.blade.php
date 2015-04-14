@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
    <li><a href="#" class="active">Edit Floor Layout</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Edit</span> Floor Layout</h2>
</div>

<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h3 class="inline"><span class="semi-bold">Floor Layout</span> Details</h3> 
                <div class="clearfix"></div>
            </div>
            <div class="grid-body">
                <form data-parsley-validate method="POST" action="{{ url('admin/project/'. $project['id'] .'/floor-layout') }}"> 
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Name</label>
                                <input type="text" required="" class="form-control" name="layout_name" 
                                       placeholder="Enter Floor Name" value="{{ $floorLayout->layout_name }}">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Number of Flats</label>
                                <input type="number" class="form-control" required name="no_of_flats" value="{{ $floorLayout->no_of_flats }}" />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <h4 class="inline">Floor Layout Detailed SVG</span></h4>
                        <div id="floor-layout-detailed-svg-container"> 
                            <input id="floor-layout-detailed-svg-pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/> 
                            <button id="floor-layout-detailed-svg-uploadfiles" type="button" class="btn btn-small btn-primary" >Upload</button>
                            <input type="hidden" name="detailed_svg" value="0" />
                        </div>
                        <div>
                            @if($floorLayout->hasDetailedSvg())
                            <object data="{{ $floorLayout->getDetailedSvgPath() }}" width="150"></object>
                            @endif
                        </div> 
                    </div>
                    <hr/>
                    <div>
                        <h4 class="inline">Floor Layout Basic SVG</span></h4>
                        <div id="floor-layout-basic-svg-container"> 
                            <input id="floor-layout-basic-svg-pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/> 
                            <button id="floor-layout-basic-svg-uploadfiles" type="button" class="btn btn-small btn-primary" >Upload</button>
                            <input type="hidden" name="basic_svg" value="0" />
                        </div>
                        <div>
                            @if($floorLayout->hasBasicSvg())
                            <object data="{{ $floorLayout->getBasicSvgPath() }}" width="150"></object>
                            @endif
                        </div> 
                    </div>
                    <div class="form-actions">  
                        <div class="pull-rigunitt">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <button type="submit" class="btn btn-primary btn-cons">Save</button>
                            <a href="{{ url('admin/project/'. $project['id'] .'/floor-layout') }}" class="btn btn-default btn-cons">Cancel</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    

        @for($i = 1; $i <= $floorLayout->no_of_flats; $i++)
        <div class="grid simple">
            <div class="grid-title">
                <h3 class="inline"><span class="semi-bold">Position</span> Details</h3> 

                <div class="clearfix"></div>
            </div>
            <div class="grid-body"><h3>Position {{ $i }}</h3>
                <div class="row m-b-15">
                    <div class="col-md-9">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="form-label">Unit Type</label>
                                        </div>
                                        <select>
                                            <option>Controls</option>
                                            <option> Text Box</option>
                                            <option>Select Box</option>
                                            <option> Multiple Select Box</option>
                                            <option> Number </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="form-label">Unit Variant</label>
                                        </div>
                                        <select>
                                            <option>Controls</option>
                                            <option> Text Box</option>
                                            <option>Select Box</option>
                                            <option> Multiple Select Box</option>
                                            <option> Number </option>
                                        </select>
                                    </div>
                                </div> 
                            </div>
                        </form>
                    </div>
                    <div class="col-md-3 text-right">
                        <img src="../../images/demo/sky-view.jpg" class="img-responsive img-thumbnail"  style="width:160px;">  
                    </div> 
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="pull-right">
                            <button type="button" class="btn btn-small btn-primary"><i class="fa fa-save"></i> Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endfor
    </div> 
</div>
@endsection
