'use strict';

var React = require('react'),
		ConsoleCheckbox = require('./consoleCheckbox.js');

module.exports = React.createClass({
	
	render: function(){
		return (
			<section className="consoleContainer">
				<ConsoleCheckbox console="ps4" />
				<ConsoleCheckbox console="xboxone" />
				<ConsoleCheckbox console="ps3" />
				<ConsoleCheckbox console="xbox360" />
			</section>
		);
	}

});
