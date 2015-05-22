@extends('layouts.shortcut')

@section('content')
<!-- BEGIN PAGE TITLE -->

<div class="grid simple">
    <div class="grid-title no-border">
        <h3 > <i class="fa fa-angle-double-right text-primary"></i> Room <span class="semi-bold">Details</span></h3>
    </div>
    <form action="/admin/project/{{ $project['id'] }}/roomtype" method="POST" data-parsley-validate>
        <div class="grid-body no-border">

            <div class="row form-group">
                <div class="col-md-4">
                    <label class="form-label">Room Name</label>
                    <input type="text" class="form-control" name="room_name" value="">
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-3">
                    <label class="form-label">Attribute Name</label>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Control Type</label>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Default Values</label>
                </div>
            </div>
            <div class="attributes_block">
                <div class="row form-group">
                    <div class="col-md-3">
                        <input  name="attribute_name_room[]" type="text" class="form-control"  placeholder="Enter Attribute Name" value="Size">
                    </div>
                    <div class="col-md-3">
                         <input type="hidden" name="controltype_room[]" value="textbox">

                    </div>
                    <div class="col-md-4">

                    </div>
                    <div class="col-md-2 ">
                        <a class="btn btn-link" onclick="deleteAttribute({{$project['id']}}, 0, this);"><i class="fa fa-close"></i></a>

                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-md-3">
                        <input  name="attribute_name_room[]" type="text" class="form-control"  value="Dimension">
                    </div>
                    <div class="col-md-3">
                        <input type="hidden" name="controltype_room[]" value="textbox">
                    </div>
                    <div class="col-md-4">

                    </div>
                    <div class="col-md-2 ">
                        <a class="btn btn-link" onclick="deleteAttribute({{$project['id']}}, 0, this);"><i class="fa fa-close"></i></a>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <input type="text" name="attribute_name_room[]" class="form-control" placeholder="Enter Attribute Name">


                    </div>
                    <div class="col-md-3">
                        <select name="controltype_room[]"  class="select2-container select2 form-control" >
                            <option value="">Select Control Type</option>
                            <option value="textbox" > Text Box</option>
                            <option value="select" >Select Box</option>
                            <option value="multiple" > Multiple Select Box</option>
                            <option value="number"> Number </option>
                        </select>

                    </div>
                    <div class="col-md-4">
                        <input type="text" name="controltypevalues_room[]" data-role="tagsinput" class="tags">
                    </div>
                    <div class="col-md-2">
                        <a class="btn btn-link" onclick="addAttributes('room', this)"><i class="fa fa-plus"></i> Attribute</a>
                    </div>
                </div>

            </div>
            <div class="form-actions">  
                <div class="text-right">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>

                    <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
 
                </div>
            </div>
            <!-- END PLACE PAGE CONTENT HERE -->
        </div>
</div>
</form>
<!-- END PAGE CONTAINER -->
</div>
<!-- END PLACE PAGE CONTENT HERE -->
 
@endsection
