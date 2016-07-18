'use strict';

var React = require('react'),
		SearchStore = require('../stores/searchStore.js'),
		SuggestionStore = require('../stores/suggestionStore.js'),
		Header = require('./header.js'),
		MainContainer = require('./mainContainer.js'),
		Footer = require('./footer.js'),
		Actions = require('../actions.js'),
		Constants = require('../constants.js');

module.exports = React.createClass({

	componentDidMount: function(){
		SearchStore.addSearchButtonClickedListener(this.onSearch);
	},

	onSearch: function(){
		var store = SearchStore.getStore();
		console.log('title: ' + store.text + ' xbox: ' + store.xbox + ' ps: ' + store.ps + ' not_used: ' + store.not_used + ' used: ' + store.used + ' exchange: ' + store.exchange + ' to_sell: ' + store.to_sell + ' city: ' + store.city);
	},

	componentWillUnmount: function(){
	},
	
	render: function(){
		return (
				<div>
					<Header />
					<MainContainer />
					<Footer />
				</div>
		);
	},

});
