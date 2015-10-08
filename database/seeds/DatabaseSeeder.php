<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use CommonFloor\User;
use CommonFloor\Defaults;
use CommonFloor\Role;
use CommonFloor\UserRole;
use CommonFloor\UserProject;
use CommonFloor\Permission;

class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        Model::unguard();

        $this->call( 'PropertyTypeTableSeeder' );
        $this->command->info( " Property Type Table Seeded! " );

        $this->call( 'UnitTypeTableSeeder' );
        $this->command->info( " Unit Type Table Seeded! " );
        
        $this->call( 'RoomTypeTableSeeder' );
        $this->command->info( " Room Type Table Seeded! " );

        $this->call( 'DirectionSeeder' );
        $this->command->info( " Direction Seeded! " );

        $this->call( 'UserTableSeeder' );
        $this->command->info( " User Table Seeded! " );

        $this->call( 'RoleTableSeeder' );
        $this->command->info( " Role Table Seeded! " );
 
    }

}

class RoleTableSeeder extends Seeder {

    public function run() {
        Role::create( [
            'name' => 'admin',
            'display_name' => 'Admin',
            'project_access' => 'all',
            'is_agent' => 'no'
        ] );
    }

}

class UserTableSeeder extends Seeder {

    public function run() {
        User::create( [
            'name' => 'Super Admin',
            'email' => 'admin@cf.com',
            'password' => Hash::make( 'admin' )
        ] );
        
        UserRole::create( [
            'user_id' => '1',
            'role_id' => '1'

        ]);
        
        $allPermission =[];
        $permissions = Permission::all(['id'])->toArray();
       
        if (!empty($permissions)) {
           $role = Role::find('1');
           $role->attachPermissions($permissions);
        
        }
        
        UserProject::create( [
            'role_user_id' => '1',
            'project_id' => '0'
        ]);
    }

}

class PropertyTypeTableSeeder extends Seeder {

    public function run() {
        Defaults::create( ['type' => 'property_types','label'=>"Villas/Bungalows",'serialize_data'=>  serialize([])]);
        Defaults::create( ['type' => 'property_types','label'=>"Plots",'serialize_data'=>  serialize([])]);
        Defaults::create(['type' => 'property_types','label'=>"Apartments",'serialize_data'=> serialize([])]);
        Defaults::create( ['type' => 'property_types','label'=>"Penthouses",'serialize_data'=>  serialize([])]);   
    }

}

class UnitTypeTableSeeder extends Seeder {

    public function run() {
       Defaults::create(['type' => 'appartment_unit_types','label'=>"1BHK",'serialize_data'=> serialize([])]);
       Defaults::create( ['type' => 'appartment_unit_types','label'=>"1.5BHK",'serialize_data'=>  serialize([])]);
       Defaults::create( ['type' => 'appartment_unit_types','label'=>"2BHK",'serialize_data'=>  serialize([])]);
       Defaults::create( ['type' => 'appartment_unit_types','label'=>"2.5BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'appartment_unit_types','label'=>"3BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'appartment_unit_types','label'=>"3.5BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'appartment_unit_types','label'=>"4BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'appartment_unit_types','label'=>"4.5BHK",'serialize_data'=>  serialize([])]);
       
       Defaults::create(['type' => 'villa_unit_types','label'=>"1BHK",'serialize_data'=> serialize([])]);
       Defaults::create( ['type' => 'villa_unit_types','label'=>"1.5BHK",'serialize_data'=>  serialize([])]);
       Defaults::create( ['type' => 'villa_unit_types','label'=>"2BHK",'serialize_data'=>  serialize([])]);
       Defaults::create( ['type' => 'villa_unit_types','label'=>"2.5BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'villa_unit_types','label'=>"3BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'villa_unit_types','label'=>"3.5BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'villa_unit_types','label'=>"4BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'villa_unit_types','label'=>"4.5BHK",'serialize_data'=>  serialize([])]);
       
       Defaults::create(['type' => 'penthouse_unit_types','label'=>"1BHK",'serialize_data'=> serialize([])]);
       Defaults::create( ['type' => 'penthouse_unit_types','label'=>"1.5BHK",'serialize_data'=>  serialize([])]);
       Defaults::create( ['type' => 'penthouse_unit_types','label'=>"2BHK",'serialize_data'=>  serialize([])]);
       Defaults::create( ['type' => 'penthouse_unit_types','label'=>"2.5BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'penthouse_unit_types','label'=>"3BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'penthouse_unit_types','label'=>"3.5BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'penthouse_unit_types','label'=>"4BHK",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'penthouse_unit_types','label'=>"4.5BHK",'serialize_data'=>  serialize([])]);
       
       Defaults::create( ['type' => 'plot_unit_types','label'=>"30X40 SQ.FT",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'plot_unit_types','label'=>"30X50 SQ.FT",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'plot_unit_types','label'=>"40X60 SQ.FT",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'plot_unit_types','label'=>"40X70 SQ.FT",'serialize_data'=>  serialize([])]); 
       Defaults::create( ['type' => 'plot_unit_types','label'=>"60X40 SQ.FT",'serialize_data'=>  serialize([])]); 

    }

}

class RoomTypeTableSeeder extends Seeder {

    public function run() {
        Defaults::create( ['type' => 'room_types','label'=>"Balcony",'serialize_data'=>  serialize([])]);
        Defaults::create( ['type' => 'room_types','label'=>"Bedroom",'serialize_data'=>  serialize([])]);
        Defaults::create(['type' => 'room_types','label'=>"Covered Balcony",'serialize_data'=> serialize([])]);
        Defaults::create( ['type' => 'room_types','label'=>"Dining",'serialize_data'=>  serialize([])]);  
        Defaults::create( ['type' => 'room_types','label'=>"Dress",'serialize_data'=>  serialize([])]);
        Defaults::create( ['type' => 'room_types','label'=>"Foyer",'serialize_data'=>  serialize([])]);
        Defaults::create(['type' => 'room_types','label'=>"Kitchen",'serialize_data'=> serialize([])]);
        Defaults::create( ['type' => 'room_types','label'=>"Living",'serialize_data'=>  serialize([])]);   
        Defaults::create( ['type' => 'room_types','label'=>"Lounge",'serialize_data'=>  serialize([])]);
        Defaults::create( ['type' => 'room_types','label'=>"Master Bedroom",'serialize_data'=>  serialize([])]);
        Defaults::create(['type' => 'room_types','label'=>"Powder Room",'serialize_data'=> serialize([])]);
        Defaults::create( ['type' => 'room_types','label'=>"Toilet",'serialize_data'=>  serialize([])]);  
        Defaults::create( ['type' => 'room_types','label'=>"Utility",'serialize_data'=>  serialize([])]);

    }

}

class DirectionSeeder extends Seeder {

    public function run() {
        Defaults::create( ['type' => 'direction','label'=>"North",'serialize_data'=>  serialize([])]);
        Defaults::create( ['type' => 'direction','label'=>"South",'serialize_data'=>  serialize([])]);
        Defaults::create(['type' => 'direction','label'=>"East",'serialize_data'=> serialize([])]);
        Defaults::create( ['type' => 'direction','label'=>"West",'serialize_data'=>  serialize([])]);  
        Defaults::create( ['type' => 'direction','label'=>"Noth-East",'serialize_data'=>  serialize([])]);
        Defaults::create( ['type' => 'direction','label'=>"North-West",'serialize_data'=>  serialize([])]);
        Defaults::create(['type' => 'direction','label'=>"Soth-East",'serialize_data'=> serialize([])]);
        Defaults::create( ['type' => 'direction','label'=>"South-West",'serialize_data'=>  serialize([])]);   
        
    }

}
 