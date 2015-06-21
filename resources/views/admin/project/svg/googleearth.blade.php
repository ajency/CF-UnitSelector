<input type="hidden" value="{{ csrf_token()}}" name="_token"/> 
<div class="row userauth" date-user-auth="{{(hasPermission($project['id'],['svg_auth_tool']))?1:0 }}">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title no-border">
                <div class="row object-master-images"  data-object-id="{{ $project['id'] }}" data-object-type="project" >
                    <div class="col-md-4">
                        <h3 class="inline"> <i class="fa fa-angle-double-right text-primary"></i> <span class="semi-bold">Google Earth</span> View</h3>
                   </div>
                    <div class="col-md-8 google-earth-images">
                    </div>

                </div>
            </div>
            <div class="grid-body no-border">
                <div class="alert alert-info">
                <strong><i class="fa fa-info"></i></strong>  Upload Google Earth image of the project with filename 'map'. 
                Image dimensions should not be less than - 1600*1095. Resolution - 100 DPI. Supported file formats jpg, jpeg, png.
                </div>
          
                @if(!empty($svgImages['google_earth']['IMAGE']))
                <?php 
                $authoringToolUrl = url() . "/admin/project/" . $project['id'] . "/image/" . $svgImages['google_earth']['ID'] . "/authoring-tool?&type=google_earth";
                ?>
                <div class="row" >
                    <div class="col-md-3">
                        <div class="img-hover img-thumbnail">
                            <a class="btn btn-link btn-danger overlay" onclick="deleteSvg({{$svgImages['google_earth']['ID']}}, 'google_earth', '');"><i class="fa fa-close text-primary"></i></a>
                            <img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="{{ $svgImages['google_earth']['IMAGE'] }}"   />
           
                            <div class="dz-size" data-dz-size="">{{ $svgImages['google_earth']['NAME'] }}</div>
                        </div>
                    </div>
                    @if(hasPermission($project['id'],['svg_auth_tool']))
                    <div class="col-md-9">
                        <h5 class="semi-bold">To use the Authoring Tool<a href="{{$authoringToolUrl}}" target="_blank" class="text-primary"> click here</a></h5>
                    </div>
                    @endif
                   
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
                     <div class="col-md-9">
                    </div>
                   
                </div>
                
                @endif
               
                
            </div>

        </div>
    </div>
</div>
 


