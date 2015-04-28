
<div class="grid simple">
    <div class="grid-title"  role="tab" id="headingOne">
       <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <div class="pull-right">
            <i class="fa fa-angle-up "></i>
            <i class="fa fa-angle-down grid-angle-down"></i>
       </div>
        <h3 class="inline"><span class="semi-bold">Google Earth</span> View</h3>&nbsp;
         <a  class="inline" data-toggle="popover" 
 data-content=" Upload Google Earth image of the project. Image dimensions should be Image size :
  1600*1095. Resolution - 300 DPI."><i class="fa fa-info"></i></a>
</a>
 <div class="clearfix"></div>
       </a>
        </div>
   <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">

    <div class="grid-body">
         
        <div id="container">
      <input type="hidden" value="{{ csrf_token()}}" name="_token"/> 
            <input id="pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/> 
            <button id="uploadfiles" type="button" class="btn btn-small btn-primary hidden" data-toggle="collapse" data-target="#g-map-1">Upload</button>
            <div class="row selectedImages">
            </div>
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
</div>