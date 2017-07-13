'use strict';

var React = require('react'),
		TopSearchContainer = require('./topSearchContainer.js');

module.exports = React.createClass({

	propTypes: {
		changeHandlerFn: React.PropTypes.func,
	},

	render: function(){
		return (
			<div className="searchHeaderButtonContainer">
				<div>
					<TopSearchContainer changeHandlerFn={this.props.changeHandlerFn} />
				</div>
				<div></div>
			</div>
		);
	}

});
