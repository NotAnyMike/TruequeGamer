'use strict';

var React = require('react'),
		IsotypeContainer = require('./isotypeContainer.js'),
		ProfileLink = require('./profileLink.js'),
		SearchButtonHeader = require('./searchButtonHeader.js'),
		browserHistory = require('react-router').browserHistory,
		Actions = require('../utils/actions.js'),
		Constants = require('../utils/constants');

module.exports = React.createClass({
	
	propTypes: {
		version: React.PropTypes.oneOf([Constants.header.versions.normal, Constants.header.versions.negative]),
	},

	getInitialState: function(){
		return ({suggestions: []});
	},
	
	componentWillMount: function(){
	},

	componentWillUnmount: function(){
	},

	getDefaultProps: function(){
		return ({version: Constants.header.versions.normal});
	},

	goToIndex: function(){
		Actions.indexReload();
		browserHistory.push(Constants.routes.index);
	},

	changeHandlerForSearchInputFn: function(new_value){
		Actions.changeSearchInput(new_value);

		var suggestionsVar = this.state.suggestions.list;
		if(new_value.length <= 3){
			suggestionsVar = [];
		};
		this.setState({suggestions: {value: new_value, list: suggestionsVar, clicked: false, }});
	},

	render: function(){
		return (
				<header className={this.props.version}>
					<SearchButtonHeader changeHandlerFn={this.changeHandlerForSearchInputFn} suggestions={this.state.suggestions} />
					<IsotypeContainer version={this.props.version} onIsotypeClickFn={this.goToIndex}/>
					<ProfileLink user={this.props.user} version={this.props.version}/>
				</header>
		);
	},

});
