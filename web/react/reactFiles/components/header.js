'use strict';

var React = require('react'),
		IsotypeContainer = require('./isotypeContainer.js'),
		ProfileLink = require('./profileLink.js'),
		SearchButtonHeader = require('./searchButtonHeader.js'),
		browserHistory = require('react-router').browserHistory,
		Constants = require('../utils/constants');

module.exports = React.createClass({
	
	propTypes: {
		version: React.PropTypes.oneOf([Constants.header.versions.normal, Constants.header.versions.negative])
	},

	getDefaultProps: function(){
		return ({version: Constants.header.versions.normal});
	},

	goToIndex: function(){
		browserHistory.push(Constants.routes.index);
	},

	render: function(){
		return (
				<header className={this.props.version}>
					<SearchButtonHeader />
					<IsotypeContainer version={this.props.version} onIsotypeClickFn={this.goToIndex}/>
					<ProfileLink user={this.props.user} version={this.props.version}/>
				</header>
		);
	},

});
