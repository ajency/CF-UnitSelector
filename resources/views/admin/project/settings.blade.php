@extends('layouts.singleproject')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#" class="active">Project Configuration</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
<div class="grid simple">
    <div class="grid-title no-border">
        <h3 > <i class="fa fa-angle-double-right text-primary"></i> Project <span class="semi-bold">Details</span></h3>
    </div>
    <div class="grid-body no-border">
        <form action="{{ url('/admin/project/'. $project['id']) }}" method="POST" data-parsley-validate>
            @include('admin.project.includes.details')

            <hr/>
            <div class="row">
   
                <div class="m-l-5 no-border">
                    <h3><i class="fa fa-angle-double-right text-primary"></i> Measurement <span class="semi-bold">Units</span></h3>
                </div>
                <div class="col-md-12">
                    <div class="radio radio-primary">
                        <input id="measurement_units_sqft" type="radio" name="measurement_units" value="Sq.ft" checked>
                        <label for="measurement_units_sqft" class="form-label">Square Feet (Sq. Ft.)</label>
                        <input id="measurement_units_sqm" type="radio" name="measurement_units" value="Sq.m" {{ ($project['measurement_units'] == 'Sq.m') ? 'checked' : '' }}>
                        <label for="measurement_units_sqm" class="form-label">Square Meter (Sq. Mt.)</label>
                    </div>

                </div>
            </div>
            <hr/>
            @include('admin.project.includes.property_types')
            <div class="form-actions">  
                <div class="pull-right">
                    <input type="hidden" name="_method" value="PUT">
                    <input type="hidden" value="DETAILS" name="project_update"/>
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i>  Save</button>
                    <a href="{{ url('/admin/project') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i>    Cancel</button></a>
                </div>
            </div>
        </form>   
    </div>
</div>



@endsection