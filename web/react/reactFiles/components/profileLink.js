'use strict';

const React = require('react'),
			Constants = require('../utils/constants.js');

module.exports = React.createClass({

	propsType:{
		user: React.PropTypes.object.isRequired,
		version: React.PropTypes.oneOf([Constants.header.versions.normal, Constants.header.versions.negative])
	},
	
	render: function(){
		debugger;
		var toReturn = <a className={"login arrow-decorator dot-decorator " + this.props.version} href="#">Ingresa con Facebook</a>;
		if(this.props.user.logged){
			toReturn = (
					<a href="#" className={"profileContainer " + this.props.version}>
						<span>{this.props.user.first_name + " " + this.props.user.last_name}</span>
						<figure>
							<img src={this.props.user.picture} alt=""/>
						</figure>
					</a>
					);
		}
		return toReturn;
	},

});
