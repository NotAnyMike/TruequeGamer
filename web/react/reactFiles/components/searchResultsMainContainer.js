const React = require('react'),
			SearchResultsList = require('./searchResultsList.js'),
			Constants = require('../utils/constants.js');

const SearchResultsMainContainer = React.createClass({

	propTypes: {
		console: React.PropTypes.oneOf(Constants.searchResults.types).isRequired,
		list: React.PropTypes.array.isRequired,
	},

	render: function(){
		return (		
			<section className={"genericMainContainer searchResultsMainContainer " + this.props.console}>
				<div className="container">
					<div className="title"></div>
					<SearchResultsList console={this.props.console} list={this.props.list} />
				</div>
			</section>
		);
	},

});

module.exports = SearchResultsMainContainer;
