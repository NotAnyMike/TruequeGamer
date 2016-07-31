var React = require('react');

var ChatBubble = React.createClass({
	
	propTypes: {
		unread: React.PropTypes.number.isRequired,
		showChatFn: React.PropTypes.func.isRequired,
	},

	render: function(){
		return (			
			<section className="chatBubble" onClick={this.props.showChatFn}>
				<img src="/img/chatBubble.png" alt=""/>
				<div className="messagesNumber">
					<span>{this.props.unread}</span>
				</div>
			</section>
		);
	}

});

module.exports = ChatBubble;
