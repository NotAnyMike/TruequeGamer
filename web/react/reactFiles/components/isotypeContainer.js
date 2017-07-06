'use strict';

var React = require('react'),
		Isotype = require('./isotype.js'),
		Slogan = require('./slogan.js'),
		Constants = require('../utils/constants.js');

module.exports = React.createClass({

	propTypes: {
		version: React.PropTypes.oneOf([Constants.header.versions.normal, Constants.header.versions.negative]),
		onIsotypeClickFn: React.PropTypes.func.isRequired,
	},

	getDefaultProps: function(){
		return ({version: Constants.header.versions.normal});
	},
	
	render: function(){
		return (
				<div className="isotypeContainer">
					<Isotype version={this.props.version} onClickFn={this.props.onIsotypeClickFn}/>
					<Slogan version={this.props.version}/>
				</div>
			);
	},

});
