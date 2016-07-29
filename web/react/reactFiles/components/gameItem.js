const React = require('react'),
			AvailableConsoles = require('./availableConsoles.js'),
			Constants = require('../utils/constants.js');

const GameItem = React.createClass({

	propTypes: {
		psNoSell: React.PropTypes.bool,
		xboxNoSell: React.PropTypes.bool,
		psNoExchange: React.PropTypes.bool,
		xboxNoExchange: React.PropTypes.bool,
		only: React.PropTypes.bool,
		notOnly: React.PropTypes.bool,
		console: React.PropTypes.oneOf([Constants.consoles.xbox, Constants.consoles.ps]),
		isHover : React.PropTypes.bool,
	},

	getInitialState: function(){
		return ({isHover: false});
	},

	getDefaultProps: function(){
		return ({
			psNoSell: false,
			xboxNoSell: false,
			psNoExchange: false, 
			xboxNoExchange: false, 
			only: false,
			notOnly: false,
			console: null,
		});
	},

	_onMouseOver: function(){
		this.setState({isHover: true});
	},

	_onMouseOut: function(){
		this.setState({isHover: false});
	},
	
	render: function(){
		var console = this.props.console;
		if(this.state.isHover && console !== null && !this.state.only){
			if(console === Constants.consoles.xbox){
				console = Constants.consoles.ps;
			}else if(console === Constants.consoles.ps){
				console = Constants.consoles.xbox;
			}
		}	

		return (
			<il className={
				console +
				(this.props.only ? " only" : "") +
				(this.props.notOnly ? " notOnly" : "") +
				(this.props.psNoSell ? " psNoSell" : "") +
				(this.props.xboxNoSell ? " xboxNoSell" : "") +
				(this.props.psNoExchange ? " psNoExchange" : "") +
				(this.props.xboxNoExchange ? " xboxNoExchange" : "")
			}>
				<figure><img src="img/cover.png" alt=""/></figure>
				<div className="contentContainer">
					<span className="name">dark souls iii</span>
					<div className="exchange">
						<span></span>
						<span></span>
					</div>
					<div className="availableConsoles">
						<div className="container">
							<span 
								onMouseOver={this.props.console === Constants.consoles.xbox ? this._onMouseOver  : null}
								onMouseOut={this.props.console === Constants.consoles.xbox ? this._onMouseOut  : null}
							></span>
							<span 
								onMouseOver={this.props.console === Constants.consoles.ps ? this._onMouseOver  : null}
								onMouseOut={this.props.console === Constants.consoles.ps ? this._onMouseOut  : null}
							></span>
						</div>
					</div>
					<div className="price">
						<span>
							{this.props.psNoSell ? "" : "desde 70.000"}
						</span>
						<span>
							{this.props.xboxNoSell ? "" : "desde 80.000"}
						</span>
					</div>
					<div className="alsoAvailableOn"><span></span></div>
				</div>
			</il>
		);
	}

});

module.exports = GameItem;
