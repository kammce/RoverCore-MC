/* camera page?? */

import NetHandler from "../../network/NetHandler.jsx";
import Stream from "../../components/Stream.jsx"

var inlineStyle = {
  display: 'block',
  width: "100%",
  margin: "1.5%"
};
var centerStyle = {
  textAlign: 'center',
};

var TestPage = React.createClass({

	/* Create your Model */
	getInitialState: function() {
   		this.info = {};
		this.netHandler = new NetHandler('videoStream');
		return {count:0, x:0, y:0, lockX: false, lockY: false};
	},

	startStream3: function() {
		this.info.name = 'streamOn';
		this.info.data = {};
		this.info.data.stream = 3;
		this.info.data.camera = "tracker";
		console.log(this.info)
		this.netHandler.execute('videoStream',this.info);
	},
	endStream3: function() {
		this.info.name = 'streamOff';
		this.info.data = {}
		this.info.data.stream = 3;
		this.netHandler.execute('videoStream',this.info)
	},
	adjustZoom: function() {
		this.info.name = 'zoom';
		this.info.data = {};
		this.info.data.zoom = parseInt(prompt("Select zoom number between (0-43)").toLowerCase());
		if(this.info.data.zoom > 43 || this.info.data.zoom < 0) {
			return;
		}
		this.info.data.camera = "tracker";
		console.log(this.info)
		this.netHandler.execute('videoStream',this.info);
	},
	/* Render our View */
	render: function() {
		this.renderControl();

		return (
			<div style={centerStyle}>
				<div className="row">
					<div className="col-xs-7">
						<div style={inlineStyle}>
					        <h3> Tracker Stream </h3>
					        <Stream video="3"/>
					        <br/>
						    
					        <button className="btn btn-default" onClick={this.startStream3}>Start Stream 3</button>
					        <button className="btn btn-default" onClick={this.endStream3}>End Stream 3</button>
					        <button className="btn btn-default" onClick={this.adjustZoom}>Adjust Zoom</button>
						</div>
					</div>
					
					<div className="col-xs-5">
						<canvas ref="trackerControl" height="400" width="450" style={{height:"400px", width:"450px"}}
							onTouchStart={this.controlTouchStart}
							onTouchEnd={this.controlTouchEnd}
							onTouchMove={this.controlTouchMove}
							onMouseDown={this.controlMouseDown}
							onMouseUp={this.controlMouseUp}
							onMouseMove={this.controlMouseMove}
						></canvas>
						<br />
						<strong>Pitch:</strong> {this.state.y}
						&nbsp;&nbsp;&nbsp;&nbsp;
						<strong>Yaw:</strong> {this.state.x}

						<hr />
						<a className="btn btn-default" role="button" onClick={this.onClickLocation}>Lidar Info</a>
						&nbsp;
						<a className="btn btn-default" role="button" onClick={this.centerCamera}>Center Camera</a>
						&nbsp;
						<a className={this.state.lockX ? "btn btn-primary" : "btn btn-default"} role="button" onClick={() => this.setState({lockX: !this.state.lockX})}>Lock X</a>
						&nbsp;
						<a className={this.state.lockY ? "btn btn-primary" : "btn btn-default"} role="button" onClick={() => this.setState({lockY: !this.state.lockY})}>Lock Y</a>
						<hr />
						<form className="form-inline">
						  <div className="form-group">
						    <label>Enter Pitch</label>
						    <br />
							<input type="text" ref="pitch" className="form-control" onKeyPress = {this.eKeyPressPitch}/>
						  </div>
						  &nbsp;&nbsp;
						  <div className="form-group">
						    <label>Enter Yaw</label>
						    <br />
							<input type="text" ref="yaw" className="form-control" onKeyPress = {this.eKeyPressYaw}/>
						  </div>
						  <div className="form-group">
						    <label>Enter Zoom</label>
						    <br />
							<input type="text" ref="zoom" className="form-control" onKeyPress={this.eKeyPressZoom}/>
						  </div>
						</form>
					</div>
				</div>
			</div>
		)
	},

	controlTouchStart(e) {
		this.trackingCamera = true;
	},

	controlTouchEnd(e) {
		this.trackingCamera = false;
	},

	controlTouchMove(e) {
	},

	controlMouseDown(e) {
		var y = -Math.floor((e.clientY - this.refs.trackerControl.getBoundingClientRect().top) / this.refs.trackerControl.height * 180-90);
		var x = Math.floor((e.clientX - this.refs.trackerControl.getBoundingClientRect().left) / this.refs.trackerControl.width * 390-190);

		if (this.state.lockX) {
			x = this.state.x;
		}

		if (this.state.lockY) {
			y = this.state.y;
		}

		this.setState({
			x: x,
			y: y
		});

		e.preventDefault();
		this.trackingCamera = true;
	},

	controlMouseUp(e) {
		e.preventDefault();
		this.trackingCamera = false;
	},

	controlMouseMove(e) {
		if (this.trackingCamera) {
			var y = -Math.floor((e.clientY - this.refs.trackerControl.getBoundingClientRect().top) / this.refs.trackerControl.height * 180-90);
			var x = Math.floor((e.clientX - this.refs.trackerControl.getBoundingClientRect().left) / this.refs.trackerControl.width * 390-195);

			if (this.state.lockX) {
				x = this.state.x;
			}

			if (this.state.lockY) {
				y = this.state.y;
			}

			this.setState({
				x: x,
				y: y
			})
		}

		e.preventDefault();
	},

	centerCamera() {
		this.setState({
			x: 0,
			y: 0
		})
	},

	renderControl() {
		var ctx = this.canvas;

		if (!ctx) {return;}

		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

		// this.refs.trackerControl.width = this.canvasWidth;
		// this.refs.trackerControl.height = this.canvasHeight;

		// draw grid
		ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;

		var gridHeight = 10;
		var gridWidth = 10;
		for (var x = 0; x <= gridWidth; x++) {
	    ctx.beginPath();
	    ctx.moveTo(x/gridWidth * this.canvasWidth, 0);
	    ctx.lineTo(x/gridWidth * this.canvasWidth, this.canvasHeight);
	    ctx.stroke();

	    ctx.font = "12pt Courier New";
	    ctx.fillStyle = "#fff";
			ctx.fillText(Math.round(x/gridWidth * 390 - 195),x/gridWidth * this.canvasWidth, this.canvasHeight/2);
		}

		for (var y = 0; y <= gridHeight; y++) {
	    ctx.beginPath();
	    ctx.moveTo(0, y/gridHeight * this.canvasHeight);
	    ctx.lineTo(this.canvasWidth, y/gridHeight * this.canvasHeight);
	    ctx.stroke();

	    ctx.font = "12pt Courier New";
	    ctx.fillStyle = "#fff";
			ctx.fillText(-Math.round(y/gridHeight * 180 - 90), this.canvasWidth/2,y/gridHeight * this.canvasHeight);
		}


		var originX = this.canvasWidth/2;
		var originY = this.canvasHeight/2;

		// draw cursor
		ctx.strokeStyle = "#0F0";
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo((this.state.x+195)*this.canvasWidth/390, (-this.state.y+90)*this.canvasHeight/180-20);
    ctx.lineTo((this.state.x+195)*this.canvasWidth/390, (-this.state.y+90)*this.canvasHeight/180+20);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo((this.state.x+195)*this.canvasWidth/390-20, (-this.state.y+90)*this.canvasHeight/180);
    ctx.lineTo((this.state.x+195)*this.canvasWidth/390+20, (-this.state.y+90)*this.canvasHeight/180);
    ctx.stroke();
	},

	componentDidMount: function() {

		this.netHandler = new NetHandler("tracker");

		this.netHandler.listen((changes) => {
			this.setState(changes);
		});

		this.canvas = this.refs.trackerControl.getContext("2d");
		this.canvasWidth = this.refs.trackerControl.width;
		this.canvasHeight = this.refs.trackerControl.height;
		this.renderControl();


		this.refs.pitch.value = 0;
		this.refs.yaw.value = 0;

		//Panel is where you can put different gui controls on - need a panel. Panel reference a div hey to render to Dom
		// var a = new Interface.Panel({container:this.refs.hey});

		// //makes the XY controller
		// var xy = new Interface.XY({
		// 	childWidth: 35,
		// 	numChildren: 1,
		// 	background:"#111",
		// 	fill: "rgba(127,127,127,.2)",
		// 	bounds:[0,0,1,1],
		// 	usePhysics: false,
		// 	oninit: function() { this.rainbow() },
		// 	onvaluechange : (x, y) => {
		// 		// console.log(xy.values[0])// x, and y coords in an array.
		// 		// this.setState({
		// 		// 	x:((xy.values[0].x.toFixed(2)-0.5)*390).toFixed(2),
		// 		// 	y:((xy.values[0].y.toFixed(2)-0.5)*180).toFixed(2),
		// 		// });
		// 	}
		// });

		// this.xy = xy;
		// console.log(xy);

		// a.background = 'black';
		// a.add(xy);

		this.sendUpdatesInterval = setInterval(() => this.sendUpdates(), 100);

	},

	componentWillUnmount: function() {
		clearInterval(this.sendUpdatesInterval);
	},

	sendUpdates: function() {
		this.netHandler.execute("Tracker", {
			"mode": "moveAngle",
			"yaw": this.state.x,
			"pitch": this.state.y
		});
	},


	eKeyPressPitch: function(e) {
		if (e.key === 'Enter') {
			this.setState({
				x: parseFloat(this.refs.yaw.value),
				y: parseFloat(this.refs.pitch.value)
			})
			this.renderControl();
		};
	},

	eKeyPressYaw: function(e) {
		if (e.key === 'Enter') {
			this.setState({
				x: parseFloat(this.refs.yaw.value),
				y: parseFloat(this.refs.pitch.value)
			})
			this.renderControl();
			// this.xy.values[0].x = this.refs.yaw.value / 390;
   //    this.xy.sendTargetMessage();
			// this.xy.onvaluechange();
   //    this.xy.refresh();
   //    this.xy.animate();
		};
	},
	eKeyPressZoom: function(e) {
		if (e.key === 'Enter') {
			this.info.name = 'zoom';
			this.info.data = {};
			this.info.data.zoom = parseInt(this.refs.zoom.value);
			if(this.info.data.zoom > 43 || this.info.data.zoom < 0) {
				return;
			}
			this.info.data.camera = "tracker";
			console.log(this.info)
			this.netHandler.execute('videoStream',this.info);
		};
	},

	//these fucntions are for manual button control if the intrface does not work(Priyank's work goes here) . 
	upClick: function(event) {

		this.setState({ 
			count:this.state.count +1
		});
	},

	downClick: function(event){ 
		this.setState({
			count:this.state.count -1
		});
	},

	left: function() {
	},

	right: function() {
	},

	centerCam: function() {
	},

	handleTest: function(event) {
		alert("HELLO");
	}, 	

});

export var route = {
	name: "Old Tracker",  
	link: "#/OldCamera",
};


/* Export our newly created page so that the world can see it! */
export default TestPage;

