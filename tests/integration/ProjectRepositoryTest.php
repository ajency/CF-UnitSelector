<?php

class ProjectRepositoryTest extends \Codeception\TestCase\Test {

    /**
     * @var \IntegrationTester
     */
    protected $tester;

    protected function _before() {
        
    }

    protected function _after() {
        
    }

    // tests
    public function testgetProjectsWhenNoProjectsExistsInSystem() {
        $projectCount = CommonFloor\Project::all()->count();
        $this->assertEquals(0, $projectCount);
    }

}
