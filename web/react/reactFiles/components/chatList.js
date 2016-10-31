var React = require('react'),
		ItemChat = require('./itemChat.js');

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
	},

	onSearchChatChangeFn: function(e){
		this.props.onSearchChatValueChangeFn(e.target.value);
	},

	onKeyDown: function(e){
		console.log(e.keyCode);
		if(e.keyCode === 13){
			this.props.onSearchChatFn();
		}else if(e.keyCode === 27){
			this.props.onCloseButtonSearchChatFn();
		}
	},

	render: function(){
		chats = [];
		if(this.props.chats && this.props.chats.length != null && this.props.chats.length > 0){
			this.props.chats.map(
					function(element){
						var lastMessage = "";
						if(element.lastMessage) {
							lastMessage = element.lastMessage.message;
						}
						read = true;
						if(element.unreadMessageCount > 0) read = false;
						chats.push(<ItemChat id={element.id} key={element.id} user={element.user} message={lastMessage} time={"Ya"} read={read} openCertainChatFn={this.props.openCertainChatFn}/>);
				}.bind(this))
		}else{
			if(this.props.searchingChat){
				chats = <li>No hay nadie con ese nombre en tus chats :(</li>;
			}else{
				chats = <li>No tienes chats</li>;
			}
		}

		return (			
			<div className="container">
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
