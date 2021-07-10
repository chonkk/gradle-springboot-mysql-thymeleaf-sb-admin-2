
define([],
function () {
	
	var right={};
	
	right.initDefault = function initDefault(callback) {
		createTemplate_default(callback);
    }
	
	function createTemplate_default(callback){
		
		var container = $('#row_main_right');
		$.ajax({url: contextPath + "/templates/deploy/right_default.mst", dataType: 'text'})
		.done(function(template){
			Mustache.parse(template);
			Mustache.to_html(template,{contextPath:contextPath},{},function(rendered){
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
	
	right.init = function init(data) {
		createTemplate(data, createEvent);
    }
	
	function createTemplate(data, callback){
		
		var container = $('#row_main_right');
		$.ajax({url: contextPath + "/templates/deploy/right.mst", dataType: 'text'})
		.done(function(template){
			Mustache.parse(template);
			Mustache.to_html(template,data!=null? data:{},{},function(rendered){
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

		 createTable();
	}

	function createTable(){
		
		$('#contentListTable').DataTable( {
			destroy: true,
	        paging: true,
	        bAutoWidth: false,
 			searching: false,
 			bServerSide : false,
 			bSort : false,
 			select:{
 				style:     'single',
 		        className: 'selected'
 			},
 			stateSave: false,
 			"pageLength":15,
 			"lengthChange": false,
	        "ajax": {
	        	type: "GET",
	            url: contextPath + "/data/sample_export_detail_list.json",
	            dataType: 'json',
	            dataSrc: "data",
	            cache:false
	        },
	        "columns": [
	            { "data": "start" },
	            { "data": "title" },
	            { "data": "subtitle" },
	            { "data": "status" },
	        ]
	    } );
		
	}

	return right;
});
