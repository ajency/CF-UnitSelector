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
                                <input type="hidden" name="floor_layout_id" value="{{ $floorLayout->id }}" />
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
                        <div id="floor-layout-detailed_svg-container"> 
                            <input type="button" name="fileToUpload" class="btn btn-small master_pickfiles" value="Select your file"/> 
                            <button type="button" class="btn btn-small btn-primary master_uploadfiles" >Upload</button>
                            <input type="hidden" name="detailed_svg" value="0" />
                            <div class="uploaded-image">
                                
                            </div> 
                        </div>
                        
                    </div>
                    <hr/>
                    <div>
                        <h4 class="inline">Floor Layout Basic SVG</span></h4>
                        <div id="floor-layout-basic_svg-container"> 
                            <input type="button" name="fileToUpload" class="btn btn-small master_pickfiles" value="Select your file" data-filename-placement="inside"/> 
                            <button type="button" class="btn btn-small btn-primary master_uploadfiles" >Upload</button>
                            <input type="hidden" name="basic_svg" value="0" />
                            <div class="uploaded-image">
                            
                            </div> 
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
        <div class="grid simple floor-position">
            <div class="grid-title">
                <h3 class="inline"><span class="semi-bold">Position</span> Details</h3> 

                <div class="clearfix"></div>
            </div>
            <form data-parsley-validate>
                <div class="grid-body"><h3>Position {{ $i }}</h3>
                    <div class="row m-b-15">
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="form-label">Unit Type</label>
                                        </div>
                                        <select>
                                            <option>Controls</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="form-label">Unit Variant</label>
                                        </div>
                                        <select required="" name="unit_variant_id">
                                            <option value="1">Choose Variant</option>
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
                                <button type="button" class="btn btn-small btn-primary save-position"><i class="fa fa-save"></i> Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        @endfor
    </div> 
</div>
@endsection
