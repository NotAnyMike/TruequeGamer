'use strict';

var React = require('react'),
		Actions = require('../utils/actions.js'),
		SuggestionItem = require('./suggestionItem.js');

module.exports = React.createClass({

	_changeHandler: function(e){
		this.props.changeHandlerForSearchInputFn(e.target.value);
	},

	_onKeyDownHandler: function(e){
		if(e.keyCode === 13){
			//send
			this.props.onKeyDownHandlerForSearchInputFn();
		}
	},

	suggestionSelectedHandler: function(value){
		this.props.suggestionsSelectedHandlerFn(value);
	},

	render: function(){
		var clickHandler = this.props.suggestionSelectedHandlerFn;
		return (
			<div className="searchFieldContainer">
				<input type="text" placeholder="Nombre del juego a buscar" onChange={this._changeHandler} value={this.props.value} onKeyDown={this._onKeyDownHandler}/>
				<ul>
					{this.props.suggestions.map(function(element){
						return <SuggestionItem key={element.name} text={element.name} onClickHandler={clickHandler} />;
					})}
				</ul>
			</div>
		);
	},
});
