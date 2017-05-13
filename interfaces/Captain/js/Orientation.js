var OrientationObject={
	pitch:0,
	roll:0,
	heading:0
}	

var rotate_text = 0;
var rotate = 0;
var pitch = 0;
var pitch_text = 0;
var data_pitch =0;
var data_roll =0;


setInterval(function(){  

	data_pitch=((OrientationObject.pitch+45)/90);
	data_roll=((OrientationObject.roll+45)/90);

	pitch = (data_pitch*510)-470.67;  //470

	pitch = pitch.toFixed(0).toString();
	pitch_text = ((data_pitch*180)-90 ).toFixed(0);
	rotate_text = ((data_roll*180)-90).toFixed(0).toString();
	rotate = 'rotate(' + ((data_roll*180)-90 ).toString() + "deg)";
	
	document.querySelector('.form1').innerHTML = pitch_text;
	document.querySelector('.form2').innerHTML = pitch_text;
	document.querySelector('.form3').innerHTML = rotate_text;
	$('.pitch').animate({
	    'background-position-y': pitch + 'px'
	});
	$('.Orientation').append("<style>.transform:before { transform:" + rotate + "; }</style>");
	$(".Orientation").addClass("transform");

}, 3000);

