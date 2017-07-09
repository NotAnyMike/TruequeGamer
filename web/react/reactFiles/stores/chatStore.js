var EventEmitter = require('events').EventEmitter,
		Constants = require('../utils/constants.js'),
		assign = require('object-assign'),
		AppDispatcher = require('../dispatcher.js');

var _store = {	
	unread: 0,
	user: "",
	chats: [],
	searchChatValue: "",
};

var _setSearchChatValue = function(value){
	_store.searchChatValue = value;
};

var _retrieveMessages = function(chat){
	var promiseToReturn = new Promise((resolve, reject) => {
		//retrive message
		var messageListQuery = chat.createPreviousMessageListQuery();
		var fromLast = true;
		messageListQuery.load(chat.messages.length + Constants.messageNumber, fromLast, function(messageList, error){
			if(error){
				//do something
				if(reject){
					reject(error);
				}
			}else{
				//add mine field
				if(_store.user !== ""){
					messageList.map(function(message){
						if(parseInt(message.sender.userId,10) === _store.user.id){
							message.mine = true;
						}else{
							message.mine = false;
						}
						return message;
					});
				}
				resolve(messageList);
			}
		});
	});
	return promiseToReturn;
};

var ChatStore = assign({}, EventEmitter.prototype, {

	sb: null,

	getStore: function(){
		return _store;
	},
	
	_entryPoint: function(payload){
		switch(payload.actionType){
			case Constants.actionType.sendMessage:
				ChatStore.sendMessage(payload.chat_id, payload.value);
				break;
			case Constants.actionType.chatOpen:
				ChatStore.chatOpen(payload.value);
				break;
			case Constants.actionType.changeSearchChatValue:
				_setSearchChatValue(payload.value);
				break;
			case Constants.actionType.openCertainChatWithUserId:
				ChatStore.chatOpenWithUserId(payload.value);
				break;
		}
	},

	chatOpenWithUserId: function(user_id){
		var chat = _store.chats.find(element => element.members[0].userId === user_id.toString() || element.members[1].userId === user_id.toString());
		if(chat != null){
			//send event to open existing chat
			this.chatOpen(chat.id)
		}else{
			//And send event to open new chat 
			this.emit(Constants.eventType.openNewChat)

			//create new chat
			//Creating new chat with truequeGamer fb account
			var userIds = [user_id.toString()]
			console.log(_store);
			console.log(userIds);
			this.sb.GroupChannel.createChannelWithUserIds(userIds, true, function(channel, error){
				if(error){
					this.emit(Constants.eventType.chatNotCreated);
					console.log(error);
					return;
				}
				_store.chats.push(channel);
				_store.chats = this._addAttributesToChannelList(_store.chats)
				
				//emmit event with new chat
				this.emit(Constants.eventType.chatsUpdatedAndOpen, _store.chats, channel.id);
			}.bind(this));
		}
	},	

	chatOpen: function(id){
		//get chat
		var chat = _store.chats.find(element => element.id === id);
		if(chat != null){
			//has more than 1 message?
			this.emit(Constants.eventType.openExistingChat, id);
			if(chat.messages.length <= 1 || true){ //to change
				//is it full
				if(chat.full === false){
					//if not, call retrive message
					if(chat.updating !== true){
						chat.updating = true;
						//emit event
						this.emit(Constants.eventType.chatsUpdated);
					}
					let test = _retrieveMessages(chat).then((messageList) => {
						messageList.splice(0,chat.messages.length || 1);
						chat.messages.push.apply(chat.messages, messageList);
						if(messageList.length < Constants.messageNumber){
							chat.full = true;
						}
						if(chat.updating !== false){
							chat.updating = false;
						}
						//mark chat as read
						if(chat.unreadMessageCount > 0){
							chat.markAsRead();
							
							//next line is beacause markAsRead does not make unreadMessageCount = 0
							chat.unreadMessageCount = 0;
							this.getUnreadMessageCount();
						}
						this.emit(Constants.eventType.chatsUpdated);
					}).catch((error)=>{
						console.error(error);
					});
				}
			}
			
		}
	},

	getUnreadMessageCount: function(){
		var unread = 0;
		if(_store.chats.length > 0){
				_store.chats.forEach((chat) => {
					if(chat.unreadMessageCount > 0) unread++;	
				});
		}	
		_store.unread = unread;
		this.emit(Constants.eventType.onUnreadMessageCountUpdated);
	},

	addChatsUpdatedListener: function(callback){
		this.on(Constants.eventType.chatsUpdated, callback);
	},

	removeChatsUpdatedListener: function(callback){
		this.removeListener(Constants.eventType.chatsUpdated, callback);
	},

	sendMessage: function(chat_id, value){
		var index = _store.chats.indexOf(_store.chats.find(element => element.id === chat_id));
		var id = -1*index;
		if(_store.chats[index].messages.length > 0){
			id = _store.chats[index].messages[_store.chats[index].messages.length -1 ].id + 1;
		}
		_store.chats[index].messages.unshift({
			messageId: id,
			message: value,
			time: 'ahora mismo',
			mine: true,
			recived: false
		});

		//Emiting event
		this.emit(Constants.eventType.messageAdded);

		//Sending the message
		console.log(_store)
		_store.chats[index].sendUserMessage(value, null, function(message, error){
			if (error) {
					console.error(error);
					return;
			}
			message.mine = true;
			_store.chats[index].messages[0] = message;
		});
	},

	setUser: function(user){
		_store.user = user;
		this.run()
	},

	run: function(){
		//Connect to the sendbird api and get the list for chats
		this.sb = new SendBird({ 
			    appId: "4094F42A-A4A3-4AB1-B71A-FCF72D92A0E3"
		}); 
		this.sb.connect(_store.user.id, _store.user.chat_token, function(user, error) {	
	
			if(error){
				console.error(error);
				return;
			}
			//Getting the list of group channels
			var channelListQuery = this.sb.GroupChannel.createMyGroupChannelListQuery();
			channelListQuery.includeEmpty = false; //must be false

			if (channelListQuery.hasNext) {
					channelListQuery.next(function(channelList, error){
							if (error) {
									console.error(error);
									return;
							}
							channelList = this._addAttributesToChannelList(channelList);
							_store.chats = channelList;
							self.getUnreadMessageCount();
					}.bind(this));
			}
		}.bind(this));
		
		//Receiving messages		
		var UNIQUE_CHANNEL_HANDLER = "12";
		var ChannelHandler = new this.sb.ChannelHandler();
		let self = this;
		ChannelHandler.onMessageReceived = function(channel, message){	
			let chat = _store.chats.find(element => element.id === channel.id);
			if(!chat){
				chat = this._addAttributesToChannel(channel);
				_store.chats.push(chat);
			}
			chat.messages.unshift(message);
			self.emit(Constants.eventType.messageAdded);
			self.getUnreadMessageCount();	
		}.bind(this);
		this.sb.addChannelHandler(UNIQUE_CHANNEL_HANDLER, ChannelHandler);

	},

	_addAttributesToChannelList: function(channelList){

		channelList.map(function(chat){
			return this._addAttributesToChannel(chat);
		}.bind(this));

		return channelList;

	},

	_addAttributesToChannel: function(chat){

		//get unread chats
		chat.id = chat.url.replace("sendbird_group_channel_","");
		chat.messages = [];
		if(chat.lastMessage){
			if(parseInt(chat.lastMessage.sender.userId,10) === _store.user.id){
				chat.lastMessage.mine = true;
			}else{
				chat.lastMessage.mine = false;
			}
			chat.messages.push(chat.lastMessage);
		};
		let otherUser = chat.members[0];
		if(otherUser.userId === _store.user.id){
			otherUser = chat.members[1];
		}
		chat.updating = false;
		chat.full = false;
		chat.user = otherUser;
		return chat;

	},

	addOnMessageAddedListener: function(callback){
		this.on(Constants.eventType.messageAdded, callback);
	},

	removeOnMessageAddedListener: function(callback){
		this.removeListener(Constants.eventType.messageAdded, callback);
	},

	addOnUnreadMessageCountUpdatedListener: function(callback){
		this.on(Constants.eventType.unreadMessageCountUpdate, callback);
	},

	removeOnUnreadMessageCountUpdatedListener: function(callback){
		this.removeListener(Constants.eventType.unreadMessageCountUpdate, callback);
	},
	
	addOnOpenNewChatListener: function(callback){
		this.on(Constants.eventType.openNewChat, callback);
	},

	removeOnOpenNewChatListener: function(callback){
		this.removeListener(Constants.eventType.openNewChat, callback);
	},
	
	addOnOpenExistingChatListener: function(callback){
		this.on(Constants.eventType.openExistingChat, callback);
	},

	removeOnOpenExistingChatListener: function(callback){
		this.removeListener(Constants.eventType.openExistingChat, callback);
	},

	addChatsUpdateAndOpenListener: function(callback){
		this.on(Constants.eventType.chatsUpdatedAndOpen, callback);
	},

	removeChatsUpdateAndOpenListener: function(callback){
		this.removeListener(Constants.eventType.chatsUpdatedAndOpen, callback);
	},

	addChatNotCreatedListener: function(callback){
		this.on(Constants.eventType.chatNotCreated, callback);
	},

	removeChatNotCreatedListener: function(callback){
		this.removeListener(Constants.eventType.chatNotCreated, callback);
	},

	getChats: function(){
		return _store.chats;
	},

	getSearchChatValue: function(){
		return _store.searchChatValue;
	},

});

AppDispatcher.register(function(payload){
	ChatStore._entryPoint(payload);
	return true;
});

module.exports = ChatStore;
