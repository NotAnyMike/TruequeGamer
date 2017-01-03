'use strict';

var React = require('react'),
		ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Index = require('./components/index.js'),
		ContactUs = require('./components/contactUs.js'),
		SearchResults = require('./components/searchResults.js'),
		Details = require('./components/details.js'),
		Testing = require('./components/searchResults.js'),
		Constants = require('./utils/constants.js');

ReactDOM.render(
	//<Index />,
	(<Router history={browserHistory}>
			<Route path="/" component={Index}/>
			<Route path="/contactUs" component={ContactUs} />
			<Route path="/search/ps-xbox/(:search)" console={Constants.consoles.both} component={SearchResults} />
			<Route path="/search/ps/(:search)" console={Constants.consoles.ps} component={SearchResults} />
			<Route path="/search/xbox/(:search)" console={Constants.consoles.xbox} component={SearchResults} />
			<Route path="/details" component={Details} />
			<Route path="/test/" component={Index}/>
			<Route path="/test/search/ps-xbox/(:search)" console={Constants.consoles.both} component={SearchResults} />
			<Route path="/test/search/ps/(:search)" console={Constants.consoles.ps} component={SearchResults} />
			<Route path="/test/search/xbox/(:search)" console={Constants.consoles.xbox} component={SearchResults} />
		</Router>),
	document.getElementById('mainContainer')
);
