'use strict';

var React = require('react'),
		ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Index = require('./components/index.js'),
		ContactUs = require('./components/contactUs.js'),
		SearchResults = require('./components/contactUs.js'),
		Testing = require('./components/searchResults.js'),
		Constants = require('./utils/constants.js');

ReactDOM.render(
	//<Index />,
	(<Router history={browserHistory}>
			<Route path="/" component={Testing} console={Constants.consoles.xbox}/>
			<Route path="/contactUs" component={ContactUs} />
			{/**<Route path="/search/ps4-xbox/(:search)" console={Constants.consoles.both} component={SearchResults} />*/}
		</Router>),
	document.getElementById('mainContainer')
);
