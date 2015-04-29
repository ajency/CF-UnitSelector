<div class="grid simple">
       <a class="" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">

    <div class="grid-title"  role="tab" id="headingOne">
       <div class="pull-right"><i class="fa fa-angle-up "></i>
<i class="fa fa-angle-down grid-angle-down"></i>
       </div>
       <h3>
           Project <span class="semi-bold">Details</span>
       </h3>
    
    </div></a>
<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
    <div class="grid-body">
        <form action="{{ url('/admin/project/'. $project['id']) }}" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group ">
                        <label class="form-label">City</label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right"  title="Location of the project"></i> 
                        <input type="text" name="city" class="form-control" placeholder="City" 
                               value="{{ array_get( $project ,'city') }}" disabled>
                    </div>

                    <div class="form-group">
                        <label class="form-label">CF Project Id</label>
                        <span class="help">From CommonFloor database</span>
                        <input type="text" name="cf_project_id" class="form-control" value="{{ $project['cf_project_id'] }}" disabled>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Project Title<span class="text-primary">*</span></label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right"  title=" Project Title to be displayed on unit selector page"></i> 
                        <input type="text" class="form-control" placeholder="Enter Project Title" 
                               value="{{ $project['project_title'] }}" name="project_title" data-parsley-required>
                    </div>

                    <div class="row hidden">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="form-label">Project Logo</label>
                                <div>
                                    <img src="{{ $project['project_image'] }}" class="img-responsive img-thumbnail"><br>
                                    <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Address<span class="text-primary">*</span></label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" title=" Project Address to be displayed on unit selector page "></i>
                        <textarea name="project_address" class="form-control" 
                                  placeholder="Enter Project Address" data-parsley-required>{{ $project['project_address'] }}</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Property Types</label><i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" title=" Property Types in the project available for sale "></i>
                        <select  class="select2 form-control" multiple name="property_types[]" data-parsley-required>
                            @foreach($propertyTypes as $propertyType) 
                            <option {{ isset($unitTypes[$propertyType->id]) ? 'selected="selected"' : '' }} value="{{ $propertyType->id }}">{{ $propertyType->name }}</option>
                            @endforeach 
                        </select>
                    </div>
                   
                </div>
                <div class="col-md-6">

                    <div class="form-group">
                        <label class="form-label">Project Status</label>
                        <select  class="select2 form-control" name="property_status">
                            <option value="draft" @if($project['status']=='draft'){{'selected'}}@endif>Draft</option>
                            <option value="in_progress" @if($project['status']=='in_progress'){{'selected'}}@endif>In progress</option>
                            <option value="published" @if($project['status']=='published'){{'selected'}}@endif >Published</option>
                            <option value="archived" @if($project['status']=='archived'){{'selected'}}@endif>Archived</option>
                        </select>
                    </div>
                

                    <div class="user-description-box">
 <div class="row">
                  <div class="col-sm-8">
                                <h4 class="semi-bold">{{ array_get($project, 'cf.project_title') }} - <span class="bold text-primary">{{ array_get($project, 'cf_project_id') }}</span></h4>
                                <i class="fa fa-map-marker"></i> <b>Address:</b>
                                <p>{{ array_get($project, 'cf.project_address') }}</p>
                                <p>Builder Name: <label><b>{{ array_get($project, 'cf.builder_name') }}</b></label></p>
                                <p>Website Link: <label><a href="http://{{ array_get($project,'cf.builder_link') }}" target="_blank"><b>http://{{ array_get($project,'cf.builder_link') }}</b></a></label></p>
                            </div>
                            <div class="col-sm-4">
                                <img src="{{ array_get($project,'cf.project_image') }}" class="img-responsive">
                            </div>
                        </div>
                        <div class="alert alert-warning m-t-20">
                            <strong>Note: </strong> The above information is as entered in CommonFloor database.
                        </div>
                    </div>
                </div>
            </div>
             <div class="add-unit-types m-t-20">
                        <?php
                        $flag='';
                        ?>
                        <div class="row">
                        @foreach($propertyTypes as $propertyType)
                        
                        <div class="col-md-3">
                        <div class="property-type-{{ $propertyType->id }} {{ isset($unitTypes[$propertyType->id]) ? '' : 'hidden' }} form-group">
                            <label class="form-label inline m-b-10 m-t-10">Unit Types for {{ $propertyType->name }}</label>&nbsp;&nbsp;<i class="fa fa-question-circle " data-toggle="tooltip" data-placement="right" title="Enter BHK Type for the Property(e.g 2BHK, 3BHK)"></i>
                            @if(isset($unitTypes[$propertyType->id]))
                            @foreach( $unitTypes[$propertyType->id] as $propertyTypeId => $projectUnitType )
                            <?php
                            $flag='1';
                            ?>
                            <div class="">
                                <div class="form-group">
                                    <input type="text" name="unittype[{{ $propertyTypeId }}][]" 
                                           class="form-control" value="{{ $projectUnitType->unittype_name }}">
                                    <input type="hidden" name="unittypekey[{{ $propertyTypeId }}][]" value="{{ $projectUnitType->id }}">
                                    <div class="text-right m-t-15">
                                    <button type="button" data-unit-type-id="{{ $projectUnitType->id }}" class="btn btn-small btn-default remove-unit-type">
                                        <i class="fa fa-trash"></i> Delete
                                    </button>
                                    </div>
                                </div>
                            </div> 
                            <hr/>
                            @endforeach
                            @endif
                            <div >
                                <div class="form-group">
                                    <input type="text" class="form-control unit-type" placeholder="Add Unit Type" data-parsley-excluded>
                                    <div class="text-right m-t-15">
                                    <button class="btn btn-small btn-primary add-unit-type-btn " title="Click to Add entered Unit Type" data-toggle="tooltip" data-placement="right" type="button" property-type="{{ $propertyType->id }}">
                                        <i class="fa fa-save"> Save</i>
                                    </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        
                        @endforeach
                    </div></div>
            <div class="form-actions">  
 
                       
                       <div class="pull-right">
                       <a data-toggle="popover" data-trigger="hover" data-content="The project enters the draft mode on save and will only be available on unit selector when 
               the project status is changed to Published." data-placement="left"><i class="fa fa-info"></i></a>&nbsp;

                            <input type="hidden" name="_method" value="PUT">
                    <input type="hidden" value="DETAILS" name="project_update"/>
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                   <button type="button" data-p-id="{{ $project['id'] }}" class="btn btn-default update-response-table btn-cons">Update Response Table</button>

                        </div>
           </div>
        </form>
    </div>
</div>
</div>