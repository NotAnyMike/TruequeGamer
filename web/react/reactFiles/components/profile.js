const React = require('react'),
			AppStore = require('../stores/appStore.js'),
			Constants = require('../utils/constants.js'),
			Chat = require('./chat.js'),
			Header = require('./header.js'),
			Footer = require('./footer.js'),
			DetailsMainContainer = require('./detailsMainContainer.js'),
			Functions = require('../utils/functions.js');

const Profile = React.createClass({

	doneTypingInterval: 500,
	
	typingTimer: null,

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
			store.profile.list = store.profile.list.map(item => {item.temp_id = store.profile.list.indexOf(item); return item})
		}
		this.setState(store);
	},

	doneTypingFn: function(id,isPs,string){
		var url = Constants.routes.api.suggestions_igdb;
		var consoles = isPs ? Constants.consoles.ps : Constants.consoles.xbox;
		url = url.replace('[console]', consoles.toString()).replace('[string]', string.toString());
		var self = this;
		var req = url;
		//Get them and add them to the store
		Functions.fetchAdvanced(req).then(res => {return res.json()}).then(json => {this.retreivingSuggestionsFromIGBD(id,json)});

	},

	retreivingSuggestionsFromIGBD: function(id,json){
		var element = this.state.profile.list.filter(element => element.temp_id === id)
		if(element.length > 0){
			element = element[0]

			element.suggestions = json;
			this.setState(this.store);
			console.log(this.state.profile.list)
		}
		
	},

	onPublishGame : function(editing){
		var myCookie = Functions.getCookie("csrftoken");
		var data = new FormData();
		//data.append( "json", JSON.stringify( editing ) );
		data = JSON.stringify( editing );
		var init = {
			method: 'put',
			credentials: "same-origin",
			headers: {
				"X-CSRFToken": myCookie,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: data,
		};
		var url = Constants.routes.api.publishDvd;
		var req = new Request(url, init)
		Functions.fetchAdvanced(req).then(function(res){this._newGameCreated(res)}.bind(this))
	},

	_newGameCreated: function(res){
		if(res.ok && res.status === 201){
			res.json().then(function(json){
				//if profile.user is the same as the logged in then add it to the list at the end
				if(this.state.user.logged !== 'undefined' && this.state.user.logged === true && this.state.profile.profile.id === this.state.user.id){
					//add json to the list
					json['temp_id']=this.state.profile.list.length;
					state = this.state;
					state.profile.list.splice(this.state.profile.list.length-1, 0, json);
					this.setState(state);
					
				}
			}.bind(this));
		}
	},

	changeHandlerForSearchInput: function(id,isPs,string){
		//id del gameItem que está siendo cambiado
		//console
		//string
		//Search the api for suggestions
		
		clearTimeout(this.typingTimer);
		this.typingTimer = setTimeout(function(){this.doneTypingFn(id,isPs,string)}.bind(this), this.doneTypingInterval);
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
					onPublishGameFn={this.onPublishGame}
					changeHandlerForSearchInputFn={this.changeHandlerForSearchInput}
				/>
				<Footer version={footerVersion} />
				{chat}
			</div>
		)
	},

});

module.exports = Profile;
