'use strict';

var React = require('react'),
		SearchField = require('./searchField.js'),
		FilterMainContainer = require('./filterMainContainer.js'),
		SearchButton = require('./searchButton.js');

module.exports = React.createClass({

	propTypes: {
		searchValues: React.PropTypes.object.isRequired
	},

	render: function(){
		return (
				<div className="mainContainer">
					<SearchField 
						suggestionSelectedHandlerFn={this.props.suggestionSelectedHandlerFn}
						changeHandlerForSearchInputFn={this.props.changeHandlerForSearchInputFn}
						suggestions={this.props.suggestions}
					/>
					<FilterMainContainer searchValues={this.props.searchValues}/>
					<SearchButton />
				</div>
		);
	},

});
