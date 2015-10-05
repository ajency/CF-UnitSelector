@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Group</a> </li>
    <li><a href="#" class="active">View {{ get_property_type( $propertyTypeId ) }} Group</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> {{ get_property_type( $propertyTypeId ) }} Group</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">{{ get_property_type( $propertyTypeId ) }} Group</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/' . $project['id'] . '/' . property_type_slug(get_property_type( $propertyTypeId )) . '/' . $projectPropertyTypeId . '/group/create') }}" ><i class="fa fa-plus"></i> Add Building</a>
            </div>
            <div class="grid-body">
                <table class="table table-bordered" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phase</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($groups as $group)
                            <tr class="" onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/' . property_type_slug(get_property_type( $propertyTypeId )) . '/' . $projectPropertyTypeId . '/group/'. $group->id . '/edit') }}'">
                                <td>{{ $group->property_type_group_name }}</td>
                                <td>{{ $group->phase->phase_name }}</td>
                                <td>{{ date('d/m/Y', strtotime($group->created_at)) }}</td>
                                <td>{{  date('d/m/Y', strtotime($group->updated_at)) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
