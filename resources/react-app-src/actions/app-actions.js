var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  
  // Receive inital project data
  receiveProjectData: function(data) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RECEIVE_DATA,
      data: data
    })
  },

  changeUrl: function(url){
  	AppDispatcher.handleViewAction({
  		actionType: AppConstants.CHANGE_URL,
  		data: url
  	})
  }
}

module.exports = AppActions;