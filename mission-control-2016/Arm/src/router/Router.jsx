
var currentRoute;
var routeMap = {};
var hashChange = function () {
	var route = routeMap[window.location.hash];
	if (window.location.hash == "" || window.location.hash == "#") {
		route = route || routeMap["#"] || routeMap[""] || routeMap["#/"];
	}
	if (route) {
		if (currentRoute) {
			currentRoute.disactivateRoute();
		}
		console.log(app);
		app.setState({currentRoute: window.location.hash});
		route.activateRoute();
		currentRoute = route;
	}
}

window.getCurrentRoute = function() {
	return window.location.hash;
}

$(window).on('hashchange', hashChange);
$(hashChange);


export const Router = React.createClass({
	render: function() {
		return (
			<div>{this.props.children}</div>
		);
	}
});

export const Route = React.createClass({
	getInitialState: function() {
		return {
			view: <div />
		};
	},

	componentWillMount: function() {
		routeMap[this.props.path] = this;
	},

	activateRoute: function() {
		this.setState({ view: React.createElement(this.props.component, {}) })
	},

	disactivateRoute: function() {
		this.setState({ view: <div /> })
	},

	render: function() {
		return (
			<div>
				<div>{this.state.view}</div>
			</div>
		);
	}
})
