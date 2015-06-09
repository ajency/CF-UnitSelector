<?php

namespace CommonFloor\Http\Controllers\Rest;

use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Gateways\ProjectGatewayInterface;
use CommonFloor\ProjectJson;
use CommonFloor\Unit;
use CommonFloor\Project;
use CommonFloor\UnitVariant;
use CommonFloor\UnitType;
use CommonFloor\Building;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use \Input;

class ProjectController extends Controller {

    private $projectGateway;

    public function __construct( ProjectGatewayInterface $projectGateway ) {
        $this->projectGateway = $projectGateway;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $projectId ) {

        try {

            if (Auth::check())
            {
                $data = $this->projectGateway->getProjectStepOneDetails( $projectId );
            }
            else
            {
                $projectJson = ProjectJson::where('project_id', $projectId)
                                        ->where('type', 'step_one')->get()->first();
                $data = $projectJson->project_json;
                 
            }

            return response()->json( [
                                'data' => $data
                            ], 200, [], JSON_NUMERIC_CHECK );
        } catch (Exception $ex) {
            return response()->json( [
                                'code' => 'Failed',
                                'message' => 'Some error message'
                            ], 403 );
        }
    }

    public function stepTwo( $projectId ) {
                

        if (Auth::check())
        {
            $projectJsonData = $this->projectGateway->getProjectStepTwoDetails( $projectId );
        }
        else
        {
            $projectJson = ProjectJson::where('project_id', $projectId)
                                        ->where('type', 'step_two')->get()->first();
            $projectJsonData = $projectJson->project_json;    
        }
        
        if(!empty($projectJsonData))                             //UPDATE CURRENT UNIT STATUS TO JSON DATA
        {
            $unitData = [];
            $units = $projectJsonData['units'];
            foreach ($units as $unit)
            {
                $unit['availability']=  \CommonFloor\Unit::find($unit['id'])->availability;
                $unitData[]=$unit;
            }
            $projectJsonData['units']=$unitData;
        }
        return response()->json( [
                            'data' => $projectJsonData
                        ], 200, [], JSON_NUMERIC_CHECK );
    }

    public function updateResponseTable( $projectId ){
        $stepOneData = $this->projectGateway->getProjectStepOneDetails( $projectId );
        $stepTwoData = $this->projectGateway->getProjectStepTwoDetails( $projectId );

        $projectJson = ProjectJson::where('project_id', $projectId)
                                ->where('type', 'step_one')->get()->first();
        $projectJson->project_json = $stepOneData;
        $projectJson->save();

        $projectJson = ProjectJson::where('project_id', $projectId)
                                ->where('type', 'step_two')->get()->first();
        $projectJson->project_json = $stepTwoData;
        $projectJson->save();
        \Session::flash('success_message','Project Successfully Published');
        return response()->json( [
                            'code' => '',
                            'message' => 'Project json updated successfully'
                    ], 203 );
    }

}
