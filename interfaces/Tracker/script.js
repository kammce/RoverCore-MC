var ModelInterval = setInterval(function()
{
  if(Connection.state === Connection.CONNECTED)
  {
    ModelJSONEditor.set(model);
  }
}, 200);

var prev_message = messages;
var MessageInterval = setInterval(function()
{
  if(prev_message !== messages)
  {
    document.querySelector("#messages").innerHTML = messages;
    prev_message = messages;
  }
}, 100);

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
  "zoom": 66
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

var mymap = L.map('mapid').setView([38.4064, -110.7919], 15);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BhY2V0b2FjZSIsImEiOiJjaXZmb2FrZG0wMTV1MnlvNnF2eHd5OXhqIn0.vs5YxulzCxYVvT4Fmhficg', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'your.mapbox.project.id',
	accessToken: 'your.mapbox.public.access.token'
}).addTo(mymap);

//zoom
function Slides(sliderValue){
  var inp = document.getElementById('ZoomSlide');
  console.log(inp.value);
  document.getElementById('ZoomCurrentValue').textContent = inp.value;
  inp.addEventListener("mousemove", function() {
    document.getElementById('ZoomCurrentValue').textContent = inp.value;
  });
};

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
  SendPayload(command);
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

//Lidar speed
function LidarClick(){
  console.log("Lidar clicked");
  var button = document.getElementById("LidarEnable");
  if(button.classList.contains("disabled")){
    button.classList.add('enabled');
    button.classList.remove('disabled');
    button.textContent = 'Enabled';
    console.log('Lidar Enabled');
    command.lidar = 1;
  }
  else{
    button.classList.add('disabled');
    button.classList.remove('enabled');
    button.textContent = 'Disabled';
    console.log('Lidar Disabled');
    command.lidar = 0;
  }
  SendPayload(command);
};

//Camera Switch  (disabled = camera B, enabled = camera A)
function CamSwitch(){
  console.log("Camera Switched");
  var cameraFeed = document.getElementById("cameraFeed");
  var button = document.getElementById("CamSwitch");
  if(button.classList.contains("disabled")){
    button.classList.add('enabled');
    button.classList.remove('disabled');
    button.textContent = 'Switch to Camera A';
    console.log('Camera B');
    command.activeCamera = 1;
  }
  else{
    button.classList.add('disabled');
    button.classList.remove('enabled');
    button.textContent = 'Switch to Camera B';
    console.log('Camera A');
    command.activeCamera = 0;
  }
  SendPayload(command);
};
