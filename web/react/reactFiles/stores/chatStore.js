var EventEmitter = require('events').EventEmitter,
		Constants = require('../utils/constants.js'),
		assign = require('object-assign'),
		AppDispatcher = require('../dispatcher.js');

var _store = {
	
	unread: 3,
	user: "",
	chats: [],
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
		var id = 0;
		if(_store.chats[index].messages.length > 0){
			id = _store.chats[index].messages[_store.chats[index].messages.length -1 ].id + 1;
		}
		_store.chats[index].messages.push({
			id: id,
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
			console.log(message);
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
									chat.messages.push(chat.lastMessage);
								};
								let otherUser = chat.members[0];
								if(otherUser.userId === user.userId){
									otherUser = chat.members[1];
								}
								chat.updating = false;
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
