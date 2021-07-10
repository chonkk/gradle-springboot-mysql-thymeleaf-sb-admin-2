
define(['dashboard/left_top','dashboard/left_bottom'],
function (l_top, l_bottom) {
	
	var left={};
	
	left.init = function init() {
		l_top.init();
		l_bottom.init();
    }
	
	
	
	
	return left;
});
