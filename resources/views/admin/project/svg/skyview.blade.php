
<div class="grid simple">
    <div class="grid-title" role="tab" id="headingThree">
    <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
<div class="pull-right"><i class="fa fa-angle-down grid-angle-down"></i>
<i class="fa fa-angle-up "></i>
         </div>
<h3>Step 2: <span class="semi-bold">3D Image of Project</span></h3>(1 or 20 images)
</a> 
    </div>
        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
<div class="grid-body">
       <div class="user-description-box m-b-15">
<p>Upload 3D view of the project. To enable 360 degree rotation of the project ,upload 20 images in the sequence of rotation. Image dimension should be Image size : 1600*1095. Resolution - 300 DPI.The images   will be uploaded as shown below.</p>   
<img src="http://www.websofia.com/wp-content/uploads/2013/02/gmap-publicity.png" style="width:150px;height:90px;" class="img-thumbnail">
         </div>
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
                <button onclick="deleteSvg({{$svgImages['skyview']['ID']}},'skyview','');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                @endif
            </div>
        </div>
    </div>
</div>
</div>