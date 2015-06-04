<?php

namespace CommonFloor\Http\Controllers\admin;

use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\Media;
use CommonFloor\ProjectMeta;
use CommonFloor\Defaults;
use CommonFloor\ProjectPropertyType;
use CommonFloor\Phase;
use CommonFloor\UnitVariant;
use CommonFloor\UnitType;
use CommonFloor\Building;
use \Input;
use CommonFloor\Http\Controllers\Admin\SvgController;


class ProjectController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {

        $projects = Project::orderBy('project_title')->get()->toArray();
        return view('admin.project.list')
                        ->with('projects', $projects)
                        ->with('menuFlag', FALSE);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {

        return view('admin.project.add')
                        ->with('menuFlag', FALSE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request, ProjectRepository $projectRepository) {
        $cfProjectId = $request->input('cf_project_id');
        $validatecfProjectId = Project::where('cf_project_id',$cfProjectId)->get()->toArray();
        if(!empty($validatecfProjectId))
        {
           return redirect("/admin/project/create?error=project_already_taken"); 
        }

        $project = $projectRepository->createProject($request->all());
        if ($project !== null) {
            return redirect("/admin/project/" . $project->id);
        }
    }

    public function show($id, ProjectRepository $projectRepository) {

        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->whereNotIn('meta_key', ['master', 'google_earth', 'skyview', 'breakpoints', 'cf'])->get()->toArray();
        $projectpropertyTypes = $project->projectPropertyTypes()->get()->toArray();
        $defaultunitTypes = get_all_unit_type();
        $projectAttributes = $project->attributes->toArray();
        $propertyTypes = $unitTypes = $projectunitTypes = $projectCost = $propertytypeAttributes = [];

        foreach ($projectpropertyTypes as $projectpropertyType) {
            $propertyTypes[$projectpropertyType['property_type_id']] = get_property_type($projectpropertyType['property_type_id']);
        }


        foreach ($projectMeta as $meta) {
            $projectCost[$meta['meta_key']] = ['ID' => $meta['id'], 'VALUE' => $meta['meta_value']];
        }


        foreach ($project->projectPropertyTypes as $projectPropertyType) {

            $unitTypes = $project->getUnitTypesToArray($projectPropertyType->id);
            foreach ($unitTypes as $unitType) {
                if (!isset($defaultunitTypes[$projectPropertyType->property_type_id][$unitType->unittype_name])) {
                    $projectDefaultUnitType = Defaults::find($unitType->unittype_name)->toArray();
                    $defaultunitTypes[$projectPropertyType->property_type_id][$projectDefaultUnitType['id']] = $projectDefaultUnitType['label'];
                }
            }
            $projectunitTypes[$projectPropertyType->property_type_id] = $unitTypes;

            $propertytypeAttributes[$projectPropertyType->property_type_id]['PROJECTPROPERTYTYPEID'] = $projectPropertyType->id;
            $propertytypeAttributes[$projectPropertyType->property_type_id]['ATTRIBUTES'] = ProjectPropertyType::find($projectPropertyType->id)->attributes->toArray();
        }


        return view('admin.project.readconfig')
                        ->with('project', $project->toArray())
                        ->with('projectCost', $projectCost)
                        ->with('propertyTypes', $propertyTypes)
                        ->with('defaultunitTypes', $defaultunitTypes)
                        ->with('unitTypes', $projectunitTypes)
                        ->with('propertytypeAttributes', $propertytypeAttributes)
                        ->with('projectAttributes', $projectAttributes)
                        ->with('current', 'settings');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id, ProjectRepository $projectRepository) {

        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->whereNotIn('meta_key', ['master', 'google_earth', 'skyview', 'breakpoints', 'cf'])->get()->toArray();
        $propertyTypes = get_all_property_type();
        $defaultunitTypes = get_all_unit_type();
        $unitTypes = $projectunitTypes = $projectCost = $propertytypeAttributes = [];
        $projectAttributes = $project->attributes->toArray();

        foreach ($projectMeta as $meta) {
            $projectCost[$meta['meta_key']] = ['ID' => $meta['id'], 'VALUE' => $meta['meta_value']];
        }


        foreach ($project->projectPropertyTypes as $projectPropertyType) {

            $unitTypes = $project->getUnitTypesToArray($projectPropertyType->id);
            foreach ($unitTypes as $unitType) {
                if (!isset($defaultunitTypes[$projectPropertyType->property_type_id][$unitType->unittype_name])) {
                    $projectDefaultUnitType = Defaults::find($unitType->unittype_name)->toArray();
                    $defaultunitTypes[$projectPropertyType->property_type_id][$projectDefaultUnitType['id']] = $projectDefaultUnitType['label'];
                }
            }
            $projectunitTypes[$projectPropertyType->property_type_id] = $unitTypes;

            $propertytypeAttributes[$projectPropertyType->property_type_id]['PROJECTPROPERTYTYPEID'] = $projectPropertyType->id;
            $propertytypeAttributes[$projectPropertyType->property_type_id]['ATTRIBUTES'] = ProjectPropertyType::find($projectPropertyType->id)->attributes->toArray();
        }

        return view('admin.project.settings')
                        ->with('project', $project->toArray())
                        ->with('projectCost', $projectCost)
                        ->with('propertyTypes', $propertyTypes)
                        ->with('defaultunitTypes', $defaultunitTypes)
                        ->with('unitTypes', $projectunitTypes)
                        ->with('propertytypeAttributes', $propertytypeAttributes)
                        ->with('projectAttributes', $projectAttributes)
                        ->with('current', 'settings');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request, ProjectRepository $projectRepository) {

        $project = $projectRepository->updateProject($id, $request->all());

        return redirect("/admin/project/" . $id . "/edit");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        //
    }

    public function cost($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->whereNotIn('meta_key', ['master', 'google_earth', 'skyview', 'breakpoints', 'cf'])->get()->toArray();
        $projectCost = [];

        foreach ($projectMeta as $meta) {
            $projectCost[$meta['meta_key']] = ['ID' => $meta['id'], 'VALUE' => $meta['meta_value']];
        }
        return view('admin.project.cost')
                        ->with('project', $project->toArray())
                        ->with('projectCost', $projectCost)
                        ->with('current', 'cost');
    }

    public function costUpdate($id, Request $request, ProjectRepository $projectRepository) {

        $projectCost = $request->all();

        foreach ($projectCost as $meta_key => $meta_value) {
            $keyArr = explode("_", $meta_key);
            $projectmetaId = $keyArr[0];

            $data = array("meta_value" => $meta_value);
            ProjectMeta::where('id', $projectmetaId)->update($data);
        }

        return redirect("/admin/project/" . $id . "/cost");
    }
    
     public function filters($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectpropertyTypes = $project->projectPropertyTypes()->get()->toArray();
        $projectMeta = $project->projectMeta()->where('meta_key', 'filters')->pluck('meta_value');
        $projectFilters = unserialize($projectMeta);
       $propertyTypes = $propertytypeAttributes=[];
        foreach ($projectpropertyTypes as $projectpropertyType) {
            $propertyTypes[$projectpropertyType['property_type_id']] = get_property_type($projectpropertyType['property_type_id']);
            $propertytypeAttributes[$projectpropertyType['property_type_id']] = ProjectPropertyType::find($projectpropertyType['id'])->attributes->toArray();
            
        }
        $propertyTypeName = [BUNGLOWID=>"Villa",PLOTID=>"Plot",APARTMENTID=>"Apartment",PENTHOUSEID=>"Penthouse"];
 
        return view('admin.project.filters')
                        ->with('project', $project->toArray())
                        ->with('propertyTypes', $propertyTypes)
                        ->with('projectFilters', $projectFilters)
                        ->with('propertyTypeName', $propertyTypeName)
                        ->with('propertytypeAttributes', $propertytypeAttributes)
                        ->with('current', 'filters');
    }

    public function updateFilters($id, Request $request, ProjectRepository $projectRepository) {
        
        $projectFilters = serialize($request->all());

        $data = array("meta_value" => $projectFilters);
        ProjectMeta:: where(['meta_key'=> 'filters','project_id'=> $id])->update($data);

        return redirect("/admin/project/" . $id . "/filters");
    }

    public function svg($id, ProjectRepository $projectRepository) {

        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->whereIn('meta_key', ['master', 'google_earth', 'skyview', 'breakpoints'])->get()->toArray();
        $svgImages = [];

        foreach ($projectMeta as $metaValues) {

            if ('master' === $metaValues['meta_key']) {
                $masterImages = unserialize($metaValues['meta_value']);

                if (!empty($masterImages)) {
                    ksort($masterImages);
                    foreach ($masterImages as $key => $images) {
                        if (is_numeric($images)) {
                            $imageName = Media::find($images)->image_name;
                            $svgImages[$metaValues['meta_key']][$key]['ID'] = $images;
                            $svgImages[$metaValues['meta_key']][$key]['NAME'] = $imageName;
                            $svgImages[$metaValues['meta_key']][$key]['IMAGE'] = url() . "/projects/" . $id . "/" . $metaValues['meta_key'] . "/" . $imageName;
                        } else
                            $svgImages[$metaValues['meta_key']][$key]['ID'] = $images;
                    }
                }
            } elseif ('breakpoints' === $metaValues['meta_key']) {
                $svgImages[$metaValues['meta_key']] = (!empty($metaValues['meta_value'])) ? unserialize($metaValues['meta_value']) : [];
            } else {
                $mediaId = $metaValues['meta_value'];
                if (is_numeric($mediaId)) {
                    $imageName = Media::find($mediaId)->image_name;
                    $svgImages[$metaValues['meta_key']]['ID'] = $mediaId;
                    $svgImages[$metaValues['meta_key']]['NAME'] = $imageName;
                    $svgImages[$metaValues['meta_key']]['IMAGE'] = url() . "/projects/" . $id . "/" . $metaValues['meta_key'] . "/" . $imageName;
                }
            }
        }

        return view('admin.project.svg')
                        ->with('project', $project->toArray())
                        ->with('svgImages', $svgImages)
                        ->with('current', 'svg')
                        ->with('project_property_type', $project->projectPropertyTypes()->get());
    }

    public function validateProjectTitle(Request $request) {
        $title = $request->input('title');
        $projectId = $request->input('project_id');
        $msg = '';
        $flag = true;

        if ($projectId)
            $projectData = Project::where('project_title', $title)->where('id', '!=', $projectId)->get()->toArray();
        else
            $projectData = Project::where('project_title', $title)->get()->toArray();


        if (!empty($projectData)) {
            $msg = 'Project Title Already Taken';
            $flag = false;
        }


        return response()->json([
                    'code' => 'project_title_validation',
                    'message' => $msg,
                    'data' => $flag,
                        ], 200);
    }

    public function summary($id, ProjectRepository $projectRepository) {

        $project = $projectRepository->getProjectById($id);
        $phases = $project->projectPhase()->where('phase_name', '!=', 'Default')->get()->toArray();
        $projectpropertyTypes = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypes = $propertyTypeUnitData = $phaseData = $unitTypeData = $count = [];
        $projectJason = \CommonFloor\ProjectJson::where('project_id', $id)->where('type', 'step_two')->select('created_at', 'updated_at')->first()->toArray();

        foreach ($projectpropertyTypes as $propertyType) {
            $propertyTypes[$propertyType['property_type_id']] = get_property_type($propertyType['property_type_id']);
        }
        foreach ($phases as $phase) {
            $phaseId = $phase['id'];
            $phase = Phase::find($phaseId);
            $units = $phase->projectUnits()->get()->toArray();
            $buildings = $phase->projectBuildings()->get()->toArray(); 
            $buildingUnits =[];
            //BUILDING (APARTMENT/PENTHOUSE)
            foreach($buildings as $building)
            {
                $buildingData = Building :: find($building['id']);
                $buildingUnits = $buildingData->projectUnits()->get()->toArray();   	
            }
            $units = array_merge($units,$buildingUnits);
       
            //VILLA AND PLOT
            foreach ($units as $unit) {
                $variantId = $unit['unit_variant_id'];
                $unitType = UnitVariant::find($variantId)->unitType()->first();
                $unitTypeId = $unitType->id;
                $unitTypeName = $unitType->unittype_name;
                $propertType = UnitType::find($unitTypeId)->projectPropertyType()->first();
                $propertTypeId = $propertType->id;

                $phaseData[$phaseId] = $phase['phase_name'];
                $unitTypeData[$unitTypeName] = Defaults::find($unitTypeName)->label;

                if (!isset($propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName])) {
                    $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['available'] = 0;
                    $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['sold'] = 0;
                    $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['not_released'] = 0;
                    $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['blocked'] = 0;
                }

                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['available'] +=($unit['availability'] == 'available') ? 1 : 0;
                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['sold'] +=($unit['availability'] == 'sold') ? 1 : 0;
                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['not_released'] +=($unit['availability'] == 'not_released') ? 1 : 0;
                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['blocked'] +=($unit['availability'] == 'blocked') ? 1 : 0;
            }
            
            
            
            
        }

        ksort($propertyTypes);
        $projectData = $project->toArray();
        $projectData['breakpoints'] = unserialize($projectData['breakpoints']);
        $projectData['master'] = unserialize($projectData['master']);
        $projectData['masterdeletedimages'] = [];
        $breakPointImageIds =[];
        foreach ($projectData['master'] as $position => $imageId) {
            if($imageId=="")
                $projectData['masterdeletedimages'][] =$position;
            else
            {
                if(in_array($position,$projectData['breakpoints'] ))
                {
                    $breakPointImageIds[$position] =$breakPointImageIds;
                }
            }
        }

        // $breakPointSvgData = SvgController :: getUnitSvgCount($breakPointImageIds);
        
        $googleearthauthtool =true;


        return view('admin.project.projectsummary')
                        ->with('project', $projectData)
                        ->with('phases', $phases)
                        ->with('projectpropertyTypes', $projectpropertyTypes)
                        ->with('propertyTypeUnitData', $propertyTypeUnitData)
                        ->with('phaseData', $phaseData)
                        ->with('unitTypeData', $unitTypeData)
                        ->with('propertyTypes', $propertyTypes)
                        ->with('googleearthauthtool', $googleearthauthtool)
                        ->with('projectJason', $projectJason)
                        ->with('current', 'summary');
    }

    public function getPhaseData($projectId, $phaseId) {
        $phase = Phase::find($phaseId);
        $units = $phase->projectUnits()->get()->toArray();
		$buildings = $phase->projectBuildings()->get();
        $data = $unitIds =  $buildingIds =$mediaIds = $errors = [];
        foreach ($units as $unit) {
            $variantId = $unit['unit_variant_id'];
            $unitType = \CommonFloor\UnitVariant::find($variantId)->unitType()->first();
            $unitTypeId = $unitType->id;
            $propertType = \CommonFloor\UnitType::find($unitTypeId)->projectPropertyType()->first();
            $propertTypeId = $propertType->property_type_id;
            $data[$propertTypeId][] = $unit['unit_name'];
			$unitIds['UNIT'][] = $unit['id'];
        }
		
		foreach($buildings as $building)
		{
			$data['BUILDING'][] = $building->building_name;
			$buildingIds[] =  $building->id;
			$mediaIds ['BUILDING'][]= $building->building_master; 
			$buildingData = Building :: find($building->id);
			$buildingUnits = $buildingData->projectUnits()->get()->toArray(); 
			foreach ($buildingUnits as $buildingUnit) {
				$unitIds['UNIT'][] = $buildingUnit['id'];
			}	
		}
        
		$project = Project::find($projectId);
		$projectMeta = $project->projectMeta()->where('meta_key', 'master')->first()->toArray();
		$mediaIds ['PROJECT'][]=($projectMeta)?unserialize($projectMeta['meta_value']):''; 
		 
		$unitSvgExits = SvgController :: getUnmarkedSvgUnits($unitIds,$mediaIds);
 
        if (!$unitSvgExits) {
            $errors['authtool'] = 'Svg Missing';
        }
        if (!count($data)) {
            $errors['phase'] = 'Phase cannot be made live as no units have been added to it.';
        }


        $html = '<div class="modal-body">';
        $html .= '<div class="row m-b-10"><div class="col-md-12">';
        if (!empty($errors)) {
            $html .= '<div class="alert alert-error m-b-20"> 
                  <ul  class="list-inline">';
            foreach ($errors as $errorMsg) {
                $html .= '
                  <li><i class="fa fa-circle"></i>' . $errorMsg . '<li>';
            }
        }
        $html .= '</ul></div></div></div>';
        if (!empty($data)) {
            $html .= '<table class="table table-bordered">
                  <thead>
                  <tr>
                  <td width="15%"><span class="semi-bold">Type</span></td> 
                  <td><span class="semi-bold">Units in ' . $phase->phase_name . '</span></td> 
                  </tr>
                  </thead>
                  <tbody>';
            foreach ($data as $key => $values) {
				
				if($key=='BUILDING')
				{
					$html .=' <tr>
                  <td><span class="semi-bold">Building</span></td> 
                  <td>' . implode(", ", $values) . '</td> 
                  </tr>';
					continue;
				}

                $html .=' <tr>
                  <td><span class="semi-bold">' . get_property_type($key) . '</span></td> 
                  <td>' . implode(", ", $values) . '</td> 
                  </tr>';
            }
            $html .='</tbody>
                </table>';
        }
        $html .= '</div><div class="modal-footer">';
        $html .= (empty($errors)) ? '<button type="button" class="btn btn-primary update-phase-btn" data-phase-id="' . $phase->id . '">Go Live</button>' : '';
        $html .='<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
                 </div>';



        return response()->json([
                    'code' => 'phase_data',
                    'message' => '',
                    'data' => [
                        'html' => $html,
                    ]
                        ], 201);

        $html .= '<table class="table table-bordered">
                  <thead>
                  <tr>
                  <td width="15%"><span class="semi-bold">Type</span></td> 
                  <td><span class="semi-bold">Units in ' . $phase->phase_name . '</span></td> 
                  </tr>
                  </thead>
                  <tbody>';
        foreach ($data as $key => $values) {

            $html .=' <tr>
                  <td><span class="semi-bold">' . get_property_type($key) . '</span></td> 
                  <td>' . implode(", ", $values) . '</td> 
                  </tr>';
        }
        $html .='</tbody>
                </table>';
    }

    public function projectPublishData($projectId, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($projectId);
        $projectMetaCondition = ($project->has_master == 'yes') ? ['master', 'google_earth', 'breakpoints'] : [ 'google_earth'];
        $projectMeta = $project->projectMeta()->whereIn('meta_key', $projectMetaCondition)->get()->toArray();
        $phases = Phase::where(['project_id' => $projectId, 'status' => 'live'])->get()->toArray();
        $masterImages = $breakpoints = $googleEarth = $breakpointAuthtool = $googleEarthAuthtool = $data = $phaseData = $errors = [];

        if (empty($phases)) {
            $errors['phase'] = "No phase available with status Live.";
        }

        foreach ($projectMeta as $metaValues) {

            if ('master' === $metaValues['meta_key']) {
                $masterImages = unserialize($metaValues['meta_value']);
                if (empty($masterImages)) {
                    $errors['master_images'] = "Project Master Images Not Found";
                }
            } elseif ('breakpoints' === $metaValues['meta_key']) {
                $breakpoints = unserialize($metaValues['meta_value']);
                if (empty($masterImages)) {
                    $errors['breakpoints'] = "Breakpoints Not Set Project Master Images";
                }
            } else {
                $googleEarth = $metaValues['meta_value'];
                if (empty($googleEarth)) {
                    $errors['google_earth'] = "Google Earth Image Not Found";
                }
            }
        }

        if (!empty($breakpoints)) {
            foreach ($breakpoints as $breakpoint) {
                $breakpointAuthtool = true;
                if (!$breakpointAuthtool) {
                    $errors['breakpointauth'] = "Pending SVG Authoring For Project Master Images";
                }
            }
        }

        $googleEarthAuthtool = true;
        if (!$googleEarthAuthtool) {
            $errors['googleearthauthtool'] = "Pending SVG Authoring For Google Earth Image";
        }

        foreach ($phases as $phase) {
            $phaseId = $phase['id'];
            $phase = Phase::find($phaseId);
            $units = $phase->projectUnits()->get()->toArray();
            $phaseData[$phaseId] = $phase['phase_name'];

            foreach ($units as $unit) {
                $variantId = $unit['unit_variant_id'];
                $unitType = UnitVariant::find($variantId)->unitType()->first();
                $unitTypeId = $unitType->id;
                $unitTypeName = $unitType->unittype_name;
                $propertType = UnitType::find($unitTypeId)->projectPropertyType()->first();
                $propertTypeId = $propertType->property_type_id;
                $data[$phaseId][$propertTypeId][] = $unit['unit_name'];
            }
        }

        $html = '<div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title text-left" id="myModalLabel">Publish Project</h4>
            </div>
            <div class="modal-body">
                <div class="row m-b-5">
                    <div class="col-md-12">
                        <div class="alert">
                            <strong>NOTE : </strong>Project should have at least one Phase with status as Live to publish the project.
                        </div>
                    </div>
                </div>';
        if (!empty($errors)) {
            $html .='<h5 class="semi-bold inline">Resolve the errors below to Publish the Project</h5>
                <div class="row m-b-10">
                    <div class="col-md-12">
                        <div class="alert alert-error m-b-20">

                            <ul>';
            foreach ($errors as $errorMsg) {
                $html .='<li>' . $errorMsg . '</li>';
            }
            $html .='</ul>


                        </div>

                    </div>

                </div>';
        } else {
            foreach ($data as $phaseId => $unitData) {
                $html .= '<table class="table table-bordered">
                  <thead>
                  <tr>
                  <td width="15%"><span class="semi-bold">Type</span></td> 
                  <td><span class="semi-bold">Units in ' . $phaseData[$phaseId] . '</span></td> 
                  </tr>
                  </thead>
                  <tbody>';
                foreach ($unitData as $key => $values) {

                    $html .=' <tr>
                  <td><span class="semi-bold">' . get_property_type($key) . '</span></td> 
                  <td>' . implode(", ", $values) . '</td> 
                  </tr>';
                }
                $html .='</tbody>
                </table>';
            }
        }
        $html .='</div>

            <div class="modal-footer">';

        $html .=(empty($errors)) ? '<button type="button" class="btn btn-primary update-project-status" data-project-id="' . $projectId . '">Publish</button>' : '';
        $html .='<button type="button" class="btn btn-default" data-dismiss="modal" ><i class="fa fa-ban"></i> Cancel</button>

            </div>
        </div>';



        return response()->json([
                    'code' => 'publish_data',
                    'message' => '',
                    'data' => [
                        'html' => $html,
                    ]
                        ], 201);
    }

    public function updateProjectStatus($projectId) {
        $project = Project::find($projectId);
        $project->status = 'published';
        $project->save();

        return response()->json([
                    'code' => 'update_project_status',
                    'message' => 'Project Successfully Published',
                        ], 201);
    }

    public function validateProjectPhase($projectId) {

        $project = Project::find($projectId);
        $projectPhase = Input::get( 'projectPhase' ); 
        $hasphases = Phase::where('project_id',$projectId)->get()->toArray();
        $msg ='';
        if($projectPhase=='no')
        {
            if (count($hasphases)>1) {
                $msg = "There Cannot Be More Then 1 Phase To Make No Phases"  ;          
            } 
        }
        
        return response()->json([
                    'code' => 'update_project_status',
                    'message' => $msg,
                        ], 200);
    }

    //added by Surekha//
    public function loadMasterSvgTool($id, $image_id, ProjectRepository $projectRepository,Request $request) {
        
        $project = $projectRepository->getProjectById($id);
        $imageName = Media::find($image_id)->image_name;

        $getVar = Input::get();

        $breakpoint = -1;
        if (isset($getVar['position'])) {
           $breakpoint = (int) $getVar['position'];
        }        

        $type = $getVar['type'];

        $propertyTypeName = [BUNGLOWID=>"Villa",PLOTID=>"Plot",APARTMENTID=>"Apartment",PENTHOUSEID=>"Penthouse"];

        $projectpropertyTypes = $project->projectPropertyTypes()->get()->toArray();

        $supported_types = array();        

        switch ($type) {
            case 'master':
                $svgImagePath = url() . "/projects/" . $id . "/master/" . $imageName;

                // get property types supported by project
                foreach ($projectpropertyTypes as $projectpropertyType) {
                    $propertyname = $propertyTypeName[$projectpropertyType['property_type_id']];
                    
                    if (in_array( $propertyname, array('Apartment','Penthouse'))){

                        if (!in_array( "Building", $supported_types)) {
                            $supported_types[] = "Building";
                        }

                    }
                    else{
                        $supported_types[] = $propertyname;
                    }
                   
                }
                
                // since project master svg, pass amenities as well
                $supported_types[] = "Amenity";   
                                              
                break;

            case 'building_master':
                $buildingId  = $getVar['building'];
                $svgImagePath = url() . "/projects/" . $id . "/buildings/" . $buildingId."/". $imageName;

                // get property types supported by project
                foreach ($projectpropertyTypes as $projectpropertyType) {
                    $propertyname = $propertyTypeName[$projectpropertyType['property_type_id']];
                    
                    if (($propertyname == "Apartment")or($propertyname == "Penthouse")) {
                        $supported_types = array("Apartment");
                    }
                }
                
                // pass amenities as well
                $supported_types[] = "Amenity";                   
                break;

             case 'google_earth':
                $svgImagePath = url() . "/projects/" . $id . "/google_earth/". $imageName;
                
                // pass Project
                $supported_types[] = "Project";                 
                $supported_types[] = "Amenity";                 
                break;                 

        }
    
        $buildingId = 0;
        if (isset($getVar['building'])) {
            $buildingId = $getVar['building'];
        }

        switch ($type) {
            case 'master':
                $svg_type_display = "PROJECT MASTER";
                break;

            case 'building_master':
                $svg_type_display = "BUILDING MASTER";
                break;

            case 'google_earth':
                $svg_type_display = "GOOGLE EARTH";
                break;                
        }


        return view('admin.project.mastersvgtool')
        ->with('project', $project->toArray())
        ->with('svgImage', $svgImagePath)
        ->with('supported_types',json_encode($supported_types))
        ->with('breakpoint_position',$breakpoint)
        ->with('building_id',$buildingId)
        ->with('project_id',$id)
        ->with('svg_type_display',$svg_type_display)
        ->with('svg_type', $type);
 }

}
