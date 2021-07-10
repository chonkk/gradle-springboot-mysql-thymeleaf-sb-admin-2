
define(['deploy/history/right','datatables'],
function (right) {
	
	var left={};
	
	left.init = function init() {
		createTemplate(createEvent);
    }
	
	function createTemplate(callback){
		
		var container = $('#row_main_left');
		
		$.ajax({url: contextPath + "/templates/deploy/history/left.mst", dataType: 'text'})
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
		
		$('#listTable').DataTable( {
			destroy: true,
	        paging: true,
	        bAutoWidth: false,
 			searching: false,
 			bServerSide : false,
 			bSort : false,
 			select:{
 				style:     'single',
 		        className: 'selected',
 		        selector:'td:not(:last-child)'
 			},
 			stateSave: false,
 			"pageLength":15,
 			"lengthChange": false,
	        "ajax": {
	        	type: "GET",
	            url: contextPath + "/data/sample_export_history_list.json",
	            dataType: 'json',
	            dataSrc: "data",
	            cache:false
	        },
	        "columns": [
	            { "data": "schedule_nm" },
	            { "data": "created_by" },
	            { "data": "created" },
	            { "data": "status" },
	            { "data": "updated" },
	            { "className":"dt-body-center","data": "contents_path", render : function(data,type,row,meta){
            		if(data){
            			return '<a href="'+ contextPath + "/data/" + data +'" download><i class="fas fa-file-archive fa-2x"></i></a>';
            		} else {
            			return '<i class="fas fa-file-archive fa-2x text-gray-300"></i>';
            		}
	            } }
	        ],
        	rowId: 'schedule_id'
	    } );
		
	}

	
	function createTableEvent(){
		var table = $('#listTable').DataTable();
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

		var table = $('#listTable').DataTable();
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
	
	function delete_account_sample(postData){

            swal("삭제 성공!", "계정 삭제에 성공했습니다.", "success");
            createDefaultDetailTemplate(left.init);
	}
	
	function createDefaultDetailTemplate(callback){
		right.initDefault(callback);
	}
	
	function createDetail(data){
		right.init(data);
	}
	
	
	return left;
});
