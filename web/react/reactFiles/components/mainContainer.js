'use strict';

var React = require('react'),
		SearchField = require('./searchField.js'),
		FilterMainContainer = require('./filterMainContainer.js'),
		SearchButton = require('./searchButton.js');

module.exports = React.createClass({

	propTypes: {
		searchValues: React.PropTypes.object.isRequired,
		suggestionsClicked: React.PropTypes.bool.isRequired,
		emptyResults: React.PropTypes.bool,
	},

	render: function(){
		return (
				<div className="mainContainer">
					<SearchField 
						suggestionSelectedHandlerFn={this.props.suggestionSelectedHandlerFn}
						changeHandlerForSearchInputFn={this.props.changeHandlerForSearchInputFn}
						onKeyDownHandlerForSearchInputFn={this.props.onKeyDownHandlerForSearchInputFn}
						suggestions={this.props.suggestions}
						value={this.props.value}
						suggestionsClicked={this.props.suggestionsClicked}
						emptyResults={this.props.emptyResults}
					/>
					<FilterMainContainer searchValues={this.props.searchValues}/>
					<SearchButton />
				</div>
		);
	},

});
