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

		var onClickComponent = null;
		var cover = null;
		var name = null;
		var onMouseOver1 = null;
		var onMouseOut1 = null;
		var onMouseOver2 = null;
		var onMouseOut2 = null;
		var pricePs = null;
		var priceXbox = null;
		var toReturn = null;
		var className = null;

		var consoleVar = this.props.console;
		if(this.props.both && this.state.isHover && consoleVar !== null){
			if(consoleVar === Constants.consoles.xbox){
				consoleVar = Constants.consoles.ps;
			}else if(consoleVar === Constants.consoles.ps){
				consoleVar = Constants.consoles.xbox;
			}
		}	

		if(this.props.isProfile){
			
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
			onClickComponent = this._goToPage;
			cover = this.props.cover;
			name = this.props.name;
			onMouseOver1 = this.props.console === Constants.consoles.xbox ? this._onMouseOver  : null;
			onMouseOut1 = this.props.console === Constants.consoles.xbox ? this._onMouseOut  : null;
			onMouseOver2 = this.props.console === Constants.consoles.ps ? this._onMouseOver  : null;
			onMouseOut2 = this.props.console === Constants.consoles.ps ? this._onMouseOut  : null;
			pricePs = typeof this.props.price === 'undefined' || this.props.price === null ? "" : Functions.addDecimalPoints(this.props.price);
			priceXbox = typeof this.props.price === 'undefined' || this.props.price === null ? "" : Functions.addDecimalPoints(this.props.price);

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

			onClickComponent = this._goToPage;
			cover = this.props.cover;
			name = this.props.name;
			onMouseOver1 = this.props.console === Constants.consoles.xbox ? this._onMouseOver  : null;
			onMouseOut1 = this.props.console === Constants.consoles.xbox ? this._onMouseOut  : null;
			onMouseOver2 = this.props.console === Constants.consoles.ps ? this._onMouseOver  : null;
			onMouseOut2 = this.props.console === Constants.consoles.ps ? this._onMouseOut  : null;
			pricePs = this.props.psNoSell ? "" : (this.props.psOnlyPrice ? "" : "desde ") + Functions.addDecimalPoints(this.props.psPrice);
			priceXbox = this.props.xboxNoSell ? "" : (this.props.xboxOnlyPrice ? "" : "desde ") + Functions.addDecimalPoints(this.props.xboxPrice);

		}

		toReturn = (
			<il className={className} onClick={onClickComponent}>
				<figure>
					<div className="info">
						<span></span>
					</div>
					<img src={cover} alt=""/>
				</figure>
				<div className="contentContainer">
					<span className="name">{name}</span>
					<div className="exchange">
						<span></span>
						<span></span>
						<div className="used"></div>
					</div>
					<div className="availableConsoles">
						<div className="container">
							<span 
								onMouseOver={onMouseOver1}
								onMouseOut={onMouseOut1}
							></span>
							<span 
								onMouseOver={onMouseOver2}
								onMouseOut={onMouseOut2}
							></span>
						</div>
					</div>
					<div className="price">
						<span>
							{pricePs}
						</span>
						<span>
							{priceXbox}
						</span>
					</div>
					<div className="alsoAvailableOn"><span></span></div>
					<button className="chatButton">
						<span></span>
					</button>
				</div>
				<div className="commentContainer">
					<div className="background"></div>
					<span>{this.props.comment}</span>
				</div>
			</il>
		);

		return toReturn
	}

});

module.exports = GameItem;
