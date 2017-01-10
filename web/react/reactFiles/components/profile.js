const React = require('react'),
			AppStore = require('../stores/appStore.js'),
			Constants = require('../utils/constants.js'),
			Chat = require('./chat.js'),
			Header = require('./header.js'),
			Footer = require('./footer.js'),
			DetailsMainContainer = require('./detailsMainContainer.js');

const Profile = React.createClass({

	getInitialState: function(){
		AppStore.getGamesAvailable(this.props.route.console, this.props.params.gameName);
		var store = AppStore.getStore();
		return store;
	},

	render: function(){
		
		var headerVersion = Constants.header.versions.normal;	
		var footerVersion = Constants.footer.versions.whiteBackground;
		
		var chat;
		if(this.state.user.logged){
			chat = <Chat user={this.state.user} />;
		}

		return (
			<div id="semi_body" className={this.props.route.console}>
				<Header version={headerVersion} user={this.state.user} />
				<DetailsMainContainer 
					profile={true}
					console={Constants.consoles.both} 
					list={this.state.gameDetails.list}
					city={"bogotá"}
					numberOfGames={3}
				/>
				<Footer version={footerVersion} />
				{chat}
			</div>
		)
	},

});

module.exports = Profile;
