var React = require('react'),
		Constants = require('../utils/constants.js'),
		Actions = require('../utils/actions.js');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			checked: false
		}
	},

	handleClick: function(){
		var new_state = !this.state.checked;
		this.setState({
			checked: new_state
		});
		Actions.changeFilterState(this.props.filterType, new_state);
	},

	propTypes: {
		//this porp console must be removed later
		console: React.PropTypes.oneOf(['ps4', 'ps3', 'xboxone', 'xbox360']).isRequired,
		filterType: React.PropTypes.oneOf([
				Constants.filter.ps,
				Constants.filter.xbox
		]).isRequired,
	},

	render: function(){
		var className = "consoleCheckbox " + this.props.console + (this.state.checked ? ' checked' : '');
		return (
			<button className={className} onClick={this.handleClick}>
					<div className="isotype"></div>
					<span className="consoleNameTitle"></span>
				</button>
			);
	}
});
