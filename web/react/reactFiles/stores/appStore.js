var EventEmitter = require('events').EventEmitter,
		Constants = require('../constants.js'),
		assign = require('object-assign');

var AppDispatcher = require('../dispatcher.js');

var _store =  {
	search: {
		text: '',
		xbox: true,
		ps: true,
		not_used: true,
		used: true,
		exchange: true,
		to_sell: true,
		city: Constants.bogota	
	},
	user: {
		logged: false,
		user: '',
		pic: ''
	}
};

var SearchStore = assign({}, EventEmitter.prototype, {

	changeFilterState: function(filterName, new_state){
		switch(filterName){
			case Constants.filter.not_used:
				_store.searchnot_used = new_state;
				break;
			case Constants.filter.used:
				_store.searchused = new_state;
				break;
			case Constants.filter.xbox:
				_store.searchxbox = new_state
				break;
			case Constants.filter.ps:
				_store.searchps = new_state;
				break;
			case Constants.filter.to_sell:
				_store.searchto_sell = new_state;
				break;
			case Constants.filter.exchange:
				_store.searchexchange = new_state;
				break;
		};
	},

	getFilterState: function(filterName){
		var toReturn = false;
		switch(filterName){
			case Constants.filter.not_used:
				toReturn =  _store.searchnot_used;
				break;
			case Constants.filter.used:
				toReturn = _store.searchused;
				break;
			case Constants.filter.xbox:
				toReturn = _store.searchxbox;
				break;
			case Constants.filter.ps:
				toReturn = _store.searchps;
				break;
			case Constants.filter.to_sell:
				toReturn = _store.searchto_sell;
				break;
			case Constants.filter.exchange:
				toReturn = _store.searchexchange;
				break;
		};

		return toReturn;
	},

	changeSearchInput: function(value){
		_store.searchtext = value;	
	},

	searchButtonClicked: function(){
		this.emit(Constants.eventType.search);	
	},

	addSearchButtonClickedListener: function(callback){
		this.on(Constants.eventType.search, callback);
	},
	
	removeSearchButtonClickedListener: function(callback){
		this.removeListener(callback);
	},

	getStore: function(){
		return _store;
	},

});

AppDispatcher.register(function(payload){

	switch(payload.actionType){
		case Constants.actionType.changeFilterState:
			SearchStore.changeFilterState(payload.filter, payload.value);	
			break;
		case Constants.actionType.changeSearchInput:
			SearchStore.changeSearchInput(payload.value);
			break;
		case Constants.actionType.searchButtonClicked:
			SearchStore.searchButtonClicked();
			break;
	};

	return true;

});


module.exports = SearchStore;
