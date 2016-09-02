var React = require('react'),
		ItemChat = require('./itemChat.js');

var ChatList = React.createClass({
	
	propTypes: {
		chats: React.PropTypes.array.isRequired,
		closeChatFn: React.PropTypes.func.isRequired,
		openCertainChatFn: React.PropTypes.func.isRequired,
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
					<input type="text" placeholder="Buscar perfil"/>
					<button className="searchChatButton searchButton"></button>
				</div>
			</div>
		);
	}
});

module.exports = ChatList;
