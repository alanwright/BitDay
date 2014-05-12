$(function(){
	//Cache for performance
	var $body = $('body');

	//Sets the font size based on scale
    var setBodyScale = function() {
	    var scaleSource = $body.width(),
	        scaleFactor = 0.35,                     
	        maxScale = 600,
	        minScale = 2; //Tweak these values to taste

	    var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:

	    if (fontSize > maxScale) fontSize = maxScale;
	    if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums

	    $('body').css('font-size', fontSize + '%');
	}

    $(window).resize(function(){
        setBodyScale();
    });

    //Set the background
	/*var d = new Date();
	var hour = d.getHours();
	$body.addClass('bg-' + hour);*/

	//Resize fonts as necessary
	setBodyScale();
});
 