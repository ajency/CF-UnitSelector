<?php

namespace CommonFloor\Http\Controllers\Rest;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Faker;

class ProjectController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $id ) {
        $faker = \Faker\Factory::create();
        $projectData = [
            'cf_project_id' => $faker->uuid,
            'id' => $faker->randomNumber(),
            'project_title' => $faker->streetName,
            'logo' => $faker->imageUrl( 100, 100, 'city' ),
            'step_one' => [
                'svg' => $faker->imageUrl( 1300, 800, 'city' )
            ],
            'project_master' => [
                'svg_main' => [
                    'svg' => $faker->imageUrl( 1300, 800, 'city' ),
                    'images' => [ $faker->imageUrl( 1300, 800, 'city' ), $faker->imageUrl( 1300, 800, 'city' )]
                ],
                'svg_left' => [
                    'svg' => $faker->imageUrl( 1300, 800, 'city' ),
                    'images' => [ $faker->imageUrl( 1300, 800, 'city' ), $faker->imageUrl( 1300, 800, 'city' )]
                ],
                'svg_back' => [
                    'svg' => $faker->imageUrl( 1300, 800, 'city' ),
                    'images' => [ $faker->imageUrl( 1300, 800, 'city' ), $faker->imageUrl( 1300, 800, 'city' )]
                ],
                'svg_right' => [
                    'svg' => $faker->imageUrl( 1300, 800, 'city' ),
                    'images' => [ $faker->imageUrl( 1300, 800, 'city' ), $faker->imageUrl( 1300, 800, 'city' )]
                ]
            ],
            'top_view' => [
                'svg' => $faker->imageUrl( 1300, 800, 'city' ),
                'image' => $faker->imageUrl( 1300, 800, 'city' )
            ],
            'property_types' => $faker->randomElements( ['Apartments', 'Bunglows', 'Land'], 2 )
        ];
        return response()->json( [
                    'data' => $projectData
                        ], 200 );
    }

}
