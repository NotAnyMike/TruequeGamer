var React = require('react'),
		Constants = require('../utils/constants.js');

var ItemChat = React.createClass({
	
	setInitialState: function(){
		return ({
		});
	},

	propTypes: {
		user: React.PropTypes.object.isRequired,
		message: React.PropTypes.string.isRequired,
		time: React.PropTypes.string.isRequired,
		read: React.PropTypes.bool.isRequired,
		openCertainChatFn: React.PropTypes.func.isRequired,
		id: React.PropTypes.string.isRequired,
	},	
	
	render: function(){
		var img;
		if(this.props.user && this.props.user.pic){
			img = this.props.user.pic;
		}else{
			img = Constants.genericProfile;
		}
		return (
			<li className={this.props.read ? "" : "unread"} onClick={() => this.props.openCertainChatFn(this.props.id)} >
				<figure><img src={"/img/" + img + ".png"} alt="" /></figure>
				<div className="content">
					<span className="name">{this.props.user.nickname}</span>
					<span className="time">{this.props.time}</span>
					<span className="messageText">{this.props.message}</span>
				</div>
			</li>
		);
	}

});

module.exports = ItemChat;
