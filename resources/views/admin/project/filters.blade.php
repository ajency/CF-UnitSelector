@extends('layouts.singleproject')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#" class="active">Project Filters</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
<div class="page-title">
    <h2>Project<span class="semi-bold"> Filters</span></h2>
</div>
<div class="grid simple">
@include('admin.project.flashmessage')
    <div class="grid-body no-border">
        <form action="{{ url('admin/project/' . $project['id'].'/updatefilters') }}" method="POST" data-parsley-validate>            
            <div class="alert alert-info m-t-20">
                <strong><i class="fa fa-info"></i></strong> The filters selected will only be displayed to the user on the Unit Selector page.
            </div>
            <div class="dataTables_wrapper form-inline m-t-20" role="grid">

                <table class="table no-more-tables"  aria-describedby="example_info">
                    <thead>
                        <tr><th  data-hide="phone,tablet" class="" role="columnheader" aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Filters</th>
                                <th  data-hide="phone,tablet" class="text-right" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Tick if applicable</th>


                                </tr></thead>
                    <tbody>
                        <tr class="gradeX odd">
                            <td>Area</td>
                            <td><div class="checkbox check-primary pull-right">
                                    <input id="area" type="checkbox" name="defaults[]" value="area" {{ (isset($projectFilters['defaults']) && in_array('area',$projectFilters['defaults'])) ? 'checked' : '' }}  >
                                    <label for="area"></label>
                                </div>
                            </td>
                        </tr>
                        <tr class="gradeX odd">
                            <td class="">Budget</td>
                            <td class=" "><div class="checkbox check-primary pull-right">
                                    <input id="budget" type="checkbox" name="defaults[]" value="budget" {{ (isset($projectFilters['defaults']) && in_array('budget',$projectFilters['defaults'])) ? 'checked' : '' }}>
                                    <label for="budget"></label>
                                </div></td>

                        </tr>
                        <tr class="gradeX odd">
                            <td class="">Views</td>
                            <td class=" "><div class="checkbox check-primary pull-right">
                                    <input id="views" type="checkbox" name="defaults[]" value="views" {{ (isset($projectFilters['defaults']) && in_array('views',$projectFilters['defaults'])) ? 'checked' : '' }}>
                                    <label for="views"></label>
                                </div></td>

                        </tr>
                        <tr class="gradeX odd">
                            <td class="">Direction</td>
                            <td class=" "><div class="checkbox check-primary pull-right">
                                    <input id="direction" type="checkbox" name="defaults[]" value="direction" {{ (isset($projectFilters['defaults']) && in_array('direction',$projectFilters['defaults'])) ? 'checked' : '' }}>
                                    <label for="direction"></label>
                                </div></td>

                        </tr>
                        @if(isset($propertyTypes[APARTMENTID]))
                        <tr class="gradeX odd">
                            <td>Floor</td>
                            <td><div class="checkbox check-primary pull-right">
                                    <input id="floor" type="checkbox" name="defaults[]" value="floor" {{ (isset($projectFilters['defaults']) && in_array('floor',$projectFilters['defaults'])) ? 'checked' : '' }}>
                                    <label for="floor"></label>
                                </div></td>

                        </tr>
                        @endif
                    </tbody>
                </table>
            </div>
            <hr/>

            <div class="row">
                <div class="m-l-5 no-border">
                    <h3><i class="fa fa-angle-double-right text-primary"></i> Property <span class="semi-bold">Filters</span></h3>
                </div>
                <div class="col-md-12">
                    <div class="row">
                        <?php
                    $j=1;
                    ?>
                    @if(!empty($propertyTypes))
                    @foreach($propertyTypes as $propertyTypeId=> $propertyType)
                        <div class="col-md-6">
                            <div class="grid simple">

                                <div class="grid-body grid-padding">
                                    <div class="dataTables_wrapper form-inline" role="grid">
                                        <table class="table no-more-tables" aria-describedby="example_info">
                                            <thead>
                                                <tr><th  data-hide="phone,tablet" class="" role="columnheader"   aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending" style="width:90%;">{{ $propertyType }}</th>
                                                    <th  data-hide="phone,tablet" class="" role="columnheader"  aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending"></th>


                                                </tr></thead>
                                            <tbody>
                                                <tr class="gradeX odd">
                                                    <td class="">Unit Type</td>
                                                    <td class=" "><div class="checkbox check-primary pull-left">
                                                            <input id="unitTypes_{{ $propertyTypeId }}" type="checkbox" name="{{ $propertyTypeName[$propertyTypeId] }}[]" value="unitTypes" {{ ((isset($projectFilters[ $propertyTypeName[$propertyTypeId]])) && (in_array('unitTypes',$projectFilters[$propertyTypeName[$propertyTypeId]]))) ? 'checked' : '' }}>
                                                            <label for="unitTypes_{{ $propertyTypeId }}"></label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="gradeX odd">
                                                    <td class="">Variant</td>
                                                    <td class=" "><div class="checkbox check-primary pull-left">
                                                            <input id="unitVariantNames_{{ $propertyTypeId }}" type="checkbox" name="{{ $propertyTypeName[$propertyTypeId] }}[]" value="unitVariantNames" {{ ((isset($projectFilters[$propertyTypeName[$propertyTypeId]])) && (in_array('unitVariantNames',$projectFilters[$propertyTypeName[$propertyTypeId]]))) ? 'checked' : '' }}>
                                                            <label for="unitVariantNames_{{ $propertyTypeId }}"></label>
                                                        </div></td>

                                                </tr>
                                                @if(isset($propertytypeAttributes[$propertyTypeId]))
                                                 @foreach($propertytypeAttributes[$propertyTypeId] as $propertytypeAttribute)
                                            <tr class="gradeX odd">
                                                <td class="">{{$propertytypeAttribute['label']}}</td>
                                                <td class=" "><div class="checkbox check-primary pull-left">
                                                    <input id="{{$propertytypeAttribute['label']}}_{{ $propertyTypeId }}" type="checkbox" name="{{ $propertyTypeName[$propertyTypeId] }}[]" value="{{$propertytypeAttribute['label']}}" {{ ((isset($projectFilters[$propertyTypeName[$propertyTypeId]])) && (in_array($propertytypeAttribute['label'],$projectFilters[$propertyTypeName[$propertyTypeId]]))) ? 'checked' : '' }}>
                                                    <label for="{{$propertytypeAttribute['label']}}_{{ $propertyTypeId }}"></label>
                                                </div></td>
                                            
                                            </tr>
                                            @endforeach
                                            @endif   

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @if($j==2)
                    </div>
                    <div class="row">
                    @endif

                    <?php
                    $j++;
                    ?>
                    @endforeach
                    @else
                    <div class="col-md-12">
                    <h5 class="semi-bold">No Property Types selected</h5>
                </div>
                    @endif
                        
                    </div>
                    
                </div>
            </div>
            <div class="form-actions">  
                <div class="text-right">
                   
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit"  class="btn btn-primary btn-cons" ><i class="fa fa-check"></i> Save</button>
                     
                    <button type="button"  class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection