const React = require('react'),
			Constants = require('../utils/constants.js'),
			functions = require('../utils/functions.js');

const DetailsGameLabel = React.createClass({
	
	propTypes: {
		name: React.PropTypes.string.isRequired,
		priceMin: React.PropTypes.number,
		hasHigherPrices: React.PropTypes.bool,
		cover: React.PropTypes.string,
		availableOnPs: React.PropTypes.bool,
		availableOnXbox: React.PropTypes.bool,
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

		return (
			<div className="gameDetails">
				<hr />
				<figure><img src={coverVar} alt=""/></figure>
				<div className="gameDetailsContainer">
					<div className="arrow-decorator"></div>
					<span>{nameVar}</span>
					<span>{minPriceVar}</span>
					<span>{availableOn}</span>
				</div>
			</div> 
		);
	},

});

module.exports = DetailsGameLabel;
