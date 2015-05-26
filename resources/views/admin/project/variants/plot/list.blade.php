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
    <h2><span class="semi-bold">View</span> Unit Variant</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Unit Variants</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/plot-variant/create') }}" ><i class="fa fa-plus"></i> Add Variant</a>
            </div>
            <div class="grid-body">
                <table class="table table-bordered" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Type</th>
                            <th>Size</th>
                            <th>Per Sq ft Price</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($unit_variant_arr as $unit_variant)
                            <tr class="" onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/plot-variant/'.$unit_variant['id'].'/edit') }}'">
                                <td>{{ $unit_variant['unit_variant_name'] }}</td>
                                <td>{{ $unitTypes[$unit_variant['unit_type_id']] }}</td>
                                <td>{{ $unit_variant['size'] }}</td>
                                <td>{{ $unit_variant['per_sq_ft_price'] }}</td>
                                <td>{{ date('d/m/Y',strtotime($unit_variant['created_at'])) }}</td>
                                <td>{{  date('d/m/Y',strtotime($unit_variant['updated_at'])) }}</td>

                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection