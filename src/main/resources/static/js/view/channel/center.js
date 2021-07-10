
define(['channel/center_top','channel/center_center','channel/center_bottom'],
function (center_top, center_center, center_bottom) {
	
	var center={};
	
	center.init = function init(data) {
		center_top.init(data);
		center_center.init(data);
		center_bottom.init(data);
    }
	
	
	
	return center;
});
