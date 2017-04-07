document.body.onload = addElement;

var i = 0;

function addElement () {
	var taskboxDiv = document.getElementById("taskbox");

	for (i; i < 5; i++) {
		var newDragDiv = document.createElement("div");
		newDragDiv.setAttribute("id", "drag_div" + i);
		newDragDiv.setAttribute("class", "");

		var dragContentDiv = document.createElement("div");
		dragContentDiv.setAttribute("class", "");

		var dragActionDiv = document.createElement("div");
		dragActionDiv.setAttribute("class", "");

		var upButtonText = document.createTextNode("up");
		var upButton = document.createElement("button");
		upButton.appendChild(upButtonText);
		upButton.setAttribute("value", "up");
		dragActionDiv.appendChild(upButton);

		var downButtonText = document.createTextNode("down");
		var downButton = document.createElement("button");
		downButton.appendChild(downButtonText);
		downButton.setAttribute("value", "down");
		dragActionDiv.appendChild(downButton);

		var newContent = document.createTextNode("item" + (i + 1));

		dragContentDiv.appendChild(newContent);

		newDragDiv.appendChild(dragContentDiv);
		newDragDiv.appendChild(dragActionDiv);

		taskboxDiv.appendChild(newDragDiv);
	}
}

function addTask(){
	var inputTask = document.getElementById("input_task");
	var taskboxDiv = document.getElementById("taskbox");
	var newContent = document.createTextNode(inputTask.value);

	var newDragDiv = document.createElement("div");
	newDragDiv.setAttribute("id", "drag_div" + i++);
	newDragDiv.setAttribute("class", "");

	var dragContentDiv = document.createElement("div");
	dragContentDiv.setAttribute("class", "");

	var dragActionDiv = document.createElement("div");
	dragActionDiv.setAttribute("class", "");

	var upButtonText = document.createTextNode("up");
	var upButton = document.createElement("button");
	upButton.appendChild(upButtonText);
	upButton.setAttribute("value", "up");
	dragActionDiv.appendChild(upButton);

	var downButtonText = document.createTextNode("down");
	var downButton = document.createElement("button");
	downButton.appendChild(downButtonText);
	downButton.setAttribute("value", "down");
	dragActionDiv.appendChild(downButton);

	dragContentDiv.appendChild(newContent);

	newDragDiv.appendChild(dragContentDiv);
	newDragDiv.appendChild(dragActionDiv);

	taskboxDiv.appendChild(newDragDiv);
}

$.datepicker.setDefaults({
  showOn: "both",
  buttonImageOnly: true,
  buttonImage: "calendar.gif",
  buttonText: "Calendar"
});