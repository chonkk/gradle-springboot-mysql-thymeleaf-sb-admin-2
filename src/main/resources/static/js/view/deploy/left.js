
define(['deploy/right','datatables'],
function (right) {
	
	var left={};
	
	left.init = function init() {
		createTemplate(createEvent);
    }
	
	function createTemplate(callback){
		
		var container = $('#row_main_left');
		
		$.ajax({url: contextPath + "/templates/deploy/left.mst", dataType: 'text'})
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
		
		right.initDefault()
	}
	
	function createEvent(){
		createTable();
		createTableEvent();
		createSearchEvent();
		
	}

	function createTable(){
		
		$('#scheduleListTable').DataTable( {
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
	            url: contextPath + "/data/sample_export_list.json",
	            dataType: 'json',
	            dataSrc: "data",
	            cache:false
	        },
	        "columns": [
	            { "data": "schedule_nm" },
	            { "data": "created_by" },
	            { "data": "created" },
	            { "data": "status" },
	            { "data": "updated" }
	        ],
        	rowId: 'schedule_id'
	    } );
		
	}

	
	function createTableEvent(){
		var table = $('#scheduleListTable').DataTable();
		table.on( 'select', function (e, dt, type, indexes) {
		    $("#deleteButton").prop('disabled', false);

	        	$(".has-error").removeClass("has-error");
				$(".jquery-validate-error").remove();
	        	
		        //테이블 로우 읽어옴
		       var data = table.rows( indexes ).data()[0];
		        createDetail(data);

		});
		
		table.on( 'deselect', function (e, dt, type, indexes) {
		    $("#deleteButton").prop('disabled', true);
		         createDefaultDetailTemplate();
		});
	}
	
	function createSearchEvent(){

		var table = $('#scheduleListTable').DataTable();
		$('#createButton').unbind('click');
		$('#createButton').click(function(e){
			table.rows('.selected').deselect();
			right.init(null);
		});

		$('#searchButton').unbind('click');
		$('#searchButton').click(function(e){
			table.rows('.selected').deselect();
			table.draw();
			createTableEvent();
		});
		
		//입력창 엔터 검색
		$('#searchKeyword').unbind('keyup');
		$('#searchKeyword').keyup(function(event) {
			if( event.keyCode == 13 ) {
				$('#searchButton').click();
			}
		});
		
	}
	
	
	function createDefaultDetailTemplate(callback){
		right.initDefault(callback);
	}
	
	function createDetail(data){
		right.init(data);
	}
	
	
	return left;
});
