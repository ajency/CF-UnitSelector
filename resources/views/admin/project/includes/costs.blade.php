<div class="grid simple">

    <div class="grid-title">
        <h3>Project <span class="semi-bold">Costs</span></h3>
    </div> 
    <div class="grid-body">
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">Floor Rise</label>
                    <div class="input-group transparent">
                        <span class="input-group-addon">
                            <i class="fa fa-inr"></i>
                        </span>
                        <input type="text" name="{{ $project_meta[0]['id'] }}_floor_rise" class="form-control" 
                               placeholder="Enter Floor Rise" value="{{ $project_meta[0]['meta_value'] }}" data-parsley-type="number">
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">Stamp Duty</label>
                    <div class="input-group transparent">
                        <span class="input-group-addon">
                            <i class="fa fa-inr"></i>
                        </span>
                        <input type="text" class="form-control" name="{{ $project_meta[1]['id'] }}_stamp_duty" 
                               placeholder="Enter Stamp Duty" value="{{ $project_meta[1]['meta_value'] }}" data-parsley-type="number">
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">Registration Amount</label>
                    <div class="input-group transparent">
                        <span class="input-group-addon">
                            <i class="fa fa-inr"></i>
                        </span>
                        <input type="text" class="form-control" name="{{ $project_meta[2]['id'] }}_registration_amount" 
                               placeholder="Enter Registration Amount" value="{{ $project_meta[2]['meta_value'] }}" data-parsley-type="number">
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">VAT</label>
                    <div class="input-group transparent">
                        <span class="input-group-addon">
                            <i class="fa fa-inr"></i>
                        </span>
                        <input type="text" class="form-control" name="{{ $project_meta[3]['id'] }}_vat" 
                               placeholder="Enter VAT amount" value="{{ $project_meta[3]['meta_value'] }}" data-parsley-type="number">
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">Service Tax</label>
                    <div class="input-group transparent">
                        <span class="input-group-addon">
                            <i class="fa fa-inr"></i>
                        </span>
                        <input type="text" class="form-control" name="{{ $project_meta[4]['id'] }}_service_tax" 
                               placeholder="Enter Service Tax" value="{{ $project_meta[4]['meta_value'] }}" data-parsley-type="number">
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">Service Tax</label>
                    <span class="help">For Agreement amount > Rs. 1cr</span>
                    <div class="input-group transparent">
                        <span class="input-group-addon">
                            <i class="fa fa-inr"></i>
                        </span>
                        <input type="text" class="form-control" name="{{ $project_meta[5]['id'] }}_service_tax_above_1cr" 
                               placeholder="Enter Service Tax" value="{{ $project_meta[5]['meta_value'] }}" data-parsley-type="number">
                    </div>
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
                        <input type="text" class="form-control" name="{{ $project_meta[6]['id'] }}_infrastructure_charge" 
                               placeholder="Enter Infrastructure charges" value="{{ $project_meta[6]['meta_value'] }}" data-parsley-type="number">
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">Membership Fees</label>
                    <div class="input-group transparent">
                        <span class="input-group-addon">
                            <i class="fa fa-inr"></i>
                        </span>
                        <input type="text" class="form-control" name="{{ $project_meta[7]['id'] }}_membership_fees" 
                               placeholder="Enter Membership Fees" value="{{ $project_meta[7]['meta_value'] }}" 
                               data-parsley-type="number" >
                    </div>
                </div>
            </div>
        </div>
        <div class="form-actions">  
            <div class="pull-right">
                <input type="hidden" name="_method" value="PUT">
                <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                <button type="submit" class="btn btn-primary btn-cons">Save</button>
            </div>
        </div>
    </div>
</div>