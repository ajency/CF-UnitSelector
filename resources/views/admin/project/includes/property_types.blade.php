<div class="row add-unit-types">
    <div class="m-l-5 no-border">
        <h3><i class="fa fa-angle-double-right text-primary"></i> Property <span class="semi-bold">Types</span></h3>
    </div>
    @foreach($propertyTypes as $propertyTypeId=> $propertyType)
    <div class="row"  data-type="{{ $propertyType }}">
        <div class="col-md-12">
            <div class="grid simple">
                <div class="grid-title no-border">
                    <div class="checkbox check-primary pull-left" >
                        <input {{ (isset($unitTypes[$propertyTypeId])) ? 'checked' : '' }} type="checkbox" id="property_types_{{ $propertyTypeId }}" value="{{ $propertyTypeId }}" name="property_types[]" aria-label="...">
                        <label for="property_types_{{ $propertyTypeId }}"></label>
                    </div>

                    <h4 >
                        This project has <span class="semi-bold"> {{ $propertyType }}</span>
                    </h4>

                </div>
               
                <div class="grid-body no-border propertyTypeUnitsAttributes  {{ (isset($unitTypes[$propertyTypeId])) ? '' : 'hidden' }}">

                    <div class="row column-seperation">
                        <div class="col-md-4 propertytype-unit-types" style="border-right: none">
                            <h4>Unit Types</h4>
                            @if(isset($unitTypes[$propertyTypeId]))
                            @foreach($unitTypes[$propertyTypeId] as $unitType)
                            <div class="row m-b-10 unit_type_block">
                                <div class="col-md-10">
                                    <select onchange="createUnitType(this,{{ $propertyTypeId }})" name="unittype[{{ $propertyTypeId }}][]"  class="select2-container select2 form-control select2-container-active">
                                        <option value="">Select Unit Type</option>
                                        @foreach($defaultunitTypes[$propertyTypeId] as $defaultunitTypeId=> $defaultunitType)
                                        <option  {{ ($defaultunitTypeId == $unitType->unittype_name) ? 'selected' : '' }} value="{{ $defaultunitTypeId }}">{{ $defaultunitType }}</option>
                                        @endforeach
                                        <option value="add_new">Add New</option>
                                    </select>
                                    <input type="hidden" name="unittypekey[{{ $propertyTypeId }}][]" value="{{ $unitType->id }}" class="form-control">
                                    <input type="hidden" name="unittypecustome[{{ $propertyTypeId }}][]" value="" class="form-control">        
                                </div>
                                <div class="col-md-2 text-center">
                                    <a  data-unit-type-id="{{ $unitType->id }}" class="text-primary remove-unit-type"><i class="fa fa-close"></i> </a>
                                </div>
                            </div>

                            @endforeach
                            @endif


                            <div class=" m-b-10 unit_type_block">
                                <div class="row ">
                                    <div class="col-md-12">
                                    <div class="add-unit">
                                        <div class="row p-t-10 p-r-15 p-l-15">
                                            <div class="col-md-12">
                                        <select onchange="createUnitType(this,{{ $propertyTypeId }})" name="unittype[{{ $propertyTypeId }}][]" class="select2-container select2 form-control select2-container-active">
                                            <option value="">Select Unit Type</option>
                                            @foreach($defaultunitTypes[$propertyTypeId] as $defaultunitTypeId=> $defaultunitType)
                                            <option value="{{ $defaultunitTypeId }}"> {{ $defaultunitType }}</option>
                                            @endforeach
                                            <option value="add_new">Add New</option>
                                        </select>

                                        <input type="hidden" name="unittypekey[{{ $propertyTypeId }}][]" value="" class="form-control">
                                        <input type="hidden" name="unittypecustome[{{ $propertyTypeId }}][]" value="" class="form-control" width> 
                                        <input type="hidden" name="add_new_unit_type" value="" class="form-control">
                                        <div class="text-right">
                                            <a property-type="{{ $propertyTypeId }}" class="add-unit-type-btn btn btn-link"><i class="fa fa-"></i> Add Another Unit Type</a>
                                        </div> </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--    <div class="row form-group">
                               <div class="col-md-10">
                               <input name="form3FirstName" id="form3FirstName" type="text" class="form-control" placeholder="Add Unit Type">
                               </div>
                               <div class="col-md-2 text-center">
                                   <a class="btn btn-link"><i class="fa fa-plus"></i></a>
                               </div>
                               </div> -->

                        </div>
                        <div class="col-md-8 attributes_block" style="border-left: 1px solid #ddd;">
                            <h4>Attributes</h4>
                            <div class="row form-group">
                                <div class="col-xs-4">
                                    <label class="form-label">Name</label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" title="Attributes Name will be the specification for each property type. For example (Furnished,Flooring ,Parking etc)."></i>
                                </div>
                                <div class="col-xs-4">
                                    <label class="form-label">Control Type</label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" title="The selected control type will be available as input on the Variant page."></i>
                                </div>
                                <div class="col-xs-4">
                                    <label class="form-label">Value</label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" title="Enter the option which are available for the user for selection if control type selected is selectbox or multiselect box"></i>
                                </div>
                                
                            </div>
                            @if(isset($propertytypeAttributes[$propertyTypeId]['ATTRIBUTES']) && !empty($propertytypeAttributes[$propertyTypeId]['ATTRIBUTES']))
                            @foreach($propertytypeAttributes[$propertyTypeId]['ATTRIBUTES'] as $propertytypeAttribute)

                            <div class="row m-b-10">
                                <div class="col-xs-4">
                                    <input type="text" name="attribute_name_{{ $propertyTypeId }}[]" class="form-control" value="{{$propertytypeAttribute['label']}}" placeholder="Enter Attribute Name" disabled>
                                    <input type="hidden" name="attribute_id_{{ $propertyTypeId }}[]" value="{{$propertytypeAttribute['id']}}" disabled>

                                </div>
                                <div class="col-xs-4">
                                    <select name="controltype_{{ $propertyTypeId }}[]" class="select2-container select2 form-control" disabled>
                                        <option value="">Select Control Type</option>
                                        <option value="textbox" @if($propertytypeAttribute['control_type']=='textbox'){{'selected'}}@endif> Text Box</option>
                                        <option value="select" @if($propertytypeAttribute['control_type']=='select'){{'selected'}}@endif>Select Box</option>
                                        <option value="multiple" @if($propertytypeAttribute['control_type']=='multiple'){{'selected'}}@endif> Multiple Select Box</option>
                                        <option value="media" @if($propertytypeAttribute['control_type']=='number'){{'selected'}}@endif> Number </option>
                                    </select>
                                </div>
                                <div class="col-xs-3">
                                    <input type="text" name="controltypevalues_{{ $propertyTypeId }}[]" data-role="tagsinput" class="tags" value="{{$propertytypeAttribute['defaults']}}" disabled >

                                </div>
                                <div class="col-xs-1 text-right">
                                    <a class="text-primary" onclick="deleteAttribute({{$project['id']}},{{$propertytypeAttribute['id']}}, this);"><i class="
                                        fa fa-close"></i></a>
                                </div>
                            </div>
                            @endforeach
                            @else
                            <?php
                            $attributeName = ($propertyTypeId!=PLOTID)?"Flooring":"Has Well";
                            $attributeControlValues  = ($propertyTypeId!=PLOTID)?"Wooden , Vitrified Tiles":"Yes , No";
                            ?>
                            <div class="row m-b-10 hidden defaultAttributes">
                                <div class="col-xs-4">
                                    <input type="text" name="attribute_name_{{ $propertyTypeId }}[]" class="form-control" value="{{ $attributeName }}" placeholder="Enter Attribute Name" disabled >
                                    <input type="hidden" name="attribute_id_{{ $propertyTypeId }}[]" value="" disabled>

                                </div>
                                <div class="col-xs-4">
                                    <select name="controltype_{{ $propertyTypeId }}[]" class="select2-container select2 form-control" disabled>
                                        <option value="">Select Control Type</option>
                                        <option value="textbox"  > Text Box</option>
                                        <option value="select" selected>Select Box</option>
                                        <option value="multiple"  > Multiple Select Box</option>
                                        <option value="media"  > Number </option>
                                    </select>
                                </div>
                                <div class="col-xs-3">
                                    <input type="text" name="controltypevalues_{{ $propertyTypeId }}[]" data-role="tagsinput" class="tags" value="{{ $attributeControlValues }}" disabled >

                                </div>
                                <div class="col-xs-1 text-right">
                                    <a class="text-primary" onclick="deleteAttribute({{$project['id']}},0, this);"><i class="
                                        fa fa-close"></i></a>
                                </div>
                            </div>
                            @endif
                            <div class="row">
                                <div class="add-unit">
                            <div class="p-t-8 p-t-10">
                                <div class="col-xs-4">
                                    <input type="text" name="attribute_name_{{ $propertyTypeId }}[]" class="form-control" placeholder="Enter Attribute Name">
                                    <input type="hidden" name="attribute_id_{{ $propertyTypeId }}[]" value="">

                                </div>
                                <div class="col-xs-4">
                                    <select name="controltype_{{ $propertyTypeId }}[]"  class="select2-container select2 form-control" >
                                        <option value="">Select Control Type</option>
                                        <option value="textbox" > Text Box</option>
                                        <option value="select" >Select Box</option>
                                        <option value="multiple" > Multiple Select Box</option>
                                        <option value="number"> Number </option>
                                    </select>

                                </div>
                                <div class="col-xs-4 controlvalue">
                                    <input type="text" name="controltypevalues_{{ $propertyTypeId }}[]" data-role="tagsinput" class="tags" >
                                </div>
                            </div>
                                <div class="text-right">
                                    <a class="btn btn-link" onclick="addAttributes({{ $propertyTypeId }}, this)">Add Attribute</a>
                                </div>
                            </div>
                             </div>
                        </div>
                    </div>

                </div>
             
            </div>
        </div>
    </div>
    <hr/>
    @endforeach 


</div>
 
