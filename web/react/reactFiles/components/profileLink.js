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
	
	render: function(){
		var loginUrl = "/login/facebook/?next=".concat(window.location.pathname)
		var toReturn = <a className={"login arrow-decorator dot-decorator " + this.props.version} href={loginUrl}>Ingresa con Facebook</a>;
		if(this.props.user.logged){
			toReturn = (
					<a onClick={this._goToMyProfile} className={"profileContainer " + this.props.version}>
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
