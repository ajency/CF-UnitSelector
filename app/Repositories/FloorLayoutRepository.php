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
        $floorLayout->detailed_svg = 0;
        $floorLayout->basic_svg = 0;
        $floorLayout->project_id = $floorLayoutData['project_id'];

        $floorLayout->save();

        return $floorLayout;
    }
    
    public function updateFloorLayout($floorLayoutId, $floorLayoutData ) {

        if (!isset( $floorLayoutData['layout_name'] ))
            throw new Exception( 'Layout name missing' );

        $floorLayout =  FloorLayout::find($floorLayoutId);
        $floorLayout->layout_name = $floorLayoutData['layout_name'];
        $floorLayout->no_of_flats = $floorLayoutData['no_of_flats'];
        $floorLayout->save();

        return $floorLayout;
    }

}
