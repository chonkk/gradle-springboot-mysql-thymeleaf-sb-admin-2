
require(['../config'],function () {
	require(['mustache','swal'],function(Mustache,swal) {
		
		window.Mustache = Mustache;
		window.swal = window.sweetAlert = swal;
		
		var theParent = {};
		window.theParent = theParent;
		require(['board/left'], function(left) {
				theParent.initialize = function() {
							left.init();
				}
				theParent.initialize();
		});
	});
});
