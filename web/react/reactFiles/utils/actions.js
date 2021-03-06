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

	changeSmallSearchInput: function(text){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.changeSmallSearchInput,
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

	goToDetails: function(gameName){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.goToDetails,
			gameName: gameName,
		});
	},

	goToProfile: function(username){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.goToProfile,
			value: username,
		});
	},

	openCertainChatWithUserId: function(user_id){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.openCertainChatWithUserId,
			value: user_id,
		});
	},

	indexReload: function(){
		AppDispatcher.dispatch({
			actionType: Constants.actionType.reloadIndex,
		});
	},

};

module.exports = Actions;
