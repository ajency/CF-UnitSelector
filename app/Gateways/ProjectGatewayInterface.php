<?php

namespace CommonFloor\Gateways;

/**
 * ProjectGatewayInterface 
 * @author surajair
 */
interface ProjectGatewayInterface {

    public function getProjectStepOneDetails( $projectId );
    public function getProjectStepTwoDetails( $projectId );
    
}
