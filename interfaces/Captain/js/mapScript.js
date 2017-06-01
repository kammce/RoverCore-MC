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

L.Icon.Default.imagePath = 'interfaces/Captain/css/images/';


//START MAP
let map = L.map('mapid').setView([
  37.3382,-121.8863
], 18);
  map.invalidateSize()


    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

L.tileLayer('interfaces/Captain/css/static_map/{z}/{x}/{y}.png', {
  maxZoom: 30,
}).addTo(map);
map.doubleClickZoom.disable();

//END MAP

//START MARKER//
map.on('dblclick', createDestination);

function createDestination(Lat,Lng) {
  map.invalidateSize()
  let coordinates = L.latLng([Lat,Lng]);
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
  38.4064094,-110.7918953
], {draggable: false}).addTo(map);
let roverLocation = rover.getLatLng();

/*
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
*/
function goToRover() {
  var latlng = rover.getLatLng();
  //console.log(latlng.lat);
  map.invalidateSize()
  map.panTo(latlng);
}
//END ROVER//

//START HELPER FUNCTIONS//
function round(value, decimals) {
  return Math.round(value * decimals) / decimals;
}
//END HELPER FUNCTIONS//
