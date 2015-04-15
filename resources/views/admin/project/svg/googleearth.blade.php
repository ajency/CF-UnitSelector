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
        <div class="row m-b-10">
          <div class="col-md-3">
                  <strong>google-earth-img.jpg</strong>
                  <button type="button" data-phase-id="1" class="btn btn-mini btn-link remove-phase">
                  <span class="fa fa-times text-danger"></span></button>
                   <div class="cf-loader"></div>
          </div>
          <div class="col-md-3">
                  <strong>google-earth-img.jpg</strong>
                  <button type="button" data-phase-id="1" class="btn btn-mini btn-link remove-phase">
                  <span class="fa fa-times text-danger"></span></button>
                   <div class="cf-loader"></div>
          </div>
          <div class="col-md-3">
<strong>google-earth-img.jpg</strong>
                  <button type="button" data-phase-id="1" class="btn btn-mini btn-link remove-phase">
                  <span class="fa fa-times text-danger"></span></button>
                  <div class="cf-loader"></div>
          </div>
          <div class="col-md-3">
               
                  <img src="http://www.websofia.com/wp-content/uploads/2013/02/gmap-publicity.png" style="width:150px;height:90px;" class="img-thumbnail"/>
          </div>
        </div> 
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
            @if(!empty($svgImages['google_earth']['IMAGE']))
            <object width="150" id="svg1" data="{{ $svgImages['google_earth']['IMAGE'] }}" type="image/svg+xml"></object>
            <button onclick="deleteSvg({{$svgImages['google_earth']['ID']}},'google_earth','');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
            @endif
            </div>
        </div>
    </div>
</div>
