
require(['../config'],function () {
	require(['mustache'],function(Mustache) {
		window.Mustache = Mustache;
		var theParent = {};
		window.theParent = theParent;
		require(['deploy/left'], function(left) {	
			theParent.initialize = function init() {
						left.init();
			}
			theParent.initialize();
		});
	});
});
