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
use \Session;

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
        //$building->abbrevation = $formData['abbrevation'];
        $building->phase_id = $formData['phase_id'];
        $building->no_of_floors = $formData['no_of_floors'];
        $building->has_master = $formData['has_master'];
        $building->floors = [];
        $building->building_master = [];
        $building->breakpoints = [];
        $building->save();
        
        Session::flash('success_message','Building Successfully Created');
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
        if($building==null)
            abort(404);
        $floorLayouts = $project->floorLayout()->get();
        $buildingMaster = $building->building_master;
        $svgImages = [];
        
        if(!empty($buildingMaster))
        { 
            ksort($buildingMaster);
            foreach ($buildingMaster as $key => $images) {
                    if (is_numeric($images)) {
                        $imageName = Media::find($images)->image_name;
                        $svgImages[$key] = ["ID"=>$images,"NAME"=>$imageName, "IMAGE"=> url() . "/projects/" . $projectId . "/buildings/". $buildingId ."/" . $imageName]; 
                    }
                    else
                        $svgImages[$key]['ID'] = $images;
            }
        }
        
        $phases = $project->projectPhase()->where('status','not_live')->get()->toArray(); 
        $isBuildingPhaseInPhases =[];
        foreach ($phases as $key => $phase) {
            if($phase['id'] == $building->phase_id)
            {    
                $isBuildingPhaseInPhases[] =$building->phase_id;
            }

        }
        
        if(empty($isBuildingPhaseInPhases))
            $phases[]= $project->projectPhase()->where('id',$building->phase_id)->first()->toArray();
        
        $disabled =(!hasPermission($project['id'],['configure_building']))?'disabled':'';
        return view( 'admin.project.building.edit' )
                        ->with( 'project', $project->toArray() )
                        ->with( 'current', 'building' )
                        ->with( 'phases', $phases )
                        ->with( 'building', $building )
                        ->with( 'floorLayouts', $floorLayouts )
                         ->with('disabled', $disabled)
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
        //$building->abbrevation = $formData['abbrevation'];
        $building->phase_id = $formData['phase_id'];
        $building->no_of_floors = $formData['no_of_floors'];
        $building->has_master = $formData['has_master'];
        $building->save();
        Session::flash('success_message','Building Successfully Updated');
        
        return redirect( url( 'admin/project/' . $projectId . '/building/' . $building->id . '/edit' ) );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy( $projectId, $id ) { 
        $building = Building::find( $id ); 
        $buildingUnits = $building->projectUnits()->get()->toArray(); 
         
        $msg ='';
        if(!empty($buildingUnits))
        {
            $msg ='Units associated to this building';
            $code = '200';
        }
        else{
            
            $building->delete();
            $code = '204';

            $msg ='Building deleted successfully';
            
        }
        
        return response()->json( [
                    'code' => 'building_deleted',
                    'message' => $msg,
         
                        ], $code );
    }
    
    public function validateBuildingName(Request $request) {
        $name = $request->input('name');
        $projectId = $request->input('project_id');
        $building_id = $request->input('building_id');
        $project = Project::find( $projectId );
        $phases =  $project->projectPhase()->get()->toArray();
        $phaseIds =[];
        foreach($phases as $phase)
        {
            $phaseIds[]=$phase['id'];
        }
        
        $msg = '';
        $flag = true;

        if ($building_id)
            $buildingData = Building::whereIn('phase_id',$phaseIds)->where('building_name', $name)->where('id', '!=', $building_id)->get()->toArray();
        else
            $buildingData = Building::whereIn('phase_id',$phaseIds)->where('building_name', $name)->get()->toArray();


        if (!empty($buildingData)) {
            $msg = 'Building Name Already Taken';
            $flag = false;
        }


        return response()->json([
                    'code' => 'building_name_validation',
                    'message' => $msg,
                    'data' => $flag,
                        ], 200);
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
