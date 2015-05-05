@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#"> Variants</a> </li>
    <li><a href="#" class="active">View Unit Variants</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Variants</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Variants</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/apartment-variant/create') }}" ><i class="fa fa-plus"></i> Add variant</a>
            </div>
            <div class="grid-body">
                <table class="table table-striped" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Property Type</th>
                            <th>Unit Type</th>
                            <th>Carpet Area</th>
                            <th>Super Built Up Area</th>
                            <th>Per Sq ft Price</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($unitVariants as $unitVariant)
                            <tr class="">
                                <td><a href="{{ url( '/admin/project/' . $project['id'] . '/apartment-variant/'.$unitVariant['id'].'/edit') }}">{{ $unitVariant['unit_variant_name'] }}</a></td>
                                <td>{{ $propertyTypes[$unitVariant['unit_type_id']] }}</td>
                                <td>{{ $unitTypes[$unitVariant['unit_type_id']] }}</td>
                                <td>{{ $unitVariant['carpet_area'] }}</td>
                                <td>{{ $unitVariant['super_built_up_area'] }}</td>
                                <td>{{ $unitVariant['per_sq_ft_price'] }}</td>
                                <td>{{ date('d/m/Y',strtotime($unitVariant['created_at'])) }}</td>
                                <td>{{  date('d/m/Y',strtotime($unitVariant['updated_at'])) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
