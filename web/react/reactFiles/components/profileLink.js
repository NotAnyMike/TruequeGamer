'use strict';

var React = require('react');

module.exports = React.createClass({
	
	propsType:{
		User: React.PropTypes.object.isRequired
	},

	getDefaultProps: function(){
		return ({
			user: {
				logged: false,
				user: '',
				pic: ''
			}
		});
	},

	render: function(){
		var toReturn = <a className="login arrow-decorator dot-decorator" href="#">Ingresa con Facebook</a>;
		if(this.props.user.logged){
			toReturn = (
					<a href="#" className="profileContainer">
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
