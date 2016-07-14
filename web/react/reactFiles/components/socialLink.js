'use strict';

var React = require('react');

module.exports = React.createClass({

	propTypes: {
		type: React.PropTypes.oneOf(['instagram', 'facebook', 'youtube', 'twitter', 'pinterest']).isRequired,
	},

	render: function(){
		return <a className={this.props.type + "Link"} href="#"></a>;
	},

});
