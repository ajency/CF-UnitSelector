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

        $this->factory->define( 'CommonFloor\User', array(
            'name' => 'name',
            'email' => 'unique:email',
            'password' => 'password'
        ) );
    }

    public function haveUsers( $count ) {
        $this->factory->seed( $count, 'CommonFloor\User' );
    }

}
