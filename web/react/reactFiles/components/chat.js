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
			searchingUser: false,
			filteredChats: null,
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

	onSearchChatFn: function(){
		//what to do when the search button on the chats is clicked
		var valueToSearch = ChatStore.getSearchChatValue();

		if(valueToSearch === "" || valueToSearch == null){
			this.setState({
				searchingChat: false
			});
		}else{
			//filter function, it returns elements which have at least one member with the same nickname (all in lowercase) and different id from the user logged in
			var filteredChats = this.state.store.chats.filter((chat) => {return !!chat.members.find(member => (
				member.nickname.toLowerCase().indexOf(valueToSearch.toLowerCase()) >= 0 && member.userId !== "" + this.state.store.user.id
			))});
			console.log(filteredChats);
			this.setState({
				searchingChat: true,
				filteredChats: filteredChats,
			});
		}
	},

	onSearchChatValueChange: function(value){
		ChatStore.setSearchChatValue(value);	
	},

	render: function(){		
		var activeChat = this.state.store.chats.indexOf(this.state.store.chats.find(x => x.id === this.state.activeChat));
		var chats = (this.state.searchingChat ? this.state.filteredChats : this.state.store.chats);

		return (
			<div>
				<ChatBubble unread={this.state.store.unread} showChatFn={this.showChatFn}/>
				<ChatContainer 
					visible={this.state.visible} 
					singleChatVisible={this.state.singleChatVisible} 
					chats={chats} 
					searchingChat={this.state.searchingChat}
					activeChat={activeChat} 
					closeSingleChatFn={this.closeSingleChatFn} 
					closeChatFn={this.closeChatFn} 
					openCertainChatFn={this.openCertainChatFn} 
					onChangeInputChatFn={this.onChangeInputChatFn} 
					searchingChat={this.state.searchingChat}
					searchingChat={this.state.searchingChat}
					searchingChat={this.state.searchingCha}
					sendFn={this.sendFn} 
					onKeyDownFn={this.onKeyDownFn} 
					value={this.state.textToSend} 
					onSearchChatFn={this.onSearchChatFn}
					onSearchChatValueChangeFn={this.onSearchChatValueChange}
				/>
			</div>
		);
	}
});

module.exports = Chat;
