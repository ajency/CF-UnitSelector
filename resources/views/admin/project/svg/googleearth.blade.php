<div class="grid simple">
    <div class="grid-title">
        <h3 class="inline"><span class="semi-bold">Google Earth</span> View</h3> 
        <div class="pull-right m-t-15">
            <span class="fa fa-check text-success" ></span>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="grid-body">
        <div id="container"> 
            <input type="hidden" value="{{ csrf_token()}}" name="_token"/> 
            <input id="pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/> 
            <button id="uploadfiles" type="button" class="btn btn-small btn-primary" data-toggle="collapse" data-target="#g-map-1">Upload</button>
        </div>

        <div id="g-map-1" class="svg-holder">
            <hr>
            <div class="svg-tools m-b-20 hidden">
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-map-marker"></i> Add Marker</button>
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-crosshairs"></i> Mark Area</button>
            </div>
            <div id="project_googleearth_image">  
            @if(isset($svgImages['google_earth']['image_url'][0]))
            <object width="150" id="svg1" data="{{$svgImages['google_earth']['image_url'][0]}}" type="image/svg+xml"></object>
            @endif
            </div>
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
