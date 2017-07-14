'use strict'

var React = require('react'),
		SuggestionItem = require('./suggestionItem.js');

module.exports = React.createClass({

	propTypes: {
		suggestions: React.PropTypes.array.isRequired,
		onSuggestionClickFn: React.PropTypes.func,
		suggestionsClicked: React.PropTypes.bool.isRequired,
		page: React.PropTypes.oneOf(),
		emptyResults: React.PropTypes.bool,
	},

	getDefaultProps: function(){
		return ({
			suggestionsClicked: false
		});
	},

	render: function(){
		var suggestions = []
		if(this.props.emptyResults === true){
			suggestions.push(<li>No se encontraron resultados</li>);
		}else{
			this.props.suggestions.map(function(element){
				suggestions.push(<SuggestionItem page={this.props.page} key={element.name} text={element.name} onClickHandler={this.props.onSuggestionClickFn} />);
			}.bind(this));
		}
		var listOfSuggestions = null;
		if(this.props.suggestionsClicked == false){
			listOfSuggestions = (
				<ul className="suggestions">
					{suggestions}
				</ul>
			);
		}	
		return listOfSuggestions;
	},
});
