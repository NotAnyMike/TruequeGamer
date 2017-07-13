'use strict';

var React = require('react');

module.exports = React.createClass({

	propTypes: {
		suggestions: React.PropTypes.array,
		changeHandlerFn: React.PropTypes.func,
	},

	getInitialState: function(){
		return ({
			display: false,
			focusOnButton: false,
			focusOnInput: false,
		});
	},

	_onSearchButtonClick: function(e){
		var newValue = !this.state.display;
		if(newValue) this.inputElement.focus();
		this.setState({display: newValue})
	},

	_focusOutInputHandler: function(e){
		if(!e.relatedTarget || e.relatedTarget.id.indexOf("topSearchButton") === -1){
			this.setState({display: false});
		}
	},

	_onKeyDownHandler: function(e){
		var value = e.target.value;
		if(e.keyCode === 13){
			//send
			console.log("enter");
		}
	},

	_changeHandler: function(e){
		var value = e.target.value;
		this.props.changeHandlerFn(value);
	},

	render: function(){
		var className = "searchButtonSubContainer";
		if(this.state.display === true) className += " in";
		return (
			<div className={className} >
				<input 
					ref={(item) => this.inputElement = item}
					type="text" onKeyDown={this._onKeyDownHandler} onChange={this._changeHandler} onBlur={this._focusOutInputHandler}
				/>
				<ul className="suggestions">
					<li>opción 1</li>
					<li>opctión 2</li>
					<li>3</li>
				</ul>
				<button className="searchButton" id="topSearchButton" onClick={this._onSearchButtonClick}></button>
			</div>
		);
	},

});
