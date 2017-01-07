const React = require('react'),
			DetailsList = require('./detailsList.js'),
			DetailsGameLabel = require('./detailsGameLabel.js');

const DetailsMainContainer = React.createClass({

	propTypes: {
		game: React.PropTypes.object.isRequired,
		console: React.PropTypes.string.isRequired,
		list: React.PropTypes.array.isRequired,
	},

	render: function(){
		return (
			<section className={"genericMainContainer detailsMainContainer " + this.props.console}>
				<div className="container">
					<div className="title"><span>Estás en la sección de <span>The Witcher</span> para xbox one</span></div>
					<DetailsGameLabel
						console={this.props.console}
						name={this.props.game.name}
						priceMin={this.props.game.min_price}
						cover={this.props.game.cover}
						hasHigherPrices={this.props.game.higher_prices}
						availableOnPs={this.props.game.availableOnPs}
						availableOnXbox={this.props.game.availableOnXbox}
					/>
					<DetailsList 
						console={this.props.console}
						list={this.props.list}
					/>
				</div>
			</section>
		)
	},

});

module.exports = DetailsMainContainer;
