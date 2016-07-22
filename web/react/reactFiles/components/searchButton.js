'use strict';

var React = require('react'),
		Actions = require('../utils/actions.js');

module.exports = React.createClass({

	render : function(){
		return (
			<div className="dot-decorator arrow-decorator searchButtonSection"><button className="searchButton" onClick={this._clickHandler}>Buscar</button></div>
		);
	},

	_clickHandler: function(){
		Actions.searchButtonClicked();
	}

});
