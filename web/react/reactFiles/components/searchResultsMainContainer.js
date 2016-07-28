const React = require('react'),
			SearchResultsList = require('./searchResultsList.js'),
			Constants = require('../utils/constants.js');

const SearchResultsMainContainer = React.createClass({

	propTypes: {
		console: React.PropTypes.oneOf(Constants.searchResults.types).isRequired
	},

	render: function(){
		return (		
			<section className={"searchResultsMainContainer " + this.props.console}>
				<div className="container">
					<div className="title"></div>
					<SearchResultsList console={this.props.console} />
				</div>
			</section>
		);
	},

});

module.exports = SearchResultsMainContainer;
