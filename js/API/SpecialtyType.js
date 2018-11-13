
function loadSpecialtyTypeSelect(data) {
  var options = '<option value="0">Select Area Specialty</option>';
  var specialtyId = sessionStorage.getItem('specialtyId');
  var selected = "";
  //$("#company-clinic-type-dropdown")[0].reset();

  for (var item in data) {
      if (specialtyId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + textLength(data[item].attributes['type'], 50) + '</option>';
      selected = "";
  }

  $( "#settings-audit-area-form-select-specialty-type" ).find('option').remove().end().append(options)
}


//---------------------------------------------------//
// Get Specialty Type List button functions

function getSpecialtyTypeList() {
  API_GET(API_ENDPOINT + API_SPECIALTY_TYPE, "", getSpecialtyTypeListSuccess, getSpecialtyTypeListFailure, "text");
}

function getSpecialtyTypeListSuccess(response) {
  loadSpecialtyTypeSelect(parseResponse(response));
}

function getSpecialtyTypeListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
