$(document).ready(function() {
	var nowDate = new Date();

	var i = 0;

	var taskboxDiv = document.getElementById("taskbox");

	for (i; i < 5; i++) {
		var newDragDiv = document.createElement("div");
		newDragDiv.setAttribute("id", "drag_div" + i);
		// newDragDiv.setAttribute("class", "drag_div");

		var dragContentDiv = document.createElement("div");
		dragContentDiv.setAttribute("id", "drag_content_div" + i);
		dragContentDiv.setAttribute("class", "leftFloat");

///*
		// adding action div 
		var dragActionDiv = document.createElement("div");
		dragContentDiv.setAttribute("id", "drag_action_div" + i);

		var upButtonText = document.createTextNode("Del");
		var upButton = document.createElement("button");
		upButton.appendChild(upButtonText);
		upButton.setAttribute("value", "del");
		dragActionDiv.appendChild(upButton);

		// var downButtonText = document.createTextNode("down");
		// var downButton = document.createElement("button");
		// downButton.appendChild(downButtonText);
		// downButton.setAttribute("value", "down");
		// dragActionDiv.appendChild(downButton);

		// newDragDiv.appendChild(dragActionDiv);
//*/
		
		var newContent = document.createTextNode("To do list" + (i + 1));

		dragContentDiv.appendChild(newContent);
		// dragContentDiv.appendChild(document.createElement("br"));
		dragContentDiv.appendChild(document.createTextNode(nowDate.getFullYear() + "-" 
			+ ((nowDate.getMonth()+1) < 10 ? ("0" + (nowDate.getMonth()+1)) : (nowDate.getMonth()+1)) + "-" 
			+ nowDate.getDate() + " "));

		dragContentDiv.appendChild(document.createTextNode((nowDate.getHours() < 10 ? ("0"+nowDate.getHours()) : nowDate.getHours())+ ":" 
			+ (nowDate.getMinutes() < 10 ? ("0"+nowDate.getMinutes()) : nowDate.getMinutes())));


		newDragDiv.appendChild(dragContentDiv);
		newDragDiv.appendChild(dragActionDiv);

		taskboxDiv.appendChild(newDragDiv);
	}

	$.datepicker.setDefaults({
	  showOn: "focus",
	  dateFormat: "yy-mm-dd",
	  defaultDate: +0,
	  autoSize: true,
	});

	$("#datepicker").datepicker({ 
		minDate: 0,
	 });

	$("#datepicker").datepicker("setDate", new Date());

	$("#timepicker").timepicker({
	    timeFormat: 'HH:mm',
	    interval: 30,
	    minTime: '0',
	    maxTime: '11:59pm',
	    defaultTime: 'now',
	    startTime: '0:00',
	    dynamic: true,
	    dropdown: true,
	    scrollbar: true
	});



	$("#addTask").click(function(){

		var inputTask = document.getElementById("input_task");
		var taskboxDiv = document.getElementById("taskbox");
		var newContent = document.createTextNode(inputTask.value);
		

		var newDragDiv = document.createElement("div");
		newDragDiv.setAttribute("id", "drag_div" + i++);
		newDragDiv.setAttribute("class", "");

		var dragContentDiv = document.createElement("div");
		dragContentDiv.setAttribute("class", "leftFloat");


		// adding action div 
		var dragActionDiv = document.createElement("div");
		// dragActionDiv.setAttribute("class", "right");

/*		var upButtonText = document.createTextNode("up");
		var upButton = document.createElement("button");
		upButton.appendChild(upButtonText);
		upButton.setAttribute("value", "up");
		dragActionDiv.appendChild(upButton);

		var downButtonText = document.createTextNode("down");
		var downButton = document.createElement("button");
		downButton.appendChild(downButtonText);
		downButton.setAttribute("value", "down");
		dragActionDiv.appendChild(downButton);
*/

		var delLinkText = document.createTextNode("Delete");
		var delLink = document.createElement("button");
		delLink.appendChild(delLinkText);
		delLink.setAttribute("value", "down");
		dragActionDiv.appendChild(delLink);

		newDragDiv.appendChild(dragActionDiv);

		dragContentDiv.appendChild(newContent);
		// dragContentDiv.appendChild(document.createElement("br"));
		dragContentDiv.appendChild(document.createTextNode($("#datepicker").val() +" " ));
		dragContentDiv.appendChild(document.createTextNode($("#timepicker").val()));

		newDragDiv.appendChild(dragContentDiv);
		newDragDiv.appendChild(dragActionDiv);

		taskboxDiv.appendChild(newDragDiv);

		document.getElementById("input_task").value = "";		
	});



});