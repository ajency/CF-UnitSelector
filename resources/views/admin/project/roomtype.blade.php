@extends('layouts.singleproject')

@section('content')
<div class="page-title">	
    <h2>Room  <span class="semi-bold">Type</span></h2>
</div>

<div class="grid simple">
    <div class="grid-title">
        <h3>Room <span class="semi-bold">Type</span></h3>
    </div>
    <div class="grid-body">

        @foreach($roomtypeAttributes as $roomtypeId=>$roomtype)
        
        <form name="frmroomtype_{{$roomtypeId}}" id="frmroomtype_{{$roomtypeId}}">
        <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 m-b-10 text-grey">
            <div class="form-inline m-b-10 m-t-10">
                <div class="form-group">
                    <input type="text" name="room_typename_{{$roomtypeId}}" class="form-control" value="{{$roomtype['NAME']}}">
                </div>
            </div>
            @foreach($roomtype['ATTRIBUTES'] as $attributes)    
            <div class="row" id="roomtypeattribute_{{$attributes['id']}}">
                <div class="col-md-3">
                    <div class="form-group">
                        <div class="">
                            <input type="text" name="attribute_name_{{$roomtypeId}}" class="form-control" value="{{$attributes['label']}}" placeholder="Attribute Name">
                            <input type="hidden" name="attribute_id_{{$roomtypeId}}" value="{{$attributes['id']}}">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-inline">
                        <div class="form-group">
                            <select name="controltype_{{$roomtypeId}}" onchange="defaultBlock(this.value,{{$roomtypeId}});">
                                <option value="">Controls Type</option>
                                <option value="textbox" @if($attributes['control_type']=='textbox'){{'selected'}}@endif> Text Box</option>
                                <option value="select" @if($attributes['control_type']=='select'){{'selected'}}@endif>Select Box</option>
                                <option value="multiple" @if($attributes['control_type']=='multiple'){{'selected'}}@endif> Multiple Select Box</option>
                                <option value="media" @if($attributes['control_type']=='number'){{'selected'}}@endif> Number </option>
                            </select>
                           
                        </div>
                    </div>
                </div>
                <div class="col-md-5" id="controltype_values_{{$roomtypeId}}">
                    <div class="form-inline">
                        <div class="form-group">
                            <input type="text" name="controltypevalues_{{$roomtypeId}}" class="form-control" value="{{$attributes['defaults']}}" placeholder="Default values">
                            <button type="button" class="btn btn-small btn-default m-t-5" onclick="deleteRoomTypeAttribute({{$project['id']}},{{$attributes['id']}});"><i class="fa fa-trash"></i> Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <div class="">
                            <input type="text" name="attribute_name_{{$roomtypeId}}" class="form-control" placeholder="Attribute Name">
                            <input type="hidden" name="attribute_id_{{$roomtypeId}}" value="">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-inline">
                        <div class="form-group">
                            <select name="controltype_{{$roomtypeId}}" onchange="defaultBlock(this.value,{{$roomtypeId}});">
                                <option value="">Controls Type</option>
                                <option value="textbox" > Text Box</option>
                                <option value="select" >Select Box</option>
                                <option value="multiple" > Multiple Select Box</option>
                                <option value="number" > Number </option>
                            </select>
                            
                        </div>
                    </div>
                </div>
                <div class="col-md-5" id="controltype_values_{{$roomtypeId}}">
                    <div class="form-inline">
                        <div class="form-group">
                            <input type="text" name="controltypevalues_{{$roomtypeId}}" class="form-control" placeholder="Default values">
                            <!--<button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>-->
                            <button type="button" class="btn btn-white" onclick="addRoomtypeAttributes({{$roomtypeId}},this)"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row"  id="addroomtypeattributeblock_{{$roomtypeId}}">
                <div class="col-md-12">

                    <div class="text-right"> 
                        <button type="button" class="btn btn-small btn-primary" onclick="saveRoomypeattribute({{$project['id']}},{{$roomtypeId}},'room_type');"><i class="fa fa-save"></i> Save</button>
                        <button type="button" class="btn btn-small btn-default" onclick="deleteRoomType({{$project['id']}},{{$roomtypeId}});"><i class="fa fa-trash"></i> Delete</button>
                        <div class="cf-loader" id="loader_{{$roomtypeId}}" style="display:none" ></div>
                    </div>


                </div>
            </div>
        </div>  
        </form>    
        @endforeach 

        <div class="row" id="addroomtypeblock">
            <div class="col-md-4">
                <div class="form-inline">
                    <div class="form-group">
                        <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                        <input type="text" name="roomtype" id="roomtype" class="form-control" placeholder="Add Room Type">
                        <button class="btn btn-white" onclick="addRoomtype({{$project['id']}});"><i class="fa fa-plus"></i></button>
                        <div class="cf-loader" id="loader" style="display:none" ></div>   

                    </div>
                </div>
            </div>
        </div>



    </div>
</div>

 @foreach($projectpropertytypeAttribute as $propertytypeId=>$propertytypeAttribute)
<div class="grid simple">
    <div class="grid-title">
        <h3>{{ get_property_type($propertytypeId) }} <span class="semi-bold">Attributes</span></h3>
    </div>
    <div class="grid-body">
        <form name="frmroomtype_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}" id="frmroomtype_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}">
        <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 m-b-10 text-grey">
            @foreach($propertytypeAttribute['ATTRIBUTES'] as $attributes)    
            <div class="row" id="roomtypeattribute_{{$attributes['id']}}">
                <div class="col-md-3">
                    <div class="form-group">
                        <div class="">
                            <input type="text" name="attribute_name_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}" class="form-control" value="{{$attributes['label']}}" placeholder="Attribute Name">
                            <input type="hidden" name="attribute_id_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}" value="{{$attributes['id']}}">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-inline">
                        <div class="form-group">
                            <select name="controltype_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}">
                                <option value="">Controls Type</option>
                                <option value="textbox" @if($attributes['control_type']=='textbox'){{'selected'}}@endif> Text Box</option>
                                <option value="select" @if($attributes['control_type']=='select'){{'selected'}}@endif>Select Box</option>
                                <option value="multiple" @if($attributes['control_type']=='multiple'){{'selected'}}@endif> Multiple Select Box</option>
                                <option value="media" @if($attributes['control_type']=='number'){{'selected'}}@endif> Number </option>
                            </select>
                           
                        </div>
                    </div>
                </div>
                <div class="col-md-5" id="controltype_values_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}">
                    <div class="form-inline">
                        <div class="form-group">
                            <input type="text" name="controltypevalues_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}" class="form-control" placeholder="Default values" value="{{$attributes['defaults']}}">
                            <button type="button" class="btn btn-small btn-default m-t-5" onclick="deleteRoomTypeAttribute({{$project['id']}},{{$attributes['id']}});"><i class="fa fa-trash"></i> Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <div class="">
                            <input type="text" name="attribute_name_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}" class="form-control" placeholder="Attribute Name">
                            <input type="hidden" name="attribute_id_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}" value="">
                        </div>
                    </div>
                </div>
                <div class="col-md-4" id="controltype_values_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}">
                    <div class="form-inline">
                        <div class="form-group">
                            <select name="controltype_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}" >
                                <option value="">Controls Type</option>
                                <option value="textbox" > Text Box</option>
                                <option value="select" >Select Box</option>
                                <option value="multiple" > Multiple Select Box</option>
                                <option value="number"> Number </option>
                            </select>
                           
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-inline">
                        <div class="form-group">
                            <input type="text" name="controltypevalues_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}" class="form-control" placeholder="Default values">
                            <!--<button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>-->
                             <button type="button" class="btn btn-white" onclick="addRoomtypeAttributes('proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}',this)"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row"  id="addroomtypeattributeblock_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}">
                <div class="col-md-12">

                    <div class="text-right"> 
                        <button type="button" class="btn btn-small btn-primary" onclick="saveRoomypeattribute({{$project['id']}},'proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}','property_type');"><i class="fa fa-save"></i> Save</button>
                        <!--<button type="button" class="btn btn-small btn-default"><i class="fa fa-trash"></i> Delete</button>-->
                        <div class="cf-loader" id="loader_proptype_{{ $propertytypeAttribute['PROJECTPROPERTYTYPEID'] }}" style="display:none" ></div>
                    </div>


                </div>
            </div>
        </div>  
        </form>  

    </div>
</div>
 @endforeach
 <script>
var BASEURL = '{{ url() }}';
</script>

@endsection