$.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

function addRoomtype(project_id)
{
    var roomtypename = $("#roomtype").val();
    if(roomtypename=='')
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
            str += '<select name = "controltype_' + roomtypeId + '" onchange="defaultBlock(this.value,\'' + roomtypeId + '\')">';
            str += '<option value = "" > Controls </option>';
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
            str += '<div class = "form-inline" >';
            str += '<div class = "form-group" >';
            str += '<input type = "controltypevalues_' + roomtypeId + '" class = "form-control" placeholder="Default values" >';
            str += '<button type="button" class = "btn btn-white" onclick="addRoomtypeAttributes("' + roomtypeId + '",this)"> <i class ="fa fa-plus" > </i></button>';
            //str += ' <button class = "btn btn-small btn-default m-t-5"  > <i class = "fa fa-trash" > </i> Delete</button>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<div class = "row" id="addroomtypeattributeblock_' + roomtypeId + '">';
            str += '<div class = "col-md-12" >';
            str += '<div class = "text-right" >';
            str += '<button type="button" class = "btn btn-small btn-primary" onclick="saveRoomypeattribute('+project_id+',' + roomtypeId + ',\'room_type\');" > <i class = "fa fa-save" > </i> Save</button>';
            str += ' <button type="button" class = "btn btn-small btn-default" onclick="deleteRoomType('+project_id+',' + roomtypeId + ');" > <i class = "fa fa-trash" > </i> Delete</button >';
            str += '<div class="cf-loader" id="loader_' + roomtypeId + '" style="display:none" ></div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div> ';
            str += '</form> ';

            $("#addroomtypeblock").before(str);
            $("#roomtype").val('');
            $("select").select2();
            $("#loader").hide();
        }
    });
}

function deleteRoomType(project_id,roomtypeId)
{    
    $.ajax({
        url: "/admin/project/" + project_id + "/roomtype/" +roomtypeId ,
        type: "DELETE",
      
        success: function (response) {
             $("#frmroomtype_"+roomtypeId).remove();
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
            str += '<select name = "controltype_' + roomtypeId + '" onchange="defaultBlock(this.value,\'' + roomtypeId + '\')">';
            str += '<option value = "" > Controls </option>';
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
            str += '<div class = "form-inline" >';
            str += '<div class = "form-group" >';
            str += '<input type = "controltypevalues_' + roomtypeId + '" class = "form-control" placeholder="Default values" >';
            //str += '<button class = "btn btn-small btn-default m-t-5" > <i class = "fa fa-trash" > </i> Delete</button>';
            str += '<button type="button" class = "btn btn-white" onclick="addRoomtypeAttributes(\'' + roomtypeId + '\',this)"> <i class ="fa fa-plus" > </i></button>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';


            $("#addroomtypeattributeblock_"+roomtypeId).before(str);
            $(obj).hide();
            $("select").select2();
            
}

function saveRoomypeattribute(project_id,roomtypeId,reffrence_type)
{  
    $("#loader_"+roomtypeId).show();
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

function saveRoomypeattribute(project_id,roomtypeId,reffrence_type)
{  
    $("#loader_"+roomtypeId).show();
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


function deleteRoomTypeAttribute(project_id,attributeId)
{    
    $.ajax({
        url: "/admin/project/" + project_id + "/roomtype/" +attributeId+"/deleteroomtypeattributes" ,
        type: "DELETE",
      
        success: function (response) {
             $("#roomtypeattribute_"+attributeId).remove();
        }
    });
}



function defaultBlock(value,refId)
{
   /* if(value=='select'|| value=='multiple')
        $("#controltype_values_"+refId).show();
    else
        $("#controltype_values_"+refId).hide(); */
}

function addFloorLevel()
{
    var counter = $("#counter").val();
    var i= parseInt(counter)+1;
    var str ='';
    
        str +='';
        str +='<div class="col-sm-12" id="levelblock_'+i+'"> ';
        str +='<div class="row">';
        str +='<div class="col-sm-12">';
        str +='<div class="form-group">';
        str +='<h3>Level '+i+'</h3>';
        str +='<input type="hidden" name="floorlevel[]" value="'+i+'">';
        str +='</div> ';
        str +='</div> ';
        str +='</div>';

        str +='<div class="form-inline">';
        str +='<div class="form-group">';
        str +=' <input type="hidden" name="variantroomid_'+i+'[]" value="">';
        str +='<select name="room_name_'+i+'[]" class="select2 form-control">';
        str +='<option value="">Select Room</option>';
        str +=ROOMTYPES;
        str +='</select>';
        str +='<button type="button" onclick="addRoomAttributes('+i+',this)" class="btn btn-white"><i class="fa fa-plus"></i></button>';
        str +='</div> ';

        str +='</div>';
        str +='</div> ';
        
        $("#addFloorlevel").before(str);
         $("#counter").val(i);
}

function addRoomAttributes(level,obj)
{
     var str ='';
 
        str +='<div class="form-inline">';
        str +='<div class="form-group">';
        str +=' <input type="hidden" name="variantroomid_'+level+'" value="">';
        str +='<select name="room_name_'+level+'" class="select2 form-control">';
        str +='<option value="">Select Room</option>';
        str +=ROOMTYPES;
        str +='</select>';
        str +='<button type="button" onclick="addRoomAttributes('+level+',this)" class="btn btn-white"><i class="fa fa-plus"></i></button>';
        str +='</div> ';
 
        $(obj).hide();
        $("#levelblock_"+level).append(str);
}

function setUpProjectMasterUploader(){

    var divs = ['front','left','back','right','front-left', 'left-back', 'back-right', 'right-front'];

    _.each(divs, function(divName, index){
        var div = $('.' + divName + '-svg');

        var supportMultiple = divName.indexOf('-') > 0
        var selectBtnId = _.uniqueId('select-btn-');
        var selectBtn = div.find('.master_pickfiles').attr('id', selectBtnId);

        var uploadBtnId = _.uniqueId('upload-btn-');
        var uploadBtn = div.find('.master_uploadfiles').attr('id', uploadBtnId);

        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: selectBtnId, // you can pass in id...
            url: '/admin/project/' + PROJECTID + '/media',
            flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
            silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
            headers: {
                "x-csrf-token": $("[name=_token]").val()
            },
            multipart_params: {
                "type": "master",
                "section" : divName
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
                    document.getElementById(uploadBtnId).onclick = function () {
                        uploader.start();
                    };
                },
                FileUploaded: function (up, file, xhr) {
                    fileResponse = JSON.parse(xhr.response);

                    if(supportMultiple)
                        div.find('.uploaded-images').append('<div class="col-sm-2">\n\
                            <img width="150" height="150" src="'+fileResponse.data.image_path+'" class="img-responsive" >\n\
                            </div>')
                    else
                        div.find('.uploaded-image').html('<object width="150" id="svg1" data="'+fileResponse.data.image_path+'" type="image/svg+xml" />');
                }
            }
        });
        uploader.init();
    });
}

$(document).ready(function(){

        setUpProjectMasterUploader()

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
                FileUploaded: function (up, file, xhr) {
                    fileResponse = JSON.parse(xhr.response);
                    $("#project_googleearth_image").html('<object width="150" id="svg1" data="'+fileResponse.data.image_path+'" type="image/svg+xml" />');
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
                FileUploaded: function (up, file, xhr) {
                    fileResponse = JSON.parse(xhr.response);
                    $("#skyview_image").append('<img width="150" height="150" src="'+fileResponse.data.image_path+'" class="img-responsive" >');
                }
            }
        });
        skyview_uploader.init();
});
