<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use CommonFloor\User;
use CommonFloor\PropertyType;

class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        Model::unguard();
        $this->call( 'UserTableSeeder' );
        $this->command->info( " User Table Seeded! " );

        $this->call( 'PropertyTypeTableSeeder' );
        $this->command->info( " Property Type Table Seeded! " );
    }

}

class UserTableSeeder extends Seeder {

    public function run() {
        User::create( [
            'name' => 'Super Admin',
            'email' => 'admin@cf.com',
            'password' => Hash::make( 'admin' )
        ] );
    }

}

class PropertyTypeTableSeeder extends Seeder {

    public function run() {
        PropertyType::create( ['name' => 'Apartments'] );
        PropertyType::create( ['name' => 'Villas/Bungalows'] );
        PropertyType::create( ['name' => 'Plots'] );
        PropertyType::create( ['name' => 'Penthouses'] );
    }

}
