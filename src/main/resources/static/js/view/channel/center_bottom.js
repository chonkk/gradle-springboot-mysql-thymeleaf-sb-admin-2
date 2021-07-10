
define([],
function () {
	
	var center_bottom={};
	
	center_bottom.init = function init(data) {
		createTemplate(data, createEvent);
    }

	
	function createTemplate(data, callback){
			
		$.when(loadTemplate(), loadServer(data))
		.fail(function(){alert("Sorry there was an error.");})
		.done(function(template, result){
			var temp = template[0];
			Mustache.parse(temp);
			Mustache.to_html(temp, result[0],{},function(rendered){
				 $('#row_main_center_bottom').html(rendered);
					if(typeof callback === 'function'){
						callback();
					}
			});
			
		});
		
	}
	
	function loadTemplate(){
		 return $.ajax({url: contextPath + "/templates/channel/center_bottom.mst", dataType: 'text'});
	}
	
	function loadServer(data){
		
		if(typeof data !== 'object'){
			return {};
		}
		
		if(data.channelId == '1'){
			return	$.ajax({url: contextPath + "/data/sample_export_server_list.json", dataType: 'json'});
		}
		
		return	$.ajax({url: contextPath + "/data/sample_export_server_list2.json", dataType: 'json'});
	}
	
	function createEvent(){
	}
	
	
	
	return center_bottom;
});
