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
			<figure className={this.props.version}>
					<img className="isotype normal" src="/img/isotype.png"/>
					<img className="isotype negative" src="/img/isotype_positive.png"/>
			</figure>
		);
	},

});
