'use strict';

var React = require('react');

module.exports = React.createClass({

	render: function(){
		return (
			<div className="searchFieldContainer">
							<input type="text" placeholder="Nombre del juego a buscar"/>
							<ul className="hidden">
											<li>Resident Evil 4</li>
											<li>Resident Evil 3</li>
											<li>Resident Evil Zero</li>
											<li>Resident Evil 2</li>
							</ul>
			</div>
		);
	},
});
