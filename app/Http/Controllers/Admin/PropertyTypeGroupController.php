<?php namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;

use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\PropertyTypeGroup;
use CommonFloor\Phase;
use CommonFloor\FloorLayout;
use CommonFloor\Project;
use CommonFloor\Media;
use \Session;

class PropertyTypeGroupController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */

	private $projectRepository;

  public function __construct( ProjectRepository $projectRepository ) {
      $this->projectRepository = $projectRepository;
          
  }

	public function index( $projectId ,$projectPropertyTypeId ) {
      $project = $this->projectRepository->getProjectById( $projectId );
      
      $propertyTypeId = \CommonFloor\ProjectPropertyType::find( $projectPropertyTypeId )->property_type_id;
      $phases = $project->projectPhase()->lists( 'id' );
      $groups = PropertyTypeGroup::whereIn( 'phase_id', $phases )->where('project_property_type_id',$projectPropertyTypeId)->get();
  		$current = property_type_slug(get_property_type( $propertyTypeId )).'group';
      return view( 'admin.project.group.list' )
                      ->with( 'project', $project->toArray() )
                      ->with( 'projectPropertyTypeId', $projectPropertyTypeId )
                      ->with( 'propertyTypeId', $propertyTypeId )
                      ->with( 'groups', $groups )
                      ->with( 'current', $current );
    }

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create($projectId ,$projectPropertyTypeId)
	{
		$project = $this->projectRepository->getProjectById( $projectId );
		$propertyTypeId = \CommonFloor\ProjectPropertyType::find( $projectPropertyTypeId )->property_type_id;
    $phases = $project->projectPhase()->where('status','not_live')->get()->toArray(); 
    $current = property_type_slug(get_property_type( $propertyTypeId )).'group';
    return view( 'admin.project.group.create' )
                    ->with( 'project', $project->toArray() )
                    ->with( 'projectPropertyTypeId', $projectPropertyTypeId )
                    ->with( 'propertyTypeId', $propertyTypeId )
                    ->with( 'current', $current )
                    ->with( 'phases', $phases );
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store( $projectId,$projectPropertyTypeId, Request $request ) {
            
      $formData = $request->all();
      $group = new PropertyTypeGroup;
      $group->property_type_group_name = ucfirst($formData['group_name']);
      $group->project_property_type_id = $projectPropertyTypeId;
      $group->phase_id = $formData['phase_id'];
      $group->has_master = $formData['has_master'];
      $group->group_master = serialize( [] );
      $group->breakpoints = serialize( [] );
      $group->save();

      $propertyTypeId = \CommonFloor\ProjectPropertyType::find( $projectPropertyTypeId )->property_type_id;
      $groupName = property_type_slug(get_property_type( $propertyTypeId )).'group';
      Session::flash('success_message',$groupName.' Successfully Created');
      return redirect( url( 'admin/project/'.$projectId.'/'.property_type_slug(get_property_type($propertyTypeId)).'/'.$projectPropertyTypeId .'/group/'.$group->id . '/edit' ) );
  }


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit( $projectId,$projectPropertyTypeId, $groupId ) {
  
      $project = Project::find( $projectId );
      $propertyTypeId = \CommonFloor\ProjectPropertyType::find( $projectPropertyTypeId )->property_type_id;
      $group = PropertyTypeGroup::find( $groupId );
      if($group==null)
          abort(404);
    
      $groupMaster = $group->group_master;
      $svgImages = [];
      
      if(!empty($groupMaster))
      { 
          ksort($groupMaster);
          foreach ($groupMaster as $key => $images) {
                  if (is_numeric($images)) {
                      $imageName = Media::find($images)->image_name;
                      $svgImages[$key] = ["ID"=>$images,"NAME"=>$imageName, "IMAGE"=> url() . "/projects/" . $projectId . "/group/". $groupId ."/" . $imageName]; 
                  }
                  else
                      $svgImages[$key]['ID'] = $images;
          }
      }
      
      $phases = $project->projectPhase()->where('status','not_live')->get()->toArray(); 
      $isGroupPhaseInPhases =[];
      foreach ($phases as $key => $phase) {
          if($phase['id'] == $group->phase_id)
          {    
              $isGroupPhaseInPhases[] =$group->phase_id;
          }

      }
      
      if(empty($isGroupPhaseInPhases))
          $phases[]= $project->projectPhase()->where('id',$group->phase_id)->first()->toArray();
      
      $disabled =(!hasPermission($project['id'],['configure_project']))?'disabled':'';

      $current = property_type_slug(get_property_type( $propertyTypeId )).'group';
      return view( 'admin.project.group.edit' )
                      ->with( 'project', $project->toArray() )
                      ->with( 'current', $current )
                      ->with( 'phases', $phases )
                      ->with( 'group', $group )
                       ->with('disabled', $disabled)
                      ->with( 'svgImages', $svgImages );
    }

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
