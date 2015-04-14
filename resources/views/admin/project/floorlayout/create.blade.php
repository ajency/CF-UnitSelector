@extends('layouts.singleproject')

@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="/admin">Dashboard</a> </li>
    <li><a href="/admin/project">Projects</a> </li>
    <li><a href="#" class="active">Add Floor Layout</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">Add</span> Floor Layout</h2>
</div>
<!-- END PAGE TITLE -->
<!-- BEGIN PlACE PAGE CONTENT HERE -->
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h3 class="inline"><span class="semi-bold">Floor Layout</span> Details</h3> 
                <div class="clearfix"></div>
            </div>
            <div class="grid-body">
                <form data-parsley-validate method="POST" action="{{ url('admin/project/'. $project['id'] .'/floor-layout') }}"> 
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Name</label>
                                <input type="text" required="" class="form-control" name="layout_name" placeholder="Enter Floor Name">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Number of Flats</label>
                                <select required name="no_of_flats">
                                    <option value="">Choose no of flats</option>
                                    @for($i = 1 ; $i <= 20; $i++)
                                    <option value="{{ $i }}">{{ $i }}</option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <h4 class="inline">Floor Layout Detailed SVG</span></h4>
                        <div id="floor-layout-detailed-svg-container"> 
                            <input id="floor-layout-detailed-svg-pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/> 
                            <button id="floor-layout-detailed-svg-uploadfiles" type="button" class="btn btn-small btn-primary" >Upload</button>
                            <input type="hidden" name="detailed_svg" value="0" />
                        </div>
                        <div class="uploaded-svg">
                            
                        </div> 
                    </div>
                    <hr/>
                    <div>
                        <h4 class="inline">Floor Layout Basic SVG</span></h4>
                        <div id="floor-layout-basic-svg-container"> 
                            <input id="floor-layout-basic-svg-pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/> 
                            <button id="floor-layout-basic-svg-uploadfiles" type="button" class="btn btn-small btn-primary" >Upload</button>
                            <input type="hidden" name="basic_svg" value="0" />
                        </div>
                        <div class="uploaded-svg">
                             
                        </div>  
                    </div>
                    <div class="form-actions">  
                        <div class="pull-rigunitt">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <button type="submit" class="btn btn-primary btn-cons">Save</button>
                            <button type="button" class="btn btn-default btn-cons">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>  
</div>
@endsection
