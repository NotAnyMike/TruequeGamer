const React = require('react'),
			GameItem = require('./gameItem.js'),
			Constants = require('../utils/constants.js');

const DetailsList = React.createClass({
	
	propTypes: {
		isProfile: React.PropTypes.bool.isRequired,
		user_id: React.PropTypes.number,
		isOwnerOfProfile: React.PropTypes.bool,
		idUserLogged: React.PropTypes.number, //in order to know if the dvd belongs to the user in details
		list: React.PropTypes.array,
		console: React.PropTypes.string.isRequired,
		goToProfileFn: React.PropTypes.func,
		onPublishNameFn: React.PropTypes.func,
		changeHandlerForSearchInputFn: React.PropTypes.func,
		onDeleteButtonClickFn: React.PropTypes.func,
		onExchangedButtonClickFn: React.PropTypes.func,
		onSoldButtonClickFn: React.PropTypes.func,
		openChatFn: React.PropTypes.func,
		goToDetailsFn: React.PropTypes.func,
	},

	render: function(){
		var consoleVar = this.props.console;
		var self = this;

		var className = "gameList " + this.props.console + (this.props.isProfile && this.props.isOwnerOfProfile ? " own" : "") + (this.props.isProfile ? "" : " details");
		
		return (
			<ul className={className}>
				{this.props.list.map(function(element){
					
					var consoleProp = Constants.consoles.ps;
					if(consoleVar !== Constants.consoles.both){
						consoleProp = consoleVar;
					} else if (element.availableOnPs && element.availableOnXbox){
						//Is available in both consoles, then check price if not check exchange
						if (element.xboxPrice && element.psPrice){
							if(element.xboxPrice < element.psPrice) consoleProp = Constants.consoles.xbox;
							else consoleProp = Constants.consoles.ps;
						}else{
							//Only both dont have price
							if(element.xboxPrice) consoleProp = Constants.consoles.xbox;
							else if(element.psPrice) consoleProp = Constants.consoles.ps;
							else{
								//check the exchange
								if(element.psExchange === true) consoleProp = Constants.consoles.ps;
								else if(element.xboxExchange === true) consoleProp = Constants.consoles.xbox;
							}

						}
					} else if (element.availableOnPs){
						//Is only available on ps
						consoleProp = Constants.consoles.ps;
					} else if (element.availableOnXbox) {
						//Is only available on xbox
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
									user_id={self.props.user_id}
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
									goToDetailsFn={self.props.goToDetailsFn}
									openChatFn={self.props.openChatFn}
								/>
							);
						}
					}else{
						gameItem = (
							<GameItem 
								isProfile={self.props.isProfile}
								isOwnerOfDvd={self.props.idUserLogged === element.pk}
								console={consoleProp}
								psNoExchange={!element.psExchange} 
								xboxNoExchange={!element.xboxExchange} 
								notOnly={consoleProp === Constants.consoles.ps ? element.availableOnXbox : element.availableOnPs} 
								exclusive={consoleProp === Constants.consoles.ps ? element.psExclusive : element.xboxExclusive}
								psPrice={element.psPrice} 
								psOnlyPrice={element.psOnlyPrice}
								xboxPrice={element.xboxPrice} 
								xboxOnlyPrice={element.xboxOnlyPrice}
								psNoSell={element.psPrice === null ? true : false}
								xboxNoSell={element.xboxPrice === null ? true : false}
								cover={element.cover} 
								name={element.name} 
								both={consoleVar === Constants.consoles.both ? true : false}
								psNew={element.psNew}
								xboxNew={element.xboxNew}
								psUsed={element.psUsed}
								xboxUsed={element.xboxUsed}	
								comment={element.comment}
								goToProfileFn={self.props.goToProfileFn}
								id={element.pk}
								key={element.pk}
								username={element.username}
								openChatFn={self.props.openChatFn}
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
