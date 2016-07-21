var React = require('react'),
		ItemChat = require('./itemChat.js');

var ChatList = React.createClass({
	
	propTypes: {
		chats: React.PropTypes.array.isRequired,
		closeChatFunction: React.PropTypes.func.isRequired,
		openCertainChatFunction: React.PropTypes.func.isRequired,
	},

	render: function(){
		return (			
			<div className="container">
				<div className="titleContainer">
					<span>Trueque Chat</span>
					<button className="closeButton" onClick={this.props.closeChatFunction}></button>
				</div>
				<ul>
					{this.props.chats.map(
							function(element){
								return (<ItemChat id={element.id} key={element.id} user={element.user} message={element.messages[0]} openCertainChatFunction={this.props.openCertainChatFunction}/>);
						}.bind(this))}
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
