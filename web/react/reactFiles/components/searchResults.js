const React = require('react'),
			SearchResultsMainContainer = require('./searchResultsMainContainer.js'),
			Header = require('./header.js'),
			Footer = require('./footer.js'),
			Constants = require('../utils/constants.js'),
			AppStore = require('../stores/appStore.js'),
			Actions = require('../utils/actions.js'),
			Chat = require('./chat.js'),
			browserHistory = require('react-router').browserHistory;

const SearchResults = React.createClass({

	propTypes: {
		//Just to know there is prop console in props.router
		//console: React.PropTypes.oneOf(Constants.searchResults.types).isRequired
	},

	getInitialState: function(){
		AppStore.search(this.props.route.console,this.props.params.search);
		var store = AppStore.getStore();
		return store;
	},

	componentDidMount: function(){
		AppStore.addOnResultsUpdatedListener(this.onResultsUpdated);
		AppStore.addOnGoToDetailsListener(this.loadDetailsPage);
	},

	componentWillUnmount: function(){
		AppStore.removeOnResultsUpdatedListener(this.onResultsUpdated);
		AppStore.removeOnGoToDetailsListener(this.loadDetailsPage);
	},
	
	onResultsUpdated: function(){
		var store = AppStore.getStore();
		this.setState(store);
	},

	loadDetailsPage: function(){
		console.log('going to details')

		var route = "/details";
		browserHistory.push(route);
	},

	goToDetailsFn: function(){
		Actions.goToDetails();
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

		var chat;
		if(this.state.user.logged){
			chat = <Chat user={this.state.user}/>;
		}

		return (
			<div id="semi_body" className={this.props.route.console}>
				<Header version={headerVersion} user={this.state.user}/>
				<SearchResultsMainContainer console={this.props.route.console} list={this.state.searchResult.results} goToDetailsFn={this.goToDetailsFn}/>
				<Footer version={footerVersion}/>
				{chat}
			</div>
		);
	},

});

module.exports = SearchResults;
