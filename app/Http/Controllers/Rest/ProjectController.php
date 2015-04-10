<?php

namespace CommonFloor\Http\Controllers\Rest;

use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Gateways\ProjectGatewayInterface;

class ProjectController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $projectId, ProjectGatewayInterface $projectGateway ) {
        
        try{
            
            $data = $projectGateway->getProjectStepOneDetails($projectId);
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

}
