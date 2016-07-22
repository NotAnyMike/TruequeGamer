'use strict';

var React = require('react'),
		AppStore = require('../stores/appStore.js'),
		SuggestionStore = require('../stores/suggestionStore.js'),
		Header = require('./header.js'),
		MainContainer = require('./mainContainer.js'),
		Footer = require('./footer.js'),
		Chat = require('./chat.js'),
		Actions = require('../actions.js'),
		Constants = require('../constants.js');

var Link = require('react-router').Link;

module.exports = React.createClass({

	getInitialState: function(){
		return ({
			search: {
				text: '',
				xbox: true,
				ps: true,
				not_used: true,
				used: true,
				exchange: true,
				to_sell: true,
				city: Constants.bogota	
			},
			user: {
				logged: true,
				user: '',
				pic: ''
			}
		});
	},

	componentDidMount: function(){
		AppStore.addSearchButtonClickedListener(this.onSearch);
	},

	onSearch: function(){
		var store = AppStore.getStore();
		console.log('title: ' + store.text + ' xbox: ' + store.xbox + ' ps: ' + store.ps + ' not_used: ' + store.not_used + ' used: ' + store.used + ' exchange: ' + store.exchange + ' to_sell: ' + store.to_sell + ' city: ' + store.city);
	},

	componentWillUnmount: function(){
	},
	
	render: function(){
		var chat;
		if(this.state.user.logged) {
			chat = <Chat />;
		}
		return (
				<div>
					<Header user={this.state.user} />
					<MainContainer />
					<Footer />
					{chat}
				</div>
		);
	},

});
