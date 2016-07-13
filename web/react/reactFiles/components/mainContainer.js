'use strict';

var React = require('react'),
		SearchField = require('./searchField.js'),
		FilterMainContainer = require('./filterMainContainer.js'),
		SearchButton = require('./searchButton.js');

module.exports = React.createClass({

	render: function(){
		return (
				<div className="mainContainer">
					<SearchField />
					<FilterMainContainer />
					<SearchButton />
				</div>
		);
	},

});
