var React = require('react'),
		Constants = require('../utils/constants.js');

var SingleMessage = React.createClass({

	propTypes: {
		message: React.PropTypes.string.isRequired,
		mine: React.PropTypes.bool.isRequired,
		time: React.PropTypes.string.isRequired,
		user: React.PropTypes.object.isRequired,
	},
	
	render: function(){
		img = this.props.user.profileUrl;
		if(!img || img === ""){
			img = Constants.genericProfile;
		}
		return (	
			<li className={this.props.mine ? "own" : ""}>
				<figure><img src={"/img/min-" + img + ".png"} alt="" /></figure>
				<span className="message">{this.props.message}</span>
				<span className="time">{this.props.time}</span>
			</li>
		);
	}
});

module.exports = SingleMessage;
