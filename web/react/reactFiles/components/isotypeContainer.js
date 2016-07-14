'use strict';

var React = require('react'),
		Isotype = require('./isotype.js'),
		Slogan = require('./slogan.js');

module.exports = React.createClass({

	render: function(){
		return (
				<div className="isotypeContainer">
					<Isotype />
					<Slogan />
				</div>
			);
	},

});
