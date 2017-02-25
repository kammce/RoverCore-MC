//var app = require('express')();
var fs = require('fs');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

// Loading Primus
var Primus = require('primus');
var Socket = new Primus.createSocket();
var target = 'http://localhost:9000';

var path = "/dev/ttyMIMIC";
if(typeof process.argv[2] !== "undefined") {
	path = process.argv[2];
}

console.log("Starting Mimic Server :: ", path);

var positions = {
	rotonda: 180,
	base: 180,
	elbow: 180,
	wrist: 180
};

var serial = new SerialPort(path, {
	baudrate: 9600,
	parser: serialport.parsers.readline("\n")
}, false);

serial.open(function(err) {
	if(err) {
		console.log("Failed to open serialport on device ", path);
	}
});

var connection = Socket(target, {
	reconnect: {
		max: 2000, // Number: The max delay before we try to reconnect.
		min: 500, // Number: The minimum delay before we try reconnect.
		retries: Infinity // Number: How many times we shoult try to reconnect.
	}
});

function sendArmPositions(data) {
	var angles = data.toString().split(",");
	positions["rotonda"] = parseInt(angles[0]);
	positions["base"] = parseInt(angles[1]);
	positions["elbow"] = parseInt(angles[2]);
	positions["wrist"] = parseInt(angles[3]);

	connection.write({
		target: "Arm",
		command:  {
			'mimic': true,
			"rotonda": positions["rotonda"],
			"base": positions["base"],
			"elbow": positions["elbow"],
			"pitch": positions["wrist"],
		}
	});
}

serial.on("open", function () {
	serial.on('data', function(data) {
		console.log('data received: ' + data);
		sendArmPositions(data);
		/*
		var angles = data.toString().split(",");
		positions["rotonda"] = parseInt(angles[0]);
		positions["base"] = parseInt(angles[1]);
		positions["elbow"] = parseInt(angles[2]);
		positions["wrist"] = parseInt(angles[3]);
		*/
	});
});

/*
setInterval(function() {
	sendArmPositions("180,180,180,180");
}, 100);
*/
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
	var pos = JSON.stringify(positions);
	console.log(pos);
	res.send(pos);
});

var server = app.listen(8500, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://127.0.0.1:%s', port);
});
*/