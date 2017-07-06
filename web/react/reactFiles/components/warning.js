'use strict'

var React = require('react');

module.exports = React.createClass({

	propTypes: {
		actionFn: React.PropTypes.func.isRequired,	
		closeFn: React.PropTypes.func.isRequired,
		display: React.PropTypes.bool.isRequired,
	},

	_close: function(){
		this.props.closeFn();
	},

	_actionButtonClickHandler: function(){
		this.props.actionFn();
	},

	render: function(){
		//console.log(this.props.display)
		return (
			<div className={"warning" + (this.props.display === true ? " in" : (this.props.display === false ? " out" : ""))}>
				<div>Para poder chatear por favor ingresa con tu cuenta de Facebook</div>
				<button onClick={this._actionButtonClickHandler} className="login arrow-decorator dot-decorator">Ingresar con Facebook</button>
				<button onClick={this._close} className="close"></button>
			</div>
		)
	},

});
