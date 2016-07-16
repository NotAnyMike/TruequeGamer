var Dispatcher = require('flux').Dispatcher,
		Constants = require('./constants.js');

var AppDispatcher = require('./dispatcher.js');

var Actions = {

	changeFilterState: function(filter, new_status){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.changeFilterState,
			filter: filter,
			value: new_status
		});
	},

	changeSearchInput: function(text){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.changeSearchInput,
			value: text
		});
	}

};

module.exports = Actions;
