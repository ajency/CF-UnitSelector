<?php

namespace CommonFloor\Gateways;

use CommonFloor\Repositories\ProjectRepositoryInterface;

/**
 * Description of ProjectGateway
 *
 * @author surajair
 */
class ProjectGateway implements ProjectGatewayInterface{

    private $projectRepository;

    public function __construct(ProjectRepositoryInterface $projectRepository) {
        $this->projectRepository = $projectRepository;
    }

    public function getProjectStepOneDetails( $projectId ) {
        $faker = \Faker\Factory::create();
        $project = $this->projectRepository->getProjectById($projectId);
        $projectData = [
            'cf_project_id' => $project->cf_project_id,
            'id' => $project->id,
            'project_title' => $project->project_title,
            'logo' => $faker->imageUrl( 100, 100, 'city' ),
            'step_one' => [
                'svg' => $project->getGoogleEarthSvgPath()
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
            'project_status' => $project->getCFProjectStatus()
        ];
        return $projectData;
    }

    public function getProjectStepTwoDetails( $projectId ) {
        
    }

}
