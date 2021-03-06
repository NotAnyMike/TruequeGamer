'use strict';

var Constants = require('./constants.js');

const Functions = {
	startAnalytics: function(){
		{(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
						})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-77835108-2', 'auto');
		ga('send', 'pageview');}
	},

	addDecimalPoints: function(nStr){
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + '.' + '$2');
		}
		return x1 + x2;
	},

	fetchAdvanced: function(req){
		if(false && self.fetch){
			return fetch(req)
		}else{
			//use xml
			console.log("there is no fetch");
			return new Promise(function(resolve,reject){
				var xmlReq = new XMLHttpRequest();

				//know what to open
				if(typeof req === 'string') xmlReq.open('get', req);
				else xmlReq.open(req.method, req.url);

				//adding headers
				if(req.headers){
					for(let [key,val] of req.headers.entries()){
						xmlReq.setRequestHeader(key,val);
					}
				}

				xmlReq.onload = function(resp){
					if(resp.target.status >= 200 && resp.target.status < 300){
						resp.target.json = function(){return new Promise(function(resolve, reject){resolve(JSON.parse(resp.target.responseText))})};
						resp.target.ok = true;
						resolve(resp.target);
					}else{
						reject({
							status: resp.target.status,
							statusText: resp.target.statusText
						});
					}
				};
				xmlReq.onerror = function(resp){
					reject({
						status: resp.target.status,
						statusText: resp.target.statusText
					});
				};

				if(req.body) xmlReq.send(req.body)
				else xmlReq.send();

			}.bind(this));

		}
	},

	getCookie: function(cname) {
		    var name = cname + "=";
		    var decodedCookie = decodeURIComponent(document.cookie);
		    var ca = decodedCookie.split(';');
		    for(var i = 0; i <ca.length; i++) {
					        var c = ca[i];
					        while (c.charAt(0) == ' ') {
										            c = c.substring(1);
										        }
					        if (c.indexOf(name) == 0) {
										            return c.substring(name.length, c.length);
										        }
					    }
		    return "";
	},

	getCustomHeader: function(type, url, userData, withCredentials){
		//data.append( "json", JSON.stringify( editing ) );
		if(!type) type = 'get';
		if(!userData) userData=null;
		if(!withCredentials)withCredentials = false;
		var init = {}
		if(withCredentials){
			var myCookie = Functions.getCookie("csrftoken");
			init = {
				credentials: "same-origin",
				headers: {
					"X-CSRFToken": myCookie,
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
			};
		}
		var data = null;
		if(userData != null){
			data = JSON.stringify( userData );
			init.body = data;
		}
		init.method = type;
		var req = new Request(url, init)
		if(data) req.body = data; // in order to use body in the XMLHttpRequest
		return req;
	},

	getTimeString: function(timestampNow){
		var timeString = "Ahora mismo";
		var time = new Date(timestampNow);
		var now = new Date();
		var minutes = "0" + time.getMinutes();
		var day = "0" + time.getDate();
		if(time.getDate() === now.getDate() && time.getMonth() === now.getMonth() && time.getYear() === now.getYear()){
			//same day
			timeString = "hoy a las " + time.getHours() + ":" + minutes.substr(-2)
		}else if(time.getYear() === now.getYear()){
			//same year
			timeString = "" + Constants.months[time.getMonth()] + " " + day.substr(-2) + " " + time.getHours() + ":" + minutes.substr(-2);
		}else{
			//else
			timeString = "" + Constants.months[time.getMonth()] + " " + day.substr(-2) + " del " + time.getFullYear();
		}
		return timeString;
	},

	wrapFunction: function(fn, context, params) {
		return function() {
			fn.apply(context, params);
		};
	},
};

module.exports = Functions;
