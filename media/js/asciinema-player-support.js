String.prototype.format = String.prototype.f = function() {
	var s = this,
		i = arguments.length;

	while (i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return s;
};
$(document).ready(function() {
	var localAsciinemaJsonRegex = new RegExp("\/assets.*json$");
	$('div.center-block a').each(function(aindex) {
		var href = $(this).attr('href');
		var isLocalAsciinemaJson = localAsciinemaJsonRegex.test(href);
		if (isLocalAsciinemaJson) {
			var asciinemaPlayerId = "asciinema-player-id-"+aindex.toString();
			var replaceContent = '<div id=\"{0}\"> </div>'.f(asciinemaPlayerId);
			var innerHtml = this.innerHTML;
			$(this).replaceWith($(replaceContent));
			var asciinemaPlayOptions = {
				speed: 1,
				theme: "solarized-light",
				author: "dmx",
				title: innerHtml,
				authorURL: "https://dingmingxin.github.io",
				poster: "data:text/plain,{0}".f(innerHtml)
			};
			asciinema.player.js.CreatePlayer(asciinemaPlayerId, href, asciinemaPlayOptions);
		};
	});
});
