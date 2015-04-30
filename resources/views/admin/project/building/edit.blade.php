@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Buildings</a> </li>
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
               <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <div class="grid-title role="tab" id="headingOne"">
                        <div class="pull-right"><i class="fa fa-angle-up "></i>
                            <i class="fa fa-angle-down grid-angle-down"></i>
                        </div>
                        <h3 ><span class="semi-bold">Building</span> Details</h3> 
                 </div>
               </a>
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
                                    <div class="form-group object-phases" data-object-type="building">
                                        <label class="form-label">Phase</label>
                                        <select  name="phase_id" class="select2 form-control">
                                            <option value="">Select Phase</option>
                                            @foreach( $phases as $phase )
                                            <option {{ $building->phase_id === $phase->id ? 'selected="true"' : '' }}  value="{{ $phase->id }}">{{ $phase->phase_name }}</option>
                                            @endforeach
                                        </select>

                                        <br>
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapsephase" aria-expanded="true" aria-controls="collapseOne">+ Add Phase</a>
                                        <div id="collapsephase" class="panel-collapse collapse p-t-10" role="tabpanel" aria-labelledby="headingOne">
                                            <input type="text" class="form-control phase-name m-b-5" placeholder="Add Phase">
                                            <button type="button" class="btn btn-small btn-primary add-phase-btn"><i class="fa fa-save"></i> Save</button>
                                        </div>
                                    </div> 
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Number of Floors</label>
                                        <input type="number" value="{{ $building->no_of_floors }}" required="" data-parsley-min="1" class="form-control" name="no_of_floors" placeholder="Enter Number of Floors">
                                    </div>
                                </div>
                            </div>
                            <div class="form-actions">  
                                <div class="pull-right">
                                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                                    <input type="hidden" name="update_section" value="building">
                                    <button data-building-id="{{ $building->id }}" type="button" 
                                            class="btn btn-primary btn-cons update-building">Update</button>
                                    <button type="button" class="btn btn-default btn-cons"><i class="fa fa-check"></i> Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="grid simple">
               <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <div class="grid-title" role="tab" id="headingTwo">
                        <div class="pull-right"><i class="fa fa-angle-down grid-angle-down"></i>
                            <i class="fa fa-angle-up "></i>
                        </div>
                        <h3><span class="semi-bold">Floor</span> Details</h3> 
                </div>
               </a>
                <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                    <div class="grid-body">
                        <div class="row">
                            <div  class="col-md-4">
                                <h4 class="semi-bold">Floor</h3>
                            </div>
                            <div class="col-md-3">
                                <h4 class="semi-bold">Floor Layout</h3>
                            </div>
                            <div class="col-md-5 text-right">
                                <h4 class="semi-bold">Floor Layout SVG</h3>
                            </div>
                        </div>
                        <form>
                            @for( $i = 1; $i <= $building->no_of_floors; $i++)
                            <hr/>
                            <div class="row">
                                <div  class="col-md-4">{{ $i }}</div>
                                <div class="col-md-3">
                                    <select required="" name="floors[{{ $i }}]" class="full-width">
                                        <option>Choose floor layout</option>
                                        @foreach($floorLayouts as $floorLayout)
                                        <option {{ (isset($building->floors[$i]) && $building->floors[$i] == $floorLayout->id) ? 'selected' : '' }} 
                                            value="{{ $floorLayout->id }}" > {{ $floorLayout->layout_name }} </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-5 text-right">
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
             <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <div class="grid-title" role="tab" id="headingThree">
                        <div class="pull-right"><i class="fa fa-angle-down grid-angle-down"></i>
                            <i class="fa fa-angle-up "></i>
                        </div>                        
                        <h3 class="inline">Building <span class="semi-bold">Master</span></h3>&nbsp;
                        <span class="inline" data-toggle="popover" data-trigger="hover" data-content="Upload 3D view of the project. To enable 360 degree rotation of the project ,upload images in the sequence ( Front -> Right -> Back -> Left). Image dimension should be Image size : 1600*1095. Resolution - 300 DPI. 
                           Naming convention to be followed for the images uploaded - ProjectName01(first image), ProjectName02 and so on. 
                           " data-original-title="" title=""><i class="fa fa-info"></i>
                        </span>
                </div>
             </a>
                <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                    <div class="grid-body object-master-images" data-object-id="{{ $building->id }}" data-object-type="building">
                        <div class="row project-master-images">
                            <div>
                                <input id="master_pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/> 
                                <button id="master_uploadfiles" type="button" class="btn btn-small hidden btn-primary" data-toggle="collapse" data-target="#master-img" >Upload</button>
                                <div class="row selectedImages m-t-15">
                                </div>
                            </div>
                            <hr/>
                            <div class="row">
                                <div class="col-md-4">
                                    <h4 class="semi-bold">Image</h4>

                                </div>
                                <div class="col-md-4">
                                    <h4  class="semi-bold">Position</h4>
                                </div>
                                <div class="col-md-4">
                                    <h4  class="semi-bold">Breakpoint<button style="float: right" type="button" onclick="saveBreakPoint()" class="btn btn-small btn-primary" >Save Breakpoint</button></h4>

                                </div>
                            </div>

                            <hr/>
                            <div id="master-img"  >    
                                @if(!empty($svgImages))
                                <?php
                                $breakpoints = (!empty($building->breakpoints)) ? unserialize($building->breakpoints) : [];
                                ?>
                                @foreach($svgImages as $position=> $image)
                                @if(isset($image['IMAGE']))
                                <div class="row" id="position-{{ $position }}">
                                    <div class="col-md-4">
                                        <?php
                                        $fileName = $image['NAME'];
                                        $fileData = explode('.', $fileName);
                                        ?>
                                        <img src="{{ $image['IMAGE'] }}" style="width:150px;height:90px;" class="img-thumbnail">
                                        <h4><small class="m-l-30">{{ $fileData[0] }}</small></h4>
                                    </div>
                                    <div class="col-md-4">
                                        <h4>{{ $position }}</h4>
                                    </div>
                                    <div class="col-md-4">
                                        <input  {{ (isset($breakpoints) && in_array($position,$breakpoints)) ? 'checked' : '' }}   name="position[]" type="checkbox" value="{{ $position }}" data-toggle="toggle">
                                            <button onclick="deleteSvg({{ $image['ID'] }}, 'master','{{ $position }}');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button> 
                                    </div>
                                </div>
                                @else
                                <div class="row" id="position-{{ $position }}">
                                    <div class="col-md-4">

                                    </div>
                                    <div class="col-md-4">
                                        <h4>{{ $position }}</h4>
                                    </div>
                                </div>
                                @endif 
                                <hr/> 
                                @endforeach
                                @endif


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
