'use strict';

var React = require('react'),
		Actions = require('../actions.js');

module.exports = React.createClass({

	getInitialState: function(){
		return ({ value: ''});
	},

	_changeHandler: function(e){
		var new_value = e.target.value;
		if(new_value.length > 3){
			this.setState({value: new_value});
			Actions.changeSearchInput(new_value);
		};
	},

	render: function(){
		return (
			<div className="searchFieldContainer">
							<input type="text" placeholder="Nombre del juego a buscar" onChange={this._changeHandler}/>
							<ul>
											<li>Resident Evil 4</li>
											<li>Resident Evil 3</li>
											<li>Resident Evil Zero</li>
											<li>Resident Evil 2</li>
							</ul>
			</div>
		);
	},
});
