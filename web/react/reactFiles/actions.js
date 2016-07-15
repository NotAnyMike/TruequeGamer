var Dispatcher = require('flux').Dispatcher,
		Constants = require('./constants.js');

//var AppDispatcher = new Dispatcher();
var AppDispatcher = require('./dispatcher.js');

var Actions = {

	changeFilterState: function(filter, new_status){
		console.log('changeFilterState calling');
		AppDispatcher.dispatch({
			actionType: Constants.actionType.changeFilterState,
			filter: Constants.filter.not_used,
			new_status: new_status
		});
	}

};

module.exports = Actions;
