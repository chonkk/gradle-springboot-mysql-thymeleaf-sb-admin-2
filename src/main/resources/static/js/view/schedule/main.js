
require(['../config'],function () {
	require(['mustache'],function(Mustache) {
		window.Mustache = Mustache;
		var theParent = {};
		window.theParent = theParent;
		require(['schedule/left'],function(left) {	
			
					theParent.left = left;
					theParent.initialize = function() {
						theParent.left.init();
					}
	
					theParent.editEvent = function editEvent(info){
						alert("편성 정보를 수정합니다.");
					};
					
					theParent.initialize();
		});
	});
});