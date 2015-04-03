<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use CommonFloor\User;
use CommonFloor\RoomType;

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

class RoomTypeTableSeeder extends Seeder {

    public function run() {
        RoomType::create( ['name' => 'Bedroom'],
                          ['name' => 'Kitchen'],
                          ['name' => 'Dining'],
                          ['name' => 'Bathroom'],
                          ['name' => 'Master Bedroom'],
                          ['name' => 'Livingroom '],
                          ['name' => 'Lobby'],
                          ['name' => 'Toilet ']
                );
    }

}
