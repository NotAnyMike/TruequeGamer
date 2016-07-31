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
				<ConsoleContainer xbox={this.props.searchValues.xbox} ps={this.props.searchValues.ps} />
				<ExtraFilterContainer searchValues={this.props.searchValues}/>
			</div>
		);
	},

});
