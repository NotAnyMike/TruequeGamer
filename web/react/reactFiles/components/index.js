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
