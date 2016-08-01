const React = require('react'),
			AvailableConsoles = require('./availableConsoles.js'),
			Constants = require('../utils/constants.js'),
			Functions = require('../utils/functions.js');

const GameItem = React.createClass({

	propTypes: {
		name: React.PropTypes.string.isRequired,
		cover: React.PropTypes.string.isRequired,
		both: React.PropTypes.bool.isRequired,
		psNoSell: React.PropTypes.bool,
		xboxNoSell: React.PropTypes.bool,
		psNoExchange: React.PropTypes.bool,
		xboxNoExchange: React.PropTypes.bool,
		only: React.PropTypes.bool,
		notOnly: React.PropTypes.bool,
		console: React.PropTypes.oneOf([Constants.consoles.xbox, Constants.consoles.ps, Constants.consoles.both]),
		psPrice: React.PropTypes.number,
		psOnlyPrice: React.PropTypes.bool,
		xboxPrice: React.PropTypes.number,
		xboxOnlyPrice: React.PropTypes.bool,
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
		var consoleVar = this.props.console;
		if(this.props.both && this.state.isHover && consoleVar !== null){
			if(consoleVar === Constants.consoles.xbox){
				consoleVar = Constants.consoles.ps;
			}else if(consoleVar === Constants.consoles.ps){
				consoleVar = Constants.consoles.xbox;
			}
		}	

		var className = consoleVar +
				(this.props.only ? " only" : "") +
				(this.props.notOnly ? " notOnly" : "");
		if(this.props.both || this.props.console === Constants.consoles.xbox){
			className += (this.props.xboxNoExchange ? " xboxNoExchange" : "") +
				(this.props.xboxNoSell ? " xboxNoSell" : "");
		}
		if(this.props.both || this.props.console === Constants.consoles.ps){
			className += (this.props.psNoExchange ? " psNoExchange" : "") +
				(this.props.psNoSell ? " psNoSell" : "");
		}

		return (
			<il className={className}>
				<figure><img src={this.props.cover} alt=""/></figure>
				<div className="contentContainer">
					<span className="name">{this.props.name}</span>
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
							{this.props.psNoSell ? "" : (this.props.psOnlyPrice ? "" : "desde ") + Functions.addDecimalPoints(this.props.psPrice)}
						</span>
						<span>
							{this.props.xboxNoSell ? "" : (this.props.xboxOnlyPrice ? "" : "desde ") + Functions.addDecimalPoints(this.props.xboxPrice)}
						</span>
					</div>
					<div className="alsoAvailableOn"><span></span></div>
				</div>
			</il>
		);
	}

});

module.exports = GameItem;
