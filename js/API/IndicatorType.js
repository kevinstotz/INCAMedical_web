
//---------------------------------------------------//
// Get Specialty Type List button functions

function getIndicatorTypeList(options) {
  var option = "?";
  if ( options.hasOwnProperty('active') ) { option += "active=" + options.active + "&"; }
  if ( options.hasOwnProperty('company') ) { option += "company=" + options.company + "&"; }
  API_GET(API_ENDPOINT + API_INDICATOR_TYPE, option , getIndicatorTypeListSuccess, getIndicatorTypeListFailure, "text");
}

function getIndicatorTypeListSuccess(response) {
  INDICATOR_TYPE_LIST = parseResponse(response);
  getIndicatorOptionList( { "company": sessionStorage.getItem("companyId"), "active": true } );
}

function getIndicatorTypeListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
