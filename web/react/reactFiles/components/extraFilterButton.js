'use strict';

var React = require('react');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			checked: true
		}
	},

	propTypes: {
		title: React.PropTypes.oneOf(['nuevo', 'usado', 'trueque', 'venta']).isRequired,
	},

	clickHandler : function(){
		this.setState({checked: !this.state.checked});
	},

	render: function(){
		var className = 'extraFilterButton' + (this.state.checked ? ' checked' : '');
		return  (
			<button className={className} onClick={this.clickHandler}>
				<span>{this.props.title}</span>
				<input  type="checkbox" />
				<label></label>
			</button>
			);
	}
});
