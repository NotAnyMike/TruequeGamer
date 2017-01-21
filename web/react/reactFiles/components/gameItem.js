const React = require('react'),
			AvailableConsoles = require('./availableConsoles.js'),
			Constants = require('../utils/constants.js'),
			Functions = require('../utils/functions.js');

const GameItem = React.createClass({

	propTypes: {
		isProfile: React.PropTypes.bool.isRequired, //in order to know if we are in the profile page
		name: React.PropTypes.string.isRequired,
		cover: React.PropTypes.string.isRequired,
		both: React.PropTypes.bool,
		psNoSell: React.PropTypes.bool,
		xboxNoSell: React.PropTypes.bool,
		psNoExchange: React.PropTypes.bool,
		xboxNoExchange: React.PropTypes.bool,
		only: React.PropTypes.bool,
		notOnly: React.PropTypes.bool,
		console: React.PropTypes.oneOf([Constants.consoles.xbox, Constants.consoles.ps, Constants.consoles.both]),
		psPrice: React.PropTypes.number,
		psOnlyPrice: React.PropTypes.bool,
		xboxPrice: React.PropTypes.number, xboxOnlyPrice: React.PropTypes.bool,
		goToDetailsFn: React.PropTypes.func, //this is not in order to know if we have to go to details, if goToProfileFn is null then we know
		goToProfileFn: React.PropTypes.func, //in order to know if we have to go to profile (if not null or undefined)

		/**** this values are used in details.html *****/
		psUsed: React.PropTypes.bool,
		xboxUsed: React.PropTypes.bool,
		psNew: React.PropTypes.bool, //in order to know if all of the grouped games are new
		psXbox: React.PropTypes.bool,
		
		/**** this extra values is to show the gameItem in the profile page ****/
		//Console
		//cover
		//name
		isOwnerOfProfile: React.PropTypes.bool,
		exchange: React.PropTypes.bool,
		used: React.PropTypes.bool,
		price: React.PropTypes.number,
		comment: React.PropTypes.string,	
		isNew: React.PropTypes.bool, //in order to know if this compoentn will show a "add new game" message
	},

	componentDidMount: function(){
		this.setState({
			editing: {
				name: this.props.name,
				price: this.props.price,
				exchange: this.props.exchange,
				used: this.props.used,
				comment: this.props.comment,
				ps: (this.props.console === null ? null : (this.props.console === Constants.consoles.ps ? true : false)),
			}
		});
	},

	getInitialState: function(){
		return ({
			isHover: false,
			isComponentHover: false,
			isEditing: false,
			isShowingComment: false,
			editing:{
				name: null,
				price: null,
				used: null,
				ps: null,
				exchange: null,
				comment: null,
			},
		});
	},

	getDefaultProps: function(){
		return ({
			psNoSell: false,
			xboxNoSell: false,
			psNoExchange: false, 
			xboxNoExchange: false, 
			only: false,
			notOnly: false,
			console: null,
			psUsed: false,
			xboxUsed: false,
			comment: null,
		});
	},

	_onMouseOver: function(){
		this.setState({isHover: true});
	},

	_onMouseOut: function(){
		this.setState({isHover: false});
	},

	_onMouseOutComponent: function(){
		if(this.props.isOwnerOfProfile === true) this.setState({isComponentHover: false});
	},

	_onMouseOverComponent: function(){
		if(this.props.isOwnerOfProfile === true) this.setState({isComponentHover: true});
	},

	_onInfoClicked: function(){
		//if own show editing
		if(typeof this.props.isOwnerOfProfile !== 'undefined' && this.props.isOwnerOfProfile){
			if(this.state.isShowingComment){
				this.setState({isEditing: this.state.isEditing, isShowingComment: false});
			}else{
				var newValue = !this.state.isEditing;
				this.setState({
					isEditing: newValue,
					isShowingComment: false
				});
			}
		}else{
			//else show comment
			this.setState({isShowingComment: !this.state.isShowingComment});
		}
	},

	_onEditCommentClicked: function(){
		this.setState({isShowingComment: true});
	},

	_onPublishButtonClicked: function(){
		//if comment open save it and close
		if(this.state.isShowingComment && this.state.isEditing){
			this.setState({isShowingComment: false, isEditing: true});
		}else{
			//else publish
			this.setState({isEditing: false});
			console.log("publishing game");
		}
	},
	
	_goToPage: function(){
		if(typeof this.props.goToProfileFn !== 'undefined' && this.props.goToProfileFn !== null) this.props.goToProfileFn();
		else if(typeof this.props.goToDetailsFn === 'function') this.props.goToDetailsFn();
	},

	_changeCommentHandler: function(e){
		var newValue = e.target.value;
		this.setState({
			editing: {
				name: this.state.editing.name,
				price: this.state.editing.price,
				used: this.state.editing.used,
				exchange: this.state.editing.exchange,
				ps: this.state.editing.ps,
				comment: newValue,
			}
		});
	},

	_changeNameHandler: function(e){
		var newValue = e.target.value;
		this.setState({
			editing: {
				name: newValue,
				price: this.state.editing.price,
				used: this.state.editing.used,
				exchange: this.state.editing.exchange,
				ps: this.state.editing.ps,
				comment: this.state.editing.comment,
			}
		});
	},
	
	_changeNewHandler: function(e){
		var newValue = !e.target.checked;
		this.setState({
			editing: {
				name: this.state.editing.name,
				price: this.state.editing.price,
				used: newValue,
				exchange: this.state.editing.exchange,
				ps: this.state.editing.ps,
				comment: this.state.editing.comment,
			}
		});
	},
	
	_changeUsedHandler: function(e){
		var newValue = e.target.checked;
		this.setState({
			editing: {
				name: this.state.editing.name,
				price: this.state.editing.price,
				used: newValue,
				exchange: this.state.editing.exchange,
				ps: this.state.editing.ps,
				comment: this.state.editing.comment,
			}
		});
	},
	
	_changePriceHandler: function(e){
		var newValue = e.target.value.replace(/[^0-9]/g, '');
		this.setState({
			editing: {
				name: this.state.editing.name,
				price: newValue,
				used: this.state.editing.used,
				exchange: this.state.editing.exchange,
				ps: this.state.editing.ps,
				comment: this.state.editing.comment,
			}
		});
	},
	
	render: function(){

		var onClickComponent = null;
		var cover = null;
		var name = null;
		var onMouseOverComponent = null;
		var onMouseOutComponent = null;
		var onMouseOver1 = null;
		var onMouseOut1 = null;
		var onMouseOver2 = null;
		var onMouseOut2 = null;
		var onInfoClick = null;
		var onPublishButtonClick = null;
		var onSecondButtonClick = null;
		var changeNameHandler = null;
		var changePriceHandler = null;
		var changeUsedHandler = null;
		var changeNewHandler = null;
		var changeCommentHandler = null;
		var pricePs = null;
		var priceXbox = null;
		var toReturn = null;
		var className = null;
		var psChecked = false;
		var used = false;
		var exchange = false;
		var comment = null;

		var consoleVar = this.props.console;
		if(this.props.both && this.state.isHover && consoleVar !== null){
			if(consoleVar === Constants.consoles.xbox){
				consoleVar = Constants.consoles.ps;
			}else if(consoleVar === Constants.consoles.ps){
				consoleVar = Constants.consoles.xbox;
			}
		}	

		if(this.props.isProfile){
			
			className = this.props.console + " only"
			if(this.props.console === Constants.consoles.xbox){
				className += (this.props.exchange ? " xboxNoExchange" : "") +
					(typeof this.props.price === 'undefined' || this.props.price === null ? " xboxNoSell" : "");
			}
			if(this.props.console === Constants.consoles.ps){
				className += (this.props.exchange ? " psNoExchange" : "") +
					(typeof this.props.price === 'undefined' || this.props.price === null ? " psNoSell" : "");
			}
			if(this.props.used){
				if(this.props.console === Constants.consoles.ps) className += " psUsed";
				else className += " xboxUsed";
			}else{
				if(this.props.console === Constants.consoles.ps) className += " psNew";
				else className += " xboxNew";
			}

			if(this.state.isEditing) {
				className += " new editing";
			}
			if(this.state.isShowingComment){
				className += " showComment";
			}
			if(this.props.isProfile) className += " showInfo";
			if((this.state.isComponentHover && this.state.isEditing === false) || (this.state.isEditing === true && this.state.isShowingComment === true) || (this.state.isEditing === false && this.state.isShowingComment === true && this.props.isOwnerOfProfile === false)){
				className += " commentContainerIn";
			}else{
				className += " commentContainerOut";
			}
			if(this.props.isNew === false){
				className += " alreadyCreated";
				if(this.props.exchange === true && (typeof this.props.price === 'undefined' || this.props.price === null)){
					className += " onlyExchange";
				}else if((typeof this.props.exchange === 'undefined' || this.props.exchange === false) && typeof this.props.price === 'number'){
					className += " onlySell";
				}
			}

			onClickComponent = this._goToPage;
			cover = this.props.cover;
			name = this.state.editing.name;
			onMouseOverComponent = this._onMouseOverComponent;
			onMouseOutComponent = this._onMouseOutComponent;
			onMouseOver1 = this.props.console === Constants.consoles.xbox ? this._onMouseOver  : null;
			onMouseOut1 = this.props.console === Constants.consoles.xbox ? this._onMouseOut  : null;
			onMouseOver2 = this.props.console === Constants.consoles.ps ? this._onMouseOver  : null;
			onMouseOut2 = this.props.console === Constants.consoles.ps ? this._onMouseOut  : null;
			onInfoClick = this._onInfoClicked;
			onSecondButtonClick = this._onEditCommentClicked;
			onPublishButtonClick = this._onPublishButtonClicked;
			changeNameHandler = this._changeNameHandler;
			changePriceHandler = this._changePriceHandler;
			changeUsedHandler = this._changeUsedHandler;
			changeNewHandler = this._changeNewHandler;
			changeCommentHandler = this._changeCommentHandler;
			pricePs = typeof this.state.editing.price === 'undefined' || this.state.editing.price === null ? "" : Functions.addDecimalPoints(this.state.editing.price);
			priceXbox = typeof this.state.editing.price === 'undefined' || this.state.editing.price === null ? "" : Functions.addDecimalPoints(this.state.editing.price);
			psChecked = (this.props.console === Constants.consoles.ps ? true : false);
			used = this.state.editing.used;
			exchange = this.props.exchange;
			comment = this.state.editing.comment;

		}else{

			className = consoleVar +
					(this.props.only ? " only" : "") +
					(this.props.notOnly ? " notOnly" : "");
			if(this.props.both || this.props.console === Constants.consoles.xbox){
				className += (this.props.xboxNoExchange ? " xboxNoExchange" : "") +
					(this.props.xboxNoSell ? " xboxNoSell" : "");
			}
			if(this.props.both || this.props.console === Constants.consoles.ps){
				className += (this.props.psNoExchange ? " psNoExchange" : "") +
					(this.props.psNoSell ? " psNoSell" : "");
			}
			if((this.props.both && this.props.console === Constants.consoles.ps) && this.props.psUsed){
				className += " psUsed";
			}
			if((this.props.both || this.props.console === Constants.consoles.xbox) && this.props.xboxUsed){
				className += " xboxUsed";
			}

			onClickComponent = this._goToPage;
			cover = this.props.cover;
			name = this.props.name;
			onMouseOver1 = this.props.console === Constants.consoles.xbox ? this._onMouseOver  : null;
			onMouseOut1 = this.props.console === Constants.consoles.xbox ? this._onMouseOut  : null;
			onMouseOver2 = this.props.console === Constants.consoles.ps ? this._onMouseOver  : null;
			onMouseOut2 = this.props.console === Constants.consoles.ps ? this._onMouseOut  : null;
			pricePs = this.props.psNoSell ? "" : (this.props.psOnlyPrice ? "" : "desde ") + Functions.addDecimalPoints(this.props.psPrice);
			priceXbox = this.props.xboxNoSell ? "" : (this.props.xboxOnlyPrice ? "" : "desde ") + Functions.addDecimalPoints(this.props.xboxPrice);

		}

		if(typeof used === 'undefined' || used === null) used = true;

		toReturn = (
			<il 
				className={className} 
				onClick={onClickComponent} 
				onMouseOver={onMouseOverComponent}
				onMouseOut={onMouseOutComponent}
			>
				<figure>
					<div className="info" onClick={onInfoClick}>
						<span></span>
					</div>
					<img src={cover} alt=""/>
				</figure>
				<div className="contentContainer">
					<span className="name">{name}</span>
					<div className="exchange">
						<span></span>
						<span></span>
						<div className="used"></div>
					</div>
					<div className="availableConsoles">
						<div className="container">
							<span 
								onMouseOver={onMouseOver1}
								onMouseOut={onMouseOut1}
							></span>
							<span 
								onMouseOver={onMouseOver2}
								onMouseOut={onMouseOut2}
							></span>
						</div>
					</div>
					<div className="price">
						<span>
							{pricePs}
						</span>
						<span>
							{priceXbox}
						</span>
					</div>
					<div className="alsoAvailableOn"><span></span></div>
					<button className="chatButton">
						<span></span>
					</button>
				</div>
				<form action="">
					<div className="info">
						<span onClick={onInfoClick}></span>
					</div>
					<div className="videoGameSection">
						<input type="text" placeholder="nombre del videojuego" value={name} onChange={changeNameHandler}/>
						<ul>
							<il>The Witcher</il>
							<il>The Witcher 2</il>
						</ul>
					</div>
					<div><input type="text" placeholder="precio (en caso de venta)" value={pricePs} onChange={changePriceHandler}/></div>
					<span>¿Nuevo o Usado?</span>
					<div>
						<input type="radio" id="new" name="new" value={!used} checked={!used} onClick={changeNewHandler}></input>
						<label htmlFor="new">Nuevo</label>
						<input type="radio" id="old" name="new" value={used} checked={used} onClick={changeUsedHandler}></input>
						<label htmlFor="old">Usado</label>
					</div>
					<span>¿Trueque?</span>
					<div className="exchange">
						<input type="radio" id="exchange" name="exchange" checked={exchange}></input>
						<label htmlFor="exchange">Sí</label>
						<input type="radio" id="noExchange" name="exchange" checked={!exchange}></input>
						<label htmlFor="noExchange">No</label>
					</div>
					<span>Selecciona la consola</span>
					<div className="console">
						<input type="radio" id="ps" className="ps" name="psOrxbox" checked={psChecked}></input>
						<label htmlFor="ps"></label>
						<input type="radio" id="xbox" className="xbox" name="psOrxbox" checked={!psChecked}></input>
						<label htmlFor="xbox"></label>
					</div>
					<span className="stateButtonsLabel">Estado de la publicación</span>
					<div className="stateButtons">
						<button type="button" className="delete">Eliminar</button>
						<button type="button" className="exchanged">Cambiado</button>
						<button type="button" className="sold">Vendido</button>
					</div>
					<button type="button" className="secondButton" onClick={onSecondButtonClick}>Escribir comentario</button>
					<button type="button" className="publishButton" onClick={onPublishButtonClick}></button>
				</form>
				<div className="commentContainer">
					<div className="background"></div>
					<div className="commentTextContainer">
						<span className="commentTitle">The Witcher</span>
						<span className="commentBody">{this.props.comment}</span>
						<textarea className="textArea" type="text" value={comment} onChange={changeCommentHandler}></textarea>
					</div>
				</div>
			</il>
		);

		return toReturn
	}

});

module.exports = GameItem;
