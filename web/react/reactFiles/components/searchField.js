'use strict';

var React = require('react'),
		Actions = require('../actions.js'),
		SuggestionStore = require('../stores/suggestionStore.js');

module.exports = React.createClass({

	getInitialState: function(){
		return ({ 
			value: '',
			suggestions: []
		});
	},

	componentDidMount: function(){
		SuggestionStore.addSuggestionsRefreshListener(this._onSuggestionRefresh);
	},

	_onSuggestionRefresh: function(){
		var suggestions = SuggestionStore.getSuggestions();
		this.setState({ suggestions: suggestions });
	},

	_changeHandler: function(e){
		var new_value = e.target.value;
		this.setState({value: new_value});
		if(new_value.length > 3){
			Actions.changeSearchInput(new_value);
		}else{
			this.setState({suggestions: []});
		};
	},

	render: function(){
		return (
			<div className="searchFieldContainer">
							<input type="text" placeholder="Nombre del juego a buscar" onChange={this._changeHandler}/>
							<ul>
								{this.state.suggestions.map(function(element){
										return <li key={element}>{element}</li>;
								})}
							</ul>
			</div>
		);
	},
});
