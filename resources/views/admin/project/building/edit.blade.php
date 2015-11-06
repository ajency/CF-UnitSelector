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
                        
                    <h2> <span class="semi-bold">Building</span> Edit</h2>
                    </div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
 <div class="grid simple">
     @include('admin.project.flashmessage')
<form data-parsley-validate method="POST" action="{{ url('admin/project/'. $project['id'] .'/building/'.$building->id) }}">
    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>    
                <div class="grid-body grid-padding no-border">
                    <div class=" m-t-15 m-b-15 no-border">
                        <div class="row">
                            <div class="col-md-4">
                                <h3><i class=
                                       "fa fa-angle-double-right text-primary"></i>
                                    Building
                                   <span class="semi-bold"> Details</span></h3>
                            </div>
 
                        </div>
                    </div>

                    <div class="row">
                            <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Building Name<span class="text-primary">*</span></label>
                                       <input required="" type="text" class="form-control" name="building_name"  value="{{ $building->building_name }}"  placeholder="Enter Building Name" data-parsley-required onchange="validateBuildingName(this,{{ $building->id }});" {{ $disabled }}><div class="cf-loader hidden"></div>
                                        </div>

                                    </div>
                                        
                                    <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Number of Floors<span class="text-primary">*</span></label>
                                        <select id="phase" name="no_of_floors" class="select2 form-control m-b-5" data-parsley-required {{ $disabled }}>
                                                <option value="">Select Floors</option>
                                                @for($i=1 ;  $i<=100; $i++)
                                                <option {{ $building->no_of_floors == $i ? 'selected' : '' }}  value="{{ $i }}">{{ $i }}</option>
                                                @endfor
                                            </select>
                                             
                                        </div>
                                    </div>
                    <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Floor Rise <span class="text-primary">*</span></label>
                                       <input required="" type="text" class="form-control" name="floor_rise"  value="{{ $building->floor_rise }}"  placeholder="Enter Floor Rise" data-parsley-required  data-parsley-type="number" {{ $disabled }}> 
                                        </div>

                                    </div>
                                     
                                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Phase<span class="text-primary">*</span></label>
                                         
                                    @if($project['has_phase']=='yes')
                        <select  class="select2 form-control m-b-5" name="phase_id" data-parsley-required {{ $disabled }}>
                            <option value="">Select Phase</option>
                           @foreach($phases as $phase)
                            <option {{ $building->phase_id == $phase['id'] ? 'selected' : '' }} value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
                            @endforeach
                        </select>
                        @else
                        <select  class="select2 form-control m-b-5" name="phase_id" disabled {{ $disabled }}>
                            <option value="">Select Phase</option>
                           @foreach($phases as $phase)
                            <option selected value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
                            @endforeach
                        </select>
                        <input type="hidden" name="phase_id" value="{{$phase['id']}}">
                        @endif         
                                        </div>
                                    </div>
                         <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Has Master<span class="text-primary">*</span></label>
                        <div class="radio radio-primary" >        
                        <input id="master_yes" type="radio" name="has_master" value="yes" checked {{ $disabled }}>
                        <label for="master_yes" class="form-label">Yes</label>
                        <input id="master_no" type="radio" name="has_master" value="no" {{ ($building->has_master == 'no') ? 'checked' : '' }} {{ $disabled }}>
                        <label for="master_no" class="form-label">No</label>
                         </div>                    
                                        </div>
                                    </div>
                                </div>
                    <hr/>
            <div class="row">
                <div class="m-l-5 no-border col-md-4">
                    <h3><i class="fa fa-angle-double-right text-primary"></i> Floor   <span class="semi-bold">Group</span></h3>
                </div>
                 
                @foreach($floorGroups as $floorGroup)
                <div class="col-md-12 m-b-20 ">
                        <div class="row">
                        <div class="col-md-10"> 
                            <div class="row">
                                <div class="col-md-6"><input type="text" name="floor_group_name[]" value="{{ $floorGroup['name'] }}" class="form-control" placeholder="Enter Floor Group Name"> </div>
                                <input type="hidden" name="floor_group_id[]" value="{{ $floorGroup['id'] }}" class="form-control">
                            
                                <div class="col-md-6"><input type="text" name="group_floors[]" value="{{ (!empty($floorGroup['floors'])) ?implode(',',$floorGroup['floors']) :'' }}" class="form-control" placeholder="Enter Floors"></div>
                            </div>
                        </div>
                        <div class="col-md-2 text-center">
                            <a class="text-primary" onclick="deleteFloorGroup({{$building->id}},{{$floorGroup['id']}}, this);" data-object-type="view"><i class="
                                        fa fa-close"></i></a>
                        </div>
                        </div>
                    </div>
                @endforeach   
                 <div class="col-md-12 floor_group_block">
                   <div class="add-unit ">
                        <div class="row p-t-10 p-r-15 p-l-15">
                            <div class="col-md-12">
                            <div class="col-md-6">
                                <input type="text" name="floor_group_name[]" value="" class="form-control" placeholder="Enter Floor Group Name">
                            </div>
                            <input type="hidden" name="floor_group_id[]" value="" class="form-control">
                            <div class="col-md-6">
                                <input type="text" name="group_floors[]" value="" class="form-control" placeholder="Enter Floors">
                            </div>
                        <div class="text-right">
                            <a tabindex="0" class="add-floor-group-btn btn btn-link"><i class="fa fa-"></i> Add Floor Group</a>
                        </div> </div>
                        </div>
                        </div>
                    </div> 
                </div>
            </div>
                    <div class="row object-master-images {{ ($building->has_master == 'no')?'hidden':'' }}" data-object-id="{{ $building->id }}" data-object-type="building">
                        <hr>
                        <div class="col-md-12">
                            <div class="m-l-5 no-border">
                                <h3 class="inline"><i class=
                                       "fa fa-angle-double-right text-primary"></i>
                                    Building <span class=
                                                   "semi-bold">Master</span></h3>&nbsp;&nbsp;
                                    <a id="master_pickfiles" tabindex="0"  class="file-input-wrapper btn btn-default btn btn-small"><i class="fa fa-image"></i> Select Master file (s)</a>
                                    <a id="shadow_pickfiles"  class="file-input-wrapper btn btn-default  btn btn-small"><i class="fa fa-image"></i> Select Shadow file (s)</a>
                                                   <div class="alert alert-info">
                <strong><i class="fa fa-info"></i></strong> Upload 3D view of the building. To enable 360 degree rotation of the building, upload images in the sequence ( Front -> Right -> Back -> Left) and follow the naming convention. Image dimensions should be - 1600*800 or higher dimension but in the ratio 2:1 (4000*2000). Resolution - 100 DPI. Max size 3mb. Supported file formats jpg, jpeg, png. Naming convention - First image should be : master-00, 
                second : master-01, third : master-02 and so on with no images missing in the sequence.
                </div>
                                                                                    
        
                  <div class="dataTables_wrapper form-inline" role="grid">
                    <div class="project-master-images">  
                      <div class="alert alert-error hidden ">
                            <button class="close" data-dismiss="alert"></button>
                            <span class="errormsg"></span>
                        </div>
                      </div>    
                  
                    <table class="table table-striped dataTable">
                        <thead>
                        <th width="11%" data-hide="phone,tablet" class="" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Image</th>
                        <th width="7%" data-hide="phone,tablet" class="" role="columnheader" aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Position</th>

                        <th width="9%" class="" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">Breakpoint</th>
                        <th width="12%" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">Shadow Image</th>

                        <th width="11%" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">Step 2 Import SVG</th>
                        <th width="11%" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">Step 3 Import SVG</th>

                        <th width="13.5%" class="" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending"></th>
                        <th width="13.5%" class="" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending"></th>
                        <th width="12%" class="text-right" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">
                            <button tabindex="0" type="button" onclick="saveBreakPoint()" class="btn btn-primary btn-small">Save Breakpoint</button>
                        </th>
                        </thead>
                        <tbody id="master-img">
                            @if(!empty($svgImages))
                             <?php 
                                $positions = array_keys($svgImages); 
                                $breakpoints = (!empty($building->breakpoints)) ? unserialize($building->breakpoints) : [];
                                ?>
                            @foreach($svgImages as $position=> $image)

                            @if(isset($image['IMAGE']))
                            <?php
                            
                            $authoringToolStep2Url = url() . "/admin/project/" . $project['id'] . "/image/" .  $image['ID'] . "/authoring-tool?&type=building_master_step_two&position=".$position."&building=".$building->id;
                            $authoringToolUrl = url() . "/admin/project/" . $project['id'] . "/image/" .  $image['ID'] . "/authoring-tool?&type=building_master&position=".$position."&building=".$building->id;
                            ?>
                            <tr class="gradeX odd" id="position-{{ $position }}">
                                <td class="">{{ $image['NAME'] }}<input type="hidden" name="master_image_id" value="{{$image['ID']}}"></td>
                                <input type="hidden" name="image_id" value="{{$image['ID']}}">
                                <td class=" "><span class="muted">{{ $position }}</span></td>
                                <td class=" ">
                                    <div class="checkbox check-primary" >
                                        <input id="checkbox{{ $position }}" {{ (isset($breakpoints) && in_array($position,$breakpoints)) ? 'checked' : '' }}    name="position[]" type="checkbox" value="{{ $position }}">
                                               <label for="checkbox{{ $position }}"></label>
                                    </div>
                                </td>
                                <td class="td-shadow-{{ $position }}">
                                    @if(isset($shadowImages[$position]) && $shadowImages[$position]['ID'] != '')
                                    {{ $shadowImages[$position]['NAME'] }} 
                                     
                                    <a onclick="deleteSvg({{ $shadowImages[$position]['ID'] }}, 'shadow','{{ $position }}');" class="text-primary delete-shadow-{{ $position }}" ><i class="fa fa-close"></i></a>
                                    @endif
                                </td>
                                <td class=" "> <div id="step2uploadsvg_{{ $position }}" class="{{ (isset($breakpoints) && in_array($position,$breakpoints)) ? '' : 'hidden' }} breakpointSvg-step2-{{ $position }}">Import</div></td>
                                <td class=" "> <div id="uploadsvg_{{ $position }}" class="{{ (isset($breakpoints) && in_array($position,$breakpoints)) ? '' : 'hidden' }} breakpointSvg-{{ $position }}">Import</div></td>
                                <td class=" ">
                                    <a target="_blank" href=" {{$authoringToolStep2Url}} " class=" {{ (isset($breakpoints) && in_array($position,$breakpoints)) ? '' : 'hidden' }} auth-tool-{{ $position }} " >Authoring Tool Step-2</a>
                                </td>
                                <td class=" ">
                                    <a target="_blank" href=" {{$authoringToolUrl}} " class=" {{ (isset($breakpoints) && in_array($position,$breakpoints)) ? '' : 'hidden' }} auth-tool-{{ $position }} " >Authoring Tool Step-3</a>
                                </td>
                                <td class="text-right">
                                    <a  class="text-primary" onclick="deleteSvg({{ $image['ID'] }}, 'master','{{ $position }}');"><i class="fa fa-close"></i></a>
                                
                                </td>
                            </tr>
                                @else
                           <tr class="gradeX odd" id="position-{{ $position }}">
                                <td class=""></td>
                                <td class=" "><span class="muted">{{ $position }}</span></td>
                                <td class=" "></td>
                                <td class=" "></td>
                                <td class=" "></td>
                                <td class=" "></td>
                                <td class=" "></td>
                                <td class=" "></td>
                                <td class="text-right">
                                   
                                </td>
                            </tr>

                            @endif 
                            @endforeach
                            @endif

                        </tbody>

                    </table>
                </div>
            

                                
                            </div>
                        </div>
                    </div>
                @if(hasPermission($project['id'],['configure_building']))
                <div class="form-actions">
                                    <div class="text-right">
                                       
                           <input type="hidden" name="_method" value="PUT">
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                    <button type="button" class="btn btn-danger btn-cons delete-building" data-building-id="{{ $building->id }}">Delete</button>                        

                    <a href="{{ url('admin/project/'. $project['id'] .'/building') }}"> <button class="btn btn-default btn-cons" type="submit"><i class="fa fa-ban"></i>
                        Cancel</button></a>
                                    </div>
                                </div>
                @endif
                </div>
                </form>

            </div>
<script>
    var BASEURL = '{{ url() }}';
    var BUILDING_ID = '{{ $building->id }}';
    var BREAKPOINTS = ['<?php echo (isset($positions))? implode("','", $positions):"" ?>'];

</script>
@endsection
