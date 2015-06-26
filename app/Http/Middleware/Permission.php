<?php namespace CommonFloor\Http\Middleware;

use Closure;

class Permission {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
                $resources =['admin.project.index'=>['read_project'],
                             'admin.project.create'=>['add_project'],
                             'admin.project.store'=>['add_project'],
                             'admin.project.edit'=>['configure_project'], 
                             'admin.project.show'=>['read_project'], 
                             'admin.project.destroy'=>['configure_project'], 
                             'admin.project.update'=>['configure_project'],
                             'admin.project.media.store'=>['configure_project'], 
                             'admin.project.media.destroy'=>['configure_project'], 
                    
                             'admin.phase.store'=>['configure_project'], 
                             'admin.phase.update'=>['configure_project'], 
                             'admin.phase.destroy'=>['configure_project'], 
                    
                             'admin.project.unittype.destroy'=>['configure_project'], 
                    
                             'admin.project.bunglow-variant.index'=>['configure_project'],
                             'admin.project.bunglow-variant.create'=>['configure_project'],
                             'admin.project.bunglow-variant.store'=>['configure_project'],
                             'admin.project.bunglow-variant.edit'=>['configure_project'],
                             'admin.project.bunglow-variant.update'=>['configure_project'],
                    
                             'admin.project.apartment-variant.index'=>['configure_project'],
                             'admin.project.apartment-variant.create'=>['configure_project'],
                             'admin.project.apartment-variant.store'=>['configure_project'],
                             'admin.project.apartment-variant.edit'=>['configure_project'],
                             'admin.project.apartment-variant.update'=>['configure_project'],
                    
                             'admin.project.plots-variant.index'=>['configure_project'],
                             'admin.project.plots-variant.create'=>['configure_project'],
                             'admin.project.plots-variant.store'=>['configure_project'],
                             'admin.project.plots-variant.edit'=>['configure_project'],
                             'admin.project.plots-variant.update'=>['configure_project'],
                    
                             'admin.variant.media.store'=>['configure_project'],
                             'admin.variant.media.destroy'=>['configure_project'],
                                                 
                             'admin.project.building.index'=>['configure_building'],
                             'admin.project.building.create'=>['configure_building'],
                             'admin.project.building.store'=>['configure_building'],
                             'admin.project.building.edit'=>['configure_building'],
                             'admin.project.building.update'=>['configure_building'],

                             'admin.building.media.store'=>['configure_building'], 
                             'admin.building.media.destroy'=>['configure_building'],   
                    
                         
                             'admin.project.variant.media.store'=>['configure_project'],
                             
                             'admin.project.roomtype.create'=>['configure_project'],
                             'admin.project.roomtype.store'=>['configure_project'],
                             'admin.project.roomtype.edit'=>['configure_project'],
                             'admin.project.roomtype.update'=>['configure_project'],
                             'admin.project.roomtype.destroy'=>['configure_project'],   
                             
                             'admin.project.bunglow-unit.index'=>['configure_unit','unit_status_update'],
                             'admin.project.bunglow-unit.create'=>['configure_unit'],
                             'admin.project.bunglow-unit.store'=>['configure_unit'],
                             'admin.project.bunglow-unit.edit'=>['configure_unit','unit_status_update'],
                             'admin.project.bunglow-unit.update'=>['configure_unit','unit_status_update'],
                    
                             'admin.project.apartment-unit.index'=>['configure_unit','unit_status_update'],
                             'admin.project.apartment-unit.create'=>['configure_unit'],
                             'admin.project.apartment-unit.store'=>['configure_unit'],
                             'admin.project.apartment-unit.edit'=>['configure_unit','unit_status_update'],
                             'admin.project.apartment-unit.update'=>['configure_unit','unit_status_update'],
                    
                             'admin.project.plots-unit.index'=>['configure_unit','unit_status_update'],
                             'admin.project.plots-unit.create'=>['configure_unit'],
                             'admin.project.plots-unit.store'=>['configure_unit'],
                             'admin.project.plots-unit.edit'=>['configure_unit','unit_status_update'],
                             'admin.project.plots-unit.update'=>['configure_unit','unit_status_update'],

                    
                             'admin.role.index'=>['manage_roles'],
                             'admin.role.create'=>['manage_roles'],
                             'admin.role.store'=>['manage_roles'],
                             'admin.role.edit'=>['manage_roles'],
                             'admin.role.update'=>['manage_roles'],

                             'admin.user.index'=>['manage_users'],
                             'admin.user.create'=>['manage_users'],
                             'admin.user.store'=>['manage_users'],
                             'admin.user.edit'=>['manage_users'],
                             'admin.user.update'=>['manage_users'],
                             
                             'admin.agent.index'=>['manage_users'],
                             'admin.agent.create'=>['manage_users'],
                             'admin.agent.store'=>['manage_users'],
                             'admin.agent.edit'=>['manage_users'],
                             'admin.agent.update'=>['manage_users'],

                            ];
                
                $uri        =['admin/project/{project}/cost'=>['configure_project'],
                              'admin/project/{project}/costupdate'=>['configure_project'],
                              'admin/project/{project}/filters'=>['configure_project'],
                              'admin/project/{project}/updatefilters'=>['configure_project'],
                              'admin/project/{project}/svg'=>['configure_project'],
                              'admin/project/{project}/summary'=>['read_project'],
                              'admin/project/{project}/getphasedata/{phase}'=>['configure_project'],
                              'admin/project/{project}/validateprojectphase'=>['configure_project'],
                              'admin/project/{project}/projectpublishdata'=>['publish_project'],
                              'admin/project/{project}/updateprojectstatus'=>['publish_project'],
                              'admin/project/{project}/unpublishproject'=>['publish_project'],
                              'admin/project/validateprojecttitle'=>['configure_project'], 
                              'admin/project/{project}/bunglow-variant/{id}/deletelevel'=>['configure_project'], 
                              'admin/project/{project}/roomtype/{id}/deleteattribute'=>['configure_project'],
                              'admin/project/{project}/roomtype/{id}/deletevariantrroom'=>['configure_project'],
                              'admin/project/{project}/media/updatebreakpoint'=>['configure_project'],
                              'admin/building/{id}/media/updatebreakpoint'=>['configure_building'],
                              'admin/building/validatebuildingname'=>['configure_building'],
                              'admin/project/{project}/roomtype/{roomtype}'=>['configure_project'],
                              'admin/project/{project}/roomtype/{id}/getroomtypeattributes'=>['configure_project'],
                              'admin/project/{project}/apartment-variant/getpropertytypedata'=>['configure_project'],
                              'admin/project/{project}/apartment-variant/getunittypevariants'=>['configure_unit'],
                              'admin/project/{project}/apartment-unit/getavailableposition'=>['configure_unit'],
                              'admin/project/{project}/apartment-unit/validatebuildingunitname'=>['configure_unit'],
                              'admin/project/{project}/bunglow-unit/validateunitname'=>['configure_unit'],
                              'admin/user/validateuseremail'=>['manage_users'], 
                              'admin/user/validateuserphone'=>['read_project'], 
                              'admin/user/{id}/profile'=>['user_profile'], 
                              'admin/user/{id}/profileupdate'=>['user_profile'],
                              'admin/user/{id}/changepassword'=>['read_project'],
                              'admin/agent/{id}/changepassword'=>['manage_users'],
                              'admin/user/{id}/userprojects'=>['manage_users'], 
                              'admin/user/{id}/deleteuserproject'=>['manage_users'], 
                              'admin/user/validateuserpassword'=>['manage_users'], 
                              'admin/project/{id}/master/authoring-tool'=>['configure_project'],
                              'admin/project/{project}/svg-tool'=>['configure_project'],
                              'admin/project/{project}/svg-tool/{svg_tool}'=>['configure_project'],
                              'admin/project/{projectid}/image/{imageid}'=>['configure_project'],
                              'admin/project/{id}/image/{imageid}/authoring-tool'=>['configure_project'],
                              'admin/project/{projectid}/image/{imageid}/duplicate_image_id/{image_id}'=>['configure_project'],
                              'admin/project/{projectid}/image/{imageid}/downloadSvg'=>['configure_project'],
                              'admin/project/{project}/apartment-unit/unitimport'=>['configure_unit'],
                              'admin/project/{project}/bunglow-unit/unitimport'=>['configure_unit'],
                              'admin/project/{project}/plots-unit/unitimport'=>['configure_unit'],
                              'admin/project/{project}/unitexport/{id}'=>['configure_unit'],
                              'admin/project/getprojectname'=>['manage_users'],
                              'admin/project/{project}/agentunitexport'=>['manage_users'],
                              'admin/agent/{id}/agentunitimport'=>['manage_users'],
                              
                ];
               
                
                $resourceName = $request->route()->getName();  
                $uriPath =$request->route()->getPath(); 

                
                if($uriPath != 'admin')
                {
                    if($resourceName!='' && isset($resources[$resourceName]))
                         $permission = $resources[$resourceName];
                     elseif(isset($uri[$uriPath]))  
                         $permission = $uri[$uriPath];
                     else
                        abort(403); 
 
                    $projectId = \Illuminate\Support\Facades\Route::input('project');  
                 
                    if(!in_array('user_profile', $permission))                   
                    {
                        //CK FOR USER ACCESS AND PERMISSION 
                        if(!hasPermission($projectId, $permission))
                             abort(403);
                        
                        /*Unit Auth*/
                        if($resourceName =='admin.project.bunglow-unit.edit')
                            $unitId = \Illuminate\Support\Facades\Route::input('bunglow_unit');
                        elseif($resourceName =='admin.project.plots-unit.edit')
                            $unitId = \Illuminate\Support\Facades\Route::input('plots_unit');
                        elseif($resourceName =='admin.project.apartment-unit.edit')
                            $unitId = \Illuminate\Support\Facades\Route::input('apartment_unit');
                        else
                            $unitId =0;
                        
                        if($unitId)
                        {
                            //if unit belongs to project
                            isValidUnit($projectId,$unitId);
                            
                            //If agent access units
                            if(isAgent())
                            {
                               if($unitId && !hasUnitAccess($unitId))
                                    abort(403);
                            }
                        }
                        /***/
                        
                        /*Variant Auth*/
                        if($resourceName =='admin.project.bunglow-variant.edit')
                            $variantId = \Illuminate\Support\Facades\Route::input('bunglow_variant');
                        elseif($resourceName =='admin.project.plots-variant.edit')
                            $variantId = \Illuminate\Support\Facades\Route::input('plots_variant');
                        elseif($resourceName =='admin.project.apartment-variant.edit')
                            $variantId = \Illuminate\Support\Facades\Route::input('apartment_variant');
                        else
                            $variantId =0;
                        
                        if($variantId)
                        {
                            //if variant belongs to project
                            isValidVariant($projectId,$variantId);
         
                        }
                        /****/
                        
                        
        
                    }
                }
		return $next($request);
	}

}
