var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;


// event that our components are going to listen when change happens
var CHANGE_EVENT = 'change';

// Define initial data points
var _projectData = {}, _selected = null , _globalStateData = {};


function getUnitCount(propertyType){
	var unitCount = 0;
	var units = [];

	if (!_.isEmpty(_projectData)){
		units = _projectData.units;
	}

	unitCount = units.length ;

	return unitCount;
} 

function getBuildingUnits(buildings, allUnits){
	var buildingsWithUnits = [];

	_.each(buildings,function(building){
		buildingId = building.id;

		buildingUnits = [];

		_.each(allUnits, function(unit){
			if(unit.building_id === buildingId){
				buildingUnits.push(unit);
			}
		})

		building.unitData = buildingUnits;

		buildingsWithUnits.push(building);
	})

	return buildingsWithUnits;
}

// Method to load project data from API
function _loadProjectData(data) {
	_projectData = data['data'];
}

function _getProjectMasterData(){
	var projectData = _projectData;
	var projectMasterData = {};
	var buildings = [];
	var allUnits= [];

	if(!_.isEmpty(projectData)){
		var buildingsWithUnits = [];

		projectMasterData.projectTitle = projectData.project_title ; 
		projectMasterData.unitCount = getUnitCount('Apartments') ; 


		buildings = projectData.buildings;
		allUnits = projectData.units;

		buildingsWithUnits = getBuildingUnits(buildings, allUnits);

		projectMasterData.buildings = buildingsWithUnits;
	}

	return projectMasterData;
}


// AppStore object
var AppStore = merge(EventEmitter.prototype, {
  
	emitChange:function(){
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

  	// Register callback with AppDispatcher
	dispatcherIndex: AppDispatcher.register(function(payload) {
	  var action = payload.action;
	  

	  switch(action.actionType) {

	    // Respond to RECEIVE_DATA action
	    case AppConstants.RECEIVE_DATA:
	      _loadProjectData(action.data);
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