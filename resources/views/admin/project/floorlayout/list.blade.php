@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
    <li><a href="#">Floor layouts</a> </li>
    <li><a href="#" class="active">View</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Floor layouts</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Floor layouts</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/floor-layout/create') }}" >+ Add Floor layout</a>
            </div>
            <div class="grid-body">
                <table class="table table-striped" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number of Flats</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($floorLayouts as $floorLayout)
                            <tr class="">
                                <td>
                                    <a href="{{ url( '/admin/project/' . $project['id'] . '/floor-layout/'. $floorLayout->id . '/edit') }}">
                                        {{ $floorLayout->layout_name }}
                                    </a>
                                </td>
                                <td>{{ $floorLayout->no_of_flats }}</td>
                                <td>{{ date('d/m/Y', strtotime($floorLayout->created_at)) }}</td>
                                <td>{{  date('d/m/Y', strtotime($floorLayout->updated_at)) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
