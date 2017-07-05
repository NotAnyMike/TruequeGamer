'use strict';

var React = require('react'),
		AppStore = require('../stores/appStore.js'),
		Header = require('./header.js'),
		Footer = require('./footer.js'),
		Chat = require('./chat.js');

module.exports = React.createClass({

	getInitialState: function(){
		var store = AppStore.getStore();
		return store;	
	},

	_onSendBugClickHandler: function(){
		//send change
		if(this.state.informBug.comment !== ""){
			this.setState({
				informBug: {
					coment: this.state.informBug.comment,
					send: true,	
				}
			});
			console.log("done");
		}
	},

	_onChangeTextareaHandler: function(e){
		//update state
		var newValue = e.target.value;
		this.setState({
			informBug: {
				comment: newValue,
				send: this.state.informBug.send,
			}
		});
	},

	render: function(){
		var chat;
		if(this.state.user.logged) {
			chat = <Chat user={this.state.user}/>;
		}

		var body = (
			<section className={"genericMainContainer inform" + (this.state.informBug.send ? " sent" : "")}>
				<div className="container">
					<div className="title">
						<span></span>
						<span className="text">informe de bug</span>
						<span className="text sent">informe enviado</span>
						<span></span>
					</div>
					<div className="content">
						<span>
							Por favor cuéntanos más detalladamente cual fue tu inconveniente<br/>
							¿Qué estabas haciendo? y ¿Qué pasos podemos seguir para encontrarnos con el error que tuviste?
						</span>
						<span className="sent">
							Gracias por ayudarnos! trabajaremos para corregir el error y podamos seguir disfrutando de Trueque Gamer!
						</span>
						<div className="textareaContainer">
							<textarea type="text" onChange={this._onChangeTextareaHandler} placeholder="Explica lo ocurrido y los pasos para llegar al problema en este espacio"></textarea>
						</div>
						<div><button onClick={this._onSendBugClickHandler} className="arrow-decorator dot-decorator">Enviar informe</button></div>
					</div>
				</div>
			</section>
		);
		
		return (
			<div id="semi_body">
				<Header user={this.state.user} />
				{body}	
				<Footer />
				{chat}
			</div>
		)
	}

});
