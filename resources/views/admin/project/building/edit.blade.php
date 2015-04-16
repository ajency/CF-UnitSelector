@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
    <li><a href="#" class="active">Edit Building</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Edit</span> Building</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <div class="row">
        <div class="col-md-12">
            <div class="grid simple">
                <div class="grid-title role="tab" id="headingOne"">
                     <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <div class="pull-right"><span class="fa fa-angle-up"></span></div>
                        <h3 ><span class="semi-bold">Building</span> Details</h3> 
                    </a>
                </div>
                <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                    <div class="grid-body">
                        <form data-parsley-validate method="POST" action="{{ url('admin/project/'. $project['id'] .'/building') }}">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Name</label>
                                        <input required="" value="{{ $building->building_name }}" type="text" class="form-control" name="building_name" placeholder="Enter Building Name">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Phase</label>
                                        <select  name="phase_id" class="select2 form-control">
                                            <option value="">Select Phase</option>
                                            @foreach( $phases as $phase )
                                            <option {{ $building->phase_id === $phase->id ? 'selected="true"' : '' }}  value="{{ $phase->id }}">{{ $phase->phase_name }}</option>
                                            @endforeach
                                        </select>
                                    </div> 
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Number of Floors</label>
                                        <input type="number" value="{{ $building->no_of_floors }}" required="" class="form-control" name="no_of_floors" placeholder="Enter Number of Floors">
                                    </div>
                                </div>
                            </div>
                            <div class="form-actions">  
                                <div class="pull-right">
                                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                                    <input type="hidden" name="update_section" value="building">
                                    <button data-building-id="{{ $building->id }}" type="button" 
                                            class="btn btn-primary btn-cons update-building">Update</button>
                                    <button type="button" class="btn btn-default btn-cons">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="grid simple">
                <div class="grid-title" role="tab" id="headingTwo">
                    <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <div class="pull-right"><span class="fa fa-angle-down"></span></div>
                        <h3><span class="semi-bold">Floor</span> Details</h3> 
                    </a>
                </div>
                <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                    <div class="grid-body">
                        <div class="row">
                            <div  class="col-md-4">
                                <h4 class="semi-bold">Floor</h3>
                            </div>
                            <div class="col-md-4">
                                <h4 class="semi-bold">Floor Layout</h3>
                            </div>
                            <div class="col-md-4 text-right">
                                <h4 class="semi-bold">Floor Layout SVG</h3>
                            </div>
                        </div>
                        <form>
                            @for( $i = 1; $i <= $building->no_of_floors; $i++)
                            <hr/>
                            <div class="row">
                                <div  class="col-md-4">{{ $i }}</div>
                                <div class="col-md-4">
                                    <select required="" name="floors[{{ $i }}]">
                                        <option>Choose floor layout</option>
                                        @foreach($floorLayouts as $floorLayout)
                                        <option value="{{ $floorLayout->id }}" > {{ $floorLayout->layout_name }} </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-4 text-right">
                                    <a href="#" data-toggle="modal" data-target="#myModal">
                                        View layout SVG
                                    </a>
                                </div>
                            </div>
                            @endfor
                            <div class="form-actions">  
                                <div class="pull-right">
                                    <input type="hidden" name="update_section" value="floors">
                                    <button data-building-id="{{ $building->id }}" type="button" 
                                            class="btn btn-primary btn-cons update-building">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="grid simple">
                <div class="grid-title" role="tab" id="headingThree">
                    <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <div class="pull-right"><span class="fa fa-angle-down"></span></div>
                        <h3>Building <span class="semi-bold">Master</span></h3> 
                    </a>
                </div>
                <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                    <div class="grid-body object-master-images" data-object-id="{{ $building->id }}" data-object-type="building">
                        <div class="row project-master-images">
                            <div class="front-svg">
                                <h4 class="inline">Front Svg</h4> 
                                <div>
                                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                                </div>
                                <div class="uploaded-image">
                                    @if(!empty($svgImages['building']['front']['IMAGE']))
                                    <object width="150" data="{{ $svgImages['building']['front']['IMAGE'] }}" type="image/svg+xml"></object>
                                    <button onclick="deleteSvg({{ $svgImages['building']['front']['ID'] }}, 'master', 'front');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                                    @endif
                                </div>
                            </div>
                            <hr />
                            <div class="left-svg">
                                <h4 class="inline">Left Svg</h4> 
                                <div>
                                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                                </div>
                                <div class="uploaded-image">
                                    @if(!empty($svgImages['building']['left']['IMAGE']))
                                    <object width="150" data="{{ $svgImages['building']['left']['IMAGE'] }}" type="image/svg+xml"></object>
                                    <button onclick="deleteSvg({{ $svgImages['building']['left']['ID'] }}, 'master', 'left');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                                    @endif
                                </div>
                            </div>
                            <hr />
                            <div class="back-svg">
                                <h4 class="inline">Back Svg</h4> 
                                <div>
                                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                                </div>
                                <div class="uploaded-image">
                                    @if(!empty($svgImages['building']['back']['IMAGE']))
                                    <object width="150" data="{{ $svgImages['building']['back']['IMAGE'] }}" type="image/svg+xml"></object>
                                    <button onclick="deleteSvg({{ $svgImages['building']['back']['ID'] }}, 'master', 'back');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                                    @endif
                                </div>
                            </div>
                            <hr />
                            <div class="right-svg">
                                <h4 class="inline">Right Svg</h4> 
                                <div>
                                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                                </div>
                                <div class="uploaded-image">
                                    @if(!empty($svgImages['building']['right']['IMAGE']))
                                    <object width="150" data="{{ $svgImages['building']['right']['IMAGE'] }}" type="image/svg+xml"></object>
                                    <button onclick="deleteSvg({{ $svgImages['building']['right']['ID'] }}, 'master', 'right');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                                    @endif
                                </div>
                            </div>
                            <hr />
                            <div class="front-left-svg">
                                <h4 class="inline">Front to Left Transition images</h4> 
                                <div>
                                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                                </div>
                                <div class="row uploaded-images">
                                    @if(!empty($svgImages['building']['front-left']))  
                                    @for ($i=0, $len = count($svgImages['building']['front-left']); $i < $len ; $i++)
                                    <div class="col-sm-2">
                                        <img  width="150" height="150" src="{{ $svgImages['building']['front-left'][$i]['IMAGE'] }}" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                        <span class="pull-right m-t-10"><small>Pos {{ $i+1 }}</small></span>
                                        <button onclick="deleteSvg({{ $svgImages['building']['front-left'][$i]['ID'] }}, 'master', 'front-left');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                                    </div>
                                    @endfor
                                    @endif 
                                </div>
                            </div>
                            <hr />
                            <div class="left-back-svg">
                                <h4 class="inline">Left to back transition images</h4> 
                                <div>
                                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                                </div>
                                <div class="row uploaded-images">
                                    @if(!empty($svgImages['building']['left-back']))  
                                    @for ($i=0, $len = count($svgImages['building']['left-back']); $i < $len ; $i++)
                                    <div class="col-sm-2">
                                        <img  width="150" height="150" src="{{ $svgImages['building']['left-back'][$i]['IMAGE'] }}" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                        <h5 class="bold inline">SVG {{ $i+1 }}</h5> <i class="fa fa-bookmark text-primary"></i>
                                        <span class="pull-right m-t-10"><small>Pos {{ $i+1 }}</small></span>
                                        <button onclick="deleteSvg({{ $svgImages['building']['left-back'][$i]['ID'] }}, 'master', 'left-back');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                                    </div>
                                    @endfor
                                    @endif 
                                </div>
                            </div>
                            <hr />
                            <div class="back-right-svg">
                                <h4 class="inline">Back to right transition images</h4> 
                                <div>
                                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                                </div>
                                <div class="row uploaded-images">
                                    @if(!empty($svgImages['building']['back-right']))  
                                    @for ($i=0, $len = count($svgImages['building']['back-right']); $i < $len ; $i++)
                                    <div class="col-sm-2">
                                        <img  width="150" height="150" src="{{ $svgImages['building']['back-right'][$i]['IMAGE'] }}" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                        <h5 class="bold inline">SVG {{ $i+1 }}</h5> <i class="fa fa-bookmark text-primary"></i>
                                        <span class="pull-right m-t-10"><small>Pos {{ $i+1 }}</small></span>
                                        <button onclick="deleteSvg({{ $svgImages['building']['back-right'][$i]['ID'] }}, 'master', 'back-right');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                                    </div>
                                    @endfor
                                    @endif 
                                </div>
                            </div>
                            <hr />
                            <div class="right-front-svg">
                                <h4 class="inline">Right to front transition images</h4> 
                                <div>
                                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                                </div>
                                <div class="row uploaded-images">
                                    @if(!empty($svgImages['building']['right-front']))  
                                    @for ($i=0, $len = count($svgImages['building']['right-front']); $i < $len ; $i++)
                                    <div class="col-sm-2">
                                        <img  width="150" height="150" src="{{ $svgImages['building']['right-front'][$i]['IMAGE'] }}" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                        <h5 class="bold inline">SVG {{ $i+1 }}</h5> <i class="fa fa-bookmark text-primary"></i>
                                        <span class="pull-right m-t-10"><small>Pos {{ $i+1 }}</small></span>
                                        <button onclick="deleteSvg({{ $svgImages['building']['right-front'][$i]['ID'] }}, 'master', 'right-front');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                                    </div>
                                    @endfor
                                    @endif 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
