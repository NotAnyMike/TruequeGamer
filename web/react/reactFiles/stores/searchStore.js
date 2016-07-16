var EventEmitter = require('events').EventEmitter,
		Constants = require('../constants.js'),
		assign = require('object-assign');

var AppDispatcher = require('../dispatcher.js');

var _store = {
	text: '',
	xbox: true,
	ps: true,
	not_used: true,
	used: true,
	exchange: true,
	to_sell: true,
	city: Constants.bogota	
};

var SearchStore = assign({}, EventEmitter.prototype, {

	changeFilterState: function(filterName, new_state){
		switch(filterName){
			case Constants.filter.not_used:
				_store.not_used = new_state;
				break;
			case Constants.filter.used:
				_store.used = new_state;
				break;
			case Constants.filter.xbox:
				_store.xbox = new_state
				break;
			case Constants.filter.ps:
				_store.ps = new_state;
				break;
			case Constants.filter.to_sell:
				_store.to_sell = new_state;
				break;
			case Constants.filter.exchange:
				_store.exchange = new_state;
				break;
		};
	},

	getFilterState: function(filterName){
		var toReturn = false;
		switch(filterName){
			case Constants.filter.not_used:
				toReturn =  _store.not_used;
				break;
			case Constants.filter.used:
				toReturn = _store.used;
				break;
			case Constants.filter.xbox:
				toReturn = _store.xbox;
				break;
			case Constants.filter.ps:
				toReturn = _store.ps;
				break;
			case Constants.filter.to_sell:
				toReturn = _store.to_sell;
				break;
			case Constants.filter.exchange:
				toReturn = _store.exchange;
				break;
		};

		return toReturn;

	},

	changeSearchInput: function(value){
		_store.text = value;	
	},

	getStore: function(){
		return _store;
	}

});

AppDispatcher.register(function(payload){

	switch(payload.actionType){
		case Constants.actionType.changeFilterState:
			SearchStore.changeFilterState(payload.filter, payload.value);	
			break;
		case Constants.actionType.changeSearchInput:
			SearchStore.changeSearchInput(payload.value);
			break;
	};

	return true;

});


module.exports = SearchStore;
