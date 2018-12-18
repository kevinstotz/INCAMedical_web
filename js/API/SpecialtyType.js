
function loadSpecialtyTypeTable(data) {
  var row = "";

  row += '<tr>';
  row += '<td><input placeholder="Add Specialty Type" class="" size="73" type="text" id="settings-specialty-type-form-input-name" name="add" value="" />';
  row += '<button class="add-specialty-type" value="0"><i class="fas fa-plus "></i></button></td>';
  row += '<td colspan="2"></td>';
  row += '</tr>';

  $.each(data, function(i, item) {
      row += '<tr id="specialty-type-' + item.id + '">';
      row += '<td>' + item.attributes.type + '</td>';
      row += '<td><button class="active-specialty-type" value="' + item.id + '" name="active"><i class="fas ' + ( ( 1 == item.attributes.active ) ? " fa-toggle-on ": " fa-toggle-off " ) + ' fa-2x"></i></button></td>';
      row += '<td><button class="delete-specialty-type" value="' + item.id + '"><i class="fas fa-trash fa-2x"></i></button></td>';
      row += '</tr>';
  });

  $( "#settings-specialty-type-table > tbody" ).empty().append(row);

  $( "button.delete-specialty-type" ).click(function(event) {
      event.preventDefault();
      var value = $(this).val();

      deleteSpecialtyType(value);
  });

  $( "button.add-specialty-type" ).click(function(event) {
      event.preventDefault();
      var type = $("#settings-specialty-type-form-input-name").val();
      createSpecialtyType(type);
  });

  $( "button.active-specialty-type" ).click(function(event) {
      event.preventDefault();
      var active = false;
      var specialtyTypeId = $(this).val();

      $(this).find("i").toggleClass("fa-toggle-on fa-toggle-off");
      if ( $(this).find("i").hasClass("fa-toggle-on") ) {
        active = true;
      }
      updateSpecialtyType( { "id": specialtyTypeId, "active": active } );
  });
}


function loadSpecialtyTypeSelect(data) {
  var options = '<option value="0">Select Area Specialty</option>';
  var specialtyId = sessionStorage.getItem('specialtyId');
  var selected = "";

  for (var item in data) {
      if (specialtyId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + textLength(data[item].attributes['type'], 50) + '</option>';
      selected = "";
  }

  $( "#settings-audit-area-form-select-specialty-type" ).find('option').remove().end().append(options)
}


//---------------------------------------------------//
// Get Specialty Type List button functions

function getSpecialtyTypeList(companyId) {
  API_GET(API_ENDPOINT + API_SPECIALTY_TYPE, "?company=" + companyId , getSpecialtyTypeListSuccess, getSpecialtyTypeListFailure, "text");
}

function getSpecialtyTypeListSuccess(response) {
  loadSpecialtyTypeTable(parseResponse(response));
  loadSpecialtyTypeSelect(parseResponse(response));
}

function getSpecialtyTypeListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//


//---------------------------------------------------//
// Delete specialtyType button functions
function deleteSpecialtyType(specialtyTypeId) {
  API_DELETE(API_ENDPOINT + API_SPECIALTY_TYPE, specialtyTypeId + "/", deleteSpecialtyTypeSuccess, deleteSpecialtyTypeFailure, "json");
  $("table#settings-specialty-type-table tr[id=specialty-type-" + specialtyTypeId + "]").remove();
}

function deleteSpecialtyTypeSuccess(response) {

}

function deleteSpecialtyTypeFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update specialtyType button functions
function updateSpecialtyType(data) {
  var specialtyType = { "id": data.id, "active": data.active };
  API_UPDATE(API_ENDPOINT + API_SPECIALTY_TYPE + data.id  + "/", specialtyType, updateSpecialtyTypeSuccess, updateSpecialtyTypeFailure, "json");
}

function updateSpecialtyTypeSuccess(response) {
  getSpecialtyTypeList(sessionStorage.getItem("companyId"));
}

function updateSpecialtyTypeFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create SpecialtyType button functions

function createSpecialtyType(type) {
  var specialtyType = { "type": type, "company": sessionStorage.getItem("companyId") };
  API_POST(API_ENDPOINT + API_SPECIALTY_TYPE, specialtyType, createSpecialtyTypeSuccess, createSpecialtyTypeFailure, "json");
}

function createSpecialtyTypeSuccess(response) {
  var data = {};
  sessionStorage.setItem("specialtyTypeId", response.data.attributes.id);
  getSpecialtyTypeList(sessionStorage.getItem("companyId"));
}

function createSpecialtyTypeFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
