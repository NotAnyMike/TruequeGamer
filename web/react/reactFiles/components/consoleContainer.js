'use strict';

var React = require('react'),
		ConsoleCheckbox = require('./consoleCheckbox.js'),
		Constants = require('../utils/constants.js');

module.exports = React.createClass({
	
	render: function(){
		return (
			<section className="consoleContainer">
				<ConsoleCheckbox console="ps4" filterType={Constants.filter.ps} />
				<ConsoleCheckbox console="xboxone" filterType={Constants.filter.xbox} />
				<ConsoleCheckbox console="ps3" filterType={Constants.filter.ps} />
				<ConsoleCheckbox console="xbox360" filterType={Constants.filter.xbox} />
			</section>
		);
	}

});
