'use strict';

var React = require('react'),
		ConsoleCheckbox = require('./consoleCheckbox.js'),
		Constants = require('../utils/constants.js');

module.exports = React.createClass({

	propTypes: {
		xbox: React.PropTypes.bool.isRequired,
		ps: React.PropTypes.bool.isRequired,
	},

	getDefaultProps: function(){
		return ({
			xbox: false,
			ps: false,
		});
	},	
	
	render: function(){
		return (
			<section className="consoleContainer">
				<ConsoleCheckbox console={Constants.consoles.ps} filterType={Constants.filter.ps} checked={this.props.ps}/>
				<ConsoleCheckbox console={Constants.consoles.xbox} filterType={Constants.filter.xbox} checked={this.props.xbox} />
			</section>
		);
	}

});
