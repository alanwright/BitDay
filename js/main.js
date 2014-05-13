$(function(){
	$('.clock').hide();
	$body = $('body');

	//Sets the font size based on scale
    var setBodyScale = function() {
	    var scaleSource = $body.width(),
	        scaleFactor = 0.35,                     
	        maxScale = 600,
	        minScale = 2; //Tweak these values to taste

	    var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:

	    if (fontSize > maxScale) fontSize = maxScale;
	    if (fontSize < minScale) fontSize = minScale;

	    $('body').css('font-size', fontSize + '%');
	}

	//Resize font based on windows size
    $(window).resize(function(){
        setBodyScale();
    });

    //Fade our title page into the real wallpaper. 
    setTimeout(function() {

    	//Set the background
		var d = new Date();
		var hour = d.getHours();
		var cssClass = getPicture(hour);
		
		updateClock();

		//Made our waiting div the active div
		$('.bg-tobe').removeClass('bg-tobe').addClass('bg-' + cssClass);

		//Fade out the active and put it in a waiting state
    	$('.bg-splash').fadeOut(function() {
    		$('.bg-splash').removeClass('bg-splash').addClass('bg-tobe');
    	});

    	//Fade in the new bg and clock. Fade out the title
    	$('.bg-' + cssClass).fadeIn();
    	$('.title').fadeOut();
    	$('.clock').fadeIn();

    	}, 5000);

	//Resize fonts as necessary
	setBodyScale();

	updateClock();
	setInterval('updateClock()', 1000);
});

//Determines the picture to use based on the hour
function getPicture(hour) {
	if(hour <= 5)
		return 1;
	else if(hour <= 8)
		return 2;
	else if(hour <= 11)
		return 3;
	else if(hour <= 15)
		return 4;
	else if(hour <= 18)
		return 5;
	else if(hour <= 20)
		return 6;
	else if(hour <= 22)
		return 7;
	else
		return 8;
};

function updateClock() {
	var d = new Date();

	var hours = d.getHours();
	var mins = d.getMinutes();
	var ampm = hours < 12 ? "AM" : "PM";

	mins = (mins < 10 ? "0" : "") + mins;
	hours = hours > 12 ? hours - 12 : hours;
	hours = hours == 0 ? 12 : hours;

	var str = hours + ":" + mins + " " + ampm;
	$('.clock h3').text(str);
};