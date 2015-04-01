<div class="grid simple">
    <div class="grid-title">
        <h3 class="inline">Project <span class="semi-bold">Master</span></h3> 
        <div class="pull-right m-t-15">
            <span class="fa fa-check text-success" ></span>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="grid-body">
        <div id="master_container">
        <input id="master_pickfiles" type="file" name="fileToUpload" class="btn btn-small" title="Select your file" data-filename-placement="inside"/>
        <button id="master_uploadfiles" type="button" class="btn btn-small btn-primary" data-toggle="collapse" data-target="#proj-master">Upload</button>
        </div>
        <div id="proj-master" class="svg-holder collapse">
            <hr>
            <div class="svg-tools m-b-20">
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-map-marker"></i> Add Marker</button>
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-crosshairs"></i> Mark Area</button>
            </div>
            <img src="../../images/demo/sky-view.jpg" class="img-responsive">
            <form>
                <div class="form-group m-t-10">
                    <label class="form-label">SVG Name</label>
                    <input type="text" class="form-control" placeholder="Enter SVG Name">
                </div>
                <div class="form-actions svg-actions">  
                    <div class="pull-right">
                        <button type="submit" class="btn btn-primary btn-cons">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>