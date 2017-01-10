const React = require('react'),
			DetailsList = require('./detailsList.js'),
			DetailsGameLabel = require('./detailsGameLabel.js'),
			Constants = require('../utils/constants.js');

const DetailsMainContainer = React.createClass({

	propTypes: {
		game: React.PropTypes.object,
		console: React.PropTypes.string.isRequired,
		list: React.PropTypes.array.isRequired,
		goToProfileFn: React.PropTypes.func,
		city: React.PropTypes.string,
		numberOfGames: React.PropTypes.number,
	},

	render: function(){
		var detailsGameLabelVar;
		if(this.props.profile){
			detailsGameLabelVar = (
				<DetailsGameLabel
					profile={this.props.profile}
					console={Constants.consoles.both}
					name={"mike"}
					cover={"/img/details_profile.png"}
					city={this.props.city}
					numberOfGames={this.props.numberOfGames}
				/>
			);
		}else{
			detailsGameLabelVar = (
				<DetailsGameLabel
					profile={this.props.profile}
					console={this.props.console}
					name={this.props.game.name}
					priceMin={this.props.game.min_price}
					cover={this.props.game.cover}
					hasHigherPrices={this.props.game.higher_prices}
					availableOnPs={this.props.game.availableOnPs}
					availableOnXbox={this.props.game.availableOnXbox}
				/>
			);
		}

		var classNameVar = "genericMainContainer detailsMainContainer " + this.props.console;
		if(this.props.profile) classNameVar += " profile";

		var titleVar;
		if(this.props.profile){
			titleVar = <div className="title"><span>Bienvenido al perfil de Mike</span></div>
		}else{
			titleVar = <div className="title"><span>Estás en la sección de <span>The Witcher</span> para xbox one</span></div>
		}

		return (
			<section className={classNameVar}>
				<div className="container">
					{titleVar}
					{detailsGameLabelVar}
					<DetailsList 
						console={this.props.console}
						list={this.props.list}
						goToProfileFn={this.props.goToProfileFn}
					/>
				</div>
			</section>
		)
	},

});

module.exports = DetailsMainContainer;
