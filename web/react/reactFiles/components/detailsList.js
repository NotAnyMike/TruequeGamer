const React = require('react'),
			GameItem = require('./gameItem.js'),
			Constants = require('../utils/constants.js');

const DetailsList = React.createClass({
	
	propTypes: {
		list: React.PropTypes.array,
	},

	render: function(){

		var consoleVar = this.props.console;
		var self = this;

		return (
			<ul className="gameList both">
				{this.props.list.map(function(element){
					
					var consoleProp = Constants.consoles.ps;
					if(consoleVar !== Constants.consoles.both){
						consoleProp = consoleVar;
					} else if (element.xboxPrice && (!element.psPrice || element.xboxPrice < element.psPrice)){
						consoleProp = Constants.consoles.xbox;
					}
					
					return (
						<GameItem 
							console={consoleProp}
							psNoExchange={!element.psExchange} 
							xboxNoExchange={!element.xboxExchange} 
							notOnly={consoleVar === Constants.consoles.ps ? element.availableOnXbox : element.availableOnPs} 
							only={consoleVar === Constants.consoles.ps ? element.psOnly : element.xboxOnly}
							psPrice={element.psPrice} 
							psOnlyPrice={element.psOnlyPrice}
							xboxPrice={element.xboxPrice} 
							xboxOnlyPrice={element.xboxOnlyPrice}
							psNoSell={element.psPrice === null ? true : false}
							xboxNoSell={element.xboxPrice === null ? true : false}
							cover={element.cover} 
							name={element.name} 
							both={consoleVar === Constants.consoles.both ? true : false}
							psUsed={element.psUsed}
							xboxUsed={element.xboxUsed}	
							comment={element.comment}
							key={element.pk}
						/>
					);
				})}
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
