/**
TODO:
- Make map resizable by dragging
- Add functionality to all other buttons
**/

var latitude = 37.335083;
var longitude = -121.882088;
document.getElementById("latitude").innerHTML = latitude;
document.getElementById("longitude").innerHTML = longitude;
//START MAP
var mymap = L.map('mapid').setView([latitude, longitude], 15);
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BhY2V0b2FjZSIsImEiOiJjaXZmb2FrZG0wMTV1MnlvNnF2eHd5OXhqIn0.vs5YxulzCxYVvT4Fmhficg', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'your.mapbox.project.id',
	accessToken: 'your.mapbox.public.access.token'
}).addTo(mymap);

//ENDMAP

var marker = L.marker([latitude, longitude]).addTo(mymap);
marker.bindPopup("<b>Lat: 37.333621</b><br> <b>Lon: -121.884899");


function goToMarker(){

}

function goToRover(){
  mymap.setView([latitude, longitude]);
}

function removeMarker(){

}

function getMarkerPosition(){

}
