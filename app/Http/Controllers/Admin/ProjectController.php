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
use CommonFloor\Unit;
use CommonFloor\Building;
use CommonFloor\ProjectJson;
use \Input;
use CommonFloor\Http\Controllers\Admin\SvgController;
use \Session;
use \Excel;


class ProjectController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
 
        $userId =  \Auth::user()->id;
        $defaultRole = getDefaultRole($userId);
        
        if($defaultRole['PROJECT_ACCESS']=='all')
            $projects = Project::orderBy('project_title')->get()->toArray();
        else
        {
            $userProjects = getUserAssignedProject($userId);
            $projectIds =[];
            foreach($userProjects as $key=> $userProject)
            { 
                $projectIds []= $userProject['project_id'];

            }
            $projects = Project::whereIn('id',$projectIds)->orderBy('project_title')->get()->toArray();
        }
    
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
           Session::flash('error_message','Error !!! Project Already Exist ');    
           return redirect("/admin/project/create"); 
        }

        $project = $projectRepository->createProject($request->all());
        if ($project !== null) {
            Session::flash('success_message','Your project has been created successfully. Please configure the project by clicking on Edit button');
            Session::flash('success_message','Your project has been created successfully. Please configure the project by clicking on Edit button');
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
        $projectMeta = $project->projectMeta()->whereNotIn('meta_key', ['master', 'google_earth','shadow', 'skyview', 'breakpoints', 'cf'])->get()->toArray();
        $propertyTypes = get_all_property_type();
        $defaultunitTypes = get_all_unit_type();
        $unitTypes = $projectunitTypes = $projectCost = $propertytypeAttributes = $propertyTypehasVariants= [];
        $projectAttributes = $project->attributes->toArray();

        foreach ($projectMeta as $meta) {
            $projectCost[$meta['meta_key']] = ['ID' => $meta['id'], 'VALUE' => $meta['meta_value']];
        }

        
        
        foreach ($project->projectPropertyTypes as $projectPropertyType) {
            $unitTypeIds = [];
            $unitTypes = $project->getUnitTypesToArray($projectPropertyType->id);
            foreach ($unitTypes as $unitType) {
                if (!isset($defaultunitTypes[$projectPropertyType->property_type_id][$unitType->unittype_name])) {
                    $projectDefaultUnitType = Defaults::find($unitType->unittype_name)->toArray();
                    $defaultunitTypes[$projectPropertyType->property_type_id][$projectDefaultUnitType['id']] = $projectDefaultUnitType['label'];
                }
                
                $unitTypeIds[] = $unitType->id;
            }
            $unitTypeVariants = UnitVariant::whereIn('unit_type_id',$unitTypeIds)->get()->toArray();
            $propertyTypehasVariants[$projectPropertyType->property_type_id]=(empty($unitTypeVariants))?false:true;
            
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
                        ->with('propertyTypehasVariants', $propertyTypehasVariants)
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
        
        Session::flash('success_message','Project Configuration Successfully Updated');
        
        return redirect("/admin/project/" . $id . "/edit");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($projectId) {
       $project = Project::find($projectId);
       $projectJason = $project->projectJson()->delete();
       $projectMeta = $project->projectMeta()->delete();
       $projectattributes = $project->attributes()->delete();   
       $projectmedia = $project->media()->delete();   
       $projectRooms = $project->roomTypes()->delete();     
       $userProjects = \CommonFloor\UserProject::where('project_id',$projectId)->delete();  
       $agentUnits = \CommonFloor\AgentUnit::where('project_id',$projectId)->delete();      
        
        $phases = $project->projectPhase()->get()->toArray();
        $projectpropertyTypes = $project->projectPropertyTypes()->get()->toArray();
        //delete phase -> buildings -> units
        foreach ($phases as $key=> $phase) {
            $phaseId = $phase['id'];
            $phase = Phase::find($phaseId);
            $units = $phase->projectUnits()->delete(); 
            $buildings = $phase->projectBuildings()->get(); 

            foreach($buildings as $building)
            {
                $buildingData = Building :: find($building['id']);
                $buildingUnits = $buildingData->projectUnits()->delete(); 
                $buildingmedia = $project->media()->delete();   
                $buildingData->delete(); 
            }
 
            $phase->delete(); 
        }
        
        //delete property type -> unittype -> variants
        foreach($projectpropertyTypes as $projectPropertyType)
        {
            $propertyType = ProjectPropertyType :: find($projectPropertyType['id']);
            $propertyTypeattributes = $propertyType->attributes()->delete();
            $projectUnitTypes = $propertyType->projectUnitType()->get()->toArray();
            foreach($projectUnitTypes as $projectUnitType)
            {
                $unitType = UnitType::find($projectUnitType['id']);
                $unitVariants = $unitType->unitTypeVariant()->delete();
                $unitType->delete();
            }
            $propertyType->delete();
        }
        $project->delete();
        $targetDir = public_path() . "/projects/" . $projectId;
        \File::deleteDirectory($targetDir);
        
        Session::flash('success_message','Project Successfully Deleted');
        
        return response()->json( [
                    'code' => 'project_deleted',
                    'message' => 'Project Successfully Deleted',
         
                        ], 204 );
    }
    

    public function cost($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->whereNotIn('meta_key', ['master', 'google_earth', 'shadow', 'skyview', 'breakpoints', 'cf'])->get()->toArray();
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
        
        Session::flash('success_message','Project Cost Successfully Updated');

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
        $projectFilters =$request->all();
        unset($projectFilters['_token']);
        $projectFilters = serialize($projectFilters);
        $data = array("meta_value" => $projectFilters);
        ProjectMeta:: where(['meta_key'=> 'filters','project_id'=> $id])->update($data);
        
        Session::flash('success_message','Project Filters Successfully Updated');
        
        return redirect("/admin/project/" . $id . "/filters");
    }

    public function svg($id, ProjectRepository $projectRepository) {

        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->whereIn('meta_key', ['master', 'google_earth', 'shadow', 'skyview', 'breakpoints'])->get()->toArray();
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
            }
            elseif ('shadow' === $metaValues['meta_key']) {
                $shadowImages = unserialize($metaValues['meta_value']);

                if (!empty($shadowImages)) {
                    ksort($shadowImages);
                    foreach ($shadowImages as $key => $images) {
                        if (is_numeric($images)) {
                            $imageName = Media::find($images)->image_name;
                            $svgImages[$metaValues['meta_key']][$key]['ID'] = $images;
                            $svgImages[$metaValues['meta_key']][$key]['NAME'] = $imageName;
                            $svgImages[$metaValues['meta_key']][$key]['IMAGE'] = url() . "/projects/" . $id . "/" . $metaValues['meta_key'] . "/" . $imageName;
                        } else
                            $svgImages[$metaValues['meta_key']][$key]['ID'] = $images;
                    }
                }
            }
             elseif ('breakpoints' === $metaValues['meta_key']) {
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
        $phases = $project->projectPhase()->get()->toArray();
        $projectpropertyTypes = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypes = $propertyTypeUnitData = $phaseData = $unitTypeData = $count = $breakPointSvgData = $buildingbreakPointSvgData = $buildingbreakPoint = $projectBuildings= [];
        $projectJason = \CommonFloor\ProjectJson::where('project_id', $id)->where('type', 'step_two')->select('created_at', 'updated_at')->first()->toArray();

        foreach ($projectpropertyTypes as $propertyType) {
            $propertyTypes[$propertyType['property_type_id']] = get_property_type($propertyType['property_type_id']);
        }
        $totalCount = $totalbuildingUnitCount= 0;
        foreach ($phases as $key=> $phase) {
            $phaseId = $phase['id'];
            $phase = Phase::find($phaseId);
            $units = $phase->projectUnits()->where('availability','!=','archived')->get()->toArray();
            $buildings = $phase->projectBuildings()->get();
            $projectBuildings = array_merge($projectBuildings,$buildings->toArray());
            $buildingUnits = [];
            
            //Project master total unit count Villa + Plot + Building
            $totalCount += count($units) + count($buildings); 
            
            //BUILDING (APARTMENT/PENTHOUSE)
            foreach($buildings as $building)
            {
                $buildingData = Building :: find($building['id']);
                $buildingUnits = $buildingData->projectUnits()->where('availability','!=','archived')->get()->toArray();
                $buildingMediaIds= $building['building_master'];
                $buildingBreakpointIds =[];
                $buildingbreakPoint = (!empty($building['breakpoints']))?unserialize($building['breakpoints']):[];
                 foreach($buildingMediaIds as $position => $buildingMediaId) {
                    if($buildingMediaId!="")
                    {
                        if(in_array($position,$buildingbreakPoint ))
                        {
                            $buildingBreakpointIds[$position]=$buildingMediaId;
                        }
                    }
                }
                
               
                $totalbuildingUnitCount = count($buildingUnits); 
                //Building total unit count
                $buildingunitSvgCount = SvgController :: getUnitSvgCount($buildingBreakpointIds);  
                foreach($buildingunitSvgCount as $position=> $count)
                {
                    $buildingunitCount =  $count['apartment'] ;
                    $buildingbreakPointSvgData[$building['id']][$position]['MARKED']= $buildingunitCount;
                    $buildingbreakPointSvgData[$building['id']][$position]['PENDING']= $totalbuildingUnitCount - $buildingunitCount;
                }
                
                 $units = array_merge($units,$buildingUnits);  //Merge All Units of project
                 
            }
            
           
            //VILLA + PLOT +Penthouse + APARTMENT
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
                    $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['booked_by_agent'] = 0;
                    $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['archived'] = 0;
                }

                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['available'] +=($unit['availability'] == 'available') ? 1 : 0;
                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['sold'] +=($unit['availability'] == 'sold') ? 1 : 0;
                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['not_released'] +=($unit['availability'] == 'not_released') ? 1 : 0;
                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['blocked'] +=($unit['availability'] == 'blocked') ? 1 : 0;
                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['booked_by_agent'] +=($unit['availability'] == 'booked_by_agent') ? 1 : 0;
                $propertyTypeUnitData[$propertTypeId][$phaseId][$unitTypeName]['archived'] +=($unit['availability'] == 'archived') ? 1 : 0;
            }
            
           
           if( $phase['phase_name'] == 'Default')
           {
                unset($phases[$key]); //Unset default phase
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
                if(!empty($projectData['breakpoints']) && in_array($position,$projectData['breakpoints'] ))
                {
                    $breakPointImageIds[$position] =$imageId;
                }
            }
        }
        
        $unitSvgCount = SvgController :: getUnitSvgCount($breakPointImageIds);
        foreach($unitSvgCount as $position=> $count)
        {
            $unitCount =  $count['villa'] +$count['plot']+$count['building'];
            $breakPointSvgData[$position]['MARKED']= $unitCount;
            $breakPointSvgData[$position]['PENDING']= $totalCount - $unitCount;
        }
        
        $googleImageID = $project->projectMeta()->where('meta_key','google_earth')->first()->meta_value;  
        $googleearthauthtool =SvgController :: isGoogleSvgMarked($googleImageID);  
 
 
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
                        ->with('breakPointSvgData', $breakPointSvgData)
                        ->with('buildings', $projectBuildings)    
                        ->with('buildingbreakPointSvgData', $buildingbreakPointSvgData) 
                        ->with('current', 'summary');
    }

    public function getPhaseData($projectId, $phaseId) {
        $phase = Phase::find($phaseId);
        $units = $phase->projectUnits()->where('availability','!=','archived')->get()->toArray();
		$buildings = $phase->projectBuildings()->get();
        $data = $unitIds =  $buildingIds = $mediaIds = $errors = $unitNames =  [];
        foreach ($units as $unit) {
            $variantId = $unit['unit_variant_id'];
            $unitType = \CommonFloor\UnitVariant::find($variantId)->unitType()->first();
            $unitTypeId = $unitType->id;
            $propertType = \CommonFloor\UnitType::find($unitTypeId)->projectPropertyType()->first();
            $propertTypeId = $propertType->property_type_id;
            $data[$propertTypeId][] = $unit['unit_name'];
			$unitIds['unit'][] = $unit['id'];
            $unitNames['unit'][$unit['id']]=$unit['unit_name'];
  
        }
		
        
		foreach($buildings as $building)
		{
			$data['BUILDING'][] = $building->building_name;
            $unitNames['building'][$building->id]=$building->building_name;
			$unitIds['building'][] =  $building->id;
			$buildingMediaIds= $building->building_master;
            
            $breakpoints =  (!empty($building['breakpoints']))?unserialize($building['breakpoints']):[];
            $buildingMediaIdArr =[];
            foreach($buildingMediaIds as $position => $buildingMediaId)
            {
                if(in_array($position,$breakpoints))
                {
                    $buildingMediaIdArr[]=$buildingMediaId;
                }
            }
            /* BUILDING UNIT SVG MARKED CHECK*/
            $buildingData = Building :: find($building->id);
            $buildingUnits = $buildingData->projectUnits()->where('availability','!=','archived')->get()->toArray();
            $buildingunitIds = $buildingunitNames =[];
            foreach ($buildingUnits as $buildingUnit) {
                $buildingunitIds['unit'][] = $buildingUnit['id'];
                $buildingunitNames['unit'][$buildingUnit['id']]=$buildingUnit['unit_name'];
       
            }
            
            $unitSvgExits =[];
            if($building->has_master == 'yes')
            { 
                if(!empty($buildingMediaIdArr))
		           $unitSvgExits = SvgController :: getUnmarkedSvgUnits($buildingunitIds,$buildingMediaIdArr);
                else
                  $errors['buildingunitauthtool-'. $building->id] = 'No Authoring Done For Building ('. $building->building_name.')';
               
                if(empty($buildingUnits))
                   $errors['buildingunitauthtool-'. $building->id] = 'No Authoring Done For Building ('. $building->building_name.')'; 
                
              if (!empty($unitSvgExits)) {  
                    
                    if(isset($unitSvgExits['unit']))
                    {
                        $errors['buildingunitauthtool-'. $building->id] = ' Building ('. $building->building_name.') Svg Unmarked for Units : ';
                        foreach($unitSvgExits['unit'] as $unitId)
                        {
                            $errors['buildingunitauthtool-'. $building->id] .= $buildingunitNames['unit'][$unitId].' ,';
                        }

                    }
 
             
                }
            }
            /* */
            
		}
       
   
		$project = Project::find($projectId);
        $projectmediaIds = $breakpoints = [];
        
        if($project->has_master == 'yes')
        {
            $projectMeta = $project->projectMeta()->whereIn('meta_key', ['breakpoints','master'])->get()->toArray();
            foreach ($projectMeta as $metaValues) {

                if ('master' == $metaValues['meta_key']) {
                    $projectmediaIds = unserialize($metaValues['meta_value']);

                } elseif ('breakpoints' == $metaValues['meta_key']) {
                    $breakpoints = unserialize($metaValues['meta_value']);

                } 
            }

            foreach($projectmediaIds as $position=> $projectmediaId)
            {
                if(in_array($position,$breakpoints))
                {
                    $mediaIds[]=$projectmediaId;
                }
            }
            $unitSvgExits =[];
            
             if(!empty($mediaIds))
		          $unitSvgExits = SvgController :: getUnmarkedSvgUnits($unitIds,$mediaIds);
            else
                 $errors['unitauthtool'] = 'No Authoring Done For Units';
    
            
             if (!empty($unitSvgExits)) {
                    
                    if(isset($unitSvgExits['unit']))
                    {
                        $errors['unitauthtool'] = 'Project Svg Unmarked for Units : ';
                        foreach($unitSvgExits['unit'] as $unitId)
                        {
                            $errors['unitauthtool'] .=$unitNames['unit'][$unitId].' ,';
                        }

                    }

                    if(isset($unitSvgExits['building']))
                    { 
                        $errors['buildingauthtool'] = 'Project Svg Unmarked for Buildings : ';
                        foreach($unitSvgExits['building'] as $unitId)
                        {
                            $errors['buildingauthtool'] .= $unitNames['building'][$unitId].' ,';
                        }

                    }
             
                }
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
                  <td width="30%"><span class="semi-bold">Type</span></td> 
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

    }

    public function projectPublishData($projectId, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($projectId);
        $projectMetaCondition = ($project->has_master == 'yes') ? ['master', 'google_earth', 'breakpoints'] : [ 'google_earth'];
        $projectMeta = $project->projectMeta()->whereIn('meta_key', $projectMetaCondition)->get()->toArray(); 
        if($project->has_phase == 'yes')
            $phases = Phase::where(['project_id' => $projectId, 'status' => 'live'])->get()->toArray();
        else
           $phases = Phase::where(['project_id' => $projectId])->get()->toArray();
        
        $masterImages = $breakpoints = $googleEarth = $breakpointAuthtool = $googleEarthAuthtool = $data = $phaseData = $errors = $warnings = $buildingPhaseIds = $units = $unitIds = $unitNames =[];
        $filters = $project->projectMeta()->where( 'meta_key', 'filters' )->first()->meta_value;
        $filters = unserialize($filters);
         
        //WARNINGS
        $projectPropertyTypes = $project->projectPropertyTypes()->get()->toArray();          
        foreach($projectPropertyTypes as $projectPropertyType)
        {
            $propertyType = ProjectPropertyType :: find($projectPropertyType['id']);
            $projectUnitTypes = $propertyType->projectUnitType()->get()->toArray();
            foreach($projectUnitTypes as $projectUnitType)
            {
                $unitType = UnitType::find($projectUnitType['id']);
                $unitVariants = $unitType->unitTypeVariant()->get()->toArray();
                if(empty($unitVariants))
                { 
                    $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
                    $warnings[] = 'No Variants Created For Unit Type :'.$unitTypeName .' ('.get_property_type($projectPropertyType['property_type_id']).')';  
                }
                
                foreach($unitVariants as $unitVariant)
                {
                    $variant = UnitVariant::find($unitVariant['id']);
                    $units = $variant->units()->where('availability','!=','archived')->get()->toArray();
                    if(empty($units))
                        $warnings[] = 'No Units Created For Variant :'.$variant['unit_variant_name'];   
                     
                }
            }
            
        }

        if (empty($phases)) {
            $errors['phase'] = "No phase available with status Live.";
        }
        $masterImages = $breakpoints =  $projectBreakpoints = [];
        foreach ($projectMeta as $metaValues) {

            if ('master' === $metaValues['meta_key']) {
                $masterImages = unserialize($metaValues['meta_value']);
                
                if (empty($masterImages)) {
                    $errors['master_images'] = "Project Master Images Not Found";
                }
            } elseif ('breakpoints' === $metaValues['meta_key']) {
                $breakpoints = unserialize($metaValues['meta_value']);
                $projectBreakpoints =$breakpoints;
                if (empty($breakpoints)) {
                    $errors['breakpoints'] = "Breakpoints Not Set Project Master Images";
                }
            } else {
                $googleEarth = $metaValues['meta_value'];
                if (empty($googleEarth)) {
                    $errors['google_earth'] = "Google Earth Image Not Found";
                
                }
                else{
                    $googleEarthAuthtool = SvgController :: isGoogleSvgMarked($googleEarth); 
                    if (!$googleEarthAuthtool) {
                        $errors['googleearthauthtool'] = "Pending SVG Authoring For Google Earth Image";
                    }
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
  
        $projectUnits= $projectUnitIds = $buildingUnitIds = $mediaIds =[];
        foreach ($phases as $phase) {
            $phaseId = $phase['id'];
            $phase = Phase::find($phaseId);
            $units = $phase->projectUnits()->where('availability','!=','archived')->get()->toArray();
            $buildings = $phase->projectBuildings()->get()->toArray(); 
            $phaseData[$phaseId] = $phase['phase_name'];
            $buildingUnits=[];
            foreach($buildings as $building)
            {
                $unitIds['building'][] =  $building['id'];
                $unitNames['building'][$building['id']]= $building['building_name']; 
                $buildingData = Building :: find($building['id']);
                $buildingUnits = $buildingData->projectUnits()->where('availability','!=','archived')->get()->toArray();
                if(empty($buildingUnits))
                        $warnings[] = 'No Units Created For Building :'.$building['building_name']; 
                
                $buildingMediaIds= $buildingData->building_master; 
                $breakpoints =  $building['breakpoints'];
                $buildingMediaIdArr =[];  
                foreach($buildingMediaIds as $position => $buildingMediaId)
                {
                    if(in_array($position,$breakpoints))
                    {
                        $buildingMediaIdArr[]=$buildingMediaId;
                    }
                }
                /* BUILDING UNIT SVG MARKED CHECK*/
                $buildingunitIds = $buildingunitNames =[];
                foreach ($buildingUnits as $buildingUnit) {
                    $buildingunitIds['unit'][] = $buildingUnit['id'];
                    $buildingunitNames['unit'][$buildingUnit['id']]=$buildingUnit['unit_name'];

                }
                
                $unitSvgExits =[]; 
                if($building['has_master'] == 'yes')
                { 
                    if(!empty($buildingMediaIdArr))
                       $unitSvgExits = SvgController :: getUnmarkedSvgUnits($buildingunitIds,$buildingMediaIdArr);
                    else
                      $errors['buildingunitauthtool-'. $building['id']] = 'No Authoring Done For Building ('. $building['building_name'].')';
                       
                    if(empty($buildingUnits))
                       $errors['buildingunitauthtool-'. $building['id']] = 'No Authoring Done For Building ('.$building['building_name'].')'; 

                  if (!empty($unitSvgExits)) {

                        if(isset($unitSvgExits['unit']))
                        {
                            $errors['buildingunitauthtool-'. $building['id']] = ' Building ('. $building['building_name'].') Svg Unmarked for Units : ';
                            foreach($unitSvgExits['unit'] as $unitId)
                            {
                                $errors['buildingunitauthtool-'. $building['id']] .= $buildingunitNames['unit'][$unitId].' ,';
                            }

                        }


                    }
                }
                
                
                $buildingPhaseIds[$building['id']] = $phaseId;
                $projectUnits = array_merge($projectUnits,$buildingUnits);
            }
           
           if (empty($units) && empty($buildingUnits)) {
               $errors['units'] = "No Units Created in ".$phase['phase_name'];
            }

            $projectUnits = array_merge($projectUnits,$units); 
        }
 
        foreach ($projectUnits as $unit) {
               
                $variantId = $unit['unit_variant_id'];
                $unitType = UnitVariant::find($variantId)->unitType()->first();
                $unitTypeId = $unitType->id;
                $phaseId = $unit['phase_id']; 
            
                $buildingId = $unit['building_id'];  
                
                if(isset($buildingPhaseIds[$buildingId]))
                   $phaseId = $buildingPhaseIds[$buildingId];
                else
                {
                     $unitIds['unit'][] = $unit['id'];
                     $unitNames['unit'][$unit['id']]=$unit['unit_name'];
                }
 
                $unitTypeName = $unitType->unittype_name;
                $propertType = UnitType::find($unitTypeId)->projectPropertyType()->first();
                $propertTypeId = $propertType->property_type_id;
                $data[$phaseId][$propertTypeId][] = $unit['unit_name'];  
            }
        
 
        if($project->has_master == 'yes')
        {
            
            foreach($masterImages as $position=> $projectmediaId)
            {
                if(in_array($position,$projectBreakpoints))
                {
                    $mediaIds[]=$projectmediaId;
                }
            }
            $unitSvgExits =[];
            
             if(!empty($mediaIds))
		          $unitSvgExits = SvgController :: getUnmarkedSvgUnits($unitIds,$mediaIds);
            else
                 $errors['unitauthtool'] = 'No Authoring Done For Units';
 
             if (!empty($unitSvgExits)) {
                    
                    if(isset($unitSvgExits['unit']))
                    {
                        $errors['unitauthtool'] = 'Project Svg Unmarked for Units : ';
                        foreach($unitSvgExits['unit'] as $unitId)
                        {
                            $errors['unitauthtool'] .=$unitNames['unit'][$unitId].' ,';
                        }

                    }

                    if(isset($unitSvgExits['building']))
                    { 
                        $errors['buildingauthtool'] = 'Project Svg Unmarked for Buildings : ';
                        foreach($unitSvgExits['building'] as $unitId)
                        {
                            $errors['buildingauthtool'] .= $unitNames['building'][$unitId].' ,';
                        }

                    }
             
                }
        }
        
 
        $html = '<div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title text-left" id="myModalLabel">Publish Project</h4>
            </div>
            <div class="modal-body">
                <div class="row m-b-5">';
        if($project->has_phase == 'yes')
        {
            $html .=  '<div class="col-md-12">
                        <div class="alert">
                            <strong>NOTE : </strong>Project should have at least one Phase with status as Live to publish the project.
                        </div>
                    </div>';
        }
        if(empty($filters))
            $filtermsg = 'No Filters Set For Project';
        else
        {
            $filtermsg = 'Filters Applied To : ';
            foreach($filters as $type => $filter)
            {
               $filtermsg .= $type.'( '. count($filter) .' ) ,';
            }
        }
        $html .=  '<div class="col-md-12">
                        <div class="alert">
                            <strong>NOTE : </strong>'.$filtermsg.'
                        </div>
                    </div>';
        
        $html .= ' </div>';
        if(!empty($warnings))
        {
        $html .=  '<div class="row m-b-10"><div class="col-md-12">
                        <div class="alert m-b-20">
                        <h5 class="semi-bold inline">Warning Messages
                                ('.count($warnings).')</h5>
                        <ul>';                                
        foreach($warnings as $warning)
        {
            $html .=  '<li>'.$warning.'</li>';
        }
         $html .= ' </ul></div>
                         </div></div>';
        
        }
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
        
        Session::flash('success_message','Project Successfully Published');

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
        $is_project_marked = false;

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
                //Duplicate svgs
                $breakpoints = $project->getProjectSVGs($id);
             
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
                        $supported_types = array("Apartment/Penthouse");
                    }
                }
                //Duplicate svgs
                $building = Building::find($buildingId);
                $breakpoints = $building->getBuildingSVGs($buildingId);
                
                // pass amenities as well
                $supported_types[] = "Amenity";                   
                break;

             case 'google_earth':
                $is_project_marked = SvgController::isGoogleSvgMarked($image_id);
                $svgImagePath = url() . "/projects/" . $id . "/google_earth/". $imageName;
                
                // pass Project
                $supported_types[] = "Project";                 
                $supported_types[] = "Amenity";     
                $breakpoints = [];            
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
        ->with('is_project_marked',$is_project_marked)
        ->with('svg_type', $type)
        ->with('svgs',json_encode($breakpoints))
        ->with('image_id',$image_id);
 }
    
  public function unitExport($projectId,$propertyTypeId)
  {
        $filename = '';
        $data = [];
        $flag =false;
        $count =0;                                  //GET HEIGHTEST COUNT 
        $project = Project::find($projectId);
        $defaultDirection = Defaults::where('type','direction')->get()->toArray();
        $count =(count($defaultDirection)>$count)?count($defaultDirection) : $count;
        $projectAttributes = $project->attributes->toArray();
        $count =(count($projectAttributes)>$count)?count($projectAttributes) : $count;

        $status[] =['id'=>'available','name'=>'Available'] ;
        $status[] =['id'=>'sold','name'=>'Sold'] ;
        $status[] =['id'=>'not_released','name'=>'Not Released'] ;
        $status[] =['id'=>'blocked','name'=>'Blocked'] ;
        $status[] =['id'=>'booked_by_agent','name'=>'Booked By Agent'] ;
        $status[] =['id'=>'archived','name'=>'Archived'] ;

        if($propertyTypeId==APARTMENTID || $propertyTypeId==PENTHOUSEID)
        {
            $phases = $project->projectPhase()->lists('id');
            $buildings = Building::whereIn('phase_id', $phases)->get()->toArray();
            $count =(count($buildings)>$count)?count($buildings) : $count;

            $apartmentunitVariants = $this->getVariants($project, APARTMENTID); 
            $count =(count($apartmentunitVariants)>$count)?count($apartmentunitVariants) : $count;
            $penthouseunitVariants = $this->getVariants($project, PENTHOUSEID); 
            $count =(count($penthouseunitVariants)>$count)?count($penthouseunitVariants) : $count;
            $flag =true;

        }
        else
        {

            $phases = $project->projectPhase()->where('status','not_live')->get()->toArray();
            $count =(count($phases)>$count)?count($phases) : $count;
            $unitVariants = $this->getVariants($project, $propertyTypeId); 
            $count =(count($unitVariants)>$count)?count($unitVariants) : $count;

        }
        
        for($i=0 ; $i<$count ;$i++)
        {
           
            
           if($flag)
           {
              
               $data[$i]['Apartment Variant'] = (isset($apartmentunitVariants[$i])) ? $apartmentunitVariants[$i]['unit_variant_name']:''; 
               $data[$i]['Apartment Variant Id'] = (isset($apartmentunitVariants[$i])) ? $apartmentunitVariants[$i]['id']:'';    



               $data[$i]['Penthouse Variant'] = (isset($penthouseunitVariants[$i])) ? $penthouseunitVariants[$i]['unit_variant_name']:''; 
               $data[$i]['Penthouse Variant Id'] = (isset($penthouseunitVariants[$i])) ? $penthouseunitVariants[$i]['id']:'';    
               
          
                $data[$i]['Building'] = (isset($buildings[$i])) ? $buildings[$i]['building_name']:''; 
                $data[$i]['Building Id'] = (isset($buildings[$i])) ? $buildings[$i]['id']:'';    
                $data[$i]['Building FLOORS'] = (isset($buildings[$i])) ? $buildings[$i]['no_of_floors']:'';      
              
               
           }
           else{
                
               $data[$i]['Variant'] = (isset($unitVariants[$i])) ? $unitVariants[$i]['unit_variant_name']:''; 
               $data[$i]['Variant Id'] = (isset($unitVariants[$i])) ? $unitVariants[$i]['id']:'';    
               
              
                $data[$i]['Phase'] = (isset($phases[$i])) ? $phases[$i]['phase_name']:''; 
                $data[$i]['Phase Id'] = (isset($phases[$i])) ? $phases[$i]['id']:'';    
               
            
            }
 
           $data[$i]['Direction'] = (isset($defaultDirection[$i])) ? $defaultDirection[$i]['label']:''; 
           $data[$i]['Direction Id'] = (isset($defaultDirection[$i])) ? $defaultDirection[$i]['id']:'';    
            
           $data[$i]['Status'] = (isset($status[$i])) ? $status[$i]['name']:''; 
           $data[$i]['Status Id'] = (isset($status[$i])) ? $status[$i]['id']:''; 
            
           $data[$i]['Views'] = (isset($projectAttributes[$i])) ? $projectAttributes[$i]['label']:''; 
   
        }
        
        $filename = property_type_slug($project->project_title.'-'.get_property_type( $propertyTypeId ).'-config'); 
        Excel::create($filename, function($excel)use($data) {

        $excel->sheet('config', function($sheet)use($data) {
             $sheet->fromArray($data);
        });

        })->export('csv');
      
  }
    

  public function agentUnitExport($projectId)
  {

        $project = Project::find($projectId);
        $projectPropertyTypes = $project->projectPropertyTypes()->get()->toArray();
        $data = $projectUnits = [];

        foreach ($projectPropertyTypes as $propertyType) {
            $propertyTypeId = $propertyType['property_type_id'];
            $projectpropertyTypeId = $propertyType['id'];
            $unitTypeIds = UnitType::where( 'project_property_type_id', $projectpropertyTypeId )->get()->lists('id');
            $unitVariantIds = UnitVariant::whereIn('unit_type_id',$unitTypeIds)->get()->lists('id');
            $units = Unit ::whereIn('unit_variant_id',$unitVariantIds)->get()->toArray();
            $projectUnits [$propertyTypeId] = $units;
        }
        
      $i=1;
       
        // Set Data Black If No Record To Avoid Blank CSV File
        $data[$i]['Property Type'] = '';
        $data[$i]['Unit'] = '';
        $data[$i]['Unit Id'] = '';
        $data[$i]['Has Access (Yes/No)'] = '';
      
      
      if(!empty($projectUnits))
      {
        foreach($projectUnits as $propertyTypeId => $units)
        {  
            foreach($units as  $unit)
            {
            $data[$i]['Property Type'] = get_property_type($propertyTypeId);
            $data[$i]['Unit'] = $unit['unit_name'];
            $data[$i]['Unit Id'] = $unit['id'];
            $data[$i]['Has Access (Yes/No)'] = '';
            $i++;
            }
        }
      }
      
                
        $filename = property_type_slug($project->project_title.'-units-config'); 
        Excel::create($filename, function($excel)use($data) {

        $excel->sheet('config', function($sheet)use($data) {
             $sheet->fromArray($data);
        });

        })->export('csv');
      
  }    

  public function downloadSampleFile($projectId,$filename){
       
        $file= public_path() . '/cfsamplefile/'.$filename;
        $headers = array(
               'Content-Type' => 'text/csv',
            );
        return \Response::download($file, $filename, $headers);
 }    

    
  public function getVariants($project ,$propertyTypeId)
  { 
      $unitVariants =[];
      $projectPropertyType = $project->projectPropertyTypes()->where( 'property_type_id', $propertyTypeId )->first(); 
      if(!empty($projectPropertyType))
      {
           $projectPropertyTypeId= $projectPropertyType->id;
           $unitTypeIds = UnitType::where( 'project_property_type_id', $projectPropertyTypeId )->get()->lists('id');
           $unitVariants = UnitVariant::whereIn('unit_type_id',$unitTypeIds)->get()->toArray();
      }
      
      return $unitVariants;
  }
    
  public function unPublishProject($projectId)
  {
        $project = Project::find($projectId);
        $project->status = 'unpublished';
        $project->save();
        
        Session::flash('success_message','Project Unpublished');

        $projectJson = ProjectJson::where('project_id', $projectId)
                                ->where('type', 'step_one')->get()->first();
        $projectJson->project_json = [];
        $projectJson->save();

        $projectJson = ProjectJson::where('project_id', $projectId)
                                ->where('type', 'step_two')->get()->first();
        $projectJson->project_json = [];
        $projectJson->save(); 
      
       return redirect("/admin/project/" . $projectId . "/summary");
  }

  public static function get_unit_selling_amount($unitId){
     $sender_url = BOOKING_SERVER_URL;
     $sender_url .= GET_SELLING_AMOUNT;

     /* $_GET Parameters to Send */
     //$params = array('unit_id' => $unitId);
     $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&unit_id=".$unitId;   

     /* Update URL to container Query String of Paramaters */
     //$sender_url .= '?' . http_build_query($params);

     $c = curl_init();
     curl_setopt($c, CURLOPT_URL, $sender_url);
     curl_setopt($c, CURLOPT_POST, 1);
     curl_setopt($c, CURLOPT_POSTFIELDS, $params);   

     curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
     curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
     curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
     curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
     $o = curl_exec($c); 

     if (curl_errno($c)) {
        //$result_json  = NULL;
         $result_json  = 0;
     }
     else{

         $result_json  = (json_decode($o)!='')?json_decode($o):0;

      }

      /* Check HTTP Code */
      $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

      curl_close($c); 

      return $result_json;      
    }  
    
  public static function get_unit_booking_amount($unitId){
     $sender_url = BOOKING_SERVER_URL;
     $sender_url .= GET_BOOKING_AMOUNT;

     /* $_GET Parameters to Send */
     //$params = array('unit_id' => $unitId);
      $params = "token=".config('constant.api_token')."&user=".config('constant.api_user')."&unit_id=".$unitId; 

     /* Update URL to container Query String of Paramaters */
    // $sender_url .= '?' . http_build_query($params);

     $c = curl_init();
     curl_setopt($c, CURLOPT_URL, $sender_url);
     curl_setopt($c, CURLOPT_POST, 1);
     curl_setopt($c, CURLOPT_POSTFIELDS, $params);    

     curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
     curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
     curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
     curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
     $o = curl_exec($c); 

     if (curl_errno($c)) {
        //$result_json  = NULL;
         $result_json  = 0;
     }
     else{

         $result_json  = (json_decode($o)!='')?json_decode($o):0;

      }

      /* Check HTTP Code */
      $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

      curl_close($c); 

      return $result_json;      
    }
    
    function getProjectName(Request $request)
    {
        $search = $request->input('project_name');
        $userId = $request->input('userId');
        
        $userProjects = getUserAssignedProject($userId);
        $projectIds =[]; 
        foreach($userProjects as $userProject)
        {
            $projectIds[] =$userProject['project_id'];
        }
        $projects = Project :: where('project_title','like',$search.'%')->whereNotIn('id',$projectIds)->get()->lists('project_title','id');
        return response()->json([
                    'code' => 'project_autocomplete',
                    'message' => '',
                    'data' => [
                        'projects' => $projects,
 
                    ]
                        ], 201);
    }
 
}
