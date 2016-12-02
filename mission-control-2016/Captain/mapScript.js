/**
TODO:
- Make map resizable by dragging
- Add functionality to all other buttons
**/

var latitude = 37.335083;
var longitude = -121.882088;
var altitude = 0;
document.getElementById("latitude").innerHTML = latitude;
document.getElementById("longitude").innerHTML = longitude;
//START MAP
var mymap = L.map('mapid').setView([latitude, longitude], 15);
mymap.doubleClickZoom = false;
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BhY2V0b2FjZSIsImEiOiJjaXZmb2FrZG0wMTV1MnlvNnF2eHd5OXhqIn0.vs5YxulzCxYVvT4Fmhficg', {
	maxZoom: 18,
	id: 'your.mapbox.project.id',
	accessToken: 'your.mapbox.public.access.token'
}).addTo(mymap);


//ENDMAP

var marker = L.marker([latitude, longitude]).addTo(mymap);
marker.bindPopup("<b>Lat: </b>"+ latitude + "<br> <b>Lon: "+longitude + "<br> <b>Alt: "+altitude);

mymap.on('click',onMapClick);


function goToMarker(){

}

function goToRover(){
  mymap.setView([latitude, longitude]);
}

function getMarkerPosition(){

}

function onMapClick(e) {
    var tempLat = e.latlng.lat;
	var tempLon = e.latlng.lng;
	var tempAlt = e.latlng.alt;
	document.getElementById("latitude").innerHTML = tempLat;
	document.getElementById("longitude").innerHTML = tempLon;
	document.getElementById("altitude").innerHTML = tempAlt;
	var marker = L.marker([tempLat,tempLon,tempAlt]).addTo(mymap).bindPopup("<b>Lat: </b>"+ tempLat + "<br> <b>Lon: "+tempLon +"<br>" + $('<b>Remove ME</b>').click(function() {mymap.removeLayer(marker);})[0]);
	
}
