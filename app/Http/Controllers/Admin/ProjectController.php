<?php

namespace CommonFloor\Http\Controllers\admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CommonFloor\Repositories\ProjectRepository;
use CommonFloor\Project;

class ProjectController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {

        $projects = Project::all()->toArray(); 
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
        return view('admin.project.add')->with('menuFlag', FALSE);   ;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request, ProjectRepository $projectRepository) {

        $project = $projectRepository->createProject($request->all());
        if ($project !== null) {
            return redirect("/admin/project");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);
        $projectMeta = $project->projectMeta()->get()->toArray(); 
        return view('admin.project.settings')
                        ->with('project', $project->toArray())
                        ->with('project_meta', $projectMeta)
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

    public function svg($id, ProjectRepository $projectRepository) {
        $project = $projectRepository->getProjectById($id);

        $googleearthPath = public_path() . "/projects/" . $id . "/google_earth/";
        $masterPath = public_path() . "/projects/" . $id . "/master/";
        $skyviewPath = public_path() . "/projects/" . $id . "/skyview/";

        $googleearthImage = glob($googleearthPath . "*.*");
        $masterImage = glob($masterPath . "*.*");
        $skyviewImage = glob($skyviewPath . "*.*");


        if (isset($googleearthImage[0])) {
            $googleearthImagepath = explode("public", $googleearthImage[0]);
            $googleearthImagepath = url() . $googleearthImagepath[1];
        } else
            $googleearthImagepath = '';



        if (isset($masterImage[0])) {
            $masterImagepath = explode("public", $masterImage[0]);
            $masterImagepath = url() . $masterImagepath[1];
        } else
            $masterImagepath = '';
        
        foreach ($skyviewImage as $key=>$skyview)
        {
            $skyviewImagepath = explode("public", $skyview);
            $skyviewImage[$key] = url() . $skyviewImagepath[1];
        }

        return view('admin.project.svg')
                        ->with('project', $project->toArray())
                        ->with('googleearthImgage', $googleearthImagepath)
                        ->with('masterImage', $masterImagepath)
                        ->with('skyviewImage', $skyviewImage)
                        ->with('current', 'svg');
    }

}
