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

        //$this->call( 'RoomTypeTableSeeder' );
        $this->command->info( " Room Type Table Seeded! " );
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
        RoomType::create( ['name' => 'Bedroom'] );
        RoomType::create( ['name' => 'Kitchen'] );
        RoomType::create( ['name' => 'Dining'] );
        RoomType::create( ['name' => 'Bathroom'] );
        RoomType::create( ['name' => 'Master Bedroom'] );
        RoomType::create( ['name' => 'Livingroom'] );
        RoomType::create( ['name' => 'Lobby'] );
        RoomType::create( ['name' => 'Toilet'] );
    }

}
