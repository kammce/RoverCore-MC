var PowerObject = {
  "mAH" : 0,
  "BattTemp" : 0,
  "BattLevel": 0 
}

 var g = new JustGage({
    id: "gauge",
    titleFontColor : "white",
    valueFontColor : "white",
    value:PowerObject.BattLevel,
    min: 0,
    max: 100,
    title: "Battery Level"
  });

  var g2 = new JustGage({
    id: "gauge2",
    titleFontColor : "white",
    valueFontColor : "white",
    value: PowerObject.BattTemp,
    min: 0,
    max: 100,
    title: "Battery Temp"
  });

   var g2 = new JustGage({
    id: "gauge3",
    titleFontColor : "white",
    valueFontColor : "white",
    value: PowerObject.mAH,
    min: 0,
    max: 10000,
    title: "Mah"
  });