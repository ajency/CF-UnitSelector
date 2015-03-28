<?php

class ProjectTest extends \Codeception\TestCase\Test {

    /**
     * @var \UnitTester
     */
    protected $tester;

    public function test_getPropertyTypesAttribute() {
        $project = new CommonFloor\Project;
        $this->assertEquals( ["Apartments"], $project->getPropertyTypesAttribute( 'apartments' ) );
        $this->assertEquals( ["Apartments", "Land"], $project->getPropertyTypesAttribute( 'apartments||land' ) );
    }

}
