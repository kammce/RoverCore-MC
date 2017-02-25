
import MyApp from './app.jsx';
import './router/Router.jsx';

import './network/NetHandler.jsx';

/* Load up router */

/* Iteratively load up all the pages */
// It's ugly so your code doesn't have to be! :-)

var pages = [];

var req = require.context("./pages", true, /index.jsx/);
req.keys().forEach(function(key){
	if (typeof req(key).route == 'undefined') {
		throw new Error(`${key} needs to export a "route" variable!`);
	}

	var page = req(key);
	pages.push({
		page: page.default,
		route: page.route.link,
		name: page.route.name,
	})
});

/* Render ReactDOM after page is loaded. */
ReactDOM.render(React.createElement(MyApp, {pages: pages}), document.getElementById("content"));
