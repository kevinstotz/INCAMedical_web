
function loadClinicTypeTable(data) {
  var row = "";

  row += '<tr>';
  row += '<td><input placeholder="Add Clinic Type" class="" size="73" type="text" id="settings-clinic-type-form-input-name" name="add" value="" />';
  row += '<button class="add-clinic-type" value="0"><i class="fas fa-plus "></i></button></td>';
  row += '<td colspan="2"></td>';
  row += '</tr>';

  $.each(data, function(i, item) {
      row += '<tr id="clinic-type-' + item.id + '">';
      row += '<td>' + item.attributes.type + '</td>';
      row += '<td><button class="active-clinic-type" value="' + item.id + '" name="active"><i class="fas ' + ( ( 1 == item.attributes.active ) ? " fa-toggle-on ": " fa-toggle-off " ) + ' fa-2x"></i></button></td>';
      row += '<td><button class="delete-clinic-type" value="' + item.id + '"><i class="fas fa-trash fa-2x"></i></button></td>';
      row += '</tr>';
  });

  $( "#settings-clinic-type-table > tbody" ).empty().append(row);

  $( "button.delete-clinic-type" ).click(function(event) {
      event.preventDefault();
      var value = $(this).val();

      deleteClinicType(value);
  });

  $( "button.add-clinic-type" ).click(function(event) {
      event.preventDefault();
      var type = $("#settings-clinic-type-form-input-name").val();
      createClinicType(type);
  });

  $( "button.active-clinic-type" ).click(function(event) {
      event.preventDefault();
      var active = false;
      var clinicTypeId = $(this).val();

      $(this).find("i").toggleClass("fa-toggle-on fa-toggle-off");
      if ( $(this).find("i").hasClass("fa-toggle-on") ) {
        active = true;
      }
      updateClinicType( { "id": clinicTypeId, "active": active } );
  });
}

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

function getClinicTypeList(companyId) {
  API_GET(API_ENDPOINT + API_CLINIC_TYPE, "?company=" + companyId , getClinicTypeListSuccess, getClinicTypeListFailure, "text");
}

function getClinicTypeListSuccess(response) {
  loadClinicTypeTable(parseResponse(response));
  loadClinicTypeSelect(parseResponse(response));
}

function getClinicTypeListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//


//---------------------------------------------------//
// Delete clinicType button functions
function deleteClinicType(clinicTypeId) {
  API_DELETE(API_ENDPOINT + API_CLINIC_TYPE, clinicTypeId + "/", deleteClinicTypeSuccess, deleteClinicTypeFailure, "json");
  $("table#settings-clinic-type-table tr[id=clinic-type-" + clinicTypeId + "]").remove();
}

function deleteClinicTypeSuccess(response) {

}

function deleteClinicTypeFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update clinicType button functions
function updateClinicType(data) {
  var clinicType = { "id": data.id, "active": data.active };
  API_UPDATE(API_ENDPOINT + API_CLINIC_TYPE + data.id  + "/", clinicType, updateClinicTypeSuccess, updateClinicTypeFailure, "json");
}

function updateClinicTypeSuccess(response) {
  getClinicTypeList(sessionStorage.getItem("companyId"));
}

function updateClinicTypeFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create ClinicType button functions

function createClinicType(type) {
  var clinicType = { "type": type, "company": sessionStorage.getItem("companyId") };
  API_POST(API_ENDPOINT + API_CLINIC_TYPE, clinicType, createClinicTypeSuccess, createClinicTypeFailure, "json");
}

function createClinicTypeSuccess(response) {
  var data = {};
  sessionStorage.setItem("clinicTypeId", response.data.attributes.id);
  getClinicTypeList(sessionStorage.getItem("companyId"));
}

function createClinicTypeFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
