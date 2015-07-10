$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function validateTitle(obj) {
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

function validateUnitName(obj, projectPropertytypeId, unitId) {
    $(".cf-loader").removeClass('hidden');
    $.ajax({
        url: "/admin/project/" + PROJECTID + "/bunglow-unit/validateunitname",
        type: "POST",
        data: {
            name: obj.value,
            unitId: unitId,
            projectPropertytypeId: projectPropertytypeId
        },
        dataType: "JSON",
        success: function (response) {
            if (!response.data)
                $(obj).val('');

            $(".cf-loader").addClass('hidden');
        }
    });
}

function validateBuildingUnitName(unitId) {

    var name = $("input[name='unit_name']").val();
    var buildingId = $("select[name='building_id']").val();

    if ((name != '') && (buildingId != '')) {
        $(".cf-loader").removeClass('hidden');
        $.ajax({
            url: "/admin/project/" + PROJECTID + "/apartment-unit/validatebuildingunitname",
            type: "POST",
            data: {
                name: name,
                unitId: unitId,
                buildingId: buildingId
            },
            dataType: "JSON",
            success: function (response) {
                if (!response.data)
                    $("input[name='unit_name']").val('');

                $(".cf-loader").addClass('hidden');
            }
        });
    }


}

function validateBuildingName(obj, buildingId) {
    $(".cf-loader").removeClass('hidden');
    $.ajax({
        url: "/admin/building/validatebuildingname",
        type: "POST",
        data: {
            name: obj.value,
            project_id: PROJECTID,
            building_id: buildingId
        },
        dataType: "JSON",
        success: function (response) {
            if (!response.data)
                $(obj).val('');

            $(".cf-loader").addClass('hidden');
        }
    });
}

function validateEmail(obj, userId) {
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

function validatePhone(obj, userId) {
    $(obj).closest(".form-group").find(".cf-loader").removeClass('hidden');
    $.ajax({
        url: "/admin/user/validateuserphone",
        type: "POST",
        data: {
            phone: obj.value,
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


function validateUserPassword(obj, userId) {
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

function deleteProject(project_id) {
    if (confirm('Are you sure you want to delete this project?') === false) {
        return;
    }

    $.ajax({
        url: "/admin/project/" + project_id,
        type: "DELETE",
        success: function (response) {
            window.location = "/admin/project/";
        }
    });
}


function deleteRoomType(project_id, roomtypeId) {
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

function addAttributes(keyId, obj) {
    var attributename = $(obj).closest('.row').find('input[name="attribute_name_' + keyId + '[]"]').val();

    if (attributename.trim() == '') {
        alert('Enter Attribute Name');
        return false;
    }

    var control_type = $(obj).closest('.row').find('select[name="controltype_' + keyId + '[]"]').val();
    if (control_type.trim() == '') {
        alert('Select Control Type');
        return false;
    }

    var defaultval = $(obj).closest('.row').find('input[name="controltypevalues_' + keyId + '[]"]').val();
    if ((control_type.trim() == 'select' || control_type.trim() == 'multiple') && (defaultval.trim() == '')) {
        alert('Enter Default Values');
        return false;
    }

    var str = '<div class="row">';
    str += '<div class="col-md-12">';
    str += '<div class="add-unit">';
    str += '<div class="p-t-8 p-t-10">';
    str += '<div class="col-xs-4">';
    str += '<input type="text" name = "attribute_name_' + keyId + '[]" class="form-control" placeholder="Enter Attribute Name">';
    str += '<input type="hidden" name = "attribute_id_' + keyId + '[]" value="">';
    str += '</div>';
    str += '<div class="col-xs-4">';
    str += '<select name = "controltype_' + keyId + '[]"  class="select2-container select2 form-control" >';
    str += '<option value="">Select Control Type</option>';
    str += '<option value="textbox" > Text Box</option>';
    str += '<option value="select" >Select Box</option>';
    str += '<option value="multiple" > Multiple Select Box</option>';
    str += '<option value="number"> Number </option>';
    str += '</select>';
    str += '</div>';
    str += '<div class="col-xs-4 controlvalue">';
    str += '<input type="text"  name= "controltypevalues_' + keyId + '[]" data-role="tagsinput" class="tags">';
    str += '</div>';
    str += '</div>';
    str += '<div class="text-right">';
    str += '<a tabindex="0" class="btn btn-link"  onclick="addAttributes(\'' + keyId + '\',this)">Add Attribute</a>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';

    var delstr = '<div class="col-xs-1 text-right">';
    delstr += '<a class="text-primary" onclick="deleteAttribute(' + PROJECTID + ',0,this);" data-object-type="attribute"><i class="fa fa-close"></i></a>';
    delstr += '</div>';

    $(obj).closest('.row').find('.text-right').hide();
    $(obj).closest('.row').find('.col-md-12').removeClass('col-md-12');
    $(obj).closest('.row').find('.add-unit').removeClass('add-unit');
    $(obj).closest('.row').find('.p-t-8').removeClass('p-t-8 p-t-10');
    $(obj).closest('.row').find('.controlvalue').addClass('col-xs-3').removeClass('col-xs-4');
    $(obj).closest('.row').addClass('m-b-10');
    $(obj).closest('.row').find('.controlvalue').after(delstr);
    $(obj).closest('.row').after(str);
    $(obj).select2('val', '');
    $("select").select2();
    $(".tags").tagsinput("");

}

function saveRoomypeattribute(project_id, roomtypeId, reffrence_type) {
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


function deleteAttribute(project_id, attributeId, obj) {
    var attributeType = $(obj).attr('data-object-type');

    if (confirm('Are you sure you want to delete this ' + attributeType + '?') === false) {
        return;
    }
    if (attributeId) {
        $.ajax({
            url: "/admin/project/" + project_id + "/roomtype/" + attributeId + "/deleteattribute",
            type: "DELETE",
            success: function (response) {
                $(obj).closest('.row').remove();
            }
        });
    } else {
        $(obj).closest('.row').remove();
    }
}

function getRoomTypeAttributes(obj, level) {
    var roomId = $(obj).closest('.add-unit').find('select').val();
    var flag = true;
    if (!roomId) {
        alert("Select Room Type");
        return false;
    }

    $(obj).closest('.grid-body').find('input[name="room_id[' + level + '][]"]').each(function () {
        if ($(this).val() == roomId) {
            alert('Room Type Already Selected');
            $(obj).closest('.add-unit').find('select').select2('val', '');
            flag = false;

        }
    });
    if (flag) {
        $.ajax({
            url: BASEURL + "/admin/project/" + PROJECTID + "/roomtype/" + roomId + "/getroomtypeattributes",
            type: "POST",
            data: {
                level: level,
                type: "add",
            },
            success: function (response) {
                var attribute_str = response.data.attributes;
                $(obj).closest('.grid-body').find('.room_attributes_block').append(attribute_str);
                $(obj).closest('.add-unit').find('select').select2('val', '');
                $("select").select2();
            }
        });
    }

}

function updateRoomAttributes() {
    var level = window.parent.$("#roomtypeiframe").attr("level");
    var roomid = window.parent.$("#roomtypeiframe").attr("roomid");

    $("#level_" + level).find('select[name="room_type[]"]').val(roomid);

    $.ajax({
        url: BASEURL + "/admin/project/" + PROJECTID + "/roomtype/" + roomid + "/getroomtypeattributes",
        type: "POST",
        data: {
            level: level,
            type: "edit",
        },
        success: function (response) {
            var attribute_str = response.data.attributes;
            var variantRoomId = $('.roomattribute_' + level + '_' + roomid).find('input[name="variantroomid[]"]').val();
            window.parent.$('.roomattribute_' + level + '_' + roomid).html(attribute_str);
            window.parent.$('.roomattribute_' + level + '_' + roomid).find('input[name="variantroomid[]"]').val(variantRoomId);
            $("select").select2();
        }
    });
}

function setUpProjectMasterUploader() {

    var objectType = $('div.object-master-images').attr('data-object-type');
    var objectId = $('div.object-master-images').attr('data-object-id');
    var authtool_permission = $('div.object-master-images').attr('data-object-id');

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
            max_file_size: '3mb',
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
                var failcount = 0;
                for (var i = 0; i < files.length; i++) {
                    var fileName = files[i].name;
                    var fileData = fileName.split('.');
                    var fileData_1 = fileData[0].split('-');
                    var mastername = fileData_1[0];
                    var position = fileData_1[1];

                    if ((fileData_1.length == 2) && (mastername == 'master' && !isNaN(position))) {
                        var load_newstr = '';
                        var load_str = '<td>';
                        load_str += '<div class="progress progress-small " style="margin:0;">';
                        load_str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="0%" style="width: 0%;margin:0;"></div>';
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
                        } else {
                            load_newstr += '<tr class="" id="position-' + position + '">';
                            load_newstr += load_str;
                            load_newstr += '</tr>';
                            $("#master-img").append(load_newstr);
                        }
                        //$('#position-' + position).find('.progress').html('<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="50%" style="width: 50%;margin:0;"></div>');
                        // $('#position-' + position).find('.progress').html('<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="70%" style="width: 70%;margin:0;"></div>');
                    } else {

                        master_uploader.removeFile(files[i]);
                        failcount++;
                    }

                }

                if (failcount) {

                    $('.project-master-images').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button> ' + failcount + ' images failed to upload. Invalid File Name.</div>');
                    $('.project-master-images').find(".alert-error").removeClass('hidden');
                }

                if (files.length)
                    up.start();
            },
            UploadProgress: function (up, file) {
                var fileName = file.name;
                var fileData = fileName.split('.');
                var fileData_1 = fileData[0].split('-');
                var mastername = fileData_1[0];
                var position = fileData_1[1];

                $('#position-' + position).find('.progress').html('<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="' + file.percent + '%" style="width: ' + file.percent + '%;margin:0;"></div>');

            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
                fileStatus = JSON.parse(xhr.status);
                if (fileStatus == 201) {
                    var master_type = (objectType=='project')?"master":"building_master";
                    var authoringToolUrl = BASEURL + "/admin/project/" + PROJECTID + "/image/" +  fileResponse.data.media_id + "/authoring-tool?&type="+master_type+"&position="+fileResponse.data.position;
                    
                    var str = newstr = '';
                    str += '<td>' + fileResponse.data.filename + '</td>';
                    str += '<td class=""><span class="muted">' + fileResponse.data.position + '</span></td>';
                    str += '<td class=""><div class="checkbox check-primary" ><input id="checkbox' + fileResponse.data.position + '" name="position[]" type="checkbox" value="' + fileResponse.data.position + '"><label for="checkbox' + fileResponse.data.position + '"></label></td>';
                    str += '<td><a target="_blank" href="'+ authoringToolUrl +'" class="hidden auth-tool-' + fileResponse.data.position + '">Authoring Tool</a></td>';
                    str += '<td class="text-right">';
                    str += '<a class="text-primary" onclick="deleteSvg(' + fileResponse.data.media_id + ',\'master\',\'' + fileResponse.data.position + '\');" ><i class="fa fa-close"></i></a>';
                    str += '</td>';

                    $('#position-' + fileResponse.data.position).html(str);
                } else {

                    var fileName = file.name;
                    var fileData = fileName.split('.');
                    var fileData_1 = fileData[0].split('-');
                    var mastername = fileData_1[0];
                    var position = fileData_1[1];

                    $('#position-' + position).html('');
                    $('.project-master-images').html('<div class="alert alert-error"><button class="close" data-dismiss="alert">  </button> ' + JSON.parse(xhr.response).message + '</div>');
                    $('.project-master-images').find(".alert-error").removeClass('hidden');

                }


            },
            Error: function (up, err) {
                $('.project-master-images').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button> ' + err.message + '</div>');
                $('.project-master-images').find(".alert-error").removeClass('hidden');

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
                str += '<div class="img-hover img-thumbnail" id="'+files[0].id+'">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="89%" style="width: 89%;margin:0;"></div>';
                str += '</div>';
                str += '</div>';
                str += ' ';
                $("#2d_" + level + "_image").find('.upload-img-block').addClass('hidden');
                $("#2d_" + level + "_image").append(str);
                 up.start();
 
            },
            UploadProgress: function (up, file) {
                var str = ' ';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="' + file.percent + '%" style="width: ' + file.percent + '%;margin:0;"></div>';
                str += '</div>';
                str += ' ';
                
                $("#" +file.id).html(str);

            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);

                var str = ' ';
                str += '<div class="img-hover img-thumbnail" id="2d-' + fileResponse.data.media_id + '" data-level="'+level+'">';
                str += '<a class="btn btn-link btn-danger overlay" onclick="deleteLayout(' + fileResponse.data.media_id + ',\'2d\');"><i class="fa fa-close text-primary"></i></a>';
                str += '<img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="' + fileResponse.data.image_path + '" />';
                str += '</div>';
                str += '</div>';

                $("#" +file.id).remove();
                $("#2d_" + level + "_image").append(str);

                if (!variantId)
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
                str += '<div class="img-hover img-thumbnail" id="'+files[0].id+'">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="89%" style="width: 89%;margin:0;"></div>';
                str += '</div>';
                str += '</div>';
                str += ' ';
                $("#3d_" + level + "_image").find('.upload-img-block').addClass('hidden');
                $("#3d_" + level + "_image").append(str);
                up.start();
 
            },
            UploadProgress: function (up, file) {
                var str = ' '; 
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="' + file.percent + '%" style="width: ' + file.percent + '%;margin:0;"></div>';
                str += '</div>';
 
                
                $("#" +file.id).html(str);

            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);

                var str = ' ';
                str += '<div class="img-hover img-thumbnail" id="3d-' + fileResponse.data.media_id + '" data-level="'+level+'">';
                str += '<a class="btn btn-link btn-danger overlay" onclick="deleteLayout(' + fileResponse.data.media_id + ',\'3d\');"><i class="fa fa-close text-primary"></i></a>';
                str += '<img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="' + fileResponse.data.image_path + '"   />';
                str += '</div>';
                str += '</div>';

                $("#" +file.id).remove();
                $("#3d_" + level + "_image").append(str);
                if (!variantId)
                    $("#image_" + level + "_3d_id").val(fileResponse.data.media_id);
            }
        }
    });
    uploader_3d.init();


}

function setUpFloorLevelUploader() {
    if (FLOORLEVELS.length === 0)
        return false;

    $.each(FLOORLEVELS, function (index, value) {
        addFloorLevelUploader(value);
    });

}


function deleteLayout(mediaId, type) { 

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
            
            if(type!='gallery')
            { 
                if(type=='external')
                    type = '3d';
                
                var level = $("#"+type+"-" +mediaId).attr('data-level');
                $("#"+type+"_" + level + "_image").find('.upload-img-block').removeClass('hidden');
                if (!variantId)
                     $("#image_" + level + "_"+type+"_id").val('');
               
            }
            $("#"+type+"-" +mediaId).remove();
            //window.location.reload();
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
            max_file_size: '3mb',
            mime_types: [{
                title: "Image files",
                extensions: "jpg,png,jpeg"
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

                if (files[0].name == 'map.jpg' || files[0].name == 'map.png' || files[0].name == 'map.jepg') {
                    up.start();
                } else {
                    uploader.removeFile(files[0]);
                    $('.google-earth-images').html(' <div class="alert alert-error"><button class="close" data-dismiss="alert"></button>The image failed to upload.Please try using another image.</div>');
                    $('.google-earth-images').find(".alert-error").removeClass('hidden');

                }


            },
            UploadProgress: function (up, file) {
                var str = '<div class="col-md-3 progressdiv">';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="' + file.percent + '%" style="width: ' + file.percent + '%;margin:0;"></div>';
                str += '</div>';
                str += '<div class="dz-size" data-dz-size="">' + file.name + '</div>';
                str += '</div>';
                str += '</div>';

                $(".uploadImage").addClass('hidden');
                $('.progressdiv').remove();
                $("#google_earth_image").append(str);

            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
                fileStatus = JSON.parse(xhr.status);
                if (fileStatus == 201) {
                    var authtool = $('div.userauth').attr('date-user-auth');

                    var str = '<div class="col-md-3">';
                    str += '<div class="img-hover img-thumbnail">';
                    str += '<a class="btn btn-link btn-danger overlay" onclick="deleteSvg(' + fileResponse.data.media_id + ',\'google_earth\',\'\');"><i class="fa fa-close text-primary"></i></a>';
                    str += '<img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="' + fileResponse.data.image_path + '"   />';
                    str += '<div class="dz-size" data-dz-size=""><strong></strong>' + fileResponse.data.filename + '</div>';
                    str += '</div>';
                    str += '</div>';
                    str += '<div class="col-md-3">';
                    str += (authtool == '1') ? '<h5 class="semi-bold">To use the Authoring Tool<a href="image/' + fileResponse.data.media_id + '/authoring-tool?&type=google_earth" target="_blank" class="text-primary"> click here</a></h5>' : '';
                    str += '</div>';
                    $("#google_earth_image").html(str);
                    $('.google-earth-images').find(".alert-error").addClass('hidden');
                } else {
                    $(".uploadImage").removeClass('hidden');
                    $('.progressdiv').remove();

                    $('.google-earth-images').html('<div class="alert alert-error"><button class="close" data-dismiss="alert">  </button> ' + JSON.parse(xhr.response).message + '</div>');
                    $('.google-earth-images').find(".alert-error").removeClass('hidden');

                }



            },
            Error: function (up, err) {
                $('.google-earth-images').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button> ' + err.message + '</div>');
                $('.google-earth-images').find(".alert-error").removeClass('hidden');
                $(".uploadImage").removeClass('hidden');
                $('.progressdiv').remove();

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
                var str = ' ';
                str += '<div class="img-hover img-thumbnail" id="'+files[0].id+'">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="89%" style="width: 89%;margin:0;"></div>';
                str += '</div>';
                str += '</div>';
                str += ' ';
                $("#3d_external_image").find('.upload-img-block').addClass('hidden');
                $("#3d_external_image").append(str);
                up.start();
 
            },
            UploadProgress: function (up, file) {
                var str = ' '; 
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="' + file.percent + '%" style="width: ' + file.percent + '%;margin:0;"></div>';
                str += '</div>';
 
                
                $("#" +file.id).html(str);

            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
            
                var str = ' ';
                str += '<div class="img-hover img-thumbnail" id="3d-' + fileResponse.data.media_id + '" data-level="external">';
                str += '<a class="btn btn-link btn-danger overlay" onclick="deleteLayout(' + fileResponse.data.media_id + ',\'3d\');"><i class="fa fa-close text-primary"></i></a>';
                str += '<img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="' + fileResponse.data.image_path + '"   />';
                str += '</div>';
                str += '</div>';

                $("#" +file.id).remove();
                $("#3d_external_image").append(str);

                if (!variantId)
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
                
                 for (var i = 0; i < files.length; i++) {
                    
                    var str = '<div class="col-md-3 variant-gallery-image" id="'+files[i].id+'">';
                    str += '<div class="img-hover img-thumbnail">';
                    str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                    str += '<div style="  width: 150px;height: 93px;"></div>';
                    str += '<div class="progress progress-small " style="margin:0;">';
                    str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="0%" style="width: 0%;margin:0;"></div>';
                    str += '</div>';
                    str += '</div>';
                    str += '</div>';
                    $("#variant_gallery").append(str);

                }
             
                up.start();

            },
            UploadProgress: function (up, file) {
 
                var str = '';
                str += '<div class="img-hover img-thumbnail">';
                str += '<a class="btn btn-link btn-danger overlay"><i class="fa fa-close text-primary"></i></a>';
                str += '<div style="  width: 150px;height: 93px;"></div>';
                str += '<div class="progress progress-small " style="margin:0;">';
                str += '<div class="progress-bar progress-bar-success animate-progress-bar" data-percentage="' + file.percent + '%" style="width: ' + file.percent + '%;margin:0;"></div>';
                str += '</div>';
                str += '</div>';

                $("#"+file.id).html(str); 


            },
            FileUploaded: function (up, file, xhr) {
                fileResponse = JSON.parse(xhr.response);
 
                var str = '';
                str += '<div class="img-hover img-thumbnail" id="gallery-' + fileResponse.data.media_id + '">';
                str += '<a class="btn btn-link btn-danger overlay" onclick="deleteLayout(' + fileResponse.data.media_id + ',\'gallery\');"><i class="fa fa-close text-primary"></i></a>';
                str += '<img style="width:150px;height:93px;" class="img-thumbnail" id="svg1" src="' + fileResponse.data.image_path + '"   />';
                str += '<input type="hidden" name="image_gallery[' + fileResponse.data.media_id + ']" id="image_external_3d_id" value="' + fileResponse.data.media_id + '"> ';
                str += '</div>';
                str += '';
                
                //$('#variant_gallery').find('.variant-gallery-image').first().remove();
                //$("#variant_gallery").append(str);
                $("#"+file.id).html(str);



            }
        }
    });
    uploader_gallery.init();

});

function saveBreakPoint() {
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
                className = ".auth-tool-" + pos;
                if ($(this).prop('checked')) {
                    $(className).removeClass('hidden');
                } else {
                    $(className).addClass('hidden');
                }

            });
        }
    });
}

function deleteSvg(mediaId, type, refference) {
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

function getVariants(obj) {
    var projectPropertyTypeId = obj.value;
    $.ajax({
        url: BASEURL + '/admin/project/' + PROJECTID + '/apartment-variant/getunittypevariants',
        type: "POST",
        data: {
            projectPropertyTypeId: projectPropertyTypeId
        },
        success: function (response) {

            var $el = $(obj).closest('.row').find('select[name="unit_variant_id"]');
            $el.empty(); // remove old options
            $el.append(response.data);

        }
    });
}

function getPositions(obj) {
    var buildingId = $('select[name="building_id"]').val();
    var floor = obj.value;
    $.ajax({
        url: BASEURL + '/admin/project/' + PROJECTID + '/apartment-unit/getavailableposition',
        type: "POST",
        data: {
            buildingId: buildingId,
            floor: floor
        },
        success: function (response) {

            var $el = $("#flat_position");
            $el.select2('val', '');
            $el.empty(); // remove old options
            $el.append(response.data);


        }
    });
}

function getPropertTypeData(obj, flag) {
    $.ajax({
        url: BASEURL + "/admin/project/" + PROJECTID + "/apartment-variant/getpropertytypedata",
        type: "POST",
        data: {
            property_type_id: obj.value,
        },
        success: function (response) {
            var unitTypes = response.data.unit_types;
            if (flag) {
                //VARIANT CODE
                $('#property_type_attributes').html(response.data.attributes);

                $('select[name="unit_type"]').empty();
                $('select[name="unit_type"]').append('<option value=""> Select Unit Type</option>')

                if (unitTypes.trim() != '')
                    $('select[name="unit_type"]').append(unitTypes);

                if ($(obj).find(":selected").text() == 'Apartments') //APARTMENT
                {
                    $(".add_level").addClass('hidden');
                    $("#level_0").find('.level-title').addClass('hidden');
                    $('input[name="levels[]"]').each(function () {

                        if ($(this).val() != 0) {
                            $("#level_" + $(this).val()).addClass('hidden');
                        }
                    });

                } else if ($(obj).find(":selected").text() == 'Penthouses') //PENTHOUSE
                {
                    $(".add_level").removeClass('hidden');
                    $("#level_0").find('.level-title').removeClass('hidden');
                    $('input[name="levels[]"]').each(function () {

                        if ($(this).val() != 0) {
                            $("#level_" + $(this).val()).removeClass('hidden');
                        }
                    });

                }
            } else {
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

function saveAndAddAnother() {
    $("#addanother").val(1);
    $("form").submit();
}

function addUnitType() {
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

function createUnitType(obj, propertyTypeId) {
    var val = $(obj).val();
    var selectext = $(obj).children(':selected').text().trim();
    if (val == 'add_new') {

        if (!$(obj).closest('.unit_type_block').find('input[name="add_new_unit_type"]').length) {
            var unitTypeId = $(obj).closest('.unit_type_block').find('input[type="hidden"]').val();
            var html = '<input type="text" name="unittype[' + propertyTypeId + '][]" value="" onchange="vaildateUnitType(this,' + propertyTypeId + ')" class="form-control">';
            html += '<input type="hidden" name="unittypekey[' + propertyTypeId + '][]" value="' + unitTypeId + '">';
            html += '<input type="hidden" name="unittypecustome[' + propertyTypeId + '][]" value="CUSTOME">';
            $(obj).closest('.unit_type_block').find('.col-md-10').html(html);

        } else {
            var html = '<div class="row m-b-10 unit_type_block">';
            html += '<div class="col-md-10">';
            html += '<input type="text" name="unittype[' + propertyTypeId + '][]" onchange="vaildateUnitType(this,' + propertyTypeId + ')" class="form-control">';
            html += '<input type="hidden" name="unittypekey[' + propertyTypeId + '][]" value="">';
            html += '<input type="hidden" name="unittypecustome[' + propertyTypeId + '][]" value="CUSTOME">';
            html += '</div>';
            html += '<div class="col-md-2 text-center">';
            html += '<a  data-unit-type-id="0" class="text-primary remove-unit-type"><i class="fa fa-close"></i> </a>';
            html += '</div>';
            html += '</div>';
            $(obj).closest('.unit_type_block').before(html);

        }
        $(obj).select2('val', '');

    } else {
        $(obj).closest('.propertytype-unit-types').find('select[name="unittype[' + propertyTypeId + '][]"]').each(function () {

            if ($(obj).get(0) != $(this).get(0) && $(this).val() == val) {
                alert('Unit Type Already Selected');

                $(obj).select2('val', '');

                return false;

            }
        });

        $(obj).closest('.propertytype-unit-types').find('input[name="unittype[' + propertyTypeId + '][]"]').each(function () {

            if ($(this).val().trim() == selectext) {
                alert('Unit Type Already Selected');

                $(obj).select2('val', '');

                return false;

            }
        });

    }
}

function vaildateUnitType(obj, propertyTypeId) {
    var value = $(obj).val().trim();
    $(obj).closest('.propertytype-unit-types').find('select').each(function () {
        if ($(this).children(':selected').text().trim() == value) {
            alert('Unit Type Already Selected');

            $(obj).val('');

            return false;

        }
    });
    $(obj).closest('.propertytype-unit-types').find('input[type="text"]').each(function () {
        if ($(obj).get(0) != $(this).get(0) && $(this).val().trim() == value) {
            alert('Unit Type Already Selected');

            $(obj).val('');

            return false;

        }
    });
}

$('input[name="property_types[]"]').change(function (event) {
    if ($(this).is(':checked')) {
        $(this).closest('.row').find('.propertyTypeUnitsAttributes').removeClass('hidden');
        if ($(this).closest('.row').find('.attributes_block .defaultAttributes').length) {
            $(this).closest('.row').find('.attributes_block .defaultAttributes').removeClass('hidden');
            $(this).closest('.row').find('.attributes_block .defaultAttributes').find('input').prop("disabled", false);
            $(this).closest('.row').find('.attributes_block .defaultAttributes select').prop("disabled", false);
        }
    } else {
        $(this).closest('.row').find('.propertyTypeUnitsAttributes').addClass('hidden');
        if ($(this).closest('.row').find('.attributes_block .defaultAttributes').length) {
            $(this).closest('.row').find('.attributes_block .defaultAttributes').addClass('hidden');
            $(this).closest('.row').find('.attributes_block .defaultAttributes').find('input').prop("disabled", true);
            $(this).closest('.row').find('.attributes_block .defaultAttributes select').prop("disabled", true);
        }

    }

});

function saveVariantConfig() {
    var flag = true;
    var isApartment = false;

    if ($('input[name="property_type"]').length || $('select[name="property_type"]').length) {
        if ($('input[name="property_type"]').attr('data-value') === 'Apartments')
            isApartment = true;
        else if ($('select[name="property_type"]').find(":selected").text() === 'Apartments')
            isApartment = true;
    }



    $('input[name="levels[]"]').each(function () {

        var level = $(this).val();
        if (isApartment && level != 0) {
            return false;
        }

        var roomId = $(this).closest('.row').find('input[name="room_id[' + level + '][]"]').length;
        if (roomId == 0) {

            alert('Select Room Type For Level ' + level);
            flag = false;
        }



    });

    if (flag)
        $('form').submit();

}

function getPhaseData(project_id, phaseId) {

    $.ajax({
        url: "/admin/project/" + project_id + "/getphasedata/" + phaseId,
        type: "GET",
        data: {

        },
        success: function (response) {
            $("#phaseData").html(response.data.html);
            $('#myModal').modal('show');
        }
    });
}

function getPublishData(project_id) {

    $.ajax({
        url: "/admin/project/" + project_id + "/projectpublishdata",
        type: "GET",
        data: {

        },
        success: function (response) {
            $("#publishData").html(response.data.html);
            $('#publishModal').modal('show');
        }
    });
}

function updateResponseTable() {
    $.ajax({
        url: BASEURL + "/api/v1/project/" + PROJECTID + "/update-response-table",
        type: "GET",
        success: function (response) {
            window.location.reload();
        }
    });

}

$("input[name=has_phases]:radio").change(function () {
    var value = $(this).val();
    $.ajax({
        url: "/admin/project/" + PROJECTID + "/validateprojectphase",
        type: "GET",
        data: {
            projectPhase: value,
        },
        success: function (response) {
            if (response.message != '')
                alert(response.message);
        }
    });

});

$("input[name=has_master]:radio").change(function () {
    var value = $(this).val();
    if (value == 'yes')
        $(".object-master-images").removeClass('hidden');
    else
        $(".object-master-images").addClass('hidden');

});

function openRoomTypeModal(obj, id) {
    if (obj.value == 'add_new') {
        $('#myModal').modal('show');
        $('#myModalLabel').text('Add New Room');
        $("#roomtypeiframe").attr("src", "/admin/project/" + PROJECTID + "/roomtype/create");
        $(obj).select2('val', '');
    } else {
        if (id) {
            $('#myModalLabel').text('Edit Room');
            $("#roomtypeiframe").attr("src", "/admin/project/" + PROJECTID + "/roomtype/" + id + "/edit?flag=edit");
            $(".updateattribute").removeClass("hidden");
            $('#myModal').modal('show');
        }
    }

    var level = $(obj).closest('.row').find('input[name="levels[]"]').val();
    $("#roomtypeiframe").attr("level", level);
    $("#roomtypeiframe").attr("roomid", id);

}

function deleteLevel(level) {
    var variantLevels = $('input[name="levels[]"]').length;
    if (variantLevels == 1) {
        alert("Variant Should Have Alleast 1 Level");
        return;
    }

    if (confirm('Are you sure you want to delete this Level? ') === false) {
        return;
    }
    var counter = $("#counter").val();
    var i = parseInt(counter) - 1;
    if (variantId) {
        $.ajax({
            url: BASEURL + "/admin/project/" + PROJECTID + "/bunglow-variant/" + variantId + "/deletelevel",
            type: "DELETE",
            data: {
                level: level,
            },
            success: function (response) {

                $("#counter").val(i);
                $("#deletelevel_" + i).removeClass('hidden');
                $("#level_" + level).remove();
            }
        });
    } else {

        $("#counter").val(i);
        $("#level_" + level).remove();
        $("#deletelevel_" + i).removeClass('hidden');
    }


}

function saveRoom() {
    var flag = true;

    $('.attributes_block select').each(function () {
        var controlVal = $(this).closest('.row').find('.tags').val();
        if (($(this).val() == 'select' || $(this).val() == 'multiple') && controlVal == '') {
            var attributename = $(this).closest('.row').find('input').val();
            alert('Please Enter Default Values For Attribute ' + attributename);
            flag = false;
        }

    });

    if (flag)
        $('form').submit();

}

$('.attributes_block').on('change', 'select', function () {

    if (($(this).val() == 'select' || $(this).val() == 'multiple')) {
        $(this).closest('.row').find('.controlvalue input').attr('data-role', 'tagsinput').attr('readonly', false);
    } else {
        $(this).closest('.row').find('.controlvalue input').removeAttr('data-role').attr('readonly', true);
    }

});


//Reload page after hitting enter
/*$(window).keydown(function(event){
    if(event.keyCode == 13) { 
      event.preventDefault();
      window.location.reload();    
      return false;
    }
 
  });*/
