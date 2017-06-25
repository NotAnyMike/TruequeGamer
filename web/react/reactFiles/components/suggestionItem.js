'use strict';

const React = require('react');

const SuggestionItem = React.createClass({

	propTypes: {
		id: React.PropTypes.number.isRequired,
		text: React.PropTypes.string.isRequired,
		page: React.PropTypes.oneOf(['index', 'profile']),
		onClickHandler: React.PropTypes.func.isRequired,
	},

	getDefaultProps: function(){
		return ({
			text: "",
			page: "index",
			onClickHandler: null,
		});
	},
	
	_onClickHandler: function(){
		if(this.props.page === 'index'){
			this.props.onClickHandler(this.props.text);
		}else if(this.props.page === 'profile'){
			this.props.onClickHandler(this.props.id, this.props.text);
		}
	},

	render: function(){
		return <li onClick={this._onClickHandler}>{this.props.text}</li>;	
	}
});

module.exports = SuggestionItem;
