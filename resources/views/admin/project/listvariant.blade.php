@extends('layouts.singleproject')

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Unit Variant</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Unit Variant</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/bunglow-variant/create') }}" >+ Add Variant</a>
            </div>
            <div class="grid-body">
                <table class="table table-striped" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Type</th>
                            <th>Carpet Area</th>
                            <th>Super Built Up Area</th>
                            <th>Per Sq ft Price</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($unit_variant_arr as $unit_variant)
                            <tr class="">
                                <td><a href="{{ url( '/admin/project/' . $project['id'] . '/bunglow-variant/'.$unit_variant['id'].'/edit') }}">{{ $unit_variant['unit_variant_name'] }}</a></td>
                                <td>{{ $unitTypes[$unit_variant['unit_type_id']] }}</td>
                                <td>{{ $unit_variant['carpet_area'] }}</td>
                                <td>{{ $unit_variant['super_built_up_area'] }}</td>
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