'use strict';

var React = require('react'),
		TopSearchContainer = require('./topSearchContainer.js');

module.exports = React.createClass({

	propTypes: {
		changeHandlerFn: React.PropTypes.func,
		suggestions: React.PropTypes.array,
	},

	render: function(){
		return (
			<div className="searchHeaderButtonContainer">
				<div>
					<TopSearchContainer changeHandlerFn={this.props.changeHandlerFn} suggestions={this.props.suggestions}/>
				</div>
				<div></div>
			</div>
		);
	}

});
