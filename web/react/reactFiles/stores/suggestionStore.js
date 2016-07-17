var EventEmitter = require('events').EventEmitter,
		AppDispatcher = require('../dispatcher'),
		Constants = require('../constants.js'),
		assign = require('object-assign');

var _store = { 
		value: '',
		xbox: true,
		ps: true,
		suggestions: [
		]
	};

var SuggestionStore = assign({}, EventEmitter.prototype, {
	run: AppDispatcher.register(function(payload){
		switch(payload.actionType){
			case Constants.actionType.changeSearchInput:
				SuggestionStore._onChangeSearchInput(payload.value);
				break;
		}
		return true;
	}),

	_onChangeSearchInput: function(text){
		//get the list from the server
		//for now one let's just add 1 2 and 3 to the text
		_store.suggestions =  [
			text + ' 1',
			text + ' 2',
			text + ' GO'
		];
		//show the list by calling the event
		this.onSuggestionsRefresh();
	},

	onSuggestionsRefresh: function(){
		this.emit(Constants.eventType.suggestionsRefresh);
	},

	addSuggestionsRefreshListener: function(callback){
		this.on(Constants.eventType.suggestionsRefresh, callback);
	},

	removeSuggestionsRefreshListener: function(callback){
		this.removeListener(Constants.eventType.suggestionsRefresh, callback);
	},

	getSuggestions: function(){
		return _store.suggestions;
	},

});

SuggestionStore.run;

module.exports = SuggestionStore;
