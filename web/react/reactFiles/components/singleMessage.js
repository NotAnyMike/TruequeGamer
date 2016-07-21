var React = require('react');

var SingleMessage = React.createClass({

	propTypes: {
		message: React.PropTypes.object.isRequired,
		user: React.PropTypes.object.isRequired,
	},
	
	render: function(){
		return (	
			<li className={this.props.message.mine ? "own" : ""}>
				<figure><img src={"img/min-" + this.props.user.pic + ".png"} alt="" /></figure>
				<span className="message">{this.props.message.value}</span>
				<span className="time">{this.props.message.time}</span>
			</li>
		);
	}
});

module.exports = SingleMessage;
