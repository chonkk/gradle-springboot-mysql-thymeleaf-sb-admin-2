
var webjars = {
    versions: { 
    			'requirejs': '2.3.6', 
    			'jquery': '3.6.0',
    			'jquery-easing': '1.4.1',
    			'bootstrap':'4.3.1',
    			'bootstrap-toggle':'2.2.2',
    			'startbootstrap-sb-admin-2':'4.0.6',
    			'require-css':'0.1.10',
    			'datatables':'1.10.19',
    			'datatables.net-select':'1.3.1',
    			'fullcalendar':'5.0.1',
    			'momentjs':'2.29.1',
    			'mustachejs':'2.2.1',
    			'sweetalert2':'7.0.6',
    			'moment':'2.27.0',
    			'bootstrap-daterangepicker':'3.0.5'
    		},
    path: function(webjarid, path) {
        return contextPath + '/webjars/' + webjarid + '/' + webjars.versions[webjarid] + '/' + path;
    }
};
	
        require.config({
        	baseUrl: contextPath + '/js/view',
            paths: {
            	"css": webjars.path("require-css", "css") ,
            	"fontawesome-free-css": webjars.path("startbootstrap-sb-admin-2", "vendor/fontawesome-free/css/all.min") ,
            	"sb-admin-2-css": webjars.path("startbootstrap-sb-admin-2", "css/sb-admin-2") ,
            	"sb-admin-2": webjars.path("startbootstrap-sb-admin-2", "js/sb-admin-2") ,
                'jquery': webjars.path('jquery','dist/jquery.min'),
                'jquery-easing': webjars.path('jquery-easing','jquery.easing.min'),
                'bootstrap': webjars.path('bootstrap','js/bootstrap.bundle.min'),
                'bootstrap-css': webjars.path('bootstrap','css/bootstrap.min'),
                'bootstrap-toggle': webjars.path('bootstrap-toggle','js/bootstrap2-toggle.min'),
                'bootstrap-toggle-css': webjars.path('bootstrap-toggle','css/bootstrap2-toggle.min'),

                //DataTables core
                'datatables-css': contextPath + '/css/datatables/1.10.23/css/jquery.dataTables.min',
                'datatables-bs-css': webjars.path('startbootstrap-sb-admin-2','vendor/datatables/dataTables.bootstrap4.min'),
                'datatables' : webjars.path('startbootstrap-sb-admin-2','vendor/datatables/dataTables.bootstrap4.min'),
                'datatables.net' : webjars.path('startbootstrap-sb-admin-2','vendor/datatables/jquery.dataTables.min'),
                'datatables.net-bs' : webjars.path('startbootstrap-sb-admin-2','vendor/datatables/dataTables.bootstrap4.min'),
                
                //Dependencies
               // 'datatables.net-autofill' : 'DataTables/AutoFill-2.1.0/js/dataTables.autoFill.min',
                //'datatables.net-editor' : "DataTables/Editor-1.5.2/js/dataTables.editor.min",
                //'datatables-editor-bootstrap' : "DataTables/Editor-1.5.2/js/editor.bootstrap.min",
               // 'datatables.net-buttons' : 'DataTables/Buttons-1.1.0/js/dataTables.buttons.min',
                //'datatables.net-buttons' : 'DataTables/Buttons-1.1.0/js/buttons.bootstrap.min',

                //Extra modules
               // 'datatables.net-buttons-bs' : 'DataTables/Buttons-1.1.0/js/buttons.bootstrap.min',
               // 'datatables.net-colreorder' : "DataTables/ColReorder-1.3.0/js/dataTables.colReorder.min",
               // 'datatables.net-rowreorder' : "DataTables/RowReorder-1.1.0/js/dataTables.rowReorder.min",
               // 'datatables.net-scroller' : "DataTables/Scroller-1.4.0/js/dataTables.scroller.min",
                'datatables.net-select' : webjars.path('datatables.net-select','js/dataTables.select.min'),
                'mustache' : webjars.path('mustachejs','mustache.min'),
                
                //fullcalendar modules
                'fullcalendar': webjars.path("fullcalendar", "main.min"),
                'fullcalendar-css': webjars.path("fullcalendar", "main.min"),
                'fullCalendar-jQuery': contextPath + '/js/lib/fullCalendar_jQuery',
                'moment': webjars.path("momentjs", "moment"),

                'swal': webjars.path("sweetalert2", "dist/sweetalert2.all.min"),
                'swal-css': webjars.path("sweetalert2", "dist/sweetalert2"),
                'simplePopup': contextPath + '/js/lib/simplePopup',
                'daterangepicker': webjars.path('bootstrap-daterangepicker','daterangepicker'),
                //'moment': webjars.path("moment", "dist/moment"),
                'daterangepicker-css': webjars.path('bootstrap-daterangepicker','daterangepicker')

                //some modules are still missing from the full package...
            },
            shim: {
                'jquery' : {
                    exports : 'jquery'
                },
                'moment' : {
                    exports : 'moment'
                },
                'bootstrap-toggle' : {
                    deps : [ 'jquery','css!bootstrap-toggle-css' ]
                },
                'bootstrap' : {
                    deps : [ 'jquery','jquery-easing'],
                    exports : 'Bootstrap'
                },
                'sb-admin-2' : {
                    deps : [ 'jquery','jquery-easing','bootstrap']
                },
                'mustache' : {
                	deps : ['jquery'],
                   exports : 'Mustache'
                },
                'datatables' : {
                    deps: ['jquery','css!datatables-css','css!datatables-bs-css','datatables.net-select'],
                    exports:'DataTable'
                },
                'fullcalendar': [ "moment","css!fullcalendar-css"] ,
                'fullCalendar-jQuery': ['bootstrap', "fullcalendar"] ,
                'script': {
                    deps: ['datatables','datatables.net-select']//,'datatables.net-colreorder','datatables.net-rowreorder','datatables.net-scroller','datatables.net-select']
                },
                'daterangepicker' : {
                    deps: ['moment','css!daterangepicker-css']  
                },
                'swal' : {
                    deps: ['jquery','css!swal-css']  ,
                    exports : 'swal'
                }
            },
            deps:['bootstrap','sb-admin-2'],
            callback: function(){
				onLoadSidebar();
            }
        });
        
        //if(window.Mustache==null || window.Mustache == undefined){ require(['config'], require(['mustache'],function(Mustache){window.Mustache =  Mustache;}));};
