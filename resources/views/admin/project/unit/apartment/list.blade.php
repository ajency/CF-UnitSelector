
@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
    <li><a href="#">Apartment Unit</a> </li>
    <li><a href="#" class="active">View</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Apartment units</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Apartment UNits</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/apartment-unit/create') }}" >+ Add unit</a>
            </div>
            <div class="grid-body">
                <table class="table table-striped" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Building</th>
                            <th>Floor</th>
                            <th>Position</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($units as $unit)
                            <tr class="">
                                <td>
                                    <a href="{{ url( '/admin/project/' . $project['id'] . '/apartment-unit/'.$unit['id'].'/edit') }}">
                                        {{ $unit['unit_name'] }}
                                    </a>
                                </td>
                                <td>{{ ucfirst($unit->availability) }}</td>
                                <td>{{ $unit->building->building_name }}</td>
                                <td>{{ $unit->floor }}</td>
                                <td>{{ $unit->position }}</td>
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
