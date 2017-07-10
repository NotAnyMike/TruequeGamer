'use strict';

var React = require('react'),
		Actions = require('../utils/actions.js'),
		Suggestions = require('./suggestions.js');

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
		var suggestions = <Suggestions suggestions={this.props.suggestions} onSuggestionClickFn={clickHandler} suggestionsClicked={this.props.suggestionsClicked} />;
		return (
			<div className="searchFieldContainer">
				<input type="text" placeholder="Nombre del juego a buscar" onChange={this._changeHandler} value={this.props.value} onKeyDown={this._onKeyDownHandler}/>
				{suggestions}
			</div>
		);
	},
});
