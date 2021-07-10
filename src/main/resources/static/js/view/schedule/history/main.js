
require(['../../config'], function () {
	require(['mustache'],function(Mustache) {
		window.Mustache = Mustache;
		var theParent = {};
		window.theParent = theParent;
	require(['datatables'], function() {	
		
		theParent.initialize = function() {
			createTemplate(createEvent);
		}

		function createTemplate(callback){
			
			var container = $('#row_main');
			
			$.ajax({url: contextPath + "/templates/schedule/history/main.mst", dataType: 'text'})
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
			createTable();
		}
		

		function createTable(){
			
			$('#listTable').DataTable( {
				destroy: true,
		        paging: true,
		        bAutoWidth: false,
	 			searching: false,
	 			bServerSide : false,
	 			bSort : false,
	 			stateSave: false,
	 			"pageLength":15,
	 			"lengthChange": false,
	 			select:{
	 				style:     'single',
	 		        className: 'selected'
	 			},
		        "ajax": {
		        	type: "GET",
		            url: contextPath + "/data/sample_schedule_history_list.json",
		            dataType: 'json',
		            dataSrc: "data",
		            cache:false
		        },
		        "columns": [
		            { "title":"요청 날짜","data": "created", "className":"dt-center"  },
		            { "title":"채널","data": "channel_name"  },
		            { "title":"편성 시작","data": "start_date", "className":"dt-center"  },
		            { "title":"편성 종료","data": "end_date", "className":"dt-center"  },
		            { "title":"성공", "data": "success_count", "className":"dt-center" },
		            { "title":"실패", "data": "fail_count", "className":"dt-center" },
		            { "title":"입수", "data": "type", "className":"dt-center" },
		            { "title":"상태", "data": "status", "className":"dt-center" },
		            { "title":"알림 상태","data": "notification_status", "className":"dt-center" },
		            { "title":"상세 설명","data": "description" },
		            { "title":"수정 날짜","data": "updated", "className":"dt-center"  }
		        ],
	        	rowId: 'id'
		    } );
			
		}
		
		theParent.popupDetail = function(id){
			console.log("theParent.popupDetail : " + id);
		}
		
		theParent.initialize();
	});
	});
});
