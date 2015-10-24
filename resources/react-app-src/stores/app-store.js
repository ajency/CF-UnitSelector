var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var immutabilityHelpers = require('react-addons-update');


// event that our components are going to listen when change happens
var CHANGE_EVENT = 'change';

// Define initial data points
var _projectData = {}, _selected = null ;
var _unitStateData = {data:{}};
var _globalStateData = {"data":{"projectTitle":"", "projectLogo": "#", "unitCount":0,"buildings":[],"showShadow":false,"breakpoints":[0], "chosenBreakpoint": 0, "filterTypes":[],"search_entity":"project", "search_filters":{} , "applied_filters":{} , "isFilterApplied":false, "unitIndexToHighlight":0 } };


function getUnitTypeDetails(unitTypeId){
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

	var variants;

	if(propertyType==="Apartments"){
		variants = _projectData.apartment_variants;

		propVariant = _.findWhere(variants, {id: variantId});

	}

	return propVariant.variant_attributes[key];
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



				if(key==="Flooring"){
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

	    		if(checkVariationIsUnique(variants,variantName)){
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

		if(supportedFilterType==="Flooring"){
			filterType.type = "Flooring";
			filterType.filterName = "Flooring";
			filterType.filterDisplayType = "normalCheckbox";
						
			filterType.filterValues = getPropertyVariants(propertyType,'Flooring');

			filterTypes.push(filterType);
		}


		if(supportedFilterType==="budget"){
			filterType.type = "budget";
			filterType.filterName = "Budget";
			filterType.filterDisplayType = "range";
			
			filterType.filterValues = getfilterRangeValues('budget');

			filterTypes.push(filterType);
		}

	});

    return filterTypes;
}


function getfilterRangeValues( listName ){
	var units = [];
	var totalUnitsInBuilding = [];
	var availableUnits = [];
	units = _projectData.units;
	totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });
	availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });

	switch(listName) {

	    case "budget":
	    	var values = _.pluck(availableUnits, "selling_amount");
	    	var rangeSet = [1000000,2000000,3000000,4000000,5000000,8000000,10000000,20000000,30000000];
	    break;

	} 

	var minVal = _.min(values);
	var maxVal = _.max(values);
	rangeSet.unshift(minVal);
	rangeSet.push(maxVal);
	var range = _.filter(rangeSet, function(x) { return x >= minVal && x <= maxVal });

	return range;	
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
	}
	
	return unitData;	
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