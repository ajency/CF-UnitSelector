<div class="grid simple">
    <div class="grid-title">
        <h3 class="inline"><span class="semi-bold">Google Earth</span> View</h3> 
        <div class="pull-right m-t-15">
            <span class="fa fa-check text-success" ></span>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="grid-body">
        <input type="file" name="fileToUpload" class="btn btn-small" title="Select your file" data-filename-placement="inside"/>
        <button type="button" class="btn btn-small btn-primary" data-toggle="collapse" data-target="#g-map-1">Upload</button>
        <div id="g-map-1" class="svg-holder collapse">
            <hr>
            <div class="svg-tools m-b-20">
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-map-marker"></i> Add Marker</button>
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-crosshairs"></i> Mark Area</button>
            </div>
            <img src="../../images/demo/g_earth.jpg" class="img-responsive">
            <form>
                <div class="form-actions svg-actions">  
                    <div class="pull-right">
                        <button type="submit" class="btn btn-primary btn-cons">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>