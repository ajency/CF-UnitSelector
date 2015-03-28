<?php

namespace Codeception\Module;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

class FactoryHelper extends \Codeception\Module {

    /**
     *
     * @var \League\FactoryMuffin\Factory
     */
    protected $factory;

    public function _initialize() {

        $this->factory = new \League\FactoryMuffin\Factory;

        $this->factory->define( 'CommonFloor\Project', array(
            'cf_project_id' => 'randomNumber',
            'project_title' => 'sentence|3',
            'city' => 'city',
            'project_address' => 'address',
            'sellable_unit_types' => 'randomDigit',
            'created_by' => 'factory|CommonFloor\User'
        ) );
        
        $this->factory->define( 'CommonFloor\User', array(
            'name' => 'name',
            'email' => 'unique:email',
            'password' => 'password'
        ) );
    }

    public function haveUsers( $count ) {
        $this->factory->seed( $count, 'CommonFloor\User' );
    }

    public function haveProjects( $count ) {
        $this->factory->seed( $count, 'CommonFloor\Project' );
    }

}
