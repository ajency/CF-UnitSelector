<?php

namespace CommonFloor\Gateways;

use CommonFloor\Repositories\ProjectRepositoryInterface;
use CommonFloor\ProjectPropertyType;
use CommonFloor\UnitType;

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
            'logo' => $project->projectMeta()->where( 'meta_key', 'project_image' )->first()->meta_value,
            'step_one' => [
                'svg' => $project->getGoogleEarthSvgPath()
            ],
            'project_master' => $project->getProjectMasterImages(),
            'top_view' => [
                'svg' => $faker->imageUrl( 1300, 800, 'city' ),
                'image' => $faker->imageUrl( 1300, 800, 'city' )
            ],
            'address' => $project->project_address,
            'project_status' => $project->getCFProjectStatus(),
            'project_property_types' => $this->propertyTypeUnits($projectId),
            

            'property_types' => $this->propertyTypeUnits( $projectId ),
            'project_property_types' => $this->propertyTypeUnits( $projectId ),
            'project_settings' => $this->projectSettings( $projectId )

        ];
        return $projectData;
    }

    public function getProjectStepTwoDetails( $projectId ) {

        $projectPropertyType = \CommonFloor\ProjectPropertyType::where( 'project_id', $projectId )
                        ->where( 'property_type_id', 2 )->get()->first();

        $unitTypes = \CommonFloor\UnitType::where( 'project_property_type_id', $projectPropertyType->id )->get();
        $unitTypeArr = [];
        $unitTypeIds = [];
        foreach ($unitTypes as $unitType) {
            $unitTypeIds[] = $unitType->id;
            $unitTypeArr[] = array('id' => $unitType->id ,'name'=> $unitType->unittype_name );
            
        }
        
        $bunglowVariants = \CommonFloor\UnitVariant::whereIn( 'unit_type_id', $unitTypeIds )->get();
        $bunglowVariantIds = [];
        foreach ($bunglowVariants as $bunglowVariant) {
            $bunglowVariantIds[] = $bunglowVariant->id;
        }
        
        $buildings = \CommonFloor\Building::all()->toArray();

        $stepTwoData = [
            'buildings' => $buildings,
            'bunglow_variants' => $bunglowVariants->toArray(),
            'apartment_variants' => [],
            'plot_variants' => [],
            'settings' => $this->projectSettings($projectId),
            'units' => \CommonFloor\Unit::whereIn('unit_variant_id', $bunglowVariantIds)->get()->toArray(),

            'settings' => [],
            'units' => \CommonFloor\Unit::whereIn( 'unit_variant_id', $bunglowVariantIds )->get()->toArray(),
            'unit_types' => $unitTypeArr,
            'floor_layout' => []
        ];

        return $stepTwoData;
    }

    public function propertyTypeUnits( $projectId ) {
        $project = $this->projectRepository->getProjectById( $projectId );
        $projectPropertyTypes = $project->projectPropertyTypes()->get()->toArray();
        $data = [];

        foreach ($projectPropertyTypes as $propertyType) {
            $faker = \Faker\Factory::create();
            $propertyTypeId = $propertyType['property_type_id'];
            $projectpropertyTypeId = $propertyType['id'];
            $propertyTypeName = property_type_slug( get_property_type( $propertyTypeId ) );
            $unitTypes = ProjectPropertyType::find( $projectpropertyTypeId )->projectUnitType()->get()->toArray();
            $data[$propertyTypeName]['unit_types'] = [];
            foreach ($unitTypes as $unitType) {
                $data[$propertyTypeName]['unit_types'][] = $unitType['unittype_name'];
            }
            $data[$propertyTypeName]['starting_area'] = $faker->randomNumber();
            $data[$propertyTypeName]['availability'] = [
                'sold' => $faker->randomDigit,
                'blocked' => $faker->randomDigit
            ];
            $data[$propertyTypeName]['starting_price'] = $faker->randomNumber();
        }


        return $data;
    }

    public function projectSettings( $projectId ) {
        $data = [];
        $project = $this->projectRepository->getProjectById( $projectId );
        $phases = $project->projectPhase()->get()->toArray();
        $projectMeta = $project->projectMeta()->get()->toArray();

        foreach ($phases as $phase) {
            $data['phases'][] = ['phase_id' => $phase['id'], 'phase_name' => $phase['phase_name']];
        }
        $data['floor_rise'] = $projectMeta[0]['meta_value'];
        $data['stamp_duty'] = $projectMeta[1]['meta_value'];
        $data['registration_amount'] = $projectMeta[3]['meta_value'];
        $data['vat'] = $projectMeta[4]['meta_value'];
        $data['service_tax_low'] = $projectMeta[5]['meta_value'];
        $data['service_tax_high'] = $projectMeta[5]['meta_value'];
        $data['infrastructure_charges'] = $projectMeta[6]['meta_value'];
        $data['membership_fees'] = $projectMeta[7]['meta_value'];

        return $data;
    }
}