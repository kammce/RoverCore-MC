
/* under components folder */

import KnobButton from '../../components/KnobButton.jsx';
import ProgressBar from '../../components/ProgressBar.jsx'; 
import VerticalSlider from '../../components/VerticalSlider.jsx';
import Slider from '../../components/Slider.jsx';
import Toggle from '../../components/Toggle.jsx';

import RoverViewer from './RoverViewer.jsx';

import NetHandler from "../../network/NetHandler.jsx";

console.log(RoverViewer);

function clamp(val, min, max) {
	return Math.max(Math.min(val, max), min);
}

//not sure what btn_width is 
var btn_width = {
	width: "12%",
	marginLeft: ".5%",
	marginRight: ".5%"
}

var HomePage = React.createClass({

	/* Create our Model */
	getInitialState: function() {
		return {
			x: 50, y: -50, z: 50,
			progress: 40,
			//base to elbow length is length1
			length1: 40,
			//elbow to wrist is length2
			length2: 40,
			angle1: Math.PI/4,
			angle2: Math.PI,
			angle3: Math.PI/2,
			angle4: Math.PI/2,

			/* Angles for Udit's Manual Control */
			manAngle1: 90,
			manAngle2: 90,
			manAngle3: 90,
			manAngle4: 0,

			handAngle: 0,
			rollAngle: 180,
			clawForce: 999,
			goalAngle1: 0,
			goalAngle2: 0,
			goalAngle3: 0,
			lerp: 50,
			method: 0,
		};
	},
	
	_handleKey:function(event){
        //console.log(event);
        const UP = 40;
        const DOWN = 38;
        const RIGHT = 39;
        const LEFT = 37;
        const MOVE = 10;
        const CTRL = 17;
        const ALT = 18;
        switch(event.keyCode) {
	        case UP:
		        if(this.state.handAngle+MOVE >= 90) {
					this.setState({ handAngle: 90 });
	        	} else {
		        	this.setState({ handAngle: this.state.handAngle+MOVE});
	        	}
	        	console.log(this.state.handAngle);
	        	break;
	        case DOWN:
		        if(this.state.handAngle-MOVE <= -90) {
		        	this.setState({ handAngle: -90});
	        	} else {
		        	this.setState({ handAngle: this.state.handAngle-MOVE});
	        	}
	        	console.log(this.state.handAngle);
	        	break;
	        case RIGHT:
		        if(this.state.rollAngle+MOVE >= 360) {
		        	this.state.rollAngle = 360;
	        	} else {
		        	this.state.rollAngle += MOVE;
	        	}
	        	console.log(this.state.rollAngle);
	        	break;
	        case LEFT:
		        if(this.state.rollAngle-MOVE <= 0) {
		        	this.state.rollAngle = 0;
	        	} else {
		        	this.state.rollAngle -= MOVE;
	        	}
	        	console.log(this.state.rollAngle);
	        	break;
	        case CTRL:
	        	// GRAB SOMETHING
		        this.state.clawForce = 0;
	        	console.log(this.state.clawForce);
	        	break;
	        case ALT:
	        	// GRAB SOMETHING
		        this.state.clawForce = 999;
	        	console.log(this.state.clawForce);
	        	break;
	        default:
		        console.log("invalid keyinput ", event.keyCode);
	        	break;
        }
   },

	componentWillMount:function(){
		//HomePage.addChangeListener(this._onchange);
		document.addEventListener("keyup", this._handleKey, false);
	},

	/* Render our View */
	render: function() {
		return (
			
			/*
			##########################
			MANUAL CONTROL OFF SECTION
			##########################
			*/

			<div>

				<div className="row">
					<div className="col-xs-12">
						<div id="mainscreen">
							<div id="cameraview">
							{/*insert camera feed here 
							it's just an image tag - the stream page from last year is irrelevant
							*/}
							</div>
							<div id="threedeeviewerfront">
								<RoverViewer
									pos={{x: this.state.x, y: this.state.y, z: this.state.z}}
									length1={this.state.length1}
									length2={this.state.length2}
									ang1={this.state.angle1}
									ang2={this.state.angle2}
									ang3={this.state.angle3}
									ang4={this.state.angle4}
									onChange={this.onTranslateGoal}
									orbit="true"
									cameraPos={{x: 0, y: 0, z: 100}}
									cameraRot={{x: 0, y: 0, z: 0}}
									/>
							</div>
						</div>
					</div>
				</div>
				
				{/* add JS for buttons according to onClick references */}	
				<div id="mancontroloffsec">
					<div className="row" id="toprow">
		  				<div className="col-md-1" id="mancontrolbutton">
		  					&nbsp; <Toggle onChange={this.onToggleManualControl}/>
						</div>
		  				<div className="col-md-4" id="mancontroloff"><b>CAMERA: </b>
							<button type="button" className="btn btn-xs" onClick={this.onClawCamClick}>Claw</button>&nbsp;
							<button type="button" className="btn btn-xs" onClick={this.onElbowCamClick}>Elbow</button>&nbsp;
							<button type="button" className="btn btn-xs" onClick={this.onBaseCamClick}>Base</button>&nbsp;
		  				</div>
		  				<div className="col-md-3" id="mancontroloff"><b>3D: </b>
							<button type="button" className="btn btn-xs" onClick={this.onTop3DClick}>Top</button>&nbsp;
							<button type="button" className="btn btn-xs" onClick={this.onFront3DClick}>Front</button>&nbsp;
							<button type="button" className="btn btn-xs" onClick={this.onSide3Dlick}>Side</button>&nbsp;
						</div>
						<div className="col-md-1" id="clawclaw"><b>CLAW: </b>
				        {this.state.clawForce < 300 ? "YA" : "NAH"}
				        	{/* change claw force to parameter for this arm */}
							{/* OLD
							({this.state.gripped}) &nbsp; ({this.state.notgripped})
							*/}
						</div>
						<div className="col-md-2" id="clawclaw1"><b>Weight: </b>
							{this.state.weight}g
						</div>
						<div className="col-md-1" id="rovercon1"><b>Connected?</b>
						</div>
					</div>
					<div className="row" id="bottomrow">
		  				<div className="col-md-4" id="mancontroloff"><b>ROTATION: </b>
		  					BASE &nbsp; {this.state.base} &deg; &nbsp;
		  					WRIST &nbsp; {this.state.rollAngle} &deg; &nbsp;
		  						{/*changed from this.state.wrist to this.state.rollAngle
		  						because the nav page defined the controllable wrist roll angle as this.state.rollAngle
		  						Make sure this is reflected throughout this index page and that it doesn't conflict with Roverviewer*/}
		  				</div>
		  				<div className="col-md-4" id="mancontroloff"><b>PITCH: </b>
		  					SHOULDER &nbsp; {this.state.shld} &deg; &nbsp;
		  					ELBOW &nbsp; {this.state.elbow} &deg; &nbsp;
		  					WRIST &nbsp; {this.state.handAngle} &deg; &nbsp; 
		  						{/*changed from this.state.wrist to this.state.handAngle 
		  						because the nav page defined the controllable wrist pitch angle as this.state.handAngle
		  						Make sure this is reflected throughout this index page and that it doesn't conflict with Roverviewer*/}
		  				</div>
						<div className="col-md-3" id="clawclawclaw1">
							<b>PITCH / ClawForce?</b> &nbsp; {this.state.clawForce} &deg; &nbsp;
								{/*changed from this.state.clawpitch to this.state.clawForce 
		  						because the nav page defined the controllable claw pitch angle as this.state.clawForce
		  						Make sure this is reflected throughout this index page and that it doesn't conflict with Roverviewer*/}
							<b>TORQUE</b> &nbsp; {this.state.torque} n m &nbsp;
						</div>
						<div className="col-md-1" id="rovercon2">
						   {this.state.roverOnline ? "YES": "NO!!" }
						</div>
					</div>
					
					{/* 
					##############
					old code for reference
					<div className="row">
		  				<div className="col-md-2">Temperature: {this.state.temperature}</div>
		  				<div className="col-md-2">Base: {this.state.base}</div>
		  				<div className="col-md-2">Shld: {this.state.shld}</div>
						<div className="col-md-2">Elbow: {this.state.elbow}</div>
						<div className="col-md-2">Wrist: {this.state.temperature}</div>
					</div>
					###################
					*/}
					
				</div>

{/* ==============

Begin mancontrolon

===================*/}

				<div className="row" id="mancontrolon">
					<div ref="manualControl" style={{display: 'inline'}}>
						<div className="col-xs-4" id="controlsection">
							<h5 id="yup">ROTATION CONTROL</h5>
								<text>Base</text> &nbsp;
									<input id = "maninput3" ref = "manAngle3" onChange={this.onSliderChange3}></input> &nbsp;
									<button type="button" className="btn btn-xs" onClick={this.onBaseResetClick}>RESET</button>
									<Slider ref="manAngle3" min="0" max="180" initialValue={90} onChange={this.onSliderChange3}/>
								
								<text>WRIST</text>
						            <Slider initialValue={this.state.rollAngle} min="0" max="360" hideTooltip="true" onChange={this.onRollAngleChange}/>
						</div>
						<div className="col-xs-4" id="controlsection">
							<h5 id="yup">PITCH CONTROL</h5>
								<text>Shoulder</text> &nbsp;
									<input id = "maninput1" ref = "manAngle1" onChange={this.onSliderChange1}></input> &nbsp;
									<button type="button" className="btn btn-xs" onClick={this.onShldResetClick}>RESET</button>
									<Slider ref="manAngle1" min="0" max="180" initialValue={90} onChange={this.onSliderChange1}/>
								<text>Elbow</text> &nbsp;
									<input id = "maninput2" ref = "manAngle2" onChange={this.onSliderChange2}></input> &nbsp;
									<button type="button" className="btn btn-xs" onClick={this.onElbowResetClick}>RESET</button>
									<Slider ref="manAngle2" min="0" max="180" initialValue={90} onChange={this.onSliderChange2}/>
								<text>Wrist</text> &nbsp;
									<input id = "maninput4" ref = "manAngle4" onChange={this.onSliderChange4}></input> &nbsp;
									<button type="button" className="btn btn-xs" onClick={this.onWristResetClick}>RESET</button>
									<Slider ref="manAngle4" min="0" max="180" initialValue={0} onChange={this.onSliderChange4}/>

								<text>WRIST</text>
							 	    <Slider initialValue={this.state.handAngle} min="-90" max="90" hideTooltip="true" onChange={this.onHandAngleChange}/>
							 	    	{/*first slider is able to control the 3d model, but the second slider was able to control the actual arm 
							 	    	and its value is reflected in the mancontroloff section (0)
							 	    	WHEN TURNING MANCONTROL OFF, THE VALUE FOR THIS SLIDER IS REFLECTED IN THE 3D MODEL...
							 	    		SO IT'S NOT COMPLETELY UNABLE TO CONTROL THE 3DVIEWER*/}
						</div>
						<div className="col-xs-4" id="controlsection">
							<h5 id = "yup">CLAW CONTROL</h5>
								<div id = "yupyup">
					                <text>CLAW</text>
					                <Slider initialValue={this.state.clawForce} min="0" max="999" hideTooltip="true" onChange={this.onClawChange}/>
					                	{/*
					                	this slider changes the claw pitch.. although it's units are not in degrees... 
					                		it doesn't change the 3d viewer at all because there's no claw shown in the 3d model 
					                	*/}
					                <p><b><text>PRE-SET POSITIONS</text></b></p>
					                <p>
									<button type="button" className="btn btn-success" onClick={this.onGripClick}>Grip</button>&nbsp;
									<button type="button" className="btn btn-success" onClick={this.onReleaseClick}>Release</button>&nbsp;
									<button type="button" className="btn btn-success" onClick={this.onDeployClick}>Deploy</button>&nbsp;
									<button type="button" className="btn btn-success" onClick={this.onRetrieveClick}>Retrieve</button>&nbsp;
									</p>
								</div>
						</div>
					</div>
				</div>

{/*
        <div className="row">
          <div className="col-xs-4">
            <p> Wrist Pitch Angle </p>
            <Slider initialValue={this.state.handAngle} min="-90" max="90" hideTooltip="true" onChange={this.onHandAngleChange}/>
          </div>
          <div className="col-xs-4">
            <p> Wrist Roll Angle </p>
            <Slider initialValue={this.state.rollAngle} min="0" max="360" hideTooltip="true" onChange={this.onRollAngleChange}/>
          </div>
          <div className="col-xs-4">
            <p> Wrist Claw Position </p>
            <Slider initialValue={this.state.clawForce} min="0" max="999" hideTooltip="true" onChange={this.onClawChange}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2">
            <button onClick={this.methodEvent} method="-3" className="btn btn-default btn-block">Left Roll High Speed</button>
          </div>
          <div className="col-xs-1">
            <button onClick={this.methodEvent} method="-2" className="btn btn-default btn-block">Left Roll</button>
          </div>
          <div className="col-xs-1">
            <button onClick={this.methodEvent} method="-1" className="btn btn-default btn-block">Left Roll Slow</button>
          </div>
          <div className="col-xs-2">
            <button onClick={this.methodEvent} method="0" className="btn btn-default btn-block">Pitch Only</button>
          </div>
          <div className="col-xs-1">
            <button onClick={this.methodEvent} method="1" className="btn btn-default btn-block">Right Roll Slow</button>
          </div>
          <div className="col-xs-1">
            <button onClick={this.methodEvent} method="2" className="btn btn-default btn-block">Right Roll</button>
          </div>
          <div className="col-xs-2">
            <button onClick={this.methodEvent} method="3" className="btn btn-default btn-block">Right Roll High Speed</button>
          </div>
          <div className="col-xs-2">
            <button onClick={this.methodEvent} method="4" className="btn btn-default btn-block">Roll Only</button>
          </div>
       	</div>

       	<br />

        <div className="row">
          <div className="col-xs-2">
            <button onClick={this.methodEvent} method="5" className="btn btn-default btn-block">Servos Off</button>
          </div>
          <div className="col-xs-2">
            <button onClick={this.methodEvent} method="6" className="btn btn-warning btn-block">50% Power</button>
          </div>
          <div className="col-xs-2">
            <button onClick={this.methodEvent} method="7" className="btn btn-success btn-block">100% Power</button>
          </div>
		</div>

*/}		
		</div>

		)
	},

	toggleManual: function(enabled) {
		if (enabled) {
			this.refs.manualControl.style.color = "inherit";
			this.refs.manualControl.style.opacity = 1;
			this.refs.manualControl.style.pointerEvents = "auto";
			this.refs.manualControl.style.display = "block";
		} else {
			this.refs.manualControl.style.display = "none";
		}
	},

	onToggleManualControl: function(e) {
		this.toggleManual(e.newValue);
		this.setState({
			manualControl: e.newValue
		})
	},

	/* Udit Manual Controls */

	onSliderChange1: function(value) {
		this.setState({
			manAngle1: value.newValue * Math.PI / 180
		});
	},

	onSliderChange2: function(value) {
		this.setState({
			manAngle2: value.newValue * Math.PI / 180
		});
	},

	onSliderChange3: function(value) {
		this.setState({
			manAngle3: value.newValue * Math.PI / 180
		});
	},

	onSliderChange4: function(value) {
		this.setState({
			manAngle4: value.newValue * Math.PI / 180
		});
	},

	/* Controller Functions */
	onTranslateGoal: function(x, y, z) {
		this.setState({
			x: x,
			y: y,
			z: z
		})
	},
	
	methodEvent: function(button) {
		this.setState({ 
			method: parseInt(button.target.attributes.method.nodeValue)
		});
	},

	onXSlideChange: function(value) {
		this.setState({
			x: value.newValue
		});
	},


	onYSlideChange: function(value) {
		this.setState({
			y: value.newValue
		});
	},


	onZSlideChange: function(value) {
		this.setState({
			z: value.newValue
		});
	},

	onSliderChange: function(value) {
		this.setState({
			progress: value.newValue
		});
	},

	onLerpChange: function(value) {
		this.setState({
			lerp: value.newValue
		})
	},

	onHandAngleChange: function(value) {
		this.setState({
			handAngle: value.newValue
		})
	},
	onRollAngleChange: function(value) {
		console.log(value);
		this.setState({
			rollAngle: value.newValue
		})
	},
	onClawChange: function(value) {
		console.log(value);
		this.setState({
			clawForce: value.newValue
		})
	},

	moveMouse: function(event) {
		// var canvas = this.refs.canvas;
		// var rect = canvas.getBoundingClientRect();
		// this.move(event.clientX - rect.left, event.clientY - rect.top);
	},

	componentDidUpdate: function() {

	},

	calculateIK: function(x, y, z) {

		/*    b    _.'gamma
			    _.'  |\ a
			_.'      | \
		alpha------------*-beta
			            P1
			      c
			
		*/

		// motor1Angle = angle of motor 1
		// gamma = angle of motor 2

		var length1 = this.state.length1;
		var length2 = this.state.length2;

		var a = length2;
		var b = length1;
		var c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

		var alpha = Math.acos((b*b + c*c - a*a)/(2*b*c));
		var gamma = Math.acos((a*a + b*b - c*c)/(2*a*b));

		var delta = Math.atan2(y, x);

		if (c >= (a+b)) {
			alpha = 0;
			gamma = Math.PI;
			// delta = 0;
		}

		// gamma = clamp(gamma, Math.PI/4, Math.PI);

		var gammaPrime = Math.PI - gamma;

		var motor1Angle = alpha - delta;

		// motor1Angle = clamp(motor1Angle, -Math.PI/4, Math.PI * (3/4));
		alpha = motor1Angle + delta;

		return { angle1: motor1Angle, angle2: gamma };
	},

	componentDidMount: function() {
	
		this.toggleManual(false);

		this.netHandler = new NetHandler("ARM");
		this.netHandler.listen((changes) => {
			// this.setState(changes);
			// console.log(changes)
		});

		if (typeof Leap != "undefined") {
	 		this.leapController = Leap.loop({}, (frame) => {
				if (frame.hands[0]) {
					// console.log(frame.hands[0].palmPosition);
					var pos = frame.hands[0].palmPosition;
					this.setState({
						x: -pos[2]/2 + 50,
						y: -pos[1]/2 + 50,
						z: pos[0]/2
					})
				}
			});
	 	}

		this.oldAngle1 = 0;
		this.oldAngle2 = 0;
		this.oldAngle3 = 0;
		this.oldAngle4 = 0;


		this.lerper = setInterval(() => {
			var baseAngle = Math.atan2(this.state.x, this.state.z) || 0;
			var length = Math.sqrt(Math.pow(this.state.x, 2) + Math.pow(this.state.z, 2));

			//baseAngle = clamp(baseAngle, 0, Math.PI);

			console.log(baseAngle);
			var y = this.state.y;

			if (baseAngle < 0) {
				baseAngle = Math.PI+baseAngle;
				// baseAngle = -baseAngle;
				length = -length;
			}

			var curAngle1 = this.state.angle1 || 0;
			var curAngle2 = this.state.angle2 || 0;
			var curAngle3 = this.state.angle3 || 0;

			var handAngle = (Math.PI-curAngle1) - curAngle2 - this.state.handAngle/180 * Math.PI;

			var angles;

			if (this.state.manualControl) {
				angles = {
					angle1: this.state.manAngle1,
					angle2: this.state.manAngle2,
					angle3: this.state.manAngle3,
					angle4: this.state.manAngle4
				}

				baseAngle = this.state.manAngle3;
				handAngle = this.state.manAngle4;
			} else {
				angles = this.calculateIK(length, this.state.y);
			}

			var newState = {
				angle1: curAngle1 + ((angles.angle1 || this.state.goalAngle1 || 0) - curAngle1) * this.state.lerp / 100,
				angle2: curAngle2 + ((angles.angle2 || this.state.goalAngle2 || 0) - curAngle2) * this.state.lerp / 100,
				angle3: curAngle3 + ((baseAngle || this.state.goalAngle3 || 0) - curAngle3) * this.state.lerp / 100,
				angle4: handAngle,
				angle5: 0,
				goalAngle1: (angles.angle1 || this.state.goalAngle1 || 0),
				goalAngle2: (angles.angle2 || this.state.goalAngle2 || 0),
				goalAngle3: (baseAngle || this.state.goalAngle3 || 0),
			};

			if (
				Math.abs(newState.angle1 - this.oldAngle1) < 0.01 &&
				Math.abs(newState.angle2 - this.oldAngle2) < 0.01 &&
				Math.abs(newState.angle3 - this.oldAngle3) < 0.01 &&
				Math.abs(newState.angle4 - this.oldAngle4) < 0.01
			) {
				return;
			}

			this.oldAngle1 = newState.angle1;
			this.oldAngle2 = newState.angle2;
			this.oldAngle3 = newState.angle3;
			this.oldAngle4 = newState.angle4;

			this.setState(newState);

			if (!this.state.manualControl) {
				this.refs.manAngle1.setVal(Math.floor(this.state.angle1 / Math.PI * 180));
				this.refs.manAngle2.setVal(Math.floor(this.state.angle2 / Math.PI * 180));
				this.refs.manAngle3.setVal(Math.floor(this.state.angle3 / Math.PI * 180));
				this.refs.manAngle4.setVal(Math.floor(this.state.angle4 / Math.PI * 180));

				this.setState({
					manAngle1: this.state.angle1,
					manAngle2: this.state.angle2,
					manAngle3: this.state.angle3,
					manAngle4: this.state.angle4
				});
			}

		}, 100);

		this.sendState = setInterval(() => {
			this.netHandler.execute("Arm", {
				"rotonda": Math.floor(this.state.angle3 / Math.PI * 360),
				"base": Math.floor(this.state.angle1 / Math.PI * 360),
				"elbow": Math.floor(this.state.angle2 / Math.PI * 360),
				"pitch": this.state.handAngle,
				"method": this.state.method,
				"roll": this.state.rollAngle,
				"claw": this.state.clawForce,
				"laser": 1,
			});
		}, 100);
	},

	componentWillUnmount: function() {
		document.removeEventListener("keyup", this._handleKey, false);
		clearInterval(this.lerper);
		clearInterval(this.sendState);
		
		if (this.leapController)
			this.leapController.disconnect();
	}

});

export var route = {
	name: "Old Arm",
	link: "#/OldArm"
};

/* Export our newly created page so that the world can see it! */
export default HomePage;
