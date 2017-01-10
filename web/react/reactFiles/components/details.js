const React = require('react'),
	AppStore = require('../stores/appStore.js'),
	Constants = require('../utils/constants.js'),
	Actions = require('../utils/actions.js'),
	Chat = require('./chat.js'),
	Header = require('./header.js'),
	Footer = require('./footer.js'),
	DetailsMainContainer = require('./detailsMainContainer.js'),
	browserHistory = require('react-router').browserHistory;

const Details = React.createClass({

	propTypes: { },

	goToProfile: function(){
		Actions.goToProfile();	
	},

	getInitialState: function(){
		AppStore.getGamesAvailable(this.props.route.console, this.props.params.gameName);
		var store = AppStore.getStore();
		return store;
	},

	componentDidMount: function(){
		AppStore.addOnGamesAvailableUpdateListener(this.onGamesAvailableUpdated);
		AppStore.addOnGoToProfileListener(this.loadProfilePage);
	},

	componentWillUnmount: function(){
		AppStore.removeOnGamesAvailableUpdateListener(this.onGamesAvailableUpdated);
		AppStore.removeOnGoToProfileListener(this.loadProfilePage);
	},

	onGamesAvailableUpdated: function(){
		var store = AppStore.getStore()
		this.setState(store);
	},

	loadProfilePage: function(){
		var route = "/profile/test";
		browserHistory.push(route);
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
			chat = <Chat user={this.state.user} />;
		}

		return (
			<div id="semi_body" className={this.props.route.console}>
				<Header version={headerVersion} user={this.state.user} />
				<DetailsMainContainer 
					game={this.state.gameDetails.game} 
					console={this.props.route.console} 
					list={this.state.gameDetails.list}
					goToProfileFn={this.goToProfile}
				/>
				<Footer version={footerVersion} />
				{chat}
			</div>
		)
	}

});

module.exports = Details;
