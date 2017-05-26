/**
1. Leaflet start guide: http://leafletjs.com/examples/quick-start/
2. Leaflet documentation: http://leafletjs.com/reference.html#map-usage
**/

var mymap = L.map('mapid').setView([38.4064, -110.7919], 15);

/**L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BhY2V0b2FjZSIsImEiOiJjaXZmb2FrZG0wMTV1MnlvNnF2eHd5OXhqIn0.vs5YxulzCxYVvT4Fmhficg', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'your.mapbox.project.id',
	accessToken: 'your.mapbox.public.access.token'
}).addTo(mymap);**/

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
    var zoomVal = document.getElementById("zoomInp").value;
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
  }
  else{
    button.classList.add('disabled');
    button.classList.remove('enabled');
    button.textContent = 'Disabled';
    console.log('Yaw Speed Disabled');  
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
};

function YPsetNewValZoom(){
  var zoomVal = document.getElementById("yawPosInp").value;
  document.getElementById('YawPosCurrentValue').textContent = zoomVal;
  document.getElementById('YawPosSlide').value = zoomVal;
};

function YPEntZoom(val, e){
  console.log(val);
  if(e.code=="Space"){
    var zoomVal = document.getElementById("yawPosInp").value;
    document.getElementById('YawPosCurrentValue').textContent = zoomVal;
    document.getElementById('YawPosSlide').value = zoomVal;
    document.getElementById("yawPosInp").value="";
  }
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
  }
  else{
    button.classList.add('disabled');
    button.classList.remove('enabled');
    button.textContent = 'Disabled';
    console.log('Pitch Speed Disabled');  
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
};

function PPsetNewValZoom(){
  var zoomVal = document.getElementById("pitchPosInp").value;
  document.getElementById('PitchPosCurrentValue').textContent = zoomVal;
  document.getElementById('PitchPosSlide').value = zoomVal;
};

function PPEntZoom(val, e){
  console.log(val);
  if(e.code=="Space"){
    var zoomVal = document.getElementById("pitchPosInp").value;
    document.getElementById('PitchPosCurrentValue').textContent = zoomVal;
    document.getElementById('PitchPosSlide').value = zoomVal;
    document.getElementById("pitchPosInp").value="";
  }
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
  }
  else{
    button.classList.add('disabled');
    button.classList.remove('enabled');
    button.textContent = 'Disabled';
    console.log('Lidar Disabled');  
  }
};