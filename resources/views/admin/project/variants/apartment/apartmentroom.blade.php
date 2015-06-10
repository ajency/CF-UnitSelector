<div id="addFloorlevel"> 
                
                <div class="row" id="level_0">
                    <div class="m-l-5 no-border">
                         
                        <h3><i class="fa fa-angle-double-right text-primary"></i> Room <span class="semi-bold">Details</span></h3>
                    </div>
                    <div class="grid simple" style="margin-bottom:0;">
                        <div class="grid-body no-border" style="padding-bottom:0;">
                            <div class="grid simple vertical orange">
                                <div class="grid-title hidden">
                                    <input type="hidden" value="0" name="levels[]">
                                </div>
                                <div class="grid-body"><h4> <span class="semi-bold">Layouts</span></h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="grid simple">
                                                <div class="grid-body">
                                                    <div>2D Layout</div>
                                                    <input type="hidden" name="image_0_2d_id" id="image_0_2d_id" value=""> 
                                                    <div class="text-center" id="2d_0_image">
                                                       @if(isset($layouts[0]['2d']))
                                                           
                                                                <div class="img-hover img-thumbnail">
                                                                    <a class="btn btn-link btn-danger overlay" onclick="deleteLayout({{ $layouts[0]['2d']['ID'] }}, '2d');"><i class="fa fa-close text-primary"></i></a>
                                                                    <img style="width:150px;height:93px;" id="svg1" src="{{ $layouts[0]['2d']['IMAGE'] }}"   />
                                                                </div>
                                                            
                                                            @else
                                                           <div class="img-hover img-thumbnail">
                                                            <div id="pickfiles_0_2d" style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                                                <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                    <i class="fa fa-image" style="font-size:30px;"></i>
                                                                    <p class="">Select File</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                            @endif    
                                                        


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="grid simple" >
                                                <div class="grid-body">
                                                    <div class="inline">3D Layout</div>
                                                    
                                                    <div class="text-center" id="3d_0_image">
                                                        @if(isset($layouts[0]['3d']))
                                                           
                                                                <div class="img-hover img-thumbnail">
                                                                    <a class="btn btn-link btn-danger overlay" onclick="deleteLayout({{ $layouts[0]['3d']['ID'] }}, '3d');"><i class="fa fa-close text-primary"></i></a>
                                                                    <img style="width:150px;height:93px;" id="svg1" src="{{ $layouts[0]['3d']['IMAGE'] }}"   />
                                                                </div>
                                                            
                                                            @else
                                                            <div class="img-hover img-thumbnail">
                                                            <div id="pickfiles_0_3d" style="width: 150px;height:109px;background:#BEBEBE;display: table;">
                                                                <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                    <i class="fa fa-image" style="font-size:30px;"></i>
                                                                    <p class="">Select File</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                            @endif
                                                        
                                                        

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="room_attributes_block">
                                        @foreach($variantRooms[0] as $variantRoomId=> $roomType) 
                                        <div class="p-r-15 p-l-15 variant_rooms roomattribute_0_{{$roomType['ROOMTYPEID']}}">
                                            <div class="text-right">
                                                <button type="button" class ="btn btn-white btn-small" onClick="openRoomTypeModal(this,{{ $roomType['ROOMTYPEID'] }});"><i class="fa fa-pencil"></i></button>
                                                <button type="button" class="btn btn-white btn-small remove-room-attribute"><i class="fa fa-trash"></i></button>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label"></label>
                                                        <div class=" right">
                                                            <i class=""></i>
                                                            <input type="hidden" name="variantroomid[0][]" value="{{$variantRoomId}}">
                                                            <input type="hidden" name="room_id[0][]" value="{{ $roomType['ROOMTYPEID'] }}">
                                                            Room Name : {{ $availableRoomTypes[$roomType['ROOMTYPEID']] }}
                                                        </div>
                                                    </div> 
                                                </div>
                                                @foreach($roomTypeAttributes[$roomType['ROOMTYPEID']] as $attributes)
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">{{$attributes['label']}}</label>
                                                        <div class="right">
                                                            <i class=""></i>
                                                            <?php
                                                            $value = (isset($roomType['ATTRIBUTES'][property_type_slug($attributes['label'])])) ? $roomType['ATTRIBUTES'][property_type_slug($attributes['label'])] : ''
                                                            ?>
                                                            @if('textbox' === $attributes['control_type'])
                                                            <input type="text" class="form-control" name="attributes[0][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                                            @elseif('number' === $attributes['control_type'])
                                                            <input type="number" class="form-control" name="attributes[0][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                                            @elseif('select' === $attributes['control_type'])
                                                            <?php
                                                            $options = explode(',', $attributes['defaults']);
                                                            ?>
                                                            <select name="attributes[0][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" class="select2 form-control">
                                                                <option value="">Select {{$attributes['label']}}</option>   
                                                                @foreach($options as $option)
                                                                <option  @if($value==property_type_slug($option)){{'selected'}}@endif  value="{{property_type_slug($option)}}">{{$option}}</option>
                                                                @endforeach
                                                            </select>
                                                            @elseif('multiple' === $attributes['control_type'])
                                                            <?php
                                                            $options = explode(',', $attributes['defaults']);
                                                            ?>
                                                            <select multiple name="attributes[0][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
                                                                <option value="">Select {{$attributes['label']}}</option>   
                                                                @foreach($options as $option)
                                                                <option {{ (!empty($value) && in_array(property_type_slug($option),$value)) ? 'selected="selected"' : '' }}  value="{{property_type_slug($option)}}">{{$option}}</option>
                                                                @endforeach
                                                            </select>
                                                            @endif 
                                                        </div>
                                                    </div> 
                                                </div>

                                                @endforeach


                                            </div>
                                        </div>

                                        @endforeach
                                    </div>
                                    <div>
                                            <div class="col-md-5 add-unit p-t-10">
                                              <select onchange="openRoomTypeModal(this, 0)" name="room_type[]" class="select2 form-control">
                                                                <option value="">Select Room</option>
                                                                 @foreach($availableRoomTypes as $roomTypeId=> $room_type)
                                                                <option  value="{{$roomTypeId}}">{{$room_type}}</option>
                                                                @endforeach
                                                                <option value="add_new">Add New Room</option>
                                                            </select>
                                                       
                                                        <div class="text-right">
                                                            <button type="button" onclick="getRoomTypeAttributes(this, 0);" class="btn btn-link">Add Room</button>
                                                        </div>
                                            </div>
                                         </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>