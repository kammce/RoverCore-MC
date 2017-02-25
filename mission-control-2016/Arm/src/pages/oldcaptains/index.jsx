import NetHandler from "../../network/NetHandler.jsx";
import ProgressBar from '../../components/ProgressBar.jsx';
import Slider from '../../components/Slider.jsx';
import Toggle from '../../components/Toggle.jsx';



var HomePage = React.createClass({

	/* Create our Model */
	getInitialState: function() {
		return {
			temperature: 40,
			clientangle2: 40,
			clientbaseangle: 40,
			clienthandangle: 40,
			temperature: 0,
			base: 0,
			shld: 0,
			elbow: 0,
			wrist: 0,
			wifi: 0,
			moisture: 0,
			reaction: false,
			checked: true,
			'Temperature Readings': {
				value: {
					'Temperature1': 0
				}
			}
		};
	},

	/* Render our View */
	render: function() {
		var bar1 = "inline-block";
		var bar2 = "inline-block";
		var bar3 = "inline-block";
		var bar4 = "inline-block";
		var bar5 = "inline-block";

		if (this.state.wifi < 10) {
			bar1 = "none";
		}
		if (this.state.wifi < 20) {
			bar2 = "none";
		}
		if (this.state.wifi < 40) {
			bar3 = "none";
		}
		if (this.state.wifi < 80) {
			bar4 = "none";
		}
		if (this.state.wifi < 100) {
			bar5 = "none";
		}

		var image;
		if (this.state.checked) {
			image = <img src='images/checked-checkbox-512.png' style = {{width: "90px", height: "90px"}}/>
		}

		if (!this.state.checked) {
			image = <img src='images/cross_out_clip_art.jpg' style = {{width: "60px", height: "60px"}}/> 
		}

		return (
			<div>
				<h1>CAPTAINS PAGE</h1>
				<br />
					<div className="row">
	  				<div className="col-md-3">Temperature: {this.state['Temperature Readings'].value.Temperature1}°C</div>
	  				<div className="col-md-3">Base: {this.state.base}</div>
	  				<div className="col-md-3">Shld: {this.state.shld}</div>
					<div className="col-md-3">Elbow: {this.state.elbow}</div>
				</div>
				<div className = "row">
					<div className = "col-md-4"><h3>Bacteria Gauge</h3></div>
					<div className = "col-md-4"><h3>Signal Strength</h3></div>
					<div className = "col-md-4"><h3>Data Information</h3></div>
				</div>

				<div className = 'row'>
					<div className="col-md-4">
						<div ref="bacteria"></div>
					</div>						
					<div className="col-md-4">
						<div style={{backgroundColor: "white", width: "20px", height: "20px", margin: '5px', display: bar1}}></div>
						<div style={{backgroundColor: "white", width: "20px", height: "40px", margin: '5px', display: bar2}}></div>
						<div style={{backgroundColor: "white", width: "20px", height: "60px", margin: '5px', display: bar3}}></div>
						<div style={{backgroundColor: "white", width: "20px", height: "80px", margin: '5px', display: bar4}}></div>
						<div style={{backgroundColor: "white", width: "20px", height: "100px", margin: '5px', display: bar5}}></div>
						<div style={{width: "20px", height: "120px", display: "inline-block"}}></div>
					</div>
					<div className="col-md-4">{image}</div>
				</div>

				<div className = "row">
					<div className = "col-md-4"><h2>Temperature</h2><ProgressBar progress = {this.state.temperature}/><Slider min="0" max="100" initialValue={this.state.temperature} onChange={this.onSliderChange1}/></div>
					<div className = "col-md-4"><h2>Wifi</h2><ProgressBar progress = {this.state.wifi}/><Slider min="0" max="100" initialValue={this.state.wifi} onChange={this.onSliderChange2}/></div>
					<div className = "col-md-4"><h2>Moisture</h2><ProgressBar progress = {this.state.moisture}/><Slider min="0" max="100" initialValue={this.state.moisture} onChange={this.onSliderChange3}/></div>
				</div>

				<div className="row">
					<div className="col-md-3"><button type="button" className="btn btn-success" onClick={this.onKillClick}>(Force) Kill all Feeds</button></div>
					<div className="col-md-3"><button type="button" className="btn btn-success" onClick={this.onRestartCamClick}>Restart Cameras</button></div>
					<div className="col-md-3"><button type="button" className="btn btn-success" onClick={this.onHenryClick}>Who is Henrys Valentine?</button></div>
					<div className="col-md-3"><button type="button" className="btn btn-success" onClick={this.onRestartRovClick}>Restart Rovercore</button></div>
				</div>

				<br />

				<div className="row">
				<div className="col-xs-12">
				<div className="dropdown">
					<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					    Video Feeds
					    <span className="caret"></span>
					 </button>
					  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
					    <li><a href="#">Front Camera</a></li>
					    <li><a href="#">Rear Camera</a></li>
					    <li><a href="#">Side Camera</a></li>
					  </ul>
					</div>
					</div>
					</div>

					<br />

					<div className="dropdown">
					<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					    Audio Feeds
					    <span className="caret"></span>
					 </button>
					  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
					    <li><a href="#">Audio Control Stuff</a></li>
					    <li><a href="#">Words</a></li>
					    <li><a href="#">Henry or Khalil who is kewler</a></li>
					  </ul>
					</div>


			</div>
		)
	},

	componentDidMount: function() {
		// setInterval(() => {
		// 	this.setState({
		// 		temperature: (new Date()).getTime() % 100,
		// 		base: (new Date()).getTime() * 10 % 100,
		// 		shld: (new Date()).getTime() * 20 % 100,
		// 		elbow: (new Date()).getTime() * 30 % 100,
		// 		wrist: (new Date()).getTime() * 40 % 100
		// 	})
		// 		$(this.refs.bacteria).kumaGauge('update',{
		// 		value : Math.floor((Math.random() * 99) + 1),
		// 	});

		// }, 100);

		this.netHandler = new NetHandler("CAPTAINS");
		this.netHandler.listen((changes) => {
			this.setState(changes);
			console.log(changes);
		});



			$(this.refs.bacteria).kumaGauge({
				value : Math.floor((Math.random() * 99) + 1),
				// The radius of the arc
					radius : 80, 

					// The padding on the top and bottom of the gauge
					paddingX : 40, 

					// The padding on the left and right of the gauge
					paddingY : 40,  

					// The width of the gauge itseld
					gaugeWidth : 30, 

					// The fill of the gauge, this can be a solid color or a gradient
					fill : '0-#1cb42f:0-#fdbe37:50-#fa4133:100', 

					// The fill of the gauge background, this can be a solid color or a gradient
					gaugeBackground : '#f4f4f4', 

					// The fill of the canvas, this can be a solid color or a gradient
					background : '#000', 

					// Show or hide the needle, 
					// if true the value label shows half of the range
					// if false the value label shows the value
					showNeedle : true, 

					// The speed of the animation in miliseconds
					animationSpeed : 500, 

					// The minimum value of the gauge
					min : 0,

					// The maximum value of the gauge
					max : 100, 

					// The actual value of the gauge
					value : 80, 

					// The label that indicates the value
					valueLabel : {

					  // show or hide this label
					  display : true, 

					  // The font family of this label
					  fontFamily : 'Arial', 

					  // The font color of this label
					  fontColor : '#fff', 

					  // Integer of The font size of this label (without px)
					  fontSize : 20, 

					  // The font weight of this label
					  fontWeight : 'normal' 
					},

					title : {

					  // show or hide this label
					  display : true, 

					  // String the value of the title
					  value : '', 

					  // The font family of this label
					  fontFamily : 'Arial', 

					  // The font color of this label
					  fontColor : '#fff', 

					  // Integer of The font size of this label (without px)
					  fontSize : 20, 

					   // The font weight of this label
					  fontWeight : 'normal'
					},
					label : {

					  // show or hide this label
					  display : true, 

					  // The value of the left (minimum) label
					  left : 'Low', 

					  // The value of the right (maximum) label
					  right : 'High',

					  // The font family of this label
					  fontFamily : 'Arial', 

					  // The font color of this label
					  fontColor : '#fff', 

					  // Integer of The font size of this label (without px)
					  fontSize : 12, 

					  // The font weight of this label
					  fontWeight : 'normal' 
					}
			});

		},

		

	onGripClick: function(event) {
		//console.log
		alert("Welcome to IT how may I help you");
		},

		onHenryClick: function(event) {
			//console.log
			alert("Khalil ;) ");
			},
	/* Controller Functions */
	onSliderChange1: function(value) {
		this.setState({
			temperature: value.newValue
		});
	},

	onSliderChange2: function(value) {
		this.setState({
			wifi: value.newValue
		});
	},

	onSliderChange3: function(value) {
		this.setState({
			moisture: value.newValue
		});
	},

});

export var route = {
	name: "Old Captain Page",
	link: "#/OldCaptain"
};

/* Export our newly created page so that the world can see it! */
export default HomePage;
