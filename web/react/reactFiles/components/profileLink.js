'use strict';

var React = require('react');

module.exports = React.createClass({
	
	getInitialState: function(){
		return ({
			logged: true
		});
	},

	render: function(){
		var toReturn = <a className="login arrow-decorator dot-decorator" href="#">Ingresa con Facebook</a>;
		if(this.state.logged){
			toReturn = <a href="#" className="profileContainer"><span>Carlos Mejia</span><figure><img src="img/face.png" alt=""/></figure></a>;
		}
		return toReturn;
	},

});
