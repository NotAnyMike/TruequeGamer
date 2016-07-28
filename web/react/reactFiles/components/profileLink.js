'use strict';

const React = require('react'),
			Constants = require('../utils/constants.js');

module.exports = React.createClass({

	propsType:{
		User: React.PropTypes.object.isRequired,
		version: React.PropTypes.oneOf([Constants.header.versions.normal, Constants.header.versions.negative])
	},

	getDefaultProps: function(){
		return ({
			user: {
				logged: false,
				user: '',
				pic: ''
			},
			version: Constants.header.versions.normal,
		});
	},

	render: function(){
		var toReturn = <a className={"login arrow-decorator dot-decorator " + this.props.version} href="#">Ingresa con Facebook</a>;
		if(this.props.user.logged){
			toReturn = (
					<a href="#" className={"profileContainer " + this.props.version}>
						<span>Carlos Mejia</span>
						<figure>
							<img src="img/face.png" alt=""/>
						</figure>
					</a>
					);
		}
		return toReturn;
	},

});
