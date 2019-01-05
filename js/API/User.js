
function loadUserTable(data) {
  var row = "";

  row += '<tr>';
  row += '<td><input placeholder="Add User" class="" size="73" type="text" id="settings-user-form-input-name" name="add" value="" />';
  row += '<button class="add-user" value="0"><i class="fas fa-plus "></i></button></td>';
  row += '<td colspan="2"></td>';
  row += '</tr>';

  $.each(data, function(i, item) {
      row += '<tr id="user-' + item.id + '">';
      row += '<td>' + item.attributes.email + '</td>';
      row += '<td>' + item.attributes.last_login + '</td>';
      row += '<td><button class="active-user" value="' + item.id + '" name="is_active"><i class="fas ' + ( ( 1 == item.attributes.is_active ) ? " fa-toggle-on ": " fa-toggle-off " ) + ' fa-2x"></i></button></td>';
      row += '<td><button class="delete-user" value="' + item.id + '"><i class="fas fa-trash fa-2x"></i></button></td>';
      row += '</tr>';
  });

  $( "#settings-user-table > tbody" ).empty().append(row);

  $( "button.delete-user" ).click(function(event) {
      event.preventDefault();
      var value = $(this).val();

      deleteUser(value);
  });

  $( "button.add-user" ).click(function(event) {
      event.preventDefault();
      var type = $("#settings-user-form-input-name").val();
      createUser(type);
  });

  $( "button.active-user" ).click(function(event) {
      event.preventDefault();
      var active = false;
      var userId = $(this).val();

      $(this).find("i").toggleClass("fa-toggle-on fa-toggle-off");
      if ( $(this).find("i").hasClass("fa-toggle-on") ) {
        active = true;
      }
      updateUser( { "id": userId, "is_active": active } );
  });
}

function loadUserSelect(data) {
  var options = '<option value="0">Select Area Type</option>';
  var userId = sessionStorage.getItem('userId');
  var selected = "";
  //$("#settings-audit-area-form-select-user")[0].reset();

  for (var item in data) {
      if (userId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + data[item].attributes['type'] + '</option>';
      selected = "";
  }

  $( "#settings-audit-area-form-select-user" ).find('option').remove().end().append(options)
}

//---------------------------------------------------//
// Get User List button functions

function getUserList(companyId) {
  API_GET(API_ENDPOINT + API_USER, "?company=" + companyId , getUserListSuccess, getUserListFailure, "text");
}

function getUserListSuccess(response) {
  console.log(response);
  loadUserTable(parseResponse(response));
  loadUserSelect(parseResponse(response));
}

function getUserListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//


//---------------------------------------------------//
// Delete user button functions
function deleteUser(userId) {
  API_DELETE(API_ENDPOINT + API_USER, userId + "/", deleteUserSuccess, deleteUserFailure, "json");
  $("table#settings-user-table tr[id=user-" + userId + "]").remove();
}

function deleteUserSuccess(response) {

}

function deleteUserFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update user button functions
function updateUser(data) {
  var user = { "id": data.id, "is_active": data.is_active };
  API_UPDATE(API_ENDPOINT + API_USER + data.id  + "/", user, updateUserSuccess, updateUserFailure, "json");
}

function updateUserSuccess(response) {
  getUserList(sessionStorage.getItem("companyId"));
}

function updateUserFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create User button functions

function createUser(type) {
  var user = { "type": type, "company": sessionStorage.getItem("companyId") };
  API_POST(API_ENDPOINT + API_CLINIC_TYPE, user, createUserSuccess, createUserFailure, "json");
}

function createUserSuccess(response) {
  var data = {};
  sessionStorage.setItem("userId", response.data.attributes.id);
  getUserList(sessionStorage.getItem("companyId"));
}

function createUserFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
