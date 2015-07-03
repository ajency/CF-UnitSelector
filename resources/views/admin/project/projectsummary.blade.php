@extends('layouts.singleproject') @section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit' ) }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#" class="active">Project Summary</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection @section('content')

<!-- END BREADCRUMBS -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->

<div class="page-title">

    <h2><span class="semi-bold">Project </span> Summary</h2>
</div>
<div class="grid simple">
    @include('admin.project.flashmessage')

    <div class="grid-body grid-padding no-border summary">
        <div class=" m-t-15 m-b-15 no-border">
            <div class="row">
                <h3 class="col-md-4"> <i class="fa fa-angle-double-right text-primary"></i> Project <span class="semi-bold">Details</span></h3>

                <div class="col-md-4 text-center">
                    <h4 class="inline semi-bold">Status : </h4>&nbsp;&nbsp;<span class="text-primary">{{ strtoupper($project['status']) }}</span>
                </div>
                <div class="col-md-4 text-right">
                    @if(hasPermission($project['id'],['publish_project']))
                    <?php
                     $publishButton = ($project['status']=='published')? 'REPUBLISH':'PUBLISH';
                     ?>
                        <button onclick="getPublishData({{ $project['id'] }})" class="btn btn-info btn-small">{{ $publishButton }}</button>
                        @if($project['status']=='published')
                        <a href="{{ url( 'admin/project/' . $project['id'].'/unpublishproject' ) }}" onclick="return confirm('Are you sure you want to unpublish this project')">
                            <button class="btn btn-info btn-small">UNPUBLISH</button>
                        </a>
                        @endif
                        <button onclick="deleteProject({{ $project['id'] }});" class="btn btn-danger btn-small">DELETE</button>
                        @endif @if($project['status']=='published')
                        <h5 class="semi-bold">
                        First Published : {{ date('d/m/Y',strtotime($projectJason['created_at'])) }}<br>
                        Last Published : {{ date('d/m/Y',strtotime($projectJason['updated_at'])) }}<br>
                    </h5> @endif

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-7">
                <div class="user-description-box">
                    <dl class="dl-horizontal">
                        <dt><h5 class="semi-bold">Name</h5></dt>
                        <dd>{{ $project['project_title'] }}</dd>
                        <dt><h5 class="semi-bold">Address</h5></dt>
                        <dd>{{ $project['project_address'] }}</dd>
                        <dt><h5 class="semi-bold">Property Types</h5></dt> @if(!empty($propertyTypes))
                        <dd>{{ implode(" , ",$propertyTypes) }}</dd>
                        @else
                        <dd><span class="error"><span for="form3FirstName" class="error">No Property Type selected</span></span>
                        </dd>
                        @endif

                    </dl>
                </div>
            </div>
            <div class="col-md-5">
                <h5 class="semi-bold">
                To check out the frontend of Unit Selector <br><a target="_blank" href="{{ url( 'project/' . $project['id'].'/') }}" class="text-primary">click here >></a>
            </h5>
            </div>
        </div>
        <hr/>
        <div class="m-l-5 no-border">
            <h3><i class="fa fa-angle-double-right text-primary"></i> Project<span class="semi-bold"> Phases</span></h3>
        </div>
        <table class="table table-bordered no-pointer phase-table">
            <thead>
                <tr>
                    <td><span class="semi-bold">Phase </span></td>
                    <td><span class="semi-bold">Status</span></td>
                    <td><span class="semi-bold">Action</span></td>

                </tr>
            </thead>
            <tbody>
                @if(!empty($phases)) @foreach($phases as $phase)
                <tr id="phase-{{ $phase['id'] }}">
                    <td>{{ $phase['phase_name'] }}</td>
                    <td>
                        @if(hasPermission($project['id'],['configure_project']))
                        <select onchange="showUpdateButton(this);" {{($phase[ 'status']=='live' )? 'disabled': ''}} class="select2-container select2 form-control select2-container-active" style="width:50%;">
                            <option value="">Select Status</option>
                            <option value="live" @if($phase[ 'status']=='live' ){{ 'selected'}}@endif>Live</option>
                            <option value="not_live" @if($phase[ 'status']=='not_live' ){{ 'selected'}}@endif>Not Live</option>
                        </select>
                        @else @if($phase['status']=='live'){{'Live'}}@else{{'Not Live'}}@endif @endif
                    </td>
                    <td>
                        <a onclick="getPhaseData({{ $project['id'] }}, {{ $phase['id'] }})" class="text-primary updatelink hidden">Update</a>
                        <a data-phase-id="{{ $phase['id'] }}" class="text-primary remove-phase @if($phase['status']=='live'){{'hidden'}}@endif ">Delete</a>
                    </td>
                </tr>
                @endforeach @else
                <tr>
                    <td colspan="3"><span class="error"><span for="form3FirstName" class="error">
                                @if($project['has_phase']=='yes')
                                Phases Not Added
                                @else
                                Project Has No Phases
                                @endif    
                            </span></span>
                    </td>
                </tr>

                @endif
            </tbody>
        </table>
        @if($project['has_phase']=='yes' && hasPermission($project['id'],['configure_project']))
        <div class="row object-phases" data-object-type="project">
            <div class="col-md-12">
                <div class="row m-b-20">
                    <div class="col-md-5">
                        <div class="add-unit p-t-10 p-r-10 p-l-10">
                            <input type="text" class="form-control phase-name" placeholder="Enter Phase">
                            <div class="text-right">
                                <a class="btn btn-link add-phase-btn"><i class="fa fa-plus"></i> Add </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        @endif
        <hr/>
        <div class="m-l-5 no-border">
            <h3><i class="fa fa-angle-double-right text-primary"></i> Project<span class="semi-bold"> SVGs</span></h3>
        </div>
        <h5 class="semi-bold inline m-l-5">
            Google Earth Image :
        </h5><span class="text-warning"> 
            @if($project["google_earth"]=="")
            Image Not Uploaded
            @elseif(!$googleearthauthtool)
               Pending SVG Authoring   
            @else
            Completed
            @endif
        </span>
        <br>
        <h5 class="semi-bold inline m-l-5">
            Project Master Image :
        </h5>
        <div class="checkbox check-primary checkbox-inline">
            <input id="checkbox7" type="checkbox" value="1" @if($project[ "has_master"]=="yes" ){{ "checked"}}@endif disabled>
            <label for="checkbox7" class="p-l">@if($project["has_master"]=="yes"){{"Available"}}@else{{"Not Available"}}@endif</label>
        </div>
        <br> @if($project["has_master"]=="yes")
        <ul class="list-inline m-b-10 m-l-5">

            <h5 class="semi-bold inline">
                Images Uploaded : </h5> {{count($project['master']) - count($project['masterdeletedimages'])}} {{(count($project['masterdeletedimages'])) ? '( Image Pending To Be Uploaded At Position '. implode(",",$project['masterdeletedimages']).')':''}} |


            <h5 class="semi-bold inline">
                Breakpoints : </h5> {{count($project['breakpoints'])}} |


            <h5 class="semi-bold inline">
                Rotation : </h5> @if(count($project['breakpoints'])>1){{"Yes"}}@else{{"No"}}@endif

        </ul>
        @if(!empty($project['breakpoints']))
        <table class="table table-bordered no-pointer">
            <thead>
                <tr>
                    <td width="16%"><span class="semi-bold">Breakpoint Position</span></td>
                    <td width="18%"><span class="semi-bold">Units Marked</span></td>
                    <td width="18%"><span class="semi-bold">Pending</span></td>

                </tr>
            </thead>
            <tbody>

                @foreach($project['breakpoints'] as $breakpoint)
                <tr>
                    <td>{{ $breakpoint }}</td>
                    <td>{{ $breakPointSvgData[$breakpoint]['MARKED'] }}</td>
                    <td>{{ $breakPointSvgData[$breakpoint]['PENDING'] }}</td>

                </tr>
                @endforeach @endif
            </tbody>
        </table>
        @endif

        <hr/> @if(count($buildings))
        <div class="m-l-5 no-border">
            <h3><i class="fa fa-angle-double-right text-primary"></i> Building<span class="semi-bold"> SVGs</span></h3>
        </div>

        @foreach($buildings as $building)
        <h5 class="semi-bold inline m-l-5">
            Building :
        </h5><span class="text-warning"> 
            {{ $building['building_name'] }} 
        </span>
        <br>
        <h5 class="semi-bold inline m-l-5">
            Master Image :
        </h5>
        <div class="checkbox check-primary checkbox-inline">
            <input id="checkbox7" type="checkbox" value="1" @if($building[ "has_master"]=="yes" ){{ "checked"}}@endif disabled>
            <label for="checkbox7" class="p-l">Available</label>
        </div>
        <br> @if($building["has_master"]=="yes")
        <ul class="list-inline m-b-10 m-l-5">

            <h5 class="semi-bold inline">
                Images Uploaded : </h5> {{count($building['building_master'])}} |


            <h5 class="semi-bold inline">
                Breakpoints : </h5> {{count($building['breakpoints'])}} |


            <h5 class="semi-bold inline">
                Rotation : </h5> @if(count($building['breakpoints'])>1){{"Yes"}}@else{{"No"}}@endif

        </ul>
        <table class="table table-bordered no-pointer">
            <thead>
                <tr>
                    <td width="16%"><span class="semi-bold">Breakpoint Position</span></td>
                    <td width="18%"><span class="semi-bold">Units Marked</span></td>
                    <td width="18%"><span class="semi-bold">Pending</span></td>

                </tr>
            </thead>
            <tbody>

                @foreach($building['breakpoints'] as $breakpoint)
                <tr>
                    <td>{{ $breakpoint }}</td>
                    <td>{{ (isset($buildingbreakPointSvgData[$building['id']][$breakpoint]['MARKED'])) ? $buildingbreakPointSvgData[$building['id']][$breakpoint]['MARKED']:'' }}</td>
                    <td>{{ (isset($buildingbreakPointSvgData[$building['id']][$breakpoint]['PENDING']))?$buildingbreakPointSvgData[$building['id']][$breakpoint]['PENDING']:'' }}</td>

                </tr>
                @endforeach
            </tbody>
        </table>
        @endif @endforeach
        <hr> @endif @foreach($projectpropertyTypes as $projectpropertyType)
        <div class="m-l-5 no-border">
            <h3><i class="fa fa-angle-double-right text-primary"></i> {{ get_property_type($projectpropertyType['property_type_id']) }}<span class="semi-bold"> </span></h3>
        </div>
        <table class="table table-bordered m-b-30 no-pointer">
            <thead>
                <tr>

                    <td width="7%"><span class="semi-bold">Phase</span></td>


                    <td width="10%"><span class="semi-bold">Unit Type</span></td>
                    <td width="10%"><span class="semi-bold">Available</span></td>
                    <td width="10%"><span class="semi-bold">Sold</span></td>
                    <td width="10%"><span class="semi-bold">Blocked</span></td>
                    <td width="15%"><span class="semi-bold">Not Released</span></td>
                    <td width="15%"><span class="semi-bold">Booked By Agent</span></td>
                    <td width="10%"><span class="semi-bold">Archived</span></td>
                    <td width="5%"><span class="semi-bold">Total</span></td>
                </tr>
            </thead>
            <tbody>
                @if(isset($propertyTypeUnitData[$projectpropertyType['id']]))
                <?php $last = ''; ?>
                    @foreach($propertyTypeUnitData[$projectpropertyType['id']] as $phaseId=> $unitTypedata) @foreach($unitTypedata as $unitTypeId=> $unitType)
                    <tr>
                        <td class="active">@if($phaseId != $last){{$phaseData[$phaseId]}}@endif</td>
                        <td>{{$unitTypeData[$unitTypeId]}}</td>
                        <td>{{$unitType['available']}}</td>
                        <td>{{$unitType['sold']}}</td>
                        <td>{{$unitType['blocked']}}</td>
                        <td>{{$unitType['not_released']}}</td>
                        <td>{{$unitType['booked_by_agent']}}</td>
                        <td>{{$unitType['archived']}}</td>
                        <td class="semi-bold text-info">{{ array_sum ( $unitType ) }}</td>
                    </tr>
                    <?php $last = $phaseId; ?>
                        @endforeach @endforeach @else
                        <tr>
                            <td colspan="9">
                                <h5 class="text-info text-center">No units created</h5></td>
                        </tr>
                        @endif
            </tbody>
        </table>
        @endforeach

    </div>
</div>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title text-left" id="myModalLabel">Update Phase Status</h4>
            </div>
            <div id="phaseData">
            </div>
        </div>
    </div>
</div>

<!-- Modal2 -->
<div class="modal fade bs-example-modal-lg" id="publishModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div id="publishData">
        </div>
    </div>
</div>
<script>
    function showUpdateButton(obj) {
        if (obj.value == 'live')
            $(obj).closest('tr').find(".updatelink").removeClass('hidden');
        else
            $(obj).closest('tr').find(".updatelink").addClass('hidden');
    }

</script>
@endsection
