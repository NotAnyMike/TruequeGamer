const React = require('react'),
	AppStore = require('../stores/appStore.js'),
	Constants = require('../utils/constants.js'),
	Chat = require('./chat.js'),
	Header = require('./header.js'),
	Footer = require('./footer.js'),
	DetailsMainContainer = require('./detailsMainContainer.js');

const Details = React.createClass({

	propTypes: { },

	getInitialState: function(){
		AppStore.getGamesAvailable(this.props.route.console, this.props.params.gameName);
		var store = AppStore.getStore();
		return store;
	},

	componentDidMount: function(){
		AppStore.addOnGamesAvailableUpdateListener(this.onGamesAvailableUpdated);
	},

	componentWillUnmount: function(){
		AppStore.removeOnGamesAvailableUpdateListener(this.onGamesAvailableUpdated);
	},

	onGamesAvailableUpdated: function(){
		var store = AppStore.getStore()
		this.setState(store);
	},

	render: function(){
		
		var headerVersion;
		if(this.props.route.console === Constants.consoles.both || true){
			headerVersion = Constants.header.versions.normal;
		}else{
			headerVersion = Constants.header.versions.negative;
		}
		
		var footerVersion;
		if(this.props.route.console === Constants.consoles.both || true){
			footerVersion = Constants.footer.versions.whiteBackground;
		}else{
			footerVersion = Constants.footer.versions.white;
		}
		
		var chat;
		if(this.state.user.logged){
			chat = <Chat user={this.state.user} />;
		}

		return (
			<div id="semi_body" className="both">
				<Header version={headerVersion} user={this.state.user} />
				<DetailsMainContainer 
					game={this.state.gameDetails.game} 
					console={this.props.route.console} 
					list={this.state.gameDetails.list}
				/>
				<Footer version={footerVersion} />
				{chat}
			</div>
		)
	}

});

module.exports = Details;
