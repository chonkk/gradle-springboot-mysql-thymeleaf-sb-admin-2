
define([],
function () {
	
	var right={};
	
	right.initDefault = function initDefault(callback) {
		createTemplate_default(callback);
    }
	
	function createTemplate_default(callback){
		
		var container = $('#row_main_right');
		$.ajax({url: contextPath + "/templates/board/right_default.mst", dataType: 'text'})
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
		$.ajax({url: contextPath + "/templates/board/right.mst", dataType: 'text'})
		.done(function(template){
			Mustache.parse(template);
			Mustache.to_html(template,data!=null? data:{},{},function(rendered){
				container.html(rendered);
				if(typeof callback === 'function'){
					callback();
				}
			});
		})
		.fail(function(){
			alert("Sorry there was an error.");
		});
	}
	
	function createEvent(){


        $('#cancelSaveButton').unbind('click').on( 'click', function () {
        	var selectedRows = $('#accountListTable').DataTable().rows('.selected');
        	if(selectedRows != undefined &&  selectedRows[0].length > 0){
            	selectedRows.deselect();
        	}else{
        		right.initDefault(null);
        	}
		});


        $('#saveButton').unbind('click').on( 'click', function () {

				
            swal({
                title: "저장 하시겠습니까?",
                html: "선택하신 해당 계정 정보가 저장됩니다.",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "확인",
                cancelButtonText: "취소",
				cancelButtonColor: '#f4b30d'
            }).then(function(result) {
				  if (result.value) {
					  save_account();
				  }
				});
		});
	}
	
	function save_account(){
		swal({
			title: "저장 성공!"
			, html: "선택하신 계정 정보 저장에 성공했습니다."
			, type: "success"
		});
		$('#accountListTable').DataTable().rows('.selected').deselect();
	       //createDefaultTemplate(null);
	}

	return right;
});
