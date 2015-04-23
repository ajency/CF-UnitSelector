@extends('layouts.singleproject')

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Units</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Units</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/bunglow-unit/create') }}" >+ Add Unit</a>
            </div>
            <div class="grid-body">
                <table class="table table-striped" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Variant</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($unit_arr as $unit)
                            <tr class="">
                                <td><a href="{{ url( '/admin/project/' . $project['id'] . '/bunglow-unit/'.$unit['id'].'/edit') }}">{{ $unit['unit_name'] }}</a></td>
                                <td>{{ ucfirst($unit->availability) }}</td>
                                <td>{{ $unit->unitVariant->unit_variant_name}}</td>
                                <td>{{ date('d/m/Y',strtotime($unit['created_at'])) }}</td>
                                <td>{{  date('d/m/Y',strtotime($unit['updated_at'])) }}</td>

                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection