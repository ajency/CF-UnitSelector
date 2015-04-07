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
        <form>
            <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 m-b-10 text-grey">
                <div class="form-inline m-b-10 m-t-10">
                    <div class="form-group">
                        <input type="text" name="room_typename_1" class="form-control" value="Kitchen">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <div class="">
                                <input type="number" name="attribute_name_1[]" class="form-control" placeholder="Attribute Name">
                                <input type="hidden" name="attribute_id_1[]" value="">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-inline">
                            <div class="form-group">
                                <select name="controltype_1[]">
                                    <option value="">Controls</option>
                                    <option value="textbox"> Text Box</option>
                                    <option value="textarea"> Textarea </option>
                                    <option value="select">Select Box</option>
                                    <option value="multiple"> Multiple Select Box</option>
                                    <option value="radio"> Radio </option>
                                    <option value="checkbox"> Checkbox </option>
                                    <option value="media"> Media </option>
                                </select>
                                <button class="btn btn-white"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5" id="controltype_values_1" style="display: none">
                        <div class="form-inline">
                            <div class="form-group">
                                <input type="number" class="form-control" placeholder="1024sqft, 2000sqft  ">
                                <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">

                        <div class="text-right">
                            <input type="hidden" name="roomtype_id" value="">
                            <button class="btn btn-small btn-primary" onclick="finction('1');"><i class="fa fa-save"></i> Save</button>
                            <button class="btn btn-small btn-default"><i class="fa fa-trash"></i> Delete</button>
                        </div>


                    </div>
                </div>
            </div>   
            <!--<div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 m-b-10 text-grey">
                <div class="form-inline m-b-10 m-t-10">
                    <div class="form-group">
                        <input name="room_typename[]" type="text" class="form-control" value="Bedroom">

                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <div class="">
                                <input name="attribute_name[]"  type="text" class="form-control" placeholder="Size">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="form-inline">
                            <div class="form-group">
 
                                 <select name="controltype[]">
                                    <option value="">Controls</option>
                                    <option value="textbox" Selected> Text Box</option>
                                    <option value="textarea"> Textarea </option>
                                    <option value="select">Select Box</option>
                                    <option value="multiple"> Multiple Select Box</option>
                                    <option value="radio"> Radio </option>
                                    <option value="checkbox"> Checkbox </option>
                                    <option value="media"> Media </option>
                                </select>
                                <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <div class="">
                                <input name="room_typename[]" type="text" class="form-control" placeholder="Bedroom">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-inline">
                            <div class="form-group">
                                <select name="controltype[]">
                                    <option value="">Controls</option>
                                    <option value="textbox" > Text Box</option>
                                    <option value="textarea"> Textarea </option>
                                    <option value="select" Selected>Select Box</option>
                                    <option value="multiple"> Multiple Select Box</option>
                                    <option value="radio"> Radio </option>
                                    <option value="checkbox"> Checkbox </option>
                                    <option value="media"> Media </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-inline">
                            <div class="form-group">
                                <input name="control_values" type="text" class="form-control" placeholder="1024sqft, 2000sqft  ">
                                <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">

                        <div class="text-right">
                            <button class="btn btn-small btn-primary"><i class="fa fa-save"></i> Save</button>
                            <button class="btn btn-small btn-default"><i class="fa fa-trash"></i> Delete</button>
                        </div>


                    </div>
                </div>
            </div>   -->



            <div class="row">
                <div class="col-md-4">
                    <div class="form-inline">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Add Room Type">
                            <button class="btn btn-white"><i class="fa fa-plus"></i></button>


                        </div>
                    </div>
                </div>
            </div>

        </form>

    </div>
</div>

<div class="grid simple">
    <div class="grid-title">
        <h3>Project <span class="semi-bold">Attributes</span></h3>
    </div>
    <div class="grid-body">
        <form>
            <div class="b-grey b-t b-b b-l b-r p-t-10 p-r-15 p-l-15 p-b-15 m-b-10 text-grey">


                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <div class="">
                                <input type="number" name="attribute_name_1[]" class="form-control" placeholder="Attribute Name">
                                <input type="hidden" name="attribute_id_1[]" value="">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-inline">
                            <div class="form-group">
                                <select name="controltype_1[]">
                                    <option value="">Controls</option>
                                    <option value="textbox"> Text Box</option>
                                    <option value="textarea"> Textarea </option>
                                    <option value="select">Select Box</option>
                                    <option value="multiple"> Multiple Select Box</option>
                                    <option value="radio"> Radio </option>
                                    <option value="checkbox"> Checkbox </option>
                                    <option value="media"> Media </option>
                                </select>
                                <button class="btn btn-white"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5" id="controltype_values_1" style="display: none">
                        <div class="form-inline">
                            <div class="form-group">
                                <input type="number" class="form-control" placeholder="1024sqft, 2000sqft  ">
                                <button class="btn btn-small btn-default m-t-5"><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">

                        <div class="text-right">
                            <input type="hidden" name="roomtype_id" value="">
                            <button class="btn btn-small btn-primary" onclick="finction('1');"><i class="fa fa-save"></i> Save</button>
                            <button class="btn btn-small btn-default"><i class="fa fa-trash"></i> Delete</button>
                        </div>


                    </div>
                </div>
            </div>   

        </form>

    </div>
</div>

@endsection