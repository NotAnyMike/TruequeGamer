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
		this.setState({ suggestions: suggestions, clicked: false, emptyResults: emptyResults});
	},

	goToIndex: function(){
		Actions.indexReload();
		browserHistory.push(Constants.routes.index);
	},

	changeHandler: function(value){
		Actions.changeSmallSearchInput(value);

		if(value.length <= 3){
			var suggestionsVar = [];
			this.setState({suggestions: suggestionsVar, clicked: false,});
		};
	},

	render: function(){
		return (
				<header className={this.props.version}>
					<SearchButtonHeader changeHandlerFn={this.changeHandler} suggestions={this.state.suggestions} />
					<IsotypeContainer version={this.props.version} onIsotypeClickFn={this.goToIndex}/>
					<ProfileLink user={this.props.user} version={this.props.version}/>
				</header>
		);
	},

});
