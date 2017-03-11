//window.addEventListener("hashchange", function() { scrollBy(0, -70) });
$(document).ready(function() {
	var test = "hehe";
	var baseUrl = document.location.origin;
	var currentUrl = window.location.href;
	var currentShortUrl = currentUrl.replace(baseUrl,"");

	if(currentShortUrl != "/" && currentShortUrl != "/about/") {
		$("div.col-md-10").addClass("article");
	}

	$("li.dmx-menu-item a").each(function(i){
		var url = this.href;
		var shortUrl = url.replace(baseUrl,"");
		var active = false;
		if(currentShortUrl.length==1) {
			if(shortUrl.length == 1) {
				active = true;
			}
		}
		else {
			if(shortUrl.length>1 && currentShortUrl.indexOf(shortUrl) == 0) {
				active = true;
			}
		}
	if(active) {
		$(this).parents("li:first").addClass('active');
	}
	else {
		$(this).parents("li:first").removeClass('active');
	}
	});

	$("img").each(function(i) {
		$(this).addClass("img-responsive");
	});

	//for bootstrap-toc
	$('body').attr("data-spy", "scroll");
	$('body').attr("data-target", "#toc");

	$("#maybe-toc").append("<nav id=\"toc\" data-spy=\"affix\" data-toggle=\"toc\"></nav>");
	var ulElements = $("#text-table-of-contents ul:first");
	$("nav#toc").append(ulElements);
	$("#table-of-contents").remove();
	$('#maybe-toc ul').each(function() {
		$(this).addClass("nav");
	});
});
