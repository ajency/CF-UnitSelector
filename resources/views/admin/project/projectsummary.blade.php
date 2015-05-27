@extends('layouts.singleproject')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit' ) }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#" class="active">Project Configuration</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')

<!-- END BREADCRUMBS -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
@if(hasPermission($project['id'],['configure_project']))
<div class="pull-right">
    <a href="{{ url( '/admin/project/' . $project['id'] . '/edit') }}">
        <button class="btn btn-primary btn-medium"><i class="fa fa-pencil"></i> Summary</button>
    </a>
</div>
@endif
<div class="page-title">

    <h2><span class="semi-bold">Project </span> Summary</h2>
</div>
<div class="grid simple">
    <div class="alert alert-error">
        <button class="close" data-dismiss="alert"></button>
        Danger:&nbsp;The daily <a href="#" class="link">cronjob</a> has failed.
    </div>
    <div class="grid-title no-border">
        <div class="pull-right">
            <button class="btn btn-info btn-small" data-toggle="modal" data-target=".bs-example-modal-lg">PUBLISH</button>
        </div>
        <h3> <i class="fa fa-angle-double-right text-primary"></i> Project <span class="semi-bold">Details</span></h3>
    </div>
    <div class="grid-body grid-padding no-border summary">
        <div class="row">
            <div class="col-md-8">
                <div class="user-description-box">
                    <dl class="dl-horizontal">
                        <dt><h5 class="semi-bold">Name</h5></dt>
                        <dd>{{ $project['project_title'] }}</dd>
                        <dt><h5 class="semi-bold">Address</h5></dt>
                        <dd>{{ $project['project_address'] }}</dd>
                        <dt><h5 class="semi-bold">Property Types</h5></dt>
                        @if(!empty($propertyTypes))
                        <dd>{{ implode(" , ",$propertyTypes) }}</dd>
                        @else
                        <dd><span class="error"><span for="form3FirstName" class="error">No Property Type selected</span></span></dd>
                        @endif
                    </dl>
                </div>
            </div>
            <h5 class="semi-bold">
                To check out the frontend of Unit Selector <a hreh="#" class="text-primary">cick here >></a>
            </h5>
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
                @if(!empty($phases))
                @foreach($phases as $phase)
                <tr>
                    <td>{{ $phase['phase_name'] }}</td>
                    <td>
                        <select id="phases1" class="select2-container select2 form-control select2-container-active" style="width:50%;">
                            <option value="">Select Status</option>
                            <option value="live" @if($phase['status']=='live'){{'selected'}}@endif>Live</option>
                            <option value="not_live" @if($phase['status']=='not_live'){{'selected'}}@endif>Not Live</option>
                        </select>
                    </td>
                    <td><a href="#"  data-toggle="modal" data-target="#myModal" class="text-primary">Update</a></td>
                </tr>
                @endforeach
                @else
                <tr>
                    <td colspan="3"><span class="error"><span for="form3FirstName" class="error">
                                @if($project['has_phase']=='yes')
                                Phases Not Added
                                @else
                                Project Has No Phases
                                @endif    
                            </span></span></td>
                </tr>

                @endif
            </tbody>
        </table>
        @if($project['has_phase']=='yes')
        <div class="row object-phases" data-object-type="project">
            <div class="col-md-12">
                <div class="row m-b-20">
                    <div class="col-md-5">
                        <div class="add-unit p-t-10 p-r-10 p-l-10 p-b-15 ">
                            <label class="form-label">Enter New Phase<span class="text-primary">*</span></label>
                            <div class="row">
                                <div class="col-md-9">
                                    <input type="text" class="form-control phase-name">
                                </div>
                                <div class="col-md-3">
                                    <a  class="btn btn-link add-phase-btn"><i class="fa fa-plus"></i> Add </a>
                                </div>
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
            @else
            Pending SVG Authoring
            @endif
        </span><br>
        <h5 class="semi-bold inline m-l-5">
            Project Master Image :
        </h5> <div class="checkbox check-primary checkbox-inline">
            <input id="checkbox7" type="checkbox" value="1" @if($project["has_master"]=="yes"){{"checked"}}@endif disabled>
            <label for="checkbox7" class="p-l">Available</label>
        </div><br>
        @if($project["has_master"]=="yes")
        <ul class="list-inline m-b-10 m-l-5">

            <h5 class="semi-bold inline">
                Images Uploaded : </h5> {{count($project['master'])}} |


            <h5 class="semi-bold inline">
                Breakpoints : </h5> {{count($project['breakpoints'])}} |


            <h5 class="semi-bold inline">
                Rotation : </h5> @if(count($project['breakpoints'])>1){{"Yes"}}@else{{"No"}}@endif

        </ul>
        <table class="table table-bordered no-pointer">
            <thead>
                <tr>
                    <td width="16%"><span class="semi-bold">Breakpoint Position</span></td>
                    <td width="18%"><span class="semi-bold">Units Marked</span></td>
                    <td width="18%"><span class="semi-bold">Pending</span></td>
                    <td><span class="semi-bold">Status</span></td>
                </tr>
            </thead>
            <tbody>
                @foreach($project['breakpoints'] as $breakpoint)
                <tr>
                    <td>{{ $breakpoint }}</td>
                    <td>2</td>
                    <td>3</td>
                    <td><span class="text-warning">Pending SVG Authoring</span></td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @endif
        <hr>
        <div class="m-l-5 no-border">
            <h3><i class="fa fa-angle-double-right text-primary"></i> Building<span class="semi-bold"> </span></h3>
        </div>
        <table class="table table-bordered m-b-30 no-pointer">
            <thead>
                <tr>
                    <td width="16%"><span class="semi-bold">Phase</span></td>
                    <td width="16%"><span class="semi-bold">Unit Type</span></td>
                    <td width="16%"><span class="semi-bold">Available</span></td>
                    <td width="18%"><span class="semi-bold">Sold</span></td>
                    <td width="18%"><span class="semi-bold">Blocked</span></td>
                    <td><span class="semi-bold">Not Released</span></td>
                    <td><span class="semi-bold">Total</span></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="active">Phase 1</td>
                    <td><a href="#">B-1</a></td>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>1</td>
                    <td class="semi-bold text-info text-center">6</td>
                </tr>
                <tr>
                    <td></td>
                    <td><a href="#">B-2</a></td>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td class="semi-bold text-info text-center">7</td>
                </tr>
                <tr>
                    <td></td>
                    <td><a href="#">B-3</a></td>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>1</td>
                    <td class="semi-bold text-info text-center">6</td>
                </tr>
                <tr>
                    <td class="active">Phase 2</td>
                    <td><a href="#">B-1</a></td>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>1</td>
                    <td class="semi-bold text-info text-center">6</td>
                </tr>
                <tr>
                    <td></td>
                    <td><a href="#">B-2</a></td>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>0</td>
                    <td class="semi-bold text-info text-center">5</td>
                </tr>
            </tbody>
        </table>
        @foreach($projectpropertyTypes as $projectpropertyType)
        <div class="m-l-5 no-border">
            <h3><i class="fa fa-angle-double-right text-primary"></i> {{ get_property_type($projectpropertyType['property_type_id']) }}<span class="semi-bold"> </span></h3>
        </div>
        <table class="table table-bordered m-b-30 no-pointer">
            <thead>
                <tr>
                    <td width="16%"><span class="semi-bold">Phase</span></td>
                    <td width="16%"><span class="semi-bold">Unit Type</span></td>
                    <td width="16%"><span class="semi-bold">Available</span></td>
                    <td width="18%"><span class="semi-bold">Sold</span></td>
                    <td width="18%"><span class="semi-bold">Blocked</span></td>
                    <td><span class="semi-bold">Not Released</span></td>
                    <td><span class="semi-bold">Total</span></td>
                </tr>
            </thead>
            <tbody>
                @if(isset($propertyTypeUnitData[$projectpropertyType['id']]))
                <?php $last = ''; ?>
                @foreach($propertyTypeUnitData[$projectpropertyType['id']] as $phaseId=> $unitTypedata)

                @foreach($unitTypedata as $unitTypeId=> $unitType)
                <tr>
                    <td class="active">@if($phaseId != $last){{$phaseData[$phaseId]}}@endif</td>
                    <td>{{$unitTypeData[$unitTypeId]}}</td>
                    <td>{{$unitType['available']}}</td>
                    <td>{{$unitType['sold']}}</td>
                    <td>{{$unitType['blocked']}}</td>
                    <td>{{$unitType['not_released']}}</td>
                    <td class="semi-bold text-info text-center">{{ array_sum ( $unitType ) }}</td>
                </tr>
                <?php $last = $phaseId; ?>
                @endforeach
                @endforeach
                @endif 
            </tbody>
        </table>
        @endforeach

    </div>
</div>


@endsection