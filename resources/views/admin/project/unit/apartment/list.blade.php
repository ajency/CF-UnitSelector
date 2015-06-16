
@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#"> Apartment Unit</a> </li>
    <li><a href="#" class="active">View Units</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Units</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
             @include('admin.project.flashmessage')
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Units</span></h4>
                <a class="btn btn-primary pull-right m-l-5"  data-toggle="modal" data-target="#myModal"><i class="fa fa-upload"></i> Bulk Import</a>&nbsp;&nbsp; 
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/apartment-unit/create') }}" ><i class="fa fa-plus"></i> Add unit</a> ;
                
            </div>
            <div class="grid-body">
                <table class="table table-bordered" id="example2" >
                    <thead>
                        <tr>
                            <th style="width:40px;">Edit</th>
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
                            <tr class="" onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/apartment-unit/'.$unit['id'].'/edit') }}'">
                                <td class="text-center"><i class="fa fa-pencil"></i></td>
                                <td>
                                   {{ $unit['unit_name'] }}
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
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
  <form action="{{ url( 'admin/project/' . $project['id'].'/apartment-unit/unitimport') }}"  method="POST" enctype="multipart/form-data" data-parsley-validate>          

    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-left" id="myModalLabel">Bulk Import</h4>
          <a href="{{ url( 'admin/project/' . $project['id'].'/unitexport/'.APARTMENTID ) }}" target="_blank" style="float:right">Download config</a>
      </div>
      <div class="modal-body">
         
        <div class="row m-b-10">
            <div class="col-md-12">
             <div class="form-group">
                        <label class="form-label">Upload File</label>
                        <input type="file" class="form-control"  name="unit_file" data-parsley-required>
                    </div>   
  
            </div>

        </div>
                
      </div>

      <div class="modal-footer">
        <input type="hidden" id="unit-type" name="unit-type" value="apartment-unit">
        <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
        <button type="submit" class="btn btn-primary"><i class="fa fa-upload"></i> Import</button>
        <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
        
      </div>
    </div>
    </form>     
  </div>
</div>
@endsection
