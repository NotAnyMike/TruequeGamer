const React = require('react');

const DetailsList = React.createClass({
	
	propTypes: {},

	render: function(){
		return (
			<ul className="gameList both">
				<il className="ps notOnly psUsed">
					<figure>
						<div className="info">
							<span></span>
						</div>
						<img src="img/details_profile.png" alt=""/>
					</figure>
					<div className="contentContainer">
						<span className="name">Alizr María</span>
						<div className="exchange">
							<span></span><span></span>
							<div className="used"></div>
						</div>
						<div className="availableConsoles">
							<div className="container">
								<span></span><span></span>
							</div>
						</div>
						<div className="price">
							<span>Desde 70.000</span><span>Desde 80.000</span>
						</div>
						<button className="chatButton">
							<span></span>
						</button>
					</div>
					<div className="commentContainer">
						<div className="background"></div>
						<span>esto es un comentario de pruba pero no se sabe que carajos es todo esto esto es un comentario de pruba pero no se sabe que carajos es todo esto esto es un comentario de pruba pero no se sabe que carajos es todo esto estto es un comentario de pruba pero no se sabe que carajos es todo estoi esto es un comentario de pruba pero no se sabe que carajos es todo esto esto es un comentario de pruba pero no se sabe que carajos es todo esto  es un comentario de pruba pero no se sabe que carajos es todo esto</span>
					</div>
				</il>
				<il className="xbox notOnly xboxUsed showComment">
					<figure>
						<div className="info">
							<span></span>
						</div>
						<img src="img/details_profile.png" alt=""/>
					</figure>
					<div className="contentContainer">
						<span className="name">Alizr María</span>
						<div className="exchange">
							<span></span><span></span>
							<div className="used"></div>
						</div>
						<div className="availableConsoles">
							<div className="container">
								<span></span><span></span>
							</div>
						</div>
						<div className="price">
							<span>Desde 70.000</span><span>Desde 80.000</span>
						</div>
						<button className="chatButton">
							<span></span>
						</button>
					</div>
					<div className="commentContainer">
						<div className="background"></div>
						<span>esto es un comentario de pruba pero no se sabe que carajos es todo esto esto es un comentario de pruba pero no se sabe que carajos es todo esto esto es un comentario de pruba pero no se sabe que carajos es todo esto estto es un comentario de pruba pero no se sabe que carajos es todo estoi esto es un comentario de pruba pero no se sabe que carajos es todo esto esto es un comentario de pruba pero no se sabe que carajos es todo esto  es un comentario de pruba pero no se sabe que carajos es todo esto</span>
					</div>
				</il>
			</ul>
		);
	},

});

module.exports = DetailsList;
