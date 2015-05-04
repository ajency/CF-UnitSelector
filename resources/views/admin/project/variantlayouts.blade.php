@foreach($variantRooms as $level=>$roomAttributes)

<div class="grid-body">
    <form>
        <h5 class="semi-bold inline">Level {{$level}}</h5>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group object-layouts" data-object-type="2d">
                    <label class="form-label">2D Layout</label>
                    <div id="2dlayout_{{$level}}">
                        @if(isset($layouts[$level]['2d']))
                        <img src="{{ $layouts[$level]['2d']['IMAGE'] }}" class="img-responsive">
                        <button onclick="deleteLayout({{ $layouts[$level]['2d']['ID'] }}, '2d');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>

                        <div class="row">
                        </div>
                        @else
                        <input id="pickfiles_2d_{{$level}}" type="button" name="fileToUpload" class="btn btn-small btn-default" value="Select your file" data-filename-placement="inside"/>

                        <button id="uploadfiles_2d_{{$level}}" type="button" class="btn btn-small hidden btn-primary">Upload</button>												
                        <div class="row selectedImages m-t-15">
                        </div>
                        @endif
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">3D Layout</label>
                    <div id="3dlayout_{{$level}}">
                        @if(isset($layouts[$level]['3d']))
                        <img src="{{ $layouts[$level]['3d']['IMAGE'] }}" class="img-responsive img-thumbnail">
                        <button onclick="deleteLayout({{ $layouts[$level]['3d']['ID'] }}, '3d');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>               
                        @else
                        <input id="pickfiles_3d_{{$level}}" type="button" name="fileToUpload" class="btn btn-small btn-default" value="Select your file" data-filename-placement="inside"/>
                        <button  id="uploadfiles_3d_{{$level}}"type="button" class="btn btn-small hidden btn-primary">Upload</button>												
                        <div class="row selectedImages m-t-15">
                        </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>

    </form>
</div>
@endforeach