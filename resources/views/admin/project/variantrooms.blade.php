<form method="POST" id="formroomdetails" name="formroomdetails">
        <div class="grid simple">
           <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <div class="grid-title" role="tab" id="headingTwo">
                    <div class="pull-right"><i class="fa fa-angle-down grid-angle-down"></i>
                        <i class="fa fa-angle-up "></i>
                    </div>
                   <h3 class="inline">Room <span class="semi-bold">Details</span></h3>&nbsp;
                    <span class="inline" data-toggle="popover" data-trigger="hover" data-content="Add rooms (which are created on attributes page) which are present at each level (floor).
                    Click on Add Level button to add new levels." data-original-title="" title=""><i class="fa fa-info"></i></span>
            </div>
        </a>
            <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div class="grid-body">
                    <div>
                        <?php $i = 0; ?>
                        @foreach($variantRooms as $level=>$roomTypes)
                        <div id="levelblock_{{$i}}"> 
                                        <div class="form-group">
                                        <h3>Level {{$i}}</h3>
                                        <input type="hidden" name="floorlevel[]" value="{{$i}}">
                                    </div> 
                            <?php $j = 1; ?>
                            @foreach($roomTypes as $variantRoomId=> $roomType)              
                            <div class="room-block">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-4">
                                    <input type="hidden" name="variantroomid_{{$i}}[]" value="{{$variantRoomId}}">
                                    <select name="room_name_{{$i}}[]" class="select2 form-control" onchange="getRoomTypeAttributes(this,{{ $unitVariant['id'] }},{{$i}});">
                                        <option value="">Select Room</option>
                                        @foreach($availableRoomTypes as $room_type)
                                        <option @if($roomType['ROOMTYPEID']==$room_type['id']){{'selected'}}@endif   value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-8">
                                    @if($j === count($roomTypes))
                                    <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this,{{ $unitVariant['id'] }})"><i class="fa fa-plus"></i></button>
                                    @endif
                                </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <!--Attributes-->     
                                <div class="m-t-10">
                                    <div class="b-grey b-t b-b b-l b-r p-t-15 p-r-15 p-l-15 p-b-15 text-grey">	
                                        <div class="row"> 
                                            @foreach($roomTypeAttributes[$roomType['ROOMTYPEID']] as $attributes)
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">{{$attributes['label']}}</label>
                                                    <?php
                                                    $value = (isset($roomType['ATTRIBUTES'][property_type_slug($attributes['label'])])) ? $roomType['ATTRIBUTES'][property_type_slug($attributes['label'])] : ''
                                                    ?>
                                                    @if('textbox' === $attributes['control_type'])
                                                    <input type="text" class="form-control" name="attributes[{{ $i }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                                    @elseif('number' === $attributes['control_type'])
                                                    <input type="number" class="form-control" name="attributes[{{ $i }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                                    @elseif('select' === $attributes['control_type'])
                                                    <?php
                                                    $options = explode(',', $attributes['defaults']);
                                                    ?>
                                                    <select name="attributes[{{ $i }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" class="select2 form-control">
                                                        <option value="">Select {{$attributes['label']}}</option>   
                                                        @foreach($options as $option)
                                                        <option  @if($value==property_type_slug($option)){{'selected'}}@endif  value="{{property_type_slug($option)}}">{{$option}}</option>
                                                        @endforeach
                                                    </select>
                                                    @elseif('multiple' === $attributes['control_type'])
                                                    <?php
                                                    $options = explode(',', $attributes['defaults']);
                                                    ?>
                                                    <select multiple name="attributes[{{ $i }}][{{ $roomType['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
                                                        <option value="">Select {{$attributes['label']}}</option>   
                                                        @foreach($options as $option)
                                                        <option {{ (!empty($value) && in_array(property_type_slug($option),$value)) ? 'selected="selected"' : '' }}  value="{{property_type_slug($option)}}">{{$option}}</option>
                                                        @endforeach
                                                    </select>
                                                    @endif        
                                                </div> 
                                            </div>
                                          
                                            @endforeach

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <?php $j++; ?>
                            @endforeach   
                        </div>
                        <hr/> 
                        <?php $i++; ?>   
                        @endforeach
                        <div id="levelblock_{{$i}}"> 
                            
                                    <div class="form-group">
                                        <h3>Level {{$i}}</h3>
                                        <input type="hidden" name="floorlevel[]" value="{{$i}}">
                                    </div> 
                                
                            <div class="room-block">
                                <div class="form-group">
                                    <div class="row m-b-5">
                                        <div class="col-md-4">
                                    <input type="hidden" name="variantroomid_{{$i}}[]" value="">
                                    <select name="room_name_{{$i}}[]" class="select2 form-control" onchange="getRoomTypeAttributes(this,{{ $unitVariant['id'] }},{{$i}});">
                                        <option value="">Select Room</option>
                                        @foreach($availableRoomTypes as $room_type)
                                        <option value="{{$room_type['id']}}">{{$room_type['name']}}</option>
                                        @endforeach
                                    </select>
                                   </div>
                                    <div class="col-md-8">
                                    <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this,{{ $unitVariant['id'] }})"><i class="fa fa-plus"></i></button>
                                </div>
                                 </div>

                                    <a href="#" data-toggle="modal" data-target=".bs-example-modal-lg">+ Add Room </a>
                                
                                </div>
                            </div>
                            <div >
                                <!--Attributes-->  
                            </div>
                            <hr/>
                        </div>
                        <hr/>
                        <div class="text-right m-t-10" id="addFloorlevel">  
                            <input type="hidden" id="counter" name="counter" value="{{$i}}">
                            <button type="button" class="btn btn-small btn-default" onclick="addFloorLevel({{ $unitVariant['id'] }});">Add Level</button>
                        </div> 
                    </div> 

                    <div class="form-actions">  
                         <div class="text-right">
                            <button onclick="saveRoomdetails({{$project['id']}},{{ $unitVariant['id'] }});" type="button" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                        </div>
                    </div> 
                </div>

            </div>
        </div>
</form>

<!-- Modal -->
<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-left" id="myModalLabel">Add Room </h4>
      </div>
      <div class="modal-body">
        <iframe src="/admin/project/{{ $project['id'] }}/attributes/addroomtype" width="100%" ></iframe>
      </div>
      <div class="modal-footer">    
          <button type="button" class="btn btn-primary"><i class="fa fa-check"></i> Save</button>
        <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
      </div>
    </div>
  </div>
</div>