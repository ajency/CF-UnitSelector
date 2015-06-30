<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title no-border"> 
                <div class="row object-master-images" data-object-id="{{ $project['id'] }}" data-object-type="project">
                    <div class="col-md-8 ">
                        <h3 class="inline"> <i class="fa fa-angle-double-right text-primary"></i> <span class="semi-bold">Project Master</span> Image</h3>&nbsp;&nbsp;    
                        
                        <a id="master_pickfiles"  class="file-input-wrapper btn btn-default  btn btn-small"><i class="fa fa-image"></i> Select file (s)</a>
                    <div class="project-master-images">    
                        <div class="alert alert-error hidden">
                            <button class="close" data-dismiss="alert"></button>
                            <span class="errormsg"></span>
                        </div>
                     </div>    
                    </div>
                    <div class="col-md-4 hidden">
                        <div class="user-description-box" style="color: #6f7b8a;">
                            To check the preview of the image on the frontend 
                            <div><a href="#" class="text-primary"> click here <i class="fa fa-angle-double-right"></i></a>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="grid-body no-border">
                <div class="alert alert-info">
                <strong><i class="fa fa-info"></i></strong> Upload 3D view of the project. To enable 360 degree rotation of the project ,                upload images in the sequence ( Front -> Right -> Back -> Left). 
                             Image dimensions should be - 
                                            1600*800. Resolution - 100 DPI. Supported file formats jpg, jpeg, png.
                            Naming convention to be followed for the images uploaded - Imagename-00 (E.g Master-00(first image), Master-01 and so on).
                </div>
                <div class="dataTables_wrapper form-inline" role="grid">
                    <table class="table table-striped dataTable">
                        <thead>
                        <th style="width: 16%;" data-hide="phone,tablet" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Image</th>
                        <th style="width: 9%;" data-hide="phone,tablet" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">Position</th>

                        <th style="width: 9%;" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">Breakpoint</th>

                        <th style="width: 9%;" class="" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending"></th>

                        <th style="width:6%" class="text-right" role="columnheader" tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending">
                            <button type="button" onclick="saveBreakPoint()" class="btn btn-primary btn-small">Save Breakpoint</button>
                        </th>
                        </thead>
                        <tbody id="master-img">
                            @if(!empty($svgImages['master']))

                            @foreach($svgImages['master'] as $position=> $image)

                            @if(isset($image['IMAGE']))
                            <?php
                            
                            $authoringToolUrl = url() . "/admin/project/" . $project['id'] . "/image/" .  $image['ID'] . "/authoring-tool?&type=master&position=".$position;
                            ?>
                            <tr class="gradeX odd" id="position-{{ $position }}">
                                <td class="">{{ $image['NAME'] }}</td>
                                <input type="hidden" name="image_id" value="{{$image['ID']}}">
                                <td class=" "><span class="muted">{{ $position }}</span></td>
                                <td class=" ">
                                    <div class="checkbox check-primary" >
                                        <input id="checkbox{{ $position }}" {{ (isset($svgImages['breakpoints']) && in_array($position,$svgImages['breakpoints'])) ? 'checked' : '' }}   name="position[]" type="checkbox" value="{{ $position }}">
                                               <label for="checkbox{{ $position }}"></label>
                                    </div>
                                </td>
                                <td class=" ">
                                    <a target="_blank" href=" {{$authoringToolUrl}} " class=" {{ (isset($svgImages['breakpoints']) && in_array($position,$svgImages['breakpoints'])) ? '' : 'hidden' }} auth-tool-{{ $position }} " >Authoring Tool</a>
                                </td>

                                <td class="text-right">
                                    <a class="text-primary" onclick="deleteSvg({{ $image['ID'] }}, 'master','{{ $position }}');"><i class="fa fa-close"></i></a>
                                </td>
                            </tr>
                                @else
                           <tr class="gradeX odd" id="position-{{ $position }}">
                                <td class=""></td>
                                <td class=" "><span class="muted">{{ $position }}</span></td>
                                <td class=" ">
                                  
                                </td>
                                <td class=" ">
                                   
                                </td>

                                <td class="text-right">
                                   
                                </td>
                            </tr>

                            @endif 
                            @endforeach
                            @endif

                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    </div>
</div>