<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Project;
use CommonFloor\FloorLayout;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Repositories\FloorLayoutRepository;
use CommonFloor\UnitVariant;
use CommonFloor\FloorLayoutPosition;

class ProjectFloorLayoutController extends Controller {

    private $projectRepository;

    public function __construct( ProjectRepository $projectRepository ) {
        $this->projectRepository = $projectRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index( $projectId ) {
        $project = $this->projectRepository->getProjectById( $projectId );
        $floorLayouts = FloorLayout::all();
        return view( 'admin.project.floorlayout.list' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'list-floor-layout' )
                        ->with( 'floorLayouts', $floorLayouts );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
        $project = $this->projectRepository->getProjectById( $projectId );
        return view( 'admin.project.floorlayout.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'add-floor-layout' );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( $projectId, Request $request, FloorLayoutRepository $floorLayoutRepository ) {
        $formData = $request->all();
        unset( $formData['_token'] );

        $project = Project::find( $projectId );
        $projectPropertyTypeId = $project->getProjectPropertyTypeId( 1 ); // 1 is property type apartment

        $formData['project_property_type_id'] = $projectPropertyTypeId;
        $floorLayout = $floorLayoutRepository->createFloorLayout( $formData );
        return redirect( url( 'admin/project/' . $projectId . '/floor-layout/' . $floorLayout->id . '/edit' ) );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $id ) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit( $projectId, $floorLayoutId ) {
        $project = $this->projectRepository->getProjectById( $projectId );
        $projectPropertyTypeId = $project->getProjectPropertyTypeId(1);
        $unitTypes = $project->getUnitTypesToArray( $projectPropertyTypeId );
        $floorLayout = FloorLayout::find( $floorLayoutId );
        $allUnitVariants = [];
        foreach($unitTypes as $unitType){
            $allUnitVariants[$unitType['id']] = UnitVariant::where('unit_type_id', $unitType['id'])->get()->toArray();
        }
        
        $floorLayoutPositions = FloorLayoutPosition::where('floor_layout_id', $floorLayoutId)->get()->toArray();
        $formattedFloorLayoutPositions = [];
        foreach ($floorLayoutPositions as $floorLayoutPosition){
            $formattedFloorLayoutPositions[$floorLayoutPosition['position']] = $floorLayoutPosition;
        }
        return view( 'admin.project.floorlayout.edit' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'add-floor-layout' )
                        ->with( 'floorLayout', $floorLayout )
                        ->with( 'floorLayoutPositions', $formattedFloorLayoutPositions)
                        ->with( 'unitTypes', $unitTypes )
                        ->with( 'allUnitVariants', $allUnitVariants );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update( $id ) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy( $id ) {
        //
    }

}
