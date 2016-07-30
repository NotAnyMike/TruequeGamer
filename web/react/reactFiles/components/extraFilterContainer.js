'use strict';

var React = require('react'),
		ExtraFilterButton = require('./extraFilterButton'),
		Constants = require('../utils/constants.js');

module.exports = React.createClass({

	propTypes: {
		searchValues: React.PropTypes.object.isRequired
	},

	render: function(){
		return (
			<div className="extraFilterContainer">
				<section>
					<ExtraFilterButton filterType={Constants.filter.not_used} checked={this.props.searchValues.not_used} />
					<ExtraFilterButton filterType={Constants.filter.used} checked={this.props.searchValues.used} />
				</section>
				<div className="listDecorator"></div>
				<section>
					<ExtraFilterButton filterType={Constants.filter.exchange} checked={this.props.searchValues.exchange} />
					<ExtraFilterButton filterType={Constants.filter.to_sell} checked={this.props.searchValues.to_sell} />
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
