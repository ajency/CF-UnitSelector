<?php $i = 0; ?>
<div id="addFloorlevel"  class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"> 
     <div class="m-l-5 no-border">
            <button type="button" class="btn btn-small btn-default pull-right m-r-25 add_level" ><i class="fa fa-plus"></i> Add New Level</button>
            <h3><i class="fa fa-angle-double-right text-primary"></i> Room <span class="semi-bold">Details</span></h3>
    </div>
                

                @foreach($variantRooms as $level=>$roomTypes)
                 <div class="row" id="level_{{ $level }}">
                    <div class="no-border">
                        <div class="grid simple" style="margin-bottom:10px;">
                            <div class="grid-body no-border" style="padding-bottom:0;">
                                <div class="panel panel-default vertical orange">
                                    <div class="panel-heading" role="tab" id="headingOne">
                                    <h4 class="panel-title">
                                        <a class="{{ (($level==0))? '':'collapsed' }}" data-toggle="collapse" data-parent="#accordion" href="#collapse{{ $level }}" aria-expanded="false" style="position: relative;">                       
                                        Level {{ $level }}
                                        <input type="hidden" value="{{ $level }}" name="levels[]">
                                        @if($level!=0)
                                        <button type="button" class="btn btn-white btn-small dellevel pull-right" onclick="deleteLevel({{ $level }});" style="position: absolute;right: 22px;top: -4px;"><i class="fa fa-trash"></i></button>
                                        @endif
                                        </a>
                                    </h4>
                                    </div>
                                     <div id="collapse{{ $level }}" class="panel-collapse  {{ (($level==0))? 'in':'collapse' }}" role="tabpanel" aria-labelledby="headingTwo" >
                                    <div class="panel-body"><h4> <span class="semi-bold">Layouts</span></h4>
                                        <div class="row">

                                            <div class="col-md-6">
                                                <div class="grid simple">
                                                    <div class="grid-body">
                                                        <div class="inline">2D Layout</div>    
                                                        <div class="text-center" id="2d_{{ $level }}_image">
                                                            @if(isset($layouts[$level]['2d']))
                                                            
                                                                <div class="img-hover img-thumbnail">
                                                                    <a class="btn btn-link btn-danger overlay" onclick="deleteLayout({{ $layouts[$level]['2d']['ID'] }}, '2d');"><i class="fa fa-close text-primary"></i></a>
                                                                    <img style="width:150px;height:93px;" id="svg1" src="{{ $layouts[$level]['2d']['IMAGE'] }}"   />
                                                                </div>
                                                            
                                                            @else
                                                            <div class="img-hover img-thumbnail">
                                                                <a href="javascript:void(0)" id="pickfiles_{{ $level }}_2d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;" tabindex="0">
                                                                    <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                        <i class="fa fa-image" style="font-size:30px;"></i>
                                                                        <p class="">Select File</p>
                                                                    </div>
                                                                </a>
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
                                                        <div class="text-center" id="3d_{{ $level }}_image">
                                                            @if(isset($layouts[$level]['3d']))
                                                            
                                                                <div class="img-hover img-thumbnail">
                                                                    <a class="btn btn-link btn-danger overlay" onclick="deleteLayout({{ $layouts[$level]['3d']['ID'] }}, '3d');"><i class="fa fa-close text-primary"></i></a>
                                                                    <img style="width:150px;height:93px;" id="svg1" src="{{ $layouts[$level]['3d']['IMAGE'] }}"   />
                                                                </div>
                                                             
                                                            @else
                                                            <div class="img-hover img-thumbnail">
                                                                <a  href="javascript:void(0)" id="pickfiles_{{ $level }}_3d"  style="width: 150px;height:109px;background:#BEBEBE;display: table;" tabindex="0">
                                                                    <div style="color:#FFFFFF;display: table-cell;vertical-align: middle;text-align: center;">
                                                                        <i class="fa fa-image" style="font-size:30px;"></i>
                                                                        <p class="">Select File</p>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            @endif 

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="room_attributes_block">
                                            @foreach($variantRooms[$level] as $variantRoomId=> $roomType) 
                                            <div class="p-r-15 p-l-15 variant_rooms roomattribute_{{$level}}_{{$roomType['ROOMTYPEID']}}">
                                                <div class="text-right">
                                                    <button type="button" class ="btn btn-white btn-small"   onClick="openRoomTypeModal(this,{{ $roomType['ROOMTYPEID'] }});"><i class="fa fa-pencil"></i></button>
                                                    <button type="button" class="btn btn-white btn-small remove-room-attribute"><i class="fa fa-trash"></i></button>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label class="form-label"></label>
                                                            <div class="input-with-icon  right">
                                                                <i class=""></i>
                                                                <input type="hidden" name="room_id[{{$level}}][]" value="{{ $roomType['ROOMTYPEID'] }}">
                                                                <input type="hidden" name="variantroomid[{{$level}}][]" value="{{$variantRoomId}}">
                                                                Room Name : {{ $availableRoomTypes[$roomType['ROOMTYPEID']] }}
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    @foreach($roomTypeAttributes[$roomType['ROOMTYPEID']] as $attributes)
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label class="form-label">{{$attributes['label']}}</label>
                                                            <div class="input-with-icon  right">
                                                                <i class=""></i>
                                                                <?php
                                                                $value = (isset($roomType['ATTRIBUTES'][property_type_slug($attributes['label'])])) ? $roomType['ATTRIBUTES'][property_type_slug($attributes['label'])] : ''
                                                                ?>
                                                                @if('textbox' === $attributes['control_type'])
                                                                <input type="text" class="form-control" name="attributes[{{ $level }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                                                @elseif('number' === $attributes['control_type'])
                                                                <input type="text" class="form-control" name="attributes[{{ $level }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}" data-parsley-type="number" data-parsley-min="0">
                                                                @elseif('select' === $attributes['control_type'])
                                                                <?php
                                                                $options = explode(',', $attributes['defaults']);
                                                                ?>
                                                                <select name="attributes[{{ $level }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" class="select2 form-control">
                                                                    <option value="">Select {{$attributes['label']}}</option>   
                                                                    @foreach($options as $option)
                                                                    <option  @if($value==property_type_slug($option)){{'selected'}}@endif  value="{{property_type_slug($option)}}">{{$option}}</option>
                                                                    @endforeach
                                                                </select>
                                                                @elseif('multiple' === $attributes['control_type'])
                                                                <?php
                                                                $options = explode(',', $attributes['defaults']);
                                                                ?>
                                                                <select multiple name="attributes[{{ $level }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
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
                                                            <button type="button" onclick="getRoomTypeAttributes(this, {{ $level }});" class="btn btn-link">Add Room</button>
                                                        </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                @endforeach
    
				<?php //$i=$level ; ?> 
            </div>
<input type="hidden" id="counter" name="counter" value="{{$i}}">