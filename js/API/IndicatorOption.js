
//---------------------------------------------------//
// Get Option

function getIndicatorOptionList(options) {
  var option = "?";
  if ( options.hasOwnProperty('active') ) { option += "active=" + options.active + "&"; }
  if ( options.hasOwnProperty('company') ) { option += "company=" + options.company + "&"; }
  API_GET(API_ENDPOINT + API_INDICATOR_OPTION, option, getIndicatorOptionListSuccess, getIndicatorOptionListFailure, "text");
}

function getIndicatorOptionListSuccess(response) {
  INDICATOR_OPTION_LIST = parseResponse(response);
  getIndicatorList( { "company": sessionStorage.getItem("companyId") } );
}

function getIndicatorOptionListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
