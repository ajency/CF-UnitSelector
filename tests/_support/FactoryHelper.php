<?php

namespace Codeception\Module;

use League\FactoryMuffin\Facade as FactoryMuffin;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

class FactoryHelper extends \Codeception\Module {
    
    /**
     *
     * @var \Faker
     */
    protected $faker;

    public function _initialize() {
        
        $this->faker = \Faker\Factory::create();

        FactoryMuffin::define( 'CommonFloor\User', array(
            'name' => 'name',
            'email' => 'unique:email',
            'password' => 'password'
        ) );

        FactoryMuffin::define( 'CommonFloor\Project', array(
            'cf_project_id' => 'randomNumber',
            'project_title' => 'sentence|3',
            'city' => 'city',
            'project_address' => 'address',
            'sellable_unit_types' => 'randomDigit',
            'created_by' => 'factory|CommonFloor\User',
            'updated_by' => 'factory|CommonFloor\User'
        ) );
    }

    public function haveUsers( $count ) {
        return FactoryMuffin::seed( $count, 'CommonFloor\User' );
    }

    public function haveProjects( $count ) {
        return FactoryMuffin::seed( $count, 'CommonFloor\Project' );
    }

    public static function tearDownAfterClass() {
        FactoryMuffin::deleteSaved();
    }

}
