var EventEmitter = require('events').EventEmitter,
		Constants = require('../utils/constants.js'),
		assign = require('object-assign'),
		AppDispatcher = require('../dispatcher.js');

var _store = {
	
	unread: 3,
	user: "",
	chats: [],
};

var _retrieveMessages = function(chat){
	var promiseToReturn = new Promise((resolve, reject) => {
		//retrive message
		var messageListQuery = chat.createPreviousMessageListQuery();
		var fromLast = true;
		//messageListQuery.load(Constants.messageNumber, fromLast, function(messageList, error){
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
		}
	},

	chatOpen: function(id){
		//get chat
		var chat = _store.chats.find(element => element.id === id);
		if(chat != null){
			//has more than 1 message?
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
						this.emit(Constants.eventType.chatsUpdated);
					}).catch((error)=>{
						console.error(error);
					});
				}
			}
			
		}
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
		this.emit(Constants.eventType.messageAdded);
		_store.chats[index].sendUserMessage(value, null, function(message, error){
			if (error) {
					console.error(error);
					return;
			}
			_store.chats[index].messages[0] = message;
		});
	},

	setUser: function(user){
		_store.user = user;
		this.run()
	},

	run: function(){
		//Connect to the sendbird api and get the list for chats
		var sb = new SendBird({ 
			    appId: "4094F42A-A4A3-4AB1-B71A-FCF72D92A0E3"
		}); 
		sb.connect(_store.user.id, _store.user.chat_token, function(user, error) {	
			//Getting the list of group channels
			var channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
			channelListQuery.includeEmpty = true; //change to false

			if (channelListQuery.hasNext) {
					channelListQuery.next(function(channelList, error){
							if (error) {
									console.error(error);
									return;
							}

							channelList.map(function(chat){
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
								if(otherUser.userId === user.userId){
									otherUser = chat.members[1];
								}
								chat.updating = false;
								chat.full = false;
								chat.user = otherUser;
								return chat;
							});
							console.log(channelList);
							_store.chats = channelList;
					});
			}
		});

	},

	addOnMessageAddedListener: function(callback){
		this.on(Constants.eventType.messageAdded, callback);
	},

	removeOnMessageAddedListener: function(callback){
		this.removeListener(Constants.eventType.messageAdded, callback);
	},

	getChats: function(){
		return _store.chats;
	},

});

AppDispatcher.register(function(payload){
	ChatStore._entryPoint(payload);
	return true;
});

module.exports = ChatStore;
