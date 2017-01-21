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
								key={element.pk}
							/>
						);
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
								key={element.pk}
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