'use strict';

var React = require('react'),
		AppStore = require('../stores/appStore.js'),
		SuggestionStore = require('../stores/suggestionStore.js'),
		Header = require('./header.js'),
		MainContainer = require('./mainContainer.js'),
		Footer = require('./footer.js'),
		Actions = require('../actions.js'),
		Constants = require('../constants.js');

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
				logged: false,
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
		return (
				<div>
					<Header user={this.state.user} />
					<MainContainer />
					<Footer />
				</div>
		);
	},

});
