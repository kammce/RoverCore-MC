/* originally the "navigation" page but converted to Arm And Claw page*/

import KnobButton from '../../components/KnobButton.jsx';
import ProgressBar from '../../components/ProgressBar.jsx';
import Slider from '../../components/Slider.jsx';
import Toggle from '../../components/Toggle.jsx';
import NetHandler from "../../network/NetHandler.jsx";


/*import RoverViewer from './RoverViewer.jsx'; */


/*keydown stuff from http://stackoverflow.com/questions/28102746/how-to-trigger-keypress-event-in-react-js*/

/*@
change NetHandler("navi") and NetHandler("Arm") --> NetHandler("ArmAndClaw")
and reflect in dummynetwork.jsx
*/

 /*@ BEGIN MIMIC BUTTONS/AXES 
    button0: ClawChange value set to 1 (Claw Open)
    button1: ClawChange value set to 0 (Claw Close)
    button2: ALL ARM COMPONENTS AFFECTED (Drop POD)
    button3: ALL ARM COMPONENTS AFFECTED (Retrieve POD)
    button4: ALL ARM COMPONENTS AFFECTED (Touch ground)
    button5: ALL ARM COMPONENTS AFFECTED (Reach Towards Back of Chassis)
    button6: ALL ARM COMPONENTS AFFECTED(Reach Forward AKA Safety/Reset Position)

    axis0: AxisX (Rotunda)
    axis1: AxisY (Shoulder)
    axis2: AxisZ (Elbow)
    axis4: SliderLeft (Wrist_Pitch)
    axis5: SliderRight (Wrist_Roll)
    axis3: ZRotate (Torque/Claw)

    buttons to reconsider/delete:
      - roll only
      - pitch only
      - L, L FAST, L SLOW
      - R, R FAST, R SLOW
      - SERVOS OFF, 50% POWER, 100% POWER
    END */


var HomePage = React.createClass({

  componentDidMount: function() {

  var gamepadInfo = document.getElementById("gamepad-info");
  var ball = document.getElementById("ball");
  var start;
  var a = 0;
  var b = 0;
  var rAF = window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.requestAnimationFrame;
  var rAFStop = window.mozCancelRequestAnimationFrame ||
   window.webkitCancelRequestAnimationFrame ||
   window.cancelRequestAnimationFrame;

  window.addEventListener("gamepadconnected", function() {
  var gp = navigator.getGamepads()[0];
  gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
        document.getElementById("gamepad-info").innerHTML = "MIMIC: On";

  gameLoop();
  });

  window.addEventListener("gamepaddisconnected", function() {
    gamepadInfo.innerHTML = "Waiting for gamepad.";
    rAFStop(start);
    document.getElementById("gamepad-info").innerHTML = "MIMIC: Off";

  });

  if(!('GamepadEvent' in window)) {
    // No gamepad events available, poll instead.
    var interval = setInterval(pollGamepads, 500);
  }

  function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if(gp) {
      gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
      gameLoop();
      clearInterval(interval);
    }
  }
  }

  function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
  }

  function gameLoop() {

    var midBit = 512; 

function controllerToBit(x)
{

  var bit
    if(x == -1)
    {
      bit = 0;
    }
    else
    {
      bit = ((x+1)*midBit) -1;
  }
    
    bit = Math.round(bit);

    return bit;

}

function posBitToDegree(x)
{
  
  var decimal

  if(x == 0)
  {
    decimal =0;
  }

  else
  {
     decimal = ((x + 1)/midBit);
  }
  
  var degree = decimal*180;

  degree = Math.round(degree);

  return degree;
  


}

function posNegBitToDegree(x)
{
  var decimal;
  if(x == 0)
  {
    decimal =-1;
  }

  else 
  {
    decimal = ((x + 1)/midBit) - 1;
  }

  var degree = decimal*360;

  degree = Math.round(degree);

  return degree;
}

  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads)
    return;
  var gp = gamepads[0];

  if (buttonPressed(gp.buttons[0])) {
    document.getElementById("buttonDisplay").innerHTML = "0: Open Claw";

  } 

  if (buttonPressed(gp.buttons[1])) {
    document.getElementById("buttonDisplay").innerHTML = "1: Close Claw";


  } 
  if (buttonPressed(gp.buttons[2])) {
    document.getElementById("buttonDisplay").innerHTML = "2: Drop POD";


  } 
  if (buttonPressed(gp.buttons[3])) {
    document.getElementById("buttonDisplay").innerHTML = "3: Retrieve POD";


  } 
  if (buttonPressed(gp.buttons[4])) {
    document.getElementById("buttonDisplay").innerHTML = "4: Touch Ground";

  } 
  if (buttonPressed(gp.buttons[5])) {
    document.getElementById("buttonDisplay").innerHTML = "5: Reach Behind";

  } 
  if (buttonPressed(gp.buttons[6])) {
    document.getElementById("buttonDisplay").innerHTML = "6: Reach Forward";

  } 

  if(gp.axes[0] != 0) {

     var baseRotationBit = controllerToBit(gp.axes[0]);
     var baseRotationDegree = posNegBitToDegree(baseRotationBit);
     document.getElementById("analog1").innerHTML = baseRotationDegree;
  } 

  if(gp.axes[1] != 0) {
    var shoulderPitchBit = controllerToBit(gp.axes[1]);
     var shoulderPitchDegree = posBitToDegree(shoulderPitchBit);
     document.getElementById("analog2").innerHTML = shoulderPitchDegree;
  } 

  if(gp.axes[2] != 0) {
      var elbowPitchBit = controllerToBit(gp.axes[2]);
     var elbowPitchDegree = posBitToDegree(elbowPitchBit);
     document.getElementById("analog3").innerHTML = elbowPitchDegree;
  } 

  if(gp.axes[3] != 0) {
      var torqueBit = controllerToBit(gp.axes[3]);
     var torqueDegree = posBitToDegree(torqueBit);
     document.getElementById("analog4").innerHTML = torqueDegree;
  } 
  

  if(gp.axes[4] != 0) {
      var wristPitchBit = controllerToBit(gp.axes[4]);
     var wristPitchDegree = posBitToDegree(wristPitchBit);
     document.getElementById("analog5").innerHTML = wristPitchDegree;
  } 


  if(gp.axes[5] != 0) {
     var wristRotationBit = controllerToBit(gp.axes[5]);
     var wristRotationDegree = posNegBitToDegree(wristRotationBit);
     document.getElementById("analog6").innerHTML = wristRotationDegree;
  } 
  

  ball.style.left = a*2 + "px";
  ball.style.top = b*2 + "px";
  var start = rAF(gameLoop);



    }

  },

  componentWillMount:function() {
    this.netHandler = new NetHandler("navi");
    this.netHandler.listen((changes) => {
      this.setState(changes);
      console.log(changes);
      // console.log(this.state);
    })
    // console.log(this.netHandler);
    document.addEventListener("keyup", this._handleKey, false);
    this.sendState = setInterval(() => {
      this.netHandler.execute("Arm", {
        "Rotunda": this.state.Rotunda,
        "Shoulder": this.state.Shoulder,
        "Elbow": this.state.Elbow,
        "Wrist_Pitch": this.state.Wrist_Pitch,
        "Wrist_Roll": this.state.Wrist_Roll,
        "Claw": this.state.Claw,
        "method": this.state.method,

      });

      if (this.state.method == 0) {
        this.setState({
          buttonDisplay: '0: Open Claw'
        })
      } else if (this.state.method == 1) {
        this.setState({
          buttonDisplay: '1: Close Claw'
        })
      } else if (this.state.method == 2) {
        this.setState({
          buttonDisplay: '2: Deploy POD'
        })
      } else if (this.state.method == 3) {
        this.setState({
          buttonDisplay: '3: Retrieve POD'
        })
      } else if (this.state.method == 4) {
        this.setState({
          buttonDisplay: '4: Touch Ground'
        })
      } else if (this.state.method == 5) {
        this.setState({
          buttonDisplay: '5: Reach Behind'
        })
      } else if (this.state.method == 6) {
        this.setState({
          buttonDisplay: '6: Reach Forward'
        })
      }

    }, 100);
  },

  componentWillUnmount: function() {
      this.netHandler.close();
      clearInterval(this.sendState);
  },
  

  /* Create our Model */
  getInitialState: function() {
    return {
      manualControl: false, //@ for some reason, even though initial state is off/false, MC ON still shows


    // arm ArmAndClaw
      //method: 0, //@ 0-7
      Rotunda: 100, //@ 0-999
      Shoulder: 50, //@ 0-999
      Elbow: 250, //@ 0-999
      Wrist_Pitch: 888, //@ 0-999
      Wrist_Roll: 180, //@ 0-999
      Claw: 1, // !!! @ 0-1
    };
    // return {progress: 90, direction: "Forward"};
  },

  /* Render our View */
  render: function() {
    // console.log(this.netHandler);
    // console.log(this);
    return (

  <div id="everything"> 

    <div> 

    {/*Begin Cam/3D viewer area */}
      <div className="row">
        <div className="col-md-2">
          <div id="threedeeviewerfront">
          {/*Insert Roverviewer after confirming that page functions before trying to implement interface*/}
          </div>
         <div id="threedeeviewertop">
          {/*Insert Roverviewer after confirming that page functions before trying to implement interface*/}
          </div>
         <div id="threedeeviewerside">
          {/*Insert Roverviewer after confirming that page functions before trying to implement interface*/}
          </div>
        </div>
        <div className="col-md-10">
          <img id="camerafeed" ref="mainscreen"></img>
            {/*Insert cam feed here
              - Img tag with different ids for diff sources
              - Give each id ref="mainscreen"
              - Make camview an initial state
            */}
        </div>
      </div>
    {/*End Cam/3D viewer area */}


    {/* Begin Manual Control Off Section*/}
      <div>
        <div id="ball"></div>
        <div className="row">
          <div className="col-md-1" id="mancontrolbutton">
            &nbsp; <b>MC:</b> &nbsp; <Toggle onChange={this.onToggleManualControl}/>
          </div>
          <div className="col-md-1" id="rovercon">
            <text id="gamepad-info"><b>MIMIC:</b> Off</text>
          </div>
          <div className="col-md-1" id="rovercon"><b>ROVER: </b>
             {this.state.roverOnline ? "On": "Off" }
          </div>
          <div className="col-md-3" id="mancontroloff"><b>CAMERA: </b>
            <button type="button" className="btn btn-success" onClick={this.onClawCamClick}>Claw</button>&nbsp;
            <button type="button" className="btn btn-success" onClick={this.onElbowCamClick}>Elbow</button>&nbsp;
            <button type="button" className="btn btn-success" onClick={this.onBaseCamClick}>Base</button>&nbsp;
          </div>
          <div className="col-md-2" id="mancontroloff"><b>3D: </b>
            <button type="button" className="btn btn-success" onClick={this.onTop3DClick}>Top</button>&nbsp;
            <button type="button" className="btn btn-success" onClick={this.onFront3DClick}>Front</button>&nbsp;
            <button type="button" className="btn btn-success" onClick={this.onSide3Dlick}>Side</button>&nbsp;
          </div>
          <div className="col-md-2" id="clawclaw"><b>CLAW: </b>
              {this.state.Claw < 1 ? "Gripped" : "Not Gripped"}
                {/*@ change claw force to parameter for this arm */}
                {/* OLD code for saying whether claw gripped or nah
                  ({this.state.gripped}) &nbsp; ({this.state.notgripped})
                */}
          </div>
          <div className="col-md-2" id="clawclaw1"><b>POSITION </b>
            <text id="buttonDisplay">{ this.state.buttonDisplay }</text>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4" id="mancontroloff2"><b>(R)OTATION: </b> &nbsp;
            BASE <text id="analog1"></text> &deg; &nbsp;
            WRIST <text id="analog6"></text> &deg; &nbsp;

            {/*BASE &nbsp; {this.state.Rotunda} &deg; &nbsp;
            WRIST &nbsp; {this.state.Wrist_Roll} &deg; &nbsp;*/}
                  {/*changed from this.state.wrist to this.state.Wrist_Roll
                  because the nav page defined the controllable wrist roll angle as this.state.Wrist_Roll
                  Make sure this is reflected throughout this index page and that it doesnt conflict with Roverviewer*/}

          </div>
          <div className="col-md-4" id="mancontroloff2"><b>(P)ITCH: </b> &nbsp;
            SHOULDER <text id="analog2"></text> &deg; &nbsp;
            ELBOW <text id="analog3"></text> &deg; &nbsp;
            WRIST <text id="analog5"></text> &deg; &nbsp; 

            {/*SHOULDER &nbsp; {this.state.Shoulder} &deg; &nbsp;
            ELBOW &nbsp; {this.state.Elbow} &deg; &nbsp;
            WRIST &nbsp; {this.state.Wrist_Pitch} &deg; &nbsp;*/}
              {/*changed from this.state.wrist to this.state.Wrist_Pitch 
              because the nav page defined the controllable wrist pitch angle as this.state.Wrist_Pitch
              Make sure this is reflected throughout this index page and that it doesnt conflict with Roverviewer*/}
          </div>
          <div className="col-md-4" id="clawclawclaw2">
            <b>(T)ORQUE: </b> <text id="analog4"></text> n m &nbsp;
            {/*<b>PITCH / Claw?</b> &nbsp; {this.state.Claw} &deg; &nbsp; &nbsp;*/}
              {/*changed from this.state.clawpitch to this.state.Claw 
                because the nav page defined the controllable claw pitch angle as this.state.Claw
                Make sure this is reflected throughout this index page and that it doesn't conflict with Roverviewer*/}
          </div>
        </div>
      </div>

{/* ==============

below is a combination of sliders that work for actual arm and sliders that only work for 3d interface

!! Figure out why Manual Control is on by default here in comparison to ARM code because the Toggle works 
  but it is glitchy since it starts with it "on" when it should be "off"

===================*/}


      <div className="row">
           <div ref="manualControl" style={{display: 'inline'}}>
            <div className="col-xs-4" id="controlsection">
                <p><text>(R) BASE</text></p>
                  {/* OLD SLIDER CODE FROM ARM PAGE
                  <input id = "maninput3" ref = "manAngle3" onChange={this.onSliderChange3}></input> &nbsp;
                  <button type="button" className="btn btn-xs" onClick={this.onBaseResetClick}>RESET</button>
                  <Slider ref="manAngle3" min="0" max="180" initialValue={90} onChange={this.onSliderChange3}/>
                  */}
                  <Slider initialValue={this.state.Rotunda} min="0" max="999" hideTooltip="true" onChange={this.onRotundaChange}/>
                <text>(R) WRIST</text>
                  <Slider initialValue={this.state.Wrist_Roll} min="0" max="999" hideTooltip="true" onChange={this.onWrist_RollChange}/>
              
              {/*
                BEGIN buttons from original nav page
                considering deleting them?
              */}
              {/*
              <div className="row">
                <div className="col-xs-2">
                  <button onClick={this.methodEvent} method="-3" className="btn btn-info btn-block">L FAST</button>
                </div>
                <div className="col-xs-2">
                  <button onClick={this.methodEvent} method="-2" className="btn btn-info btn-block">L</button>
                </div>
                <div className="col-xs-2">
                  <button onClick={this.methodEvent} method="-1" className="btn btn-info btn-block">L SLOW</button>
                </div>
                <div className="col-xs-2">
                  <button onClick={this.methodEvent} method="1" className="btn btn-default btn-block">R SLOW</button>
                </div>
                <div className="col-xs-2">
                  <button onClick={this.methodEvent} method="2" className="btn btn-default btn-block">R</button>
                </div>
                <div className="col-xs-2">
                  <button onClick={this.methodEvent} method="3" className="btn btn-default btn-block">R FAST</button>
                </div>
              </div>
              <br/>
             */}

              {/*END buttons from original nav page
              considering deleting them?*/}

            </div>
            <div className="col-xs-4" id="controlsection">
                {/*
                <div className="col-xs-12">
                 <button onClick={this.methodEvent} method="0" className={"btn btn-" + (this.state.pitchOrRoll == "pitch" ? "primary" : "default") + " btn-block"}>Pitch Only</button>
                &nbsp;                
                </div>
                */}
                <p><text>(P) SHOULDER</text></p>
                  {/* OLD CODE FROM ARM PAGE
                  <input id = "maninput1" ref = "manAngle1" onChange={this.onSliderChange1}></input> &nbsp;
                  <button type="button" className="btn btn-xs" onClick={this.onShldResetClick}>RESET</button>
                  <Slider ref="manAngle1" min="0" max="180" initialValue={90} onChange={this.onSliderChange1}/>
                  */}
                   <Slider initialValue={this.state.Shoulder} min="0" max="999" hideTooltip="true" onChange={this.onShoulderChange}/>
                <text>(P) ELBOW</text>
                  {/* OLD CODE FROM ARM PAGE 
                  <input id = "maninput2" ref = "manAngle2" onChange={this.onSliderChange2}></input> &nbsp;
                  <button type="button" className="btn btn-xs" onClick={this.onElbowResetClick}>RESET</button>
                  <Slider ref="manAngle2" min="0" max="180" initialValue={90} onChange={this.onSliderChange2}/>
                  */}
                   <Slider initialValue={this.state.Elbow} min="0" max="999" hideTooltip="true" onChange={this.onElbowChange}/>
                <text>(P) WRIST</text>
                    <Slider initialValue={this.state.Wrist_Pitch} min="0" max="999" hideTooltip="true" onChange={this.onWrist_PitchChange}/>
                      {/* OLD CODE FROM ARM PAGE
                      <input id = "maninput4" ref = "manAngle4" onChange={this.onSliderChange4}></input> &nbsp;
                      <button type="button" className="btn btn-xs" onClick={this.onWristResetClick}>RESET</button>
                      <Slider ref="manAngle4" min="0" max="180" initialValue={0} onChange={this.onSliderChange4}/>
                      second slider is able to control the 3d model, but the second slider was able to control the actual arm 
                      and its value is reflected in the mancontroloff section (0)
                      WHEN TURNING MANCONTROL OFF, THE VALUE FOR THIS SLIDER IS REFLECTED IN THE 3D MODEL...
                        SO IT'S NOT COMPLETELY UNABLE TO CONTROL THE 3DVIEWER
                      */}
            </div>
            <div className="col-xs-4" id="controlsection">
              <text>(T) CLAW</text>
                <div id = "centered">
                  <Slider initialValue={this.state.Claw} min="0" max="1" hideTooltip="true" onChange={this.onClawChange}/>
                    {/*
                    this slider changes the claw pitch.. although it's units are not in degrees... 
                      it doesn't change the 3d viewer at all because there's no claw shown in the 3d model 
                    */}
                  <p><b><text>ARM/CLAW PRE-SET POSITIONS</text></b></p>
                  {/* @@@@
                    ASSIGN ONCHANGE SLIDER VALUES WHEN THESE BUTTONS ARE CLICKED
                  */}
                  <p>
                    <button type="button" id="padthis" className="btn btn-success" onClick={this.methodEvent} method="0">Open Claw</button>
                    <button type="button" id="padthis" className="btn btn-success" onClick={this.methodEvent} method="1">Close Claw</button>
                  </p>
                  <p>
                    <button type="button" id="padthis" className="btn btn-success" onClick={this.methodEvent} method="2">Deploy POD</button>
                    <button type="button" id="padthis" className="btn btn-success" onClick={this.methodEvent} method="3">Retrieve POD</button>
                  </p>
                  <p>
                    <button type="button" id="padthis" className="btn btn-success" onClick={this.methodEvent} method="4">Touch Ground</button>
                    <button type="button" id="padthis" className="btn btn-success" onClick={this.methodEvent} method="5">Reach Behind</button>
                    <button type="button" id="padthis" className="btn btn-success" onClick={this.methodEvent} method="6">Reach Forward</button>
                  </p>
                  {/*
                  <div className="row">
                   <p><b><text>POWER SETTINGS</text></b></p>
                    <div className="col-xs-4">
                      <button onClick={this.methodEvent} method="5" className="btn btn-default btn-block">Servos Off</button>
                    </div>
                    <div className="col-xs-4">
                      <button onClick={this.methodEvent} method="6" className="btn btn-warning btn-block">50% Power</button>
                    </div>
                    <div className="col-xs-4">
                      <button onClick={this.methodEvent} method="7" className="btn btn-success btn-block">100% Power</button>
                    </div>
                  </div>
                */}
                </div>
            </div>
          </div>
      </div>

    </div>
    
    </div>    
    )
  },

  inputModeClass: function(input) {
    return this.state.inputMode == input ? "btn-primary" : "btn-default";
  },

  setInputMode: function(input) {
    this.setState({
      "inputMode": input
    })
  },

  /* Controller Functions */

  onSliderChange: function(value) {
    this.setState({
      progress: value.newValue
    });
  },


  // Arm shit

  methodEvent: function(button) {
    this.setState({ 
      method: parseInt(button.target.attributes.method.nodeValue)
    });
  },


  toggleManual: function(enabled) {
    if (enabled) {
      this.refs.manualControl.style.color = "inherit";
      this.refs.manualControl.style.opacity = 1;
      this.refs.manualControl.style.pointerEvents = "auto";
      this.refs.manualControl.style.display = "block";
      this.refs.mainscreen.style.height = "600px";
    } else {
      this.refs.manualControl.style.display = "none";
      this.refs.mainscreen.style.height = "800px";
    }
  },

  onToggleManualControl: function(e) {
    this.toggleManual(e.newValue);
    this.setState({
      manualControl: e.newValue
    })
  },


  onRotundaChange: function(value) {
    this.setState({
      Rotunda: value.newValue
    })
  },

  onShoulderChange: function(value) {
    this.setState({
      Shoulder: value.newValue
    })
  },

  onElbowChange: function(value) {
    this.setState({
      Elbow: value.newValue
    })
  },


  onWrist_PitchChange: function(value) {
    this.setState({
      Wrist_Pitch: value.newValue
    })
  },
  onWrist_RollChange: function(value) {
    console.log(value);
    this.setState({
      Wrist_Roll: value.newValue
    })
  },
  onClawChange: function(value) {
    console.log(value);
    this.setState({
      Claw: value.newValue
    })
  },

/*
 Functions for pre-set position buttons... MODIFY PLZ
do I need to make these methods functions instead, like how it is defined at the top of this page

  onReleaseClick: function(value) {
    console.log(value);
    this.setState({
      Claw: value.newValue
    })
  },


  onGripClick: function(value) {
    console.log(value);
    this.setState({
      Claw: value.newValue
    })
  },


  onDeployClick: function(value) {
    console.log(value);
    this.setState({
      Rotunda: value.newValue
      Shoulder: value.newValue
      Elbow: value.newValue
      Wrist_Pitch: value.newValue
      Wrist_Roll: value.newValue
      Claw: value.newValue
    })
  },

  onRetrieveClick: function(value) {
    console.log(value);
    this.setState({
      Rotunda: value.newValue
      Shoulder: value.newValue
      Elbow: value.newValue
      Wrist_Pitch: value.newValue
      Wrist_Roll: value.newValue
      Claw: value.newValue
    })
  },

  onGroundClick: function(value) {
    console.log(value);
    this.setState({
      Rotunda: value.newValue
      Shoulder: value.newValue
      Elbow: value.newValue
      Wrist_Pitch: value.newValue
      Wrist_Roll: value.newValue
      Claw: value.newValue
    })
  },

  onBehindClick: function(value) {
    console.log(value);
    this.setState({
      Rotunda: value.newValue
      Shoulder: value.newValue
      Elbow: value.newValue
      Wrist_Pitch: value.newValue
      Wrist_Roll: value.newValue
      Claw: value.newValue
    })
  },

  onForwardClick: function(value) {
    console.log(value);
    this.setState({
      Rotunda: value.newValue
      Shoulder: value.newValue
      Elbow: value.newValue
      Wrist_Pitch: value.newValue
      Wrist_Roll: value.newValue
      Claw: value.newValue
    })
  },


*/

});




export var route = {
  name: "Arm And Claw",
  link: "#/ArmAndClaw"
};

/* Export our newly created page so that the world can see it! */
export default HomePage;