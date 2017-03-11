$('#myCanvas').show();
$('#myCanvas').css('border-radius', '20px');
function DblHelix(n, rx, ry, rz) {
	var a = Math.PI / n, i, j, p = [],
		z = rz * 2 / n;
	for(i = 0; i < n; ++i) {
		j = a * i;
		if(i % 2)
			j += Math.PI;
		p.push([rx * Math.cos(j),
				rz - z * i,
				ry * Math.sin(j)]);
	}
	return p;
}
$(document).ready(function() {

	function imageExists(url, callback) {
		var img = new Image();
		img.onload = function() { callback(true); };
		img.onerror = function() { callback(false); };
		img.src = url;
	}
	function getRandomIntInclusive(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getRandomSpeed() {
		return getRandomIntInclusive(-40, 40)*1.0/100
	}

	function getTagCanvasOptions() {
		var gradient = {
			0:    '#f00', // red
			0.33: '#ff0', // yellow
			0.66: '#0f0', // green
			1:    '#00f'  // blue
		};

		var common_options = {
			fadeIn: 800,
			minBrightness: 0.4,
			depth: 0.99,
			reverse: true,
			weightGradient: gradient,
			weightFrom : 'tag-weight',
			weight : true,
			weightMode : 'both',
			weightSize : 2,
			weightSizeMax : 36,
			weightSizeMin : 14,
			wheelZoom : false,
			//imageRadius : '50%', //图片圆角
			shuffleTags: true,
			depth: 0.8,
			maxSpeed: 0.05,
			imageMode: 'both',
			outlineDash: 5,
			outlineDashSpace: 3,
			outlineRadius: 10,
			outlineColour: 'tag'
		};
		var options;
		var index = getRandomIntInclusive(1,5);
		if(index == 1) {
			options = common_options;
			options.shape = 'hcylinder(0.6)';
			options.lock = 'x';
			options.initial = [0.0, getRandomSpeed()];
			options.weightMode = 'colour';
			options.dragControl = true;
		}
		else if (index == 2) {
			options = common_options;
			options.stretchX= 1.6;
			options.initial= [getRandomSpeed(), getRandomSpeed()];
			options.dragControl = true;
		}
		else if (index == 3) {
			options = common_options;
			options.stretchX= 1.6;
			options.initial= [0, getRandomSpeed()];
			options.dragControl = true;
			options.shape = 'hring';
			options.lock = 'x';
		}
		else if (index == 4) {
			options = common_options;
			options.stretchX= 1;
			options.initial= [getRandomSpeed(), 0];
			options.shape = "DblHelix";
			options.dragControl =true;
			options.weightMode = "both";
			options.imageMode = "text";
			options.lock = "y";
		}
		else if (index == 5) {
			options = common_options;
			options.initial= [getRandomSpeed(), 0];
			options.shape = "vcylinder";
			options.dragControl =true;
			options.weightMode = "both";
			options.lock = "y";
		}
		return options;
	}

	var makeTags = function()
	{
		try {
			var options = getTagCanvasOptions();
			TagCanvas.Start('myCanvas','tags',options);
		} catch(e) {
			document.getElementById('myCanvasContainer').style.display = 'none';
		}
	}
	// Sample usage
	var tags = $("div#tags ul li a");
	var tagLength = tags.length;
	$("div#tags ul li a").each(function(i){
		var tag = this.innerHTML;
		var tagPng = "/assets/tag-"+tag+".png";
		var element = $(this);
		imageExists(tagPng, function(exists) {
			if(exists) {
				element.append("<img src=\""+tagPng+"\">");
			}
			if(i+1 == tagLength) {
				makeTags();
			}
		});
	});

});
