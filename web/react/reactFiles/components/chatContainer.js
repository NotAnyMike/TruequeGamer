var React = require('react'),
		ChatList = require('./chatList.js'),
		SingleChat = require('./singleChat.js');

var ChatContainer = React.createClass({

	propTypes: {
		chats: React.PropTypes.array.isRequired,
		activeChat: React.PropTypes.number,
		visible: React.PropTypes.bool.isRequired,
		singleChatVisible: React.PropTypes.bool.isRequired,
		closeSingleChatFunction: React.PropTypes.func.isRequired,
		closeChatFunction: React.PropTypes.func.isRequired,
		openCertainChatFunction: React.PropTypes.func.isRequired,
		sendFunction: React.PropTypes.func.isRequired,
		onChangeInputChat: React.PropTypes.func.isRequired,
	},

	render: function(){
		return (
			<section id="chat" className={"chatList "+ (this.props.visible ? "in" : "out")}>
				<ChatList chats={this.props.chats} closeChatFunction={this.props.closeChatFunction} openCertainChatFunction={this.props.openCertainChatFunction}/>
				<SingleChat visible={this.props.singleChatVisible} chat={this.props.chats[this.props.activeChat]} closeSingleChatFunction={this.props.closeSingleChatFunction} onChangeInputChat={this.props.onChangeInputChat} sendFunction={this.props.sendFunction}/>
			</section>
		)
	}
});

module.exports = ChatContainer;
