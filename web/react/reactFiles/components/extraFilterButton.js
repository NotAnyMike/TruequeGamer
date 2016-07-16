'use strict';

var React = require('react'),
		Constants = require('../constants.js'),
		Actions = require('../actions.js');

module.exports = React.createClass({

	getInitialState: function(){
		return  {
			checked: true
		}
	},

	componentDidMount: function(){
	},
	
	propTypes: {
		filterType: React.PropTypes.oneOf([
										Constants.filter.not_used, 
										Constants.filter.used, 
										Constants.filter.exchange, 
										Constants.filter.to_sell
										]).isRequired,
	},

	clickHandler : function(){
		var new_state = !this.state.checked;
		this.setState({checked: new_state});
		Actions.changeFilterState(this.props.filterType, new_state);
	},

	render: function(){
		var className = 'extraFilterButton' + (this.state.checked ? ' checked' : '');
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
