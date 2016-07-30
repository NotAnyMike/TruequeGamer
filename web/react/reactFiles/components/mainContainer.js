'use strict';

var React = require('react'),
		SearchField = require('./searchField.js'),
		FilterMainContainer = require('./filterMainContainer.js'),
		SearchButton = require('./searchButton.js');

module.exports = React.createClass({

	propTypes: {
		searchValues: React.PropTypes.object.isRequired
	},

	render: function(){
		return (
				<div className="mainContainer">
					<SearchField />
					<FilterMainContainer searchValues={this.props.searchValues}/>
					<SearchButton />
				</div>
		);
	},

});
