'use strict';

var React = require('react'),
		Header = require('./header.js'),
		MainContainer = require('./mainContainer.js'),
		Footer = require('./footer.js');

module.exports = React.createClass({

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
