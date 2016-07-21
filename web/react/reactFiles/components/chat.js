var React = require('react'),
		ChatContainer = require('./chatContainer.js'),
		ChatBubble = require('./chatBubble.js'),
		ChatStore = require('../stores/chatStore.js'),
		Actions = require('../actions.js');

var Chat = React.createClass({
	
	getInitialState: function(){
		var store = ChatStore.getStore();
		return  ({
			store: store,
			activeChat: store.chats[0].id,
			visible: false,
			singleChatVisible: false,
			textToSend: '',
		});
	},

	componentDidMount: function(){
		ChatStore.addOnMessageAddedListener(this.onMessageAdded);
	},

	componentWillUnmount: function(){
		ChatStore.removeOnMessageAddedListerner(this.onMessageAdded);
	},
	
	onMessageAdded: function(){
		this.setState({
			store: ChatStore.getStore()
		});
	},
	
	showChatFunction: function(){
		this.setState({
			visible: true,
			singleChatVisible: false
		});
	},

	closeChatFunction: function(){
		this.setState({
			visible: false,
			singleChatVisible: false
		});
	},

	closeSingleChatFunction: function(){
		this.setState({
			singleChatVisible: false
		});
	},

	openCertainChatFunction: function(id){
		//get the position of the chat with id id
		this.setState({
			activeChat: id,
			visible: true,
			singleChatVisible: true
		});
	},

	sendFunction: function(){
		Actions.sendMessage(this.state.activeChat, this.state.textToSend);
	},

	onChangeInputChat: function(e){
		if(e.keyCode == 13){
			this.sendFunction();
		}else{
			this.setState({textToSend: e.target.innerText});
		}
	},

	render: function(){
			
		var activeChat = this.state.store.chats.indexOf(this.state.store.chats.find(x => x.id === this.state.activeChat));
		return(
			<div>
				<ChatBubble unread={this.state.store.unread} showChatFunction={this.showChatFunction}/>
				<ChatContainer 
					visible={this.state.visible} 
					singleChatVisible={this.state.singleChatVisible} 
					chats={this.state.store.chats} 
					activeChat={activeChat} 
					closeSingleChatFunction={this.closeSingleChatFunction} 
					closeChatFunction={this.closeChatFunction} 
					openCertainChatFunction={this.openCertainChatFunction} 
					onChangeInputChat={this.onChangeInputChat} 
					sendFunction={this.sendFunction} 
				/>
			</div>
		);

	}
});

module.exports = Chat;
