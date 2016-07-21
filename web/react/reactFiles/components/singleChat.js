var React = require('react'),
		SingleMessage = require('./singleMessage.js');

var SingleChat = React.createClass({
	
	propTypes: {
		visible: React.PropTypes.bool.isRequired,
		chat: React.PropTypes.object.isRequired,
		closeSingleChatFn: React.PropTypes.func.isRequired,
		sendFn: React.PropTypes.func.isRequired,
		onKeyUpFn: React.PropTypes.func.isRequired,
		onChangeInputChat: React.PropTypes.func.isRequired,
	},
	
	render: function(){
		var text = this.props.value;
		function createMarkup() {return {__html: text};};
		return(				
			<div id="singleChat" className={"singleChat" + (this.props.visible ? " in": " out")}>
				<div className="titleContainer">
					<span>{this.props.chat.user.name}</span>
					<button className="closeButton" onClick={this.props.closeSingleChatFn}></button>
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
							onKeyUp={this.props.onKeyUpFn}
							className="content" 
							contentEditable
							dangerouslySetInnerHTML={createMarkup()}
						></span>
					</div>
					<button className="sendButton" onClick={this.props.sendFn}></button>
				</div>
			</div>
		)
	},
});

module.exports = SingleChat;
