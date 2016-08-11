'use strict';

var React = require('react'),
		Actions = require('../utils/actions.js'),
		SuggestionItem = require('./suggestionItem.js');

module.exports = React.createClass({
/*
	getInitialState: function(){
		return ({ 
			value: '',
			suggestions: []
		});
	},
*/
/*
	componentDidMount: function(){
		SuggestionStore.addSuggestionsRefreshListener(this._onSuggestionRefresh);
	},

	componentWillUnmount: function(){
		SuggestionStore.removeSuggestionsRefreshListener(this._onSuggestionRefresh);
	},	
*/
/*
	_onSuggestionRefresh: function(){
		var suggestions = SuggestionStore.getSuggestions();
		this.setState({ suggestions: suggestions });
	},
*/

	_changeHandler: function(e){
		/*var new_value = e.target.value;
		this.setState({value: new_value});
		if(new_value.length > 3){
			Actions.changeSearchInput(new_value);
		}else{
			this.setState({suggestions: []});
		};*/
		this.props.changeHandlerForSearchInputFn(e.target.value);
	},

	_onKeyDownHandler: function(e){
		if(e.keyCode === 13){
			//send
			//Actions.searchButtonClicked();
			this.props.suggestionSelectedHandlerFn();
		}
	},

	suggestionSelectedHandler: function(value){
		/*this.setState({value: value});
		Actions.changeSearchInput(value);*/
		this.props.suggestionsSelectedHandlerFn(value);
	},

	render: function(){
		var clickHandler = this.props.suggestionSelectedHandlerFn;
		return (
			<div className="searchFieldContainer">
				<input type="text" placeholder="Nombre del juego a buscar" onChange={this._changeHandler} value={this.props.value} onKeyDown={this._onKeyDownHandler}/>
				<ul>
					{this.props.suggestions.suggestions.map(function(element){
						return <SuggestionItem key={element.name} text={element.name} onClickHandler={clickHandler} />;
					})}
				</ul>
			</div>
		);
	},
});
