<div class="grid simple">

    <div class="grid-title">
        <h3>Project <span class="semi-bold">Details</span></h3>
    </div>
    <div class="grid-body">
        <form action="/admin/project/{{ $project['id'] }}" method="POST" data-parsley-validate>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">City</label>
                        <input type="text" name="city" class="form-control" placeholder="City" 
                               value="{{ array_get( $project ,'city') }}" disabled>
                    </div>

                    <div class="form-group">
                        <label class="form-label">CF Project Id</label>
                        <span class="help">From CommonFloor database</span>
                        <input type="text" name="cf_project_id" class="form-control" value="{{ $project['cf_project_id'] }}" disabled>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Project Title<span class="text-primary">*</span></label>
                        <input type="text" class="form-control" placeholder="Enter Project Title" 
                               value="{{ $project['project_title'] }}" name="project_title" data-parsley-required>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="form-label">Project Logo</label>
                                <div>
                                    <img src="{{ $project['project_image'] }}" class="img-responsive img-thumbnail"><br>
                                    <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                                </div>
                                <!-- <div>
                                        <input type="file" name="fileToUpload" class="btn btn-small" title="Select your file" data-filename-placement="inside"/>
                                        <button type="button" class="btn btn-small btn-primary">Upload</button>
                                </div> -->
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Address<span class="text-primary">*</span></label>
                        <textarea name="project_address" class="form-control" 
                                  placeholder="Enter Project Address" data-parsley-required>{{ $project['project_address'] }}</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Property Types</label>
                        <select  class="select2 form-control" multiple name="property_types[]" data-parsley-required>
                            @foreach($propertyTypes as $propertyType) 
                                <option {{ isset($unitTypes[$propertyType->id]) ? 'selected="selected"' : '' }} value="{{ $propertyType->id }}">{{ $propertyType->name }}</option>
                            @endforeach 
                        </select>
                    </div>
                    <div class="add-unit-types">
                        @foreach($propertyTypes as $propertyType)
                        <div class="property-type-{{ $propertyType->id }} {{ isset($unitTypes[$propertyType->id]) ? '' : 'hidden' }}">
                            <h5 class="semi-bold inline">Unit Types for {{ $propertyType->name }}</h5> 
                            @if(isset($unitTypes[$propertyType->id]))
                                @foreach( $unitTypes[$propertyType->id] as $propertyTypeId => $projectUnitType )
                                    <div class="form-inline m-b-10">
                                        <div class="form-group">
                                            <input type="text" name="unittype[{{ $propertyTypeId }}][]" 
                                                   class="form-control" value="{{ $projectUnitType->unittype_name }}">
                                            <input type="hidden" name="unittypekey[{{ $propertyTypeId }}][]" value="{{ $projectUnitType->id }}">
                                            <button type="button" data-unit-type-id="{{ $projectUnitType->id }}" class="btn btn-small btn-default m-t-5 remove-unit-type">
                                                <i class="fa fa-trash"></i> Delete
                                            </button>
                                        </div>
                                    </div> 
                                 @endforeach
                            @endif
                            <div class="form-inline">
                                <div class="form-group">
                                    <input type="text" class="form-control unit-type" placeholder="Add Unit Type" data-parsley-excluded>
                                    <button class="btn btn-white add-unit-type-btn" type="button" property-type="{{ $propertyType->id }}">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Project Status</label>
                        <select  class="select2 form-control" name="property_status">
                            <option value="draft" @if($project['status']=='draft'){{'selected'}}@endif>Draft</option>
                            <option value="in_progress" @if($project['status']=='in_progress'){{'selected'}}@endif>In progress</option>
                            <option value="published" @if($project['status']=='published'){{'selected'}}@endif >Published</option>
                            <option value="archived" @if($project['status']=='archived'){{'selected'}}@endif>Archived</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    
                    <div class="user-description-box">
                        <div class="row">
                            <div class="col-sm-8">
                                <h4 class="semi-bold">{{ array_get($project, 'cf.project_title') }} - <span class="bold text-primary">{{ array_get($project, 'cf_project_id') }}</span></h4>
                                <i class="fa fa-map-marker"></i> <b>Address:</b>
                                <p>{{ array_get($project, 'cf.project_address') }}</p>
                                <p>Builder Name: <label><b>{{ array_get($project, 'cf.builder_name') }}</b></label></p>
                                <p>Website Link: <label><a href="http://{{ array_get($project,'cf.builder_link') }}"><b>http://{{ array_get($project,'cf.builder_link') }}</b></a></label></p>
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
            <div class="form-actions">  
                <div class="pull-right">
                    <input type="hidden" name="_method" value="PUT">
                    <input type="hidden" value="DETAILS" name="project_update"/>
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                    <button type="submit" class="btn btn-primary btn-cons">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>