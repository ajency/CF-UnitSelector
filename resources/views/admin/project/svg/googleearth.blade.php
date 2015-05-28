<input type="hidden" value="{{ csrf_token()}}" name="_token"/> 
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title no-border">
                <div class="row">
                    <div class="col-md-4">
                        <h3 class="inline"> <i class="fa fa-angle-double-right text-primary"></i> <span class="semi-bold">Google Earth</span> View</h3>
                   </div>
                    <div class="col-md-8">
                        <div class="alert alert-error hidden">
                            <button class="close" data-dismiss="alert"></button>
                            The image failed to upload.Please try using another image.
                        </div>
                    </div>

                </div>
            </div>
            <div class="grid-body no-border">
                <div class="alert alert-info">
                <strong><i class="fa fa-info"></i></strong>  Upload Google Earth image of the project. Image dimensions should be Image size :
                                            1600*1095. Resolution - 100 DPI.
                </div>
          
                @if(!empty($svgImages['google_earth']['IMAGE']))
                <div class="row" >
                    <div class="col-md-3">
                        <div class="img-hover img-thumbnail">
                            <a class="btn btn-link btn-danger overlay" onclick="deleteSvg({{$svgImages['google_earth']['ID']}}, 'google_earth', '');"><i class="fa fa-close text-primary"></i></a>
                            <object style="  width: 150px;height: 93px;" id="svg1" data="{{ $svgImages['google_earth']['IMAGE'] }}" type="image/svg+xml"></object>
                            <div class="dz-size" data-dz-size="">{{ $svgImages['google_earth']['NAME'] }}</div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <h5 class="semi-bold">To use the Authoring Tool<a href="#" class="text-primary"> click here</a></h5>
                    </div>
                    
                    <div class="col-md-4 hidden">

                        <div class="user-description-box hidden">
                            To check the preview of the image on the frontend 
                            <div><a href="#" class="text-primary"> click here <i class="fa fa-angle-double-right"></i></a></div>
                        </div>
                    </div>
                </div>
                @else
                <div class="row" id="google_earth_image">
                    <div class="col-md-3">
                        <div class="img-hover img-thumbnail">
                            <div id="pickfiles" style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                    <i class="fa fa-image" style="font-size:30px;"></i>
                                    <p class="">Select File</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                     <div class="col-md-5">
                    </div>
                    <div class="col-md-4">
                        <div class="user-description-box">
                            <span class="alert-error"><i class="fa fa-close"></i> No records found</span><br>
                            <span class="alert-success"><i class="fa fa-check"></i> Project Location marked</span>
                            <div><a href="#" class="text-primary"> Authoring Tool <i class="fa fa-angle-double-right"></i></a></div>
                        </div>
                    </div>
                </div>
                
                @endif
               
                
            </div>

        </div>
    </div>
</div>
 


