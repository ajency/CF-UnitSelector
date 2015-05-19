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
                   value="{{ $project['project_title'] }}" name="project_title" data-parsley-required onchange="validateTitle(this);" ><div class="cf-loader hidden"></div>
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

    </div>
    <div class="col-md-6">
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
 
