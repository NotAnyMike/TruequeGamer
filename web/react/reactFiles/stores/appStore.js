'use strict';

var EventEmitter = require('events').EventEmitter,
		Constants = require('../utils/constants.js'),
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
				_store.search.not_used = new_state;
				if(new_state === false && _store.search.used ===false){
					_store.search.used = true;
				}
				break;
			case Constants.filter.used:
				_store.search.used = new_state;
				if(new_state === false && _store.search.not_used ===false){
					_store.search.not_used = true;
				}
				break;
			case Constants.filter.xbox:
				_store.search.xbox = new_state
				if(new_state === false && _store.search.ps ===false){
					_store.search.ps = true;
				}
				break;
			case Constants.filter.ps:
				_store.search.ps = new_state;
				if(new_state === false && _store.search.xbox ===false){
					_store.search.xbox = true;
				}
				break;
			case Constants.filter.to_sell:
				_store.search.to_sell = new_state;
				if(new_state === false && _store.search.exchange ===false){
					_store.search.exchange = true;
				}
				break;
			case Constants.filter.exchange:
				_store.search.exchange = new_state;
				if(new_state === false && _store.search.to_sell ===false){
					_store.search.to_sell = true;
				}
				break;
		};
		this.emit(Constants.eventType.filterRefresh);
	},

	getFilterState: function(filterName){
		var toReturn = false;
		switch(filterName){
			case Constants.filter.not_used:
				toReturn =  _store.search.not_used;
				break;
			case Constants.filter.used:
				toReturn = _store.search.used;
				break;
			case Constants.filter.xbox:
				toReturn = _store.search.xbox;
				break;
			case Constants.filter.ps:
				toReturn = _store.search.ps;
				break;
			case Constants.filter.to_sell:
				toReturn = _store.search.to_sell;
				break;
			case Constants.filter.exchange:
				toReturn = _store.search.exchange;
				break;
		};
		return toReturn;
	},

	changeSearchInput: function(value){
		_store.search.text = value;	
	},

	searchButtonClicked: function(){
		this.emit(Constants.eventType.search);	
	},

	addSearchButtonClickedListener: function(callback){
		this.on(Constants.eventType.search, callback);
	},
	
	removeSearchButtonClickedListener: function(callback){
		this.removeListener(Constants.eventType.search, callback);
	},

	addOnFilterRefreshListener: function(callback){
		this.on(Constants.eventType.filterRefresh, callback);
	},

	removeOnFilterRefreshListener: function(callback){
		this.removeListener(Constants.eventType.filterRefresh, callback);
	},

	getStore: function(){
		return _store;
	},

	getSearchValues: function(){
		return _store.search;
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
