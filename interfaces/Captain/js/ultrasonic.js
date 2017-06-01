

var polyList = [document.getElementById("corner1"),
				document.getElementById("corner2"),
				document.getElementById("corner3"),
				document.getElementById("corner4"),
				document.getElementById("vertleft"),
				document.getElementById("vertright"),
				document.getElementById("hortop"),
				document.getElementById("horbot")
				];
var infoList = [document.getElementById("top"),
				document.getElementById("topleft"),
				document.getElementById("topright"),
				document.getElementById("left"),
				document.getElementById("right"),
				document.getElementById("botleft"),
				document.getElementById("botright"),
				document.getElementById("bottom")
				];

function randomNum(){
	var areaList = new Array(polyList.length);
	for(i = 0; i<areaList.length; i++){
		areaList[i] = Math.random();
	}
	window.alert("randomNum complete");
	return areaList;
}

function changeColor(){
	/*var polyList = [document.getElementById("corner1"),
				document.getElementById("corner2"),
				document.getElementById("corner3"),
				document.getElementById("corner4"),
				document.getElementById("vertleft"),
				document.getElementById("vertright"),
				document.getElementById("hortop"),
				document.getElementById("horbot")
				];
	var infoList = [document.getElementById("top"),
				document.getElementById("topleft"),
				document.getElementById("topright"),
				document.getElementById("left"),
				document.getElementById("right"),
				document.getElementById("botleft"),
				document.getElementById("botright"),
				document.getElementById("bottom")
				];*/
	window.alert("changeColor start");
	var areaList = randomNum();

	for(i=0; i<areaList.length; i++){
			infoList[i].innerHTML = Math.random();
			convertToRGB(areaList[i]);
	}


	}

function convertToRGB(areaList){
	var convertNum = 0;

	if(areaList <= 0.5){
		convertNum = areaList*2*255;
		polyList[i].style.fill="rgb(255,"+convertNum+",0)";
	}

	else{
		convertNum = 255 - (((areaList-0.5)/(0.5-0.99))*255);
		polyList[i].style.fill="rgb("+convertNum+ ",255,0)";
	}
}





/*to do:
	create a function where it provides randomized numbers between 0-1 (test)
	make it get called from 8 shape objects
	color function needs to get data from test and give access rgb attributes in html
		tags and change it to the appropriate color depending on which object called
		it.*/