<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Building;
use CommonFloor\Phase;
use CommonFloor\FloorLayout;
use CommonFloor\Project;
use CommonFloor\Media;

class ProjectBuildingController extends Controller {

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
        $buildings = Building::all();
        return view( 'admin.project.building.list' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'buildings', $buildings )
                        ->with( 'current', '' );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
        $project = $this->projectRepository->getProjectById( $projectId );

        $phases = Phase::where( 'project_id', $projectId )->get();

        return view( 'admin.project.building.create' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'building' )
                        ->with( 'phases', $phases );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store( $projectId, Request $request ) {
        $formData = $request->all();
        $building = new Building;
        $building->building_name = $formData['building_name'];
        $building->phase_id = $formData['phase_id'];
        $building->no_of_floors = $formData['no_of_floors'];
        $building->floors = [];
        $building->building_master = [
            'front' => '',
            'left' => '',
            'back' => '',
            'right' => '',
            'front-left' => [],
            'left-back' => [],
            'back-right' => [],
            'right-front' => []
        ];
        $building->save();
        return redirect( url( 'admin/project/' . $projectId . '/building/' . $building->id . '/edit' ) );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show( $id ) {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit( $projectId, $buildingId ) {
        $project = Project::find( $projectId );

        $phases = Phase::where( 'project_id', $projectId )->get();

        $building = Building::find( $buildingId );
        $floorLayouts = FloorLayout::where( 'project_property_type_id', $project->getProjectPropertyTypeId( 1 ) )->get();
        $svgImages = [];
            
        foreach ($building->building_master as $key => $images) {
            if (is_array($images)) {
                $transitionImages = [];
                foreach ($images as $image) {
                    $imageName = Media::find($image)->image_name;
                    $transitionImages[] =["ID"=>$image, "IMAGE"=> url() . "/projects/" . $projectId . "/buildings/". $buildingId ."/" . $imageName];
                }
                $svgImages['building'][$key] = $transitionImages;
            } else {
                if (is_numeric($images)) {
                    $imageName = Media::find($images)->image_name;
                    $svgImages['building'][$key] = ["ID"=>$images, "IMAGE"=> url() . "/projects/" . $projectId . "/buildings/". $buildingId ."/" . $imageName]; 
                }
            }
        }
            
        return view( 'admin.project.building.edit' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'building' )
                        ->with( 'phases', $phases )
                        ->with( 'building', $building )
                        ->with( 'floorLayouts', $floorLayouts )
                        ->with( 'svgImages', $svgImages );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update( $projectId, $buildingId, Request $request ) {

        $updateSection = $request->get( 'update_section' );
        $building = Building::find( $buildingId );

        switch ($updateSection) {
            case 'building':
                $building->building_name = $request->get( 'building_name' );
                $building->phase_id = $request->get( 'phase_id' );
                $building->no_of_floors = $request->get( 'no_of_floors' );
                break;
            case 'floors':
                $building->floors = $request->get( 'floors' );
                break;
            case 'builing_master':
                $building->building_master = $request->get( 'building_master' );
                break;
            default:
                break;
        }
        
        $building->save();
        return response()->json( [
                            'code' => 'building_updated',
                            'message' => 'Builing details updated successfully',
                            'data' => ''
                        ], 203 );
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
    
    public function getPositions($project_id, $buildingId, Request $request)
    {  
        $floor = $request['floor']; 
        $floorlayoutIds = Building::find($buildingId)->floors;
        $floorlayoutId = $floorlayoutIds[$floor];
        $position = FloorLayout::find($floorlayoutId)->no_of_flats; 
        
        return response()->json( [
            'code' => 'layout_position',
            'message' => 'Layout Positions',
            'data' => $position
        ], 203 );
    }

}
