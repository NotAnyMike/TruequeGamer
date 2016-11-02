var React = require('react');

var ChatBubble = React.createClass({
	
	propTypes: {
		unread: React.PropTypes.number.isRequired,
		showChatFn: React.PropTypes.func.isRequired,
	},

	render: function(){
		var className = "messagesNumber " + (this.props.unread == 0 ? "hidden" : "");
		return (			
			<section className="chatBubble" onClick={this.props.showChatFn}>
				<img src="/img/chatBubble.png" alt=""/>
				<div className={className}>
					<span>{this.props.unread}</span>
				</div>
			</section>
		);
	}

});

module.exports = ChatBubble;
