var React = require('react'),
		SingleMessage = require('./singleMessage.js'),
		InputChat = require('./inputChat.js'),
		Constants = require('../utils/constants.js'),
		Functions = require('../utils/functions.js');

var SingleChat = React.createClass({
	
	propTypes: {
		value: React.PropTypes.string,
		visible: React.PropTypes.bool,
		emptyChat: React.PropTypes.bool.isRequired,
		chat: React.PropTypes.object.isRequired,
		closeSingleChatFn: React.PropTypes.func.isRequired,
		sendFn: React.PropTypes.func.isRequired,
		onKeyDownFn: React.PropTypes.func.isRequired,
		onChangeInputChatFn: React.PropTypes.func.isRequired,
	},

	render: function(){
		var visible;
		if(this.props.visible === false)
			visible = "out";
		else if(this.props.visible === true)
			visible = "in"
		else
			visible = "";

		var loading = "";
		if(this.props.chat.updating === false){
			loading = " hide";
		}

		var messages = [];
		if(this.props.chat.messages && this.props.chat.messages.length > 0){
			this.props.chat.messages.map(function(element){
				var timeString = Functions.getTimeString(parseInt(element.createdAt));
				messages.push(<SingleMessage key={element.messageId} message={element.message} time={timeString} user={this.props.chat.user} mine={element.mine} />);
			}.bind(this))
		}

		return(				
			<div id="singleChat" className={"singleChat " + visible + (this.props.emptyChat ? " showLoadingChat": "")}>
				<div className="chatLoading">Loading...</div>
				<div className="titleContainer">
					<span>{this.props.emptyChat ? "" : this.props.chat.user.nickname}</span>
					<button className="closeButton" onClick={this.props.closeSingleChatFn}></button>
				</div>
				<ul className="chatMessages">
					{messages}
					<li className={"loading" + loading}>Cargando...</li>
				</ul>
				<div className="inputArea">
					<div className="text">
						<InputChat
							visible={this.props.visible}
							onChangeInputChatFn={this.props.onChangeInputChatFn}
							onKeyDownFn={this.props.onKeyDownFn}
							value={this.props.value}
						/>
					</div>
					<button className="sendButton" onClick={this.props.sendFn}></button>
				</div>
			</div>
		)
	},
});

module.exports = SingleChat;
