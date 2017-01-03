var Dispatcher = require('flux').Dispatcher,
		Constants = require('./constants.js');

var AppDispatcher = require('../dispatcher.js');

var Actions = {

	changeFilterState: function(filter, value){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.changeFilterState,
			filter: filter,
			value: value
		});
	},

	changeSearchInput: function(text){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.changeSearchInput,
			value: text
		});
	},

	searchButtonClicked: function(){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.searchButtonClicked
		});
	},

	sendMessage: function(chat_id, value){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.sendMessage,
			chat_id: chat_id,
			value: value,
		});
	},

	chatOpen: function(id){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.chatOpen,
			value: id,
		});
	},

	setSearchChatValue: function(value){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.changeSearchChatValue,
			value: value,
		});
	},

	goToDetails: function(){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.goToDetails,
		});
	},

};

module.exports = Actions;
