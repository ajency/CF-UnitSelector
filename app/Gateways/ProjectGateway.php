<?php

namespace CommonFloor\Gateways;

use CommonFloor\Repositories\ProjectRepositoryInterface;
use CommonFloor\ProjectPropertyType;
use CommonFloor\UnitType;
use CommonFloor\Defaults;
use CommonFloor\Http\Controllers\Admin\SvgController;

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
        
        $projectPropertyTypes = \CommonFloor\Project::find($projectId)->projectPropertyTypes()->get()->toArray();
        $propertyTypes =[];
        foreach($projectPropertyTypes as $projectPropertyType)
        {
            $propertyTypes[$projectPropertyType['property_type_id']] =get_property_type( $projectPropertyType['property_type_id'] );
        }
        $filters = $project->projectMeta()->where( 'meta_key', 'filters' )->first()->meta_value;
         
        $projectData = [
            'cf_project_id' => $project->cf_project_id,
            'id' => $project->id,
            'project_title' => $project->project_title,
            'logo' => $project->projectMeta()->where( 'meta_key', 'project_image' )->first()->meta_value,
            'step_one' => [
                'svg' => $project->getGoogleEarthSvgPath()
            ],
            'project_master' => $project->getProjectMasterImages(),
            'breakpoints' => $project->getProjectMasterBreakPoints(),
            'top_view' => [
                'svg' => $faker->imageUrl( 1300, 800, 'city' ),
                'image' => $faker->imageUrl( 1300, 800, 'city' )
            ],
            'address' => $project->project_address,
            'measurement_units' => $project->measurement_units,
            'project_status' => $project->getCFProjectStatus(),
            'property_types' => $propertyTypes,
            'project_property_types' => $this->propertyTypeUnits($projectId),
            'filters' =>  unserialize($filters)

        ];
      
        return $projectData;
    }

    public function getProjectStepTwoDetails( $projectId ) {

        $projectPropertyTypes = \CommonFloor\Project::find($projectId)->projectPropertyTypes()->get()->toArray();
        $projectPropertyTypeIds =[];
        $propertyTypes =[];
        foreach($projectPropertyTypes as $projectPropertyType)
        {
            $propertTypename = property_type_slug(get_property_type( $projectPropertyType['property_type_id'] ));
            $projectPropertyTypeIds [$propertTypename] = $projectPropertyType['id'];
            $propertyTypes[$projectPropertyType['id']] =get_property_type( $projectPropertyType['property_type_id'] );
        }
      
        $unitTypes = \CommonFloor\UnitType::whereIn( 'project_property_type_id', $projectPropertyTypeIds )->get();
        $unitTypeArr = [];
        $unitTypeIds = [];
        $units = [];
       
        foreach ($unitTypes as $unitType) {
            $projectPropertyTypekey = array_search( $unitType->project_property_type_id , $projectPropertyTypeIds);
            $unitTypeIds[$projectPropertyTypekey][] = $unitType->id;
            $unitTypeName = Defaults::find($unitType->unittype_name)->label;
            $unitTypeArr[] = array('id' => $unitType->id ,'name'=> $unitTypeName ,'property_type_id'=> $unitType->project_property_type_id);   
        }
       
       $project = $this->projectRepository->getProjectById( $projectId );
       $phases = $project->projectPhase()->lists( 'id' );
       $buildings = \CommonFloor\Building::whereIn( 'phase_id', $phases )->get();
       $buildingIds = [];
       foreach($buildings as $building)
       {
         $buildingIds[] =$building->id;  
       }  
      $apartmentunits = \CommonFloor\Unit::whereIn('building_id', $buildingIds)->get()->toArray(); 
      $variantIds = $bunglowVariantData = $appartmentVariantData =$plotVariantData= $penthouseVariantData =[];

        foreach ($unitTypeIds as $key => $unitTypeId)
        {
            if($key=='bunglow')
            {
              $bunglowVariants = \CommonFloor\UnitVariant::whereIn( 'unit_type_id', $unitTypeIds['bunglow'] )->get();  
              foreach ($bunglowVariants as $bunglowVariant) {
                        $variantIds[] += $bunglowVariant->id;
                    }
                $bunglowVariantData =$bunglowVariants->toArray();   
            }
            elseif($key=='apartment')
            {
                $appartmentVariantData =\CommonFloor\UnitVariant::whereIn( 'unit_type_id', $unitTypeIds['apartment'] )->get()->toArray();   
            }
            elseif($key=='penthouse')
            {
                $penthouseVariantData =\CommonFloor\UnitVariant::whereIn( 'unit_type_id', $unitTypeIds['penthouse'] )->get()->toArray();   
            }
            elseif($key=='plot')
            {
                $plotVariants =\CommonFloor\UnitVariant::whereIn( 'unit_type_id', $unitTypeIds['plot'] )->get();
                foreach ($plotVariants as $plotVariant) {
                        $variantIds[] += $plotVariant->id;
                    }
                $plotVariantData =$plotVariants->toArray(); 
                
            }
        }
     $appartmentVariantData = array_merge($appartmentVariantData,$penthouseVariantData);   
     $units = \CommonFloor\Unit::whereIn('unit_variant_id', $variantIds)->get()->toArray();
     $units = array_merge($units,$apartmentunits);
     $unitData = [];
     foreach ($units as $unit)
     {
        $unit['direction'] = ($unit['direction'])?Defaults::find($unit['direction'])->label:'';
        $unit['views'] = array_values($unit['views']);
		$unitBreakpoint = SvgController :: get_primary_breakpoints($unit['id']);
        $unit['breakpoint'] = $unitBreakpoint[0]['primary_breakpoint'];
        unset ($unit['availability']);
         $unitData[]=$unit;
     }
dd($unitData);
        $stepTwoData = [
            'buildings' => $buildings->toArray(),
            'bunglow_variants' => $bunglowVariantData,
            'apartment_variants' => $appartmentVariantData,
            'plot_variants' => $plotVariantData,
            'property_types' => $propertyTypes,
            'settings' => $this->projectSettings($projectId),
            'units' =>$unitData,
            'unit_types' => $unitTypeArr,
            'floor_layout' => \CommonFloor\FloorLayout::all()->toArray() 
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
            $data[$propertyTypeId]['unit_types'] = [];
            foreach ($unitTypes as $unitType) {
                $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
                $data[$propertyTypeId]['unit_types'][] = $unitTypeName;
            }
            $data[$propertyTypeId]['starting_area'] = $faker->randomNumber();
            $data[$propertyTypeId]['availability'] = [
                'sold' => $faker->randomDigit,
                'blocked' => $faker->randomDigit
            ];
            $data[$propertyTypeId]['starting_price'] = $faker->randomNumber();
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