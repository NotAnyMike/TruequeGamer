'use strict';

var React = require('react'),
		ConsoleContainer = require('./consoleContainer.js'),
		ExtraFilterContainer = require('./extraFilterContainer.js');

module.exports = React.createClass({

	propTypes: {
		searchValues: React.PropTypes.object.isRequired
	},

	render: function(){
		return (
			<div className="filterMainContainer">
				<ConsoleContainer />
				<ExtraFilterContainer searchValues={this.props.searchValues}/>
			</div>
		);
	},

});
