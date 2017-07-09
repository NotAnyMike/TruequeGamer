const React = require('react'),
			DetailsList = require('./detailsList.js'),
			DetailsGameLabel = require('./detailsGameLabel.js'),
			Constants = require('../utils/constants.js');

const DetailsMainContainer = React.createClass({

	propTypes: {
		isProfile: React.PropTypes.bool.isRequired,
		user_id: React.PropTypes.number,
		isOwnerOfProfile: React.PropTypes.bool,
		idUserLogged: React.PropTypes.number,
		game: React.PropTypes.object,
		console: React.PropTypes.string.isRequired,
		list: React.PropTypes.array.isRequired,
		goToProfileFn: React.PropTypes.func,
		name: React.PropTypes.string,
		city: React.PropTypes.string,
		picture: React.PropTypes.string,
		numberOfGames: React.PropTypes.number,
		onPublishGameFn: React.PropTypes.func,
		changeHandlerForSearchInputFn: React.PropTypes.func,
		onDeleteButtonClickFn: React.PropTypes.func,
		onExchangedButtonClickFn: React.PropTypes.func,
		onSoldButtonClickFn: React.PropTypes.func,
		openChatFn: React.PropTypes.func,
		goToDetailsFn: React.PropTypes.func, //When we are in profile and click a game
	},

	render: function(){
		var detailsGameLabelVar;
		if(this.props.isProfile){
			detailsGameLabelVar = (
				<DetailsGameLabel
					isProfile={this.props.isProfile}
					user_id={this.props.user_id}
					isOwnerOfProfile={this.props.isOwnerOfProfile}
					console={Constants.consoles.both}
					name={this.props.name}
					cover={this.props.picture}
					city={this.props.city}
					numberOfGames={this.props.numberOfGames}
					openChatFn={this.props.openChatFn}
				/>
			);
		}else{
			detailsGameLabelVar = (
				<DetailsGameLabel
					isProfile={this.props.isProfile}
					isOwnerOfProfile={this.props.isOwnerOfProfile}
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
		if(this.props.isProfile) classNameVar += " profile";

		var titleVar;
		if(this.props.isProfile){
				if(this.props.isOwnerOfProfile){
					titleVar = <div className="title"><span>Bienvenido a tu perfil</span></div>
				}else{
					titleVar = <div className="title"><span>Bienvenido al perfil de Mike</span></div>
				}
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
						isProfile={this.props.isProfile}
						user_id={this.props.user_id}
						isOwnerOfProfile={this.props.isOwnerOfProfile}
						idUserLogged={this.props.idUserLogged}
						list={this.props.list}
						goToProfileFn={this.props.goToProfileFn}
						onPublishGameFn={this.props.onPublishGameFn}
						changeHandlerForSearchInputFn={this.props.changeHandlerForSearchInputFn}
						onDeleteButtonClickFn={this.props.onDeleteButtonClickFn}
						onExchangedButtonClickFn={this.props.onExchangedButtonClickFn}
						onSoldButtonClickFn={this.props.onSoldButtonClickFn}
						openChatFn={this.props.openChatFn}
						goToDetailsFn={this.props.goToDetailsFn}
					/>
				</div>
			</section>
		)
	},

});

module.exports = DetailsMainContainer;
