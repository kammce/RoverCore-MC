var payload = {
    target: "NeoCortex",
    command: "None"
};
var commandpayload = {
    "mode": "None",
    "flag": -1
};

var NeoCortexObject = {
    "Direction": "Invalid",
    "Finish": "Invalid",
    "Gate_lattitude": -1,
    "Gate_longitude": -1,
    "GPSHeading": 0,
    "Distance": 0
};

var GPSObject = {
    "Lat": 0,
    "Long": 0,
    "Altitude": 0
};

var PowerObject = {
    "mAH": 0,
    "Batt1Temp": 0,
    "Batt2Temp": 0,
    "Batt3Temp": 0,
    "BattLevel": 0
}

var ScienceObject = {
    "CMP": 0
}

var BattLevel = document.getElementsByClassName("BattLevel");
var BattTemp1 = document.getElementsByClassName("BattTemp1");
var BattTemp2 = document.getElementsByClassName("BattTemp2");
var BattTemp3 = document.getElementsByClassName("BattTemp3");

$("#camera-container").attr('src', 'http://192.168.1.12:9001');
$("#camera-container").click(function()
{
	$("#camera-container").attr('src', '');
	setTimeout(function()
	{
		$("#camera-container").attr('src', 'http://192.168.1.12:9001');
	}, 50);
});



$("#GateEnter").click(function()
{
    var string = $("#GateCoordinate").val();
    var Coordinate = string.split(/(?:,|-)+/)

    console.log(Coordinate);

    var latValue = parseInt(Coordinate[0]) + (parseFloat(Coordinate[1]) / 60) + (parseFloat(Coordinate[2]) / 3600);
    var longValue = parseInt(Coordinate[4]) + (parseFloat(Coordinate[5]) / 60) + (parseFloat(Coordinate[6]) / 3600);

    if (Coordinate[3] === "S")
    {
        latValue *= -1;
    }
    if (Coordinate[7] === "W")
    {
        longValue *= -1;
    }

    latValue = (Math.round(latValue * 100000)) / 100000;
    longValue = (Math.round(longValue * 100000)) / 100000;

    var lattitude = latValue;
    var longitude = longValue;


    console.log("Lat :" + lattitude + "Long: " + longitude);


    if (Connection.state === Connection.CONNECTED)
    {
        primus.write(
        {
            target: 'Cortex',
            command: 'NeoCortex',
        });

        commandpayload = {
            "mode": "GATE",
            "lattitude": lattitude,
            "longitude": longitude
        }
        payload = {
            target: "NeoCortex",
            command: commandpayload
        }
        primus.write(payload);
    }
    createDestination(lattitude, longitude); //function from Mapscript.js
});

$("#CamOn").click(function()
{
    $("#CamOn").addClass('btn-info');
    $("#CamOff").removeClass('btn-info');
    console.log("Cam On");
    CamCommand("start");
});

$("#CamOff").click(function()
{
    $("#CamOff").addClass('btn-info');
    $("#CamOn").removeClass('btn-info');
    console.log("Cam Off");
    CamCommand("stop");

});

$("#method0").click(function()
{
    $("#method0").addClass('btn-info');
    $("#method1").removeClass('btn-info');
    console.log("Autonomous On");
    sendCommand("AI", 1);
});

$("#method1").click(function()
{
    $("#method1").addClass('btn-info');
    $("#method0").removeClass('btn-info');
    console.log("Autonomous Off");
    sendCommand("AI", 0);
});

$("#method2").click(function()
{
    $("#method2").addClass('btn-info');
    $("#method3").removeClass('btn-info');
    console.log("GPS On");
    sendCommand("GPS", 1);
});


$("#method3").click(function()
{
    $("#method3").addClass('btn-info');
    $("#method2").removeClass('btn-info');
    console.log("GPS Off");
    sendCommand("GPS", 0);
});


$("#method4").click(function()
{
    $("#method4").addClass('btn-info');
    $("#method5").removeClass('btn-info');
    console.log("Sonic On");
    sendCommand("Sonic", 1);
});


$("#method5").click(function()
{
    $("#method5").addClass('btn-info');
    $("#method4").removeClass('btn-info');
    console.log("Sonic Off");
    sendCommand("Sonic", 0);
});

$("#method6").click(function()
{
    $("#method6").addClass('btn-info');
    $("#method7").removeClass('btn-info');
    console.log("Science On");
    ScienceCommand("MUXON");
});


$("#method7").click(function()
{
    $("#method7").addClass('btn-info');
    $("#method6").removeClass('btn-info');
    console.log("Science Off");
    ScienceCommand("MUXOFF");
});

document.querySelectorAll("#Battery > button").forEach(function(obj, index, array)
{
    array[index].onclick = function()
    {
        var value = parseInt(array[index].getAttribute("data-value"));
        var id = array[index].id;

        var invertAndSend = () =>
        {
        	var invert = (value == 1) ? 0 : 1;
            var payload = {
                target: "PowerSystems",
                command:
                {}
            };
            payload.command[id] = invert;
            primus.write(payload);
            array[index].setAttribute("data-value", invert);
        }

        if (isNaN(value))
        {
            console.warn("did not parse");
        }
        else
        {
            if (id === "killAll")
            {
                if (confirm("ARE YOU SURE YOU WANT TO DO THIS! THIS WILL SHUTDOWN THE WHOLE ROVER!!!!"))
                {
                    var payload = {
                        target: "PowerSystems",
                        command:
                        {}
                    };
                    payload.command[id] = 0;
                    primus.write(payload);
                }
            }
            else if (id.indexOf("batRelay") === 0)
            {
                if (confirm("ARE YOU SURE YOU WANT TO DO THIS! THIS MAY SHUTDOWN THE WHOLE ROVER!!!!"))
                {
                    invertAndSend();
                }
            }
            else
            {
                invertAndSend();
            }
        }
    }
});

/*
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

*/

function sendCommand(mode, flag)
{
    Commandpayload = {
        "mode": mode,
        "flag": flag
    }
    payload = {
        target: "NeoCortex",
        command: Commandpayload
    };
    primus.write(payload);
}

function CamCommand(command)
{
    Commandpayload = {
        "mode": command,
    }
    payload = {
        target: "VideoServer",
        command: Commandpayload
    };
    primus.write(payload);
}

function ScienceCommand(command)
{
    Commandpayload = {
        "mode": command,
    }
    payload = {
        target: "Sensors",
        command: Commandpayload
    };
    primus.write(payload);
}

function GetModel()
{
    setInterval(function()
    {
        if (Connection.state === Connection.CONNECTED)
        {
            //console.log(JSON.stringify(model));
            //var str = JSON.stringify(model)
            //console.log(model.NeoCortex.value.Direction);
            //var str2 = str.replace(/["'(){}]/g,"");//take out hiddent char
            //var formated = str2.replace(/,/g, ":")
            //formated = formated.split(":");
            //console.log(formated);
            try
            {
                NeoCortexObject = {
                    "Direction": model.NeoCortex.value.Direction,
                    "Finish": model.NeoCortex.value.Finish,
                    "Gate_lattitude": model.NeoCortex.value.Gate_lattitude,
                    "Gate_longitude": model.NeoCortex.value.Gate_longitude,
                    "GPSHeading": model.NeoCortex.value.GPS_Heading,
                    "Distance": model.NeoCortex.value.Distance
                }
            }
            catch (err)
            {}

            try
            {
                GPSObject = {
                    "Lat": model.GPS.value.lat,
                    "Long": model.GPS.value.long,
                    "Altitude": model.GPS.value.alt
                }
            }
            catch (err)
            {}

            try
            {
                OrientationObject = {
                    "pitch": model.Tracker.value.globalOr.Y,
                    "roll": model.Tracker.value.globalOr.X,
                    "heading": model.Tracker.value.globalOr.Z
                }
            }
            catch (err)
            {}

            try
            {
                PowerObject = {
                    "mAH": model.Power.value.mAhRemaining,
                    "Batt1Temp": model.Power.value.temperatures.Battery1,
                    "Batt2Temp": model.Power.value.temperatures.Battery2,
                    "Batt3Temp": model.Power.value.temperatures.Battery3,
                    "BattLevel": model.Power.value.batteryPercentage
                }
            }
            catch (err)
            {}

            try
            {
                PowerObject = {
                    "mAH": model.Power.value.mAhRemaining,
                    "Batt1Temp": model.Power.value.temperatures.Battery1,
                    "Batt2Temp": model.Power.value.temperatures.Battery2,
                    "Batt3Temp": model.Power.value.temperatures.Battery3,
                    "BattLevel": model.Power.value.batteryPercentage
                }
            }
            catch (err)
            {}

            try
            {
                ScienceObject = {
                    "CMP": model.Science.value.CMP
                }
            }
            catch (err)
            {}

            //console.log(PowerObject.BattLevel);
            BattLevel[0].style.width = (parseInt(PowerObject.BattLevel)).toString() + "%";
            BattTemp1[0].style.width = ((parseInt(PowerObject.Batt1Temp) / 140) * 100).toString() + "%";
            BattTemp2[0].style.width = ((parseInt(PowerObject.Batt2Temp) / 140) * 100).toString() + "%";
            BattTemp3[0].style.width = ((parseInt(PowerObject.Batt3Temp) / 140) * 100).toString() + "%";
            //console.log(NeoCortexObject.Direction);
            document.querySelector('#Command').innerHTML = NeoCortexObject.Direction + "  ";
            document.querySelector('#GateReach').innerHTML = NeoCortexObject.Finish;
            document.querySelector('#GateLat').innerHTML = NeoCortexObject.Gate_lattitude + " ";
            document.querySelector('#GateLong').innerHTML = NeoCortexObject.Gate_longitude;
            document.querySelector('#GPSHeading').innerHTML = NeoCortexObject.GPSHeading + " ";
            document.querySelector('#RoverHeading').innerHTML = OrientationObject.heading + " ";
            document.querySelector('#Distance').innerHTML = NeoCortexObject.heading;

            document.querySelector('#CurrLat').innerHTML = (Math.round(GPSObject.Lat * 100000) / 100000) + " ";
            document.querySelector('#CurrLong').innerHTML = (Math.round(GPSObject.Long * 100000) / 100000);
            document.querySelector('#Altitude').innerHTML = GPSObject.Altitude;

            document.querySelector('#BattLevel').innerHTML = PowerObject.BattLevel + "%";
            document.querySelector('#BattTemp1').innerHTML = PowerObject.Batt1Temp + " F";
            document.querySelector('#BattTemp2').innerHTML = PowerObject.Batt2Temp + " F";
            document.querySelector('#BattTemp3').innerHTML = PowerObject.Batt3Temp + " F";

            document.querySelector('#Geiger').innerHTML = ScienceObject.CMP;

            rover.setLatLng([GPSObject.Lat, GPSObject.Long]); //function from Mapscript.js
        }
    }, 200);
}

GetModel();
