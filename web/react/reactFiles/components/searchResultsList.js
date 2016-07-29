const React = require('react'),
			GameItem = require('./gameItem.js'),
			Constants = require('../utils/constants.js');

const SearchResultsList = React.createClass({

	propTypes: {
		console: React.PropTypes.oneOf(Constants.searchResults.types).isRequired
	},

	render: function(){
		var xbox = 'xbox';
		var ps = 'ps';
		return (
			<ul className={this.props.console}>
				<GameItem console={ps}/>
				<GameItem console={ps} notOnly={true}/>
				<GameItem console={ps} only={true}/>
				<GameItem console={ps} psNoExchange={true}/>
				<GameItem console={ps} psNoExchange={true} notOnly={true}/>
				<GameItem console={ps} only={true} psNoExchange={true}/>
				<GameItem console={ps} xboxNoExchange={true}/>
				<GameItem console={ps} xboxNoExchange={true} notOnly={true}/>
				<GameItem console={ps} psNoExchange={true} xboxNoExchange={true}/>
				<GameItem console={ps} psNoExchange={true} xboxNoExchange={true} notOnly={true}/>
				<GameItem console={ps} xboxNoSell={true}/>
				<GameItem console={ps} xboxNoSell={true} notOnly={true}/>
				<GameItem console={ps} psNoExchange={true} xboxNoSell={true}/>
				<GameItem console={ps} psNoExchange={true} xboxNoSell={true} notOnly={true}/>
				<GameItem console={xbox}/>
				<GameItem console={xbox} notOnly={true}/>
				<GameItem console={xbox} only={true}/>
				<GameItem console={xbox} xboxNoExchange={true}/>
				<GameItem console={xbox} xboxNoExchange={true} notOnly={true}/>
				<GameItem console={xbox} only={true} xboxNoExchange={true}/>
				<GameItem console={xbox} psNoExchange={true}/>
				<GameItem console={xbox} psNoExchange={true} notOnly={true}/>
				<GameItem console={xbox} xboxNoExchange={true} psNoExchange={true}/>
				<GameItem console={xbox} xboxNoExchange={true} psNoExchange={true} notOnly={true}/>
				<GameItem console={xbox} psNoSell={true}/>
				<GameItem console={xbox} psNoSell={true} notOnly={true}/>
				<GameItem console={xbox} xboxNoExchange={true} psNoSell={true}/>
				<GameItem console={xbox} xboxNoExchange={true} psNoSell={true} notOnly={true}/>
			</ul>
		);	
	},

});

module.exports = SearchResultsList;
