
define(['board/right','datatables'],
function (right) {
	
	var left={};
	
	left.init = function init() {
		createTemplate(createEvent);
    }
	
	function createTemplate(callback){
		
		var container = $('#row_main_left');
		
		$.ajax({url: contextPath + "/templates/board/left.mst", dataType: 'text'})
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
		
		$('#accountListTable').DataTable( {
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
	            url: contextPath + "/board/list",
	            dataType: 'json',
	           // dataSrc: "",
	            cache:false
	        },
	        "columns": [
	            {  title: "ID","data": "id" },
	            { title: "author","data": "author" },
	            { title: "title","data": "title" },
	            { title: "createAt","data": "createAt" }
	        ],
        	rowId: 'id'
	    } );
		
	}

	
	function createTableEvent(){
		var table = $('#accountListTable').DataTable();
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

		var table = $('#accountListTable').DataTable();
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
		
		
		$('#deleteButton').unbind('click');
		$('#deleteButton').on( 'click', function () {
            
	        var row = table.rows('.selected');
	        if(row!=null && row!='undefined'){
			    		var postData = row.data()[0];
			    		if(postData!=null && postData!='undefined'){
			    			sweetAlert({
			                    title: "삭제 하시겠습니까?",
			        			type : "warning",
			                    text: "선택하신 해당 계정이 삭제됩니다.",
			    				  showCancelButton: true,
			    				  cancelButtonColor: '#f4b30d',
			    				  confirmButtonText: '확인',
			    				  cancelButtonText: '취소'
			    				}).then((result) => {
			    				  if (result.value) {
			    					  delete_account_sample(postData);
			    				  }
			    				});
			    		}

	        }

		});
	}
	
	function delete_account_sample(postData){

            swal("삭제 성공!", "계정 삭제에 성공했습니다.", "success");
            createDefaultDetailTemplate(left.init);
	}
	
	function delete_account(postData){

		$.ajax({ 
					url:contextPath + "account/delete",
					type: 'POST',
		            accept: 'application/json',
		            contentType: 'application/json; charset=utf-8',
					dataType : "json",
					data: JSON.stringify(postData),
					timeout: 30000,
					success: function(obj){
						if(obj){
						
							if(obj.error){
		 							simplePopup('삭제 실패!', "danger", obj.error.description, {OK: {label: "OK"}});
							}else if(obj.result){
								setTimeout( function () { $('#usecaseListTable').DataTable().ajax.reload(null, true);}, 300 );
					            swal("삭제 성공!", "계정 삭제에 성공했습니다.", "success");
								var table = $('#accountListTable').DataTable();
								table.draw();
								createDefaultDetailTemplate();
				    			createTableEvent();
							}else {
								alert("Sorry there was an error.");
							}
						}
					},
					error : ajaxErrorHandler
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
