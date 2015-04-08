$.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

function addRoomtype(project_id)
{
    var roomtypename = $("#roomtype").val();
    $.ajax({
        url: "/admin/project/" + project_id + "/roomtype",
        type: "POST",
        data: {
            project_id: project_id,
            roomtypename: roomtypename
        },
        dataType: "JSON",
        success: function (response) {
            var roomtypeId = response.data.roomtype_id;
            
            var str = '<form name="frmroomtype_' + roomtypeId + '" id="frmroomtype_' + roomtypeId + '">';
            str += '<div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 m-b-10 text-grey">';
            str += '<div class = "form-inline m-b-10 m-t-10" >';
            str += '<div class = "form-group" >';
            str += '<input type = "text" name = "room_typename_' + roomtypeId + '" class = "form-control" value = "' + roomtypename + '" >';
            str += '</div>';
            str += '</div>';

            str += '<div class = "row" >';
            str += '<div class = "col-md-3" >';
            str += '<div class = "form-group" >';
            str += '<div class = "" >';
            str += '<input type = "text" name = "attribute_name_' + roomtypeId + '" class = "form-control" placeholder ="Attribute Name">';
            str += '<input type = "hidden" name = "attribute_id_' + roomtypeId + '" value = "" >';
            str += ' </div>';
            str += '</div>';
            str += '</div>';
            str += '<div class = "col-md-4" >';
            str += '<div class = "form-inline" >';
            str += '<div class = "form-group" >';
            str += '<select name = "controltype_' + roomtypeId + '" >';
            str += '<option value = "" > Controls </option>';
            str += '<option value = "textbox" > Text Box </option>';
            str += '<option value = "textarea" > Textarea </option>';
            str += '<option value = "select" > Select Box </option>';
            str += '<option value = "multiple" > Multiple Select Box </option>';
            str += '<option value = "radio" > Radio </option>';
            str += '<option value = "checkbox" > Checkbox </option>';
            str += '<option value = "media" > Media </option>';
            str += '</select>';
            str += '<button type="button" class = "btn btn-white" onclick="addRoomtypeAttributes("' + roomtypeId + '",this)"> <i class ="fa fa-plus" > </i></button>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<div class = "col-md-5" id = "controltype_values_' + roomtypeId + '">';
            str += '<div class = "form-inline" >';
            str += '<div class = "form-group" >';
            str += '<input type = "controltypevalues_' + roomtypeId + '" class = "form-control" placeholder = "" >';
            //str += '<button class = "btn btn-small btn-default m-t-5" > <i class = "fa fa-trash" > </i> Delete</button>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<div class = "row" id="addroomtypeattributeblock_' + roomtypeId + '">';
            str += '<div class = "col-md-12" >';
            str += '<div class = "text-right" >';
            str += '<button type="button" class = "btn btn-small btn-primary" onclick="saveRoomypeattribute('+project_id+',' + roomtypeId + ',\'room_type\');" > <i class = "fa fa-save" > </i> Save</button>';
            str += '<button class = "btn btn-small btn-default" > <i class = "fa fa-trash" > </i> Delete</button >';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div> ';
            str += '</form> ';

            $("#addroomtypeblock").before(str);
            $("#roomtype").val('');
            $("select").select2();
        }
    });
}

function addRoomtypeAttributes(roomtypeId,obj)
{
     var str = '<div class = "row" >';
            str += '<div class = "col-md-3" >';
            str += '<div class = "form-group" >';
            str += '<div class = "" >';
            str += '<input type = "text" name = "attribute_name_' + roomtypeId + '" class = "form-control" placeholder ="Attribute Name">';
            str += '<input type = "hidden" name = "attribute_id_' + roomtypeId + '" value = "" >';
            str += ' </div>';
            str += '</div>';
            str += '</div>';
            str += '<div class = "col-md-4" >';
            str += '<div class = "form-inline" >';
            str += '<div class = "form-group" >';
            str += '<select name = "controltype_' + roomtypeId + '" >';
            str += '<option value = "" > Controls </option>';
            str += '<option value = "textbox" > Text Box </option>';
            str += '<option value = "textarea" > Textarea </option>';
            str += '<option value = "select" > Select Box </option>';
            str += '<option value = "multiple" > Multiple Select Box </option>';
            str += '<option value = "radio" > Radio </option>';
            str += '<option value = "checkbox" > Checkbox </option>';
            str += '<option value = "media" > Media </option>';
            str += '</select>';
            str += '<button type="button" class = "btn btn-white" onclick="addRoomtypeAttributes(\'' + roomtypeId + '\',this)"> <i class ="fa fa-plus" > </i></button>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<div class = "col-md-5" id = "controltype_values_' + roomtypeId + '" >';
            str += '<div class = "form-inline" >';
            str += '<div class = "form-group" >';
            str += '<input type = "controltypevalues_' + roomtypeId + '" class = "form-control" placeholder = "" >';
           // str += '<button class = "btn btn-small btn-default m-t-5" > <i class = "fa fa-trash" > </i> Delete</button>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';


            $("#addroomtypeattributeblock_"+roomtypeId).before(str);
            $(obj).hide();
            
}

function saveRoomypeattribute(project_id,roomtypeId,reffrence_type)
{  
    $.ajax({
        url: "/admin/project/" + project_id + "/roomtype/"+roomtypeId,
        type: "POST",
        data: {
            roomtypeattrData:$("#frmroomtype_"+roomtypeId).serializeArray(),
            reffrence_type: reffrence_type,
            _method: 'PUT'
        },
        success: function (response) {
            window.location.reload();
        }
    });
}