@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Buildings</a> </li>
    <li><a href="#" class="active">View Buildings</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Buildings</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Buildings</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/building/create') }}" >+ Add Building</a>
            </div>
            <div class="grid-body">
                <table class="table table-striped" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phase</th>
                            <th>Number of Floors</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($buildings as $building)
                            <tr class="">
                                <td>
                                    <a href="{{ url( '/admin/project/' . $project['id'] . '/building/'. $building->id . '/edit') }}">
                                        {{ $building->building_name }}
                                    </a>
                                </td>
                                <td>{{ $building->phase->phase_name }}</td>
                                <td>{{ $building->no_of_floors }}</td>
                                <td>{{ date('d/m/Y', strtotime($building->created_at)) }}</td>
                                <td>{{  date('d/m/Y', strtotime($building->updated_at)) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
