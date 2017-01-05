const React = require('react');

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
		if(typeof this.props.hasHigerPrices !== 'undefined' && typeof this.props.hasHigerPrices !== 'undefined') minPriceVar = "Desde " + this.props.priceMin;

		var nameVar = 'cargando...';
		if(typeof this.props.name !== 'undefined') nameVar = this.props.name;

		return (
			<div className="gameDetails">
				<hr />
				<figure><img src="img/cover.png" alt=""/></figure>
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
