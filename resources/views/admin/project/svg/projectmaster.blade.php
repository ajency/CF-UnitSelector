
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

                <div>
            <input id="master_pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/> 
            <button id="master_uploadfiles" type="button" class="btn btn-small btn-primary" data-toggle="collapse" data-target="#master-img" >Upload</button>
            
            <button style="float: right" type="button" onclick="saveBreakPoint()" class="btn btn-small btn-primary" >Save Breakpoint</button>
                </div>
                <hr/>
             <div id="master-img"  >    
                 @if(!empty($svgImages['master']))
                
                 @foreach($svgImages['master'] as $position=> $image)
                  
                 @if(isset($image['IMAGE']))
                 <div class="row" id="position-{{ $position }}">
                    <div class="col-md-4">
                        <img src="{{ $image['IMAGE'] }}" style="width:150px;height:90px;" class="img-thumbnail"> 
                    </div>
                    <div class="col-md-4">
                        <h4>{{ $position }}</h4>
                    </div>
                    <div class="col-md-4">
                        <input  {{ (isset($svgImages['breakpoints']) && in_array($position,$svgImages['breakpoints'])) ? 'checked' : '' }}   name="position[]" type="checkbox" value="{{ $position }}" data-toggle="toggle">
                       <button onclick="deleteSvg({{ $image['ID'] }},'master','{{ $position }}');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button> 
                    </div>
                </div>
                 @else
                 <div class="row" id="position-{{ $position }}">
                    <div class="col-md-4">
                        
                    </div>
                    <div class="col-md-4">
                        <h4>{{ $position }}</h4>
                    </div>
                </div>
                  @endif 
                 <hr/> 
                 @endforeach
                 @endif

               
            </div>
            </div>
        </div>
    </div>
</div>