
require(['../config'],function () {
	require(['mustache'],function(Mustache) {
			window.Mustache = Mustache;
			var theParent = {};
			window.theParent = theParent;
			
			require(['channel/left'], function(left) {	
						theParent.left = left;
						
						theParent.initialize = function() {
							left.init();
						}
						
						theParent.saveButton = function() {
							console.log("call theParent.saveButton");
							left.save();
						}
						
						theParent.cancelButton = function() {
							console.log("call theParent.cancelButton");
						}
						
						theParent.addButton = function() {
							console.log("call theParent.addButton");
						}
						
						theParent.initialize();
					}
			);
		
	});
	
});
