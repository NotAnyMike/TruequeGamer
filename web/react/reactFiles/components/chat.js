var React = require('react'),
		ChatContainer = require('./chatContainer.js'),
		ChatBubble = require('./chatBubble.js'),
		ChatStore = require('../stores/chatStore.js'),
		Actions = require('../utils/actions.js');

var Chat = React.createClass({
	
	getInitialState: function(){
		var store = ChatStore.getStore();
		var id = null;
		if(store.chats.length > 0){
			id = store.chats[0].id;
		}
		return  ({
			store: store,
			activeChat: id,
			visible: null,
			singleChatVisible: null,
			textToSend: '',
		});
	},

	componentDidMount: function(){
		ChatStore.addOnMessageAddedListener(this.onMessageAdded);
		ChatStore.addChatsUpdatedListener(this.onChatsUpdated);
	},

	componentWillUnmount: function(){
		ChatStore.removeOnMessageAddedListener(this.onMessageAdded);
		ChatStore.removeChatsUpdatedListener(this.onChatsUpdated);
	},

	onChatsUpdated: function(){
		chats = ChatStore.getChats();
		this.setState({chats: chats});
	},
	
	onMessageAdded: function(){
		this.setState({
			store: ChatStore.getStore()
		});
	},
	
	showChatFn: function(){
		var singleChatVisible;
		if(this.state.singleChatVisible === null){
			singleChatVisible = null;
		}else{
			singleChatVisible = false;
		}
		this.setState({
			visible: true,
			singleChatVisible: singleChatVisible,
		});
	},

	closeChatFn: function(){
		var singleChatVisibility = null;
		if(this.state.singleChatVisible) singleChatVisibility = false;
		this.setState({
			visible: false,
			singleChatVisible: singleChatVisibility,
		});
	},

	closeSingleChatFn: function(){
		this.setState({
			singleChatVisible: false
		});
	},

	openCertainChatFn: function(id){
		//get the position of the chat with id id
		if(this.state.activeChat !== id || this.state.singleChatVisible === false || this.state.singleChatVisible === null){
			this.setState({
				activeChat: id,
				visible: true,
				singleChatVisible: true,
				textToSend: '',
			});
			Actions.chatOpen(id);
		}
	},

	sendFn: function(){
		var text = this.state.textToSend.replace(/\s+/g, '');
		if(text !== ''){
			this.setState({textToSend: ''});
			Actions.sendMessage(this.state.activeChat, this.state.textToSend);
		}
	},

	onChangeInputChatFn: function(e){
		var value;
		//Firefox does not support .innerText
		if(!e.target.innerText){
			value = e.target.textContent;
		}else{
			value = e.target.innerText;
		}
		this.setState({textToSend: value});
	},

	onKeyDownFn: function(e){
		if(e.keyCode === 13 && !e.shiftKey){
			e.preventDefault();
			this.sendFn();
		}
	},

	render: function(){		
		var activeChat = this.state.store.chats.indexOf(this.state.store.chats.find(x => x.id === this.state.activeChat));
		return (
			<div>
				<ChatBubble unread={this.state.store.unread} showChatFn={this.showChatFn}/>
				<ChatContainer 
					visible={this.state.visible} 
					singleChatVisible={this.state.singleChatVisible} 
					chats={this.state.store.chats} 
					activeChat={activeChat} 
					closeSingleChatFn={this.closeSingleChatFn} 
					closeChatFn={this.closeChatFn} 
					openCertainChatFn={this.openCertainChatFn} 
					onChangeInputChatFn={this.onChangeInputChatFn} 
					sendFn={this.sendFn} 
					onKeyDownFn={this.onKeyDownFn} 
					value={this.state.textToSend} 
				/>
			</div>
		);
	}
});

module.exports = Chat;
