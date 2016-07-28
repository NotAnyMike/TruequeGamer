const React = require('react'),
			GameItem = require('./gameItem.js'),
			Constants = require('../utils/constants.js');

const SearchResultsList = React.createClass({

	propTypes: {
		console: React.PropTypes.oneOf(Constants.searchResults.types).isRequired
	},

	render: function(){
		return (
			<ul className={this.props.console}>
				<GameItem/>
				<GameItem/>
				<GameItem/>
				<GameItem/>
				<GameItem/>
				<GameItem/>
				<GameItem/>
				<GameItem/>
				<GameItem/>
				<GameItem/>
				<GameItem/>
			</ul>
		);	
	},

});

module.exports = SearchResultsList;
