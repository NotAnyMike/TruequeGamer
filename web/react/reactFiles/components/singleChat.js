var React = require('react'),
		SingleMessage = require('./singleMessage.js'),
		ReactDOM = require('react-dom');

var SingleChat = React.createClass({
	
	propTypes: {
		value: React.PropTypes.string,
		visible: React.PropTypes.bool.isRequired,
		chat: React.PropTypes.object.isRequired,
		closeSingleChatFn: React.PropTypes.func.isRequired,
		sendFn: React.PropTypes.func.isRequired,
		onKeyDownFn: React.PropTypes.func.isRequired,
		onChangeInputChat: React.PropTypes.func.isRequired,
	},

	shouldComponentUpdate: function(nextProps, nextState){
		if(nextProps.value !== '' && this.props.visible === nextProps.visible) {
			return false;
		} else {
			return true;
		}
	},

	componentDidUpdate: function(){
		if(this.props.visible){
			ReactDOM.findDOMNode(this).getElementsByClassName('content')[0].focus();
		}
	},
	
	render: function(){
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
							onKeyDown={this.props.onKeyDownFn}
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
