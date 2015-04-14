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
                            @if(0 != $floorLayout->detailed_svg)
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
                            @if(0 != $floorLayout->basic_svg)
                            <object data="{{ $floorLayout->getBasicSvgPath() }}" width="150"></object>
                            @endif
                        </div> 
                    </div>
                    <div class="form-actions">  
                        <div class="pull-rigunitt">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <button type="submit" class="btn btn-primary btn-cons">Save</button>
                            <button type="button" class="btn btn-default btn-cons">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>  
</div>
@endsection
