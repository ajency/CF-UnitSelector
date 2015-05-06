<div class="grid simple">
    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

        <div class="grid-title" role="tab" id="headingOne">
            <div class="pull-right"><i class="fa fa-angle-up "></i>
                <i class="fa fa-angle-down grid-angle-down"></i>
            </div>
            <h3><span class="semi-bold">Room</span> Type</h3>

        </div></a>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
        <div class="grid-body">

            @foreach($roomtypeAttributes as $roomtypeId=>$roomtype)

            <form name="frmroomtype_{{$roomtypeId}}" id="frmroomtype_{{$roomtypeId}}">
                <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 m-b-10 text-grey">
                    <div class="row m-b-10 m-t-10">
                        <div class="form-group col-sm-3">
                            <div>
                                <label class="form-label">Room Name</label>
                            </div>
                            <input type="text" name="room_typename_{{$roomtypeId}}" class="form-control" value="{{$roomtype['NAME']}}" placeholder="Enter Room Name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">Attribute Name</label>
                                <i class="fa fa-question-circle " data-toggle="tooltip" data-placement="right" data-original-title="Attributes Name will be the specification for each room type for example (Area, Length * Width, etc)."></i>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-inline">
                                <div class="form-group full-width">
                                    <label class="form-label">Control Type</label>
                                    <i class="fa fa-question-circle" data-toggle="tooltip" data-placement="right" data-original-title="The selected control type will be available as input on the Variant page."></i>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="form-label m-l-15">Default Values</label>

                            </div>
                        </div>
                    </div>
                    @foreach($roomtype['ATTRIBUTES'] as $attributes)    
                    <div class="row" id="roomtypeattribute_{{$attributes['id']}}">
                        <div class="col-md-3">
                            <div class="form-group">

                                <input type="text" name="attribute_name_{{$roomtypeId}}" class="form-control" value="{{$attributes['label']}}" placeholder="Enter Attribute Name">
                                <input type="hidden" name="attribute_id_{{$roomtypeId}}" value="{{$attributes['id']}}">

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-inline">
                                <div class="form-group full-width">

                                    <select name="controltype_{{$roomtypeId}}" onchange="defaultBlock(this.value,{{$roomtypeId}});" class="full-width">
                                        <option value="">Select Control Type</option>
                                        <option value="textbox" @if($attributes['control_type']=='textbox'){{'selected'}}@endif> Text Box</option>
                                        <option value="select" @if($attributes['control_type']=='select'){{'selected'}}@endif>Select Box</option>
                                        <option value="multiple" @if($attributes['control_type']=='multiple'){{'selected'}}@endif> Multiple Select Box</option>
                                        <option value="media" @if($attributes['control_type']=='number'){{'selected'}}@endif> Number </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5" id="controltype_values_{{$roomtypeId}}">
                            <div class="form-group">

                                <div class="col-lg-8 col-md-7">
                                    <input type="text" name="controltypevalues_{{$roomtypeId}}" data-role="tagsinput" class="tags" value="{{$attributes['defaults']}}">
                                </div>
                                <div class="col-lg-4 col-md-5">
                                    <button type="button" class="btn btn-small btn-default m-t-5" onclick="deleteRoomTypeAttribute({{$project['id']}},{{$attributes['id']}});"><i class="fa fa-trash"></i> Delete</button>
                                </div>

                            </div>

                        </div>
                    </div>
                    @endforeach
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <input type="text" name="attribute_name_{{$roomtypeId}}" class="form-control" placeholder="Enter Attribute Name">
                                <input type="hidden" name="attribute_id_{{$roomtypeId}}" value="">

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-inline">
                                <div class="form-group full-width">
                                    <select name="controltype_{{$roomtypeId}}" onchange="defaultBlock(this.value,{{$roomtypeId}});" class="full-width">
                                        <option value="">Select Control Type</option>
                                        <option value="textbox" > Text Box</option>
                                        <option value="select" >Select Box</option>
                                        <option value="multiple" > Multiple Select Box</option>
                                        <option value="number" > Number </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5" id="controltype_values_{{$roomtypeId}}">

                            <div class="form-group">
                                <div class="col-lg-8 col-md-7">
                                    <input type="text" name="controltypevalues_{{$roomtypeId}}" data-role="tagsinput" class="tags">
                                </div>
                                <div class="col-lg-4 col-md-5">
                                      <!--<button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>-->
                                    <button type="button" class="btn btn-white" onclick="addRoomtypeAttributes({{$roomtypeId}}, this)"><i class="fa fa-plus"></i> Add New</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="addroomtypeattributeblock_{{$roomtypeId}}">
                        <div class="text-right"> 
                            <button type="button" class="btn btn-small btn-primary" onclick="saveRoomypeattribute({{$project['id']}},{{$roomtypeId}}, 'room_type');"><i class="fa fa-save"></i> Save</button>
                            <button type="button" class="btn btn-small btn-default" onclick="deleteRoomType({{$project['id']}},{{$roomtypeId}});"><i class="fa fa-trash"></i> Delete</button>
                            <div class="cf-loader" id="loader_{{$roomtypeId}}" style="display:none" ></div>
                        </div>
                    </div>
                </div>  
            </form>    
            @endforeach 

            <div class="row" id="addroomtypeblock">
                <div class="col-md-6">
                    <div class="form-inline">
                        <div class="form-group">
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            <input type="text" name="roomtype" id="roomtype" class="form-control" placeholder="Add Room Type">
                            <button class="btn btn-white" onclick="addRoomtype({{$project['id']}});"><i class="fa fa-plus"></i> Add New</button>
                            <span class="cf-loader" id="loader" style="display:none" ></span>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

