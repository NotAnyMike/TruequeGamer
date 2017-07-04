'use strict';

var React = Require('react'),
		AppStore = require('../stores/appStore.js'),
		Header = require('./header.js'),
		Footer = require('./footer.js'),
		Chat = require('./chat.js');

module.exports = React.createClass({

	getInitialState: function(){
		var store = AppStore.getStore();
		return store;	
	},

	render: function(){
		var chat;
		if(this.state.user.logged) {
			chat = <Chat user={this.state.user}/>;
		}

		body = (
			<section className="genericMainContainer aboutUs">
				<div className="container">
					<div className="title">
						<span></span>
						<span className="text">sobre nostros</span>
						<span></span>
					</div>
					<div className="content">
						<span>
							Hola, somos Mike y Luis, creadores de Trueque Gamer. La idea surgio de la necesidad de poder intercambiar juegos de Play Station y Xbox, para ahorrar dinero y aprovechando que nos gusta programar, diseñar y jugar ps4 entonces decidimos intentar ayudar a la comunidad con esta app. Esta plataforma no la podemos construir solos, necesitamos la ayuda de todos 
						</span>
						<div className="contactInfoContainer">
							<div className="mike">
								<img src="img/mike_small.png" alt="">
								<span>Mike Woodcock: 312-553-8143</span>
							</div>
							<div className="decoratorLeft"></div>
							<div className="imgMike"><a href="https://www.facebook.com/MikeCrosoft" target="_blank"></a></div>
							<div className="imgLuis"><a href="https://www.facebook.com/luis.k.rodriguez.16" target="_blank"></a></div>
							<div className="decoratorRight"></div>
							<div className="luis">
								<img src="img/luis_small.png" alt="">
								<span>Luis Rodriguez: 312-489-2318</span>
							</div>
						</div>
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
