<?php

namespace CommonFloor\Gateways;

/**
 * Description of ProjectGateway
 *
 * @author surajair
 */
class ProjectGateway implements ProjectGatewayInterface{
    
    public function getProjectStepOneDetails( $projectId ) {
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
            'property_types' => [
                'bunglows' => [
                    'unit_types' => [$faker->name],
                    'starting_area' => $faker->randomNumber(),
                    'availability' => [
                        'sold' => $faker->randomDigit,
                        'blocked' => $faker->randomDigit
                    ],
                    'starting_price' => $faker->randomNumber()
                ]
            ],
            'address' => $faker->address,
            'project_status' => 'Under Construction'
        ];
        return $projectData;
    }

    public function getProjectStepTwoDetails( $projectId ) {
        
    }

}
