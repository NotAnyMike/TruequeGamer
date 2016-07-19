'use strict';

var React = require('react'),
		ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Index = require('./components/index.js'),
		ContactUs = require('./components/contactUs.js');

ReactDOM.render(
	//<Index />,
	(
		<Router history={browserHistory}>
			<Route path="/" component={Index} />
			<Route path="contactUs" component={ContactUs} />
		</Router>
	),
	document.getElementById('mainContainer')
);
