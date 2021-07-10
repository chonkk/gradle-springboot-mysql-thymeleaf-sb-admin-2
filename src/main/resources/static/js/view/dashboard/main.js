
require(['../config'],function () {
	require(['mustache'],function(Mustache) {
		window.Mustache = Mustache;
		var theParent = {};
		window.theParent = theParent;
		require(['dashboard/left','dashboard/right'], 
			function(left,right) {					
				function init() {
					left.init();
					right.init();
				}
				init();
			});
	});
});
