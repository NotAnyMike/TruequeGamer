const React = require('react'),
			SuggestionItem = require('./suggestionItem.js'),
			AvailableConsoles = require('./availableConsoles.js'),
			Constants = require('../utils/constants.js'),
			Functions = require('../utils/functions.js');

const GameItem = React.createClass({

	propTypes: {
		key: React.PropTypes.number.isRequired,
		id: React.PropTypes.number, //in order to know if update or if create a dvd
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
		suggestions: React.PropTypes.array, //the list of all suggestions
		onPublishGameFn: React.PropTypes.func, //in order to fetch a put or post request
		changeHandlerForSearchInputFn: React.PropTypes.func, //in order to show suggestions in the form
		updatingNameOfGameItemFn: React.PropTypes.func,//needed when the user choses a suggestion
	},

	componentDidMount: function(){
		if(this._isNew() === false){
			this.setState({
				editing: {
					name: this.props.name,
					price: this.props.price,
					exchange: this.props.exchange,
					used: this.props.used,
					comment: this.props.comment,
					ps: (this.props.console === null ? null : (this.props.console === Constants.consoles.ps ? true : false)),
					idOfGame: null,
					id: this.props.id,
				}
			});
		}
	},

	getInitialState: function(){
		var name = this.props.name !== 'undefined' ? this.props.name : "";
		var id = this.props.id;
		if(id === 'undefined') id=null;
		return ({
			isHover: false,
			isComponentHover: false,
			isEditing: false,
			isShowingComment: false,
			editing:{
				name: name,
				price: null,
				used: false,
				ps: true,
				exchange: true,
				comment: null,
				idOfGame: null,
				id: id,
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
			suggestions: [],
		});
	},

	_isNew: function(){
		return typeof this.props.toCreate !== 'undefined' && this.props.toCreate === true;
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
			this.props.onPublishGameFn(this.state.editing)
		}
	},

	_goToPage: function(){
		if(typeof this.props.goToProfileFn !== 'undefined' && this.props.goToProfileFn !== null) this.props.goToProfileFn();
		else if(typeof this.props.goToDetailsFn === 'function') this.props.goToDetailsFn(this.props.name);
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
				idOfGame: this.state.editing.idOfGame,
				id: this.state.editing.id,
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
				idOfGame: this.state.editing.idOfGame,
				id: this.state.editing.id,
			}
		});
		this.props.changeHandlerForSearchInputFn(this.props.temp_id, this.state.editing.ps,newValue)
	},
	
	_changeExchangeHandler: function(e){
		var newValue = e.target.checked;
		this.setState({
			editing: {
				name: this.state.editing.name,
				price: this.state.editing.price,
				used: this.state.editing.used,
				exchange: newValue,
				ps: this.state.editing.ps,
				comment: this.state.editing.comment,
				idOfGame: this.state.editing.idOfGame,
				id: this.state.editing.id,
			}
		});
	},
	
	_changeNoExchangeHandler: function(e){
		var newValue = !e.target.checked;
		this.setState({
			editing: {
				name: this.state.editing.name,
				price: this.state.editing.price,
				used: this.state.editing.used,
				exchange: newValue,
				ps: this.state.editing.ps,
				comment: this.state.editing.comment,
				idOfGame: this.state.editing.idOfGame,
				id: this.state.editing.id,
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
				idOfGame: this.state.editing.idOfGame,
				id: this.state.editing.id,
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
				idOfGame: this.state.editing.idOfGame,
				id: this.state.editing.id,
			}
		});
	},
	
	_changeConsoleXboxHandler: function(e){
		var newValue = !e.target.checked;
		this.setState({
			editing: {
				name: this.state.editing.name,
				price: this.state.editing.price,
				used: this.state.editing.used,
				exchange: this.state.editing.exchange,
				ps: newValue,
				comment: this.state.editing.comment,
				idOfGame: this.state.editing.idOfGame,
				id: this.state.editing.id,
			}
		});
	},
	
	_changeConsolePsHandler: function(e){
		var newValue = e.target.checked;
		this.setState({
			editing: {
				name: this.state.editing.name,
				price: this.state.editing.price,
				used: this.state.editing.used,
				exchange: this.state.editing.exchange,
				ps: newValue,
				comment: this.state.editing.comment,
				idOfGame: this.state.editing.idOfGame,
				id: this.state.editing.id,
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
				idOfGame: this.state.editing.idOfGame,
				id: this.state.editing.id,
			}
		});
	},

	_clickSuggestionHandler: function(id,string){
		this.setState({
			editing: {
				name: string,
				price: this.state.editing.price,
				used: this.state.editing.used,
				exchange: this.state.editing.exchange,
				ps: this.state.editing.ps,
				comment: this.state.editing.comment,
				idOfGame: id,
				id: this.state.editing.id,
			}
		});
	},
	
	render: function(){

		var temp_id = 0; //Only to controll the readio buttons on  the new from in profile page
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
		var onClickOnSuggestion = null;
		var changeNameHandler = null;
		var changePriceHandler = null;
		var changeUsedHandler = null;
		var changeNewHandler = null;
		var changeExchangeHandler = null;
		var changeNoExchangeHandler = null;
		var changeCommentHandler = null;
		var changeConsolePsHandler = null;
		var changeConsoleXboxHandler = null;
		var pricePs = null;
		var priceXbox = null;
		var toReturn = null;
		var className = null;
		var psChecked = false;
		var used = false;
		var exchange = false;
		var comment = null;
		var nameEditing = null;
		var priceEditing = null;
		var usedEditing = null;
		var exchangeEditing = null;
		var psCheckedEditing = null;

		var consoleVar = this.props.console;
		if(this.props.both && this.state.isHover && consoleVar !== null){
			if(consoleVar === Constants.consoles.xbox){
				consoleVar = Constants.consoles.ps;
			}else if(consoleVar === Constants.consoles.ps){
				consoleVar = Constants.consoles.xbox;
			}
		}	

		if(this.props.isProfile){

			temp_id = this.props.temp_id;

			if(this._isNew()){

				className = "new";
				if(this.state.isEditing === false) {
					onClickComponent = this._onInfoClicked;
				}

			}else{

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
				
				if(this.props.isNew === false){
					className += " alreadyCreated";
					if(this.props.exchange === true && (typeof this.props.price === 'undefined' || this.props.price === null)){
						className += " onlyExchange";
					}else if((typeof this.props.exchange === 'undefined' || this.props.exchange === false) && typeof this.props.price === 'number'){
						className += " onlySell";
					}
				}
				
				if(this.props.isProfile) className += " showInfo";
				
			}


			if(this.state.isEditing) {
				className += " editing";
			}
			if(this.state.isShowingComment){
				className += " showComment";
			}
			if((this.state.isComponentHover && this.state.isEditing === false) || (this.state.isEditing === true && this.state.isShowingComment === true) || (this.state.isEditing === false && this.state.isShowingComment === true && this.props.isOwnerOfProfile === false)){
				className += " commentContainerIn";
			}else{
				className += " commentContainerOut";
			}

			onClickComponent = this._goToPage;
			cover = this.props.cover;
			name = this.props.name; //in order to change the name when a suggestion is clicked when modifying
			nameEditing = this.state.editing.name; //in order to change the name when a suggestion is clicked when modifying
			onMouseOverComponent = this._isNew() ? null : this._onMouseOverComponent;
			onMouseOutComponent = this._isNew() ? null : this._onMouseOutComponent;
			onMouseOver1 = this.props.console === Constants.consoles.xbox ? this._onMouseOver  : null;
			onMouseOut1 = this.props.console === Constants.consoles.xbox ? this._onMouseOut  : null;
			onMouseOver2 = this.props.console === Constants.consoles.ps ? this._onMouseOver  : null;
			onMouseOut2 = this.props.console === Constants.consoles.ps ? this._onMouseOut  : null;
			onInfoClick = this._onInfoClicked;
			onSecondButtonClick = this._onEditCommentClicked;
			onPublishButtonClick = this._onPublishButtonClicked;
			onClickOnSuggestion = this._clickSuggestionHandler;
			changeNameHandler = this._changeNameHandler;
			changePriceHandler = this._changePriceHandler;
			changeUsedHandler = this._changeUsedHandler;
			changeNewHandler = this._changeNewHandler;
			changeConsolePsHandler = this._changeConsolePsHandler;
			changeConsoleXboxHandler = this._changeConsoleXboxHandler;
			changeExchangeHandler = this._changeExchangeHandler;
			changeNoExchangeHandler = this._changeNoExchangeHandler;
			changeCommentHandler = this._changeCommentHandler;
			//pricePs = typeof this.state.editing.price === 'undefined' || this.state.editing.price === null ? "" : Functions.addDecimalPoints(this.state.editing.price);
			pricePs = typeof this.props.price === 'undefined' || this.props.price === null ? "" : Functions.addDecimalPoints(this.props.price);
			//priceXbox = typeof this.state.editing.price === 'undefined' || this.state.editing.price === null ? "" : Functions.addDecimalPoints(this.state.editing.price);
			priceXbox = typeof this.props.price === 'undefined' || this.props.price === null ? "" : Functions.addDecimalPoints(this.props.price);
			priceEditing = typeof this.state.editing.price === 'undefined' || this.state.editing.price === null ? "" : Functions.addDecimalPoints(this.state.editing.price);
			psChecked = this.props.ps;
			psCheckedEditing = this.state.editing.ps;
			used = this.props.used;
			usedEditing = this.state.editing.used;
			exchange = this.props.exchange;
			exchangeEditing = this.state.editing.exchange;
			comment = this.state.editing.comment;

			if(this._isNew()){
				if(this.state.isEditing === false) {
					onClickComponent = this._onInfoClicked;
				}
			}

		
		
		}else{

			className = consoleVar +
					(this.props.only ? " only" : "") +
					(this.props.notOnly ? " notOnly" : "");
			if(this.props.both || this.props.console === Constants.consoles.xbox){
				className += (this.props.xboxNoExchange ? " xboxNoExchange" : " xboxExchange") + //adding some stuff here, if ater a while it is still working then remove this comment
					(this.props.xboxNoSell ? " xboxNoSell" : "");
			}
			if(this.props.both || this.props.console === Constants.consoles.ps){
				className += (this.props.psNoExchange ? " psNoExchange" : " psExchange") + //adding some stuff here, if ater a while it is still working then remove this comment
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

		toReturn = (
			<li 
				className={className} 
				onClick={onClickComponent} 
				onMouseOver={onMouseOverComponent}
				onMouseOut={onMouseOutComponent}
			>
				<figure>
					<div className="info" onClick={onInfoClick}>
						<span></span>
					</div>
					<div className="img">
						<div></div>
						<span>Has click para agregar un videojuego</span>
					</div>
					<img src={cover} alt=""/>
				</figure>
				<div className="contentContainer">
					<span className="newText">Añadir nuevo juego</span>	
					<span className="name">{name}</span>
					<div className="exchange">
						<span></span>
						<span></span>
					</div>
					<div className="threeAttributes">
						<div className="exchange3">trueque</div>
						<div className="used3">usado</div>
						<div className="new3">nuevo</div>
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
						<input type="text" placeholder="Selecciona el juego" value={nameEditing} onChange={changeNameHandler}/>
						<ul>
							{this.props.suggestions.map(element => {return <SuggestionItem id={element.id} key={element.id} text={element.name} page={'profile'} onClickHandler={onClickOnSuggestion} />;})}
						</ul>
					</div>
					<div><input type="text" placeholder="precio (en caso de venta)" value={priceEditing} onChange={changePriceHandler}/></div>
					<span>¿Nuevo o Usado?</span>
					<div>
						<input type="radio" id={"new" + temp_id} name={"new" + temp_id} value={!usedEditing} checked={!usedEditing} onClick={changeNewHandler}></input>
						<label htmlFor={"new" + temp_id}>Nuevo</label>
						<input type="radio" id={"old" + temp_id} name={"new" + temp_id} value={usedEditing} checked={usedEditing} onClick={changeUsedHandler}></input>
						<label htmlFor={"old" + temp_id}>Usado</label>
					</div>
					<span>¿Trueque?</span>
					<div className="exchange">
						<input type="radio" id={"exchange" + temp_id} name={"exchange" + temp_id} checked={exchangeEditing} onClick={changeExchangeHandler}></input>
						<label htmlFor={"exchange" + temp_id}>Sí</label>
						<input type="radio" id={"noExchange" + temp_id} name={"exchange" + temp_id} checked={!exchangeEditing} onClick={changeNoExchangeHandler}></input>
						<label htmlFor={"noExchange" + temp_id}>No</label>
					</div>
					<span>Selecciona la consola</span>
					<div className="console">
						<input type="radio" id={"ps" + temp_id} className="ps" name={"psOrxbox" + temp_id} checked={psCheckedEditing} onClick={changeConsolePsHandler}></input>
						<label htmlFor={"ps" + temp_id}></label>
						<input type="radio" id={"xbox" + temp_id} className="xbox" name={"psOrxbox" + temp_id} checked={!psCheckedEditing} onClick={changeConsoleXboxHandler}></input>
						<label htmlFor={"xbox" + temp_id}></label>
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
			</li>
		);

		return toReturn
	}

});

module.exports = GameItem;
