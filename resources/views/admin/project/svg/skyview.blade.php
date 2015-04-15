<div class="grid simple">
    <div class="grid-title">
         <h3 class="inline"><span class="semi-bold">Sky</span> View</h3> 
        <div class="pull-right m-t-15">
            <span class="fa fa-check text-success" ></span>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="grid-body">
        <div id="skyview_container">
        <input id="skyview_pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/>
        <button id="skyview_uploadfiles" type="button" class="btn btn-small btn-primary" data-toggle="collapse" data-target="#proj-master">Upload</button>
        </div>
        <div id="proj-master" class="svg-holder">
            <hr>
            <div class="svg-tools m-b-20 hidden">
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-map-marker"></i> Add Marker</button>
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-crosshairs"></i> Mark Area</button>
            </div>
            <div id="skyview_image">  
                @if(!empty($svgImages['skyview']['IMAGE']))
                <img width="150" height="150" src="{{ $svgImages['skyview']['IMAGE'] }}" class="img-responsive" >
                <button onclick="deleteSvg({{$svgImages['skyview']['ID']}},'skyview');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                @endif
            </div>
        </div>
    </div>
</div>