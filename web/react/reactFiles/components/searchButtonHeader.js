'use strict';

var React = require('react');

module.exports = React.createClass({

	render: function(){
		return (
			<div className="searchHeaderButtonContainer">
				<div>
					<div className="searchButtonSubContainer">
						<input type="text" />
						<ul className="suggestions">
							<li>opción 1</li>
							<li>opctión 2</li>
							<li>3</li>
						</ul>
						<button className="searchButton"></button>
					</div>
				</div>
				<div></div>
			</div>
		);
	}

});
