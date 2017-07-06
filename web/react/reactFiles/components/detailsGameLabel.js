const React = require('react'),
			Constants = require('../utils/constants.js'),
			functions = require('../utils/functions.js');

const DetailsGameLabel = React.createClass({
	
	propTypes: {
		isProfile: React.PropTypes.bool.isRequired,
		isOwnerOfProfile: React.PropTypes.bool,
		name: React.PropTypes.string.isRequired,
		priceMin: React.PropTypes.number,
		hasHigherPrices: React.PropTypes.bool,
		cover: React.PropTypes.string,
		availableOnPs: React.PropTypes.bool,
		availableOnXbox: React.PropTypes.bool,
		numberOfGames: React.PropTypes.number,
		city: React.PropTypes.string,
		openChatFn: React.PropTypes.func,
	},
	
	_onClickOpenChatHandler: function(){
		this.props.openChatFn();	
	},

	render: function(){
		var minPriceVar = "-";
		if(typeof this.props.hasHigherPrices !== 'undefined' && typeof this.props.priceMin !== 'undefined') minPriceVar = "Desde " + functions.addDecimalPoints(this.props.priceMin);

		var nameVar = 'cargando...';
		if(typeof this.props.name !== 'undefined') nameVar = this.props.name;
		
		var coverVar = '/img/games/cover.png';
		if(typeof this.props.cover !== 'undefined') coverVar = this.props.cover;
		
		var availableOn;
		if(this.props.console !== Constants.consoles.both && (typeof this.props.availableOnPs !== 'undefined' || typeof this.props.availableOnXbox !== 'undefined')){
			if(this.props.console === Constants.consoles.xbox && typeof this.props.availableOnPs !== 'undefined' && this.props.availableOnPs === true){
				availableOn = "También disponible en play station 4";
			} else if(this.props.console === Constants.consoles.ps && typeof this.props.availableOnXbox !== 'undefined' && this.props.availableOnXbox === true){
				availableOn = "También disponible en xbox one";
			}
		}

		var classNameVar = "game";
		if(this.props.isProfile) classNameVar = "profile";

		var own = "";
		if(this.props.isProfile && this.props.isOwnerOfProfile) own = " own";

		var container;
		if(this.props.isProfile){
			container = (
				<div className={classNameVar + "DetailsContainer" + own}>
					<div className="arrow-decorator"></div>
					<span>{nameVar}</span>
					<span>{this.props.city}</span>
					<span>{this.props.numberOfGames + " videojuegos"}</span>
					<button onClick={this._onClickOpenChatHandler} className="openChatProfileButton">abrir chat</button>
				</div>
			);
		}else{
			container = (
				<div className={classNameVar + "DetailsContainer"}>
					<div className="arrow-decorator"></div>
					<span>{nameVar}</span>
					<span>{minPriceVar}</span>
					<span>{availableOn}</span>
				</div>
			);
		}

		classNameVar += "Details";

		return (
			<div className={classNameVar}>
				<hr />
				<figure><img src={coverVar} alt=""/></figure>
				{container}
			</div> 
		);
	},

});

module.exports = DetailsGameLabel;
