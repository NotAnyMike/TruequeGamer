'use strict';

const React = require('react'),
			Constants = require('../utils/constants.js');

module.exports = React.createClass({
	
	propTypes: {
		version: React.PropTypes.oneOf([Constants.header.versions.normal, Constants.header.versions.negative]),
		onClickFn: React.PropTypes.func.isRequired,
	},

	getDefaultProps: function(){
		return ({version: Constants.header.versions.normal});
	},

	_onClickHandler: function(){
		this.props.onClickFn();
	},

	render: function(){
		return (
			<figure className={this.props.version} onClick={this._onClickHandler}>
					<img className="isotype normal" src="/img/isotype.png"/>
					<img className="isotype negative" src="/img/isotype_positive.png"/>
			</figure>
		);
	},

});
