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

class ProjectController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {

        if (!hasPermission(0, ['read_project', 'configure_project']))
            abort(403);

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
 
        $project = $projectRepository->createProject($request->all());
        if ($project !== null) {
            return redirect("/admin/project/" . $project->id );
        }
    }

    public function show($id, ProjectRepository $projectRepository) {
                
        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->whereNotIn('meta_key', ['master', 'google_earth', 'skyview', 'breakpoints', 'cf'])->get()->toArray();
        $projectpropertyTypes = $project->projectPropertyTypes()->get()->toArray(); 
        $defaultunitTypes = get_all_unit_type();
        $propertyTypes = $unitTypes = $projectunitTypes = $projectCost = $propertytypeAttributes = [];
        
        foreach ($projectpropertyTypes as $projectpropertyType)
        {
            $propertyTypes[$projectpropertyType['property_type_id']]=get_property_type($projectpropertyType['property_type_id']);
        }
       
        
        foreach ($projectMeta as $meta) {
            $projectCost[$meta['meta_key']] = ['ID' => $meta['id'], 'VALUE' => $meta['meta_value']];
        }
        
     
        foreach ($project->projectPropertyTypes as $projectPropertyType) {
            
            $unitTypes = $project->getUnitTypesToArray($projectPropertyType->id);
            foreach ($unitTypes as $unitType)
            {
                if(!isset($defaultunitTypes[$projectPropertyType->property_type_id][$unitType->unittype_name]))
                {
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

        foreach ($projectMeta as $meta) {
            $projectCost[$meta['meta_key']] = ['ID' => $meta['id'], 'VALUE' => $meta['meta_value']];
        }
        
     
        foreach ($project->projectPropertyTypes as $projectPropertyType) {
            
            $unitTypes = $project->getUnitTypesToArray($projectPropertyType->id);
            foreach ($unitTypes as $unitType)
            {
                if(!isset($defaultunitTypes[$projectPropertyType->property_type_id][$unitType->unittype_name]))
                {
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
        $phases = $project->projectPhase()->where('status','!=','archive')->where('phase_name','!=','Default')->get()->toArray();
        $projectpropertyTypes = $project->projectPropertyTypes()->get()->toArray();
         
        $propertyTypes = $propertyTypeUnitData =$phaseData = $unitTypeData = $count=[];
        
        foreach ($projectpropertyTypes as $projectpropertyType)
        {
            $propertyTypes[$projectpropertyType['property_type_id']]=get_property_type($projectpropertyType['property_type_id']);
            
            $unitTypes = ProjectPropertyType::find($projectpropertyType['id'])->projectUnitType()->get()->toArray();
                        
            foreach($unitTypes as $unitType)
            {
                $variants = \CommonFloor\UnitType::find($unitType['id'])->unitTypeVariant()->get()->toArray(); 
                    foreach($variants as $variant)
                    { 
                        $units = \CommonFloor\Unit::where('unit_variant_id',$variant['id'])->get()->toArray(); 
                        foreach ($units as $unit)
                        {                            
                            $phaseData[$unit['phase_id']] = \CommonFloor\Phase::find($unit['phase_id'])->phase_name;
                            $unitTypeData[$unitType['unittype_name']] = Defaults::find($unitType['unittype_name'])->label;
                            
                            if(!isset($propertyTypeUnitData[$projectpropertyType['id']][$unit['phase_id']][$unitType['unittype_name']]))
                            {
                                $propertyTypeUnitData[$projectpropertyType['id']][$unit['phase_id']][$unitType['unittype_name']]['available'] =0;
                                $propertyTypeUnitData[$projectpropertyType['id']][$unit['phase_id']][$unitType['unittype_name']]['sold'] =0;
                                $propertyTypeUnitData[$projectpropertyType['id']][$unit['phase_id']][$unitType['unittype_name']]['not_released'] =0;
                                $propertyTypeUnitData[$projectpropertyType['id']][$unit['phase_id']][$unitType['unittype_name']]['blocked'] =0;     
                            }

                                $propertyTypeUnitData[$projectpropertyType['id']][$unit['phase_id']][$unitType['unittype_name']]['available'] +=($unit['availability']=='available')?1:0;
                                $propertyTypeUnitData[$projectpropertyType['id']][$unit['phase_id']][$unitType['unittype_name']]['sold'] +=($unit['availability']=='sold')?1:0;
                                $propertyTypeUnitData[$projectpropertyType['id']][$unit['phase_id']][$unitType['unittype_name']]['not_released'] +=($unit['availability']=='not_released')?1:0;
                                $propertyTypeUnitData[$projectpropertyType['id']][$unit['phase_id']][$unitType['unittype_name']]['blocked'] +=($unit['availability']=='blocked')?1:0;       
                            
                        }
                        
                    }
                
            }
            
        }
        
        ksort($propertyTypes);
        $projectData =$project->toArray();
        $projectData['master'] = unserialize($projectData['master']);
        $projectData['breakpoints'] = unserialize($projectData['breakpoints']);
                
 
        return view('admin.project.projectsummary')
                        ->with('project', $projectData)
                        ->with('phases', $phases)
                        ->with('projectpropertyTypes', $projectpropertyTypes)
                        ->with('propertyTypeUnitData', $propertyTypeUnitData)
                        ->with('phaseData', $phaseData)
                        ->with('unitTypeData', $unitTypeData)
                        ->with('propertyTypes', $propertyTypes)
                         ->with('current', 'summary');
 
    }

    //added by Surekha//
    public function loadMasterSvgTool($id, ProjectRepository $projectRepository) {
        
        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->whereIn('meta_key', ['master', 'google_earth', 'skyview', 'breakpoints'])->get()->toArray();
        $svgImages = [];

        foreach ($projectMeta as $metaValues) {

            if ('master' === $metaValues['meta_key']) {
                $masterImages = unserialize($metaValues['meta_value']);

                if (!empty($masterImages)) {
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
                    $svgImages[$metaValues['meta_key']]['IMAGE'] = url() . "/projects/" . $id . "/" . $metaValues['meta_key'] . "/" . $imageName;
                }
            }
        }
        

        return view('admin.project.mastersvgtool')
                        ->with('project', $project->toArray())
                        ->with('svgImage', $svgImages['master'][12]['IMAGE'])
                        ->with('current', 'mastersvgtool');
    }

}
