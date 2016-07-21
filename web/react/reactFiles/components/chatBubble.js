var React = require('react');

ChatBubble = React.createClass({
	
	propTypes: {
		unread: React.PropTypes.number.isRequired,
		showChatFunction: React.PropTypes.func.isRequired,
	},

	render: function(){
		return (			
			<section className="chatBubble" onClick={this.props.showChatFunction}>
				<img src="img/chatBubble.png" alt=""/>
				<div className="messagesNumber">
					<span>{this.props.unread}</span>
				</div>
			</section>
		);
	}

});

module.exports = ChatBubble;
