$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
function validateTitle(obj)
{
    $(".cf-loader").removeClass('hidden');
    $.ajax({
        url: "/admin/project/validateprojecttitle",
        type: "POST",
        data: {
            title: obj.value,
            project_id: PROJECTID
        },
        dataType: "JSON",
        success: function (response) {
            if (!response.data)
                $(obj).val('');

            $(".cf-loader").addClass('hidden');
        }
    });
}

function validateEmail(obj, userId)
{
    $(obj).closest(".form-group").find(".cf-loader").removeClass('hidden');
    $.ajax({
        url: "/admin/user/validateuseremail",
        type: "POST",
        data: {
            email: obj.value,
            user_id: userId
        },
        dataType: "JSON",
        success: function (response) {
            if (!response.data)
                $(obj).val('');

            $(obj).closest(".form-group").find(".cf-loader").addClass('hidden');
        }
    });
}

function validateUserPassword(obj, userId)
{
    $(obj).closest(".form-group").find(".cf-loader").removeClass('hidden');
    $.ajax({
        url: "/admin/user/validateuserpassword",
        type: "POST",
        data: {
            password: obj.value,
            user_id: userId
        },
        dataType: "JSON",
        success: function (response) {
            if (!response.data)
                $(obj).val('');

            $(obj).closest(".form-group").find(".cf-loader").addClass('hidden');
        }
    });
}

function addRoomtype(project_id)
{
    var roomtypename = $("#roomtype").val();
    if (roomtypename.trim() == '')
    {
        alert('Enter Room Type Name');
        return false;
    }

    $("#loader").show();
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
            str += '<div class = "form-group" ><label>Room Name</label>';
            str += '<input type = "text" name = "room_typename_' + roomtypeId + '" class = "form-control" value = "' + roomtypename + '" >';
            str += '</div>';
            str += '</div>';
            str += '<div class="row">';
            str += '<div class="col-md-3">';
            str += '<div class="form-group">';
            str += '<label class="form-label">Attribute Name</label>';
            str += '<i class="fa fa-question-circle " data-toggle="tooltip" data-placement="right" title="Attributes Name will be the specification for each room type for example (Area, Length * Width, etc)."></i>';
            str += '</div>';
            str += '</div>';
            str += '<div class="col-md-4">';
            str += '<div class="form-inline">';
            str += '<div class="form-group full-width">';
            str += '<label class="form-label">Control Type</label>';
            str += '<i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" title="The selected control type will be available as input on the Variant page."></i>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<div class="col-md-5" id="controltype_values_{{$roomtypeId}}">';
            str += '<div class="form-inline">';
            str += '<div class="form-group">';
            str += '<label class="form-label">Default Values</label></div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';

            str += '<div class = "row" >';
            str += '<div class = "col-md-3" >';
            str += '<div class = "form-group" >';
            str += '<div class = "" >';
            str += '<input type = "text" name = "attribute_name_' + roomtypeId + '" class = "form-control" placeholder ="Enter Attribute Name">';
            str += '<input type = "hidden" name = "attribute_id_' + roomtypeId + '" value = "" >';
            str += ' </div>';
            str += '</div>';
            str += '</div>';
            str += '<div class = "col-md-4" >';
            str += '<div class = "form-inline" >';
            str += '<div class = "form-group full-width" >';
            str += '<select name = "controltype_' + roomtypeId + '" onchange="defaultBlock(this.value,\'' + roomtypeId + '\')" class="full-width">';
            str += '<option value = "" >Select Controls Type</option>';
            str += '<option value = "textbox" > Text Box </option>';
            str += '<option value = "textarea" > Textarea </option>';
            str += '<option value = "select" > Select Box </option>';
            str += '<option value = "multiple" > Multiple Select Box </option>';
            str += '<option value = "number" > Number </option>';
            str += '</select>';

            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<div class = "col-md-5" id = "controltype_values_' + roomtypeId + '">';
            str += '<div class = "form-group" >';
            str += '<div class="col-lg-8 col-md-7">';
            str += '<input type="text" name= "controltypevalues_' + roomtypeId + '" data-role="tagsinput" class="tags" >';
            str += '</div>';
            str += '<div class="col-lg-4 col-md-5">';
            str += ' <button type="button" class = "btn btn-white" onclick="addAttributes(\'' + roomtypeId + '\',this)"> <i class="fa fa-plus"></i> Add New</button>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<div class = "row" id="addroomtypeattributeblock_' + roomtypeId + '">';
            str += '<div class = "col-md-12" >';
            str += '<div class = "text-right" >';
            str += ' <button type="button" class = "btn btn-small btn-primary" onclick="saveRoomypeattribute(' + project_id + ',' + roomtypeId + ',\'room_type\');" > <i class = "fa fa-save" > </i> Save</button>';
            str += ' <button type="button" class = "btn btn-small btn-default" onclick="deleteRoomType(' + project_id + ',' + roomtypeId + ');" > <i class = "fa fa-trash" > </i> Delete</button >';
            str += '<div class="cf-loader" id="loader_' + roomtypeId + '" style="display:none" ></div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div> ';
            str += '</form> ';

            $("#addroomtypeblock").before(str);
            $("#roomtype").val('');
            $("select").select2();
            $(".tags").tagsinput("");
            $("#loader").hide();
        }
    });
}

function deleteRoomType(project_id, roomtypeId)
{
    if (confirm('Are you sure you want to delete this room type?') === false) {
        return;
    }

    $.ajax({
        url: "/admin/project/" + project_id + "/roomtype/" + roomtypeId,
        type: "DELETE",
        success: function (response) {
            $("#frmroomtype_" + roomtypeId).remove();
        }
    });
}

function addAttributes(keyId, obj)
{
    var attributename = $(obj).closest('.row').find('input[name="attribute_name_' + keyId + '[]"]').val();

    if (attributename.trim() == '')
    {
        alert('Enter Attribute Name');
        return false;
    }

    var control_type = $(obj).closest('.row').find('select[name="controltype_' + keyId + '[]"]').val();
    if (control_type.trim() == '')
    {
        alert('Select Control Type');
        return false;
    }

    var defaultval = $(obj).closest('.row').find('input[name="controltypevalues_' + keyId + '[]"]').val();
    if ((control_type.trim() == 'select' || control_type.trim() == 'multiple') && (defaultval.trim() == ''))
    {
        alert('Enter Default Values');
        return false;
    }

    var str = '<div class="row">';
    str += '<div class="col-md-3">';
    str += '<input type="text" name = "attribute_name_' + keyId + '[]" class="form-control" placeholder="Enter Attribute Name">';
    str += '<input type="hidden" name = "attribute_id_' + keyId + '[]" value="">';
    str += '</div>';
    str += '<div class="col-md-3">';
    str += '<select name = "controltype_' + keyId + '[]"  class="select2-container select2 form-control" >';
    str += '<option value="">Select Control Type</option>';
    str += '<option value="textbox" > Text Box</option>';
    str += '<option value="select" >Select Box</option>';
    str += '<option value="multiple" > Multiple Select Box</option>';
    str += '<option value="number"> Number </option>';
    str += '</select>';
    str += '</div>';
    str += '<div class="col-md-4">';
    str += '<input type="text"  name= "controltypevalues_' + keyId + '[]" data-role="tagsinput" class="tags">';
    str += '</div>';
    str += '<div class="col-md-2">';
    str += '<a class="btn btn-link" onclick="addAttributes(\'' + keyId + '\',this)"><i class="fa fa-plus"></i> Attribute</a>';
    str += '</div>';
    str += '</div>';



    $(obj).closest('.row').after(str);
    $(obj).closest('.row').find('.col-md-2').html('<a class="btn btn-link" onclick="deleteAttribute(' + PROJECTID + ',0,this);"><i class="fa fa-close"></i></a>');

    $("select").select2();
    $(".tags").tagsinput("");

}

function saveRoomypeattribute(project_id, roomtypeId, reffrence_type)
{
    $("#loader_" + roomtypeId).show();
    $.ajax({
        url: "/admin/project/" + project_id + "/roomtype/" + roomtypeId,
        type: "POST",
        data: {
            roomtypeattrData: $("#frmroomtype_" + roomtypeId).serializeArray(),
            reffrence_type: reffrence_type,
            _method: 'PUT'
        },
        success: function (response) {
            window.location.reload();
        }
    });
}


function deleteAttribute(project_id, attributeId, obj)
{
    if (confirm('Are you sure you want to delete this room type attribute?') === false) {
        return;
    }
    if (attributeId)
    {
        $.ajax({
            url: "/admin/project/" + project_id + "/roomtype/" + attributeId + "/deleteroomtypeattributes",
            type: "DELETE",
            success: function (response) {
                $(obj).closest('.row').remove();
            }
        });
    }
    else
    {
        $(obj).closest('.row').remove();
    }
}



function defaultBlock(value, refId)
{
    /* if(value=='select'|| value=='multiple')
     $("#controltype_values_"+refId).show();
     else
     $("#controltype_values_"+refId).hide(); */
}

function saveRoomdetails(project_id, variantId)
{
    $.ajax({
        url: BASEURL + "/admin/project/" + project_id + "/bunglow-variant/" + variantId + "/roomtypeattributes",
        type: "POST",
        data: $("#formroomdetails").serializeArray(),
        success: function (response) {
            window.location.reload();
        }
    });
}

function addFloorLevel(variantId)
{
    var counter = $("#counter").val();
    var i = parseInt(counter) + 1;
    var str = '';

    str += '';
    str += '<div class="col-sm-12" id="levelblock_' + i + '"> ';
    str += '<div class="row">';
    str += '<div class="col-sm-12">';
    str += '<div class="form-group">';
    str += '<h3>Level ' + i + '</h3>';
    str += '<input type="hidden" name="floorlevel[]" value="' + i + '">';
    str += '</div> ';
    str += '</div> ';
    str += '</div>';

    str += '<div class="room-block">';
    str += '<div class="form-group">';
    str += '<div class="row">';
    str += '<div class="col-md-4">';
    str += ' <input type="hidden" name="variantroomid_' + i + '[]" value="">';
    str += '<select name="room_name_' + i + '[]" class="select2 form-control" onchange="getRoomTypeAttributes(this,' + variantId + ',' + i + ');">';
    str += '<option value="">Select Room</option>';
    str += ROOMTYPES;
    str += '</select>';
    str += '</div>';
    str += '<div class="col-md-8">';
    str += ' <button type="button" onclick="addRoomAttributes(' + i + ',this,' + variantId + ')" class="btn btn-white"><i class="fa fa-plus"></i></button>';
    str += '</div> ';
    str += '</div> ';
    str += '</div> ';
    str += '</div> ';
    str += '<div>';

    str += '<div></div><hr/>';
    str += '</div> ';

    $("#addFloorlevel").before(str);
    $("select").select2();
    $("#counter").val(i);
}

function getRoomTypeAttributes(obj, level)
{
    var roomId = $(obj).closest('.row').find('select').val(); 
    var flag =true;
    if(!roomId)
    {
        alert("Select Room Type");
        return false;
    }
    
    $(obj).closest('.grid-body').find('input[name="room_id[]"]').each(function () { 
             if($(this).val()== roomId)
            {
                 alert('Room Type Already Selected');
 
                 $(obj).select2('val', '');
 
                 flag= false;
                 
            }
        });
   if(flag)
   {
    $.ajax({
        url: BASEURL + "/admin/project/" + PROJECTID + "/roomtype/" + roomId + "/getroomtypeattributes",
        type: "POST",
        data: {
            level: level,
            type :"add",
        },
        success: function (response) {
            var attribute_str = response.data.attributes; 
            $(obj).closest('.grid-body').find('.room_attributes_block').append(attribute_str);
            $("select").select2();
        }
    });
    }

}

function updateRoomAttributes()
{
   var level =window.parent.$("#roomtypeiframe").attr("level");  
   var roomid = window.parent.$("#roomtypeiframe").attr("roomid");
 
   $("#level_"+level).find('select[name="room_type[]"]').val(roomid);
   
   $.ajax({
        url: BASEURL + "/admin/project/" + PROJECTID + "/roomtype/" + roomid + "/getroomtypeattributes",
        type: "POST",
        data: {
            level: level,
            type :"edit",
        },
        success: function (response) {
            var attribute_str = response.data.attributes; 
            var variantRoomId = $('.roomattribute_'+level+'_'+roomid).find('input[name="variantroomid[]"]').val();
            window.parent.$('.roomattribute_'+level+'_'+roomid).html(attribute_str);
            window.parent.$('.roomattribute_'+level+'_'+roomid).find('input[name="variantroomid[]"]').val(variantRoomId);
            $("select").select2();
        }
    });
}

function addRoomAttributes(level, obj, variantId)
{
    var room_type = $(obj).closest('.room-block').find('select[name="room_name_' + level + '[]"]').val();
    if (room_type.trim() == '')
    {
        alert('Select Room Type');
        return false;
    }
    var str = '';

    str += '<div class="room-block">';
    str += '<div class="form-group"><label class="form-label">Room Name</label>';
    str += '<div class="row  m-b-5">';
    str += '<div class="col-md-4">';
    str += ' <input type="hidden" name="variantroomid_' + level + '[]" value="">';
    str += '<select name="room_name_' + level + '[]" class="select2 form-control" onchange="getRoomTypeAttributes(this,' + variantId + ',' + level + ');">';
    str += '<option value="">Select Room</option>';
    str += ROOMTYPES;
    str += '</select>';
    str += '</div>';
    str += '<div class="col-md-8">';
    str += ' <button type="button" onclick="addRoomAttributes(' + level + ',this,' + variantId + ')" class="btn btn-white"><i class="fa fa-plus"></i></button>';
    str += '</div> ';
    str += '</div> ';
    str += '</div> ';
    str += '</div> ';
    str += '<div>';
    str += '</div><hr/>';
    str += '<div>';

    $(obj).hide();
    $("#levelblock_" + level).append(str);
    $("select").select2();
}

function setUpProjectMasterUploader() {

    var objectType = $('div.object-master-images').attr('data-object-type');
    var objectId = $('div.object-master-images').attr('data-object-id');

    var master_uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'master_pickfiles', // you can pass in id...
        url: '/admin/' + objectType + '/' + objectId + '/media',
        flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
        silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
        headers: {
            "x-csrf-token": $("[name=_token]").val()
        },
        multipart_params: {
            "type": "master",
            "projectId": PROJECTID
        },
        filters: {
            max_file_size: '10mb',
            mime_types: [{
                    title: "Image files",
                    extensions: "jpg,png,jpeg"
                }]
        },
        init: {
            PostInit: function () {
                /* document.getElementById('master_uploadfiles').onclick = function () {
                 master_uploader.start();
                 return false;
                 };*/
            },
            FilesAdded: function (up, files) {
                up.start();

                for (var i = 0; i < files.length; i++)
                {
                    var fileName = files[i].name;
                    var fileData = fileName.split('.');
                    var fileData_1 = fileData[0].split('-');
                    var position = fileData_1[1];

                    var load_newstr = '';
                    var load_str = '<td>';
                    load_str += '<div class="progress progress-small " style="margin:0;">';
                    load_str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="20%" style="width: 20%;margin:0;"></div>';
                    load_str += '</div>';
                    load_str += '</td>';
                    load_str += '<td class=" "><span class="muted"></span></td>';
                    load_str += '<td class=" ">';
                    load_str += '</td>';
                    load_str += '<td class=" ">';
                    load_str += '</td>';
                    load_str += '<td class="text-right">';
                    load_str += '<a class="text-primary" href="#"><i class="fa fa-close"></i></a>';
                    load_str += '</td>';

                    if ($('#position-' + position).length != 0) {
                        $('#position-' + position).html(load_str);
                    }
                    else
                    {
                        load_newstr += '<tr class="" id="position-' + position + '">';
                        load_newstr += load_str;
                        load_newstr += '</tr>';
                        $("#master-img").append(load_newstr);
                    }
                    $('#position-' + position).find('.progress').html('<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="50%" style="width: 50%;margin:0;"></div>');
                    $('#position-' + position).find('.progress').html('<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="70%" style="width: 70%;margin:0;"></div>');

                }
            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
                var str = newstr = '';
                $('#position-' + fileResponse.data.position).find('.progress').html('<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="90%" style="width: 90%;margin:0;"></div>');

                str += '<td>' + fileResponse.data.filename + '</td>';
                str += '<td class=""><span class="muted">' + fileResponse.data.position + '</span></td>';
                str += '<td class=""><div class="checkbox check-primary" ><input id="checkbox' + fileResponse.data.position + '" name="position[]" type="checkbox" value="' + fileResponse.data.position + '"><label for="checkbox' + fileResponse.data.position + '"></label></td>';
                str += '<td><a class="hidden">Authoring Tool</a></td>';
                str += '<td class="text-right">';
                str += '<a class="text-primary" onclick="deleteSvg(' + fileResponse.data.media_id + ',\'master\',\'' + fileResponse.data.position + '\');" ><i class="fa fa-close"></i></a>';
                str += '</td>';

                $('#position-' + fileResponse.data.position).html(str);


            }
        }
    });
    master_uploader.init();


}

function addFloorLevelUploader(level) { 

    var selectBtnId_2d = 'pickfiles_' + level + '_2d';
    var selectBtnId_3d = 'pickfiles_' + level + '_3d'; 
    
    var uploader_2d = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: selectBtnId_2d, // you can pass in id...
        url: '/admin/variant/' + variantId + '/media',
        flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
        silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
        headers: {
            "x-csrf-token": $("[name=_token]").val()
        },
        multipart_params: {
            "level": level,
            "layout": "2d",
            "projectId": PROJECTID
        },
        filters: {
            max_file_size: '10mb',
            mime_types: [{
                    title: "Image files",
                    extensions: "svg,jpg,png,jpeg"
                }]
        },
        init: {
            PostInit: function () {
                /* document.getElementById('uploadfiles').onclick = function () {
                 uploader.start();
                 return false;
                 };*/
            },
            FilesAdded: function (up, files) {
                var str = ' ';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="89%" style="width: 89%;margin:0;"></div>';
                str += '</div>';
                str += '</div>';
                str += ' ';
                $("#2d_" + level + "_image").html(str);
                up.start();



            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);

                var str = ' ';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay" onclick="deleteLayout(' + fileResponse.data.media_id + ',\'2d\');"><i class="fa fa-close text-primary"></i></a>';
                str += '<img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="' + fileResponse.data.image_path + '" />';
                str += '</div>';
                str += '</div>';
            

                $("#2d_" + level + "_image").html(str);
                if(!variantId)
                    $("#image_" + level + "_2d_id").val(fileResponse.data.media_id);

            }
        }
    });
    uploader_2d.init();
    
    
    var uploader_3d = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: selectBtnId_3d, // you can pass in id...
        url: '/admin/variant/' + variantId + '/media',
        flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
        silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
        headers: {
            "x-csrf-token": $("[name=_token]").val()
        },
        multipart_params: {
            "level": level,
            "layout": "3d",
            "projectId": PROJECTID
        },
        filters: {
            max_file_size: '10mb',
            mime_types: [{
                    title: "Image files",
                    extensions: "svg,jpg,png,jpeg"
                }]
        },
        init: {
            PostInit: function () {
                /* document.getElementById('uploadfiles').onclick = function () {
                 uploader.start();
                 return false;
                 };*/
            },
            FilesAdded: function (up, files) {
                var str = ' ';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="89%" style="width: 89%;margin:0;"></div>';
                str += '</div>';
                str += '</div>';
                str += ' ';
                $("#3d_" + level + "_image").html(str);
                up.start();



            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);

                var str = ' ';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay" onclick="deleteLayout(' + fileResponse.data.media_id + ',\'3d\');"><i class="fa fa-close text-primary"></i></a>';
                str += '<img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="' + fileResponse.data.image_path + '"   />';
                str += '</div>';
                str += '</div>';
             

                $("#3d_" + level + "_image").html(str);
                if(!variantId)
                    $("#image_" + level + "_3d_id").val(fileResponse.data.media_id)
            }
        }
    });
    uploader_3d.init();


}
function setUpFloorLevelUploader()
{  
     if (FLOORLEVELS.length === 0)
        return false;

    $.each(FLOORLEVELS, function (index, value) { 
        addFloorLevelUploader(value);
    });
        
}

/*function setUpFloorLevelUploader() {

    if (FLOORLEVELS.length === 0)
        return false;

    $.each(FLOORLEVELS, function (index, value) {

        var uploader2d = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: 'pickfiles_2d_' + value, // you can pass in id...
            url: '/admin/variant/' + variantId + '/media',
            flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
            silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
            headers: {
                "x-csrf-token": $("[name=_token]").val()
            },
            multipart_params: {
                "level": value,
                "layout": "2d",
                "projectId": PROJECTID
            },
            filters: {
                max_file_size: '10mb',
                mime_types: [{
                        title: "Image files",
                        extensions: "svg,jpg,png,jpeg"
                    }]
            },
            init: {
                PostInit: function () {
                    document.getElementById('uploadfiles_2d_' + value).onclick = function () {
                        uploader2d.start();
                        return false;
                    };
                },
                FilesAdded: function (up, files) {

                    $('#uploadfiles_2d_' + value).next("div.selectedImages").html('<strong class="col-md-12">' + files.length + ' image selected. Click on upload button to start upload.<div class="cf-loader"></div></strong>');
                    $('#uploadfiles_2d_' + value).removeClass('hidden');
                },
                FileUploaded: function (up, file, xhr) {
                    fileResponse = JSON.parse(xhr.response);
                    $("#2dlayout_" + value).html('<img src="' + fileResponse.data.image_path + '" class="img-responsive img-thumbnail"> <button onclick="deleteLayout(' + fileResponse.data.media_id + '\'2d\');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>');
                    $('#uploadfiles_2d_' + value).next("div.selectedImages").html('');
                    $('#uploadfiles_2d_' + value).addClass('hidden');
                }
            }
        });
        uploader2d.init();

        var uploader3d = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: 'pickfiles_3d_' + value, // you can pass in id...
            url: '/admin/variant/' + variantId + '/media',
            flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
            silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
            headers: {
                "x-csrf-token": $("[name=_token]").val()
            },
            multipart_params: {
                "level": value,
                "layout": "3d",
                "projectId": PROJECTID
            },
            filters: {
                max_file_size: '10mb',
                mime_types: [{
                        title: "Image files",
                        extensions: "svg,jpg,png,jpeg"
                    }]
            },
            init: {
                PostInit: function () {
                    document.getElementById('uploadfiles_3d_' + value).onclick = function () {
                        uploader3d.start();
                        return false;
                    };
                },
                FilesAdded: function (up, files) {

                    $('#uploadfiles_3d_' + value).next("div.selectedImages").html('<strong class="col-md-12">' + files.length + ' image selected. Click on upload button to start upload.<div class="cf-loader"></div></strong>');
                    $('#uploadfiles_3d_' + value).removeClass('hidden');
                },
                FileUploaded: function (up, file, xhr) {
                    fileResponse = JSON.parse(xhr.response);
                    $("#3dlayout_" + value).html('<img src="' + fileResponse.data.image_path + '" class="img-responsive img-thumbnail">  <button onclick="deleteLayout(' + fileResponse.data.media_id + '\'3d\');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>');
                    $('#uploadfiles_3d_' + value).next("div.selectedImages").html('');
                    $('#uploadfiles_3d_' + value).addClass('hidden');
                }
            }
        });
        uploader3d.init();

    });

}*/

function deleteLayout(mediaId, type)
{

    if (confirm('Are you sure you want to delete this media file? ') === false) {
        return;
    }

    $.ajax({
        url: '/admin/variant/' + variantId + '/media/' + mediaId,
        type: "DELETE",
        data: {
            type: type,
            projectId: PROJECTID
        },
        success: function (response) {
            window.location.reload();
        }
    });
}



function setUpFloorLayoutUploader() {

    var divs = ['detailed_svg', 'basic_svg'];

    _.each(divs, function (divName, index) {
        var div = $('#floor-layout-' + divName + '-container');
        if (div.length === 0)
            return
        var selectBtnId = _.uniqueId('select-btn-');
        var selectBtn = div.find('.master_pickfiles').attr('id', selectBtnId);

        var uploadBtnId = _.uniqueId('upload-btn-');
        var uploadBtn = div.find('.master_uploadfiles').attr('id', uploadBtnId);
        var floorLayoutId = $('[name="floor_layout_id"]').val()
        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: selectBtnId, // you can pass in id...
            url: BASEURL + '/admin/floor-layout/' + floorLayoutId + '/media',
            flash_swf_url: BASEURL + '/bower_components/plupload/js/Moxie.swf',
            silverlight_xap_url: BASEURL + '/bower_components/plupload/js/Moxie.xap',
            headers: {
                "x-csrf-token": $("[name=_token]").val()
            },
            multipart_params: {
                "object_type": "floor-layout",
                "media_type": divName,
                "project_id": PROJECTID
            },
            filters: {
                max_file_size: '4mb',
                mime_types: [{
                        title: "Svg files",
                        extensions: "svg"
                    }]
            },
            init: {
                PostInit: function () {
                    document.getElementById(uploadBtnId).onclick = function () {
                        uploader.start();
                    };
                },
                FilesAdded: function (up, files) {

                    $("#" + uploadBtnId).next("div.selectedImages").html('<strong class="col-md-12">' + files.length + ' svg selected. Click on upload button to start upload.<div class="cf-loader"></div></strong>');
                    $("#" + uploadBtnId).removeClass('hidden');
                },
                FileUploaded: function (up, file, xhr) {
                    fileResponse = JSON.parse(xhr.response);
                    div.find('.uploaded-image').html('<object width="150" id="svg1" data="' + fileResponse.data.media_path + '" type="image/svg+xml" />');
                    div.find('[name="' + divName + '"]').val(fileResponse.data.media_id);
                    $("#" + uploadBtnId).next("div.selectedImages").html('');
                    $("#" + uploadBtnId).addClass('hidden');
                }
            }
        });
        uploader.init();
    });
}

$(document).ready(function () {
 
    setUpProjectMasterUploader()
    setUpFloorLevelUploader()
    setUpFloorLayoutUploader()


    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'pickfiles', // you can pass in id...
        url: '/admin/project/' + PROJECTID + '/media',
        flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
        silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
        headers: {
            "x-csrf-token": $("[name=_token]").val()
        },
        multipart_params: {
            "type": "google_earth"
        },
        filters: {
            max_file_size: '10mb',
            mime_types: [{
                    title: "Image files",
                    extensions: "svg"
                }]
        },
        init: {
            PostInit: function () {
                /* document.getElementById('uploadfiles').onclick = function () {
                 uploader.start();
                 return false;
                 };*/
            },
            FilesAdded: function (up, files) {
                var str = '<div class="col-md-3">';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="89%" style="width: 89%;margin:0;"></div>';
                str += '</div>';
                str += '<div class="dz-size" data-dz-size="">' + files[0].name + '</div>';
                str += '</div>';
                str += '</div>';
                $("#google_earth_image").html(str);
                up.start();



            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);

                var str = '<div class="col-md-3">';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay" onclick="deleteSvg(' + fileResponse.data.media_id + ',\'google_earth\',\'\');"><i class="fa fa-close text-primary"></i></a>';
                str += '<object style="width:150px;height:93px;" class="img-thumbnail" id="svg1" data="' + fileResponse.data.image_path + '" type="image/svg+xml" />';
                str += '<div class="dz-size" data-dz-size=""><strong></strong>' + fileResponse.data.filename + '</div>';
                str += '</div>';
                str += '</div>';
                str += '<div class="col-md-3">';
                str += '<h5 class="semi-bold">To use the Authoring Tool<a href="#" class="text-primary"> click here</a></h5>';
                str += '</div>';


                $("#google_earth_image").html(str);

            }
        }
    });
    uploader.init();

    var skyview_uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'skyview_pickfiles', // you can pass in id...
        url: '/admin/project/' + PROJECTID + '/media',
        flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
        silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
        headers: {
            "x-csrf-token": $("[name=_token]").val()
        },
        multipart_params: {
            "type": "skyview"
        },
        filters: {
            max_file_size: '10mb',
            mime_types: [{
                    title: "Image files",
                    extensions: "jpg,gif,png"
                }]
        },
        init: {
            PostInit: function () {
                document.getElementById('skyview_uploadfiles').onclick = function () {
                    skyview_uploader.start();
                    return false;
                };
            },
            FilesAdded: function (up, files) {

                $("#skyview_uploadfiles").next("div.selectedImages").html('<strong class="col-md-12">' + files.length + ' image selected. Click on upload button to start upload.<div class="cf-loader"></div></strong>');
                $("#skyview_uploadfiles").removeClass('hidden');
            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
                $("#skyview_image").append('<img width="150" height="150" src="' + fileResponse.data.image_path + '" class="img-responsive" > <button onclick="deleteSvg(' + fileResponse.data.media_id + ',\'skyview\',\'\');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>');
                $("#skyview_uploadfiles").next("div.selectedImages").html('');
                $("#skyview_uploadfiles").addClass('hidden');
            }
        }
    });
    skyview_uploader.init();

    //EXTERNAL

    var uploader_ext3d = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'pickfiles_ext3d', // you can pass in id...
        url: '/admin/variant/' + variantId + '/media',
        flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
        silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
        headers: {
            "x-csrf-token": $("[name=_token]").val()
        },
        multipart_params: {
            "level": 'external',
            "layout": "3d",
            "projectId": PROJECTID
        },
        filters: {
            max_file_size: '10mb',
            mime_types: [{
                    title: "Image files",
                    extensions: "svg,jpg,png,jpeg"
                }]
        },
        init: {
            PostInit: function () {
                
            },
            FilesAdded: function (up, files) {
                var str = '<div class="col-md-3">';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="89%" style="width: 89%;margin:0;"></div>';
                str += '</div>';
                  str += '</div>';
                str += '</div>';
                $("#google_earth_image").html(str);
                up.start();
            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);

                var str = '<div class="col-md-3">';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay" onclick="deleteLayout(' + fileResponse.data.media_id + ',\'external\');"><i class="fa fa-close text-primary"></i></a>';
                str += '<img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="' + fileResponse.data.image_path + '"   />';
                str += '</div>';
                str += '</div>';
                str += '<div class="col-md-3">'; 
                str += '</div>';


                $("#3d_external_img").html(str);
                if(!variantId)
                    $("#image_external_3d_id").val(fileResponse.data.media_id)
            }
        }
    });
    uploader_ext3d.init();

    var uploader_gallery = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'pickfiles_gallery', // you can pass in id...
        url: '/admin/variant/' + variantId + '/media',
        flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
        silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
        headers: {
            "x-csrf-token": $("[name=_token]").val()
        },
        multipart_params: {
            "level": 'gallery',
            "layout": "2d",
            "projectId": PROJECTID
        },
        filters: {
            max_file_size: '10mb',
            mime_types: [{
                    title: "Image files",
                    extensions: "jpg,png,jpeg"
                }]
        },
        init: {
            PostInit: function () {
                 
            },
            FilesAdded: function (up, files) {
                var str = '<div class="col-md-3 variant-gallery-image">';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="89%" style="width: 89%;margin:0;"></div>';
                str += '</div>';
                  str += '</div>';
                str += '</div>';
                $("#variant_gallery").append(str);
                 up.start();
             
            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
                var str = '<div class="col-md-3">';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay" onclick="deleteLayout(' + fileResponse.data.media_id + ',\'gallery\');"><i class="fa fa-close text-primary"></i></a>';
                str += '<img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="' + fileResponse.data.image_path + '"   />';
                str += '<input type="hidden" name="image_gallery[]" id="image_external_3d_id" value="' + fileResponse.data.media_id + '"> ';
                str += '</div>';
                str += '</div>';
 
                $(".variant-gallery-image").remove();
                $("#variant_gallery").append(str);
                
               

            }
        }
    });
    uploader_gallery.init();

});

function saveBreakPoint()
{
    var position = []
    var i = 0;
    $('input[name="position[]"]:checked').each(function () {
        // To pass this value to its nearby hidden input
        position[i] = $(this).val();
        i++;

    });
    var objectType = $('div.object-master-images').attr('data-object-type');
    var objectId = $('div.object-master-images').attr('data-object-id');
    var objectId = $('div.object-master-images').attr('data-object-id');
    $.ajax({
        url: BASEURL + '/admin/' + objectType + '/' + objectId + '/media/updatebreakpoint',
        type: "POST",
        data: {
            position: position,
        },
        success: function (response) {
            $('input[name="position[]"]').each(function () {
                
                pos = $(this).val();
                className = ".auth-tool-"+pos;
                if ($(this).prop('checked')){
                    $(className).removeClass('hidden');
                }
                else{
                    $(className).addClass('hidden');
                }
                
            });
        }
    });
}

function deleteSvg(mediaId, type, refference)
{
    var objectType = $('div.object-master-images').attr('data-object-type');
    var objectId = $('div.object-master-images').attr('data-object-id');

    if (confirm('Are you sure you want to delete this media file? ') === false) {
        return;
    }

    $.ajax({
        url: BASEURL + '/admin/' + objectType + '/' + objectId + '/media/' + mediaId,
        type: "DELETE",
        data: {
            type: type,
            refference: refference,
            "projectId": PROJECTID
        },
        success: function (response) {
            window.location.reload();
        }
    });
}

function getPositions(floor)
{
    var buildingId = $("select[name='building_id']").val();
    $.ajax({
        url: BASEURL + '/admin/project/' + PROJECTID + '/building/' + buildingId + '/getpositions',
        type: "POST",
        data: {
            floor: floor
        },
        success: function (response) {
            var position = parseInt(response.data);
            var newOptions = [];
            for (var i = 1; i <= position; i++)
            {
                newOptions[i] = i;
            }

            var $el = $("#flat_position");
            //$el.val('');
            $el.empty(); // remove old options
            $el.append($("<option>Select Position</option>")
                    .attr("value", ''));
            $.each(newOptions, function (value, key) {
                $el.append($("<option></option>")
                        .attr("value", value).text(key));
            });
            $(".select-position").removeClass("hidden");
        }
    });
}

function getVariants(obj, floorLayoutId)
{
    var unitTypeId = obj.value;
    $.ajax({
        url: BASEURL + '/admin/project/' + PROJECTID + '/floor-layout/' + floorLayoutId + '/getunittypevariants',
        type: "POST",
        data: {
            unit_type_id: unitTypeId
        },
        success: function (response) {

            var $el = $(obj).closest('.row').find('select[name="unit_variant_id"]');
            $el.empty(); // remove old options
            $el.append(response.data);

        }
    });
}

function getPropertTypeData(obj, flag)
{
    $.ajax({
        url: BASEURL + "/admin/project/" + PROJECTID + "/apartment-variant/getpropertytypedata",
        type: "POST",
        data: {
            property_type_id: obj.value,
        },
        success: function (response) {
            var unitTypes = response.data.unit_types;
            if (flag)
            {
                //VARIANT CODE
                $('#property_type_attributes').html(response.data.attributes);
                
                $('select[name="unit_type"]').empty();
                $('select[name="unit_type"]').append('<option value=""> Select Unit Type</option>')

                if (unitTypes.trim() != '')
                    $('select[name="unit_type"]').append(unitTypes);
                 
                if($(obj).find(":selected").text()=='Apartments')                        //APARTMENT
                {
                   $(".add_level").addClass('hidden');
                   $("#level_0").find('.grid-title').addClass('hidden');
                    $('input[name="levels[]"]').each(function () { 
 
                        if($(this).val()!=0)
                        {
                            $("#level_"+$(this).val()).addClass('hidden'); 
                        }
                    });
                     
                }
                else if($(obj).find(":selected").text()=='Penthouse')                        //PENTHOUSE
                { 
                   $(".add_level").removeClass('hidden');
                    $("#level_0").find('.grid-title').removeClass('hidden');
                    $('input[name="levels[]"]').each(function () { 
 
                        if($(this).val()!=0)
                        {
                            $("#level_"+$(this).val()).removeClass('hidden'); 
                        }
                    });
                    
                }
            }
            else
            {
                //FLOOR LAYOUT
                $(obj).closest('.row').find('select[name="unit_type"]').empty();
                $(obj).closest('.row').find('select[name="unit_type"]').append('<option value=""> Choose Unit Type</option>');

                if (unitTypes.trim() != '')
                    $(obj).closest('.row').find('select[name="unit_type"]').append(unitTypes);
            }

            $("select").select2();
        }
    });
}

function saveAndAddAnother()
{
    $("#addanother").val(1);
    $("form").submit();
}

function addUnitType()
{
    var projectPropertyTypeId = $("#property_type").val();
    var unitTypeName = $("#unit_type_name").val();
    $.ajax({
        url: BASEURL + "/admin/project/" + PROJECTID + "/unittype",
        type: "POST",
        data: {
            unit_type: unitTypeName,
            project_property_type_id: projectPropertyTypeId,
        },
        success: function (response) {
            var unitTypeId = response.data.unitTypeId;
            $('select[name="unit_type"]').append('<option value="' + unitTypeId + '">' + unitTypeName + '</option>');
        }
    });

}

function createUnitType(obj, propertyTypeId)
{ 
    var val =$(obj).val();
    if ( val== 'add_new')
    {

        if (!$(obj).closest('.unit_type_block').find('input[name="add_new_unit_type"]').length)
        {
            var unitTypeId = $(obj).closest('.unit_type_block').find('input[type="hidden"]').val();
            var html = '<input type="text" name="unittype[' + propertyTypeId + '][]" value="">';
            html += '<input type="hidden" name="unittypekey[' + propertyTypeId + '][]" value="' + unitTypeId + '">';
            html += '<input type="hidden" name="unittypecustome[' + propertyTypeId + '][]" value="CUSTOME">';
            $(obj).closest('.unit_type_block').find('.col-md-10').html(html);

        }
        else
        {
            var html = '<div class="row m-b-10 unit_type_block">';
            html += '<div class="col-md-10">';
            html += '<input type="text" name="unittype[' + propertyTypeId + '][]" >';
            html += '<input type="hidden" name="unittypekey[' + propertyTypeId + '][]" value="">';
            html += '<input type="hidden" name="unittypecustome[' + propertyTypeId + '][]" value="CUSTOME">';
            html += '</div>';
            html += '<div class="col-md-2 text-center">';
            html += '<a  data-unit-type-id="0" class="btn btn-link remove-unit-type"><i class="fa fa-close"></i> </a>';
            html += '</div>';
            html += '</div>';
            $(obj).closest('.unit_type_block').before(html);
            $(obj).val('');
        }


    }
    else{
        $(obj).closest('.propertyTypeUnitsAttributes').find('select').each(function () { 
         
            if($(obj).get(0)!=$(this).get(0) && $(this).val()==val)
            {
                 alert('Unit Type Already Selected');
 
                 $(obj).select2('val', '');
 
                 return false;
                 
            }
        });
    }
}

$('input[name="property_types[]"]').change(function (event) {
    if ($(this).is(':checked'))
        $(this).closest('.row').find('.propertyTypeUnitsAttributes').removeClass('hidden');
    else
        $(this).closest('.row').find('.propertyTypeUnitsAttributes').addClass('hidden');

});

function saveVariantConfig()
{
    var flag = true;
    var isApartment=false; 
     
    if($('input[name="property_type"]').length || $('select[name="property_type"]').length)
    {  
        if($('input[name="property_type"]').attr('data-value')==='Apartments')
          isApartment=true;
        else if($('select[name="property_type"]').find(":selected").text()==='Apartments')
          isApartment=true;
    }
    
    

    $('input[name="levels[]"]').each(function () { 
         
        var level = $(this).val(); 
        if(isApartment && level!=0)
        {  
          return false;
        }
        
         var roomId = $(this).closest('.row').find('input[name="room_id['+level+'][]"]').length; 
        if(roomId==0)
        {
 
            alert('Select Room Type For Level ' +  level);
            flag = false;
        }
        
        

    });

     if (flag)
        $('form').submit(); 

}

