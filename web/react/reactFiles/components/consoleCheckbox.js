var React = require('react');

module.exports = React.createClass({

	getInitialState: ()=>{
		return {
			clicked: false
		}
	},

	handleClick: function(event, cli = this.state.clicked){
		this.setState({
			clicked: !cli
		});
	},

	propTypes: {
		console: React.PropTypes.oneOf(['ps4', 'ps3', 'xboxone', 'xbox360']).isRequired,
	},

	render: function(){
		var className = "consoleCheckbox " + this.props.console + (this.state.clicked ? ' checked' : '');
		return (
			<button className={className} onClick={this.handleClick}>
					<div className="isotype"></div>
					<span className="consoleNameTitle"></span>
				</button>
			);
	}
});
