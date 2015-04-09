<div class="grid simple">
    <div class="grid-title">
         <h3 class="inline"><span class="semi-bold">Sky</span> View</h3> 
        <div class="pull-right m-t-15">
            <span class="fa fa-check text-success" ></span>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="grid-body">
        <div id="skyview_container hidden">
            <input id="skyview_pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/>
            <button id="skyview_uploadfiles" type="button" class="btn btn-small btn-primary" data-toggle="collapse" data-target="#proj-master">Upload</button>
        </div>
        <div id="proj-master" class="svg-holder">
            <hr>
            <div class="svg-tools m-b-20">
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-map-marker"></i> Add Marker</button>
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-crosshairs"></i> Mark Area</button>
            </div>
            <div id="skyview_image">  
                @if(isset($svgImages['skyview']['image_url'][0]))
                    <img width="150" height="150" src="{{$svgImages['skyview']['image_url'][0]}}" class="img-responsive" >
                @endif
            </div>
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