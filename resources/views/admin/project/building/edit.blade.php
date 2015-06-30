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
                        
                    <h2><span class="semi-bold">Building </span> Edit</h2>
                    </div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
 <div class="grid simple">
     @include('admin.project.flashmessage')
<form data-parsley-validate method="POST" action="{{ url('admin/project/'. $project['id'] .'/building/'.$building->id) }}">    
                <div class="grid-body grid-padding no-border">
                    <div class=" m-t-15 m-b-15 no-border">
                        <div class="row">
                            <div class="col-md-4">
                                <h3><i class=
                                       "fa fa-angle-double-right text-primary"></i>
                                    <span class="semi-bold">Building</span>
                                    Details</h3>
                            </div>
 
                        </div>
                    </div>

                    <div class="row">
                            <div class="col-md-4">
                            <div class="form-group" tabindex="0">
                                        <label class="form-label">Building Name<span class="text-primary">*</span></label>
                                       <input required="" type="text" class="form-control" name="building_name"  value="{{ $building->building_name }}"  placeholder="Enter Building Name" data-parsley-required onchange="validateBuildingName(this,{{ $building->id }});" ><div class="cf-loader hidden"></div>
                                        </div>

                                    </div>
                                        
                                    <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Number of Floors<span class="text-primary">*</span></label>
                                        <select id="phase" name="no_of_floors" class="select2 form-control m-b-5" data-parsley-required>
                                                <option value="">Select Floors</option>
                                                @for($i=1 ;  $i<=100; $i++)
                                                <option {{ $building->no_of_floors == $i ? 'selected' : '' }}  value="{{ $i }}">{{ $i }}</option>
                                                @endfor
                                            </select>
                                             
                                        </div>
                                    </div>
                                     <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Phase<span class="text-primary">*</span></label>
                                         
                                    @if($project['has_phase']=='yes')
                        <select  class="select2 form-control m-b-5" name="phase_id" data-parsley-required>
                            <option value="">Select Phase</option>
                           @foreach($phases as $phase)
                            <option {{ $building->phase_id == $phase['id'] ? 'selected' : '' }} value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
                            @endforeach
                        </select>
                        @else
                        <select  class="select2 form-control m-b-5" name="phase_id" disabled>
                            <option value="">Select Phase</option>
                           @foreach($phases as $phase)
                            <option selected value="{{$phase['id']}}">{{$phase['phase_name']}}</option>
                            @endforeach
                        </select>
                        <input type="hidden" name="phase_id" value="{{$phase['id']}}">
                        @endif         
                                        </div>
                                    </div>
                                    </div>

                    <div class="row">
                         <div class="col-md-4">
                            <div class="form-group">
                                        <label class="form-label">Has Master<span class="text-primary">*</span></label>
                        <div class="radio radio-primary" >        
                        <input id="master_yes" type="radio" name="has_master" value="yes" checked>
                        <label for="master_yes" class="form-label">Yes</label>
                        <input id="master_no" type="radio" name="has_master" value="no" {{ ($building->has_master == 'no') ? 'checked' : '' }}>
                        <label for="master_no" class="form-label">No</label>
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
                                    <a id="master_pickfiles" tabindex="0"  class="file-input-wrapper btn btn-default btn btn-small"><i class="fa fa-image"></i> Select file (s)</a>
                                
                                                   <div class="alert alert-info">
                <strong><i class="fa fa-info"></i></strong> Upload 3D view of the project. To enable 360 degree rotation of the project ,
                upload images in the sequence ( Front -> Right -> Back -> Left). 
                             Image dimensions should be - 
                                            1600*1095. Resolution - 100 DPI. Supported file formats jpg, jpeg, png.
                            Naming convention to be followed for the images uploaded -Imagename-00 (E.g Master-00(first image), Master-01 and so on).
                            For large buildings, the image dimensions should be 4000*2000.
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

                        <th style="width: 9%;" class="" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending"></th>

                        <th style="width:6%" class="text-right" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">
                            <button tabindex="0" type="button" onclick="saveBreakPoint()" class="btn btn-primary btn-small">Save Breakpoint</button>
                        </th>
                        </thead>
                        <tbody id="master-img">
                            @if(!empty($svgImages))
                            <?php
                                $breakpoints = (!empty($building->breakpoints)) ? unserialize($building->breakpoints) : [];
                                ?>
                            @foreach($svgImages as $position=> $image)

                            @if(isset($image['IMAGE']))
                            <?php
                            
                            $authoringToolUrl = url() . "/admin/project/" . $project['id'] . "/image/" .  $image['ID'] . "/authoring-tool?&type=building_master&position=".$position."&building=".$building->id;
                            ?>
                            <tr class="gradeX odd" id="position-{{ $position }}">
                                <td class="">{{ $image['NAME'] }}</td>
                                <input type="hidden" name="image_id" value="{{$image['ID']}}">
                                <td class=" "><span class="muted">{{ $position }}</span></td>
                                <td class=" ">
                                    <div class="checkbox check-primary" >
                                        <input id="checkbox{{ $position }}" {{ (isset($breakpoints) && in_array($position,$breakpoints)) ? 'checked' : '' }}    name="position[]" type="checkbox" value="{{ $position }}">
                                               <label for="checkbox{{ $position }}"></label>
                                    </div>
                                </td>
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
                                <td class=" ">
                                   
                                </td>
                                <td class=" ">
                                   
                                </td>

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
                <div class="form-actions">
                                    <div class="text-right">
                                       <input type="hidden" value="{{ csrf_token()}}" name="_token"/>    
                           <input type="hidden" name="_method" value="PUT">
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>

                    <a href="{{ url('admin/project/'. $project['id'] .'/building') }}"> <button class="btn btn-default btn-cons" type="submit"><i class="fa fa-ban"></i>
                        Cancel</button></a>
                                    </div>
                                </div>
                </div>
                </form>

            </div>

@endsection
