var EventEmitter = require('events').EventEmitter,
		Constants = require('../utils/constants.js'),
		assign = require('object-assign'),
		AppDispatcher = require('../dispatcher.js');

var _store = {
	
	unread: 3,
	chats: 
		[	
			{
				id: 1,
				read: true,
				user: {
					name: 'Misty',
					pic: 'profile1'
				},
				messages: [
					{
						id: 1,
						value: "Al fin si me conseguiste mis aletas de Gyrados? He escuchado que si alimentas a una Staryu con eso se vuelve más fuerte",
						time: "hace 1h",
						mine: false
					},
					{
						id: 2,
						value: "Pero el Gyrados está en peligro de extinción",
						time: "hace 30m",
						mine: true
					},
					{
						id: 3,
						value: 'y? solo dices eso para cobrarme más caro, te he visto venderlas en la plaza de pueblo paleta',
						time: "hace 30m",
						mine: false
					},
					{
						id: 4,
						value: 'hahahah te las dejaría en 30.000 y ya no te debo una bicicleta',
						time: "hace 30m",
						mine: true
					},
					{
						id: 5,
						value: 'me ves cara de idiota? te las compro en 15.000 y todavía me debes mi bicicleta! Y si no me vendes eso mañana le digo a tu madre que estas vendiendo cosas ilegales',
						time: "hace 30m",
						mine: false
					},
					{
						id: 6,
						value: 'Ok ok, pero no le digas a mi madre, no le gusta que la incomoden cuando está con el profesor',
						time: "hace 30m",
						mine: true
					},
				]
			},
			{
				id: 3,
				read: true,
				user: {
					name: 'Gary Oak',
					pic: 'profile2'
				},
				messages: [
					{
						id: 0,
						value: "Hola hermoso",
						time: "hace 1h",
						mine: false,
						recived: true
					},
					{
						id: 123,
						value: "No sé cunato aguante si poder verte!!! <3",
						time: "hace 1h",
						mine: true,
						recived: true
					},
					{
						id: 2,
						value: "No me dejes en leído!!!",
						time: "hace 30m",
						mine: true,
						recived: true
					},
					{
						id: 3,
						value: "Estas con el maldito de Brook de nuevo?",
						time: "hace 30m",
						mine: true,
						recived: true
					},
					{
						id: 4,
						value: "No amor, tú también me haces falta",
						time: "hace 30m",
						mine: false,
						recived: true
					},
					{
						id: 5,
						value: "No puedo esperar que nuestro viaje pokemon comience, you know what I mean",
						time: "hace 30m",
						mine: true,
						recived: true
					},
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
		this.removeListener(Constants.eventType.messageAdded, callback);
	},

});

AppDispatcher.register(function(payload){
	ChatStore._entryPoint(payload);
	return true;
});

module.exports = ChatStore;
