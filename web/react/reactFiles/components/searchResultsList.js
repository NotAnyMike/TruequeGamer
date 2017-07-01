const React = require('react'),
			GameItem = require('./gameItem.js'),
			Constants = require('../utils/constants.js');

const SearchResultsList = React.createClass({

	propTypes: {
		goToDetailsFn: React.PropTypes.func.isRequired,
		isProfile: React.PropTypes.bool.isRequired,
		console: React.PropTypes.oneOf(Constants.searchResults.types).isRequired,
		list: React.PropTypes.array.isRequired,
	},

	render: function(){

		var consoleVar = this.props.console;
		var self = this;
		
		return (
			<ul className={"gameList " + this.props.console}>
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
					
					console.log(consoleVar)
					console.log(element.availableOnXbox)
					return (
						<GameItem 
							isProfile={self.props.isProfile}
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
							goToDetailsFn={self.props.goToDetailsFn}
							key={element.pk}
						/>
					);
				})}
			</ul>
		);	
	},

});

module.exports = SearchResultsList;
