'use strict';

var React = require('react'),
		Suggestions = require('./suggestions.js');

module.exports = React.createClass({

	propTypes: {
		suggestions: React.PropTypes.array,
		changeHandlerFn: React.PropTypes.func.isRequired,
		searchFn: React.PropTypes.func.isRequired,
		onSuggestionClickFn: React.PropTypes.func,
		emptyResults: React.PropTypes.bool.isRequired,
	},

	getInitialState: function(){
		return ({
			display: false,
			focusOnButton: false,
			focusOnInput: false,
		});
	},

	_onSearchButtonClick: function(e){
		var newValue = !this.state.display;
		if(newValue) this.inputElement.focus();
		this.setState({display: newValue})
	},

	_focusOutInputHandler: function(e){
		if(!e.relatedTarget || (e.relatedTarget.id.indexOf("topSearchButton") === -1 && e.relatedTarget.parentElement.parentElement.className.indexOf("searchButtonSubContainer") === -1)){
			this.setState({display: false});
		}
	},

	_onKeyDownHandler: function(e){
		var value = e.target.value;
		if(e.keyCode === 13){
			this.props.searchFn();
		}
	},

	_changeHandler: function(e){
		var value = e.target.value;
		this.props.changeHandlerFn(value);
	},

	onSuggestionClick: function(text){
		this.setState({display: false});
		this.props.onSuggestionClickFn(text);
	},

	render: function(){
		var className = "searchButtonSubContainer";
		if(this.state.display === true) className += " in";
		return (
			<div className={className} >
				<input 
					ref={(item) => this.inputElement = item}
					type="text" onKeyDown={this._onKeyDownHandler} onChange={this._changeHandler} onBlur={this._focusOutInputHandler}
				/>
				<Suggestions suggestions={this.props.suggestions} onSuggestionClickFn={this.onSuggestionClick} emptyResults={this.props.emptyResults} suggestionsClicked={false} />
				<button className="searchButton" id="topSearchButton" onClick={this._onSearchButtonClick}></button>
			</div>
		);
	},

});
