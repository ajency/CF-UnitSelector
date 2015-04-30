<div class="grid-body">
    <form>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">2D Layout</label>
                    <div id="2dlayout_0">
                        @if(isset($layouts[0]['2d']))
                        <img src="{{ $layouts[0]['2d']['IMAGE'] }}" class="img-responsive img-thumbnail">
                        <button onclick="deleteLayout({{ $layouts[0]['2d']['ID'] }}, '2d');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                        @else
                        <input id="pickfiles_2d_0" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                        <button id="uploadfiles_2d_0"  type="button" class="btn btn-small hidden btn-primary">Upload</button>												
                        <div class="row selectedImages m-t-15">
                        </div>
                        @endif
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">3D Layout</label>
                    <div id="3dlayout_0">
                        @if(isset($layouts[0]['3d']))
                        <img src="{{ $layouts[0]['3d']['IMAGE'] }}" class="img-responsive img-thumbnail">
                        <button onclick="deleteLayout({{ $layouts[0]['3d']['ID'] }}, '3d');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>
                        @else
                        <input id="pickfiles_3d_0" type="button" name="fileToUpload" class="btn btn-small btn-white" value="Select your file" data-filename-placement="inside"/>
                        <button  id="uploadfiles_3d_0"type="button" class="btn btn-small hidden btn-primary">Upload</button>												
                        <div class="row selectedImages m-t-15">
                        </div>
                        @endif
                    </div>
                </div>
            </div>

        </div>

    </form>
</div>