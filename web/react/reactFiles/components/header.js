'use strict';

var React = require('react'),
		IsotypeContainer = require('./isotypeContainer.js'),
		ProfileLink = require('./profileLink.js'),
		SearchButtonHeader = require('./searchButtonHeader.js');

module.exports = React.createClass({

	render: function(){
		return (
				<header>
					<SearchButtonHeader />
					<IsotypeContainer />
					<ProfileLink user={this.props.user}/>
				</header>
		);
	},

});
