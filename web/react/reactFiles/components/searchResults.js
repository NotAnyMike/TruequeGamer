const React = require('react'),
			SearchResultsMainContainer = require('./searchResultsMainContainer.js'),
			Header = require('./header.js'),
			Footer = require('./footer.js'),
			Constants = require('../utils/constants.js');

const SearchResults = React.createClass({

	propTypes: {
		//console: React.PropTypes.oneOf(Constants.searchResults.types).isRequired
	},

	render: function(){
		var headerVersion;
		if(this.props.route.console === Constants.consoles.both){
			headerVersion = Constants.header.versions.normal;
		}else{
			headerVersion = Constants.header.versions.negative;
		}
		
		var footerVersion;
		if(this.props.route.console === Constants.consoles.both){
			footerVersion = Constants.footer.versions.whiteBackground;
		}else{
			footerVersion = Constants.footer.versions.white;
		}

		return (
			<div id="semi_body" className={this.props.route.console}>
				<Header version={headerVersion}/>
				<SearchResultsMainContainer console={this.props.route.console} />
				<Footer version={footerVersion}/>
			</div>
		);
	},

});

module.exports = SearchResults;
