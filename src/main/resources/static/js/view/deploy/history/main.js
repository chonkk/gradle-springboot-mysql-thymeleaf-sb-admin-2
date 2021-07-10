
require(['../../config'],function () {
	require(['mustache'],function(Mustache) {
		window.Mustache = Mustache;
		var theParent = {};
		window.theParent = theParent;
		require(['deploy/history/left'], function(left) {	
				theParent.initialize = function() {
					left.init();
				}
				theParent.initialize();
			});
	});
});
