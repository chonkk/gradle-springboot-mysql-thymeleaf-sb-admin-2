/**
 * Iframe 내의 jsp 파일이 사용하는 simplePopup js
 *  - Dependency : bootbox dialog 이용 
 *  - 용도: 단순 알림 팝업
 */

/**
 * btnConfigList 샘플
   btnConfigList = {
		save: {
			label: "저장",
			className: "btn-primary",
			callback: function() {
				//alert("저장 button");
				
				if(true)
					bootbox.alert("Your message here…");
			}
		},
		취소: {
			label: "취소",
			className: "btn-primary",
			callback: function() {
				alert("저장 button");
			}
		}
	}
 * 
 */
//
function simplePopupByButtonClick(titleString, popType, btnId, messageHtmlStr, btnConfigList){
	$('#'+btnId).on('click', function () {

		sweetAlert({
			
			title: titleString,
			
			text: messageHtmlStr,

			buttons: btnConfigList,

		});
		
		//console.log(2, $('.modal-header:not(.castis-modal-header)'));
		//var header = window.parent.$('.modal-header:not(.castis-modal-header)');
		var header = $('.modal-header:not(.castis-modal-header)');
		changeHeaderStyle(header, popType);
	});
}

function simplePopup(titleString, popType, messageHtmlStr, btnConfigList){

	sweetAlert({
		
		title: titleString,
		
		text: messageHtmlStr,

		buttons: btnConfigList

	});
	
	var dialog = $('.modal-dialog:not(.castis-modal-dialog)');
	dialog.addClass('modal-sm');
	dialog.css('width', '500px').css('margin-top', '100px');
		
	var header = $('.modal-header:not(.castis-modal-header)');
	changeHeaderStyle(header, popType);
}

//popup이 표시될 때 항상 새로 만들어지는 경우만 사용해야함
function changeHeaderStyle(header, style){
	if(style == 'info'){
		header.addClass('alert alert-info');
	}else if(style == 'success'){
		header.addClass('alert alert-success');
	}else if(style == 'danger'){
		header.addClass('alert alert-danger');
	}else{
		header.addClass('alert');
	}
}

function ssoSessionOutAjaxHandler(ajaxResult){
	
	if(ajaxResult.match('<!DOCTYPE')){
		simplePopup('이 페이지에 접근 권한이 없습니다.', "danger", '세션이 만료되었습니다. 다시 로그인 해주세요.', {OK: {label: "OK",className: "btn-danger",callback:parent.logOut}});
		setTimeout(parent.logOut, 3000);
	}else{
		simplePopup('ERROR', "danger", ajaxResult, {OK: {label: "OK",className: "btn-danger"}});
	}
}

function ajaxErrorHandler(jqXHR, status){
	
    var ajaxResult = '';
    if (jqXHR.status === 0 ) {
    	ajaxResult = 'Not connect. Verify Network.';
    } else if (jqXHR.status == 401) {
		simplePopup('이 페이지에 접근 권한이 없습니다.', "danger", '세션이 만료되었습니다. 다시 로그인 해주세요.', {OK: {label: "OK",className: "btn-danger",callback:parent.logOut}});
		setTimeout(parent.logOut, 3000);
		return;
    } else if (jqXHR.status == 403) {
		simplePopup('이 페이지에 접근 권한이 없습니다.', "danger", '세션이 만료되었습니다. 다시 로그인 해주세요.', {OK: {label: "OK",className: "btn-danger",callback:parent.logOut}});
		setTimeout(parent.logOut, 3000);
		return;
    } else if (jqXHR.status == 404) {
    	ajaxResult = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
    	ajaxResult = 'Internal Server Error [500].';
    } else if (status === 'parsererror') {
    		if(jqXHR.responseText != null && jqXHR.responseText!=undefined && jqXHR.responseText.match('<!DOCTYPE')){
    			simplePopup('이 페이지에 접근 권한이 없습니다.', "danger", '세션이 만료되었습니다. 다시 로그인 해주세요.', {OK: {label: "OK",className: "btn-danger",callback:parent.logOut}});
    			setTimeout(parent.logOut, 3000);
    			return;
    		}else{
            	ajaxResult = 'Requested JSON parse failed.';
    		}
    } else if (status === 'timeout') {
    	ajaxResult = 'Time out error.';
    } else if (status === 'abort') {
    	ajaxResult = 'Ajax request aborted.';
    } else {
    	ajaxResult = jqXHR.responseText;
    }
    
	if(ajaxResult.match('<!DOCTYPE')){
		simplePopup('이 페이지에 접근 권한이 없습니다.', "danger", '세션이 만료되었습니다. 다시 로그인 해주세요.', {OK: {label: "OK",className: "btn-danger",callback:parent.logOut}});
		setTimeout(parent.logOut, 3000);
		return;
	}else{
		simplePopup('ERROR', "danger", ajaxResult, {OK: {label: "OK",className: "btn-danger"}});
	}
}
