$(document).ready(function() {
	var nowDate = new Date();

	var i = 0;

	var taskboxDiv = document.getElementById("taskbox");

	var table = document.createElement("table");

	var thead = document.createElement("thead");
	var theadtr = document.createElement("tr");
	var theadth1 = document.createElement("th");
	theadth1.appendChild(document.createTextNode("To Do List"));
	var theadth2 = document.createElement("th");
	theadth2.appendChild(document.createTextNode("Action"));

	theadtr.appendChild(theadth1);
	theadtr.appendChild(theadth2);
	thead.appendChild(theadtr);
	table.appendChild(thead);

	var tbody = document.createElement("tbody");
	tbody.setAttribute("id", "tbody_toDoList");

	for (i; i < 5; i++) {
		var tr = document.createElement("tr");
		tr.setAttribute("id", "tr" + i);

		var td1 = document.createElement("td");
		var td2 = document.createElement("td");

		var newContent = document.createTextNode("To do list " + (i + 1));

		td1.appendChild(newContent);
		td1.appendChild(document.createElement("br"));

		td1.appendChild(document.createTextNode(nowDate.getFullYear() + "-" 
			+ ((nowDate.getMonth()+1) < 10 ? ("0" + (nowDate.getMonth()+1)) : (nowDate.getMonth()+1)) + "-" 
			+ ((nowDate.getDate()+1) < 10 ? ("0" + (nowDate.getDate()+1)) : (nowDate.getDate()+1)) + " "));

		td1.appendChild(document.createTextNode((nowDate.getHours() < 10 ? ("0"+nowDate.getHours()) : nowDate.getHours())+ ":" 
			+ (nowDate.getMinutes() < 10 ? ("0"+nowDate.getMinutes()) : nowDate.getMinutes())));


		var delButtonText = document.createTextNode("Delete");
		var delButton = document.createElement("button");
		delButton.appendChild(delButtonText);
		delButton.setAttribute("onclick", "delRow(this)");
		td2.appendChild(delButton);

		tr.appendChild(td1);
		tr.appendChild(td2);

		tbody.appendChild(tr);
	}

	table.appendChild(tbody);
	taskboxDiv.appendChild(table);




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
		var tbody = document.getElementById("tbody_toDoList");

		var inputTask = document.getElementById("input_task");
		var newContent = document.createTextNode(inputTask.value);


		var tr = document.createElement("tr");
		tr.setAttribute("id", "tr" + i++);

		var td1 = document.createElement("td");
		var td2 = document.createElement("td");

		td1.appendChild(newContent);
		td1.appendChild(document.createElement("br"));

		td1.appendChild(document.createTextNode($("#datepicker").val() +" " ));
		td1.appendChild(document.createTextNode($("#timepicker").val()));

		var delButtonText = document.createTextNode("Delete");
		var delButton = document.createElement("button");
		delButton.appendChild(delButtonText);
		delButton.setAttribute("onclick", "delRow(this)");
		td2.appendChild(delButton);

		tr.appendChild(td1);
		tr.appendChild(td2);

		tbody.appendChild(tr);

		document.getElementById("input_task").value = "";
	});
});

function delRow(btn){
	var row = btn.parentNode.parentNode;
	row.parentNode.removeChild(row);
}

