@extends('layouts.shortcut')

@section('content')
<!-- BEGIN PAGE TITLE -->

<div class="grid simple">
    <div class="grid-title no-border">
        <h3 > <i class="fa fa-angle-double-right text-primary"></i> Room <span class="semi-bold">Details</span></h3>
    </div>
    <form action="/admin/project/{{ $project['id'] }}/roomtype/{{$room['id']}}" method="POST" data-parsley-validate>
        <div class="grid-body no-border">

            <div class="row form-group">
                <div class="col-xs-4">
                    <label class="form-label">Room Name</label>
                    <div id="room_name_box">
                    <select name="room_name" onchange="createRoomType(this);"  class="select2-container select2 form-control" data-parsley-required disabled>
                        <option value="">Select Control Type</option>
                        @foreach($defaultRoomTypes as $defaultRoomType)
                        <option @if($room['name']==$defaultRoomType['id']){{'selected'}}@endif value="{{ $defaultRoomType['id'] }}"> {{ $defaultRoomType['label'] }}</option>
                        @endforeach
                        @foreach($customeRoomTypes as $customeRoomType)
                        <option @if($room['name']==$customeRoomType['id']){{'selected'}}@endif value="{{ $customeRoomType['id'] }}"> {{ $customeRoomType['label'] }}</option>
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
               @if(isset($roomtypeAttributes['ATTRIBUTES']))
                            @foreach($roomtypeAttributes['ATTRIBUTES'] as $roomtypeAttribute)

                            <div class="row form-group">
                                <div class="col-xs-4">
                                    <input type="text" name="attribute_name_room[]" class="form-control" value="{{$roomtypeAttribute['label']}}" placeholder="Enter Attribute Name" disabled>
                                    <input type="hidden" name="attribute_id_room[]" value="{{$roomtypeAttribute['id']}}" disabled>

                                </div>
                                <div class="col-xs-4">
                                    <select name="controltype_room[]" class="select2-container select2 form-control" disabled>
                                        <option value="">Select Control Type</option>
                                        <option value="textbox" @if($roomtypeAttribute['control_type']=='textbox'){{'selected'}}@endif> Text Box</option>
                                        <option value="select" @if($roomtypeAttribute['control_type']=='select'){{'selected'}}@endif>Select Box</option>
                                        <option value="multiple" @if($roomtypeAttribute['control_type']=='multiple'){{'selected'}}@endif> Multiple Select Box</option>
                                        <option value="media" @if($roomtypeAttribute['control_type']=='number'){{'selected'}}@endif> Number </option>
                                    </select>
                                </div>
                                <div class="col-xs-3">
                                    <input type="text" name="controltypevalues_room[]" data-role="tagsinput" class="tags" value="{{$roomtypeAttribute['defaults']}}" disabled >

                                </div>
                                <div class="col-xs-1 text-right">
                                    <a class="btn btn-link" onclick="deleteAttribute({{$project['id']}},{{$roomtypeAttribute['id']}}, this);"><i class="fa fa-close"></i></a>
                                </div>
                            </div>
                            @endforeach
                            @endif
             
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
                    <input type="hidden" name="_method" value="PUT">
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
 <script>
    
    function updateRoom()
    {   
        var ROOMTYPES = '<option value="">Select Room</option>';
        @foreach($availableRoomTypes as $roomTypeId => $roomType)
        ROOMTYPES += "<option value=\"{{$roomTypeId}}\">{{$roomType}}</option>";
        @endforeach
        ROOMTYPES += "<option value='add_new'>Add New</option>";
         
       $('select[name="room_type[]"]', window.parent.document).html(ROOMTYPES);
       
       @if(!isset($_GET['flag']))
       updateRoomAttributes();
       @endif
    
    }
     window.onload = updateRoom;
    
 </script>

<!-- END PLACE PAGE CONTENT HERE -->
<script>
function createRoomType(obj)
{ 
    var val =$(obj).val();
    if ( val== 'add_new')
    {
        var html = '<input type="text" class="form-control" name="room_name" id="room_name" value="">';
        html += '<input type="hidden" name="roomtypecustome" value="CUSTOME">';
        $(obj).hide();
        $("#room_name_box").html(html);
        
    }
   
}
</script>
@endsection
