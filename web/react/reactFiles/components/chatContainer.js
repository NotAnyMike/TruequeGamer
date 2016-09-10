var React = require('react'),
		ChatList = require('./chatList.js'),
		SingleChat = require('./singleChat.js');

var ChatContainer = React.createClass({

	propTypes: {
		chats: React.PropTypes.array.isRequired,
		activeChat: React.PropTypes.number,
		visible: React.PropTypes.bool,
		singleChatVisible: React.PropTypes.bool,
		closeSingleChatFn: React.PropTypes.func.isRequired,
		closeChatFn: React.PropTypes.func.isRequired,
		openCertainChatFn: React.PropTypes.func.isRequired,
		sendFn: React.PropTypes.func.isRequired,
		onChangeInputChatFn: React.PropTypes.func.isRequired,
		onKeyDownFn: React.PropTypes.func.isRequired,
	},

	render: function(){
		var visible;
		if(this.props.visible === false)
			visible = "out";
		else if(this.props.visible === true)
			visible = "in"
		else
			visible = "";

		singleChat = null;
		if(this.props.activeChat !== null && this.props.activeChat !== "" && this.props.activeChat >= 0){
			singleChat = (
				<SingleChat 
					value={this.props.value} 
					visible={this.props.singleChatVisible} 
					chat={this.props.chats[this.props.activeChat]} 
					closeSingleChatFn={this.props.closeSingleChatFn} 
					onChangeInputChatFn={this.props.onChangeInputChatFn} 
					sendFn={this.props.sendFn} 
					onKeyDownFn={this.props.onKeyDownFn} 
				/>
			);
		}
		return (
			<section id="chat" className={"chatList "+ visible}>
				<ChatList chats={this.props.chats} closeChatFn={this.props.closeChatFn} openCertainChatFn={this.props.openCertainChatFn}/>
				{singleChat}
			</section>
		)
	}
});

module.exports = ChatContainer;
