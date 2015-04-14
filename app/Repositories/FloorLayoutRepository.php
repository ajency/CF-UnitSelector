<?php

namespace CommonFloor\Repositories;

use CommonFloor\FloorLayout;

/**
 * Description of FloorLayoutRepository
 *
 * @author surajair
 */
class FloorLayoutRepository {

    public function createFloorLayout( $floorLayoutData ) {

        if (!isset( $floorLayoutData['layout_name'] ))
            throw new Exception( 'Layout name missing' );

        $floorLayout = new FloorLayout();
        $floorLayout->layout_name = $floorLayoutData['layout_name'];
        $floorLayout->no_of_flats = $floorLayoutData['no_of_flats'];
        $floorLayout->detailed_svg = $floorLayoutData['detailed_svg'];
        $floorLayout->basic_svg = $floorLayoutData['basic_svg'];
        $floorLayout->project_property_type_id = $floorLayoutData['project_property_type_id'];

        $floorLayout->save();

        return $floorLayout;
    }

}
