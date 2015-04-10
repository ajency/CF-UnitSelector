<?php

namespace CommonFloor\Gateways;

use CommonFloor\Repositories\ProjectRepositoryInterface;

/**
 * Description of ProjectGateway
 *
 * @author surajair
 */
class ProjectGateway implements ProjectGatewayInterface {

    private $projectRepository;

    public function __construct( ProjectRepositoryInterface $projectRepository ) {
        $this->projectRepository = $projectRepository;
    }

    public function getProjectStepOneDetails( $projectId ) {
        $faker = \Faker\Factory::create();
        $project = $this->projectRepository->getProjectById( $projectId );
        $projectData = [
            'cf_project_id' => $project->cf_project_id,
            'id' => $project->id,
            'project_title' => $project->project_title,
            'logo' => $project->projectMeta()->where('meta_key', 'project_image')->first()->meta_value,
            'step_one' => [
                'svg' => $project->getGoogleEarthSvgPath()
            ],
            'project_master' => [
                'svg_main' => [
                    'svg' => $project->getProjectMasterSvgPath(),
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
            'address' => $project->project_address,
            'project_status' => $project->getCFProjectStatus()
        ];
        return $projectData;
    }

    public function getProjectStepTwoDetails( $projectId ) {

        $projectPropertyType = \CommonFloor\ProjectPropertyType::where( 'project_id', $projectId )
                                        ->where( 'property_type_id', 2 )->get()->first();

        $unitTypes = \CommonFloor\UnitType::where( 'project_property_type_id', $projectPropertyType->id )->get();

        $unitTypeIds = [];
        foreach ($unitTypes as $unitType) {
            $unitTypeIds[] = $unitType->id;
        }

        $bunglowVariants = \CommonFloor\UnitVariant::whereIn( 'unit_type_id', $unitTypeIds )->get();
        $bunglowVariantIds = [];
        foreach ($bunglowVariants as $bunglowVariant){
            $bunglowVariantIds[] = $bunglowVariant->id;
        }

        $stepTwoData = [
            'buildings' => [],
            'bunglow_variants' => $bunglowVariants->toArray(),
            'apartment_variants' => [],
            'plot_variants' => [],
            'settings' => [],
            'units' => \CommonFloor\Unit::whereIn('unit_variant_id', $bunglowVariantIds)->get()->toArray(),
            'unit_types' => [],
            'floor_layout' => []
        ];

        return $stepTwoData;
    }

}
