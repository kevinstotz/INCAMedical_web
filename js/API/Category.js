
function loadCategoryTable(data) {
  var row = "";

  row += '<tr>';
  row += '<td><input placeholder="Add new Category" class="" size="73" type="text" id="settings-category-form-input-name" name="add" value="" />';
  row += '<button class="add-category" value="0"><i class="fas fa-plus "></i></button></td>';
  row += '<td colspan="2"></td>';
  row += '</tr>';

  $.each(data, function(i, item) {
      row += '<tr id="category=' + item.id + '">';
      row += '<td>' + item.attributes.name + '</td>';
      row += '<td><button class="active-category" value="' + item.id + '" name="active"><i class="fas ' + ( ( 1 == item.attributes.active ) ? " fa-toggle-on ": " fa-toggle-off " ) + ' fa-2x"></i></button></td>';
      row += '<td><button class="delete-category" value="' + item.id + '"><i class="fas fa-trash fa-2x"></i></button></td>';
      row += '</tr>';
  });

  $( "#settings-category-table > tbody" ).empty().append(row);

  $( "button.delete-category" ).click(function(event) {
      event.preventDefault();
      var value = $(this).val();
      deleteCategory(value);
  });

  $( "button.add-category" ).click(function(event) {
      event.preventDefault();
      var value = $("#settings-category-form-input-name").val();
      createCategory(value);
  });

  $( "button.active-category" ).click(function(event) {
      event.preventDefault();
      var active = false;
      var categoryId = $(this).val();

      $(this).find("i").toggleClass("fa-toggle-on fa-toggle-off");
      if ( $(this).find("i").hasClass("fa-toggle-on") ) {
        active = true;
      }
      updateCategory( { "id": categoryId, "active": active } );
  });
}
//---------------------------------------------------//
// Get Category List button functions

function getCategoryList(companyId) {
  if (companyId > 0) {
    API_GET(API_ENDPOINT + API_CATEGORY + "?company=" + companyId, "", getCategoryListSuccess, getCategoryListFailure, "text");
  } else {
    loadCategoryTable([]);

  }
}

function getCategoryListSuccess(response) {
  var categoryId = sessionStorage.getItem('categoryId');

  loadCategoryTable(parseResponse(response));
  if ( categoryId > 0 ) {
    getCategoryDetail(categoryId);
  }
}

function getCategoryListFailure(response) {
  sessionStorage.setItem("categoryId", 0);
}


function getCategoryDetail(categoryId) {
  API_GET(API_ENDPOINT + API_CATEGORY + categoryId , "/", getCategoryDetailSuccess, getCategoryDetailFailure, "text");
}

function getCategoryDetailSuccess(response) {
  var data = {};
  data = parseResponse(response);
}

function getCategoryDetailFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Delete category button functions
function deleteCategory(categoryId) {
  API_DELETE(API_ENDPOINT + API_CATEGORY, categoryId + "/", deleteCategorySuccess, deleteCategoryFailure, "json");
  $('table#settings-category-table tr#category=' + categoryId).remove();
}

function deleteCategorySuccess(response) {

}

function deleteCategoryFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update category button functions
function updateCategory(data) {
  var category = { "id": data.id, "active": data.active };
  API_UPDATE(API_ENDPOINT + API_CATEGORY + data.id  + "/", category, updateCategorySuccess, updateCategoryFailure, "json");
}

function updateCategorySuccess(response) {
  getCategoryList(sessionStorage.getItem("companyId"));
}

function updateCategoryFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create Category button functions

function createCategory(name) {
  var category = { "name": name, "company": sessionStorage.getItem("companyId") };
  API_POST(API_ENDPOINT + API_CATEGORY, category, createCategorySuccess, createCategoryFailure, "json");
}

function createCategorySuccess(response) {
  var data = {};

  sessionStorage.setItem("categoryId", response.data.attributes.result);
  getCategoryList(sessionStorage.getItem("companyId"));
}

function createCategoryFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
