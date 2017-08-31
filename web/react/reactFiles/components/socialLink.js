'use strict';

var React = require('react');

module.exports = React.createClass({

	propTypes: {
		type: React.PropTypes.oneOf(['instagram', 'facebook', 'youtube', 'twitter', 'pinterest', 'twitch']).isRequired,
	},

	render: function(){
		var link = ""
		if(this.props.type === 'instagram') link = "https://www.instagram.com/truequegamer/?hl=es";
		else if(this.props.type === 'facebook') link = "https://www.facebook.com/TruequeGamer/";
		else if(this.props.type === 'youtube') link = "https://www.youtube.com/channel/UCSCPtCO9ivH1PZTRZMsCELQ/featured"
		else if(this.props.type === 'twitter') link = "https://twitter.com/TruequeGamer";
		else if(this.props.type === 'twitch') link = "https://www.twitch.tv/truequegamer";
		return <a className={this.props.type + "Link"} href={link} target="_blank"></a>;
	},

});
