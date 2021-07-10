
define(['channel/right_origin'],
function (right_origin) {
	
	var center_top={};
	
	center_top.init = function init(data) {
		createTemplate(data, createEvent);
    }

	function createTemplate(data, callback){
			
		$.when(loadTemplate(), loadServer(data))
		.fail(function(){alert("Sorry there was an error.");})
		.done(function(template, result){
			var temp = template[0];
			Mustache.parse(temp);
			Mustache.to_html(temp, result[0],{},function(rendered){
				 $('#row_main_center_top').html(rendered);
					if(typeof callback === 'function'){
						callback();
					}
			});
			
		});
		
	}
	
	function loadTemplate(){
		 return $.ajax({url: contextPath + "/templates/channel/center_top.mst", dataType: 'text'});
	}
	
	function loadServer(data){
		
		if(typeof data !== 'object'){
			return {};
		}
		
		if(data.channelId == '1'){
			return	$.ajax({url: contextPath + "/data/sample_export_server_list_origin.json", dataType: 'json'});
		}
		
		return	$.ajax({url: contextPath + "/data/sample_export_server_list2_origin.json", dataType: 'json'});
	}
	
	function createEvent(){
			if($('#originList') != undefined){
					$('#originList .removeChannel')
					.unbind('click')
					.on('click',function(){
						var data = {
								channelId:$(this).parents('.card-header').find("input[id='channelId']").val(),
								channelName:$(this).parents('.card-header').find("input[id='channelName']").val()
						};
			            swal({
			                title: "삭제 하시겠습니까?",
			                html: "선택하신 해당 채널 정보("+data.channelName+")가 삭제됩니다.",
			                type: "warning",
			                showCancelButton: true,
			                confirmButtonText: "확인",
			                cancelButtonText: "취소",
							cancelButtonColor: '#f4b30d',
			                closeOnConfirm: false
			            }).then(function(result) {
							  if (result) {
								  //save_account();
							  }
							});
					});
					
					$('#originList .editChannel')
					.unbind('click')
					.on('click',function(){
						var data = {
								channelId:$(this).parents('.card-header').find("input[id='channelId']").val(),
								channelName:$(this).parents('.card-header').find("input[id='channelName']").val()
						};
						
						right_origin.init(data);
					});
			}
	}
	
	
	
	return center_top;
});
