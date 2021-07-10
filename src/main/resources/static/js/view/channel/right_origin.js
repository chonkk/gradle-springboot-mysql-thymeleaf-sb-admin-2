
define([],
function () {
	
	var right={};
	
	right.init = function init(data) {
		createTemplate(data, createEvent);
    }

	
	function createTemplate(data, callback){
		
		if(typeof data !== 'object'){
			data =  {};
		}

		$.ajax({url: contextPath + "/templates/channel/right_origin.mst", dataType: 'text'})
		.done(function(template){
			Mustache.parse(template);
			Mustache.to_html(template,data,{},function(rendered){
				 $('#row_main_right').html(rendered);
					if(callback!=null && callback!=undefined){
						callback();
					}
			});
		})
		.fail(function(){
			alert("Sorry there was an error.");
		});
	}
	
	function createEvent(){
	}
	
	
	
	return right;
});
