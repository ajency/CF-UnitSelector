
<div class="grid simple">
 
    <div class="grid-title"  role="tab" id="headingTwo">
        
         <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">

         <div class="row">
<h3 class="col-md-2"> Project <span class="semi-bold">Phases</span>
                </h3>
 <div class="col-md-9">
 <div class="user-description-box ">
         <p>Stages which the project undergoes e.g. Construction,For Sale. 
          This is applicable only for projects having apartments, where each building will have one of the phase as entered below.</p>
    </div>
    </div>
<div class="col-md-1 text-right"><i class="fa fa-angle-down grid-angle-down"></i>
<i class="fa fa-angle-up "></i>
         </div>
</div>
</a>
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