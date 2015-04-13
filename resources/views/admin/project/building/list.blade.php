@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
    <li><a href="#">Buildings</a> </li>
    <li><a href="#" class="active">View</a> </li>
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
                            <th>Status</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
