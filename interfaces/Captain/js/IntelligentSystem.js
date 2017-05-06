var payload = {
  target: "NeoCortex",
  command: "None"
};
var commandpayload = {
  "mode" : "None",
  "flag" : -1
};

var NeoCortexObject = {
   "Direction" : "Invalid",
   "Finish" : "Invalid",
   "Gate_lattitude" : -1,
   "Gate_longitude" : -1,
   "GPSHeading" : 0
};

var GPSObject = {
   "Lat" : 0,
   "Long" : 0,
};



$("#GateEnter").click(function () {
       var Coordinate = $("#GateCoordinate").val();
       Coordinate = Coordinate.split(",");
       var lattitude = Coordinate[0];
       var longitude = Coordinate[1];
       console.log("Lat :" + lattitude + "Long: " + longitude );
      

      if(Connection.state === Connection.CONNECTED)
      {
        primus.write(
        {
          target: 'Cortex',
          command: 'NeoCortex',
        });

         commandpayload = {
           "mode" : "GATE",
           "lattitude": lattitude,
           "longitude": longitude
         }
         payload = {
            target: "NeoCortex",
            command: commandpayload
         }
         primus.write(payload);
      }
      createDestination(Coordinate[0],Coordinate[1]);//function from Mapscript.js

    });

$("#AutonomousToggle").change(function() {
    if(this.checked) {
        console.log("Autonomous On");
        sendCommand("AI", 1);
    }
    else{
      console.log("Autonomous Off");
      sendCommand("AI",0);
    }
});


var LobeAssignmentInterval = setInterval(function()
{
  if(Connection.state === Connection.CONNECTED)
  {
    primus.write(
    {
      target: 'Cortex',
      command: 'NeoCortex',
    });
    clearInterval(LobeAssignmentInterval);
  }
}, 100);


function sendCommand(mode,flag)
{
    Commandpayload = {
      "mode" : mode,
      "flag" : flag
    }
      payload = {
      target: "NeoCortex",
      command: Commandpayload 
      };
     primus.write(payload);
}



function GetModel(){
  setInterval(function()
  {
    if(Connection.state === Connection.CONNECTED)
    {
      console.log(JSON.stringify(model));
      var str = JSON.stringify(model)
      //console.log(Objects);
      var str2 = str.replace(/["'(){}]/g,"");//take out hiddent char 
      var formated = str2.replace(/,/g, ":")
      formated = formated.split(":");
      //console.log(Objects[0]);

      if(formated[0] === "NeoCortex")
      {
         NeoCortexObject = {
            "Direction" : formated[5],
            "Finish" : formated[7],
            "Gate_lattitude" : formated[9],
            "Gate_longitude" : formated[11],
            "GPSHeading" : formated[13]
         }
      }

       else if(formated[0] === "GPS" )
      {
        GPSObject = {
          "Lat" : formated[5],
          "Long": formated[9]
        }
      }

      else if(formated[0] === "PowerSystems")
      {
        PowerObject = {
          "mAH" : formated[6],
          "BattTemp" : formated[22],
          "BattLevel": formated[8] 
        }   
      }

        //console.log(NeoCortexObject.Direction);
        document.querySelector('#Command').innerHTML = NeoCortexObject.Direction + "  " ;
        document.querySelector('#GateReach').innerHTML = NeoCortexObject.Finish ;
        document.querySelector('#GateLat').innerHTML = NeoCortexObject.Gate_lattitude + " " ;
        document.querySelector('#GateLong').innerHTML = NeoCortexObject.Gate_longitude ;
        document.querySelector('#GPSHeading').innerHTML = NeoCortexObject.GPSHeading ;

        rover.setLatLng([GPSObject.Lat,GPSObject.Long]);//function from Mapscript.js
    }
  }, 200);
}

GetModel();
