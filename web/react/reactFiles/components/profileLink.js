'use strict';

const React = require('react'),
			Constants = require('../utils/constants.js'),
			browserHistory = require('react-router').browserHistory;

module.exports = React.createClass({

	propsType:{
		user: React.PropTypes.object.isRequired,
		version: React.PropTypes.oneOf([Constants.header.versions.normal, Constants.header.versions.negative])
	},

	_goToMyProfile: function(){
		var ownProfileLink = "/profile/".concat(this.props.user.username);
		browserHistory.push(ownProfileLink)
	},
	
	_logout: function(){
		window.location.assign(Constants.routes.logout);
	},
	
	render: function(){
		var loginUrl = "/login/facebook/?next=".concat(window.location.pathname)
		var toReturn = <a className={"login arrow-decorator dot-decorator " + this.props.version} href={loginUrl}>Ingresa con Facebook</a>;
		if(this.props.user.logged){
			toReturn = (
					<a className={"profileContainer " + this.props.version}>
						<span>
							<span onClick={this._goToMyProfile}>{this.props.user.first_name + " " + this.props.user.last_name}</span>
							<span onClick={this._logout} className="dot-decorator">Cerrar sesión</span>
						</span>
						<figure onClick={this._goToMyProfile}>
							<img src={this.props.user.picture} alt=""/>
						</figure>
					</a>
					);
		}
		return toReturn;
	},

});
