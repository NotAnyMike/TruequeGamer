'use strict';

var React = require('react'),
		SocialLink = require('./socialLink.js'),
		Constants = require('../utils/constants.js'),
		browserHistory = require('react-router').browserHistory;

module.exports = React.createClass({

	propTypes: {
		version: React.PropTypes.oneOf([Constants.footer.versions.normal, Constants.footer.versions.white, Constants.footer.versions.whiteBackground])
	},

	getDefaultProps: function(){
		return ({version: Constants.footer.versions.normal});
	},

	_onAboutUsClickHandler: function(){
		browserHistory.push(Constants.routes.aboutUs);
	},

	render: function(){
		return (
			<footer className={this.props.version}>
				<div className="footerContainer">
					<section className="moreLinks">
						<a onClick={this._onAboutUsClickHandler}>
							<div class="smiling"></div>
							<p>Sobre nosotros</p>
							<p>(contáctanos)</p>
						</a>
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
						<figure><img src="/img/bug.png" alt=""/></figure>
						<span>Chan, chan, chan, chaaan</span>
						<a href="">Informar bug!</a>
					</section>
				</div>
				<div className={"decoration" + (this.props.version === Constants.footer.versions.whiteBackground || this.props.version === Constants.footer.versions.normal ? " normal" : " white")}></div>
			</footer>
		);
	},

});
