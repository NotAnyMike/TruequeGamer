const React = require('react'),
			AvailableConsoles = require('./availableConsoles.js'),
			Constants = require('../utils/constants.js'),
			Functions = require('../utils/functions.js');

const GameItem = React.createClass({

	propTypes: {
		isProfile: React.PropTypes.bool.isRequired, //in order to know if we are in the profile page
		name: React.PropTypes.string.isRequired,
		cover: React.PropTypes.string.isRequired,
		both: React.PropTypes.bool,
		psNoSell: React.PropTypes.bool,
		xboxNoSell: React.PropTypes.bool,
		psNoExchange: React.PropTypes.bool,
		xboxNoExchange: React.PropTypes.bool,
		only: React.PropTypes.bool,
		notOnly: React.PropTypes.bool,
		console: React.PropTypes.oneOf([Constants.consoles.xbox, Constants.consoles.ps, Constants.consoles.both]),
		psPrice: React.PropTypes.number,
		psOnlyPrice: React.PropTypes.bool,
		xboxPrice: React.PropTypes.number, xboxOnlyPrice: React.PropTypes.bool,
		goToDetailsFn: React.PropTypes.func, //this is not in order to know if we have to go to details, if goToProfileFn is null then we know
		goToProfileFn: React.PropTypes.func, //in order to know if we have to go to profile (if not null or undefined)

		/**** this values are used in details.html *****/
		psUsed: React.PropTypes.bool,
		xboxUsed: React.PropTypes.bool,
		psNew: React.PropTypes.bool, //in order to know if all of the grouped games are new
		psXbox: React.PropTypes.bool,
		
		/**** this extra values is to show the gameItem in the profile page ****/
		//Console
		//cover
		//name
		exchange: React.PropTypes.bool,
		used: React.PropTypes.bool,
		price: React.PropTypes.number,
		comment: React.PropTypes.string,	
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
			psUsed: false,
			xboxUsed: false,
			comment: null,
		});
	},

	_onMouseOver: function(){
		this.setState({isHover: true});
	},

	_onMouseOut: function(){
		this.setState({isHover: false});
	},
	
	_goToPage: function(){
		if(typeof this.props.goToProfileFn !== 'undefined' && this.props.goToProfileFn !== null) this.props.goToProfileFn();
		else this.props.goToDetailsFn();
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

		var className;

		var toReturn;
		if(this.props.isProfile){
			
			var comment;
			if(this.props.isProfile && typeof this.props.comment !== 'undefined' || this.props.comment !== ''){
				comment = (
					<div className="commentContainer">
						<div className="background"></div>
						<span>{this.props.comment}</span>
					</div>
				);
			}

			className = this.props.console + " only"
			if(this.props.console === Constants.consoles.xbox){
				className += (this.props.exchange ? " xboxNoExchange" : "") +
					(typeof this.props.price === 'undefined' || this.props.price === null ? " xboxNoSell" : "");
			}
			if(this.props.console === Constants.consoles.ps){
				className += (this.props.exchange ? " psNoExchange" : "") +
					(typeof this.props.price === 'undefined' || this.props.price === null ? " psNoSell" : "");
			}
			if(this.props.used){
				if(this.props.console === Constants.consoles.ps) className += " psUsed";
				else className += " xboxUsed";
			}else{
				if(this.props.console === Constants.consoles.ps) className += " psNew";
				else className += " xboxNew";
			}

			if(this.props.isProfile) className += " showInfo";
			
			toReturn = (
				<il className={className} onClick={this._goToPage}>
					<figure>
						<div className="info">
							<span></span>
						</div>
						<img src={this.props.cover} alt=""/>
					</figure>
					<div className="contentContainer">
						<span className="name">{this.props.name}</span>
						<div className="exchange">
							<span></span>
							<span></span>
							<div className="used"></div>
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
								{typeof this.props.price === 'undefined' || this.props.price === null ? "" : Functions.addDecimalPoints(this.props.price)}
							</span>
							<span>
								{typeof this.props.price === 'undefined' || this.props.price === null ? "" : Functions.addDecimalPoints(this.props.price)}
							</span>
						</div>
						<div className="alsoAvailableOn"><span></span></div>
					</div>
					{comment}
				</il>
			);

		}else{

			className = consoleVar +
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
			if((this.props.both && this.props.console === Constants.consoles.ps) && this.props.psUsed){
				className += " psUsed";
			}
			if((this.props.both || this.props.console === Constants.consoles.xbox) && this.props.xboxUsed){
				className += " xboxUsed";
			}

			toReturn = (
				<il className={className} onClick={this._goToPage}>
					<figure>
						<div className="info">
							<span></span>
						</div>
						<img src={this.props.cover} alt=""/>
					</figure>
					<div className="contentContainer">
						<span className="name">{this.props.name}</span>
						<div className="exchange">
							<span></span>
							<span></span>
							<div className="used"></div>
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
						<button className="chatButton">
							<span></span>
						</button>
					</div>
				</il>
			);

		}
		return toReturn
	}

});

module.exports = GameItem;
