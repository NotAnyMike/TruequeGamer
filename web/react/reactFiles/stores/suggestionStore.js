var EventEmitter = require('events').EventEmitter,
		AppDispatcher = require('../dispatcher'),
		Constants = require('../constants.js'),
		assign = require('object-assign');

var _store = { 
		value: '',
		xbox: true,
		ps: true,
		suggestions: [
			'pokemon Go',
			'pokemon X',
			'pokemon Y'
		]
	};

var SuggestionStore = assign({}, EventEmitter.prototype, {
	run: AppDispatcher.register(function(payload){
		switch(payload.actionType){
			case Constants.actionType.changeSearchInput:
				//get the list from the server
				//show the list by calling the event
				break;
		}
		return true;
	}),

	onSuggestionsRefresh: function(){
		this.emit(Constants.eventType.suggestionsRefresh);
	},

	addSuggestionsRefreshListener: function(callback){
		this.on(Constants.eventType.suggestionsRefresh, callback);
	},

	removeSuggestionsRefreshListener: function(callback){
		this.removeListener(Constants.eventType.suggestionsRefresh, callback);
	}
});

SuggestionStore.run;

module.exports = SuggestionStore;
