
//---------------------------------------------------//
// Get Specialty Type List button functions

function getRoleList() {
  API_GET(API_ENDPOINT + API_ROLE, "", getRoleListSuccess, getRoleListFailure, "text");
}

function getRoleListSuccess(response) {
  ROLE_LIST = parseResponse(response);
}

function getRoleListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
