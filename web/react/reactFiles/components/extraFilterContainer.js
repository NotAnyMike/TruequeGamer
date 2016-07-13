'use strict';

var React = require('react'),
		ExtraFilterButton = require('./extraFilterButton');

module.exports = React.createClass({

	render: function(){
		return (
			<div className="extraFilterContainer">
				<section>
					<ExtraFilterButton title="nuevo" />
					<ExtraFilterButton title="usado" />
				</section>
				<div className="listDecorator"></div>
				<section>
					<ExtraFilterButton title="trueque" />
					<ExtraFilterButton title="nuevo" />
				</section>
				<div className="listDecorator"></div>
				<section className="locationSection">
					<figure><img src="img/col.png" alt=""/></figure>
					<button className="cityButton">Bogotá</button>
				</section>
			</div>	
		);
	}

});
