
function loadClinicTypeSelect(data) {
  var options = '<option value="0">Select Area Type</option>';
  var clinicTypeId = sessionStorage.getItem('clinicTypeId');
  var selected = "";
  //$("#settings-audit-area-form-select-clinic-type")[0].reset();

  for (var item in data) {
      if (clinicTypeId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + data[item].attributes['type'] + '</option>';
      selected = "";
  }

  $( "#settings-audit-area-form-select-clinic-type" ).find('option').remove().end().append(options)
}

//---------------------------------------------------//
// Get Clinic List button functions

function getClinicTypeList() {
  API_GET(API_ENDPOINT + API_CLINIC_TYPE, "", getClinicTypeListSuccess, getClinicTypeListFailure, "text");
}

function getClinicTypeListSuccess(response) {
  loadClinicTypeSelect(parseResponse(response));
}

function getClinicTypeListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
