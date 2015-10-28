var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var immutabilityHelpers = require('react-addons-update');


// event that our components are going to listen when change happens
var CHANGE_EVENT = 'change';

// Define initial data points
var _projectData = {}, _selected = null ;
var _unitStateData = {};
var _globalStateData = {"data":{"projectTitle":"", "projectLogo": "#", "buildings":[],"showShadow":false,"breakpoints":[0], "chosenBreakpoint": 0, "filterTypes":[],"search_entity":"project", "search_filters":{} , "applied_filters":{} , "isFilterApplied":false, "unitIndexToHighlight":0 } };


function getUnitTypeDetails(unitTypeId){
	unitTypeId = parseInt(unitTypeId);
	var unitTypeDetails = {};
	var unitTypes = [];
	var search_filters = _globalStateData.data.search_filters;
	var searchFilterUnitTypes = [];

	if(search_filters.length > 0)
		searchFilterUnitTypes = _globalStateData.data.search_filters.unitTypes;

	if(!_.isEmpty(_projectData)){
		unitTypes = _projectData.unit_types;

		unitTypeDetails = _.find(unitTypes, function(unitType){ 
			unitType.isSelected = false;

			if(unitType.id === unitTypeId){
				if(_.indexOf(searchFilterUnitTypes, unitTypeId)> -1){
					unitType.isSelected = true;
				}
				return unitType;
			}

		 });

	}

	return unitTypeDetails;
}

function getUnitTypeIdFromUnitVariantId(propertyType,unitVariantId){

	var variants;

	if(propertyType==="Apartments"){
		variants = _projectData.apartment_variants;

		unitVariant = _.findWhere(variants, {id: unitVariantId});

	}

	return unitVariant.unit_type_id;


}


function getPropertyVariantsAttributes(propertyType,variantId,key){

	var variants , result, propVariant;

	if(propertyType==="Apartments"){
		variants = _projectData.apartment_variants;

		propVariant = _.findWhere(variants, {id: variantId});

	}

	if(_.isUndefined(key)){
		result = propVariant;
	}
	else{
		result = propVariant.variant_attributes[key];

	}

	return result;
}

function getPropertyType(propertyId){
	propertyId = parseInt(propertyId);
	propertyTypes = _projectData.property_types;

	return propertyTypes[propertyId];
}

function getBuilding(buildingId){
	buildingId = parseInt(buildingId);
	buildings = _projectData.buildings;

	building = _.findWhere(buildings, {id: buildingId});

	return building;

}

function getPropertyVariantsById(propertyType,variantId,key){

	var variants;

	if(propertyType==="Apartments"){
		variants = _projectData.apartment_variants;

		propVariant = _.findWhere(variants, {id: variantId});

	}

	return propVariant[key];
}




function getUnitCount(propertyType,filters){
	var unitCount = {"total":[],"available":[], "filtered":[]};
	var units = [];
	var availableUnits = [];
	var totalUnitsInBuilding = [];
	var filteredUnits = [];

	var appliedFilters = filters;

	if (!_.isEmpty(_projectData)){
		units = _projectData.units;

		// get all units that have building associated to it
		totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });


		// from all the building units get only those units that are available
		availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });

		
			_.each(appliedFilters, function(appliedFilter, key){

				if(key==="unitTypes"){
					unitTypesTocheck = appliedFilter;

					if(unitTypesTocheck.length > 0){

						if(filteredUnits.length === 0){
							_.each(availableUnits, function(availableUnit){
								unitVariantId = availableUnit.unit_variant_id;
								unitTypeId = getUnitTypeIdFromUnitVariantId(propertyType,unitVariantId);

								if(_.indexOf(unitTypesTocheck, unitTypeId.toString()) > -1){
									filteredUnits.push(availableUnit);
								}
							});

						}else{
							_.each(filteredUnits , function(filUnit){
								unitVariantId = filUnit.unit_variant_id;
								unitTypeId = getUnitTypeIdFromUnitVariantId(propertyType,unitVariantId);
								
								if(unitTypesTocheck.indexOf(unitTypeId.toString()) > -1){
									console.log(unitTypeId+ ' is not available');
								}else{
									filteredUnits = _.reject(filteredUnits, function(el) { return el.id === filUnit.id; });
								}
							});
						}

					}					

				}






				if(key==="unitVariantNames"){
					variantTocheck = appliedFilter; 
					if(variantTocheck.length > 0){
						
						if(filteredUnits.length === 0){

							_.each(availableUnits, function(availableUnit){
								variantId = availableUnit.unit_variant_id;
								var propertyVariant = getPropertyVariantsById(propertyType,variantId,'unit_variant_name');

								if(_.indexOf(variantTocheck, propertyVariant.toString()) > -1){
									filteredUnits.push(availableUnit);
								}
							});

						}else{
							_.each(filteredUnits, function(filUnit){
								var innterPropertyVariant = getPropertyVariantsById(propertyType,filUnit.unit_variant_id,'unit_variant_name');
								
								if(variantTocheck.indexOf(innterPropertyVariant.toString()) > -1){
									console.log(innterPropertyVariant+ ' is not available');
								}else{
									filteredUnits = _.reject(filteredUnits, function(el) { return el.id === filUnit.id; });
								}
								
							});
						}						

					}		

				}



				if(key==="Flooring" || key==="Kitchen"){
					flooringTocheck = appliedFilter; 
					if(flooringTocheck.length > 0){

						if(filteredUnits.length === 0){

							_.each(availableUnits, function(availableUnit){
								variantId = availableUnit.unit_variant_id;
								var propertyVariant = getPropertyVariantsAttributes(propertyType,variantId,key);

								if(_.indexOf(flooringTocheck, propertyVariant.toString()) > -1){
									filteredUnits.push(availableUnit);
								}
							});

						}else{
							_.each(filteredUnits, function(filUnit){
								var innterPropertyVariant = getPropertyVariantsAttributes(propertyType,filUnit.unit_variant_id,key);
								
								if(flooringTocheck.indexOf(innterPropertyVariant.toString()) > -1){
									console.log(innterPropertyVariant+ ' is not available');
								}else{
									filteredUnits = _.reject(filteredUnits, function(el) { return el.id === filUnit.id; });
								}
								
							});
						}						

					}
				}




				if(key==="budget"){
					budgetTocheck = appliedFilter; 
					if(budgetTocheck.length > 0){
						var minBudget = budgetTocheck[0];
						var maxBudget = budgetTocheck[1];


						if(filteredUnits.length === 0){
							_.each(availableUnits , function(unit){
								if(unit.selling_amount>=minBudget && unit.selling_amount<=maxBudget){
									filteredUnits.push(unit);
								}
							});

						}else{
							_.each(filteredUnits , function(filUnit){
								if(filUnit.selling_amount<minBudget || filUnit.selling_amount>maxBudget){
									filteredUnits = _.reject(filteredUnits, function(el) { return el.id === filUnit.id; });
								}
							});
						}
						
					}
				}




				if(key==="area"){
					areaTocheck = appliedFilter; 
					if(areaTocheck.length > 0){
						var minArea = areaTocheck[0];
						var maxArea = areaTocheck[1];


						if(filteredUnits.length === 0){
							_.each(availableUnits , function(unit){

								variantId = unit.unit_variant_id;
								var builtUpArea = getPropertyVariantsById(propertyType,variantId,'super_built_up_area');

								if(builtUpArea>=minArea && builtUpArea<=maxArea){
									filteredUnits.push(unit);
								}
							});

						}else{
							_.each(filteredUnits , function(filUnit){

								variantId = filUnit.unit_variant_id;
								var builtUpArea = getPropertyVariantsById(propertyType,variantId,'super_built_up_area');

								if(builtUpArea<minArea || builtUpArea>maxArea){
									filteredUnits = _.reject(filteredUnits, function(el) { return el.id === filUnit.id; });
								}
							});
						}
						
					}
				}





				if(key==="floor" || key==="direction"){
					unitKeyTocheck = appliedFilter; 
					if(unitKeyTocheck.length > 0){

						if(filteredUnits.length === 0){
							_.each(availableUnits , function(unit){

								if(_.indexOf(unitKeyTocheck, unit[key].toString()) > -1){
									filteredUnits.push(unit);
								}
							});

						}else{
							_.each(filteredUnits, function(filUnit){
								
								if(unitKeyTocheck.indexOf(filUnit[key].toString()) > -1){
									console.log(filUnit[key]+ ' is not available');
								}else{
									filteredUnits = _.reject(filteredUnits, function(el) { return el.id === filUnit.id; });
								}
								
							});
						}			
						
					}
				}




				if(key==="views"){
					viewsTocheck = appliedFilter; 
					if(viewsTocheck.length > 0){

						if(filteredUnits.length === 0){
							_.each(availableUnits , function(unit){

								if(unit.views.length>0){
									_.each(unit.views , function(view){

										if(_.indexOf(viewsTocheck, view.toString()) > -1){
											filteredUnits.push(unit);
										}

									});
								}								
							});

						}else{
							_.each(filteredUnits, function(filUnit){

								if(filUnit.views.length>0){
									_.each(filUnit.views , function(view){

										if(viewsTocheck.indexOf(view.toString()) > -1){
											console.log(view+ ' is not available');
										}else{
											filteredUnits = _.reject(filteredUnits, function(el) { return el.id === filUnit.id; });
										}

									});
								}else{
									filteredUnits = _.reject(filteredUnits, function(el) { return el.id === filUnit.id; });
								}								
								
							});
						}			
						
					}
				}




			});

				
		unitCount["total"] = totalUnitsInBuilding ;
		unitCount["available"] = availableUnits ;
		unitCount["filtered"] = filteredUnits ;
	}

	console.log(unitCount);
	console.log(appliedFilters);

	return unitCount;
} 

function getBuildingUnits(buildings, allUnits, allFilteredUnits){

	
	var buildingsWithUnits = [];
	
	_.each(buildings,function(building){
		
		buildingId = building.id;
		

		buildingUnits = [];
		
		availableBuildingUnits = [];
		
		unitVariants = [];
		
		filteredBuildingUnits = [];
		

		_.each(allUnits, function(unit){
			
			if(unit.building_id === buildingId){
				
				buildingUnits.push(unit);
				

				if(unit.availability === "available"){
					
					availableBuildingUnits.push(unit);
					
					
					// if the available unit is also present in filtered units then push it to the array of filteredbuildingUnits
					_.each(allFilteredUnits,function(filteredUnit){
						
						if(filteredUnit.id === unit.id){
							
							filteredBuildingUnits.push(unit);
							
						}
						
					});	
						
				}
				

			}
			unitVariants.push(unit.unit_variant_id);
			
		})

		// from all building units get start price
		unitPrices = [];
		unitPrices = _.pluck(buildingUnits, "selling_amount");
		minStartPrice = _.min(unitPrices);
		building.minStartPrice = minStartPrice;

		
		// get all unit data
		building.unitData = buildingUnits;

		
		// get available unit data
		building.availableUnitData = availableBuildingUnits;

		
		// get all filtered unit data
		building.filteredUnitData = filteredBuildingUnits;

		
		// get project unit types
		unitTypes = getSupportedUnitTypes("Apartments", buildingId);

		
		building.supportedUnitTypes = unitTypes;
		

		buildingsWithUnits.push(building);
		
	});
	
	return buildingsWithUnits;
}

function getApartmentUnitTypes(buildingId){

	var apartmentVariants = [];
	var apartmentUnitTypes = [];
	var buildingUnits = [];


	if(!_.isEmpty(_projectData)){

		// get all units in the project
		allUnits = _projectData.units;


		// based on buildingId passed either return all or only specific building's units 

		if (buildingId==="all") {
			buildingUnits = _.filter(allUnits , function(unit){ return unit; });
		}
		else{
			buildingUnits = _.filter(allUnits , function(unit){ if(unit.building_id == buildingId){return unit;} });
		}
		

		// get unique unit variant id for the above building units
		buildingUnitVariantIds = _.uniq(_.pluck(buildingUnits, 'unit_variant_id')); 

		
		unitTypes = [];

		// get all apartment variants
		apartmentVariants = _projectData.apartment_variants;

		// get only those apartment variants whose id is any of the buildingUnitVariantIds
		buildingUnitVariants = _.filter(apartmentVariants , function(apartmentVariant){ if( _.indexOf(buildingUnitVariantIds, apartmentVariant.id) > -1 ){return apartmentVariant;} });


		// get only unique unit Type ids 
		unitTypes = _.uniq((_.pluck(buildingUnitVariants, 'unit_type_id')));

	

		_.each(unitTypes, function(unitTypeId){
			unitTypeDetails = getUnitTypeDetails(unitTypeId);

			apartmentUnitTypes.push(unitTypeDetails);
		})
	}

	return apartmentUnitTypes;
}


function getPropertyVariants(propertyType,variant){

	var variants = [];


	switch(propertyType) {

	    case "Apartment":
	    	var propertyVariants = _projectData.apartment_variants;
	    	var prop_type_id = _.findKey(_projectData.property_types, function(val) {
	    		return val === 'Apartments';
	    	});    	
	    break;

	    default:
	    	var propertyVariants = _projectData.apartment_variants;
	    	var prop_type_id = _.findKey(_projectData.property_types, function(val) {
	    		return val === 'Apartments';
	    	});

	}

	_.each(propertyVariants, function(p_variants){
				var variantName = p_variants.variant_attributes[variant];
	    		var var_attributes = {
	    			id: variantName,
	    			isSelected: false,
	    			name: variantName[0].toUpperCase() + variantName.substr(1),
	    			property_type_id: prop_type_id
	    		};

	    		check = _.some( variants, function( el ) {
	    			return el.id === variantName;
	    		} );

	    		if(!check){
	    			variants.push(var_attributes);
	    		}
	    	});

	return variants;
}


function checkVariationIsUnique(variants,variantName){
	_.each(variants, function(a_variants){
		if(a_variants.id === variantName){
			return false;
		}
	});
	return true;
}



function getVariantsName(propertyType,variant){
	var variants = [];


	switch(propertyType) {

	    case "Apartment":
	    	var propertyVariants = _projectData.apartment_variants;
	    	var prop_type_id = _.findKey(_projectData.property_types, function(val) {
	    		return val === 'Apartments';
	    	});    	
	    break;

	    default:
	    	var propertyVariants = _projectData.apartment_variants;
	    	var prop_type_id = _.findKey(_projectData.property_types, function(val) {
	    		return val === 'Apartments';
	    	});

	}

	_.each(propertyVariants, function(p_variants){
				var variantName = p_variants[variant];
	    		var var_attributes = {
	    			id: variantName,
	    			isSelected: false,
	    			name: variantName[0].toUpperCase() + variantName.substr(1),
	    			property_type_id: prop_type_id
	    		};

	    		check = _.some( variants, function( el ) {
	    			return el.id === variantName;
	    		} );

	    		if(!check){
	    			variants.push(var_attributes);
	    		}
	    	});

	return variants;
}



function checkIfUnitExistsInFilter(filters,unit){
	_.each(filters, function(filter){
		if(filter.id === unit){
			return true;
		}
	});
	return false;
}


function getSupportedUnitTypes(propertyType, collectivePropertyTypeId){
	
	var supportedUnitTypes = [];

	switch(propertyType) {

	    case "Apartments":
	    	unitTypes = getApartmentUnitTypes(collectivePropertyTypeId);
	    	supportedUnitTypes = _.pluck(unitTypes, 'name');
	    break;

	}

	return supportedUnitTypes;
}

function getFilterTypes(propertyType){

	var filterTypes = [];

	switch (propertyType) {
	    
	    case "Apartment":
	        filterTypes = getApartmentFilterTypes(propertyType);
	        break;

	}

	return filterTypes;

}

function getApartmentFilterTypes(propertyType){
	
	var filterTypes = [];

	supportedFilterTypes = _projectData["filters"][propertyType];

	defaultFilterTypes = _projectData["filters"]["defaults"];

	allFilterTypes = _.union(supportedFilterTypes, defaultFilterTypes);

	_.each(allFilterTypes, function(supportedFilterType){

		var filterType ={};

		if(supportedFilterType==="unitTypes"){
			filterType.type = "unitTypes";
			filterType.filterName = "Unit Type";
			filterType.filterDisplayType = "imageCheckbox";

			// get filter values ie the unit types for the apartment
			apartmentUnitTypes = getApartmentUnitTypes("all");
			
			filterType.filterValues = apartmentUnitTypes;

			filterTypes.push(filterType);

			}


			if(supportedFilterType==="unitVariantNames"){
				filterType.type = "unitVariantNames";
				filterType.filterName = "Variant";
				filterType.filterDisplayType = "normalCheckbox";

				filterType.filterValues = getVariantsName(propertyType,'unit_variant_name');

				filterTypes.push(filterType);
			}


		if(supportedFilterType==="Flooring"){
			filterType.type = "Flooring";
			filterType.filterName = "Flooring";
			filterType.filterDisplayType = "normalCheckbox";
						
			filterType.filterValues = getPropertyVariants(propertyType,'Flooring');

			filterTypes.push(filterType);
		}


		if(supportedFilterType==="Kitchen"){
			filterType.type = "Kitchen";
			filterType.filterName = "Kitchen";
			filterType.filterDisplayType = "normalCheckbox";
						
			filterType.filterValues = getPropertyVariants(propertyType,'Kitchen');

			filterTypes.push(filterType);

			console.log(supportedFilterType);
		}


		if(supportedFilterType==="budget"){
			filterType.type = "budget";
			filterType.filterName = "Budget";
			filterType.filterDisplayType = "range";
			
			filterType.filterValues = getfilterRangeValues('budget',propertyType);

			filterTypes.push(filterType);
		}


		if(supportedFilterType==="area"){
			filterType.type = "area";
			filterType.filterName = "Area";
			filterType.filterDisplayType = "range";
			
			filterType.filterValues = getfilterRangeValues('area',propertyType);

			filterTypes.push(filterType);
		}


		if(supportedFilterType==="floor"){
			filterType.type = "floor";
			filterType.filterName = "Floor";
			filterType.filterDisplayType = "normalCheckbox";
			
			filterType.filterValues = getAvailableUnitSelectOptions(propertyType,'floor');

			filterTypes.push(filterType);
		}


		if(supportedFilterType==="direction"){
			filterType.type = "direction";
			filterType.filterName = "Direction";
			filterType.filterDisplayType = "normalCheckbox";
			
			filterType.filterValues = getAvailableUnitSelectOptions(propertyType,'direction');

			filterTypes.push(filterType);
		}


		if(supportedFilterType==="views"){
			filterType.type = "views";
			filterType.filterName = "Views";
			filterType.filterDisplayType = "normalCheckbox";

			filterType.filterValues = getAvailableUnitViewsOptions(propertyType);

			filterTypes.push(filterType);
		}

	});

	return filterTypes;   
}


function getfilterRangeValues( listName, propertyType ){

	var units = [];

	switch(propertyType) {

	    case "Apartment":
	    	var propertyVariants = _projectData.apartment_variants;	    	   	
	    break;
	}


	var totalUnitsInBuilding = [];
	var availableUnits = [];
	units = _projectData.units;
	totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });
	availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });

	switch(listName) {

	    case "budget":
	    	var values = _.uniq(_.pluck(availableUnits, "selling_amount"));
	    	var rangeSet = [1000000,2000000,3000000,4000000,5000000,8000000,10000000,20000000,30000000];
	    break;

	    case "area":
	    	var values = _.uniq(_.pluck(propertyVariants, "super_built_up_area"));
	    	var rangeSet = [100,200,500,700,1000,1500,2000,3000,5000];
	    break;

	} 

	var minVal = _.min(values);
	var maxVal = _.max(values);
	rangeSet.unshift(minVal);
	rangeSet.push(maxVal);
	var range = _.filter(rangeSet, function(x) { return x >= minVal && x <= maxVal });

	return range;	
}


function getAvailableUnitSelectOptions(propertyType,key){
	var units = [];
	var totalUnitsInBuilding = [];
	var availableUnits = [];
	var options =[];
	units = _projectData.units;

	switch(propertyType) {

	    case "Apartment":
	    	var propertyVariants = _projectData.apartment_variants;
	    	var prop_type_id = _.findKey(_projectData.property_types, function(val) {
	    		return val === 'Apartments';
	    	});    	
	    break;
	}

	totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });
	availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });
	
	var values = _.uniq(_.pluck(availableUnits, key));
	var filteredValues = _.sortBy(values, function(num) {
		return num;
	});

	_.each(filteredValues, function(value){		
		var unitOption = {
			id: value,
			isSelected: false,
			name: value,
			property_type_id: prop_type_id
		};
		options.push(unitOption);
	});

	return options;
}





function getAvailableUnitViewsOptions(propertyType){

	var units = [];
	var totalUnitsInBuilding = [];
	var availableUnits = [];
	var options =[];
	units = _projectData.units;

	switch(propertyType) {

	    case "Apartment":
	    	var propertyVariants = _projectData.apartment_variants;
	    	var prop_type_id = _.findKey(_projectData.property_types, function(val) {
	    		return val === 'Apartments';
	    	});    	
	    break;
	}

	totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });
	availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });

	_.each(availableUnits, function(unit){

		if(unit.views.length>0){
			_.each(unit.views, function(view){

				var unitView = {
					id: view,
					isSelected: false,
					name: view,
					property_type_id: prop_type_id
				};

				check = _.some( options, function( el ) {
					return el.id === view;
				} );

				if(!check){
					options.push(unitView);
				}

			});
		}		
	});

	return options;
}










function getAllAmenities(){

	var totalUnitsInBuilding = [];
	var options =[];
	var units = _projectData.units;
	
	totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });

	_.each(totalUnitsInBuilding, function(unit){

		if(unit.views.length>0){
			_.each(unit.views, function(view){
				
					options.push(view);			
			});
		}		
	});

	return _.uniq(options);
}










// Method to load project data from API
function _loadProjectData(data) {
	
	_projectData = data['data'];
	
	_globalStateData = _getProjectMasterData();
	
}

function _updateProjectData(dataToUpdate){

	_globalStateData.data.showShadow = true;
	_globalStateData = newProjectData;
}

function _updateGlobalState(newStateData){
	_globalStateData = newStateData;
}

function _getProjectMasterData(){
	var projectData = _projectData;
	var finalData = {};
	var projectMasterData = {"projectTitle":"", "projectLogo": "#", "unitCount":0,"buildings":[],"showShadow":false, "breakpoints":[0], "chosenBreakpoint": 0,"filterTypes":[],"search_filters":{},"applied_filters":{}, isFilterApplied:false,"unitIndexToHighlight":0};
	var buildings = [];
	var allUnits= [];
	var unitTypes= [];

	if(!_.isEmpty(projectData)){
		var buildingsWithUnits = [];

		projectMasterData.projectTitle = projectData.project_title ; 
		projectMasterData.projectLogo = projectData.logo ; 

		breakpoints = projectData.breakpoints 
		projectMasterData.breakpoints = breakpoints; 
		projectMasterData.chosenBreakpoint = breakpoints[0] ;  
		
		unitCount = getUnitCount('Apartments',{}) ;
		projectMasterData.totalCount = unitCount.total.length;
		projectMasterData.availableCount = unitCount.available.length;
		projectMasterData.filteredCount = unitCount.filtered.length;
		
		buildings = projectData.buildings;
		allUnits = projectData.units;

		buildingsWithUnits = getBuildingUnits(buildings, allUnits, []);

		projectMasterData.buildings = buildingsWithUnits;

        projectMasterData.filterTypes = getFilterTypes("Apartment");
	}

	finalData = {"data": projectMasterData};

	return finalData;
}

function getFilteredProjectMasterData(){
	
	var newProjectData = {};
	var newProjectData = _globalStateData.data;
	var appliedFilters = _globalStateData.data.applied_filters;

	apartmentUnits =  getUnitCount('Apartments', appliedFilters) ;
	
	newProjectData.availableCount = apartmentUnits.available.length;
	
	newProjectData.filteredCount = apartmentUnits.filtered.length;
	

	buildings = _projectData.buildings;
	
	allUnits = _projectData.units;
	
	filteredUnits = apartmentUnits.filtered;
	

	buildingsWithUnits = getBuildingUnits(buildings, allUnits, filteredUnits );


	// return first building that has filtered units
	var buildingIndexToHighlight = -1;
	var filteredCount = 0;
	var buildingToHighlight = {};
	var availableBuildingIndex = 0;

	while(filteredCount==0){
		buildingIndexToHighlight++;
		
		if(buildingIndexToHighlight >= (buildingsWithUnits.length-1))
			break;
		
		buildingToHighlight = buildingsWithUnits[buildingIndexToHighlight];
		filteredCount = buildingToHighlight.filteredUnitData.length;
		availableCount = buildingToHighlight.availableUnitData.length;
		
		if(availableCount>0){
			availableBuildingIndex = buildingIndexToHighlight;
		}
	}

	if(_.isEmpty(buildingToHighlight)){
		buildingToHighlight = buildingsWithUnits[buildingIndexToHighlight];
	}

	newProjectData.unitIndexToHighlight = buildingIndexToHighlight	


	newProjectData.buildings = buildingsWithUnits;

	// get primary breakpoint for the unit to be higlighted
	breakpoints = newProjectData.breakpoints;
	newChosenBreakpoint = buildingToHighlight.primary_breakpoint;
	newProjectData.chosenBreakpoint = newChosenBreakpoint;

	// since filters are applied set isFilterAPplied as true
	if(_.isEmpty(appliedFilters)){
		newProjectData.isFilterApplied = false;
	}
	else{
		newProjectData.isFilterApplied = true;
	}

    return newProjectData;




}

function _getUnitDetails(unitId){
	unitId = parseInt(unitId);
	var projectData = _projectData;
	var unitData = {};
	
	if(!_.isEmpty(projectData)){
		allUnits = projectData.units;
		unitData = _.findWhere(allUnits, {id: unitId});

		unitVariantId = unitData.unit_variant_id;

		unitVariantData = {};
		propertyId = unitData.property_type_id ;
		
		propertyTypeName = getPropertyType(propertyId);

		unitVariantData = getPropertyVariantsAttributes(propertyTypeName,unitVariantId);
		unitTypeId = unitVariantData.unit_type_id;

		unitType = getUnitTypeDetails(unitTypeId);
		unitVariantData.unitTypeName = unitType.name;


		buildingId = unitData.building_id;
		buildingData = getBuilding(buildingId);

		unitData.variantData = unitVariantData;
		unitData.buildingData = buildingData;
		unitData.propertyTypeName = propertyTypeName;

		unitData.allAmenities = getAllAmenities();
		
		unitData.cfProjectId = projectData.cf_project_id;
	}
	
	return unitData;	
}

function _getBuildingMasterDetails(buildingId){
	var projectData = _projectData;
	var finalData = {};

	buildingId = parseInt(buildingId);
	var buildingData = {"projectTitle":"", "projectLogo": "#", "unitCount":0,"buildings":[],"showShadow":false, "breakpoints":[0], "chosenBreakpoint": 0,"filterTypes":[],"search_filters":{},"applied_filters":{}, isFilterApplied:false,"unitIndexToHighlight":0};
	var buildings = [];
	var allUnits= [];
	var unitTypes= [];

	if(!_.isEmpty(projectData)){
		var buildingsWithUnits = [];

		projectMasterData.projectTitle = projectData.project_title ; 
		projectMasterData.projectLogo = projectData.logo ; 

		breakpoints = projectData.breakpoints 
		projectMasterData.breakpoints = breakpoints; 
		projectMasterData.chosenBreakpoint = breakpoints[0] ;  
		
		unitCount = getUnitCount('Apartments',{}) ;
		projectMasterData.totalCount = unitCount.total.length;
		projectMasterData.availableCount = unitCount.available.length;
		projectMasterData.filteredCount = unitCount.filtered.length;
		
		buildings = projectData.buildings;
		allUnits = projectData.units;

		buildingsWithUnits = getBuildingUnits(buildings, allUnits, []);

		projectMasterData.buildings = buildingsWithUnits;

        projectMasterData.filterTypes = getFilterTypes("Apartment");
	}

	finalData = {"data": buildingData};

	finalData = {
  "data": {
    "projectTitle": "Legend Apartments",
    "projectLogo": "http://www.commonfloor.com/public/images/builder/-logo.gif",
    "unitCount": 0,
    "buildings": [
      {
        "id": 2,
        "building_name": "A1",
        "phase_id": 3,
        "no_of_floors": 6,
        "floors": [],
        "building_master": [],
        "created_at": "2015-10-10 11:44:47",
        "updated_at": "2015-10-26 14:54:06",
        "breakpoints": [
          0,
          9,
          18,
          27
        ],
        "abbrevation": "",
        "has_master": "no",
        "floor_rise": 123456,
        "shadow_images": [],
        "primary_breakpoint": 0,
        "minStartPrice": 0,
        "unitData": [
          {
            "id": 101,
            "unit_name": "FC1",
            "unit_variant_id": 2,
            "position": 1,
            "floor": 3,
            "building_id": 2,
            "created_at": "2015-10-26 14:57:53",
            "updated_at": "2015-10-27 12:05:29",
            "phase_id": 0,
            "views": [
              "Garden",
              "Gym",
              "Garden 1"
            ],
            "direction": "South",
            "agent_id": 0,
            "booked_at": "2015-10-27 11:09:08",
            "property_type_group_id": 0,
            "booking_id": "562f64f0c92a6",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 102,
            "unit_name": "FC2",
            "unit_variant_id": 2,
            "position": 3,
            "floor": 3,
            "building_id": 2,
            "created_at": "2015-10-26 14:58:15",
            "updated_at": "2015-10-27 11:10:37",
            "phase_id": 0,
            "views": [],
            "direction": "South",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "562f5b626ec03",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 103,
            "unit_name": "FC10",
            "unit_variant_id": 2,
            "position": 3,
            "floor": 4,
            "building_id": 2,
            "created_at": "2015-10-26 14:58:35",
            "updated_at": "2015-10-26 14:59:25",
            "phase_id": 0,
            "views": [],
            "direction": "West",
            "agent_id": 0,
            "booked_at": "2015-10-26 14:59:25",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "blocked"
          },
          {
            "id": 104,
            "unit_name": "FC11",
            "unit_variant_id": 2,
            "position": 5,
            "floor": 5,
            "building_id": 2,
            "created_at": "2015-10-26 14:59:30",
            "updated_at": "2015-10-26 14:59:30",
            "phase_id": 0,
            "views": [],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 122,
            "unit_name": "UNIT 01",
            "unit_variant_id": 2,
            "position": 1,
            "floor": 1,
            "building_id": 2,
            "created_at": "2015-10-27 10:50:30",
            "updated_at": "2015-10-27 10:50:30",
            "phase_id": 0,
            "views": [],
            "direction": "North-West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          }
        ],
        "availableUnitData": [
          {
            "id": 101,
            "unit_name": "FC1",
            "unit_variant_id": 2,
            "position": 1,
            "floor": 3,
            "building_id": 2,
            "created_at": "2015-10-26 14:57:53",
            "updated_at": "2015-10-27 12:05:29",
            "phase_id": 0,
            "views": [
              "Garden",
              "Gym",
              "Garden 1"
            ],
            "direction": "South",
            "agent_id": 0,
            "booked_at": "2015-10-27 11:09:08",
            "property_type_group_id": 0,
            "booking_id": "562f64f0c92a6",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 102,
            "unit_name": "FC2",
            "unit_variant_id": 2,
            "position": 3,
            "floor": 3,
            "building_id": 2,
            "created_at": "2015-10-26 14:58:15",
            "updated_at": "2015-10-27 11:10:37",
            "phase_id": 0,
            "views": [],
            "direction": "South",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "562f5b626ec03",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 104,
            "unit_name": "FC11",
            "unit_variant_id": 2,
            "position": 5,
            "floor": 5,
            "building_id": 2,
            "created_at": "2015-10-26 14:59:30",
            "updated_at": "2015-10-26 14:59:30",
            "phase_id": 0,
            "views": [],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 122,
            "unit_name": "UNIT 01",
            "unit_variant_id": 2,
            "position": 1,
            "floor": 1,
            "building_id": 2,
            "created_at": "2015-10-27 10:50:30",
            "updated_at": "2015-10-27 10:50:30",
            "phase_id": 0,
            "views": [],
            "direction": "North-West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          }
        ],
        "filteredUnitData": [],
        "supportedUnitTypes": [
          "1BHK"
        ]
      },
      {
        "id": 3,
        "building_name": "A2",
        "phase_id": 8,
        "no_of_floors": 8,
        "floors": [],
        "building_master": [],
        "created_at": "2015-10-10 11:45:17",
        "updated_at": "2015-10-27 05:25:18",
        "breakpoints": [
          0,
          9,
          18,
          27
        ],
        "abbrevation": "",
        "has_master": "no",
        "floor_rise": 332244,
        "shadow_images": [],
        "primary_breakpoint": 14,
        "minStartPrice": 0,
        "unitData": [
          {
            "id": 100,
            "unit_name": "FC14_TEST",
            "unit_variant_id": 2,
            "position": 3,
            "floor": 3,
            "building_id": 3,
            "created_at": "2015-10-26 14:53:03",
            "updated_at": "2015-10-27 12:20:39",
            "phase_id": 0,
            "views": [
              "Garden",
              "Gym",
              "Garden 1"
            ],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "2015-10-27 12:20:39",
            "property_type_group_id": 0,
            "booking_id": "562f590999707",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 105,
            "unit_name": "FC15",
            "unit_variant_id": 3,
            "position": 6,
            "floor": 4,
            "building_id": 3,
            "created_at": "2015-10-27 05:15:28",
            "updated_at": "2015-10-27 05:15:28",
            "phase_id": 0,
            "views": [],
            "direction": "West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "sold"
          },
          {
            "id": 106,
            "unit_name": "FC16",
            "unit_variant_id": 5,
            "position": 4,
            "floor": 3,
            "building_id": 3,
            "created_at": "2015-10-27 05:16:22",
            "updated_at": "2015-10-27 05:16:22",
            "phase_id": 0,
            "views": [],
            "direction": "Noth-East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "blocked"
          },
          {
            "id": 107,
            "unit_name": "FC 17",
            "unit_variant_id": 3,
            "position": 2,
            "floor": 2,
            "building_id": 3,
            "created_at": "2015-10-27 05:16:52",
            "updated_at": "2015-10-27 11:07:55",
            "phase_id": 0,
            "views": [],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "562f1cfd9f521",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          }
        ],
        "availableUnitData": [
          {
            "id": 100,
            "unit_name": "FC14_TEST",
            "unit_variant_id": 2,
            "position": 3,
            "floor": 3,
            "building_id": 3,
            "created_at": "2015-10-26 14:53:03",
            "updated_at": "2015-10-27 12:20:39",
            "phase_id": 0,
            "views": [
              "Garden",
              "Gym",
              "Garden 1"
            ],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "2015-10-27 12:20:39",
            "property_type_group_id": 0,
            "booking_id": "562f590999707",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 107,
            "unit_name": "FC 17",
            "unit_variant_id": 3,
            "position": 2,
            "floor": 2,
            "building_id": 3,
            "created_at": "2015-10-27 05:16:52",
            "updated_at": "2015-10-27 11:07:55",
            "phase_id": 0,
            "views": [],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "562f1cfd9f521",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          }
        ],
        "filteredUnitData": [],
        "supportedUnitTypes": [
          "1BHK",
          "3BHK",
          "2BHK"
        ]
      },
      {
        "id": 4,
        "building_name": "A3",
        "phase_id": 8,
        "no_of_floors": 6,
        "floors": [],
        "building_master": [],
        "created_at": "2015-10-10 11:45:38",
        "updated_at": "2015-10-27 05:42:09",
        "breakpoints": [],
        "abbrevation": "",
        "has_master": "no",
        "floor_rise": 432132,
        "shadow_images": [],
        "primary_breakpoint": 29,
        "minStartPrice": 0,
        "unitData": [
          {
            "id": 108,
            "unit_name": "A1",
            "unit_variant_id": 2,
            "position": 2,
            "floor": 3,
            "building_id": 4,
            "created_at": "2015-10-27 05:21:01",
            "updated_at": "2015-10-27 05:21:01",
            "phase_id": 0,
            "views": [],
            "direction": "West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "sold"
          },
          {
            "id": 109,
            "unit_name": "A2",
            "unit_variant_id": 2,
            "position": 3,
            "floor": 4,
            "building_id": 4,
            "created_at": "2015-10-27 05:22:40",
            "updated_at": "2015-10-27 05:22:40",
            "phase_id": 0,
            "views": [],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "sold"
          },
          {
            "id": 110,
            "unit_name": "A4",
            "unit_variant_id": 2,
            "position": 5,
            "floor": 5,
            "building_id": 4,
            "created_at": "2015-10-27 05:23:19",
            "updated_at": "2015-10-27 05:23:19",
            "phase_id": 0,
            "views": [],
            "direction": "West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "sold"
          },
          {
            "id": 111,
            "unit_name": "A5",
            "unit_variant_id": 4,
            "position": 6,
            "floor": 5,
            "building_id": 4,
            "created_at": "2015-10-27 05:24:16",
            "updated_at": "2015-10-27 05:24:16",
            "phase_id": 0,
            "views": [],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "sold"
          }
        ],
        "availableUnitData": [],
        "filteredUnitData": [],
        "supportedUnitTypes": [
          "1BHK"
        ]
      },
      {
        "id": 5,
        "building_name": "A4",
        "phase_id": 8,
        "no_of_floors": 6,
        "floors": [],
        "building_master": [],
        "created_at": "2015-10-10 11:46:12",
        "updated_at": "2015-10-27 06:14:09",
        "breakpoints": [],
        "abbrevation": "",
        "has_master": "no",
        "floor_rise": 65432,
        "shadow_images": [],
        "primary_breakpoint": 44,
        "minStartPrice": 0,
        "unitData": [
          {
            "id": 112,
            "unit_name": "FC1",
            "unit_variant_id": 2,
            "position": 4,
            "floor": 4,
            "building_id": 5,
            "created_at": "2015-10-27 05:41:19",
            "updated_at": "2015-10-27 05:41:19",
            "phase_id": 0,
            "views": [],
            "direction": "West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 113,
            "unit_name": "FC2",
            "unit_variant_id": 4,
            "position": 4,
            "floor": 5,
            "building_id": 5,
            "created_at": "2015-10-27 06:00:26",
            "updated_at": "2015-10-27 06:00:26",
            "phase_id": 0,
            "views": [],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 114,
            "unit_name": "FC3",
            "unit_variant_id": 2,
            "position": 5,
            "floor": 5,
            "building_id": 5,
            "created_at": "2015-10-27 06:01:04",
            "updated_at": "2015-10-27 06:01:04",
            "phase_id": 0,
            "views": [],
            "direction": "North-West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 115,
            "unit_name": "FC 4",
            "unit_variant_id": 2,
            "position": 5,
            "floor": 4,
            "building_id": 5,
            "created_at": "2015-10-27 06:12:31",
            "updated_at": "2015-10-27 06:12:31",
            "phase_id": 0,
            "views": [],
            "direction": "North",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 116,
            "unit_name": "FC 4",
            "unit_variant_id": 2,
            "position": 5,
            "floor": 4,
            "building_id": 5,
            "created_at": "2015-10-27 06:13:47",
            "updated_at": "2015-10-27 06:13:47",
            "phase_id": 0,
            "views": [],
            "direction": "North",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          }
        ],
        "availableUnitData": [
          {
            "id": 112,
            "unit_name": "FC1",
            "unit_variant_id": 2,
            "position": 4,
            "floor": 4,
            "building_id": 5,
            "created_at": "2015-10-27 05:41:19",
            "updated_at": "2015-10-27 05:41:19",
            "phase_id": 0,
            "views": [],
            "direction": "West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 113,
            "unit_name": "FC2",
            "unit_variant_id": 4,
            "position": 4,
            "floor": 5,
            "building_id": 5,
            "created_at": "2015-10-27 06:00:26",
            "updated_at": "2015-10-27 06:00:26",
            "phase_id": 0,
            "views": [],
            "direction": "East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 114,
            "unit_name": "FC3",
            "unit_variant_id": 2,
            "position": 5,
            "floor": 5,
            "building_id": 5,
            "created_at": "2015-10-27 06:01:04",
            "updated_at": "2015-10-27 06:01:04",
            "phase_id": 0,
            "views": [],
            "direction": "North-West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 115,
            "unit_name": "FC 4",
            "unit_variant_id": 2,
            "position": 5,
            "floor": 4,
            "building_id": 5,
            "created_at": "2015-10-27 06:12:31",
            "updated_at": "2015-10-27 06:12:31",
            "phase_id": 0,
            "views": [],
            "direction": "North",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 116,
            "unit_name": "FC 4",
            "unit_variant_id": 2,
            "position": 5,
            "floor": 4,
            "building_id": 5,
            "created_at": "2015-10-27 06:13:47",
            "updated_at": "2015-10-27 06:13:47",
            "phase_id": 0,
            "views": [],
            "direction": "North",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          }
        ],
        "filteredUnitData": [],
        "supportedUnitTypes": [
          "1BHK"
        ]
      },
      {
        "id": 6,
        "building_name": "A5",
        "phase_id": 8,
        "no_of_floors": 9,
        "floors": [],
        "building_master": [],
        "created_at": "2015-10-10 11:49:26",
        "updated_at": "2015-10-27 06:46:31",
        "breakpoints": [],
        "abbrevation": "",
        "has_master": "no",
        "floor_rise": 433443,
        "shadow_images": [],
        "primary_breakpoint": 59,
        "minStartPrice": 0,
        "unitData": [
          {
            "id": 117,
            "unit_name": "FC23",
            "unit_variant_id": 7,
            "position": 5,
            "floor": 6,
            "building_id": 6,
            "created_at": "2015-10-27 06:15:19",
            "updated_at": "2015-10-27 06:15:19",
            "phase_id": 0,
            "views": [],
            "direction": "Soth-East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 118,
            "unit_name": "FC28",
            "unit_variant_id": 7,
            "position": 2,
            "floor": 5,
            "building_id": 6,
            "created_at": "2015-10-27 06:47:24",
            "updated_at": "2015-10-27 06:47:24",
            "phase_id": 0,
            "views": [],
            "direction": "Soth-East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 119,
            "unit_name": "FC2",
            "unit_variant_id": 4,
            "position": 4,
            "floor": 4,
            "building_id": 6,
            "created_at": "2015-10-27 06:47:49",
            "updated_at": "2015-10-27 06:49:11",
            "phase_id": 0,
            "views": [
              "Garden",
              "Gym",
              "Pool"
            ],
            "direction": "Noth-East",
            "agent_id": 0,
            "booked_at": "2015-10-27 06:49:11",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 120,
            "unit_name": "FC29",
            "unit_variant_id": 4,
            "position": 6,
            "floor": 6,
            "building_id": 6,
            "created_at": "2015-10-27 06:48:25",
            "updated_at": "2015-10-27 06:48:25",
            "phase_id": 0,
            "views": [],
            "direction": "West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "booked_by_agent"
          },
          {
            "id": 121,
            "unit_name": "FC32",
            "unit_variant_id": 6,
            "position": 7,
            "floor": 5,
            "building_id": 6,
            "created_at": "2015-10-27 06:48:49",
            "updated_at": "2015-10-27 06:48:49",
            "phase_id": 0,
            "views": [],
            "direction": "West",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "sold"
          }
        ],
        "availableUnitData": [
          {
            "id": 117,
            "unit_name": "FC23",
            "unit_variant_id": 7,
            "position": 5,
            "floor": 6,
            "building_id": 6,
            "created_at": "2015-10-27 06:15:19",
            "updated_at": "2015-10-27 06:15:19",
            "phase_id": 0,
            "views": [],
            "direction": "Soth-East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 118,
            "unit_name": "FC28",
            "unit_variant_id": 7,
            "position": 2,
            "floor": 5,
            "building_id": 6,
            "created_at": "2015-10-27 06:47:24",
            "updated_at": "2015-10-27 06:47:24",
            "phase_id": 0,
            "views": [],
            "direction": "Soth-East",
            "agent_id": 0,
            "booked_at": "0000-00-00 00:00:00",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          },
          {
            "id": 119,
            "unit_name": "FC2",
            "unit_variant_id": 4,
            "position": 4,
            "floor": 4,
            "building_id": 6,
            "created_at": "2015-10-27 06:47:49",
            "updated_at": "2015-10-27 06:49:11",
            "phase_id": 0,
            "views": [
              "Garden",
              "Gym",
              "Pool"
            ],
            "direction": "Noth-East",
            "agent_id": 0,
            "booked_at": "2015-10-27 06:49:11",
            "property_type_group_id": 0,
            "booking_id": "",
            "breakpoint": "",
            "booking_amount": 20000,
            "selling_amount": 0,
            "unit_price": 0,
            "unit_price_component": {
              "l2zs3x": {
                "amount": 30000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "s9n1hl": {
                "amount": 30000,
                "component_price_sub_type": "Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 30000,
                "component_price_type": "Basic"
              },
              "h5py9d": {
                "amount": 12000,
                "component_price_sub_type": "Super Builtup Area",
                "cost_type": "Lumpsump",
                "entered_value": 12000,
                "component_price_type": "Basic"
              }
            },
            "property_type_id": 3,
            "availability": "available"
          }
        ],
        "filteredUnitData": [],
        "supportedUnitTypes": [
          "1BHK",
          "2BHK"
        ]
      }
    ],
    "showShadow": false,
    "breakpoints": [
      0,
      14,
      29,
      44,
      59
    ],
    "chosenBreakpoint": 0,
    "filterTypes": [
      {
        "type": "unitTypes",
        "filterName": "Unit Type",
        "filterDisplayType": "imageCheckbox",
        "filterValues": [
          {
            "id": 4,
            "name": "1BHK",
            "property_type_id": 2,
            "isSelected": false
          },
          {
            "id": 3,
            "name": "3BHK",
            "property_type_id": 2,
            "isSelected": false
          },
          {
            "id": 2,
            "name": "2BHK",
            "property_type_id": 2,
            "isSelected": false
          }
        ]
      },
      {
        "type": "unitVariantNames",
        "filterName": "Variant",
        "filterDisplayType": "normalCheckbox",
        "filterValues": [
          {
            "id": "Apartment 2bhk",
            "isSelected": false,
            "name": "Apartment 2bhk",
            "property_type_id": "3"
          },
          {
            "id": "Apartment 2",
            "isSelected": false,
            "name": "Apartment 2",
            "property_type_id": "3"
          },
          {
            "id": "Apartment 3",
            "isSelected": false,
            "name": "Apartment 3",
            "property_type_id": "3"
          },
          {
            "id": "Apartment ",
            "isSelected": false,
            "name": "Apartment ",
            "property_type_id": "3"
          },
          {
            "id": "Apartment 5",
            "isSelected": false,
            "name": "Apartment 5",
            "property_type_id": "3"
          },
          {
            "id": "Apartment 6",
            "isSelected": false,
            "name": "Apartment 6",
            "property_type_id": "3"
          }
        ]
      },
      {
        "type": "Flooring",
        "filterName": "Flooring",
        "filterDisplayType": "normalCheckbox",
        "filterValues": [
          {
            "id": "werty",
            "isSelected": false,
            "name": "Werty",
            "property_type_id": "3"
          }
        ]
      },
      {
        "type": "Kitchen",
        "filterName": "Kitchen",
        "filterDisplayType": "normalCheckbox",
        "filterValues": [
          {
            "id": "Modular",
            "isSelected": false,
            "name": "Modular",
            "property_type_id": "3"
          }
        ]
      },
      {
        "type": "area",
        "filterName": "Area",
        "filterDisplayType": "range",
        "filterValues": [
          480,
          500,
          700,
          1000,
          1500,
          2000,
          3000,
          5000,
          12312
        ]
      },
      {
        "type": "budget",
        "filterName": "Budget",
        "filterDisplayType": "range",
        "filterValues": [
          0,
          0
        ]
      },
      {
        "type": "views",
        "filterName": "Views",
        "filterDisplayType": "normalCheckbox",
        "filterValues": [
          {
            "id": "Garden",
            "isSelected": false,
            "name": "Garden",
            "property_type_id": "3"
          },
          {
            "id": "Gym",
            "isSelected": false,
            "name": "Gym",
            "property_type_id": "3"
          },
          {
            "id": "Pool",
            "isSelected": false,
            "name": "Pool",
            "property_type_id": "3"
          },
          {
            "id": "Garden 1",
            "isSelected": false,
            "name": "Garden 1",
            "property_type_id": "3"
          }
        ]
      },
      {
        "type": "direction",
        "filterName": "Direction",
        "filterDisplayType": "normalCheckbox",
        "filterValues": [
          {
            "id": "East",
            "isSelected": false,
            "name": "East",
            "property_type_id": "3"
          },
          {
            "id": "North",
            "isSelected": false,
            "name": "North",
            "property_type_id": "3"
          },
          {
            "id": "North-West",
            "isSelected": false,
            "name": "North-West",
            "property_type_id": "3"
          },
          {
            "id": "Noth-East",
            "isSelected": false,
            "name": "Noth-East",
            "property_type_id": "3"
          },
          {
            "id": "Soth-East",
            "isSelected": false,
            "name": "Soth-East",
            "property_type_id": "3"
          },
          {
            "id": "South",
            "isSelected": false,
            "name": "South",
            "property_type_id": "3"
          },
          {
            "id": "West",
            "isSelected": false,
            "name": "West",
            "property_type_id": "3"
          }
        ]
      },
      {
        "type": "floor",
        "filterName": "Floor",
        "filterDisplayType": "normalCheckbox",
        "filterValues": [
          {
            "id": 1,
            "isSelected": false,
            "name": 1,
            "property_type_id": "3"
          },
          {
            "id": 2,
            "isSelected": false,
            "name": 2,
            "property_type_id": "3"
          },
          {
            "id": 3,
            "isSelected": false,
            "name": 3,
            "property_type_id": "3"
          },
          {
            "id": 4,
            "isSelected": false,
            "name": 4,
            "property_type_id": "3"
          },
          {
            "id": 5,
            "isSelected": false,
            "name": 5,
            "property_type_id": "3"
          },
          {
            "id": 6,
            "isSelected": false,
            "name": 6,
            "property_type_id": "3"
          }
        ]
      }
    ],
    "search_filters": {},
    "applied_filters": {},
    "isFilterApplied": false,
    "unitIndexToHighlight": 0,
    "totalCount": 23,
    "availableCount": 14,
    "filteredCount": 0
  }
};

	return finalData;
}


// AppStore object
var AppStore = merge(EventEmitter.prototype, {
  
	emitChange:function(){
	console.log("emit change");
	this.emit(CHANGE_EVENT)
	},

	// components to register with the store
	addChangeListener:function(callback){
	
		this.on(CHANGE_EVENT, callback)
	},

	removeChangeListener:function(callback){
	this.removeListener(CHANGE_EVENT, callback)
	},


	getProjectData:function(){
		return _projectData;
	},

	getProjectMasterData:function(){
		return _getProjectMasterData();
	},

	getStateData: function(){
		return _globalStateData;
	},

	getUnitStateData: function(unitId){
		_unitStateData = _getUnitDetails(unitId); 
		return _unitStateData;
	},

	getBuildingMasterStateData: function(buildingId){
		_buildingMasterStateData = _getBuildingMasterDetails(buildingId); 
		return _buildingMasterStateData;
	},	

	updateGlobalState: function(newState){
		_updateGlobalState(newState);
	},


	getFilteredProjectMasterData: function(){
		var newProjectData = getFilteredProjectMasterData();

		return newProjectData;
	},

  	// Register callback with AppDispatcher
	dispatcherIndex: AppDispatcher.register(function(payload) {
	  var action = payload.action;
	  

	  switch(action.actionType) {

	    // Respond to RECEIVE_DATA action
	    case AppConstants.RECEIVE_DATA:
	      _loadProjectData(action.data);
	      break;

	    // case AppConstants.CHANGE_URL:
	    //   _loadProjectData(action.data);
	    //   break;	  

	    case AppConstants.UPDATE_DATA:
	      _updateProjectData(action.data);
	      break;		          

	    default:
	      return true;
	  }

	  // If action was responded to, emit change event
	  AppStore.emitChange();

	  // to resolve promises return true
	  return true;

	})


})

module.exports = AppStore;