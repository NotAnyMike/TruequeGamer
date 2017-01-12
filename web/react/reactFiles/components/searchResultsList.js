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
					} else if (element.xboxPrice && (!element.psPrice || element.xboxPrice < element.psPrice)){
						consoleProp = Constants.consoles.xbox;
					}
					
					return (
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
