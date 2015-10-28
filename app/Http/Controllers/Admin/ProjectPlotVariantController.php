<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;
use CommonFloor\UnitType;
use CommonFloor\VariantRoom;
use CommonFloor\UnitVariant;
use CommonFloor\ProjectPropertyType;
use CommonFloor\RoomType;
use CommonFloor\Media;
use CommonFloor\VariantMeta;
use CommonFloor\Defaults;
use \File;
use \Session;

class ProjectPlotVariantController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    
    public function index($id, ProjectRepository $projectRepository) {
 
        $project = $projectRepository->getProjectById($id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $unitTypes = [];
        $projectPropertytypeId = 0;
        foreach ($projectPropertytype as $propertyTypes) {
            if ($propertyTypes['property_type_id'] == PLOTID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType) {
            $unitTypeIdArr[] = $unitType['id'];
            $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
            $unitTypes[$unitType['id']] = $unitTypeName;
        }

        $unitvariantArr = UnitVariant::whereIn('unit_type_id', $unitTypeIdArr)->orderBy('unit_variant_name')->get()->toArray();

        return view('admin.project.variants.plot.list')
                        ->with('project', $project->toArray())
                        ->with('unitTypes', $unitTypes)
                        ->with('unit_variant_arr', $unitvariantArr)
                        ->with('current', 'plots-variant');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($id, ProjectRepository $projectRepository) {
 
        $project = $projectRepository->getProjectById($id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];
        $projectPropertytypeId = 0;
        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == PLOTID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

       $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType) {
            $unitTypeIdArr[] = $unitType['id'];
            $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
            $unitTypes[$unitType['id']] = $unitTypeName;
        }
 
        $propertyTypeAttributes = ProjectPropertyType::find($projectPropertytypeId)->attributes->toArray();
        

        return view('admin.project.variants.plot.add')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with('unitTypes', $unitTypes)
                        ->with('propertyTypeAttributes', $propertyTypeAttributes)
                        ->with('current', '');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($project_id, Request $request) {
 
        $unitVariant = new UnitVariant();
        $unitVariant->unit_variant_name = ucfirst($request->input('unit_variant_name'));
        $unitVariant->unit_type_id = $request->input('unit_type');
        $unitVariant->size = $request->input('size');
        $unitVariant->per_sq_ft_price = $request->input('per_sq_ft_price');
        $attributedata = $request->input('attributes');
        $variantattributedata=[];
        if(!empty($attributedata))
        {
            foreach ($attributedata as $key=>$value)
               $variantattributedata[$key]= $value;    
        }
        $attributeStr = serialize( $variantattributedata );
        $unitVariant->variant_attributes = $attributeStr;
 
        $unitVariant->save();
        $unitVariantID = $unitVariant->id;

        $targetDir = public_path() . "/projects/" . $project_id . "/variants/" . $unitVariantID . "/";
        $tempDir = public_path() . "/projects/" . $project_id . "/variants/temp/";
        File::makeDirectory($targetDir, $mode = 0755, true, true);
        
        $image_gallery = $request->input('image_gallery');
        if(!empty($image_gallery))
        {
            foreach ($image_gallery as $mediaId)
            {
                $media = Media::find($mediaId);
                $media->mediable_id = $unitVariantID;
                $media->save();

                $imageName = $media->image_name;
                if(File::exists($tempDir.$imageName))
                {
                    copy($tempDir.$imageName, $targetDir.$imageName);
                    unlink($tempDir.$imageName);
                }
            }
        }
        
        $variantMeta = new VariantMeta();
        $variantMeta->unit_variant_id = $unitVariantID;
        $variantMeta->meta_key = 'gallery';
        $variantMeta->meta_value = serialize($image_gallery);
        $variantMeta->save();
        
        $externalimage = $request->input('image_external_3d_id');
        if($externalimage!='')
        {
            $variantMeta = new VariantMeta();
            $variantMeta->unit_variant_id = $unitVariantID;
            $variantMeta->meta_key = 'external-3d';
            $variantMeta->meta_value = $externalimage;
            $variantMeta->save();
            $media = Media::find($externalimage);
            $media->mediable_id = $unitVariantID;
            $media->save();

            $imageName = $media->image_name;
            if(File::exists($tempDir.$imageName))
            {
                copy($tempDir.$imageName, $targetDir.$imageName);
                unlink($tempDir.$imageName);
            }
        } 
        
        Session::flash('success_message','Variant Successfully Created');
        return redirect("/admin/project/" . $project_id . "/plots-variant/" . $unitVariantID . '/edit');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($project_id, $id, ProjectRepository $projectRepository) {
  
        $unitVariant = UnitVariant::find($id);
        $project = $projectRepository->getProjectById($project_id);
        $projectPropertytype = $project->projectPropertyTypes()->get()->toArray();
        $propertyTypeArr = [];

        foreach ($projectPropertytype as $propertyTypes) {
            $propertyTypeArr [] = $propertyTypes['property_type_id'];

            if ($propertyTypes['property_type_id'] == PLOTID)
                $projectPropertytypeId = $propertyTypes['id'];
        }

        $unitTypeArr = UnitType::where('project_property_type_id', $projectPropertytypeId)->get()->toArray();
        $unitTypeIdArr = [];
        foreach ($unitTypeArr as $unitType) {
            $unitTypeIdArr[] = $unitType['id'];
            $unitTypeName = Defaults::find($unitType['unittype_name'])->label;
            $unitTypes[$unitType['id']] = $unitTypeName;
        }

        $propertyTypeAttributes = ProjectPropertyType::find($projectPropertytypeId)->attributes->toArray();



        $variantMeta = $unitVariant->variantMeta()->get()->toArray();
        $layouts = [];

        foreach ($variantMeta as $meta) {
            $metakey = $meta['meta_key'];
            if ($metakey == 'gallery') {
                $metaValue = unserialize($meta['meta_value']);
                if (!empty($metaValue)) {
                    foreach ($metaValue as $mediaId) {
                        if (is_numeric($mediaId)) {
                            $imageName = Media::find($mediaId)->image_name;
                            $layouts['gallery'][$mediaId]['ID'] = $mediaId;
                            $layouts['gallery'][$mediaId]['IMAGE'] = url() . "/projects/" . $project_id . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                        }
                    }
                }
            } else {
                $metakeyData = explode("-", $metakey);
                $level = $metakeyData[0];
                $type = $metakeyData[1];
                $mediaId = $meta['meta_value'];
                if (is_numeric($mediaId)) {
                    $imageName = Media::find($mediaId)->image_name;
                    $layouts[$level][$type]['ID'] = $mediaId;
                    $layouts[$level][$type]['IMAGE'] = url() . "/projects/" . $project_id . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                }
            }
        }


        return view('admin.project.variants.plot.edit')
                        ->with('project', $project->toArray())
                        ->with('project_property_type', $propertyTypeArr)
                        ->with( 'projectPropertyTypeID', $projectPropertytypeId )
                        ->with('propertyTypeAttributes', $propertyTypeAttributes)
                        ->with('unitTypes', $unitTypes)
                        ->with('unitVariant', $unitVariant->toArray())
                        ->with('layouts', $layouts)
                        ->with('current', '');
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($project_id, $id, Request $request) {
        
        if($isUnitBlocked)
        {
           Session::flash('error_message','Error !!! Cannot update variant as its unit is used for booking');    
           return redirect("/admin/project/" . $project_id . "/plots-variant/" . $id . '/edit');
        }
        
        $unitVariant = UnitVariant::find($id);
        $unitVariant->unit_variant_name = ucfirst($request->input('unit_variant_name'));
        $unitVariant->unit_type_id = $request->input('unit_type');
        $unitVariant->size = $request->input('size');
        $unitVariant->per_sq_ft_price = $request->input('per_sq_ft_price');
        $attributedata = $request->input('attributes');
        $variantattributedata=[];
        if(!empty($attributedata))
        {
            foreach ($attributedata as $key=>$value)
               $variantattributedata[$key]= $value;    
        }
        $attributeStr = serialize( $variantattributedata );
        $unitVariant->variant_attributes = $attributeStr;
        $unitVariant->save();
        
        Session::flash('success_message','Variant Successfully Updated');
        return redirect("/admin/project/" . $project_id . "/plots-variant/" . $id . '/edit');
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

}
