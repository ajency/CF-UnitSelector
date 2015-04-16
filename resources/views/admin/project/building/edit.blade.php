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
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h3 class="inline"><span class="semi-bold">Building</span> Details</h3> 
                <div class="clearfix"></div>
            </div>
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
                            <button type="submit" class="btn btn-primary btn-cons">Save</button>
                            <button type="button" class="btn btn-default btn-cons">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="grid simple">
            <div class="grid-title">
                <h3 class="inline"><span class="semi-bold">Floor</span> Details</h3> 

                <div class="clearfix"></div>
            </div>
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
                
                @for( $i = 1; $i <= $building->no_of_floors; $i++)
                    <hr/>
                    <div class="row">
                        <div  class="col-md-4">{{ $i }}</div>
                        <div class="col-md-4">
                            <select>
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
            </div>
        </div>
        <div class="grid simple">

            <div class="grid-title">
                <h3 class="inline"><span class="semi-bold">Building </span>Master</h3> 
                <div class="pull-right m-t-15">
                    <span class="fa fa-check text-success"></span>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="grid-body">
                <div class="row project-master-images">
                    <div class="front-svg">
                        <h4 class="inline">Front Svg</h4> 
                        <div style="position: relative;">
                            <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside" id="select-btn-1" style="position: relative; z-index: 1;">
                            <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1" id="upload-btn-2">Upload</button>
                            <div id="html5_19ip5h40c1hsupo21e7ep8mk3_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 104px; height: 26px; overflow: hidden; z-index: 0;"><input id="html5_19ip5h40c1hsupo21e7ep8mk3" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="image/svg+xml,image/jpeg,image/png"></div></div>
                        <div class="uploaded-image">
                            <object width="150" data="http://cfunitselectortest.com/projects/3/master/1202805039_3.svg" type="image/svg+xml"></object>
                        </div>
                    </div>
                    <hr>
                    <div class="left-svg">
                        <h4 class="inline">Left Svg</h4> 
                        <div style="position: relative;">
                            <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside" id="select-btn-3" style="position: relative; z-index: 1;">
                            <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1" id="upload-btn-4">Upload</button>
                            <div id="html5_19ip5h40i3uf15mj1irgugc1s8v6_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 104px; height: 26px; overflow: hidden; z-index: 0;"><input id="html5_19ip5h40i3uf15mj1irgugc1s8v6" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="image/svg+xml,image/jpeg,image/png"></div></div>
                        <div class="uploaded-image">
                        </div>
                    </div>
                    <hr>
                    <div class="back-svg">
                        <h4 class="inline">Back Svg</h4> 
                        <div style="position: relative;">
                            <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside" id="select-btn-5" style="position: relative; z-index: 1;">
                            <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1" id="upload-btn-6">Upload</button>
                            <div id="html5_19ip5h40mj2u12n8uov1jfnb019_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 104px; height: 26px; overflow: hidden; z-index: 0;"><input id="html5_19ip5h40mj2u12n8uov1jfnb019" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="image/svg+xml,image/jpeg,image/png"></div></div>
                        <div class="uploaded-image">
                        </div>
                    </div>
                    <hr>
                    <div class="right-svg">
                        <h4 class="inline">Right Svg</h4> 
                        <div style="position: relative;">
                            <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside" id="select-btn-7" style="position: relative; z-index: 1;">
                            <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1" id="upload-btn-8">Upload</button>
                            <div id="html5_19ip5h40p5511qng1npp1sek3ec_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 104px; height: 26px; overflow: hidden; z-index: 0;"><input id="html5_19ip5h40p5511qng1npp1sek3ec" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="image/svg+xml,image/jpeg,image/png"></div></div>
                        <div class="uploaded-image">
                        </div>
                    </div>
                    <hr>
                    <div class="front-left-svg">
                        <h4 class="inline">Front to Left Transition images</h4> 
                        <div style="position: relative;">
                            <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside" id="select-btn-9" style="position: relative; z-index: 1;">
                            <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1" id="upload-btn-10">Upload</button>
                            <div id="html5_19ip5h40s1mic18gffneimp1lnsf_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 104px; height: 26px; overflow: hidden; z-index: 0;"><input id="html5_19ip5h40s1mic18gffneimp1lnsf" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="image/svg+xml,image/jpeg,image/png"></div></div>
                        <div class="row uploaded-images">

                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/254343852_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <span class="pull-right m-t-10"><small>Pos 1</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/127454427_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <span class="pull-right m-t-10"><small>Pos 2</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/827103305_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <span class="pull-right m-t-10"><small>Pos 3</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/199648510_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <span class="pull-right m-t-10"><small>Pos 4</small></span>
                            </div>

                        </div>
                    </div>
                    <hr>
                    <div class="left-back-svg">
                        <h4 class="inline">Left to back transition images</h4> 
                        <div style="position: relative;">
                            <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside" id="select-btn-11" style="position: relative; z-index: 1;">
                            <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1" id="upload-btn-12">Upload</button>
                            <div id="html5_19ip5h40ugvljhaqpcaj934qi_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 104px; height: 26px; overflow: hidden; z-index: 0;"><input id="html5_19ip5h40ugvljhaqpcaj934qi" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="image/svg+xml,image/jpeg,image/png"></div></div>
                        <div class="row uploaded-images">

                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/640534382_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 1</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 1</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/867072911_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 2</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 2</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/400767156_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 3</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 3</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/1365709071_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 4</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 4</small></span>
                            </div>

                        </div>
                    </div>
                    <hr>
                    <div class="back-right-svg">
                        <h4 class="inline">Back to right transition images</h4> 
                        <div style="position: relative;">
                            <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside" id="select-btn-13" style="position: relative; z-index: 1;">
                            <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1" id="upload-btn-14">Upload</button>
                            <div id="html5_19ip5h4111mo62ku16tq01fc9l_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 104px; height: 26px; overflow: hidden; z-index: 0;"><input id="html5_19ip5h4111mo62ku16tq01fc9l" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="image/svg+xml,image/jpeg,image/png"></div></div>
                        <div class="row uploaded-images">

                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/709533746_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 1</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 1</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/99760526_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 2</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 2</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/65528145_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 3</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 3</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/1111562826_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 4</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 4</small></span>
                            </div>

                        </div>
                    </div>
                    <hr>
                    <div class="right-front-svg">
                        <h4 class="inline">Right to front transition images</h4> 
                        <div style="position: relative;">
                            <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside" id="select-btn-15" style="position: relative; z-index: 1;">
                            <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1" id="upload-btn-16">Upload</button>
                            <div id="html5_19ip5h41491mnrepd71e3ggk4o_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 104px; height: 26px; overflow: hidden; z-index: 0;"><input id="html5_19ip5h41491mnrepd71e3ggk4o" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="image/svg+xml,image/jpeg,image/png"></div></div>
                        <div class="row uploaded-images">

                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/863353113_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 1</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 1</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/1063983153_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 2</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 2</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/1623813847_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 3</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 3</small></span>
                            </div>
                            <div class="col-sm-2">
                                <img width="150" height="150" src="http://cfunitselectortest.com/projects/3/master/756531250_3.jpeg" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                                <h5 class="bold inline">SVG 4</h5> <i class="fa fa-bookmark text-primary"></i>
                                <span class="pull-right m-t-10"><small>Pos 4</small></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endsection
