$(function(){
	$('.clock').hide();
	$('.music').hide();

	//Cache these for performance
	$h1 = $('h1');
	$h3 = $('h3');
	$body = $('body');

	//Sets the font size based on scale
    var setScale = function(elem, scaleFactor) {
	    var scaleSource = $body.width(),             
	        maxScale = 500,
	        minScale = 100; //Tweak these values to taste

	    var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:
	    if (fontSize > maxScale) fontSize = maxScale;
	    if (fontSize < minScale) fontSize = minScale;

	    elem.css('font-size', fontSize + '%');
	}

	//Resize fonts
	setScale($h1, .2);
	setScale($h3, .10);

	//Resize font based on windows size
    $(window).resize(function(){
        setScale($h1, .2);
        setScale($h3, .10);
    });

    //Fade our title page into the real wallpaper. 
    setTimeout(function() {

    	//Set the background
		var d = new Date();
		var hour = d.getHours();
		var cssClass = getPicture(hour);

		//Made our waiting div the active div
		$('.bg-tobe').removeClass('bg-tobe').addClass('bg-' + cssClass);

		//Fade out the active and put it in a waiting state
    	$('.bg-splash').fadeOut(function() {
    		$('.bg-splash').removeClass('bg-splash').addClass('bg-tobe');
    	});

    	//Fade in the new bg and clock. Fade out the title
    	$('.bg-' + cssClass).fadeIn();
    	$('.title').fadeOut();

    	updateClock();
    	$('.clock').fadeIn();
    	$('.music').fadeIn();
	}, 5000);

     //Start updating the clock
	setInterval('updateClock()', 1000);

});

//Determines the picture to use based on the hour
function getPicture(hour) {
	if(hour >= 21 || hour <=1)
		return 7;
	else if(hour >= 19)
		return 6;
	else if(hour >= 18)
		return 5;
	else if(hour >= 16)
		return 4;
	else if(hour >= 11)
		return 3;
	else if(hour >= 8)
		return 2;
	else if(hour >= 5)
		return 1;
	else
		return 8;
};

function updateClock() {
	var d = new Date();
	var hours = d.getHours();
	var mins = d.getMinutes();
	var ampm = hours < 12 ? "AM" : "PM";

	//Formatting
	mins = ((mins < 10) ? "0" : "") + mins;
	hours = (hours > 12) ? hours - 12 : hours;
	hours = (hours == 0) ? 12 : hours;
	hours = ((hours < 10) ? "0" : "") + hours;

	var str = hours + ":" + mins + " " + ampm;

	//Set the new time
	var $clock = $('.clock h3');
	var oldStr = $clock.text();
	$clock.text(str);

	//Check if the hour has changed
	var oldHour = getMilitaryHour(oldStr);
	if(oldStr.length == 0) return;
	var oldMinutes = oldStr.substring(3,5);
	var currHour = d.getHours();
	if(currHour != oldHour) {

		//Change bgs
		var cssClass = getPicture(currHour);
		var oldClass = getPicture(oldHour);
		
		//Make our waiting div the active div
		$('.bg-tobe').removeClass('bg-tobe').addClass('bg-' + cssClass);
		
		//Fade in the new bg
    	$('.bg-' + cssClass).fadeIn();

		//Fade out the active and put it in a waiting state
    	$('.bg-' + oldClass).fadeOut(function() {
    		$('.bg-' + oldClass).removeClass('bg-' + oldClass).addClass('bg-tobe');
    	});
	}
};

//Returns the military hour from a string formatted in standard time.
function getMilitaryHour(str) {
	var hour = parseInt(str.substring(0,2));
	var ampm = str.substring(str.length - 2);

	if(ampm == 'PM') 
		return hour + 12;
	else if(ampm == 'AM' && hour == 12)
		return 0;
	else
		return hour;
}