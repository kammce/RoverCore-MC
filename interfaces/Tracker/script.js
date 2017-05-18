/**
1. Leaflet start guide: http://leafletjs.com/examples/quick-start/
2. Leaflet documentation: http://leafletjs.com/reference.html#map-usage
**/

  var mymap = L.map('mapid').setView([37.335083, -121.882088], 15);

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
    var zoomVal = document.getElementById("zoomInp").value;
    document.getElementById('ZoomCurrentValue').textContent = zoomVal;
    document.getElementById('ZoomSlide').value = zoomVal;
    document.getElementById("zoomInp").value="";
  }
};

//yaw speed
function YSSlides(sliderValue){
  var inp = document.getElementById('YawSpeedSlide');
  console.log(inp.value);
  document.getElementById('YawSpeedCurrentValue').textContent = inp.value;
  inp.addEventListener("mousemove", function() {
    document.getElementById('YawSpeedCurrentValue').textContent = inp.value;
  });
};

function YSsetNewValZoom(){
  var zoomVal = document.getElementById("yawSpeedInp").value;
  document.getElementById('YawSpeedCurrentValue').textContent = zoomVal;
  document.getElementById('YawSpeedSlide').value = zoomVal;
};

function YSEntZoom(val, e){
  console.log(val);
  if(e.code=="Space"){
    var zoomVal = document.getElementById("yawSpeedInp").value;
    document.getElementById('YawSpeedCurrentValue').textContent = zoomVal;
    document.getElementById('YawSpeedSlide').value = zoomVal;
    document.getElementById("yawSpeedInp").value="";
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
function PSSlides(sliderValue){
  var inp = document.getElementById('PitchSpeedSlide');
  console.log(inp.value);
  document.getElementById('PitchSpeedCurrentValue').textContent = inp.value;
  inp.addEventListener("mousemove", function() {
    document.getElementById('PitchSpeedCurrentValue').textContent = inp.value;
  });
};

function PSsetNewValZoom(){
  var zoomVal = document.getElementById("pitchSpeedInp").value;
  document.getElementById('PitchSpeedCurrentValue').textContent = zoomVal;
  document.getElementById('PitchSpeedSlide').value = zoomVal;
};

function PSEntZoom(val, e){
  console.log(val);
  if(e.code=="Space"){
    var zoomVal = document.getElementById("pitchSpeedInp").value;
    document.getElementById('PitchSpeedCurrentValue').textContent = zoomVal;
    document.getElementById('PitchSpeedSlide').value = zoomVal;
    document.getElementById("pitchSpeedInp").value="";
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

function LidarClick() {
    //var sliderYawValue = document.getElementById("ex6").value;
    //console.log(sliderYawValue);
    if(document.getElementById("clickMe").className === "green"){
    	document.getElementById("clickMe").className = "red";
    	document.getElementById("clickMe").innerHTML = "OFF";
    } else {
    	document.getElementById("clickMe").className = "green";
    	document.getElementById("clickMe").innerHTML = "ON";
    }
};

clickMe.onclick = LidarClick;
ex6.onchange = Slides;