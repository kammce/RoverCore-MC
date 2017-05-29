// var PowerObject = {
//   "mAH" : 0,
//   "Batt1Temp" : 0,
//   "Batt2Temp" : 0,
//   "Batt3Temp" : 0,
//   "BattLevel": 0
// }

//  var g = new JustGage({
//     id: "gauge",
//     titleFontColor : "white",
//     valueFontColor : "white",
//     value:PowerObject.BattLevel,
//     min: 0,
//     max: 100,
//     title: "Battery Level"
//   });

//    var g2 = new JustGage({
//     id: "gauge2",
//     titleFontColor : "white",
//     valueFontColor : "white",
//     value: PowerObject.mAH,
//     min: 0,
//     max: 10000,
//     title: "Mah"
//   });

//    var g3 = new JustGage({
//     id: "gauge3",
//     titleFontColor : "white",
//     valueFontColor : "white",
//     value: PowerObject.Batt1Temp,
//     min: 0,
//     max: 100,
//     title: "Battery1 Temp"
//   });

//    var g4 = new JustGage({
//     id: "gauge4",
//     titleFontColor : "white",
//     valueFontColor : "white",
//     value: PowerObject.Batt2Temp,
//     min: 0,
//     max: 100,
//     title: "Battery2 Temp"
//   });

//    var g5 = new JustGage({
//     id: "gauge5",
//     titleFontColor : "white",
//     valueFontColor : "white",
//     value: PowerObject.Batt3Temp,
//     min: 0,
//     max: 100,
//     title: "Battery3 Temp"
//   });

document.querySelectorAll("#Battery > button").forEach(function(obj, index, array)
{
	array[index].onclick = function()
	{
		console.log(array[index].id);
	}
});