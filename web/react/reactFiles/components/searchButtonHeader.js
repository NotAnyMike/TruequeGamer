'use strict';

var React = require('react'),
		TopSearchContainer = require('./topSearchContainer.js');

module.exports = React.createClass({

	propTypes: {
		changeHandlerFn: React.PropTypes.func.isRequired,
		suggestions: React.PropTypes.array,
		searchFn: React.PropTypes.func.isRequired,
		emptyResults: React.PropTypes.bool.isRequired,
		onSuggestionClickFn: React.PropTypes.func,
	},

	render: function(){
		return (
			<div className="searchHeaderButtonContainer">
				<div>
					<TopSearchContainer changeHandlerFn={this.props.changeHandlerFn} suggestions={this.props.suggestions} searchFn={this.props.searchFn} onSuggestionClickFn={this.props.onSuggestionClickFn} emptyResults={this.props.emptyResults} />
				</div>
				<div></div>
			</div>
		);
	}

});
