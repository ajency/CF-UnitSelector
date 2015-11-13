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
var _groupStateData = {};
var _buildingMasterStateData = {"data":{"projectTitle":"", "projectLogo": "#", "logoExist": false, "shadowImages":[], "buildings":[],"showShadow":false,"breakpoints":[0], "chosenBreakpoint": 0, "filterTypes":[],"search_entity":"project", "search_filters":{} , "applied_filters":{} , "isFilterApplied":false, "unitIndexToHighlight":0 } };
var _globalStateData = {"data":{"projectTitle":"", "projectLogo": "#", "shadowImages":[],"buildings":[],"showShadow":false,"breakpoints":[0], "chosenBreakpoint": 0, "filterTypes":[],"search_entity":"project", "search_filters":{} , "applied_filters":{} , "isFilterApplied":false, "applyFiltersSvgCheck": false, "unitIndexToHighlight":0 } };


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





function getAppliedFiltersCount(filters){
	var newfilters = [];
	_.each(filters, function(filter, key){
		if(filter.length>0){
			newfilters.push(key);
		}
	});
	return newfilters.length;
}




function getUnitCount(propertyType,filters,buildingId,groupId){
	var unitCount = {"total":[],"available":[], "filtered":[]};
	var units = [];
	var availableUnits = [];
	var totalUnitsInBuilding = [];
	var filteredUnits = [];


	var appliedFilters = filters;

	var attributeFilters = getAllttributeFilters(propertyType);

	
	if (!_.isEmpty(_projectData)){
		units = _projectData.units;
		totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });

		if(buildingId != ''){
			availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available" && unit.building_id == buildingId){return unit;} });
		}else{
			availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });
		}

		if(groupId != ''){
			var availableUnits = _.filter(availableUnits , function(unit){ if(unit.floor_group_id == groupId){return unit;} });
		}

		// get all units that have building associated to it
		//totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });


		// from all the building units get only those units that are available
		//availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });

					
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



				_.each(attributeFilters, function(attribute){
					if(key===attribute){
						flooringTocheck = appliedFilter; 
						if(flooringTocheck.length > 0){

							if(filteredUnits.length === 0){

								_.each(availableUnits, function(availableUnit){
									variantId = availableUnit.unit_variant_id;
									var propertyVariant = getPropertyVariantsAttributes(propertyType,variantId,attribute);

									if(_.indexOf(flooringTocheck, propertyVariant.toString()) > -1){
										filteredUnits.push(availableUnit);
									}
								});

							}else{
								_.each(filteredUnits, function(filUnit){
									var innterPropertyVariant = getPropertyVariantsAttributes(propertyType,filUnit.unit_variant_id,attribute);

									if(flooringTocheck.indexOf(innterPropertyVariant.toString()) > -1){
										console.log(innterPropertyVariant+ ' is not available');
									}else{
										filteredUnits = _.reject(filteredUnits, function(el) { return el.id === filUnit.id; });
									}

								});
							}						

						}
					}
				});





				/*if(key==="Flooring" || key==="Kitchen"){
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
				}*/




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

											check = _.some( filteredUnits, function( el ) {
												return el.id === unit.id;
											} );

											if(!check){
												filteredUnits.push(unit);
											}
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
			unitPropertyType = getPropertyType(unit.property_type_id);
			
			unitSba = getPropertyVariantsById(unitPropertyType,unit.unit_variant_id,"super_built_up_area");
			unit.super_built_up_area = unitSba;

			unitTypeId = getPropertyVariantsById(unitPropertyType,unit.unit_variant_id,"unit_type_id");
			unitTypeDetails = getUnitTypeDetails(unitTypeId);

			unit.unitType = unitTypeDetails["name"];

			
			
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

function getApartmentUnitTypes(collectivePropertyTypeId, groupId, collectivePropertyType){

	var apartmentVariants = [];
	var apartmentUnitTypes = [];
	var collectivePropertyUnits = [];


	if(!_.isEmpty(_projectData)){

		// get all units in the project
		totalUnitsInBuilding = _projectData.units;

		allUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });


		// based on buildingId passed either return all or only specific building's units 


		if (collectivePropertyTypeId==="all") {
			collectivePropertyUnits = _.filter(allUnits , function(unit){ return unit; });
		}
		else{
			// if collectivePropertyType is "buildings" check for building_id else if it is "floorgroups" check for floor_group_id
			if(collectivePropertyType==="floorgroups"){
				collectivePropertyUnits = _.filter(allUnits , function(unit){ if(unit.floor_group_id == collectivePropertyTypeId){return unit;} });
			}
			else if(collectivePropertyType==="buildings"){
				collectivePropertyUnits = _.filter(allUnits , function(unit){ if(unit.building_id == collectivePropertyTypeId){return unit;} });
			}
			
		}


		if(groupId != ''){
			collectivePropertyUnits = _.filter(collectivePropertyUnits , function(unit){ if(unit.floor_group_id == groupId){return unit;} });
		}
		

		// get unique unit variant id for the above building units
		buildingUnitVariantIds = _.uniq(_.pluck(collectivePropertyUnits, 'unit_variant_id')); 

		
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




function getPropertyVariants(propertyType,variant,buildingId,groupId){

	var variants = [];

	var totalUnitsInBuilding = _projectData.units;


	if (buildingId==="all") {
		var allUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });			
	}
	else{
		var allUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available" && unit.building_id == buildingId){return unit;} });
	}

	if(groupId != ''){
			allUnits = _.filter(allUnits , function(unit){ if(unit.floor_group_id == groupId){return unit;} });
		}
	
	var unitsIds = _.uniq(_.pluck(allUnits, "unit_variant_id"));


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


	var filteredVariants = _.filter(propertyVariants , function(variant){
		if(unitsIds.indexOf(variant.id) > -1){
			return variant;
		}
	});
	

	_.each(filteredVariants, function(p_variants){

		if(p_variants.variant_attributes.hasOwnProperty(variant)){			
		
				var variantName = p_variants.variant_attributes[variant];
				var formatCheck = variantName.toString();
				var formatedName = formatCheck[0].toUpperCase() + formatCheck.substr(1);
				
	    		var var_attributes = {
	    			id: variantName,
	    			isSelected: false,
	    			name: formatedName,
	    			property_type_id: prop_type_id
	    		};

	    		check = _.some( variants, function( el ) {
	    			return el.id === variantName;
	    		} );

	    		if(!check){
	    			variants.push(var_attributes);
	    		}
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



function getVariantsName(propertyType,variant,buildingId,groupId){
	var variants = [];


	var totalUnitsInBuilding = _projectData.units;


	if (buildingId==="all") {
		var allUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });			
	}
	else{
		var allUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available" && unit.building_id == buildingId){return unit;} });
	}

	if(groupId != ''){
		allUnits = _.filter(allUnits , function(unit){ if(unit.floor_group_id === groupId){return unit;} });
	}

	var unitsIds = _.uniq(_.pluck(allUnits, "unit_variant_id"));



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


	var filteredVariants = _.filter(propertyVariants , function(variant){
		if(unitsIds.indexOf(variant.id) > -1){
			return variant;
		}
	});

	_.each(filteredVariants, function(p_variants,key){
		var variantName = p_variants[variant];

		var formatCheck = variantName.toString();
		
		var formatedName = formatCheck[0].toUpperCase() + formatCheck.substr(1);

		var var_attributes = {
			id: key,
			isSelected: false,
			name: formatedName,
			property_type_id: prop_type_id
		};

		var check = _.some( variants, function( el ) {
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
	    	unitTypes = getApartmentUnitTypes(collectivePropertyTypeId, '', "buildings");
	    	supportedUnitTypes = _.pluck(unitTypes, 'name');
	    break;

	}

	return supportedUnitTypes;
}

function getFilterTypes(propertyType,buildingId,groupId){

	var filterTypes = [];

	switch (propertyType) {
	    
	    case "Apartment":
	        filterTypes = getApartmentFilterTypes(propertyType,buildingId,groupId);
	        break;

	}

	return filterTypes;

}






function getAllttributeFilters(propertyType){

	var totalUnitsInBuilding = _projectData.units;
	var allUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });
	var unitsIds = _.uniq(_.pluck(allUnits, "unit_variant_id"));

	switch (propertyType) {

		case "Apartment":
	    	var propertyVariants = _projectData.apartment_variants;	    	    	
	    break;

	    case "Apartments":
	    	var propertyVariants = _projectData.apartment_variants;	    	    	
	    break;

	}

	var filteredVariants = _.filter(propertyVariants , function(variant){
		if(unitsIds.indexOf(variant.id) > -1){
			return variant;
		}
	});


	var attributes = _.pluck(filteredVariants,'variant_attributes');

	var filters = [];

		_.each(attributes, function(attr,i){
			_.each(attr, function(val,key){

				if(filters.indexOf(key) > -1){
					//filters.push(key);
				}else{
					filters.push(key);
				}

			});
		});

	return filters;
}





function getApartmentFilterTypes(propertyType,buildingId,groupId){
	
	var attributeFilters = getAllttributeFilters(propertyType);
	
	var filterTypes = [];

	supportedFilterTypes = _projectData["filters"][propertyType];

	defaultFilterTypes = _projectData["filters"]["defaults"];

	allFilterTypes = _.union(supportedFilterTypes, defaultFilterTypes);

	if(buildingId != ''){
		var building = buildingId;
	}else{
		var building = 'all';
	}

	_.each(allFilterTypes, function(supportedFilterType){

		var filterType ={};

		if(supportedFilterType==="unitTypes"){
			filterType.type = "unitTypes";
			filterType.filterName = "Unit Type";
			filterType.filterDisplayType = "imageCheckbox";

			// get filter values ie the unit types for the apartment

			apartmentUnitTypes = getApartmentUnitTypes(building,groupId,'buildings');


			
			filterType.filterValues = apartmentUnitTypes;

			if(filterType.filterValues.length>0){
				filterTypes.push(filterType);
			}
			

			}


			if(supportedFilterType==="unitVariantNames"){
				filterType.type = "unitVariantNames";
				filterType.filterName = "Variant";
				filterType.filterDisplayType = "normalCheckbox";

				filterType.filterValues = getVariantsName(propertyType,'unit_variant_name',building,groupId);
				
				filterTypes.push(filterType);
			}



			_.each(attributeFilters, function(attribute){
				if(supportedFilterType===attribute){
					filterType.type = attribute;
					filterType.filterName = attribute;
					filterType.filterDisplayType = "normalCheckbox";

					//getPropertyVariants(propertyType,attribute,building,groupId);

					filterType.filterValues = getPropertyVariants(propertyType,attribute,building,groupId);
					//filterType.filterValues = [];

					if(filterType.filterValues.length>0){
						filterTypes.push(filterType);
					}
				}
			});



		if(supportedFilterType==="budget"){
			filterType.type = "budget";
			filterType.filterName = "Budget";
			filterType.filterDisplayType = "range";
			
			filterType.filterValues = getfilterRangeValues('budget',propertyType,building,groupId);

			if(filterType.filterValues.length>0){
				filterTypes.push(filterType);
			}
		}


		if(supportedFilterType==="area"){
			filterType.type = "area";
			filterType.filterName = "Area";
			filterType.filterDisplayType = "range";
			
			filterType.filterValues = getfilterRangeValues('area',propertyType,building,groupId);

			if(filterType.filterValues.length>0){
				filterTypes.push(filterType);
			}
		}


		if(supportedFilterType==="floor"){
			filterType.type = "floor";
			filterType.filterName = "Floor";
			filterType.filterDisplayType = "normalCheckbox";
			
			filterType.filterValues = getAvailableUnitSelectOptions(propertyType,'floor',building,groupId);

			if(filterType.filterValues.length>0){
				filterTypes.push(filterType);
			}
		}


		if(supportedFilterType==="direction"){
			filterType.type = "direction";
			filterType.filterName = "Direction";
			filterType.filterDisplayType = "normalCheckbox";
			
			filterType.filterValues = getAvailableUnitSelectOptions(propertyType,'direction',building,groupId);

			if(filterType.filterValues.length>0){
				filterTypes.push(filterType);
			}
		}


		if(supportedFilterType==="views"){
			filterType.type = "views";
			filterType.filterName = "Views";
			filterType.filterDisplayType = "normalCheckbox";

			filterType.filterValues = getAvailableUnitViewsOptions(propertyType,building,groupId);

			if(filterType.filterValues.length>0){
				filterTypes.push(filterType);
			}
		}

	});

	return filterTypes;   
}


function getfilterRangeValues( listName, propertyType, buildingId, groupId ){	
	

	var units = _projectData.units;

	if (buildingId==="all") {
		var availableUnits = _.filter(units , function(unit){ if(unit.availability === "available"){return unit;} });			
	}
	else{
		var availableUnits = _.filter(units , function(unit){ if(unit.availability === "available" && unit.building_id == buildingId){return unit;} });
	}

	if(groupId != ''){
		availableUnits = _.filter(availableUnits , function(unit){ if(unit.floor_group_id == groupId){return unit;} });
	}

	var unitsIds = _.uniq(_.pluck(availableUnits, "unit_variant_id"));




	switch(propertyType) {

	    case "Apartment":
	    	var propertyVariants = _projectData.apartment_variants;	    	   	
	    break;
	}
	
	


	switch(listName) {

	    case "budget":
	    	var values = _.uniq(_.pluck(availableUnits, "selling_amount"));
	    	var rangeSet = [1000000,2000000,3000000,4000000,5000000,8000000,10000000,20000000,30000000];
	    break;

	    case "area":
	    	var filteredVariants = _.filter(propertyVariants , function(variant){
	    		if(unitsIds.indexOf(variant.id) > -1){
	    			return variant;
	    		}
	    	});

	    	var values = _.uniq(_.pluck(filteredVariants, "super_built_up_area"));
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


function getAvailableUnitSelectOptions(propertyType,key,buildingId,groupId){
	var units = [];
	var totalUnitsInBuilding = [];
	var availableUnits = [];
	var options =[];
	units = _projectData.units;

	if (buildingId==="all") {
		var availableUnits = _.filter(units , function(unit){ if(unit.availability === "available"){return unit;} });			
	}
	else{
		var availableUnits = _.filter(units , function(unit){ if(unit.availability === "available" && unit.building_id == buildingId){return unit;} });
	}


	if(groupId != ''){
		var availableUnits = _.filter(availableUnits , function(unit){ if(unit.floor_group_id == groupId){return unit;} });
	}

	

	switch(propertyType) {

	    case "Apartment":
	    	var propertyVariants = _projectData.apartment_variants;
	    	var prop_type_id = _.findKey(_projectData.property_types, function(val) {
	    		return val === 'Apartments';
	    	});    	
	    break;
	}


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





function getAvailableUnitViewsOptions(propertyType,building,groupId){

	var units = [];
	var totalUnitsInBuilding = [];
	var availableUnits = [];
	var options =[];
	units = _projectData.units;


	if (buildingId==="all") {
		var availableUnits = _.filter(units , function(unit){ if(unit.availability === "available"){return unit;} });			
	}
	else{
		var availableUnits = _.filter(units , function(unit){ if(unit.availability === "available" && unit.building_id == buildingId){return unit;} });
	}


	if(groupId != ''){
		availableUnits = _.filter(availableUnits , function(unit){ if(unit.floor_group_id == groupId){return unit;} });
	}



	switch(propertyType) {

	    case "Apartment":
	    	var propertyVariants = _projectData.apartment_variants;
	    	var prop_type_id = _.findKey(_projectData.property_types, function(val) {
	    		return val === 'Apartments';
	    	});    	
	    break;
	}

	/*totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });
	availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });
*/
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

function _updateGlobalState(newStateData,type){

	switch(type) {
	  case "projectMaster":
	      _globalStateData = newStateData;
	      break;
	  case "buildingFloorGroups":
	      _buildingMasterStateData = newStateData;
	      break;

	  case "singleUnits":
	      _groupStateData = newStateData;
	      break;
	  default:
	      _globalStateData = newStateData;
	}	
	
}

function _getProjectMasterData(){
	var projectData = _projectData;
	var finalData = {};
	var projectMasterData = {"projectTitle":"", "projectLogo": "#", "logoExist": false, "unitCount":0, "shadowImages":[],"buildings":[],"showShadow":false, "breakpoints":[0], "chosenBreakpoint": 0,"filterTypes":[],"search_filters":{},"applied_filters":{}, isFilterApplied:false,"unitIndexToHighlight":0};
	var buildings = [];
	var allUnits= [];
	var unitTypes= [];

	if(!_.isEmpty(projectData)){
		var buildingsWithUnits = [];

		projectMasterData.projectTitle = projectData.project_title ; 
		projectMasterData.projectLogo = projectData.logo ; 
		projectMasterData.logoExist = projectData.logo_exist ; 
		projectMasterData.shadowImages = projectData.shadow_images ; 

		breakpoints = projectData.breakpoints 
		projectMasterData.breakpoints = breakpoints; 
		projectMasterData.chosenBreakpoint = breakpoints[0] ;  
		
		unitCount = getUnitCount('Apartments',{},'','') ;
		projectMasterData.totalCount = unitCount.total.length;
		projectMasterData.availableCount = unitCount.available.length;
		projectMasterData.filteredCount = unitCount.filtered.length;
		
		buildings = projectData.buildings;
		allUnits = projectData.units;

		buildingsWithUnits = getBuildingUnits(buildings, allUnits, []);

		projectMasterData.buildings = buildingsWithUnits;

        projectMasterData.filterTypes = getFilterTypes("Apartment",'','');
	}

	finalData = {"data": projectMasterData};

	return finalData;
}

function getFilteredProjectMasterData(buildingId,groupId){

	var newProjectData;
	var appliedFilters;

	var newProjectData = {};

	/*if(buildingId != ''){
		newProjectData = _buildingMasterStateData.data;
		appliedFilters = _buildingMasterStateData.data.applied_filters;
	}else{
		newProjectData = _globalStateData.data;
		appliedFilters = _globalStateData.data.applied_filters;
	}

	if(groupId != ''){
		newProjectData = _groupStateData.data;
		appliedFilters = _groupStateData.data.applied_filters;
	}*/

	if(buildingId != '' && groupId != ''){
		newProjectData = _groupStateData.data;
		appliedFilters = _groupStateData.data.applied_filters;
	}else if(buildingId != '' && groupId == ''){
		newProjectData = _buildingMasterStateData.data;
		appliedFilters = _buildingMasterStateData.data.applied_filters;
	}else{
		newProjectData = _globalStateData.data;
		appliedFilters = _globalStateData.data.applied_filters;
	}

	
	apartmentUnits =  getUnitCount('Apartments', appliedFilters, buildingId, groupId);
	
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
		newProjectData.applyFiltersSvgCheck = true;
	}
	else{
		newProjectData.isFilterApplied = true;
		newProjectData.applyFiltersSvgCheck = true;
		
	}

    return newProjectData;

}




function getSimilarUnits(unitId){
	var unitId = parseInt(unitId);
	var allUnits = _projectData.units;
	var unitData = _.findWhere(allUnits, {id: unitId});

	var unitVariantId = unitData.unit_variant_id;
	var propertyId = unitData.property_type_id ;
	var propertyTypeName = getPropertyType(propertyId);

	var appliedFilters = _globalStateData.data.applied_filters;

	var simUnits = [];
	var remainingUnits = [];

	//filters logic
	if(appliedFilters.length>0){
		simUnits = [];
	}

	//same variant logic
	if(simUnits.length<4){
		variantUnits = getAllVariantsUnits(allUnits,unitVariantId);
		simUnits = combinedUnits(simUnits,variantUnits);
	}

	//exact same budget logic
	if(simUnits.length<4){
		budgetUnits = _.filter(allUnits , function(unit){
			if(unit.availability === "available" && unit.selling_amount === unitData.selling_amount){
				return unit;
			} 
		});
		simUnits = combinedUnits(simUnits,budgetUnits);
	}

	//closest budget logic
	if(simUnits.length<4){
		var count = 4-simUnits.length;
		simBudgetsUnits = getSimilarUnitsByBudget(allUnits,unitData.selling_amount,count);
		simUnits = combinedUnits(simUnits,simBudgetsUnits);
	}

	if(simUnits.length>4){
	simUnits.length = 4;
	}
	

	var similarUnits = [];
	_.each(simUnits, function(unit){

		unitVariantId = unit.unit_variant_id;
		upropertyId = unit.property_type_id ;		
		upropertyTypeName = getPropertyType(propertyId);
		unitVariantData = getPropertyVariantsAttributes(propertyTypeName,unitVariantId);

		var similar = {
			id: unit.id,
			name: unit.unit_name,
			sellingAmount: unit.selling_amount,
			unitType: unitVariantData.unitTypeName,
			builtUpArea: unitVariantData.super_built_up_area
		};

	similarUnits.push(similar);
	});

	return similarUnits;
}




function combinedUnits(preUnits,newUnits){
	var combUnits = [preUnits,newUnits];
	var simUnits = [];
	_.each(combUnits, function(unit){
		_.each(unit, function(inunit){
			simUnits.push(inunit);
		});
	});
	return _.uniq(simUnits);
}



function getAllVariantsUnits(allUnits,unitVariantId){
	var variantUnits = _.filter(allUnits , function(unit){
		if(unit.availability === "available" && unit.unit_variant_id === unitVariantId){
			return unit;
		} 
	});
	return variantUnits;
}




function getSimilarUnitsByBudget(allUnits,sellingAmount,count){
	var availableUnits = _.filter(allUnits , function(unit){
		if(unit.availability === "available" && unit.selling_amount != sellingAmount){
			return unit;
		} 
	});
	
	allAmounts = _.uniq(_.pluck(availableUnits, "selling_amount"));
	allAmounts = _.sortBy(allAmounts, function(num) {
		return num;
	});

	var getClosests =  getClosestBudget(allAmounts, sellingAmount, count);

	var simBudgetUnits = _.filter(allUnits , function(unit){		
		if(_.indexOf(getClosests, unit.selling_amount) > -1){
			return unit;
		}
	});

	var uniqSimilarBudgets = _.uniq(simBudgetUnits);

	if(uniqSimilarBudgets.length>count){
	uniqSimilarBudgets.length = count;
	}

	return uniqSimilarBudgets;
}




function getClosestBudget(arr, target, count) {

	var minBudget = _.min(arr);
	var maxBudget = _.max(arr);

	if(arr.length<=count){
		return arr;

	}else if(minBudget == target){
		return arr;

	}else if(maxBudget == target){
		return arr;

	}else{
		narr = [];
		return narr;
	}
	
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

		
		unitData.projectMasterImgs = projectData.project_master;

		unitData.variantData = unitVariantData;
		unitData.buildingData = buildingData;
		unitData.propertyTypeName = propertyTypeName;

		unitData.allAmenities = getAllAmenities();

		unitData.similarUnits = getSimilarUnits(unitId);
		
		
		unitData.cfProjectId = projectData.cf_project_id;
		unitData.projectName = projectData.project_title;
	}
	
	return unitData;	
}


function _getBuildingMasterDetails(buildingId){
	var finalData = {};

	buildingId = parseInt(buildingId);

	if(!_.isEmpty(_projectData)){

		if((!_.isEmpty(_globalStateData.data.projectTitle))){
			projectMasterStateData = _globalStateData;

			allBuildings = projectMasterStateData.data.buildings;

			selectedBuilding = _.findWhere(allBuildings,{id:buildingId});

			// send only array of selected building


			delete projectMasterStateData.data.buildings;

			_buildingMasterStateData = projectMasterStateData;
			_buildingMasterStateData.data.buildings = [selectedBuilding];
			//console.log(_buildingMasterStateDat);

			_buildingMasterStateData.data.filterTypes = getFilterTypes("Apartment",buildingId,'');
			
		}
	}

	return _buildingMasterStateData;
}

function getGroupMasterFromProjectData(buildingId,groupId){
	buildingStateData = _getBuildingMasterDetails(buildingId);
	buildingMasterStateData = formatBuildingStateData(buildingStateData);

	// buildings here would refer to floor groups
	allGroups = buildingMasterStateData.data.buildings;

	// selected floor group
	selectedGroup = _.findWhere(allGroups,{id:groupId});  

	// send only array of selected floor group
	delete buildingMasterStateData.data.buildings;


	_groupStateData = buildingMasterStateData ;
	_groupStateData.data.buildings = [selectedGroup];

	return _groupStateData;


}

function getMinUnitPrice (units){
    unitPrices = [];
    unitPrices = _.pluck(units, "selling_amount");
    if(unitPrices.length>0)
        minStartPrice = _.min(unitPrices);
    else{
        minStartPrice = "N/A";
    }


    return minStartPrice;
}

function _getGroupMasterDetails(buildingId,groupId){
	buildingId = parseInt(buildingId);
	groupId = parseInt(groupId);


	if(!_.isEmpty(_projectData)){

		if((!_.isEmpty(_buildingMasterStateData.data.projectTitle))){
			buildingMasterStateData = _buildingMasterStateData;

			// buildings here would refer to floor groups
			allGroups = buildingMasterStateData.data.buildings;

			// selected floor group
			selectedGroup = _.findWhere(allGroups,{id:groupId});  

			// send only array of selected floor group
			delete buildingMasterStateData.data.buildings;


			_groupStateData = buildingMasterStateData;
			_groupStateData.data.buildings = [selectedGroup];

			_groupStateData.data.filterTypes = getFilterTypes("Apartment",buildingId,groupId);
			
		}
		else{
			_groupStateData = getGroupMasterFromProjectData(buildingId,groupId);
			_groupStateData.data.filterTypes = getFilterTypes("Apartment",buildingId,groupId);			
		}
	}
	
	return _groupStateData;

}





function formatBuildingStateData(stateDataToformat){
    var newState = stateDataToformat;

    buildings = stateDataToformat.data.buildings;
    
    if(buildings.length>0){
        newStateData = newState.data;

        floorGroups = [];

        building = buildings[0];

        // building specific data for units
        unitData = building.unitData;
        availableUnitData = building.availableUnitData;
        filteredUnitData = building.filteredUnitData;
        supportedUnitTypes = building.supportedUnitTypes;


        // building floor groups
        floor_groups = building.floor_group;

        _.each(floor_groups, function(floor_group){
            supportedUnitTypes = [];
            floorGrpId = floor_group.id;
            floorGroup = {};

            floorGroup.id = floor_group.id;
            floorGroup.building_name = floor_group.name;
            floorGroup.no_of_floors = floor_group.floors.length;
            floorGroup.primary_breakpoint = floor_group.primary_breakpoint;

            floorGroupUnitData =[];
            floorGroupAvailableUnitData =[];
            floorGroupFilteredUnitData =[];

            // pick only those units from unit data which have the current floor id
            _.each(unitData, function(unit){ 
                unitFloorGrpId = parseInt(unit.floor_group_id); 

                if(floorGrpId===unitFloorGrpId){
                    floorGroupUnitData.push(unit) ;
                } 

            });

            // pick only those units from unit data which have the current floor id
            _.each(availableUnitData, function(unit){ 
                unitFloorGrpId = parseInt(unit.floor_group_id); 

                if(floorGrpId===unitFloorGrpId){
                    floorGroupAvailableUnitData.push(unit) ;
                } 

            });  
            
            // pick only those units from unit data which have the current floor id
            _.each(filteredUnitData, function(unit){ 
                unitFloorGrpId = parseInt(unit.floor_group_id); 

                if(floorGrpId===unitFloorGrpId){
                    floorGroupFilteredUnitData.push(unit);
                } 

            }); 

            floorGroup.unitData = floorGroupUnitData;
            floorGroup.availableUnitData = floorGroupAvailableUnitData;
            floorGroup.filteredUnitData = floorGroupFilteredUnitData;
            floorGroup.unitData = floorGroupUnitData;

            minPrice = 0;

            minStartPrice = getMinUnitPrice(floorGroupUnitData);
            floorGroup.minStartPrice = minStartPrice;

            supportedUnitTypesArr = AppStore.getApartmentUnitTypes(floorGrpId, "floorgroups");
            supportedUnitTypes = _.pluck(supportedUnitTypesArr,"name");
            floorGroup.supportedUnitTypes = supportedUnitTypes;

            floorGroups.push(floorGroup) ;                             

        }.bind(this));

        
        // modify new state data as per building selected
        newStateData.projectTitle = building.building_name;
        newStateData.breakpoints = building.breakpoints;
        newStateData.buildings = floorGroups;
        newStateData.shadowImages = building.shadow_images;

        newState.data = newStateData;


    }



    return newState;
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
	getGroupStateData: function(buildingId,groupId){
		_groupStateData = _getGroupMasterDetails(buildingId,groupId);
		return _groupStateData;
	},	

	updateGlobalState: function(newState,type){
		_updateGlobalState(newState,type);
	},


	getFilteredCount: function(filters){
		return getAppliedFiltersCount(filters);
	},


	getFilteredProjectMasterData: function(buildingId,groupId){

		var newProjectData = getFilteredProjectMasterData(buildingId,groupId);

		return newProjectData;
	},

	getApartmentUnitTypes: function(collectivePropertyTypeId, collectivePropertyType){
		var unitTypes =[];

		unitTypes = getApartmentUnitTypes(collectivePropertyTypeId, '', collectivePropertyType);

		return unitTypes;
	},


	
	
	

  	// Register callback with AppDispatcher
	dispatcherIndex: AppDispatcher.register(function(payload) {
	  var action = payload.action;
	  console.log("dispatchers",action);

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