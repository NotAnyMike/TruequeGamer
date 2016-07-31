'use strict';

const React = require('react');

const SuggestionItem = React.createClass({

	propTypes: {
		text: React.PropTypes.string.isRequired,
		onClickHandler: React.PropTypes.func.isRequired,
	},
	
	_onClickHandler: function(){
		this.props.onClickHandler(this.props.text);
	},

	render: function(){
		return <li onClick={this._onClickHandler}>{this.props.text}</li>;	
	}
});

module.exports = SuggestionItem;
