const React = require('react'),
			GameItem = require('./gameItem.js'),
			Constants = require('../utils/constants.js');

const DetailsList = React.createClass({
	
	propTypes: {
		isProfile: React.PropTypes.bool.isRequired,
		isOwnerOfProfile: React.PropTypes.bool,
		list: React.PropTypes.array,
		console: React.PropTypes.string.isRequired,
		goToProfileFn: React.PropTypes.func,
		onPublishNameFn: React.PropTypes.func,
		changeHandlerForSearchInputFn: React.PropTypes.func,
		onDeleteButtonClickFn: React.PropTypes.func,
		onExchangedButtonClickFn: React.PropTypes.func,
		onSoldButtonClickFn: React.PropTypes.func,
	},

	render: function(){

		var consoleVar = this.props.console;
		var self = this;

		var className = "gameList " + this.props.console + (this.props.isOwnerOfProfile ? " own" : "");

		return (
			<ul className={className}>
				{this.props.list.map(function(element){
					
					var consoleProp = Constants.consoles.ps;
					if(consoleVar !== Constants.consoles.both){
						consoleProp = consoleVar;
					} else if (element.xboxPrice && (!element.psPrice || element.xboxPrice < element.psPrice)){
						consoleProp = Constants.consoles.xbox;
					}
						
					var gameItem;
					if(self.props.isProfile){
						if(typeof element.toCreate !== 'undefined' && element.toCreate === true){
							var name = element.name !== 'undefined' ? element.name : "";
							gameItem = (
								<GameItem 
									isOwnerOfProfile={self.props.isOwnerOfProfile}
									toCreate={true}
									isProfile={self.props.isProfile}
									isNew={false}
									name={name}
									key={element.pk}
									id={null}
									temp_id={element.temp_id}
									suggestions={element.suggestions}
									onPublishGameFn={self.props.onPublishGameFn}
									changeHandlerForSearchInputFn={self.props.changeHandlerForSearchInputFn}
								/>
							);
						}else{
							gameItem = (
								<GameItem 
									isOwnerOfProfile={self.props.isOwnerOfProfile}
									isProfile={self.props.isProfile}
									console={element.console}
									cover={element.cover} 
									name={element.name} 
									exchange={element.exchange}
									price={element.price}
									comment={element.comment}
									isNew={false}
									used={element.used}
									id={element.pk}
									key={element.pk}
									temp_id={element.temp_id}
									suggestions={element.suggestions}
									onPublishGameFn={self.props.onPublishGameFn}
									changeHandlerForSearchInputFn={self.props.changeHandlerForSearchInputFn}
									onDeleteButtonClickFn={self.props.onDeleteButtonClickFn}
									onExchangedButtonClickFn={self.props.onExchangedButtonClickFn}
									onSoldButtonClickFn={self.props.onSoldButtonClickFn}
								/>
							);
						}
					}else{
						gameItem = (
							<GameItem 
								isProfile={self.props.isProfile}
								console={consoleProp}
								psNoExchange={!element.psExchange} 
								xboxNoExchange={!element.xboxExchange} 
								notOnly={consoleVar === Constants.consoles.ps ? element.availableOnXbox : element.availableOnPs} 
								only={consoleVar === Constants.consoles.ps ? element.psOnly : element.xboxOnly}
								psPrice={element.psPrice} 
								psOnlyPrice={element.psOnlyPrice}
								xboxPrice={element.xboxPrice} 
								xboxOnlyPrice={element.xboxOnlyPrice}
								psNoSell={element.psPrice === null ? true : false}
								xboxNoSell={element.xboxPrice === null ? true : false}
								cover={element.cover} 
								name={element.name} 
								both={consoleVar === Constants.consoles.both ? true : false}
								psUsed={element.psUsed}
								xboxUsed={element.xboxUsed}	
								comment={element.comment}
								goToProfileFn={self.props.goToProfileFn}
								id={element.pk}
								key={element.pk}
								username={element.username}
							/>
						);
					}
					return gameItem;
				})}
			</ul>
		);
	},

});

module.exports = DetailsList;
