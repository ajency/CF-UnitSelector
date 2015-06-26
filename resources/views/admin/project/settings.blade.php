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
<div class="page-title">
    <h2>Project<span class="semi-bold"> Configuration</span></h2>
</div>
<div class="grid simple">
@include('admin.project.flashmessage')
    <div class="grid-title no-border">
        <div class="pull-right">
                            <h5 class="semi-bold">Click here to <a href="{{ url( 'admin/project/' . $project['id'] . '/summary' ) }}" class="text-primary">View Project Summary &gt;&gt;</a></h5><h5>
                        </h5></div>
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
                        <input id="measurement_units_sqft" type="radio" name="measurement_units" value="Sq. Ft." checked>
                        <label for="measurement_units_sqft" class="form-label">Square Feet (Sq. Ft.)</label>
                        <input id="measurement_units_sqm" type="radio" name="measurement_units" value="Sq. Mt." {{ ($project['measurement_units'] == 'Sq. Mt.') ? 'checked' : '' }}>
                        <label for="measurement_units_sqm" class="form-label">Square Meter (Sq. Mt.)</label>
                    </div>

                </div>
            </div>
            <hr/>
            <div class="row">
                <div class="m-l-5 no-border">
                    <h3 class="inline"><i class="fa fa-angle-double-right text-primary"></i> Has <span class="semi-bold">Phases</span></h3>
                    <i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="Create phases for your project on project summary page"></i>
                </div>
                <div class="col-md-12">
                    <div class="radio radio-primary">
                        <input id="phases_yes" type="radio" name="has_phases" value="yes" checked>
                        <label for="phases_yes" class="form-label">Yes</label>
                        <input id="phases_no" type="radio" name="has_phases" value="no" {{ ($project['has_phase'] == 'no') ? 'checked' : '' }}>
                        <label for="phases_no" class="form-label">No</label>
                    </div>

                </div>
            </div>
            <hr/>
            <div class="row">
                <div class="m-l-5 no-border">
                    <h3 class="inline"><i class="fa fa-angle-double-right text-primary"></i> Has <span class="semi-bold">Project Master Images</span></h3>
                     <i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="These are 3D images of the project which will be viewed on unit selector page"></i>

                </div>
                <div class="col-md-12">
                    <div class="radio radio-primary">
                        <input id="master_yes" type="radio" name="has_master" value="yes" checked>
                        <label for="master_yes" class="form-label">Yes</label>
                        <input id="master_no" type="radio" name="has_master" value="no" {{ ($project['has_master'] == 'no') ? 'checked' : '' }}>
                        <label for="master_no" class="form-label">No</label>
                    </div>

                </div>
            </div>
            <hr/>
            <div class="row">
                <div class="m-l-5 no-border">
                    <h3 class="inline"><i class="fa fa-angle-double-right text-primary"></i> Project <span class="semi-bold">Views</span></h3>
                    <i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="Create views for the project e.g. Clubhouse,park etc. These view will be associated to units."></i>
            </div>

                <div class="col-md-5">
                @foreach($projectAttributes as $projectAttribute)
                <div class="row m-b-10 ">
                        <div class="col-md-10">
                            <input type="text" name="projectattributes[]" value="{{ $projectAttribute['label'] }}" class="form-control"> 
                            <input type="hidden" name="projectattributeId[]" value="{{ $projectAttribute['id'] }}" class="form-control">
                        </div>
                        <div class="col-md-2 text-center">
                            <a class="text-primary" onclick="deleteAttribute({{$project['id']}},{{$projectAttribute['id']}}, this);" data-object-type="view"><i class="
                                        fa fa-close"></i></a>
                        </div>

                    </div>
                @endforeach   
                    <div class="add-unit project_attribute_block">
                        <div class="row p-t-10 p-r-15 p-l-15">
                            <div class="col-md-12">
                            <input type="text" name="projectattributes[]" value="" class="form-control">
                            <input type="hidden" name="projectattributeId[]" value="" class="form-control">
                        <div class="text-right">
                            <a   class="add-project-attributes-btn btn btn-link"><i class="fa fa-"></i> Add View</a>
                        </div> </div>
                        </div>
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
                    <button onclick="saveProjectConfig();" type="button" class="btn btn-primary btn-cons"><i class="fa fa-check"></i>  Save</button>
                    
                    <a href="{{ url('/admin/project') }}"><button type="button" class="btn btn-default btn-cons"><i class="fa fa-ban"></i>    Cancel</button></a>
                </div>
            </div>
        </form>   
    </div>
</div>

<script>
function saveProjectConfig()
{
    var flag = true;
    if (!$('input[name="property_types[]"]:checked').length) {
        alert('Please select property type');
        flag = false;
    }

    $('input[name="property_types[]"]:checked').each(function () {
        // To pass this value to its nearby hidden input
        var propertyTypeId = $(this).val();
        var unitTypecount = $('select[name="unittype[' + propertyTypeId + '][]"]').length;
		var newunitType = $('input[name="unittype[' + propertyTypeId + '][]"]').length;
		
		if(newunitType && $('input[name="unittype[' + propertyTypeId + '][]"]').val()=='')
		{
			var propertType = $(this).closest('.row').attr('data-type');
            alert('Enter Unit type for ' + propertType);
            flag = false;
		}
		else if(!newunitType)
		{
			if (unitTypecount == 1 && $('select[name="unittype[' + propertyTypeId + '][]"]').val() == '')
			{
				var propertType = $(this).closest('.row').attr('data-type');
				alert('Select Unit type for ' + propertType);
				flag = false;
			}
			
		}
        

    });
    
    $('.attributes_block select').each(function () {  
        var controlVal = $(this).closest('.row').find('.tags').val();
        if(($(this).val()=='select' ||  $(this).val()=='multiple') && controlVal=='') 
        {
            var attributename = $(this).closest('.row').find('input').val();
            alert('Please Enter Default Values For Attribute '+attributename);
            flag = false;
        }
        
     });    

    if (flag)
        $('form').submit();

}
    </script>

@endsection