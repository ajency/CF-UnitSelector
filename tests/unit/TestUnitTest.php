<?php

class TestUnitTest extends \Codeception\TestCase\Test {

    /**
     * @var \UnitTester
     */
    protected $tester;

    // tests
    public function testAsserts() {
        $this->assertEquals( 1, 1 );
    }
    
    public function testAsserts2() {
        $this->assertEquals( 1, 1 );
        $this->tester->assertTrue(true);
    }
}
