@extends('layouts.singleproject')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#">Plot Unit</a> </li>
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
                @if(hasPermission($project['id'],['configure_unit']))   
                <a class="btn btn-primary pull-right m-l-5"  data-toggle="modal" data-target="#myModal"><i class="fa fa-upload"></i> Bulk Import</a>&nbsp;&nbsp; 
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/plots-unit/create') }}" ><i class="fa fa-plus"></i> Add Unit</a>
                @endif
            </div>
            <div class="grid-body">
                <table class="table table-bordered" id="example2" >
                    <thead>
                        <tr>
                            @if(hasPermission($project['id'],['unit_status_update']))
                            <th style="width: 40px;">Edit</th>
                            @endif
                            <th>Name</th>
                            <th>Status</th>
                            <th>Variant</th>
                            <th>Phase</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($unit_arr as $unit)
                            <tr class="row-{{ $unit['id'] }}" >
                                @if(hasPermission($project['id'],['unit_status_update']))
                                <td class="text-center quick-edit" data-object-id="{{ $unit['id'] }}" data-toggle="hide"><span class="fa fa-edit"></span></td>
                                @endif
                                <td onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/plots-unit/'.$unit['id'].'/edit') }}'">{{ $unit['unit_name'] }}</td>
                                <td class="object-status" data-object-value="{{ $unit->availability }}" onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/plots-unit/'.$unit['id'].'/edit') }}'">{{ ucfirst($unit->availability) }}</td>
                                <td onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/plots-unit/'.$unit['id'].'/edit') }}'">{{ $unit->unitVariant->unit_variant_name}}</td>
                                <td onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/plots-unit/'.$unit['id'].'/edit') }}'">{{ $unit->phase->phase_name }}</td>
                                <td onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/plots-unit/'.$unit['id'].'/edit') }}'">{{ date('d/m/Y',strtotime($unit['created_at'])) }}</td>
                                <td onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/plots-unit/'.$unit['id'].'/edit') }}'">{{  date('d/m/Y',strtotime($unit['updated_at'])) }}</td>
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
  <form action="{{ url( 'admin/project/' . $project['id'].'/plots-unit/unitimport') }}"  method="POST" enctype="multipart/form-data" data-parsley-validate>          

    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-left" id="myModalLabel">Bulk Import</h4>
      </div>
      <div class="modal-body">
        <a href="{{ url( 'admin/project/' . $project['id'].'/unitexport/'.PLOTID ) }}" target="_blank" class="pull-right btn btn-default btn-small m-r-5"><i class="fa fa-download"></i> Download config</a>  
        <a href="{{ url( 'admin/project/' . $project['id'].'/downloadsamplefile/Plot-Unit-Sample-file.csv' ) }}" target="_blank" class="pull-right btn btn-default btn-small"><i class="fa fa-download"></i> Download Sample</a>
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
        <input type="hidden" id="unit-type" name="unit-type" value="bunglow-unit">
        <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
        <button type="submit" class="btn btn-primary"><i class="fa fa-upload"></i> Import</button>
        <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
        
      </div>
    </div>
    </form>     
  </div>
</div>
@endsection