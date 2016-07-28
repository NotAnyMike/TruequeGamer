const React = require('react'),
			AvailableConsoles = require('./availableConsoles.js');

const GameItem = React.createClass({

	render: function(){
		return (
			<il className="xbox noSell">
				<figure><img src="img/cover.png" alt=""/></figure>
				<div className="contentContainer">
					<span className="name">dark souls iii</span>
					<div className="exchange">
						<span></span>
					</div>
					<AvailableConsoles />
					<div className="price"><span></span></div>
					<div className="alsoAvailableOn"><span></span></div>
				</div>
			</il>
		);
	}

});

module.exports = GameItem;
