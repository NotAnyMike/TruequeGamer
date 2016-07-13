'use strict';

var React = require('react'),
		ConsoleContainer = require('./consoleContainer.js'),
		ExtraFilterContainer = require('./extraFilterContainer.js');

module.exports = React.createClass({

	render: function(){
		return (
			<div className="filterMainContainer">
				<ConsoleContainer />
				<ExtraFilterContainer />
			</div>
		);
	},

});
