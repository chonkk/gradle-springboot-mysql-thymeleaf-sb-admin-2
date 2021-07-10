
define([],
function () {
	
	var right={};
	
	right.init = function init(data) {
		createTemplate(data, createEvent);
    }

	
	function createTemplate(data, callback){
		
		if(typeof data !== 'object'){
			data =  {};
		}

		$.ajax({url: contextPath + "/templates/channel/right.mst", dataType: 'text'})
		.done(function(template){
			Mustache.parse(template);
			Mustache.to_html(template,data,{},function(rendered){
				 $('#row_main_right').html(rendered);
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

        $('#saveButton').unbind('click').on( 'click', function () {
        	
        	 var $btn = $(this);
        	 
        	 var $this = $(this);
        	  $this.data("ohtml", $this.html());
        	  var nhtml = "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> " + this.dataset.buttonSpinner;
        	  $this.html(nhtml);
        	  $this.attr("disabled", true);
        	  
        	    // simulating a timeout
        	    setTimeout(function () {
        	    	$('#saveButton').html($('#saveButton').data("ohtml"));
        	    	  $('#saveButton').attr("disabled", false);
        	    }, 1000);
        	    
        	theParent.saveButton();
		});


        $('#cancelSaveButton').unbind('click').on( 'click', function () {
        	theParent.cancelButton();
		});
	}
	
	
	
	return right;
});
