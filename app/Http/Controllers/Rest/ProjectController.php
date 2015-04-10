<?php

namespace CommonFloor\Http\Controllers\Rest;

use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Gateways\ProjectGatewayInterface;

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
                            ], 200 );
        } catch (Exception $ex) {
            return response()->json( [
                        'code' => 'Failed',
                        'message' => 'Some error message'
                    ], 403 );
        }
    }

    public function stepTwo( $projectId ) {
        $data = $this->projectGateway->getProjectStepTwoDetails( $projectId );
        return response()->json( [
                                'data' => $data
                            ], 200 );
    }

}
