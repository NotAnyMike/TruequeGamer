const React = require('react'),
			AppStore = require('../stores/appStore.js'),
			Constants = require('../utils/constants.js'),
			Chat = require('./chat.js'),
			Header = require('./header.js'),
			Footer = require('./footer.js'),
			DetailsMainContainer = require('./detailsMainContainer.js');

const Profile = React.createClass({

	getInitialState: function(){
		AppStore.getProfile(this.props.params.username);
		var store = AppStore.getStore();
		return store;
	},

	componentDidMount: function(){
		AppStore.addOnProfileUpdatesListener(this.onProfileUpdates);
	},

	componentWillUnmount: function(){	
		AppStore.removeOnProfileUpdatesListener(this.onProfileUpdates);
	},

	onProfileUpdates: function(){
		store = AppStore.getStore();
		if(typeof this.state.user.logged !== false && typeof this.state.profile.profile.id !== 'undefined' && this.state.user.id === this.state.profile.profile.id) {
			store.profile.list.push({toCreate:true});
		}
		this.setState(store);
	},

	render: function(){
		
		var headerVersion = Constants.header.versions.normal;	
		var footerVersion = Constants.footer.versions.whiteBackground;
		
		var chat;
		if(this.state.user.logged){
			chat = <Chat user={this.state.user} />;
		}

		var city = "somewhere";
		if(typeof this.state.profile.profile.city !== 'undefined' && this.state.profile.profile !== null) city = this.state.profile.profile.city;

		var isOwnerOfProfile = false;
		if(typeof this.state.user.logged !== false && typeof this.state.profile.profile.id !== 'undefined' && this.state.user.id === this.state.profile.profile.id) {
			isOwnerOfProfile = true;
		}

		return (
			<div id="semi_body" className={this.props.route.console}>
				<Header version={headerVersion} user={this.state.user} />
				<DetailsMainContainer 
					isProfile={true}
					isOwnerOfProfile={isOwnerOfProfile}
					console={Constants.consoles.both} 
					list={this.state.profile.list}
					name={this.state.profile.profile.first_name + " " + this.state.profile.profile.last_name}
					city={city}
					numberOfGames={this.state.profile.profile.numberOfGames}
				/>
				<Footer version={footerVersion} />
				{chat}
			</div>
		)
	},

});

module.exports = Profile;
