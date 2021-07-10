

define(['fullCalendar-jQuery'],
function () {
	
	var right={};
	
	right.initDefault = function initDefault(callback) {
		createTemplate_default(callback);
    }
	
	function createTemplate_default(callback){
		createTemplate({}, createEvent);

	}
	
	right.init = function init(data) {
		createTemplate(data, createEvent);
    }
	
	function createTemplate(data, callback){
		
		var container = $('#row_main_right');
		$.ajax({url: contextPath + "/templates/schedule/right.mst", dataType: 'text'})
		.done(function(template){
			Mustache.parse(template);
			Mustache.to_html(template,data!=null? data:{},{},function(rendered){
				container.html(rendered);
				if(callback!=null && callback!=undefined){
					callback(data);
				}
			});
		})
		.fail(function(){
			alert("Sorry there was an error.");
		});
	}
	
	function createEvent(info){
		createEvent_schedule(info);
	}
	
	function popup_addScheduleDialog(){
		$('#schedule_add').modal({
			  keyboard: false,
			  backdrop: false
			});
	}
	
	function popup_editScheduleDialog(info){
    	var eventObj = info.event;
    	
    	$('#schedule_edit #title').val(eventObj.title);
    	
    	if(eventObj.extendedProps!=null && eventObj.extendedProps!=undefined){
            $('#schedule_edit #subtitle').val(eventObj.extendedProps.subtitle);
            $('#schedule_edit #stream_type').val(eventObj.extendedProps.stream_type);
            $('#schedule_edit #voditems').val(eventObj.extendedProps.voditems);
    	}
        $('#schedule_edit #startTime').val(eventObj.startStr);
        $('#schedule_edit #endTime').val(eventObj.endStr);
        
		$('#schedule_edit').modal({
			  keyboard: false,
			  backdrop: false
			});
	}
	
	function createEvent_schedule(info){

			var container = $('#schedule_list');
					container.fullCalendar({
					noEventsContent: '편성 정보가 없습니다.',
					customButtons: {
						myAddButton: {
							  text: '편성정보 추가',
						      click: function() {
						    	  popup_addScheduleDialog();
						      }
						}
					},
					
					locale: 'kr',
						headerToolbar: {
						        left: '',
						center: 'title',
						right: 'myAddButton'
					},
					views: {
						listWeek: {
							duration:{day:2},
							buttonText: 'list Week'
					    }
					 },
					initialView: 'listWeek',
					initialDate: info.dateStr,
					editable: true,
					dayMaxEvents: false, // allow "more" link when too many events
					events: {
					      url: contextPath + '/data/schedule_sample.json',
					      failure: function(e) {
						  console.log(e);
					      }
					},
					eventClick: function(info) {
						info.jsEvent.preventDefault(); // don't let the browser navigate
						popup_editScheduleDialog(info);
					},
					eventTimeFormat: { // like '14:30:00'
						    hour: '2-digit',
						    minute: '2-digit',
						    second: '2-digit',
						    hourCycle:'h23'
					},
					displayEventEnd:false
			});

	}
	

	return right;
});
