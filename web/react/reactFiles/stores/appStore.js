'use strict';

var EventEmitter = require('events').EventEmitter,
		Constants = require('../utils/constants.js'),
		Functions = require('../utils/functions.js'),
		ChatStore = require('./chatStore.js'),
		assign = require('object-assign');

var AppDispatcher = require('../dispatcher.js');

Functions.startAnalytics();

var _store =  {
	suggestions: {
		value: '',
		xbox: true,
		ps: true,
		list: [],
		clicked: false, //in order to hide suggestions
		emptyResults: false,
	},
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
	},
	searchResult:{
		results:  [],
	},
	gameDetails:{
		game:{
			name: 'cargando...',
			min_price: 0,
			cover: Constants.genericCover,
			higher_prices: false,
			city: null,
		},
		list: [],
	},
	profile: {
		profile: {
			first_name: "loading",
			last_name: "...",
			numberOfGames: 0,
			picture: null,
		},
		list: [],
	},
	informBug: {
		comment: '',
		send: null,
	},
};

var url = '/api/user.json';
if(process.env.NODE_ENV === 'production'){
	url = '/api/user/';
}
var header = Functions.getCustomHeader('get', url, null, true);

Functions.fetchAdvanced(header).then(resp => resp.json()).then(json => {
	if(json.username === "" || json.username === null){
		_store.user.logged = false;
	}else{
		_store.user = json;
		_store.user.logged = true;
		ChatStore.setUser(json)
	}
	AppStore.userUpdated();
});

var AppStore = assign({}, EventEmitter.prototype, {

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

	userUpdated: function(){
		this.emit(Constants.eventType.userUpdated);
	},

	addOnUserUpdateListener: function(callback){
		this.on(Constants.eventType.userUpdated, callback);
	},

	removeOnUserUpdateListener: function(callback){
		this.removeListener(Constants.eventType.userUpdated, callback);
	},

	addOnGoToProfileListener: function(callback){
		this.on(Constants.eventType.goToProfile, callback);
	},

	removeOnGoToProfileListener: function(callback){
		this.removeListener(Constants.eventType.goToProfile, callback);
	},

	goToProfilePage: function(username){
		this.emit(Constants.eventType.goToProfile, username);
	},

	addOnGoToDetailsListener: function(callback){
		this.on(Constants.eventType.goToDetails, callback);
	},

	removeOnGoToDetailsListener: function(callback){
		this.removeListener(Constants.eventType.goToDetails, callback);
	},

	goToDetailsPage: function(name){
		this.emit(Constants.eventType.goToDetails, name);
	},

	getStore: function(){
		return _store;
	},

	getSearchValues: function(){
		return _store.search;
	},

	getUser: function(){
		return _store.user;
	},

	onProfileUpdated: function(){
		this.emit(Constants.eventType.profileUpdated);
	},
	
	getProfile: function(username){
		var url = '';
		if(process.env.NODE_ENV === "production"){
			url = '/api/profile/'.concat(username,'/');
		}else{
			url = '/api/profile/profile.json';
		}

		Functions.fetchAdvanced(url).then(resp => resp.json()).then(json => {
			_store.profile = json;
			AppStore.onProfileUpdated()
		});	
	},

	addOnProfileUpdatesListener: function(callback){
		this.on(Constants.eventType.profileUpdated, callback);
	},

	removeOnProfileUpdatesListener: function(callback){
		this.removeListener(Constants.eventType.profileUpdated, callback);
	},

	addOnGamesAvailableUpdateListener: function(callback){
		this.on(Constants.eventType.availableGamesUpdate, callback);
	},

	removeOnGamesAvailableUpdateListener: function(callback){
		this.removeListener(Constants.eventType.availableGamesUpdate, callback);
	},

	getGamesAvailable: function(gameConsole, game){
		var stringValue = game;

		var consoles = 'ps-xbox';
		if(gameConsole === Constants.consoles.both || gameConsole === "ps-xbox" || gameConsole === 'xbox-ps') consoles = 'ps-xbox';
		else if (gameConsole === 'ps') consoles = 'ps';
		else consoles = 'xbox';

		var sell = 'both';
		if(_store.search.to_sell && !_store.search.exchange) sell = 'sell';
		else if(!_store.search.to_sell && _store.search.exchange) sell = 'exchange';

		var newVariable = 'both';
		if(_store.search.not_used && !_store.search.used) newVariable = 'new';
		else if(!_store.search.not_used && _store.search.used) newVariable = 'used';

		var url = "";
		if(process.env.NODE_ENV === "production"){
			url = '/api/game/'.concat(consoles,'/',newVariable,'/',sell,'/',stringValue,'/');
		}else{
			url = '/api/game_details/thewitcher.json';
		}

		Functions.fetchAdvanced(url).then(resp => resp.json()).then(json => {
			_store.gameDetails = json;
			AppStore.emit(Constants.eventType.availableGamesUpdate);
		});

	},

	search: function(gameConsole, game){
		//use fetch
		//var stringValue = _store.search.text;
		var stringValue = game; 

		var consoles = 'ps-xbox';
		//if(_store.search.ps && _store.search.xbox) consoles = 'ps-xbox';
		//else if (_store.search.ps) consoles = 'ps';
		if(gameConsole === Constants.consoles.both) consoles = 'ps-xbox';
		else if (gameConsole === Constants.consoles.ps) consoles = 'ps';
		else consoles = 'xbox';

		var sell = 'both';
		if(_store.search.to_sell && !_store.search.exchange) sell = 'sell';
		else if(!_store.search.to_sell && _store.search.exchange) sell = 'exchange';

		var newVariable = 'both';
		if(_store.search.not_used && !_store.search.used) newVariable = 'new';
		else if(!_store.search.not_used && _store.search.used) newVariable = 'used';

		var url = ""
		if(process.env.NODE_ENV === "production"){
			url = '/api/games/' + consoles + '/' + newVariable + '/' + sell + '/' + stringValue + '/';
		}else{
			var url = '/api/games.json';
		}

		Functions.fetchAdvanced(url).then(resp => resp.json()).then(json => {
			_store.searchResult.results = json;
			AppStore.emit(Constants.eventType.resultsUpdated);
		});

	},

	onChangeSearchInput: function(text, small){
		//get the list from the server
		//for now one let's just add 1 2 and 3 to the text
		if(text.length > 3){
			var url = '/api/suggestions/ps-xbox/suggestions.json';
			if(process.env.NODE_ENV === "production"){
				var consoles = 'ps-xbox';
				var sell = 'both';
				var newVariable = 'both';
				if(small === false){
					if(_store.search.ps && _store.search.xbox) consoles = 'ps-xbox';
					else if (_store.search.ps) consoles = 'ps';
					else consoles = 'xbox';

					if(_store.search.to_sell && !_store.search.exchange) sell = 'sell';
					else if(!_store.search.to_sell && _store.search.exchange) sell = 'exchange';

					if(_store.search.not_used && !_store.search.used) newVariable = 'new';
					else if(!_store.search.not_used && _store.search.used) newVariable = 'used';
				}
				
				url = '/api/suggestions/' + consoles + '/' +  newVariable + '/' + sell +'/' + text.trim() + '/';
			}

			Functions.fetchAdvanced(url).then(response => response.json()).then(function(json){
					_store.suggestions.list = json;	
					_store.suggestions.value = text;
					AppStore.onSuggestionsRefresh(json, small);
				});	
		}
	},

	onSuggestionsRefresh: function(list,small){
		if(small === true) this.emit(Constants.eventType.smallSuggestionsRefresh, list);
		else this.emit(Constants.eventType.suggestionsRefresh);
	},

	reloadIndex: function(){
		_store.suggestions.value = '';
		_store.suggestions.xbox = true;
		_store.suggestions.ps = true;
		_store.suggestions.list = [];
		_store.suggestions.list2 = [];

		_store.search.text = '';
		_store.search.xbox = true;
		_store.search.ps= true;
		_store.search.not_used = true;
		_store.search.used = true;
		_store.search.exchange = true;
		_store.search.to_sell = true;
		_store.search.city = Constants.bogota;

		this.emit(Constants.eventType.reloadIndex);
	},

	addSmallSuggestionsRefreshListener: function(callback){
		this.on(Constants.eventType.smallSuggestionsRefresh, callback);
	},

	removeSmallSuggestionsRefreshListener: function(callback){
		this.removeListener(Constants.eventType.smallSuggestionsRefresh, callback);
	},

	addSuggestionsRefreshListener: function(callback){
		this.on(Constants.eventType.suggestionsRefresh, callback);
	},

	removeSuggestionsRefreshListener: function(callback){
		this.removeListener(Constants.eventType.suggestionsRefresh, callback);
	},

	addOnResultsUpdatedListener: function(callback){
		this.on(Constants.eventType.resultsUpdated, callback);
	},

	removeOnResultsUpdatedListener: function(callback){
		this.removeListener(Constants.eventType.resultsUpdated, callback);
	},

	addOnReloadIndexListener: function(callback){
		this.on(Constants.eventType.reloadIndex, callback);
	},

	removeOnReloadIndexListener: function(callback){
		this.removeListener(Constants.eventType.realoadIndex, callback);
	},

	getSuggestionsList: function(){
		return _store.suggestions.list;
	},
	
	getSuggestions: function(){
		return _store.suggestions;
	},

});

AppDispatcher.register(function(payload){

	switch(payload.actionType){
		case Constants.actionType.changeFilterState:
			AppStore.changeFilterState(payload.filter, payload.value);	
			break;
		case Constants.actionType.changeSearchInput:
			AppStore.changeSearchInput(payload.value);
			AppStore.onChangeSearchInput(payload.value, false);
			break;
		case Constants.actionType.changeSmallSearchInput:
			AppStore.onChangeSearchInput(payload.value, true);
			break;
		case Constants.actionType.searchButtonClicked:
			AppStore.searchButtonClicked();
			break;
		case Constants.actionType.goToDetails:
			AppStore.goToDetailsPage(payload.gameName);
			break;
		case Constants.actionType.goToProfile:
			AppStore.goToProfilePage(payload.value);
			break;
		case Constants.actionType.reloadIndex:
			AppStore.reloadIndex();
			break;
	};

	return true;

});


module.exports = AppStore;
