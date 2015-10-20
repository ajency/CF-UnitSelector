@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">{{ get_property_type( $propertyTypeId ) }} Group</a> </li>
    <li><a href="#" class="active">Edit {{ get_property_type( $propertyTypeId ) }} Group</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
  <div class="page-title">                    
    <h2><span class="semi-bold">{{ get_property_type( $propertyTypeId ) }} Group </span> Edit</h2>
  </div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
 <div class="grid simple">
     @include('admin.project.flashmessage')
 
<form data-parsley-validate method="POST" action="{{ url('admin/project/' . $project['id'] . '/' . property_type_slug(get_property_type( $propertyTypeId )) . '/' . $projectPropertyTypeId . '/group/' .$group->id) }}">
    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>    
                <div class="grid-body grid-padding no-border">
                    <div class=" m-t-15 m-b-15 no-border">
                        <div class="row">
                            <div class="col-md-4">
                                <h3><i class=
                                       "fa fa-angle-double-right text-primary"></i>
                                    <span class="semi-bold">{{ get_property_type( $propertyTypeId ) }} Group</span>
                                    Details</h3>
                            </div>
 
                        </div>
                    </div>

                    <div class="row">
                            <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Group Name<span class="text-primary">*</span></label>
                                       <input required="" type="text" class="form-control" name="group_name"  value="{{ $group->property_type_group_name }}"  placeholder="Enter Group Name" data-parsley-required onchange="validateGroupName(this,{{ $group->id }},{{ $group->project_property_type_id }},'{{ property_type_slug(get_property_type( $propertyTypeId )) }}');" {{ $disabled }}><div class="cf-loader hidden"></div>
                                        </div>

                                    </div>
 
                        <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Phase<span class="text-primary">*</span></label>
                                         
                        @if($project['has_phase']=='yes')
                        <select  class="select2 form-control m-b-5" name="phase_id" data-parsley-required {{ $disabled }}>
                            <option value="">Select Phase</option>
                           @foreach($phases as $phase)
                            <option {{ $group->phase_id == $phase['id'] ? 'selected' : '' }} value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
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
                        <input id="master_no" type="radio" name="has_master" value="no" {{ ($group->has_master == 'no') ? 'checked' : '' }} {{ $disabled }}>
                        <label for="master_no" class="form-label">No</label>
                         </div>                    
                                        </div>
                                    </div>
                                </div>
     
                    <div class="row object-master-images {{ ($group->has_master == 'no')?'hidden':'' }}" data-object-id="{{ $group->id }}" data-object-type="group">
                        <hr>
                        <div class="col-md-12">
                            <div class="m-l-5 no-border">
                                <h3 class="inline"><i class=
                                       "fa fa-angle-double-right text-primary"></i>
                                    {{ get_property_type( $propertyTypeId ) }} Group <span class=
                                                   "semi-bold">Master</span></h3>&nbsp;&nbsp;
                                    <a id="master_pickfiles" tabindex="0"  class="file-input-wrapper btn btn-default btn btn-small"><i class="fa fa-image"></i> Select file (s)</a>
                                
                                                   <div class="alert alert-info">
                <strong><i class="fa fa-info"></i></strong> Upload 3D view of the group. To enable 360 degree rotation of the group, upload images in the sequence ( Front -> Right -> Back -> Left) and follow the naming convention. Image dimensions should be - 1600*800 or higher dimension but in the ratio 2:1 (4000*2000). Resolution - 100 DPI. Max size 3mb. Supported file formats jpg, jpeg, png. Naming convention - First image should be : master-00, 
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
                        <th style="width: 16%;" data-hide="phone,tablet" class="" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Image</th>
                        <th style="width: 9%;" data-hide="phone,tablet" class="" role="columnheader" aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Position</th>

                        <th style="width: 9%;" class="" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">Breakpoint</th>
                        <th style="width: 9%;" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">Shadow Image</th>

                        <th style="width: 9%;" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">Import SVG</th>

                        <th style="width: 9%;" class="" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending"></th>

                        <th style="width:6%" class="text-right" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">
                            <button tabindex="0" type="button" onclick="saveBreakPoint()" class="btn btn-primary btn-small">Save Breakpoint</button>
                        </th>
                        </thead>
                        <tbody id="master-img">
                            @if(!empty($svgImages))
                             <?php 
                                $positions = array_keys($svgImages); 
                                $breakpoints = $group->breakpoints;
                                ?>
                            @foreach($svgImages as $position=> $image)

                            @if(isset($image['IMAGE']))
                            <?php
                            
                            $authoringToolUrl = url() . "/admin/project/" . $project['id'] . "/image/" .  $image['ID'] . "/authoring-tool?&type=group_master&position=".$position."&group=".$group->id;
                            ?>
                            <tr class="gradeX odd" id="position-{{ $position }}">
                                <td class="">{{ $image['NAME'] }}
                                            <input type="hidden" name="image_id" value="{{$image['ID']}}">
                                </td>
                                <input type="hidden" name="image_id" value="{{$image['ID']}}">
                                <td class=" "><span class="muted">{{ $position }}</span></td>
                                <td class=" ">
                                    <div class="checkbox check-primary" >
                                        <input id="checkbox{{ $position }}" {{ (isset($breakpoints) && in_array($position,$breakpoints)) ? 'checked' : '' }}    name="position[]" type="checkbox" value="{{ $position }}">
                                               <label for="checkbox{{ $position }}"></label>
                                    </div>
                                </td>
                                <td class="td-shadow-{{ $position }}">
                                    @if(isset($svgShadowImages[$position]) && $svgShadowImages[$position]['ID'] != '')
                                    {{ $svgShadowImages[$position]['NAME'] }} 
                                     
                                    <a onclick="deleteSvg({{ $svgShadowImages[$position]['ID'] }}, 'shadow','{{ $position }}');" class="text-primary delete-shadow-{{ $position }}" ><i class="fa fa-close"></i></a>
                                     @else
                                     <div class=" {{ (isset($breakpoints) && in_array($position,$breakpoints)) ? '' : 'hidden' }} shadow-{{ $position }} " id="pickfiles_{{ $position }}" >
                                    Image
                                    </div>
                                     @endif
                                </td>
                                <td class=" "> <div id="uploadsvg_{{ $position }}" class="{{ (isset($breakpoints) && in_array($position,$breakpoints)) ? '' : 'hidden' }} breakpointSvg-{{ $position }}">Import</div></td>
                                
                                <td class=" ">
                                    <a target="_blank" href=" {{$authoringToolUrl}} " class=" {{ (isset($breakpoints) && in_array($position,$breakpoints)) ? '' : 'hidden' }} auth-tool-{{ $position }} " >Authoring Tool</a>
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
                @if(hasPermission($project['id'],['configure_project']))
                <div class="form-actions">
                                    <div class="text-right">
                                       
                           <input type="hidden" name="_method" value="PUT">
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                    <button type="button" class="btn btn-danger btn-cons delete-group" data-group-id="{{ $group->id }}">Delete</button>                        

                    <a href="{{ url('admin/project/' . $project['id'] . '/' . property_type_slug(get_property_type( $propertyTypeId )) . '/' . $projectPropertyTypeId . '/group') }}"> <button class="btn btn-default btn-cons" type="submit"><i class="fa fa-ban"></i>
                        Cancel</button></a>
                                    </div>
                                </div>
                @endif
                </div>
                </form>

            </div>
<script>
    var BASEURL = '{{ url() }}';

    var BREAKPOINTS = ['<?php echo (isset($positions))? implode("','", $positions):"" ?>'];

</script>
@endsection