
function loadCategorySelect(data) {
  var options = '<option value="0">Add New Category</option>';
  var activeCategoryId = sessionStorage.getItem('categoryId');
  var selected = "";

  for (var item in data) {
      if (activeCategoryId == data[item].id) { selected = "selected";}
      options += '<option ' + selected + ' value=' + data[item].id + '>' + textLength(data[item].attributes.name, 30) + '</option>';
      selected = "";
  }

  if (activeCategoryId == 0) {
    $( "#update-category-button" ).hide();
    $( "#create-category-button" ).show();
    //$( "#delete-category-button" ).attr('disabled', true);
  } else {
    //$( "#delete-category-button" ).attr('disabled', false);
    $( "#update-category-button" ).show();
    $( "#create-category-button" ).hide();
  }

  $( "#settings-category-select" ).find('option').remove().end().append(options);
}

function loadCategoryTable(data) {
  var options = "";
  $.each(data, function(i, item) {
      options += '<tr>' + '<td>' + item.attributes.short_name + '</td>';

      options += '<td>' + item.attributes.name + '</td>';

      options += '<td><div class="">';
      options += '<input type="checkbox" id="settings-category-table-active-' + item.id + '"' + ( ( 1 == item.attributes.active ) ? " checked ": "" ) + ' name="horns"> ';
      options += '</div> </td> </tr>';
  });

  $( "#settings-category-table > tbody" ).empty().append(options);
}
//---------------------------------------------------//
// Get Category List button functions

function getCategoryList(companyId) {
  if (companyId > 0) {
    API_GET(API_ENDPOINT + API_CATEGORY + "?company=" + companyId, "", getCategoryListSuccess, getCategoryListFailure, "text");
  } else {
    loadCategorySelect([]);
    loadCategoryTable([]);
  }
}

function getCategoryListSuccess(response) {
  var categoryId = sessionStorage.getItem('categoryId');

  loadCategorySelect(parseResponse(response));
  loadCategoryTable(parseResponse(response));
  if ( categoryId > 0 ) {
    getCategoryDetail(categoryId);
  }
}

function getCategoryListFailure(response) {
  sessionStorage.setItem("categoryId", 0);
  loadCategorySelect([]);
}


function getCategoryDetail(categoryId) {
  API_GET(API_ENDPOINT + API_CATEGORY + categoryId , "/", getCategoryDetailSuccess, getCategoryDetailFailure, "text");
}

function getCategoryDetailSuccess(response) {
  var data = {};
  data = parseResponse(response);
  $('#settings-category-select-form :input').each(function() {
    var $el = $(this)[0];
    switch($el.name) {
        case 'name':
            $(this).val(data.attributes['name']);
            sessionStorage.setItem('categoryId', data.id);
            break;
        default:
            break;
    }
  });
}

function getCategoryDetailFailure(response) {
  console.log(response);
  loadCategorySelect(parseResponse(response));
}
//---------------------------------------------------//

//---------------------------------------------------//
// Delete category button functions
function deleteCategory(categoryId) {
  API_DELETE(API_ENDPOINT + API_CATEGORY, categoryId + "/", deleteCategorySuccess, deleteCategoryFailure, "json");
}

function deleteCategorySuccess(response) {
  $("#settings-category-select-form")[0].reset();
  sessionStorage.setItem("categoryId", 0);
  getCategoryList(sessionStorage.getItem("companyId"));
}

function deleteCategoryFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update category button functions
function updateCategory(data) {
  category = { "id": sessionStorage.getItem("categoryId"), "name": data.name };
  API_UPDATE(API_ENDPOINT + API_CATEGORY + sessionStorage.getItem("categoryId")  + "/", category, updateCategorySuccess, updateCategoryFailure, "json");
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

function createCategory(companyId, data) {
  var category = { "name": data.name, "company": companyId };
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
