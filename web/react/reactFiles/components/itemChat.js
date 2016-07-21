var React = require('react');

var ItemChat = React.createClass({
	
	setInitialState: function(){
		return ({
		});
	},

	propTypes: {
		user: React.PropTypes.object.isRequired,
		message: React.PropTypes.object.isRequired,
		openCertainChatFn: React.PropTypes.func.isRequired,
		id: React.PropTypes.number.isRequired,
	},	
	
	render: function(){
		return (
			<li className={this.props.message.read ? "" : "unread"} onClick={() => this.props.openCertainChatFn(this.props.id)} >
				<figure><img src={"img/" + this.props.user.pic + ".png"} alt="" /></figure>
				<div className="content">
					<span className="name">{this.props.user.name}</span>
					<span className="time">{this.props.message.time}</span>
					<span className="messageText">{this.props.message.value}</span>
				</div>
			</li>
		);
	}

});

module.exports = ItemChat;
