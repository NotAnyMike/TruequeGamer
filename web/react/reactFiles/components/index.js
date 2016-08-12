'use strict';

var React = require('react'),
		AppStore = require('../stores/appStore.js'),
		Header = require('./header.js'),
		MainContainer = require('./mainContainer.js'),
		Footer = require('./footer.js'),
		Chat = require('./chat.js'),
		Actions = require('../utils/actions.js'),
		Constants = require('../utils/constants.js'),
		Functions = require('../utils/functions.js'),
		browserHistory = require('react-router').browserHistory;

var Link = require('react-router').Link;

module.exports = React.createClass({

	getInitialState: function(){
		var store = AppStore.getStore();
		return store;
	},

	componentDidMount: function(){
		AppStore.addSearchButtonClickedListener(this.onSearch);
		AppStore.addOnFilterRefreshListener(this.onFilterRefresh);
		AppStore.addOnUserUpdateListener(this.onUserUpdated);
		AppStore.addSuggestionsRefreshListener(this.onSuggestionRefresh);
		Functions.startAnalytics();
	},

	componentWillUnmount: function(){
		AppStore.removeSearchButtonClickedListener(this.onSearch);
		AppStore.removeOnFilterRefreshListener(this.onFilterRefresh);
		AppStore.removeOnUserUpdateListener(this.onUserUpdated);
		AppStore.addSuggestionsRefreshListener(this.onSuggestionRefresh);
	},
	
	onUserUpdated: function(){
		var userData = AppStore.getUser();
		this.setState({user: userData});
	},

	onFilterRefresh: function(){
		var search = AppStore.getSearchValues();
		this.setState({search: search});
	},

	onSuggestionRefresh: function(){
		var suggestions = AppStore.getSuggestions();
		this.setState({ suggestions: {value: suggestions.value, list: suggestions.list }});
	},

	changeHandlerForSearchInputFn: function(new_value){
		//this.setState({value: new_value});
		Actions.changeSearchInput(new_value);

		var suggestionsVar = this.state.suggestions.list;
		if(new_value.length <= 3){
			suggestionsVar = [];
		};
		this.setState({suggestions: {value: new_value, list: suggestionsVar}});
	},
	
	suggestionSelectedHandlerFn: function(value){
		var suggestionsList = this.state.suggestions.list;
		this.setState({suggestions: {value: value, list: suggestionsList}});
		Actions.changeSearchInput(value);
	},
	
	onKeyDownHandlerForSearchInput: function(){
		Actions.searchButtonClicked();
	},

	onSearch: function(){
		var store = AppStore.getStore();
		//console.log('title: ' + store.search.text + ' xbox: ' + store.search.xbox + ' ps: ' + store.search.ps + ' not_used: ' + store.search.not_used + ' used: ' + store.search.used + ' exchange: ' + store.search.exchange + ' to_sell: ' + store.search.to_sell + ' city: ' + store.search.city);
		var route = "";
		if(store.search.ps){
			if(store.search.xbox){
				route = Constants.routes.search.both;
			}else{
				route = Constants.routes.search.ps;
			}
		}else{
			route = Constants.routes.search.xbox;
		}
		browserHistory.push(route + store.search.text);
	},

	render: function(){
		var chat;
		if(this.state.user.logged) {
			chat = <Chat user={this.state.user}/>;
		}
		return (
				<div id="semi_body">
					<Header user={this.state.user} />
					<MainContainer 
						searchValues={this.state.search}
						suggestionSelectedHandlerFn={this.suggestionSelectedHandlerFn}
						changeHandlerForSearchInputFn={this.changeHandlerForSearchInputFn}
						onKeyDownHandlerForSearchInputFn={this.onKeyDownHandlerForSearchInput}
						suggestions={this.state.suggestions.list}
						value={this.state.suggestions.value}
					/>
					<Footer />
					{chat}
				</div>
		);
	},

});
