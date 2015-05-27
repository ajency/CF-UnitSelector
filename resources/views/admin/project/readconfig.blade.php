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
    <button class="btn btn-primary btn-medium"><i class="fa fa-pencil"></i> Edit</button>
    </a>
</div>
@endif
<div class="page-title">

    <h2><span class="semi-bold">Project </span> Configuration</h2>
</div>
<div class="grid simple">
    <div class="grid-title no-border">
       <div class="alert alert-success ">
                <button class="close" data-dismiss="alert"></button>
                <i class="fa fa-check-circle" style="font-size: 17px;"></i> 
                    Your project has been created successfully.Go ahead and configure it !
                </div>
        <h3> <i class="fa fa-angle-double-right text-primary"></i> Project <span class="semi-bold">Details</span></h3>
    </div>
    <div class="grid-body no-border">
        <div class="row">
            <div class="col-md-6">
                <dl class="dl-horizontal">
                    <dt><h5 class="semi-bold">City</h5></dt>
                    <dd>{{ array_get( $project ,'city') }}</dd>
                    <dt><h5 class="semi-bold">Title</h5></dt>
                    <dd>{{ $project['project_title'] }}</dd>
                    <dt><h5 class="semi-bold">Address</h5></dt>
                    <dd>{{ $project['project_address'] }}</dd>
                </dl>

            </div>
            <div class="col-md-6">
                <div class="user-description-box">
                    <div class="row">
                        <div class="col-sm-8">
                            <h4 class="semi-bold">{{ array_get($project, 'cf.project_title') }} - <span class="bold text-primary">{{ array_get($project, 'cf_project_id') }}</span></h4>
                            <i class="fa fa-map-marker"></i> <b>Address:</b>
                            <p>{{ array_get($project, 'cf.project_address') }}</p>
                            <p>Builder Name: <label><b>{{ array_get($project, 'cf.builder_name') }}</b></label></p>
                            <p>Website Link: <label><a href="http://{{ array_get($project,'cf.builder_link') }}" target="_blank"><b>http://{{ array_get($project,'cf.builder_link') }}</b></a></label></p>
                        </div>
                        <div class="col-sm-4">
                            <img src="{{ array_get($project,'cf.project_image') }}" class="img-responsive">
                        </div>
                    </div>
                    <div class="alert alert-warning m-t-20">
                        <strong>Note: </strong> The above information is as entered in CommonFloor database.
                    </div>
                </div>
            </div>
        </div>
        <hr/>

        <div class="row">
             @if($project['created_at']===$project['updated_at'])

                @endif
            <div class="m-l-5 no-border">
                <h3><i class="fa fa-angle-double-right text-primary"></i> Measurement <span class="semi-bold">Units</span></h3>
            </div>
            <div class="col-md-12">
                <h5 class="semi-bold inline">The unit for measurement selected is : </h5> 
                <span>  
                    @if($project['measurement_units'] == 'Sq.m')
                        Square metre ({{ $project['measurement_units'] }}) 
                    @elseif($project['measurement_units'] == 'Sq.ft')    
                       Square Feet ({{ $project['measurement_units'] }})
                       @endif
                </span>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="m-l-5 no-border">
                <h3><i class="fa fa-angle-double-right text-primary"></i> Property <span class="semi-bold">Types</span></h3>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <?php
                    $j=1;
                    ?>
                    @if(!empty($propertyTypes))
                    @foreach($propertyTypes as $propertyTypeId=> $propertyType)
                    <div class="col-md-6">
                        <div class="grid simple">
                            <div class="grid-title ">
                                <div class="checkbox check-primary pull-left">
                                    <input id="checkbox6" type="checkbox" value="1" {{ (isset($unitTypes[$propertyTypeId])) ? 'checked' : '' }} disabled>
                                    <label for="checkbox6"></label>
                                </div>
                                <h4>{{ $propertyType }}</h4>

                            </div>
                            
                            <div class="grid-body">
                                @if(isset($unitTypes[$propertyTypeId]))
                                <h4>Unit Types Selected :</h4>

                                <div class="row m-b-10">
                                    <?php
                                    $i=1;
                                    ?>
                                    @if(isset($unitTypes[$propertyTypeId]))
                                    @foreach($unitTypes[$propertyTypeId] as $unitType)
                                    <div class="col-md-3">
                                        <i class="fa fa-circle"></i> {{ $defaultunitTypes[$propertyTypeId][$unitType->unittype_name] }} 
                                    </div>
                                    @if($i==4)
                                </div>
                                <div class="row m-b-10">
                                    @endif
                                    
                                    <?php
                                    $i++;
                                    ?>
                                    @endforeach
                                    @endif
                                     
                                </div>
                                
                                <hr/>
                                <h4>Attributes Selected :</h4>
                                <div class="dataTables_wrapper form-inline" role="grid">
                                    <table class="table no-more-tables" aria-describedby="example_info">
                                        <thead>
                                            <tr><th style="width: 10%;" data-hide="phone,tablet" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Name</th>
                                                <th style="width: 9%;" data-hide="phone,tablet" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Control Type</th>

                                                <th style="width: 9%;" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">Value</th>

                                            </tr></thead>
                                        <tbody>
                                            @foreach($propertytypeAttributes[$propertyTypeId]['ATTRIBUTES'] as $propertytypeAttribute)
                                            <tr class="gradeX odd">
                                                <td class="">{{$propertytypeAttribute['label']}}</td>
                                                <td class=" "><span class="muted">{{ ucfirst($propertytypeAttribute['control_type'])}}</span></td>
                                                <td class=" "> {{$propertytypeAttribute['defaults']}}</td>
                                            </tr>
                                            @endforeach
                                            
                                        </tbody>
                                    </table>
                                </div>
                                @endif
                            </div>
                            
                        </div>
                    </div>
                    @if($j==2)
                    </div>
                    <div class="row">
                    @endif

                    <?php
                    $j++;
                    ?>
                    @endforeach
                    @else
                    <div class="col-md-12">
                    <h5 class="semi-bold">No Property Types selected</h5>
                </div>
                    @endif
                    
                </div>
                
            </div>
        </div>
    </div>
</div>


@endsection