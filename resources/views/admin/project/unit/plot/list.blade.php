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
                <a class="btn btn-primary pull-right"  data-toggle="modal" data-target="#myModal"><i class="fa "></i> Bulk  import</a>&nbsp;&nbsp; 
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/'. $project['id'] .'/plot-unit/create') }}" ><i class="fa fa-plus"></i> Add Unit</a>
            </div>
            <div class="grid-body">
                <table class="table table-bordered" id="example2" >
                    <thead>
                        <tr>
                            <th style="width: 40px;">Edit</th>
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
                            <tr class="" onclick="location.href='{{ url( '/admin/project/' . $project['id'] . '/plot-unit/'.$unit['id'].'/edit') }}'">
                                <td class="text-center"><i class="fa fa-pencil"></i></td>
                                <td>{{ $unit['unit_name'] }}</td>
                                <td>{{ ucfirst($unit->availability) }}</td>
                                <td>{{ $unit->unitVariant->unit_variant_name}}</td>
                                <td>{{ $unit->phase->phase_name }}</td>
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
  <form action="{{ url( 'admin/project/' . $project['id'].'/plot-unit/unitimport') }}"  method="POST" enctype="multipart/form-data" data-parsley-validate>          

    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-left" id="myModalLabel">Bulk Import</h4>
        <a href="{{ url( 'admin/project/' . $project['id'].'/unitexport/'.PLOTID ) }}" target="_blank" style="float:right">Download config</a>  
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
        <input type="hidden" id="unit-type" name="unit-type" value="bunglow-unit">
        <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
        <button type="submit" class="btn btn-primary">Import</button>
        <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
        
      </div>
    </div>
    </form>     
  </div>
</div>
@endsection