<div class="grid simple">

    <div class="grid-title">
        <h3 class="inline">Project <span class="semi-bold">Master</span></h3> 
        <div class="pull-right m-t-15">
            <span class="fa fa-check text-success" ></span>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="grid-body">

        <div class="row">
            @if(isset($svgImages['master']))  
            @for ($i=0 ; $i<count($svgImages['master']) ; $i++)
                <div class="col-sm-2">
                    <img src="{{ $svgImages['master']['image_url'][$i] }}" class="img-responsive img-thumbnail" data-toggle="collapse" data-target="#sky-map-a">
                    <h5 class="bold inline">SVG {{ $i+1 }}</h5> <i class="fa fa-bookmark text-primary"></i>
                    <span class="pull-right m-t-10"><small>Pos {{ $i+1 }}</small></span>
                </div>

                @endfor
                @endif  
        </div>

        <div id="sky-map-a" class="svg-holder collapse">
            <hr>
            <form>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="form-label">SVG Name</label>
                            <input type="text" class="form-control" placeholder="Enter SVG Name">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="form-label">Sequence Position</label>
                            <select id="seq_pos" class="select2 form-control">
                                <option value="">Select Position</option>
                                <option>Position 1</option>
                                <option>Position 2</option>
                                <option>Position 3</option>
                                <option>Position 4</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group m-t-35">
                            <div class="checkbox check-primary">
                                <input id="checkbox2" type="checkbox" value="1" checked="checked">
                                <label for="checkbox2">Has Action</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="svg-tools m-b-20">
                    <button type="button" class="btn btn-mini btn-default"><i class="fa fa-map-marker"></i> Add Marker</button>
                    <button type="button" class="btn btn-mini btn-default"><i class="fa fa-crosshairs"></i> Mark Area</button>
                </div>
                <img src="../../images/demo/sky-view.jpg" class="img-responsive">
                <div class="svg-actions m-t-20">  
                    <div class="pull-right">
                        <button type="submit" class="btn btn-primary btn-cons">Save</button>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </form>
        </div>

        <hr>
        <div id="master_container">
            <input id="master_pickfiles" type="button" name="fileToUpload" class="btn btn-small" value="Select your file" data-filename-placement="inside"/>
            <button id="master_uploadfiles" type="button" class="btn btn-small btn-primary" data-toggle="collapse" data-target="#sky-map-1">Upload</button>
        </div>
        <div id="sky-map-1" class="svg-holder collapse">
            <hr>
            <div class="svg-tools m-b-20">
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-map-marker"></i> Add Marker</button>
                <button type="button" class="btn btn-mini btn-default"><i class="fa fa-crosshairs"></i> Mark Area</button>
            </div>
            <img src="../../images/demo/sky-view.jpg" class="img-responsive">
            <form>
                <div class="form-group m-t-10">
                    <label class="form-label">SVG Name</label>
                    <input type="text" class="form-control" placeholder="Enter SVG Name">
                </div>
                <div class="form-actions svg-actions">  
                    <div class="pull-right">
                        <button type="submit" class="btn btn-primary btn-cons">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>