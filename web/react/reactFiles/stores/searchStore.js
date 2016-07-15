var Dispatcher = require('flux').Dispatcher,
		EventEmitter = require('events').EventEmitter,
		Constants = require('../constants.js'),
		assign = require('object-assign');

//var AppDispatcher = new Dispatcher();
var AppDispatcher = require('../dispatcher.js');

var _search = {
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
});

AppDispatcher.register(function(payload){

	switch(payload.actionType){
		case Constants.actionType.changeFilterState:
			console.log('The filter ' + payload.filter + '  has changed, its new status is ' + payload.new_status);
			break;
	};

	return true;

});


module.exports = SearchStore;
