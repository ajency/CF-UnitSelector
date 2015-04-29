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
use CommonFloor\ProjectPropertyType;
use CommonFloor\UnitType;

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
        $floorLayouts = $project->floorLayout()->get();
        
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
        $propertyTypes = $project->projectPropertyTypes()->whereIn( 'property_type_id', [1,4] )->get()->toArray();
        $projectPropertyTypes = [];
        
        foreach($propertyTypes as $propertyType)
        {
            $projectPropertyTypes[]  = ['NAME'=>get_property_type($propertyType['property_type_id']),'ID'=>$propertyType['id']];
 
        } 
        
        return view( 'admin.project.floorlayout.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'projectPropertyTypes', $projectPropertyTypes )
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
        
        $formData['project_id'] = $projectId;
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
        $propertyTypes = $project->projectPropertyTypes()->whereIn( 'property_type_id', [1,4] )->get()->toArray();
        $projectPropertyTypes = [];
        $unitTypes =[];
        foreach($propertyTypes as $propertyType)
        {
            $projectPropertyTypes[]  = ['NAME'=>get_property_type($propertyType['property_type_id']),'ID'=>$propertyType['id']];
 
        } 
        
        $floorLayout = FloorLayout::find( $floorLayoutId );
        //$unitTypes = $project->getUnitTypesToArray( $floorLayout->project_property_type_id ); 
        $UnitTypeVariants = $unitTypesArr = $allUnitVariants= [];
       /* foreach($unitTypes as $unitType){
           // $allUnitVariants[$unitType['id']] = UnitVariant::where('unit_type_id', $unitType['id'])->get()->toArray();
            $unitTypesArr[$unitType['id']] = $unitType['unittype_name'];
        }*/

        
        $floorLayoutPositions = FloorLayoutPosition::where('floor_layout_id', $floorLayoutId)->get()->toArray();
        $formattedFloorLayoutPositions = $unitTypeIds=$propertyTypeIds=[];
        foreach ($floorLayoutPositions as $floorLayoutPosition){
            $formattedFloorLayoutPositions[$floorLayoutPosition['position']] = $floorLayoutPosition;
            $unitTypeId =UnitVariant::where('id',$floorLayoutPosition['unit_variant_id'])->pluck('unit_type_id');     
            $unitTypeIds[$floorLayoutPosition['position']]= $unitTypeId;
            $projectPropertyTypeId =UnitType::find($unitTypeId)->project_property_type_id;
            $propertyTypeIds[$floorLayoutPosition['position']]= $projectPropertyTypeId;
            $allUnitVariants[$unitTypeId]=UnitVariant::where('unit_type_id', $unitTypeId)->get()->toArray();
            $unitTypes[$projectPropertyTypeId] = UnitType::where('project_property_type_id', $projectPropertyTypeId)->get()->toArray();
        }
      
        return view( 'admin.project.floorlayout.edit' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'add-floor-layout' )
                        ->with( 'floorLayout', $floorLayout )
                        ->with( 'floorLayoutPositions', $formattedFloorLayoutPositions)
                        ->with( 'unitTypes', $unitTypes )
                        ->with( 'unitTypeIds', $unitTypeIds )
                         ->with( 'projectPropertyTypes', $projectPropertyTypes )
                        ->with( 'propertyTypeIds', $propertyTypeIds )
                        ->with( 'allUnitVariants', $allUnitVariants );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update( $projectId,$floorLayoutId, Request $request, FloorLayoutRepository $floorLayoutRepository) {
        $formData = $request->all();
        unset( $formData['_token'] );
        $floorLayout = $floorLayoutRepository->updateFloorLayout($floorLayoutId, $formData );
        
        return redirect( url( 'admin/project/' . $projectId . '/floor-layout/' . $floorLayoutId . '/edit' ) );
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
    
     public function  getUnitTypeVariant($project_id, $floorLayoutId, Request $request)
    {
        $unitTypeId = $request['unit_type_id'];
        $variants = UnitType::find($unitTypeId)->unitTypeVariant()->get()->toArray();
        $str ='';
        foreach ($variants as $variant)
        {
            $str .='<option value="'.$variant['id'].'">'.$variant['unit_variant_name'].'</option>';
        }
        
       return response()->json( [
            'code' => 'unittype_variants',
            'message' => '',
            'data' => $str
        ], 201 );
    }

}
