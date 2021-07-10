

define([ 'schedule/right','fullCalendar-jQuery'],
function (right) {
	
	var left={};
	
	left.init = function init() {
		createTemplate3(createEvent);
		right.initDefault();
    }
	
	function createTemplate3(callback){
		
		var container = $('#row_main_left');
		
		$.ajax({url: contextPath + "/templates/schedule/left.mst", dataType: 'text'})
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

		
		 var calendarEl = document.getElementById('main_calendar');
		 var calendar = new FullCalendar.Calendar(calendarEl,{
					dateClick: function(info){ right.init(info);},
					locale: 'kr',
				    headerToolbar: {
				        left: 'prev,next today',
				        center: 'title',
				        right: ''
				    },
				    initialView: 'dayGridMonth',
				    initialDate: '2021-02-12',
				    dayMaxEvents: true,
				    events: {
				          url: contextPath + '/data/schedule_sample.json',
				          failure: function(e) {
				        	  console.log(e);
				          }
				    },
					eventTimeFormat: { hour: '2-digit', minute: '2-digit',hourCycle:'h23'}
		 });

		 calendar.render();
		
	}

	
	return left;
});
