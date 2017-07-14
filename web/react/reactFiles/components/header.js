'use strict';

var React = require('react'),
		AppStore = require('../stores/appStore.js'),
		IsotypeContainer = require('./isotypeContainer.js'),
		ProfileLink = require('./profileLink.js'),
		SearchButtonHeader = require('./searchButtonHeader.js'),
		browserHistory = require('react-router').browserHistory,
		Actions = require('../utils/actions.js'),
		Constants = require('../utils/constants');

module.exports = React.createClass({
	
	propTypes: {
		version: React.PropTypes.oneOf([Constants.header.versions.normal, Constants.header.versions.negative]),
		suggestions: React.PropTypes.array,
	},

	getInitialState: function(){
		return ({
			suggestions:[],
			clicked: false,
			emptyResults: false,
			text: '',
		});
	},
	
	getDefaultProps: function(){
		return ({version: Constants.header.versions.normal});
	},

	componentWillMount: function(){
		AppStore.addSmallSuggestionsRefreshListener(this.updateSuggestions);
	},

	componentWillUnmount: function(){
		AppStore.removeSmallSuggestionsRefreshListener(this.updateSuggestions);
	},

	updateSuggestions: function(suggestions){
		var emptyResults = false;
		if(suggestions.length === 0) emptyResults = true;
		else suggestions = suggestions.slice(0,3);
		this.setState({ suggestions: suggestions, clicked: false, emptyResults: emptyResults});
	},

	goToIndex: function(){
		Actions.indexReload();
		browserHistory.push(Constants.routes.index);
	},

	changeHandler: function(value){
		Actions.changeSmallSearchInput(value);

		var suggestionsVar = this.state.suggestions;

		if(value.length <= 3){
			suggestionsVar = [];
		};
		this.setState({text: value, suggestions: suggestionsVar, clicked: false,});
	},
	
	onSearch: function(){
		this.searchWithText(this.state.text.trim());
	},

	searchWithText: function(textToSearch){
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
		browserHistory.push(route + textToSearch.trim());
	},

	onSuggestionClick: function(text){
		this.setState({text: text});
		this.searchWithText(text);
	},

	render: function(){
		return (
				<header className={this.props.version}>
					<SearchButtonHeader onSuggestionClickFn={this.onSuggestionClick} emptyResults={this.state.emptyResults} changeHandlerFn={this.changeHandler} suggestions={this.state.suggestions} searchFn={this.onSearch}/>
					<IsotypeContainer version={this.props.version} onIsotypeClickFn={this.goToIndex}/>
					<ProfileLink user={this.props.user} version={this.props.version}/>
				</header>
		);
	},

});
