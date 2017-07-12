'use strict';

var React = require('react'),
		ItemChat = require('./itemChat.js'),
		Functions = require('../utils/functions.js');

var ChatList = React.createClass({
	
	propTypes: {
		chats: React.PropTypes.array.isRequired,
		searchingChat: React.PropTypes.bool.isRequired,
		closeChatFn: React.PropTypes.func.isRequired,
		openCertainChatFn: React.PropTypes.func.isRequired,
		onSearchChatFn: React.PropTypes.func.isRequired,
		onSearchChatValueChangeFn: React.PropTypes.func.isRequired,
		onCloseButtonSearchChatFn: React.PropTypes.func.isRequired,
		searchChatValue: React.PropTypes.string,
		chatsReceived: React.PropTypes.bool,
		error: React.PropTypes.bool,
	},

	onSearchChatChangeFn: function(e){
		this.props.onSearchChatValueChangeFn(e.target.value);
	},

	onKeyDown: function(e){
		if(e.keyCode === 27){
			this.props.onCloseButtonSearchChatFn();
		}
	},

	render: function(){
		var containerClass = "container";
		var chats = [];

		if(this.props.error){
				containerClass += " imposibleToLoad";
		}else if(this.props.chats && this.props.chats.length != null && this.props.chats.length > 0){
			this.props.chats.map(
					function(element){
						var lastMessage = "";
						var timeString = "";
						if(element.lastMessage) {
							lastMessage = element.lastMessage.message;
							timeString = Functions.getTimeString(parseInt(element.lastMessage.createdAt));
						}
						var read = true;
						if(element.unreadMessageCount > 0) read = false;
						chats.push(<ItemChat id={element.id} key={element.id} user={element.user} message={lastMessage} time={timeString} read={read} openCertainChatFn={this.props.openCertainChatFn}/>);
				}.bind(this))
		}else{
			if(this.props.searchingChat){
				chats = <li>No hay nadie con ese nombre en tus chats :(</li>;
			}else if(this.props.chatsReceived === false){
				containerClass += " loading";
			}else{
				chats = <li>No tienes chats</li>;
			}
		}

		return (			
			<div className={containerClass}>
				<div className="titleContainer">
					<span>Trueque Chat</span>
					<button className="closeButton" onClick={this.props.closeChatFn}></button>
				</div>
				<ul>
					{chats}
				</ul>
				<div className="searchArea">
					<input type="text" placeholder="Buscar perfil" 
						value={this.props.searchChatValue}
						onChange={this.onSearchChatChangeFn}
						onKeyDown={this.onKeyDown}
					/>
					<button className="closeButton" 
						onClick={this.props.onCloseButtonSearchChatFn}
					></button>
					<button className="searchChatButton searchButton" onClick={this.props.onSearchChatFn}></button>
				</div>
			</div>
		);
	}
});

module.exports = ChatList;
