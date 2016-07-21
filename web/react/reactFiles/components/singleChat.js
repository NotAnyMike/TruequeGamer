var React = require('react'),
		SingleMessage = require('./singleMessage.js');

var SingleChat = React.createClass({
	
	propTypes: {
		visible: React.PropTypes.bool.isRequired,
		chat: React.PropTypes.object.isRequired,
		closeSingleChatFunction: React.PropTypes.func.isRequired,
		sendFunction: React.PropTypes.func.isRequired,
		onChangeInputChat: React.PropTypes.func.isRequired,
	},
	
	render: function(){
		return(				
			<div id="singleChat" className={"singleChat" + (this.props.visible ? " in": " out")}>
				<div className="titleContainer">
					<span>{this.props.chat.user.name}</span>
					<button className="closeButton" onClick={this.props.closeSingleChatFunction}></button>
				</div>
				<ul className="chatMessages">
				{this.props.chat.messages.map(function(element){
					return <SingleMessage key={element.id} message={element} user={this.props.chat.user} />;
				}.bind(this))}
				</ul>
				<div className="inputArea">
					<div className="text">
						<span id="chatInputDiv" 
							onInput={this.props.onChangeInputChat} 
							className="content" 
							contentEditable
						>Hola, cómo estás?</span>
					</div>
					<button className="sendButton" onClick={this.props.sendFunction}></button>
				</div>
			</div>
		)
	},
});

module.exports = SingleChat;
