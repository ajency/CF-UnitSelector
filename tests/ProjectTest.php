<?php

/**
 * Description of ProjectTest
 *
 * @author surajair
 */
class ProjectTest extends TestCase{
    
    public function testToArray() {
        $response = $this->call( 'GET', '/' );
        $this->assertEquals( 200, $response->getStatusCode() );
    }
    
}
