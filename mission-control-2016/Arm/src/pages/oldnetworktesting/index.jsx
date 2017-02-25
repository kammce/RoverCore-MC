import NetHandler from "../../network/NetHandler.jsx";

var placeHolderEditor = `{
	"target": "arm",
	"command": "move",
	"data": {
		"angle1": 0,
		"angle2": 1
	}
}`

var NetworkTesterPage = React.createClass({

	/* Create our Model */
	getInitialState: function() {
		return {display: "none", error: "", lastSent: 0};
	},

	componentDidMount: function() {
	    this.editor = ace.edit(this.refs.editor);
	    this.editor.setTheme("ace/theme/github");
	    this.editor.session.setMode("ace/mode/json");


	    this.keyDownFn = (e) => {
	    	if ((e.keyCode || e.which) == 8) {
	    		e.preventDefault();
	    	}
	    };

	    $("body").bind("keydown", this.keyDownFn);
	},

	componentWillUnmount: function() {
		$("body").unbind();

		if (this.netHandler) {
			this.netHandler.close();
		}

		this.editor.destroy();
	},

	submitTarget: function(event) {
		event.preventDefault();
		this.setState({
			target: this.refs.targetForm.target.value,
			display: "block"
		});

		this.netHandler = new NetHandler();
		this.netHandler.listen((changes) => {
			this.setState(changes);
		});

	},

	sendPacket: function(event) {
		try {
			this.netHandler.executeRaw(JSON.parse(this.editor.getValue()));

			var date = new Date();

			this.setState({
				lastSent: (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds()),
				error: ""
			});
		} catch(e) {
			this.setState({
				error: e.toString()
			});
		}
	},

	textEnter: function(event) {
		if (event.ctrlKey && (event.key == "Enter" || event.charCode == "13")) {
			this.sendPacket();
			event.preventDefault();
		}
	},

	disconnect: function() {
		this.netHandler.close();
		this.netHandler = null;
		this.setState({
			display: "none"
		});
	},

	renderNetwork: function() {
		if (this.state.display == "none") {
			return <div className="row">
				<div className="col-xs-12 col-md-6">
					<h5>Target Lobe:</h5>
					<form ref="targetForm" onSubmit={this.submitTarget}>
						<div className="input-group">
							<input name="target" className="form-control" type="text" placeholder="arm"/>
							<span className="input-group-btn">
								<input className="btn btn-primary" type="submit" value="Go" />
							</span>
						</div>
					</form>
				</div>
			</div>;
		} else {
			return <div className="row">
				<div className="col-xs-12 col-md-6">
					<h5>Target Lobe: <span style={{color: 'red'}}>{this.state.target}</span></h5>
				</div>
			</div>
		}
	},

	renderError: function() {
		if (this.state.error.length > 0) {
			return <div className="row">
				<div className="col-xs-12">
					<div className="alert alert-danger" role="alert">
						{this.state.error}
					</div>
				</div>
			</div>
		} else {
			return <div></div>
		}
	},

	/* Render our View */
	render: function() {
		return (
			<div>
				{this.renderNetwork()}
				<div style={{display: this.state.display}}>
					<div ref="editor" style={{height: "250px"}} onKeyPress={this.textEnter}>
						{placeHolderEditor}
					</div>
					{this.renderError()}
					<div className="btn btn-primary" onClick={this.sendPacket}>Send</div>
					&nbsp; Press Ctrl-Enter to send the packet while in the textbox.
					<p>Last Command Sent: {this.state.lastSent}</p>
					<div className="btn btn-warning" onClick={this.disconnect}>Disconnect</div>
				</div>
			</div>
		)
	},

});

export var route = {
	name: "Old Network Tester",
	link: "#/OldNetworkTester"
};

/* Export our newly created page so that the world can see it! */
export default NetworkTesterPage;
