<form method="POST" id="formroomdetails" name="formroomdetails">
    <div class="grid simple">
        <div class="grid-title">
            <h3 class="inline">Room <span class="semi-bold">Details</span></h3>

            <div class="user-description-box inline">

                <p>Add rooms (which are created on attributes page) which are present at each level (floor).
                    Click on Add Level button to add new levels. </p>
            </div>
        </div>
        <?php
        $i = 0;
        ?>
        <input type="hidden" name="floorlevel[]" value="{{$i}}">
        <div class="grid-body">
            <div class="row m-t-20">
                <?php $j = 1; ?>
                @if(isset($variantRooms[0]))
                @foreach($variantRooms[0] as $roomId => $room)              
                <div class="form-inline">
                    <div class="form-group">
                        <input type="hidden" name="variantroomid_{{$i}}[]" value="{{ $roomId }}">
                        <select name="room_name_{{ $i }}[]" class="select2 form-control" onchange="getRoomTypeAttributes(this,{{ $unitVariant['id'] }},{{$i}});">
                            <option value="">Select Room</option>
                            @foreach($availableRoomTypes as $roomType)
                            <option {{ $room['ROOMTYPEID'] == $roomType['id'] ? 'selected' : '' }} value="{{ $roomType['id'] }}">
                                {{ $roomType['name'] }}
                            </option>
                            @endforeach
                        </select>
                        @if($j === count($variantRooms[0]))
                        <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this,{{ $unitVariant['id'] }})"><i class="fa fa-plus"></i></button>
                        @endif


                    </div> 
                </div>
                <div >
                    <!--Attributes-->     
                    <div class="m-t-10">
                        <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 text-grey">	
                            <div class="row"> 
                                @foreach($roomTypeAttributes[$room['ROOMTYPEID']] as $attributes)
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">{{$attributes['label']}}</label>
                                        <?php
                                        $value = (isset($room['ATTRIBUTES'][property_type_slug($attributes['label'])])) ? $room['ATTRIBUTES'][property_type_slug($attributes['label'])] : ''
                                        ?>
                                        @if('textbox' === $attributes['control_type'])
                                        <input type="text" class="form-control" name="attributes[{{ $i }}][{{ $room['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                        @elseif('number' === $attributes['control_type'])
                                        <input type="number" class="form-control" name="attributes[{{ $i }}][{{ $room['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" value="{{ $value }}"  placeholder="Enter {{$attributes['label']}}">
                                        @elseif('select' === $attributes['control_type'])
                                        <?php
                                        $options = explode(',', $attributes['defaults']);
                                        ?>
                                        <select name="attributes[{{ $i }}][{{ $room['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}]" class="select2 form-control">
                                            <option value="">Select {{$attributes['label']}}</option>   
                                            @foreach($options as $option)
                                            <option  @if($value==property_type_slug($option)){{'selected'}}@endif  value="{{property_type_slug($option)}}">{{$option}}</option>
                                            @endforeach
                                        </select>
                                        @elseif('multiple' === $attributes['control_type'])
                                        <?php
                                        $options = explode(',', $attributes['defaults']);
                                        ?>
                                        <select multiple name="attributes[{{ $i }}][{{ $room['ROOMTYPEID'] }}][{{property_type_slug($attributes['label'])}}][]" class="select2 form-control">
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
                <?php $j++; ?>
                @endforeach
                @endif  
                <div class="col-sm-12" id="levelblock_0"> 
                    <div class="form-inline">
                        <div class="form-group">
                            <input type="hidden" name="variantroomid_{{$i}}[]" value="">
                            <select name="room_name_{{$i}}[]" class="select2 form-control"  onchange="getRoomTypeAttributes(this,{{ $unitVariant['id'] }},{{$i}});">
                                <option value="">Select Room</option>
                                @foreach($availableRoomTypes as $roomType)
                                <option value="{{ $roomType['id'] }}">{{ $roomType['name'] }}</option>
                                @endforeach
                            </select>
                            <button type="button" class="btn btn-white" onclick="addRoomAttributes({{$i}}, this,{{ $unitVariant['id'] }})"><i class="fa fa-plus"></i></button>
                        </div> 
                    </div>
                    <div >
                        <!--Attributes-->  
                    </div>
                </div> 
            </div>
            <div class="form-actions">  
                <div class="pull-right">
                    <button onclick="saveRoomdetails({{$project['id']}},{{ $unitVariant['id'] }});"
                            type="button" class="btn btn-primary btn-cons">Save</button>
                </div>
            </div>   
        </div>
    </div>
</form>
