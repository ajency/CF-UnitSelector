
<div class="grid simple">
<div class="grid-title" role="tab" id="headingTwo">
       <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
       <div class="pull-right"><i class="fa fa-angle-down grid-angle-down"></i>
<i class="fa fa-angle-up "></i>
         </div>
        <h3>Project <span class="semi-bold">Master</span></h3> 
        </a>
    </div>
<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
<div class="grid-body object-master-images" data-object-id="{{ $project['id'] }}" data-object-type="project">
        <div class="row project-master-images">
            <div class="front-svg">
                <h4 class="inline">Front Svg</h4> 
                <div>
                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                </div>
                <div class="uploaded-image">
                    @if(!empty($svgImages['master']['front']['IMAGE']))
                        <object width="150" data="{{ $svgImages['master']['front']['IMAGE'] }}" type="image/svg+xml"></object>
                         <button onclick="deleteSvg({{ $svgImages['master']['front']['ID'] }},'master','front');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                    @endif
                </div>
            </div>
               <hr />
             <div class="right-svg">
                <h4 class="inline">Right Svg</h4> 
                <div>
                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                </div>
                <div class="uploaded-image">
                    @if(!empty($svgImages['master']['right']['IMAGE']))
                        <object width="150" data="{{ $svgImages['master']['right']['IMAGE'] }}" type="image/svg+xml"></object>
                        <button onclick="deleteSvg({{ $svgImages['master']['right']['ID'] }},'master','right');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                    @endif
                </div>
            </div>
         
            <hr />
             <div class="back-svg">
                <h4 class="inline">Back Svg</h4> 
                <div>
                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                </div>
                <div class="uploaded-image">
                    @if(!empty($svgImages['master']['back']['IMAGE']))
                        <object width="150" data="{{ $svgImages['master']['back']['IMAGE'] }}" type="image/svg+xml"></object>
                        <button onclick="deleteSvg({{ $svgImages['master']['back']['ID'] }},'master','back');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                   @endif
                </div>
            </div>
            <hr />
            <div class="left-svg">
                <h4 class="inline">Left Svg</h4> 
                <div>
                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                </div>
                <div class="uploaded-image">
                    @if(!empty($svgImages['master']['left']['IMAGE']))
                        <object width="150" data="{{ $svgImages['master']['left']['IMAGE'] }}" type="image/svg+xml"></object>
                         <button onclick="deleteSvg({{ $svgImages['master']['left']['ID'] }},'master','left');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                    @endif
                </div>
            </div>
            <hr />
                   <div class="right-front-svg">
                <h4 class="inline">Front to Right transition images</h4> 
                <div>
                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                </div>
                <div class="row uploaded-images">
                @if(!empty($svgImages['master']['right-front']))  
                    @for ($i=0, $len = count($svgImages['master']['right-front']); $i < $len ; $i++)
                        <div class="col-sm-2">
                            <img  width="150" height="150" src="{{ $svgImages['master']['right-front'][$i]['IMAGE'] }}" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                            <h5 class="bold inline">SVG {{ $i+1 }}</h5> <i class="fa fa-bookmark text-primary"></i>
                            <span class="pull-right m-t-10"><small>Pos {{ $i+1 }}</small></span>
                            <button onclick="deleteSvg({{ $svgImages['master']['right-front'][$i]['ID'] }},'master','right-front');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                        </div>
                    @endfor
                @endif 
                </div>
            </div>
            <hr/>
                 <div class="back-right-svg">
                <h4 class="inline">Right to Back transition images</h4> 
                <div>
                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                </div>
                <div class="row uploaded-images">
                @if(!empty($svgImages['master']['back-right']))  
                    @for ($i=0, $len = count($svgImages['master']['back-right']); $i < $len ; $i++)
                        <div class="col-sm-2">
                            <img  width="150" height="150" src="{{ $svgImages['master']['back-right'][$i]['IMAGE'] }}" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                            <h5 class="bold inline">SVG {{ $i+1 }}</h5> <i class="fa fa-bookmark text-primary"></i>
                            <span class="pull-right m-t-10"><small>Pos {{ $i+1 }}</small></span>
                            <button onclick="deleteSvg({{ $svgImages['master']['back-right'][$i]['ID'] }},'master','back-right');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                        </div>
                    @endfor
                @endif 
                </div>
            </div>
            <hr />
                <div class="left-back-svg">
                <h4 class="inline">Back to Left transition images</h4> 
                <div>
                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                </div>
                <div class="row uploaded-images">
                @if(!empty($svgImages['master']['left-back']))  
                    @for ($i=0, $len = count($svgImages['master']['left-back']); $i < $len ; $i++)
                        <div class="col-sm-2">
                            <img  width="150" height="150" src="{{ $svgImages['master']['left-back'][$i]['IMAGE'] }}" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                            <h5 class="bold inline">SVG {{ $i+1 }}</h5> <i class="fa fa-bookmark text-primary"></i>
                            <span class="pull-right m-t-10"><small>Pos {{ $i+1 }}</small></span>
                            <button onclick="deleteSvg({{ $svgImages['master']['left-back'][$i]['ID'] }},'master','left-back');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                        </div>
                    @endfor
                @endif 
                </div>
            </div>
            <hr/>
           <div class="front-left-svg">
                <h4 class="inline">Left to Front Transition images</h4> 
                <div>
                    <input type="button" name="fileToUpload" class="master_pickfiles btn btn-small" value="Select your file" data-filename-placement="inside"/>
                    <button type="button" class="master_uploadfiles btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
                </div>
                <div class="row uploaded-images">
                @if(!empty($svgImages['master']['front-left']))  
                    @for ($i=0, $len = count($svgImages['master']['front-left']); $i < $len ; $i++)
                        <div class="col-sm-2">
                            <img  width="150" height="150" src="{{ $svgImages['master']['front-left'][$i]['IMAGE'] }}" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                            <span class="pull-right m-t-10"><small>Pos {{ $i+1 }}</small></span>
                            <button onclick="deleteSvg({{ $svgImages['master']['front-left'][$i]['ID'] }},'master','front-left');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                        </div>
                    @endfor
                @endif 
                </div>
            </div>
   </div>
    </div>
</div>
</div>