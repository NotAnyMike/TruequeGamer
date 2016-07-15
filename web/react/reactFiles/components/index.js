'use strict';

var React = require('react'),
		SearchStore = require('../stores/searchStore.js'),
		Header = require('./header.js'),
		MainContainer = require('./mainContainer.js'),
		Footer = require('./footer.js'),
		Actions = require('../actions.js'),
		Constants = require('../constants.js');

module.exports = React.createClass({

	componentDidMount: function(){
		console.log('mounting');
		Actions.changeFilterState(Constants.filter.not_used, true);
		console.log('mounted correctly');
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
