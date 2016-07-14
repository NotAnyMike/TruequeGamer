'use strict';

var React = require('react'),
		SocialLink = require('./socialLink.js');

module.exports = React.createClass({

	render: function(){
		return (
			<footer>
				<section className="moreLinks">
					<a href="#">Sobre nosotros</a>
					<a href="#">Contáctanos</a>
				</section>
				<div className="footerDecorator"></div>
				<section className="socialLinks">
					<SocialLink type="instagram" />
					<SocialLink type="facebook" />
					<SocialLink type="twitter" />
					<SocialLink type="twitter" />
					<SocialLink type="pinterest" />
					<span>www.truequegamer.com. ©2016 Derechos reservados. Bogotá D.C., Colombia.</span>
				</section>
				<div className="footerDecorator x-reflexion"></div>
				<section className="bugLinksContainer">
					<figure><img src="img/bug.png" alt=""/></figure>
					<span>Chan, chan, chan, chaaan</span>
					<a href="">Informar bug!</a>
				</section>
			</footer>
		);
	},

});
