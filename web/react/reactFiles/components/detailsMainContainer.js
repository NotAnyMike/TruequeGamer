const React = require('react'),
			DetailsList = require('./detailsList.js'),
			DetailsGameLabel = require('./detailsGameLabel.js');

const DetailsMainContainer = React.createClass({

	propTypes: {
		game: React.PropTypes.object.isRequired,
	},

	render: function(){
		return (
			<section className="genericMainContainer detailsMainContainer both">
				<div className="container">
					<div className="title"><span>Estás en la sección de <span>The Witcher</span> para xbox one</span></div>
					<DetailsGameLabel
						name={this.props.game.name}
						priceMin={this.props.game.min_price}
						cover={this.props.game.cover}
						hasHigherPrices={this.props.game.higher_prices}
					/>
					<DetailsList />
				</div>
			</section>
		)
	},

});

module.exports = DetailsMainContainer;
