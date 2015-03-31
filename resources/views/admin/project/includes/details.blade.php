<div class="grid simple">

    <div class="grid-title">
        <h3>Project <span class="semi-bold">Details</span></h3>
    </div>
    <div class="grid-body">
        <form action="/admin/project/{{ $project['id'] }}" method="POST">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">City</label>
                        <input type="text" name="city" class="form-control" placeholder="City" 
                               value="{{ $project['city'] }}" disabled>
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
                        <label class="form-label">Property types</label>
                        <select id="unit_types" class="select2 form-control" multiple name="property_types[]">
                            <option value="apartments" @if(in_array('apartments',array_map('lcfirst', $project['property_types']))){{'selected'}}@endif>Apartments</option>
                            <option value="bungalows_villas" @if(in_array('bungalows_villas',array_map('lcfirst', $project['property_types']))){{'selected'}}@endif >Bungalows/Villas</option>
                            <option value="land" @if(in_array('land',array_map('lcfirst', $project['property_types']))){{'selected'}}@endif>Land</option>
                        </select>
                    </div>

                    <div class="add-unit-types">
                        <h5 class="semi-bold inline">Unit Types for Apartments</h5>
                        @foreach($project['project_unittype'] as $unittype)
                        <div class="form-inline m-b-10">
                            <div class="form-group">
                                <input type="text" name="unittype[{{ $unittype['property_type'] }}][]" 
                                       class="form-control" value="{{ $unittype['unittype_name'] }}">
                                <input type="hidden" name="unittypekey[]" value="{{ $unittype['id'] }}">
                                <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div> 
                        @endforeach

                        <div class="form-inline">
                            <div class="form-group">
                                <input type="text"   class="form-control" placeholder="Add Unit Type">
                                <button class="btn btn-white"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-6">
                    <div class="user-description-box">
                        <div class="row">
                            <div class="col-sm-8">
                                <h4 class="semi-bold">{{ $project['project_title'] }} - <span class="bold text-primary">{{ $project['cf_project_id'] }}</span></h4>
                                <i class="fa fa-map-marker"></i> <b>Address:</b>
                                <p>{{ $project['project_address'] }}</p>	
                            </div>
                            <div class="col-sm-4">
                                <img src="{{ $project['project_image'] }}" class="img-responsive">
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