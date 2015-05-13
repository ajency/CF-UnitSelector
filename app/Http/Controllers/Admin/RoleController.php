<?php

namespace CommonFloor\Http\Controllers\Admin;

use CommonFloor\Http\Requests;
use CommonFloor\Http\Controllers\Controller;
use CommonFloor\Role;
use Illuminate\Http\Request;
use CommonFloor\Permission;

class RoleController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $roles = Role::orderBy('name')->get()->toArray();
        return view('admin.role.list')
                        ->with('roles', $roles)
                        ->with('menuFlag', FALSE);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        $permissions = Permission::all()->toArray();
        return view('admin.role.add')->with('permissions', $permissions)
                        ->with('menuFlag', FALSE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request) {
        $name = $request->input('name');

        $role = new Role();
        $role->name = property_type_slug($name);
        $role->display_name = $name;
        $role->save();
        $roleId = $role->id;

        $permissions = $request->input('permissions');

        if (!empty($permissions)) {
           $role->attachPermissions($permissions);
        
        }

        $addanother = $request->input('addanother');

        if ($addanother == 1)
            return redirect("/admin/role/create");
        else
            return redirect("/admin/role/" . $roleId . "/edit");
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
    public function edit($id) {
        $role = Role::find($id);
        $permissions = Permission::all()->toArray();
        $permissionroleData = $role->perms()->get()->toArray();
        $permissionrole = [];
        foreach ($permissionroleData as $permission) {
            $permissionrole[] = $permission['id'];
        }

        return view('admin.role.edit')->with('role', $role->toArray())
                        ->with('permissions', $permissions)
                        ->with('permissionrole', $permissionrole)
                        ->with('menuFlag', FALSE);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request) {

        $name = $request->input('name');

        $role = Role::find($id);
        $role->name = property_type_slug($name);
        $role->display_name = $name;
        $role->save();


        $permissions = $request->input('permissions');

        if (!empty($permissions)) {
           $role->perms()->sync([]); 
           $role->attachPermissions($permissions);
        
        }
        

        $addanother = $request->input('addanother');

        if ($addanother == 1)
            return redirect("/admin/role/create");
        else
            return redirect("/admin/role/" . $id . "/edit");
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
