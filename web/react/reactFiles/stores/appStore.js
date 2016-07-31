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
		logged: true,
		user: 'Ash Ketchum',
		pic: '/img/face1.png'
	},
	searchResult:{
		results: {
			'search1': [
				{
					id: 1,
					name: 'the witcher: the wild hunt',
					psPrice: 70000,
					xboxPrice: 80000,
					psExchange: true,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/cover.png',
				},
				{
					id: 2,
					name: 'battlefield 1',
					psPrice: 70000,
					xboxPrice: 80000,
					psExchange: false,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/battlefield1.png',
				},
				{
					id: 3,
					name: 'bloodborne',
					psPrice: 70000,
					xboxPrice: 80000,
					psExchange: true,
					xboxExchange: false,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/bloodborne.png',
				},
				{
					id: 4,
					name: 'call of duty balck ops iii',
					psPrice: 70000,
					xboxPrice: 80000,
					psExchange: false,
					xboxExchange: false,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/codblackops.png',
				},
				{
					id: 5,
					name: 'dark souls iii',
					psPrice: null,
					xboxPrice: 80000,
					psExchange: true,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/darksoulsiii.png',
				},
				{
					id: 6,
					name: 'doom',
					psPrice: 70000,
					xboxPrice: null,
					psExchange: true,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/doom.png',
				},
				{
					id: 7,
					name: 'fallout 4',
					psPrice: null,
					xboxPrice: null,
					psExchange: true,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/fallout4.png',
				},
				{
					id: 8,
					name: 'farcry primal',
					psPrice: null,
					xboxPrice: 80000,
					psExchange: true,
					xboxExchange: false,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/farcry.png',
				},
				{
					id: 9,
					name: 'grand theft auto V',
					psPrice: 70000,
					xboxPrice: null,
					psExchange: false,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/gtav.png',
				},
				{
					id: 10,
					name: 'metal gear solid the phantom pain',
					psPrice: 70000,
					xboxPrice: null,
					psExchange: true,
					xboxExchange: true,
					psOnly: true,
					xboxOnly: false,
					availableOnXbox: false,
					availableOnPs: false,
					psOnlyPrice: false,
					xboxOnlyPrice: false,
					cover: '/img/games/metalgear.png',
				},
				{
					id: 11,
					name: 'mirror edge',
					psPrice: null,
					xboxPrice: 80000,
					psExchange: true,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: true,
					availableOnXbox: false,
					availableOnPs: false,
					psOnlyPrice: false,
					xboxOnlyPrice: false,
					cover: '/img/games/mirroredge.png',
				},
				{
					id: 12,
					name: 'overwatch',
					psPrice: 70000,
					xboxPrice: 60000,
					psExchange: true,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: false,
					availableOnPs: false,
					psOnlyPrice: false,
					xboxOnlyPrice: false,
					cover: '/img/games/overwatch.png',
				},
				{
					id: 13,
					name: 'the division',
					psPrice: 70000,
					xboxPrice: 80000,
					psExchange: true,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: false,
					availableOnPs: false,
					psOnlyPrice: false,
					xboxOnlyPrice: false,
					cover: '/img/games/thedivision.png',
				},
				{
					id: 14,
					name: "uncharted 4: a thief's end",
					psPrice: 70000,
					xboxPrice: 80000,
					psExchange: true,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/uncharted4.png',
				},
				{
					id: 15,
					name: 'until dawn',
					psPrice: 70000,
					xboxPrice: 80000,
					psExchange: true,
					xboxExchange: true,
					psOnly: false,
					xboxOnly: false,
					availableOnXbox: true,
					availableOnPs: true,
					psOnlyPrice: true,
					xboxOnlyPrice: true,
					cover: '/img/games/untildawn.png',
				},
			],
		},
	},
};

var SearchStore = assign({}, EventEmitter.prototype, {

	changeFilterState: function(filterName, new_state){
		switch(filterName){
			case Constants.filter.ps:
				_store.search.ps = new_state;
				if(new_state === false && _store.search.xbox === false){
					_store.search.xbox = true;
				}
				break;
			case Constants.filter.xbox:
				_store.search.xbox = new_state;
				if(new_state === false && _store.search.ps === false){
					_store.search.ps = true;
				}
				break;
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

	search: function(gameConsole, game){
		console.log("search for " + gameConsole + " the game with name " + game);
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
