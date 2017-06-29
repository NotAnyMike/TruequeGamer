'use strict';

var EventEmitter = require('events').EventEmitter,
		Constants = require('../utils/constants.js'),
		ChatStore = require('./chatStore.js'),
		assign = require('object-assign');

var AppDispatcher = require('../dispatcher.js');

var _store =  {
	suggestions: {
		value: '',
		xbox: true,
		ps: true,
		list: [
		]
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
			cover: 'img/cover.png',
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
};

if(self.fetch){
	//do something with fetch
	var url = '/api/user.json';
	if(process.env.NODE_ENV === 'production'){
		url = 'api/user/';
	}
	fetch(url, { credentials: 'same-origin' }).then(
		function(response){return response.json()}).then(
			function(json){
				if(json.username === "" || json.username === null){
					_store.user.logged = false;
				}else{
					_store.user = json;
					_store.user.logged = true;
					ChatStore.setUser(json)
				}
				AppStore.userUpdated();
			}
		);
} else {
	//use the normal xhtml stuff
}

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
		if(self.fetch){
			//use fetch
			
			var url = '';
			if(process.env.NODE_ENV === "production"){
				url = '/api/profile/'.concat(username,'/');
			}else{
				url = '/api/profile/profile.json';
			}
			
			fetch(url).then(function(response){
				response.json().then(function(json){
					//do something with json
					_store.profile = json;
					AppStore.onProfileUpdated()
				});
			});

		}else{
			//use xml
		}
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
		//get results
		if(self.fetch){
			//use fetch
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
				//TODO: CHANGE URL
				url = '/api/game/'.concat(consoles,'/',newVariable,'/',sell,'/',stringValue,'/');
			}else{
				url = '/api/game_details/thewitcher.json';
			}

			
			fetch(url).then(function(response){
				response.json().then(function(json){
					//do something with json
					_store.gameDetails = json;
					AppStore.emit(Constants.eventType.availableGamesUpdate);
				});
			});
		}else{
			//use xml
		}
	},

	search: function(gameConsole, game){
		//get results
		if(self.fetch){
			//use fetch
			var stringValue = _store.search.text;

			var consoles = 'ps-xbox';
			if(_store.search.ps && _store.search.xbox) consoles = 'ps-xbox';
			else if (_store.search.ps) consoles = 'ps';
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


			fetch(url).then(function(response){
				response.json().then(function(json){
					//do something with json
					_store.searchResult.results = json;
					AppStore.emit(Constants.eventType.resultsUpdated);
				});
			});
		}else{
			//use xml
		}
	},

	onChangeSearchInput: function(text){
		//get the list from the server
		//for now one let's just add 1 2 and 3 to the text
		if(text.length > 3){
			var url = '/api/suggestions/ps-xbox/suggestions.json';
			if(process.env.NODE_ENV === "production"){
				var consoles = '';
				if(_store.search.ps && _store.search.xbox) consoles = 'ps-xbox';
				else if (_store.search.ps) consoles = 'ps';
				else consoles = 'xbox';

				var sell = 'both';
				if(_store.search.to_sell && !_store.search.exchange) sell = 'sell';
				else if(!_store.search.to_sell && _store.search.exchange) sell = 'exchange';

				var newVariable = 'both';
				if(_store.search.not_used && !_store.search.used) newVariable = 'new';
				else if(!_store.search.not_used && _store.search.used) newVariable = 'used';
				
				url = '/api/suggestions/' + consoles + '/' +  newVariable + '/' + sell +'/' + text + '/';
			}
			if(self.fetch){
				fetch(url).then(function(response){
					response.json().then(function(json){
						_store.suggestions.list = json;	
						_store.suggestions.value = text;
						AppStore.onSuggestionsRefresh();
					});	
				});
			}else{
				//do something with xml stuff
			}
			/*
			_store.suggestions.list =  [
				text + ' 1',
				text + ' 2',
				text + ' GO'
			];
			*/
			//show the list by calling the event
		}
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

	addOnResultsUpdatedListener: function(callback){
		this.on(Constants.eventType.resultsUpdated, callback);
	},

	removeOnResultsUpdatedListener: function(callback){
		this.removeListener(Constants.eventType.resultsUpdated, callback);
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
			AppStore.onChangeSearchInput(payload.value);
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
	};

	return true;

});


module.exports = AppStore;
