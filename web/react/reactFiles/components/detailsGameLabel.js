const React = require('react'),
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

		return (
			<div className="gameDetails">
				<hr />
				<figure><img src={coverVar} alt=""/></figure>
				<div className="gameDetailsContainer">
					<div className="arrow-decorator"></div>
					<span>{nameVar}</span>
					<span>{minPriceVar}</span>
					<span>también disponible en play station 4</span>
				</div>
			</div> 
		);
	},

});

module.exports = DetailsGameLabel;
