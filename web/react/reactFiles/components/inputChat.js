var React = require('react'),
		ReactDOM = require('react-dom');

var InputChat = React.createClass({

	propTypes: {
		value: React.PropTypes.string,
		visible: React.PropTypes.bool,
		onKeyDownFn: React.PropTypes.func.isRequired,
		onChangeInputChatFn: React.PropTypes.func.isRequired,
	},

	shouldComponentUpdate: function(nextProps, nextState){
		if(
				nextProps.visible === false
				|| nextProps.visible === null
				|| nextProps.value === this.props.value //in order to avoid that the input field focus when by some reason it updates and the focus was in other element (eg searching chat)
				|| (
					nextProps.value !== '' 
					&& this.props.onKeyDownFn === nextProps.onKeyDownFn
					&& this.props.onChangeInputChat === nextProps.onChangeInputChat
					&& this.props.visible === nextProps.visible 
				)
			) {
			return false;
		} else {
			return true;
		}
	},

	componentDidUpdate: function(){
		if(this.props.visible){
			ReactDOM.findDOMNode(this).focus();
		}
	},
	
	render: function(){
		return (
			<span id="chatInputDiv" 
				className="content" 
				contentEditable
				key={Date()}
				onInput={this.props.onChangeInputChatFn}
				onKeyDown={this.props.onKeyDownFn}
				dangerouslySetInnerHTML={{__html: this.props.value}}
			></span>
		)
	},
});

module.exports = InputChat;
