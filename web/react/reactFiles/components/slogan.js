'use strict';

const React = require('react'),
			Constants = require('../utils/constants.js');

module.exports = React.createClass({
	
	propTypes: {
		version: React.PropTypes.oneOf([Constants.header.versions.normal, Constants.header.versions.negative])
	},

	getDefaultProps: function(){
		return ({version: Constants.header.versions.normal});
	},

	render: function(){
		return (
			<div className={"sloganContainer " + this.props.version}>
				<span className="dot-decorator">Intercambiando juegos desde </span>
				<span>
					<span>1993.</span>
				</span>
				<span className="arrow-decorator"> 2016</span>
			</div>
		);
	},

});
