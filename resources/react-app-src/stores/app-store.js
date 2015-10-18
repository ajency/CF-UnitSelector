var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var immutabilityHelpers = require('react-addons-update');


// event that our components are going to listen when change happens
var CHANGE_EVENT = 'change';

// Define initial data points
var _projectData = {}, _selected = null ;
var _globalStateData = {"data":{"projectTitle":"","unitCount":0,"buildings":[],"showShadow":false,"breakpoints":[0], "chosenBreakpoint": 0, "filterTypes":[],"search_entity":"project", "search_filters":{"unitTypes":[]} , "applied_filters":{} , "isFilterApplied":false } };


function getUnitTypeDetails(unitTypeId){
	var unitTypeDetails = {};
	var unitTypes = [];

	var searchFilterUnitTypes = _globalStateData.data.search_filters.unitTypes;

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

		// apply filters based on applied filters and return count of filtered units
		if(_.isEmpty(appliedFilters)){
			filteredUnits = [];
		}
		else{

			_.each(appliedFilters, function(appliedFilter, key){
				if(key==="unitTypes"){
					unitTypesTocheck = appliedFilter; // array of unit type ids

					if(unitTypesTocheck.length === 0){
						filteredUnits = availableUnits ;
					}
					else

					// loop through each of the available units and get its unit variant id
					_.each(availableUnits, function(availableUnit){
						unitVariantId = availableUnit.unit_variant_id;
						
						// get unit type id from unit variant id
						unitTypeId = getUnitTypeIdFromUnitVariantId(propertyType,unitVariantId);

						if(_.indexOf(unitTypesTocheck, unitTypeId.toString()) > -1){
							filteredUnits.push(availableUnit);
						}
					});


				}
			});

		}
		
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

	_.each(supportedFilterTypes, function(supportedFilterType){

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
	});

	// filterTypes = [{
 //          filterName: "Unit Type",
 //          filterDisplayType: "imageCheckbox",
 //          filterValues : [{id:1,name:"1BHK", isSelected: true},{id:2,name:"2BHK", isSelected: true},{id:3,name:"3BHK",isSelected: true},{id:4,name:"5BHK",isSelected: true}]
 //        }];

    return filterTypes;

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
	var projectMasterData = {"projectTitle":"","unitCount":0,"buildings":[],"showShadow":false, "breakpoints":[0], "chosenBreakpoint": 0,"filterTypes":[],"search_filters":{"unitTypes":[]},"applied_filters":{}, isFilterApplied:false};
	var buildings = [];
	var allUnits= [];
	var unitTypes= [];

	if(!_.isEmpty(projectData)){
		var buildingsWithUnits = [];

		projectMasterData.projectTitle = projectData.project_title ; 

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
	

	newProjectData = _globalStateData.data;

	

	apartmentUnits =  getUnitCount('Apartments', _globalStateData.data.applied_filters) ;
	
	newProjectData.availableCount = apartmentUnits.available.length;
	
	newProjectData.filteredCount = apartmentUnits.filtered.length;
	

	buildings = _projectData.buildings;
	
	allUnits = _projectData.units;
	
	filteredUnits = apartmentUnits.filtered;
	

	buildingsWithUnits = getBuildingUnits(buildings, allUnits, filteredUnits );


	newProjectData.buildings = buildingsWithUnits;

	// since filters are applied set isFilterAPplied as true
	newProjectData.isFilterApplied = true;
	

    return newProjectData;




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