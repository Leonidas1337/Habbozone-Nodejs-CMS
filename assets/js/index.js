let socket = io();

// Quick links

$(".register-link").click(function() {
	$(".login-container").slideUp(500, function() {
		$(".register-container").slideDown(500);
	});
});

$(".login-back-link").click(function() {
	$(".register-container").slideUp(500, function() {
		$(".login-container").slideDown(500);
	});
});

$(".gender-selection div").click(function() {
	$(".gender-selection div").removeClass("uk-button-defaul uk-button-danger uk-button-primary");

	let value = $(this).attr("value");
	if (value == "F") {
		$(this).addClass("uk-button-danger");
	} else {
		$(this).addClass("uk-button-primary");
	}

	$(".gender-values input[value='" + value + "']").prop("checked", true);
});

// Background Music

let music = document.createElement("AUDIO");
music.src = "assets/music/habbo.mp3";
music.volume = 0.1;
music.isPlaying = true;

$("body").append($(music));

$(".play-button").click(function () {
	music.isPlaying = !music.isPlaying;
	$(".play-button .uk-icon").hide();
	if (!music.isPlaying) {
		music.pause();
		$(".play-button .pause").show();
	} else {
		$(".play-button .play").show();
		music.play()
	}
});

music.play()

// Habbi clouds
let sizes = [
	[],
	[50, 38],
	[101, 80],
	[73, 61],
	[42, 42]
];

function random(min,max) {
	return Math.floor(Math.random() * (max-min)) + min;
}

let clouds = 0;

function createCloud() {
	if (clouds > 10) {
		return;
	}


	let cloud = $("<div></div>");
	cloud.addClass("habbo-cloud");

	let type = random(1,4);
	let image = "../assets/img/cloud_" + type + ".png";
	cloud.css({
		"background": "url('" + image + "') no-repeat",
		"top": random(0,70) + "%",
		"left": random(0,70) + "%",
		"width": sizes[type][0] + "px",
		"height": sizes[type][1] + "px"
	});

	cloud.hide();

	$("body").append(cloud);
	clouds++;

	cloud.fadeIn(1000);

	cloud.animate({
		"margin-left": "120%"
	}, {
		duration: random(40000,60000),
		queue: false,
		easing: "swing"
	}, function() {
		$(this).remove()
		clouds--;
	});
}

setInterval(createCloud, 3000);
