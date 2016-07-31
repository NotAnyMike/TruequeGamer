const React = require('react'),
			GameItem = require('./gameItem.js'),
			Constants = require('../utils/constants.js');

const SearchResultsList = React.createClass({

	propTypes: {
		console: React.PropTypes.oneOf(Constants.searchResults.types).isRequired,
		list: React.PropTypes.array.isRequired,
	},

	render: function(){

		var console = this.props.console;
		
		return (
			<ul className={"gameList " + this.props.console}>
				{this.props.list.map(function(element){
					
					var consoleProp = Constants.consoles.ps;
					if(console === Constants.consoles.both && element.xboxPrice && (!element.psPrice || element.xboxPrice < element.psPrice)){
						consoleProp = Constants.consoles.xbox;
					}

					return (
						<GameItem 
							console={consoleProp}
							psNoExchange={!element.psExchange} 
							xboxNoExchange={!element.xboxExchange} 
							notOnly={console === Constants.consoles.ps ? element.availableOnXbox : element.availableOnPs} 
							only={console === Constants.consoles.ps ? element.psOnly : element.xboxOnly}
							psPrice={element.psPrice} 
							psOnlyPrice={element.psOnlyPrice}
							xboxPrice={element.xboxPrice} 
							xboxOnlyPrice={element.xboxOnlyPrice}
							psNoSell={element.psPrice === null ? true : false}
							xboxNoSell={element.xboxPrice === null ? true : false}
							cover={element.cover} 
							name={element.name} 
							both={console === Constants.consoles.both ? true : false}
							key={element.id}
						/>
					);
				})}
			</ul>
		);	
	},

});

module.exports = SearchResultsList;
