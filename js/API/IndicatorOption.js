
function loadIndicatorOptionTable(data) {
  var row = "";

  row += '<tr>';
  row += '<td><input placeholder="Add Indicator Option" class="" size="73" type="text" id="settings-indicator-option-form-input-name" name="add" value="" />';
  row += '<button class="add-indicator-option" value="0"><i class="fas fa-plus "></i></button></td>';
  row += '<td colspan="2"></td>';
  row += '</tr>';

  $.each(data, function(i, item) {
      row += '<tr id="indicator-option-' + item.id + '">';
      row += '<td>' + item.attributes.option + '</td>';
      row += '<td><button class="active-indicator-option" value="' + item.id + '" name="active"><i class="fas ' + ( ( 1 == item.attributes.active ) ? " fa-toggle-on ": " fa-toggle-off " ) + ' fa-2x"></i></button></td>';
      row += '<td><button class="delete-indicator-option" value="' + item.id + '"><i class="fas fa-trash fa-2x"></i></button></td>';
      row += '</tr>';
  });

  $( "#settings-indicator-options-table > tbody" ).empty().append(row);

  $( "button.delete-indicator-option" ).click(function(event) {
      event.preventDefault();
      var value = $(this).val();
      deleteIndicatorOption(value);
  });

  $( "button.add-indicator-option" ).click(function(event) {
      event.preventDefault();
      var type = $("#settings-indicator-option-form-input-name").val();
      createIndicatorOption(type);
  });

  $( "button.active-indicator-option" ).click(function(event) {
      event.preventDefault();
      var active = false;
      var indicatorOptionId = $(this).val();

      $(this).find("i").toggleClass("fa-toggle-on fa-toggle-off");
      if ( $(this).find("i").hasClass("fa-toggle-on") ) {
        active = true;
      }
      updateIndicatorOption(indicatorOptionId, active);
  });
}

//---------------------------------------------------//
// Get Option

function getIndicatorOptionList(companyId) {
  var option = "?";
  option += "company=" + companyId;
  API_GET(API_ENDPOINT + API_INDICATOR_OPTION, option, getIndicatorOptionListSuccess, getIndicatorOptionListFailure, "text");
}

function getIndicatorOptionListSuccess(response) {
  INDICATOR_OPTIONS_LIST = parseResponse(response);
  loadIndicatorOptionTable(INDICATOR_OPTIONS_LIST);
}

function getIndicatorOptionListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Delete indicatorOption button functions
function deleteIndicatorOption(indicatorOptionId) {
  API_DELETE(API_ENDPOINT + API_INDICATOR_OPTION, indicatorOptionId + "/", deleteIndicatorOptionSuccess, deleteIndicatorOptionFailure, "json");
  $("table#settings-indicator-options-table tr[id=indicator-option-" + indicatorOptionId + "]").remove();
}

function deleteIndicatorOptionSuccess(response) {
  //console.log(response);
}

function deleteIndicatorOptionFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update indicatorOption button functions
function updateIndicatorOption(indicatorOptionId, active) {
  var indicatorOption = { "active": active };
  API_UPDATE(API_ENDPOINT + API_INDICATOR_OPTION + indicatorOptionId  + "/", indicatorOption, updateIndicatorOptionSuccess, updateIndicatorOptionFailure, "json");
}

function updateIndicatorOptionSuccess(response) {
  getIndicatorOptionList(sessionStorage.getItem("companyId"));
  getIndicatorList(sessionStorage.getItem("companyId"));
}

function updateIndicatorOptionFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create IndicatorOption button functions

function createIndicatorOption(option) {
  var indicatorOption = { "option": option, "company": sessionStorage.getItem("companyId") };
  API_PUT(API_ENDPOINT + API_INDICATOR_OPTION, indicatorOption, createIndicatorOptionSuccess, createIndicatorOptionFailure, "json");
}

function createIndicatorOptionSuccess(response) {
  var data = {};
  sessionStorage.setItem("indicatorOptionId", response.data.attributes.id);
  getIndicatorOptionList(sessionStorage.getItem("companyId"));
}

function createIndicatorOptionFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
