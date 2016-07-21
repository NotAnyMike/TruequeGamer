var React = require('react'),
		ChatList = require('./chatList.js'),
		SingleChat = require('./singleChat.js');

var ChatContainer = React.createClass({

	propTypes: {
		chats: React.PropTypes.array.isRequired,
		activeChat: React.PropTypes.number,
		visible: React.PropTypes.bool.isRequired,
		singleChatVisible: React.PropTypes.bool.isRequired,
		closeSingleChatFn: React.PropTypes.func.isRequired,
		closeChatFn: React.PropTypes.func.isRequired,
		openCertainChatFn: React.PropTypes.func.isRequired,
		sendFn: React.PropTypes.func.isRequired,
		onChangeInputChat: React.PropTypes.func.isRequired,
		onKeyUpFn: React.PropTypes.func.isRequired,
	},

	render: function(){
		return (
			<section id="chat" className={"chatList "+ (this.props.visible ? "in" : "out")}>
				<ChatList chats={this.props.chats} closeChatFn={this.props.closeChatFn} openCertainChatFn={this.props.openCertainChatFn}/>
				<SingleChat 
					value={this.props.value} 
					visible={this.props.singleChatVisible} 
					chat={this.props.chats[this.props.activeChat]} 
					closeSingleChatFn={this.props.closeSingleChatFn} 
					onChangeInputChat={this.props.onChangeInputChat} 
					sendFn={this.props.sendFn} 
					onKeyUpFn={this.props.onKeyUpFn} 
				/>
			</section>
		)
	}
});

module.exports = ChatContainer;
