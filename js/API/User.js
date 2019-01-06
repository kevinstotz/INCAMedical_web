

function loadRoleSelect(role) {
  var options = '<option value="0">Select Role</option>';
  var selected = "";

  for (var item in ROLE_LIST) {
      if (role == ROLE_LIST[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + ROLE_LIST[item].id + '>' + ROLE_LIST[item].attributes['role'] + '</option>';
      selected = "";
  }

  return options;
}


function buildRoleSelect(role) {
  var row = "";

  row += '<select class="form-control settings-user-form-select-role" id="settings-user-form-select-role" name="settings-user-form-select-role">';
  row += loadRoleSelect(role);
  row += '</select>';

  return row;
}

function loadUserTable(data) {
  var row = "";

  row += '<tr>';
  row += '<td><input placeholder="Add User" class="" size="57" type="text" id="settings-user-form-input-name" name="add" value="" />';
  row += '<button class="add-user" value="0"><i class="fas fa-plus "></i></button></td>';
  row += '<td colspan="5"></td>';
  row += '</tr>';

  $.each(data, function(i, item) {
      row += '<tr data-id="' + item.id + '">';
      row += '<td>' + item.attributes.email + '</td>';
      row += '<td data-id=' + item.attributes.role.id + '>' + buildRoleSelect(item.attributes.role.id) + '</td>';
      row += '<td data-id=' + item.attributes.status.id + '>' + item.attributes.status.status + '</td>';
      row += '<td>' + formatDate(new Date(item.attributes.last_login)) + '</td>';
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
      var email = $("#settings-user-form-input-name").val();
      createUser(email);
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


//---------------------------------------------------//
// Get User List button functions

function getUserList(companyId) {
  API_GET(API_ENDPOINT + API_USER, "?company=" + companyId , getUserListSuccess, getUserListFailure, "text");
}

function getUserListSuccess(response) {
  loadUserTable(parseResponse(response));
  //loadRoleSelect(ROLE_LIST);
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

function createUser(email) {
  var user = { "email": email, "password": "password", "confirm_password": "password", "firstname": "", "lastname": ""  };
  API_POST(API_ENDPOINT + API_USER_REGISTER, user, createUserSuccess, createUserFailure, "json");
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
