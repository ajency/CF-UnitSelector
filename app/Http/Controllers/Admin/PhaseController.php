<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use CommonFloor\Phase;
use CommonFloor\Project;

class PhaseController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( Request $request ) {
        $project_id = $request->input( 'project_id' );
        $phase_name = $request->input( 'phase_name' );
        $authphase = Phase::where(['phase_name'=>$phase_name,'project_id'=>$project_id])->get()->toArray();
        $phase_id =0;
        $type ='';   
        if(empty($authphase))
        {
            $phase_id = Phase::where(['phase_name'=>'Default','project_id'=>$project_id])->pluck('id');
           
            if($phase_id)
            {
                $phase = Phase::find($phase_id);
                $phase->project_id = $project_id;
                $phase->phase_name = ucfirst($phase_name);
                $phase->save();
                $type = "edit";
            }
            else {
                $phase = new Phase();
                $phase->project_id = $project_id;
                $phase->phase_name = ucfirst($phase_name);
                $phase->save();

                $phase_id = $phase->id;
                 $type = "add";
            }
            $msg = 'Phase Successfully Created';
            $responseCode = 201;
        }
        else
        {
           $msg = 'Phase Name Already Exist In Project';
           $responseCode = 200; 
        }
        

        return response()->json( [
                    'code' => 'phase_created',
                    'message' => $msg,
                    'data' => [
                        'phase_id' => $phase_id,
                        'type' => $type
                    ]
            ], $responseCode );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $id ) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit( $id ) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update( $phase_id ,Request $request) {
         $phase = Phase::find($phase_id);
            $phase->status = 'live';
            $phase->save();
            
            return response()->json( [
                    'code' => 'phase_created',
                    'message' => 'Phase Status Successfully Updated',
                    'data' => [
                        'phase_id' => $phase_id,
                    ]
            ], 201 );
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy( $id ) { 
        $phase = Phase::find( $id ); 
        $projectId = $phase->project_id;
        $project = Project ::find($projectId);
        $projectPhases = $project->projectPhase()->get()->toArray();
        $units = $phase->projectUnits()->get()->toArray();
        $units = $phase->projectUnits()->get()->toArray();
        $buildings = $phase->projectBuildings()->get()->toArray();
        $msg ='';
        if(count($units)+count($buildings))
        {
            $msg ='Cannot delete phase because there are units associated to it';
            $code = '200';
        }
        else{
            
            $phase->delete();
            $code = '204';
            
            if(count($projectPhases)==1)
            {
                $project->has_phase ='no';
                $project->save();

                $phase = new Phase();
                $phase->project_id = $project->id;
                $phase->phase_name = 'Default';
                $phase->save();
                $code = '201';
            }
            
            $msg ='Phase deleted successfully';
            
        }
        
        return response()->json( [
                    'code' => 'phase_deleted',
                    'message' => $msg,
         
                        ], $code );
    }

}
