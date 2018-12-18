
//---------------------------------------------------//
// Get Specialty Type List button functions

function getIndicatorTypeList(companyId) {
  var option = "?";
  option += "company=" + companyId;
  API_GET(API_ENDPOINT + API_INDICATOR_TYPE, option , getIndicatorTypeListSuccess, getIndicatorTypeListFailure, "text");
}

function getIndicatorTypeListSuccess(response) {
  INDICATOR_TYPE_LIST = parseResponse(response);
}

function getIndicatorTypeListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
