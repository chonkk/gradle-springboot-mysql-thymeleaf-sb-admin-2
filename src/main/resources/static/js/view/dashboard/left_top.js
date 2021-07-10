
define(['datatables'],
function ( datatable) {
	
	var left={};
	
	left.init = function init() {
		createTemplate(createEvent);
    }
	
	function createTemplate(callback){
		
		var container = $('#row_main_left_top');
		
		$.ajax({url: contextPath + "/templates/dashboard/left_top.mst", dataType: 'text'})
		.done(function(template){
			Mustache.parse(template);
			Mustache.to_html(template,{},{},function(rendered){
				container.html(rendered);
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
		 $('#scheduleList').DataTable();
	}

	
	
	
	return left;
});
