<?php

namespace CommonFloor\Http\Controllers\Rest;

use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Gateways\ProjectGatewayInterface;
use CommonFloor\ProjectJson;

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

            $data = $this->projectGateway->getProjectStepOneDetails( $projectId );
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
        $projectJson = ProjectJson::where('project_id', $projectId)
                                        ->where('type', 'step_two')->get()->first();

        return response()->json( [
                            'data' => $projectJson->project_json
                        ], 200, [], JSON_NUMERIC_CHECK );
    }

    public function updateResponseTable( $projectId ){
        $data = $this->projectGateway->getProjectStepTwoDetails( $projectId );
        $projectJson = ProjectJson::where('project_id', $projectId)
                                ->where('type', 'step_two')->get()->first();
        $projectJson->project_json = $data;
        $projectJson->save();
        return response()->json( [
                            'code' => '',
                            'message' => 'Project json updated successfully'
                    ], 203 );
    }

}
