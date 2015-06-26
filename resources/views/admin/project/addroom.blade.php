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
                <div class="col-xs-4">
                    <label class="form-label">Room Name</label>
                    <div id="room_name_box">
                    <select name="room_name" onchange="createRoomType(this);"  class="select2-container select2 form-control" data-parsley-required >
                        <option value="">Select Control Type</option>
                        @foreach($defaultRoomTypes as $defaultRoomType)
                        <option value="{{ $defaultRoomType['id'] }}"> {{ $defaultRoomType['label'] }}</option>
                        @endforeach
                        <option value="add_new"> Add New</option>
                    </select>
                    </div>    
                </div>
            </div>
            <div class="row form-group">
                <div class="col-xs-4">
                    <label class="form-label">Attribute Name</label>
                </div>
                <div class="col-xs-4">
                    <label class="form-label">Control Type</label>
                </div>
                <div class="col-xs-3">
                    <label class="form-label">Default Values</label>
                </div>
            </div>
            <div class="attributes_block">
                <div class="row form-group">
                    <div class="col-xs-4">
                        <input  name="attribute_name_room[]" type="text" class="form-control"  placeholder="Enter Attribute Name" value="Size / ({{ $project['measurement_units'] }})">
                        <input type="hidden" name="attribute_id_room[]" value="" disabled>
                    </div>
                    <div class="col-xs-4">
                        <select disabled class="select2-container select2 form-control" >
                            <option>Textbox</option>
                        </select>
                         <input type="hidden" name="controltype_room[]" value="textbox">

                    </div>
                    <div class="col-xs-3">
                        
                          <input type="hidden" name="controltypevalues_room[]" data-role="tagsinput" class="tags">
                    </div>
                    <div class="col-xs-1 text-right">
                        <a class="text-primary" onclick="deleteAttribute({{$project['id']}}, 0, this);" data-object-type="attribute"><i class="fa fa-close"></i></a>

                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-xs-4">
                        <input  name="attribute_name_room[]" type="text" class="form-control"  value="Dimension">
                    </div>
                    <div class="col-xs-4">
                        <select disabled class="select2-container select2 form-control" >
                            <option>Textbox</option>
                        </select>
                        <input type="hidden" name="controltype_room[]" value="textbox">
                    </div>
                    <div class="col-xs-3">
                         <input type="hidden" name="controltypevalues_room[]" data-role="tagsinput" class="tags">
                    </div>
                    <div class="col-xs-1 text-right">
                        <a class="text-primary" onclick="deleteAttribute({{$project['id']}}, 0, this);" data-object-type="attribute"><i class="fa fa-close"></i></a>
                    </div>
                </div>
 
                <div class="row">
                                <div class="add-unit">
                            <div class="p-t-8 p-t-10">
                                <div class="col-xs-4">
                                    <input type="text" name="attribute_name_room[]" class="form-control" placeholder="Enter Attribute Name">
                                     <input type="hidden" name="attribute_id_room[]" value="">
                                </div>
                                <div class="col-xs-4">
                                    <select name="controltype_room[]"  class="select2-container select2 form-control" >
                                        <option value="">Select Control Type</option>
                                        <option value="textbox" > Text Box</option>
                                        <option value="select" >Select Box</option>
                                        <option value="multiple" > Multiple Select Box</option>
                                        <option value="number"> Number </option>
                                    </select>

                                </div>
                                <div class="col-xs-4 controlvalue">
                                    <input type="text" name="controltypevalues_room[]" data-role="tagsinput" class="tags">
                                </div>
                            </div>
                                <div class="text-right">
                                    <a class="btn btn-link" onclick="addAttributes('room', this)">Add Attribute</a>
                                </div>
                            </div>
                             </div>

            </div>
            <div class="form-actions">  
                <div class="text-right">
                    <input type="hidden" value="{{ csrf_token()}}" name="_token"/>

                    <button onclick="saveRoom();" type="button" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
 
                </div>
            </div>
            <!-- END PLACE PAGE CONTENT HERE -->
        </div>
</div>
</form>
<!-- END PAGE CONTAINER -->
</div>
<!-- END PLACE PAGE CONTENT HERE -->
<script>
function createRoomType(obj)
{ 
    var val =$(obj).val();
    if ( val== 'add_new')
    {
        var html = '<input type="text" class="form-control" name="room_name" id="room_name" value="" data-parsley-required>';
        html += '<input type="hidden" name="roomtypecustome" value="CUSTOME">';
        $(obj).hide();
        $("#room_name_box").html(html);
        
    }
   
}
 
    </script>
@endsection
