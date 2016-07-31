var React = require('react'),
		Constants = require('../utils/constants.js'),
		Actions = require('../utils/actions.js');

module.exports = React.createClass({

	handleClick: function(){
		Actions.changeFilterState(this.props.console, !this.props.checked);
	},

	propTypes: {
		//this porp console must be removed later
		console: React.PropTypes.oneOf([Constants.consoles.ps, Constants.consoles.xbox]).isRequired,
		checked: React.PropTypes.bool.isRequired,
		filterType: React.PropTypes.oneOf([
				Constants.filter.ps,
				Constants.filter.xbox
		]).isRequired,
	},

	render: function(){
		var consoleClassName = "";
		if(this.props.console === Constants.consoles.ps) consoleClassName = "ps4";
		else consoleClassName = "xboxone";
		var className = "consoleCheckbox " + consoleClassName + (this.props.checked ? ' checked' : '');
		return (
			<button className={className} onClick={this.handleClick}>
					<div className="isotype"></div>
					<span className="consoleNameTitle"></span>
				</button>
			);
	}
});
