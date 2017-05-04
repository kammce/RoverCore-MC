/**
TODO:
- Make map resizable by dragging
- Add functionality to all other buttons
- Ability to edit markers
- Add markers by inputting GPS
- Go to marker selectability
- How will distance values change when rover moves
	-how to constantly update as new info comes in
**/

L.Icon.Default.imagePath = 'interfaces/Captain/css/';


//START MAP
let map = L.map('mapid').setView([
  37.335083, -121.882088
], 15);
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BhY2V0b2FjZSIsImEiOiJjaXZmb2FrZG0wMTV1MnlvNnF2eHd5OXhqIn0.vs5YxulzCxYVvT4Fmhficg', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'your.mapbox.project.id',
  accessToken: 'your.mapbox.public.access.token'
}).addTo(map);
map.doubleClickZoom.disable();
//END MAP

//START MARKER//
map.on('dblclick', createDestination);

function createDestination(e) {
  let coordinates = e.latlng;
  let distanceToRover = coordinates.distanceTo(rover.getLatLng());
  let destinationMarker = L.circleMarker(coordinates, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 12
  }).addTo(map);

  destinationMarker.lat = round(coordinates.lat, 10000);
  destinationMarker.lng = round(coordinates.lng, 10000);
  destinationMarker.distanceToRover = round(distanceToRover, 100);

  destinationMarker.bindPopup("<b style='color:#337ab7'>" +
    "<i>Destination " + destinationList.length + "</b></i><br><b>Lat: </b><u>" + destinationMarker.lat + "</u><br> <b>Lon: </b><u>" + destinationMarker.lng + "</u><br> <b>Distance to Rover: </b><u>" + destinationMarker.distanceToRover + " m. </u>" + "<br> <input type='button' value='Delete this marker' class='marker-delete-button'/>");
  destinationMarker.on("popupopen", removeDestination);
  destinationList.push(destinationMarker);
}

let destinationList = [];

function removeDestination(ev) {
  let tempMarker = this;
  console.log(this == this);
  // To remove marker on click of delete button in the popup of marker
  $(".marker-delete-button:visible").click(function() {
    map.removeLayer(tempMarker);
    destinationList = destinationList.filter((currentMarker) => tempMarker != currentMarker)
    console.log(destinationList);
  });
}

//END MARKER//

//START ROVER//
let rover = L.marker([
  GPSObjects.Lat, GPSObjects.Long
], {draggable: true}).addTo(map);
let roverLocation = rover.getLatLng();

// Binds popup data to rover
rover.bindPopup("<b style='color:#337ab7'><i>Rover</b></i><br>" +
  "<b>Lat: </b><u>" + round(roverLocation.lat, 10000) + "</u><br>" + "<b>Lon: </b><u>" + round(roverLocation.lng, 10000) + "</u>");

// Changes each marker's distances as rover moves
rover.on('move', function(ev) {
  let roverLocation = rover.getLatLng();
  rover._popup.setContent("<b style='color:#337ab7'><i>Rover</b></i><br>" +
    "<b>Lat: </b><u>" + round(roverLocation.lat, 10000) + "</u><br>" + "<b>Lon: </b><u>" + round(roverLocation.lng, 10000) + "</u>");

  destinationList.forEach(function(destinationMarker) {
    let coordinates = destinationMarker.getLatLng();
    let distanceToRover = coordinates.distanceTo(rover.getLatLng());

    destinationMarker.lat = round(coordinates.lat, 10000);
    destinationMarker.lng = round(coordinates.lng, 10000);
    destinationMarker.distanceToRover = round(distanceToRover, 100);

    destinationMarker.bindPopup("<b style='color:#337ab7'>" +
      "<i>Destination " + destinationList.length + "</b></i><br><b>Lat: </b><u>" + destinationMarker.lat + "</u><br> <b>Lon: </b><u>" + destinationMarker.lng + "</u><br> <b>Distance to Rover: </b><u>" + destinationMarker.distanceToRover + " m. </u>" + "<br> <input type='button' value='Delete this marker' class='marker-delete-button'/>");
    destinationMarker.on("popupopen", removeDestination);
  });
});

function goToRover() {
  var latlng = rover.getLatLng();
  map.panTo(latlng);
}
//END ROVER//

//START HELPER FUNCTIONS//
function round(value, decimals) {
  return Math.round(value * decimals) / decimals;
}
//END HELPER FUNCTIONS//
