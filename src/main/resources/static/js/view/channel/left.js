
define(['channel/center','channel/right','jquery','bootstrap'],
function (center, right) {
	
	var left={};
	
	left.init = function init() {
		
		//$.when(createTemplate(),createEvent())
		//.done(function(){})
		//.fail(function(){alert("Sorry there was an error.");});
		
		createTemplate(createEvent);
		center.init();
		right.init();
    }

	function createTemplate(callback){
			
		$.when(loadTemplate(), loadChannel())
		.fail(function(){alert("Sorry there was an error.");})
		.done(function(template, result){
			var temp = template[0];
			Mustache.parse(temp);
			Mustache.to_html(temp, result[0],{},function(rendered){
				 $('#row_main_left').html(rendered);
					if(typeof callback === 'function'){
						callback();
					}
			});
			
		});
		
	}
	
	function loadTemplate(){
		 return $.ajax({url: contextPath + "/templates/channel/left.mst", dataType: 'text'});
	}
	
	function loadChannel(){
		
		return	$.ajax({url: contextPath + "/data/sample_channel_list.json", dataType: 'json'});
	}
	
	function createEvent(){
		//$('#channelList .dropdown-toggle').dropdown();
		$('#channelList .removeChannel')
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
		
		$('#channelList .editChannel')
		.unbind('click')
		.on('click',function(){
			var data = {
					channelId:$(this).parents('.card-header').find("input[id='channelId']").val(),
					channelName:$(this).parents('.card-header').find("input[id='channelName']").val()
			};
			
		center.init(data);
		right.init(data);
		});
		

		
	}
	
	
	
	return left;
});
