
<div class="grid simple">
 
    <div class="grid-title"  role="tab" id="headingTwo">
        
         <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
<div class="pull-right"><i class="fa fa-angle-down grid-angle-down"></i>
<i class="fa fa-angle-up "></i>
         </div>
<h3>
                    Project <span class="semi-bold">Phases</span>
                </h3></a>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">

    <div class="grid-body">
        <div class="row">
            <div class="col-md-4">
                <div class="form-inline">
                    <div class="form-group object-phases" data-object-type="project">
                        <input type="text" class="form-control phase-name" placeholder="Add Phase">
                        <button type="button" class="btn btn-small btn-primary add-phase-btn"><i class="fa fa-save"></i> Save</button>
                    </div>
                </div>

            </div>

            <div class="col-md-8">
                <div class="p-t-5 phases">
                    @foreach($project['project_phase'] as $phase)
                    <div class="pull-left m-r-15">
                        <strong>{{ $phase['phase_name'] }}</strong>
                        <button type="button" data-phase-id="{{ $phase['id'] }}" class="btn btn-mini btn-link remove-phase">
                            <span class="fa fa-times text-danger"></span></button>
                    </div>
                    @endforeach
                 </div>
            </div>
        </div>
    </div>
</div>
</div>