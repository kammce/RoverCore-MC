
/* controls header at top of page 
that allows navigation between diff mission control pages

*/


import {Router, Route} from './router/Router.jsx';

var TestPageA = React.createClass({

	/* Create our Model */
	getInitialState: function() {
		return {hello: "hey"};
	},

	/* Render our View */
	render: function() {
		return (
			<div>
				This is our test page!
				<input type="text" onChange={this.onTextChange}></input>
			</div>
		)
	},

	/* Controller Functions */
	onTextChange: function() {

	}
});

var MyApp = React.createClass({

	componentDidMount() {
		window.app = this;
	},

	createLinkDropdown: function(link, index) {
		return <li key={link.route}><a href={link.route}>{link.name}</a></li>;
	},

	getCurrentLink: function() {
		if (this.state && this.state.currentRoute) {
			console.log(this.state.currentRoute);
			var currentRoute = this.state.currentRoute;
			for (var page of this.props.pages) {
				if (page.route == currentRoute) {
					return page;
				}
			}
		} else {
			return {name: "Select a Page"};
		}
	},

	isCurrentLink: function(link) {
		console.log(link.route);
		console.log(getCurrentRoute());
		return getCurrentRoute() == link.route;
	},

	/* Render the View */
	render: function() {
		return (
			<div>
				<div className="container-fluid">

					<div className="row">

						<div className="col-xs-6">
							<h5 style={{paddingTop: "10px"}}>Mission Control</h5>
							<p></p>

						</div>
						<div className="col-xs-6">
							<br />
							<div className="dropdown pull-right">
								<button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
									{this.getCurrentLink().name} {this.state && this.state.currentRoute}
									<span className="caret"></span>
								</button>
								<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
									{this.props.pages.map(this.createLinkDropdown)}
								</ul>
							</div>
						</div>
					</div>

					<hr/>

					<div className="row">
						<div className="col-xs-12">
							<Router>
								{
									this.props.pages.map((link, index) => {
										return <Route key={link.route} path={link.route} component={link.page}></Route>
									})
								}
							</Router>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default MyApp;