
var INDICATOR_OPTIONS_LIST = {};
var INDICATOR_TYPE_LIST = {};

$.fn.isInSession = function(variable) {
  if ( (sessionStorage.getItem(variable) === null) ||
       (sessionStorage.getItem(variable) == 0) ||
       (sessionStorage.getItem(variable) == undefined) ||
       (typeof sessionStorage.getItem(variable) == 'undefined') ) {
      return true;
  }
  return false;
}

$( document ).ready(function() {

    if ( !$(this).isInSession(sessionStorage.getItem("companyId")) ) {
      sessionStorage.setItem("companyId", 0);
    }
    sessionStorage.setItem("areaId", 0);
    sessionStorage.setItem("categoryId", 0);
    sessionStorage.setItem("indicatorId", 0);
    sessionStorage.setItem("templateId", 0);

    if ( !$(this).isInSession(sessionStorage.getItem("areaId")) ) {
      sessionStorage.setItem("areaId", 0);
    }
    if ( !$(this).isInSession(sessionStorage.getItem("templateId")) ) {
      sessionStorage.setItem("templateId", 0);
    }
    if ( !$(this).isInSession(sessionStorage.getItem("categoryId")) ) {
      sessionStorage.setItem("categoryId", 0);
    }
    if ( !$(this).isInSession(sessionStorage.getItem("indicatorId")) ) {
      sessionStorage.setItem("indicatorId", 0);
    }

});
