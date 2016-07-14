'use strict';

var React = require('react');

module.exports = React.createClass({

	render: function(){
		return (
			<div className="sloganContainer">
				<span className="dot-decorator">Intercambiando juegos desde </span>
				<span>
					<img className="crossline" src="./img/crossline.png"/>
					<span>1993.</span>
				</span>
				<span className="arrow-decorator"> 2016</span>
			</div>
		);
	},

});
