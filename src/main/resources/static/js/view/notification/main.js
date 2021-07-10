
require(['../config'],function () {
	require(['jquery','mustache','moment','daterangepicker','datatables'], 
			function($,Mustache,moment) {	
				function init() {
					createTemplate(createEvent);
				}

				function createTemplate(callback){
					
					var container = $('#row_main');
					
					$.ajax({url: contextPath + "/templates/notification/main.mst", dataType: 'text'})
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
					createSearchEvent();
					createTable();
				}
				
				function createSearchEvent(){
					  $('#startDate').daterangepicker({
					    singleDatePicker: true,
					    startDate: moment()
					  });

					  $('#endDate').daterangepicker({
					    singleDatePicker: true,
					    startDate: moment()
					  });
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
			 		        className: 'selected',
			 		        selector:'td:not(:last-child)'
			 			},
				        "ajax": {
				        	type: "GET",
				            url: contextPath + "/data/sample_notification_list.json",
				            dataType: 'json',
				            dataSrc: "data",
				            cache:false
				        },
				        "columns": [
				            { "title":"발생 시간","data": "created","className":"dt-center" },
				            { "title":"알림 타입","data": "type" },
				            { "title":"알림 이름","data": "name" },
				            { "title":"상태","className":"dt-center","data": "status" },
				            { "title":"설명","data": "description" },
				            { "title":"인지 상태","data": "indicate_status","className":"dt-center" },
				            { "title":"인지 ID","data": "indicate_by" },
				            { "title":"수정 날짜","data": "updated", "className":"dt-center"  },
				            { "title":"상세 정보","className":"dt-center","data": "noti_id", render : function(data){
			            			return '<a href="javascript:popupDetail('+data+')" download><i class="fas fa-file-alt fa-2x"></i></a>';
				            } }
				        ],
			        	rowId: 'noti_id'
				    } );
					
				}
				
				init();
			}
	);
});
