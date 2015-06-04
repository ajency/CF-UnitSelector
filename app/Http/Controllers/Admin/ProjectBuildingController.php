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
        
        $phases = $project->projectPhase()->lists( 'id' );
        $buildings = Building::whereIn( 'phase_id', $phases )->get();
            
        return view( 'admin.project.building.list' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'buildings', $buildings )
                        ->with( 'current', 'building' );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create( $projectId ) {
        
        $project = $this->projectRepository->getProjectById( $projectId );

        $phases = $project->projectPhase()->where('status','not_live')->get()->toArray(); 
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
        $building->building_name = ucfirst($formData['building_name']);
        $building->abbrevation = $formData['abbrevation'];
        $building->phase_id = $formData['phase_id'];
        $building->no_of_floors = $formData['no_of_floors'];
        $building->has_master = $formData['has_master'];
        $building->floors = [];
        $building->building_master = [];
        $building->breakpoints = [];
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
        $building = Building::find( $buildingId );
        $floorLayouts = $project->floorLayout()->get();
        $svgImages = [];
            
        foreach ($building->building_master as $key => $images) {
                if (is_numeric($images)) {
                    $imageName = Media::find($images)->image_name;
                    $svgImages[$key] = ["ID"=>$images,"NAME"=>$imageName, "IMAGE"=> url() . "/projects/" . $projectId . "/buildings/". $buildingId ."/" . $imageName]; 
                }
                else
                    $svgImages[$key]['ID'] = $images;
        }
        
        $phases = $project->projectPhase()->where('status','not_live')->get()->toArray();
        foreach ($phases as $key => $phase) {
            if($phase['id'] != $building->phase_id)
            {   
               $phases[]= $project->projectPhase()->where('id',$building->phase_id)->first()->toArray();
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
            
         
        
        $formData = $request->all();
        $building = Building::find( $buildingId );
        $building->building_name = ucfirst($formData['building_name']);
        $building->abbrevation = $formData['abbrevation'];
        $building->phase_id = $formData['phase_id'];
        $building->no_of_floors = $formData['no_of_floors'];
        $building->has_master = $formData['has_master'];
        $building->save();
        
        return redirect( url( 'admin/project/' . $projectId . '/building/' . $building->id . '/edit' ) );
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
            'message' => '',
            'data' => $position
        ], 201 );
    }

}
