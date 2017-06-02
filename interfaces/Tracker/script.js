// script.js

$(document).keydown(function(event){
  // if (event.which === 74) { // "j" key
  //   console.log("yawLeft");
  //   yawLeft();
  // } else if (event.which === 76) {  // "l" key
  //   console.log("yawRight");
  //   yawRight();
  // } else if (event.which === 75) {  // "k" key
  //   console.log("STOP");
  //   yawNeutral();
  // }
  switch(event.which) {
    case 74: {  // "j" key
      console.log("yawLeft");
      yawLeft();
      break;
    }
    case 75: {  // "k" key
      console.log("STOP");
      yawNeutral();
      break;
    }
    case 76: {  // "l" key
      console.log("yawRight");
      yawRight();
      break;
    }
    case 77: {  // "m" key
      console.log("Toggle Pitch Enable");
      pitchToggle();
      break;
    }
    case 79: {  // "o" key
      console.log("Toggle Yaw Enable");
      yawToggle();
      break;
    }
    case 188: { // "," key
      console.log("pitchDown");
      // pitch down...
      break;
    }
    case 190: { // "." key
      console.log("pitchUp");
      break;
    }
    default:
      console.log("Unrecognized Key Binding");
      break;
  }
});

/* begin: model snapshot pane */
var ModelInterval = setInterval(function()
{
  if(Connection.state === Connection.CONNECTED)
  {
    // update model snapshot pane
    ModelJSONEditor.set(model);

    // update interface values
    if (typeof model.Tracker !== "undefined") {
      $("#recordedDistance").html(model.Tracker.value.distance/100);  // show distance in meters
      $("#zoomFeedback").html(model.Tracker.value.zoom);
      $("#yawPosFeedback").html(model.Tracker.value.yaw.angle);
      $("#pitchPosFeedback").html(model.Tracker.value.pitch.angle);
      $("#activeCameraFeedback").html(model.Tracker.value.activeCamera);
    } else {
      $("#recordedDistance").html("--No Data--");
      $("#zoomFeedback").html("--No Data--");
      $("#yawPosFeedback").html("--No Data--");
      $("#pitchPosFeedback").html("--No Data--");
      $("#activeCameraFeedback").html("--No Data--");
    }
    // console.log(JSON.stringify(model));
  }
}, 100);
/* end: model snapshot pane */

/* begin: lobe console updater */
var prev_message = messages;
var MessageInterval = setInterval(function()
{
  if(prev_message !== messages)
  {
    document.querySelector("#messages").innerHTML = messages;
    prev_message = messages;
  }
}, 100);
/* end: lobe console updater */

var options = {
    mode: 'code',
    history: false,
    modes: ['code', 'form', 'tree', 'view', 'text'], // allowed modes
    error: function(err) {
        alert(err.toString());
    }
};

var TestEditor = new JSONEditor(document.querySelector("#info"), options);
var ModelJSONEditor = new JSONEditor(document.querySelector("#model"), options);

var command = {
  "activeCamera": 0,
  "lidar": false,
  "pitch": {
        "speed": 0,
        "angle": 0
      },
  "yaw": {
        "speed": 0,
        "angle": 0
  },
  "zoom": 0,
  "yawMotion": 0.0  // RJ
};

TestEditor.set(command);

document.querySelector("#send-ctrl-signal").onclick = function()
{
  SendPayload(TestEditor.get());
};

function SendPayload(json)
{
  if(Connection.state === Connection.CONNECTED)
  {
    var payload = {
      target: "Tracker",
      command: json
    };
    primus.write(payload);
    
    /* Debug */
    console.log("typeof yaw angle: " + typeof command.yaw.angle);
    console.log("typeof pitch angle: " + typeof command.pitch.angle);
  }
}

/* Warning: Map needs to be locally saved; without it, using internet is necessary (but not feasible) */
// var mymap = L.map('mapid').setView([38.4064, -110.7919], 15);

// L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BhY2V0b2FjZSIsImEiOiJjaXZmb2FrZG0wMTV1MnlvNnF2eHd5OXhqIn0.vs5YxulzCxYVvT4Fmhficg', {
//   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//   maxZoom: 18,
//   id: 'your.mapbox.project.id',
//   accessToken: 'your.mapbox.public.access.token'
// }).addTo(mymap);

//zoom
function Slides(sliderValue){
  var inp = document.getElementById('ZoomSlide');
  console.log(inp.value);
  document.getElementById('ZoomCurrentValue').textContent = inp.value;
  zoomSlideUnclick();
};

function zoomSlideUnclick(){
  var k = $("#ZoomSlide").val();
  console.log("Changing Zoom to: " + k);

  command.zoom = Number(k);
  SendPayload(command);
}

function setNewValZoom(){
  var zoomVal = document.getElementById("zoomInp").value;
  document.getElementById('ZoomCurrentValue').textContent = zoomVal;
  document.getElementById('ZoomSlide').value = zoomVal;
};

function EntZoom(val, e){
  console.log(val);
  if(e.code=="Space"){
    var zoomVal = parseInt(document.getElementById("zoomInp").value);
    document.getElementById('ZoomCurrentValue').textContent = zoomVal;
    document.getElementById('ZoomSlide').value = zoomVal;
    document.getElementById("zoomInp").value="";
  }
};

//yaw speed
function YawSpeedEn(){
  console.log("clicked");
  var button = document.getElementById("YawSpeed");
  if(button.classList.contains("disabled")){
    button.classList.add('enabled');
    button.classList.remove('disabled');
    button.textContent = 'Enabled';
    console.log('Yaw Speed Enabled');
    command.yaw.speed = 1;
    SendPayload(command);
  }
  else{
    button.classList.add('disabled');
    button.classList.remove('enabled');
    button.textContent = 'Disabled';
    console.log('Yaw Speed Disabled');
    command.yaw.speed = 0;
    SendPayload(command);
  }
};

//yaw position
function YPSlides(sliderValue){
  var inp = document.getElementById('YawPosSlide');
  console.log(inp.value);
  document.getElementById('YawPosCurrentValue').textContent = inp.value;
  inp.addEventListener("mousemove", function() {
    document.getElementById('YawPosCurrentValue').textContent = inp.value;
  });
  command.yaw.angle = Number(inp.value);

  console.log("Updated yaw to: " + inp.value);
  YPSlideUnclick();
};

function YPSlideUnclick(){
  SendPayload(command);
};

function YPsetNewValZoom(){
  var zoomVal = document.getElementById("yawPosInp").value;
  document.getElementById('YawPosCurrentValue').textContent = zoomVal;
  document.getElementById('YawPosSlide').value = zoomVal;
  command.yaw.angle = Number(zoomVal);
  SendPayload(command);
};

function YPEntZoom(val, e){
  console.log(val);
  if(e.code=="Space"){
    var zoomVal = document.getElementById("yawPosInp").value;
    document.getElementById('YawPosCurrentValue').textContent = zoomVal;
    document.getElementById('YawPosSlide').value = zoomVal;
    document.getElementById("yawPosInp").value="";
  }
  command.yaw.angle = Number(zoomVal);
  SendPayload(command);
};

// RJ push-release yaw
function yawLeft() {
  command.yawMotion = -0.5;
  SendPayload(command);
}
function yawRight() {
  command.yawMotion = 0.5;
  SendPayload(command);
}
function yawNeutral() {
  command.yawMotion = 0.00;
  SendPayload(command);
}
function yawToggle() {
  $("#YawSpeed").click();
}

//pitch speed
function PitchSpeedEn(){
  console.log("clicked");
  var button = document.getElementById("PitchSpeed");
  if(button.classList.contains("disabled")){
    button.classList.add('enabled');
    button.classList.remove('disabled');
    button.textContent = 'Enabled';
    console.log('Pitch Speed Enabled');
    command.pitch.speed = 1;
    SendPayload(command);
  }
  else{
    button.classList.add('disabled');
    button.classList.remove('enabled');
    button.textContent = 'Disabled';
    console.log('Pitch Speed Disabled');
    command.pitch.speed = 0;
    SendPayload(command);
  }
};

//pitch position
function PPSlides(sliderValue){
  var inp = document.getElementById('PitchPosSlide');
  console.log(inp.value);
  document.getElementById('PitchPosCurrentValue').textContent = inp.value;
  inp.addEventListener("mousemove", function() {
    document.getElementById('PitchPosCurrentValue').textContent = inp.value;
  });
  command.pitch.angle = Number(inp.value);
  console.log("updating pitch to: " + inp.value);
  PPSlideUnclick();
};

function PPSlideUnclick(){
  SendPayload(command);
};

function PPsetNewValZoom(){
  var zoomVal = document.getElementById("pitchPosInp").value;
  document.getElementById('PitchPosCurrentValue').textContent = zoomVal;
  document.getElementById('PitchPosSlide').value = zoomVal;
  command.pitch.angle = Number(zoomVal);
  SendPayload(command);
};

function PPEntZoom(val, e){
  console.log(val);
  if(e.code=="Space"){
    var zoomVal = document.getElementById("pitchPosInp").value;
    document.getElementById('PitchPosCurrentValue').textContent = zoomVal;
    document.getElementById('PitchPosSlide').value = zoomVal;
    document.getElementById("pitchPosInp").value="";
  }
  command.pitch.angle = Number(zoomVal);
  SendPayload(command);
};

// RJ - push-release pitch
function pitchToggle() {
  $("#PitchSpeed").click();
}

//Lidar 
function LidarClick(){
  // console.log("Lidar clicked");
  // var button = document.getElementById("LidarEnable");
  // if(button.classList.contains("disabled")){
  //   button.classList.add('enabled');
  //   button.classList.remove('disabled');
  //   button.textContent = 'Enabled';
  //   console.log('Lidar Enabled');
  //   command.lidar = 1;
  // }
  // else{
  //   button.classList.add('disabled');
  //   button.classList.remove('enabled');
  //   button.textContent = 'Disabled';
  //   console.log('Lidar Disabled');
  //   command.lidar = 0;
  // }
  if ($("#LidarEnable").hasClass("disabled")) {
    $("#LidarEnable").removeClass("disabled");
    $("#LidarEnable").addClass("enabled");
    $("#LidarEnable").html("Enabled");
    command.lidar = true;
    console.log("LidarClick: Lidar Enabled");
  } else {
    $("#LidarEnable").removeClass("enabled");
    $("#LidarEnable").addClass("disabled");
    $("#LidarEnable").html("Disabled");
    command.lidar = false;
    console.log("LidarClick: Lidar Disabled");
  }
  SendPayload(command);
};

//Camera Switch  (disabled = camera B, enabled = camera A)
function CamSwitch(){
  // console.log("Camera Switched");
  // var button = document.getElementById("CamSwitch");
  // if(button.classList.contains("disabled")){
  //   button.classList.add('enabled');
  //   button.classList.remove('disabled');
  //   button.textContent = 'Switch to Camera A';
  //   console.log('Camera B');
  //   command.activeCamera = 1;
  // }
  // else{
  //   button.classList.add('disabled');
  //   button.classList.remove('enabled');
  //   button.textContent = 'Switch to Camera B';
  //   console.log('Camera A');
  //   command.activeCamera = 0;
  // }
  if ($("#CamSwitch").hasClass("disabled")) {
    $("#CamSwitch").removeClass("disabled");
    $("#CamSwitch").addClass("enabled");
    $("#CamSwitch").html("Camera B");
    command.activeCamera = 1;
    console.log("CamSwitch: Feed from Camera B");
  } else {
    $("#CamSwitch").removeClass("enabled");
    $("#CamSwitch").addClass("disabled");
    $("#CamSwitch").html("Camera A");
    command.activeCamera = 0;
    console.log("CamSwitch: Switched to Camera A");
  }
  SendPayload(command);
};
