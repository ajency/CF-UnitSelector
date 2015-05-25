@extends('layouts.singleproject')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="{{ url( 'admin/project/') }}">Projects</a> </li>
    <li><a href="{{ url( 'admin/project/' . $project['id'].'/edit') }}">{{ $project['project_title'] }}</a> </li>
    <li><a href="#" class="active">Project Cost</a> </li>
</ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
 <div class="page-title">
                    <h2>Project<span class="semi-bold"> Costs</span></h2>
                    </div>
<div class="grid simple">
<div class="grid-body">
        <form action="{{ url('admin/project/' . $project['id'].'/costupdate') }}" method="POST" data-parsley-validate>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Floor Rise</label>
                            <div class="input-group transparent">
                                <span class="input-group-addon">
                                    <i class="fa fa-inr"></i>
                                </span> 
                                <input type="text" name="{{ $projectCost['floor_rise']['ID'] }}_floor_rise" class="form-control" 
                                       placeholder="Enter Floor Rise" value="{{ $projectCost['floor_rise']['VALUE'] }}" data-parsley-type="number" data-parsley-errors-container=".pars-rise">
                            </div>
                            <ul class="parsley-errors-list">
                                <li class="parsley-required pars-rise"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Stamp Duty</label>
                            <div class="input-group transparent">
                                <span class="input-group-addon">
                                    <i class="fa fa-inr"></i>
                                </span>
                                <input type="text" class="form-control" name="{{ $projectCost['stamp_duty']['ID'] }}_stamp_duty" 
                                       placeholder="Enter Stamp Duty" value="{{ $projectCost['stamp_duty']['VALUE'] }}" data-parsley-type="number" data-parsley-errors-container=".pars-stamp">
                            </div>
                            <ul class="parsley-errors-list">
                                <li class="parsley-required pars-stamp"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Registration Amount</label>
                            <div class="input-group transparent">
                                <span class="input-group-addon">
                                    <i class="fa fa-inr"></i>
                                </span>
                                <input type="text" class="form-control" name="{{ $projectCost['registration_amount']['ID'] }}_registration_amount" 
                                       placeholder="Enter Registration Amount" value="{{ $projectCost['registration_amount']['VALUE'] }}" data-parsley-type="number" data-parsley-errors-container=".pars-reg">
                            </div>
                            <ul class="parsley-errors-list">
                                <li class="parsley-required pars-reg"></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">VAT</label>
                            <div class="input-group transparent">
                                <span class="input-group-addon">
                                    <span>%</span>
                                </span>
                                <input type="text" class="form-control" name="{{ $projectCost['VAT']['ID'] }}_vat" 
                                       placeholder="Enter VAT amount" value="{{ $projectCost['VAT']['VALUE'] }}" data-parsley-type="number" data-parsley-errors-container=".pars-vat">
                            </div>
                            <ul class="parsley-errors-list">
                                <li class="parsley-required pars-vat"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Service Tax</label>
                            <div class="input-group transparent">
                                <span class="input-group-addon">
                                    <span>%</span>
                                </span>
                                <input type="text" class="form-control" name="{{ $projectCost['service_tax']['ID'] }}_service_tax" 
                                       placeholder="Enter Service Tax" value="{{ $projectCost['service_tax']['VALUE'] }}" data-parsley-type="number" data-parsley-errors-container=".pars-st">
                            </div>
                            <ul class="parsley-errors-list">
                                <li class="parsley-required pars-st"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Service Tax</label>
                            <span class="help">For Agreement amount > Rs. 1cr</span>
                            <div class="input-group transparent">
                                <span class="input-group-addon">
                                    <span>%</span>
                                </span>
                                <input type="text" class="form-control" name="{{ $projectCost['service_tax_above_1cr']['ID'] }}_service_tax_above_1cr" 
                                       placeholder="Enter Service Tax" value="{{ $projectCost['service_tax_above_1cr']['VALUE'] }}" data-parsley-type="number" data-parsley-errors-container=".pars-st2">
                            </div>
                            <ul class="parsley-errors-list">
                                <li class="parsley-required pars-st2"></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Infrastructure Charges</label>
                            <div class="input-group transparent">
                                <span class="input-group-addon">
                                    <i class="fa fa-inr"></i>
                                </span>
                                <input type="text" class="form-control" name="{{ $projectCost['infrastructure_charge']['ID'] }}_infrastructure_charge" 
                                       placeholder="Enter Infrastructure charges" value="{{ $projectCost['infrastructure_charge']['VALUE'] }}" data-parsley-type="number" data-parsley-errors-container=".pars-infra">
                            </div>
                            <ul class="parsley-errors-list">
                                <li class="parsley-required pars-infra"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Membership Fees</label>
                            <div class="input-group transparent">
                                <span class="input-group-addon">
                                    <i class="fa fa-inr"></i>
                                </span>
                                <input type="text" class="form-control" name="{{ $projectCost['membership_fees']['ID'] }}_membership_fees" 
                                       placeholder="Enter Membership Fees" value="{{ $projectCost['membership_fees']['VALUE'] }}" 
                                       data-parsley-type="number" data-parsley-errors-container=".pars-mem">
                            </div>
                            <ul class="parsley-errors-list">
                                <li class="parsley-required pars-mem"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="form-actions">  
                    <div class="pull-right">
                        <input type="hidden" value="{{ csrf_token()}}" name="_token"/> 

                        <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-check"></i> Save</button>
                        <button type="submit" class="btn btn-default btn-cons"><i class="fa fa-ban"></i> Cancel</button>
                    </div>
                    
                </div>
            </form>
    </div>
</div>
@endsection