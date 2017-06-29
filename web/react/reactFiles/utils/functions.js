'use strict';

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
		if(self.fetch){
			return fetch(req)
		}else{
			//use xml
			return null
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
	getCustomHeader: function(type='get', url, userData=null, withCredentials=false){
		//data.append( "json", JSON.stringify( editing ) );
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
		if(userData != null){
			var data = JSON.stringify( userData );
			init.body = data;
		}
		init.method = type;
		var req = new Request(url, init)
		return req;
	}
};

module.exports = Functions;
