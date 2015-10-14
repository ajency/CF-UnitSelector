var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;


// event that our components are going to listen when change happens
var CHANGE_EVENT = 'change';

// Define initial data points
var _projectData = {}, _selected = null , _globalStateData = {"data":{"projectTitle":"","unitCount":0,"buildings":[],"showShadow":false,"breakpoints":[00 , 15, 45 , 60], "chosenBreakpoint": 0, "filterTypes":[]}};

function getUnitTypeDetails(unitTypeId){
	var unitTypeDetails = {};
	var unitTypes = [];

	if(!_.isEmpty(_projectData)){
		unitTypes = _projectData.unit_types;

		unitTypeDetails = _.find(unitTypes, function(unitType){ 
			if(unitType.id === unitTypeId){
				return unitType;
			}

		 });

	}

	return unitTypeDetails;
}

function getUnitCount(propertyType){
	var unitCount = {"totalCount":0,"availableCount":0};
	var units = [];
	var availableUnits = [];
	var totalUnitsInBuilding = [];

	if (!_.isEmpty(_projectData)){
		units = _projectData.units;


		totalUnitsInBuilding = _.filter(units , function(unit){ if(unit.building_id != 0){return unit;} });
		
		availableUnits = _.filter(totalUnitsInBuilding , function(unit){ if(unit.availability === "available"){return unit;} });
		
		unitCount["totalCount"] = totalUnitsInBuilding.length ;
		unitCount["availableCount"] = availableUnits.length ;
	}

	return unitCount;
} 

function getBuildingUnits(buildings, allUnits){
	var buildingsWithUnits = [];

	_.each(buildings,function(building){
		buildingId = building.id;

		buildingUnits = [];
		availableBuildingUnits = [];
		unitVariants = [];

		_.each(allUnits, function(unit){
			if(unit.building_id === buildingId){
				buildingUnits.push(unit);

				if(unit.availability === "available")
					availableBuildingUnits.push(unit);
			}
			unitVariants.push(unit.unit_variant_id);
		})

		building.unitData = buildingUnits;
		building.availableUnitData = availableBuildingUnits;


		// get project unit types
		unitTypes = getSupportedUnitTypes("Apartments", buildingId);

		building.supportedUnitTypes = unitTypes;

		buildingsWithUnits.push(building);
	})

	return buildingsWithUnits;
}

function getApartmentUnitTypes(buildingId){

	var apartmentVariants = [];
	var apartmentUnitTypes = [];
	var buildingUnits = [];


	if(!_.isEmpty(_projectData)){

		allUnits = _projectData.units;
		buildingUnits = _.filter(allUnits , function(unit){ if(unit.building_id == buildingId){return buildingId;} });

		unitTypes = [];

		buildingUnitVariantIds = _.uniq(_.pluck(buildingUnits, 'unit_variant_id')); 

		apartmentVariants = _projectData.apartment_variants;

		// get only those apartment variants whose id is any of the buildingUnitVariantIds
		buildingUnitVariants = _.filter(apartmentVariants , function(apartmentVariant){ if( _.indexOf(buildingUnitVariantIds, apartmentVariant.id) > -1 ){return apartmentVariant;} });
		
		unitTypes = _.pluck(buildingUnitVariants, 'unit_type_id');

	

		_.each(unitTypes, function(unitTypeId){
			unitTypeDetails = getUnitTypeDetails(unitTypeId);
			apartmentUnitTypes.push(unitTypeDetails.name);
		})
	}

	return apartmentUnitTypes;
}

function getSupportedUnitTypes(propertyType, collectivePropertyTypeId){
	
	var supportedUnitTypes = [];

	switch(propertyType) {

	    case "Apartments":
	    	supportedUnitTypes = getApartmentUnitTypes(collectivePropertyTypeId);	
	    break;

	}

	return supportedUnitTypes;
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
	var projectMasterData = {"projectTitle":"","unitCount":0,"buildings":[],"showShadow":false, "breakpoints":[00 , 15, 45 , 60], "chosenBreakpoint": 0,"filterTypes":[]};
	var buildings = [];
	var allUnits= [];
	var unitTypes= [];

	if(!_.isEmpty(projectData)){
		var buildingsWithUnits = [];

		projectMasterData.projectTitle = projectData.project_title ; 

		breakpoints = projectData.breakpoints 
		projectMasterData.breakpoints = breakpoints; 
		projectMasterData.chosenBreakpoint = breakpoints[0] ;  
		
		unitCount = getUnitCount('Apartments') ;
		projectMasterData.totalCount = unitCount.totalCount;
		projectMasterData.availableCount = unitCount.availableCount;
		
		buildings = projectData.buildings;
		allUnits = projectData.units;

		buildingsWithUnits = getBuildingUnits(buildings, allUnits);

		projectMasterData.buildings = buildingsWithUnits;
		projectMasterData.filterTypes = [{
          filterName: "Unit Type",
          filterDisplayType: "imageCheckbox",
          filterValues : [{id:1,name:"1BHK", isSelected: true},{id:2,name:"2BHK", isSelected: true},{id:3,name:"3BHK",isSelected: true},{id:4,name:"4BHK",isSelected: true}]
        }];
	}

	finalData = {"data": projectMasterData};

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
		console.log("addChangeListener");
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