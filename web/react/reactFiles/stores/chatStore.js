var EventEmitter = require('events').EventEmitter,
		Constants = require('../constants.js'),
		assign = require('object-assign')
		AppDispatcher = require('../dispatcher.js');

var _store = {
	
	unread: 3,
	chats: 
		[	
			{
				id: 1,
				read: true,
				user: {
					name: 'Sandra Ficci',
					pic: 'profile'
				},
				messages: [
					{
						id: 1,
						value: "No sé si pueda, yo te confirmo mañana, que pena contigo luis.",
						time: "hace 1h",
						mine: false
					},
					{
						id: 2,
						value: "Ok gracias",
						time: "hace 30m",
						mine: true
					}
				]
			},
			{
				id: 3,
				read: true,
				user: {
					name: 'Mike W',
					pic: 'profile'
				},
				messages: [
					{
						id: 123,
						value: "Te compro todo lo que tengas!!.",
						time: "hace 1h",
						mine: false,
						recived: true
					},
					{
						id: 2,
						value: "No, jódete, ya no lo vendo :3",
						time: "hace 30m",
						mine: true,
						recived: true
					}
				]
			}
		]
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

	sendMessage: function(chat_id, value){
		var index = _store.chats.indexOf(_store.chats.find(element => element.id === chat_id));
		console.log(index);
		_store.chats[index].messages.push({
			id: _store.chats[index].messages[_store.chats[index].messages.length -1 ].id + 1,
			value: value,
			time: 'ahora mismo',
			mine: true,
			recived: false
		});
		this.emit(Constants.eventType.messageAdded);
	},

	addOnMessageAddedListener: function(callback){
		this.on(Constants.eventType.messageAdded, callback);
	},

	removeOnMessageAddedListener: function(callback){
		this.removeListener(callback);
	},

});

AppDispatcher.register(function(payload){
	ChatStore._entryPoint(payload);
	return true;
});

module.exports = ChatStore;
