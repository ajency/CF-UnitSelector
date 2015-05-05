$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
function validateTitle(obj)
{
    $(obj).next("div.cf-loader").removeClass('hidden');
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

            $(obj).next("div.cf-loader").addClass('hidden');
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
            str += ' <button type="button" class = "btn btn-white" onclick="addRoomtypeAttributes(\'' + roomtypeId + '\',this)"> <i class="fa fa-plus"></i> Add New</button>';
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

function addRoomtypeAttributes(roomtypeId, obj)
{
    var attributename = $(obj).closest('.row').find('input[name="attribute_name_' + roomtypeId + '"]').val();

    if (attributename.trim() == '')
    {
        alert('Enter Attribute Name');
        return false;
    }

    var control_type = $(obj).closest('.row').find('select[name="controltype_' + roomtypeId + '"]').val();
    if (control_type.trim() == '')
    {
        alert('Select Control Type');
        return false;
    }

    var defaultval = $(obj).closest('.row').find('input[name="controltypevalues_' + roomtypeId + '"]').val();
    if ((control_type.trim() == 'select' || control_type.trim() == 'multiple') && (defaultval.trim() == ''))
    {
        alert('Enter Default Values');
        return false;
    }

    var str = '<div class = "row" >';
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
    str += '<select name = "controltype_' + roomtypeId + '" onchange="defaultBlock(this.value,\'' + roomtypeId + '\')" class="full-width" >';
    str += '<option value = "" >Select Controls  Type</option>';
    str += '<option value = "textbox" > Text Box </option>';
    str += '<option value = "textarea" > Textarea </option>';
    str += '<option value = "select" > Select Box </option>';
    str += '<option value = "multiple" > Multiple Select Box </option>';
    str += '<option value = "number" > Number </option>';
    str += '</select>';

    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div class = "col-md-5" id = "controltype_values_' + roomtypeId + '" >';

    str += '<div class = "form-group" >';
    str += '<div class="col-lg-8 col-md-7">';
    str += '<input type="text" name= "controltypevalues_' + roomtypeId + '" data-role="tagsinput" class="tags" >';
    str += '</div>';
    str += '<div class="col-lg-4 col-md-5">';
    str += ' <button type="button" class = "btn btn-white" onclick="addRoomtypeAttributes(\'' + roomtypeId + '\',this)"> <i class="fa fa-plus"></i> Add New</button>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';


    $("#addroomtypeattributeblock_" + roomtypeId).before(str);
    $(obj).hide();
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


function deleteRoomTypeAttribute(project_id, attributeId)
{
    if (confirm('Are you sure you want to delete this room type attribute?') === false) {
        return;
    }

    $.ajax({
        url: "/admin/project/" + project_id + "/roomtype/" + attributeId + "/deleteroomtypeattributes",
        type: "DELETE",
        success: function (response) {
            $("#roomtypeattribute_" + attributeId).remove();
        }
    });
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
    
    str += '<div></div>';
    str += '</div> ';

    $("#addFloorlevel").before(str);
    $("select").select2();
    $("#counter").val(i);
}

function getRoomTypeAttributes(obj, variantId, level)
{
    $.ajax({
        url: BASEURL + "/admin/project/" + PROJECTID + "/bunglow-variant/" + variantId + "/getroomtypeattributes",
        type: "POST",
        data: {
            roomtype_id: obj.value,
            level: level,
        },
        success: function (response) {
            var attribute_str = response.data.attributes;
            $(obj).closest('.room-block').next('div').html(attribute_str);
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
    str += '<div class="form-group">';
    str += '<div class="row">';
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
        FilesAdded: function (up, files) {
            alert(files.length)
        },
        init: {
            PostInit: function () {
                document.getElementById('master_uploadfiles').onclick = function () {
                    master_uploader.start();
                    return false;
                };
            },
            FilesAdded: function (up, files) {

                $("#master_uploadfiles").next("div.selectedImages").html('<strong class="col-md-12">' + files.length + ' image selected. Click on upload button to start upload.<div class="cf-loader"></div></strong>');
                $("#master_uploadfiles").removeClass('hidden');
            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
                var str = newstr = '';

                str += '<div class="col-md-4">';
                str += '<img src="' + fileResponse.data.image_path + '" style="width:150px;height:90px;" class="img-thumbnail">';

                str += '<h4><small class="m-l-30">' + fileResponse.data.filename + '</small></h4>';
                str += '</div>';
                str += '<div class="col-md-4">';
                str += '<h4>' + fileResponse.data.position + '</h4>';
                str += '</div>';
                str += '<div class="col-md-4">';
                str += '<input  name="position[]" type="checkbox" value="' + fileResponse.data.position + '" data-toggle="toggle">';
                str += '<button onclick="deleteSvg(' + fileResponse.data.media_id + ',\'master\',\'' + fileResponse.data.position + '\');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>';
                str += '</div>';


                if ($('#position-' + fileResponse.data.position).length != 0) {

                    $('#position-' + fileResponse.data.position).html(str);
                }
                else
                {
                    newstr += '<div class="row" id="position-' + fileResponse.data.position + '">';
                    newstr += str;
                    newstr += '</div>';
                    newstr += '<hr/>';
                    $("#master-img").append(newstr);
                }

                $("#master_uploadfiles").next("div.selectedImages").html('');
                $("#master_uploadfiles").addClass('hidden');
                $('input[name="position[]"]').bootstrapToggle();
            }
        }
    });
    master_uploader.init();


}

function setUpFloorLevelUploader() {

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

}

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
                document.getElementById('uploadfiles').onclick = function () {
                    uploader.start();
                    return false;
                };
            },
            FilesAdded: function (up, files) {

                $("#uploadfiles").next("div.selectedImages").html('<strong class="col-md-12">' + files.length + ' svg selected. Click on upload button to start upload.<div class="cf-loader"></div></strong>');
                $("#uploadfiles").removeClass('hidden');
            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
                $("#project_googleearth_image").html('<object width="150" id="svg1" data="' + fileResponse.data.image_path + '" type="image/svg+xml" /> <button onclick="deleteSvg(' + fileResponse.data.media_id + ',\'google_earth\',\'\');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>');
                $("#uploadfiles").next("div.selectedImages").html('');
                $("#uploadfiles").addClass('hidden');
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
                document.getElementById('uploadfiles_ext3d').onclick = function () {
                    uploader_ext3d.start();
                    return false;
                };
            },
            FilesAdded: function (up, files) {

                $('#uploadfiles_ext3d').next("div.selectedImages").html('<strong class="col-md-12">' + files.length + ' image selected. Click on upload button to start upload.<div class="cf-loader"></div></strong>');
                $('#uploadfiles_ext3d').removeClass('hidden');
            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
                $("#ext3dlayout").html('<img src="' + fileResponse.data.image_path + '" class="img-responsive img-thumbnail">  <button onclick="deleteLayout(' + fileResponse.data.media_id + '\'external\');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>');
                $('#uploadfiles_ext3d').next("div.selectedImages").html('');
                $('#uploadfiles_ext3d').addClass('hidden');
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
                    extensions: "svg,jpg,png,jpeg"
                }]
        },
        init: {
            PostInit: function () {
                document.getElementById('uploadfiles_gallery').onclick = function () {
                    uploader_gallery.start();
                    return false;
                };
            },
            FilesAdded: function (up, files) {

                $('#uploadfiles_gallery').next("div.selectedImages").html('<strong class="col-md-12">' + files.length + ' image selected. Click on upload button to start upload.<div class="cf-loader"></div></strong>');
                $('#uploadfiles_gallery').removeClass('hidden');
            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
                $("#galleryimages").append('<div class="col-sm-3">\n\
                            <img width="150" height="150" src="' + fileResponse.data.image_path + '" class="img-responsive" ><button onclick="deleteLayout(' + fileResponse.data.media_id + ',\'gallery\');" type="button" class="btn btn-small btn-default m-t-5 pull-right"><i class="fa fa-trash"></i> Delete</button>\n\
                            </div>');
                $('#uploadfiles_gallery').next("div.selectedImages").html('');
                $('#uploadfiles_gallery').addClass('hidden');

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
    $.ajax({
        url: BASEURL + '/admin/' + objectType + '/' + objectId + '/media/updatebreakpoint',
        type: "POST",
        data: {
            position: position,
        },
        success: function (response) {

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
                $(obj).closest('.row').append(response.data.attributes);

                if (unitTypes.trim() != '')
                    $('select[name="unit_type"]').append(unitTypes);
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
            $('select[name="unit_type"]').append('<option value="'+unitTypeId+'">'+unitTypeName+'</option>');
        }
    });
    
}
