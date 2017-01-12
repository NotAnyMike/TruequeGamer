const React = require('react'),
			SearchResultsList = require('./searchResultsList.js'),
			Constants = require('../utils/constants.js');

const SearchResultsMainContainer = React.createClass({

	propTypes: {
		isProfile: React.PropTypes.bool.isRequired,
		goToDetailsFn: React.PropTypes.func.isRequired,
		console: React.PropTypes.oneOf(Constants.searchResults.types).isRequired,
		list: React.PropTypes.array.isRequired,
	},

	render: function(){
		return (		
			<section className={"genericMainContainer searchResultsMainContainer " + this.props.console}>
				<div className="container">
					<div className="title"></div>
					<SearchResultsList isProfile={this.props.isProfile} console={this.props.console} list={this.props.list} goToDetailsFn={this.props.goToDetailsFn}/>
				</div>
			</section>
		);
	},

});

module.exports = SearchResultsMainContainer;
