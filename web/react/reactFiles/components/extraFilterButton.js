'use strict';

var React = require('react'),
		Constants = require('../utils/constants.js'),
		Actions = require('../utils/actions.js');

module.exports = React.createClass({
	
	propTypes: {
		checked: React.PropTypes.bool.isRequired,
		filterType: React.PropTypes.oneOf([
										Constants.filter.not_used, 
										Constants.filter.used, 
										Constants.filter.exchange, 
										Constants.filter.to_sell
										]).isRequired,
	},

	clickHandler : function(){
		var new_state = !this.props.checked;
		Actions.changeFilterState(this.props.filterType, new_state);
	},

	render: function(){
		var className = 'extraFilterButton' + (this.props.checked ? ' checked' : '');
		var title = '';
		switch(this.props.filterType){
			case Constants.filter.not_used:
				title = "nuevo";
				break;
			case Constants.filter.used:
				title = "usado";
				break;
			case Constants.filter.exchange:
				title = "trueque";
				break;
			case Constants.filter.to_sell:
				title = "venta";
				break;
		}
		return  (
			<button className={className} onClick={this.clickHandler}>
				<span>{title}</span>
				<input  type="checkbox" />
				<label></label>
			</button>
			);
	}
});
