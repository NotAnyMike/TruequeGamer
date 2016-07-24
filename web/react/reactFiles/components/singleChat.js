var React = require('react'),
		SingleMessage = require('./singleMessage.js');

var SingleChat = React.createClass({
	
	propTypes: {
		value: React.PropTypes.string,
		visible: React.PropTypes.bool.isRequired,
		chat: React.PropTypes.object.isRequired,
		closeSingleChatFn: React.PropTypes.func.isRequired,
		sendFn: React.PropTypes.func.isRequired,
		onKeyUpFn: React.PropTypes.func.isRequired,
		onChangeInputChat: React.PropTypes.func.isRequired,
	},

	shouldComponentUpdate: function(nextProps, nextState){
		console.log("new: " + nextProps.value);
		console.log("old: " + this.props.value);
		if(nextProps.value!=null && this.props.visible === nextProps.visible) {
			console.log('not update');
			return false;
		} else {
			console.log('uptate');
			return true;
		}
	},
	
	render: function(){
		console.log("text: '" + this.props.value + "'");
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
							key={Date()}
							onInput={this.props.onChangeInputChat} 
							onKeyUp={this.props.onKeyUpFn}
							className="content" 
							contentEditable
							dangerouslySetInnerHTML={{__html: this.props.value}}
						></span>
					</div>
					<button className="sendButton" onClick={this.props.sendFn}></button>
				</div>
			</div>
		)
	},
});

module.exports = SingleChat;
