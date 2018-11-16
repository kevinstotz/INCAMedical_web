
function emptyIndicatorForms() {
  $( "#settings-indicator-select-form" )[0].reset();
  $( "#settings-indicator-table > tbody" ).empty();
}

function loadIndicatorSelect(data) {
  var options = '<option value="0">Add New Indicator</option>';
  var activeIndicatorId = sessionStorage.getItem('indicatorId');
  var selected = "";

  for (var item in data) {

      if (activeIndicatorId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + textLength(data[item].attributes.name, 50) + '</option>';
      selected = "";
  }

  if (activeIndicatorId == 0) {
    $( "#update-indicator-button" ).hide();
    $( "#create-indicator-button" ).show();
    //$( "#delete-indicator-button" ).attr('disabled', true);
  } else {
    //$( "#delete-indicator-button" ).attr('disabled', false);
    $( "#update-indicator-button" ).show();
    $( "#create-indicator-button" ).hide();
  }

  $( "#settings-indicator-select" ).find('option').remove().end().append(options);
}


function loadIndicatorTable(data) {
  var rows = "";
  var selected = "";
  var disabled = "";
  var types = {};
  var options = {};

  $.each(data, function(i, item) {
      rows += '<tr>';
      // rows += '<td>' + item.attributes.short_name + '</td>';
      rows += '<td>' + item.attributes.name + '</td>';
      rows += '<td><select class="form-control" id="settings-indicator-table-type-select-' + item.id + '">';
      for (var indicator_type in INDICATOR_TYPE_LIST) {
        if (INDICATOR_TYPE_LIST[indicator_type].id == item.attributes.type.id) { selected = " selected "; }
        rows += '<option ' + selected + ' value=' + INDICATOR_TYPE_LIST[indicator_type].id + '>' + textLength(INDICATOR_TYPE_LIST[indicator_type].attributes.type, 20) + '</option>';
        selected = "";
      }
      if (item.attributes.type.id == 2) { disabled =" disabled "; }
      rows += '</select></td>';
      rows += '<td><select multiple class="form-control" id="settings-indicator-table-options-select-' + item.id + '">';
      for (var inidicator_option in INDICATOR_OPTION_LIST) {
        for (var item_indicator_option in item.attributes.options) {
          if (INDICATOR_OPTION_LIST[inidicator_option].id == item.attributes.options[item_indicator_option].id) { selected = "selected"; }
        }
        rows += '<option ' + selected + disabled + ' value=' + INDICATOR_OPTION_LIST[inidicator_option].id + '>' + textLength(INDICATOR_OPTION_LIST[inidicator_option].attributes.option, 20) + '</option>';
        selected = "";
      }
      rows += '</select></td>';
      rows += '<td><input  class="form-control" type="checkbox" value="' + item.id + '" id="settings-category-sort-select-' + item.id + '"' + ( ( 1 == item.attributes.active ) ? " checked ": "") + ' name="horns"></td>';
      rows += '</tr>';
      disabled = " ";
  });

  $( "#settings-indicator-table > tbody" ).empty().append(rows);

}

//---------------------------------------------------//
// Get Indicator List button functions

function getIndicatorList(options) {
  var option = "?";
  var companyId = 0;
  if ( options.hasOwnProperty('active') ) { option += "active=" + options.active + "&"; }
  if ( options.hasOwnProperty('company') ) { option += "company=" + options.company + "&"; companyId=options.company; }

  if (companyId > 0) {
    API_GET(API_ENDPOINT + API_INDICATOR , option, getIndicatorListSuccess, getIndicatorListFailure, "text");
  } else {
    loadIndicatorTable([]);
    loadIndicatorSelect([]);
  }
}

function getIndicatorListSuccess(response) {
  var indicatorId = sessionStorage.getItem('indicatorId');
  loadIndicatorSelect(parseResponse(response));
  loadIndicatorTable(parseResponse(response));
  if ( indicatorId > 0 ) {
    getIndicatorDetail(indicatorId);
  }
}

function getIndicatorListFailure(response) {
  sessionStorage.setItem("indicatorId", 0);
  loadIndicatorTable([]);
  loadIndicatorSelect([]);
}


function getIndicatorDetail(indicatorId) {
  API_GET(API_ENDPOINT + API_INDICATOR + indicatorId , "/", getIndicatorDetailSuccess, getIndicatorDetailFailure, "text");
}

function getIndicatorDetailSuccess(response) {
  var data = {};
  data = parseResponse(response);
  $('#settings-indicator-select-form :input').each(function() {
    var $el = $(this)[0];
    switch($el.name) {
        case 'name':
            $(this).val(data.attributes['name']);
            sessionStorage.setItem('indicatorId', data.id);
            break;
        default:
            break;
    }
  });
}

function getIndicatorDetailFailure(response) {
  console.log(response);
  loadIndicatorSelect(parseResponse(response));
}
//---------------------------------------------------//

//---------------------------------------------------//
// Delete indicator button functions
function deleteIndicator(indicatorId) {
  API_DELETE(API_ENDPOINT + API_INDICATOR, indicatorId + "/", deleteIndicatorSuccess, deleteIndicatorFailure, "json");
}

function deleteIndicatorSuccess(response) {
  $("#settings-indicator-select-form")[0].reset();
  sessionStorage.setItem("indicatorId", 0);
  getIndicatorList( { "company": sessionStorage.getItem("companyId") } );
}

function deleteIndicatorFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update indicator button functions
function updateIndicator(data) {
  indicator = { "id": sessionStorage.getItem("indicatorId"), "name": data.name };
  API_UPDATE(API_ENDPOINT + API_INDICATOR + sessionStorage.getItem("indicatorId")  + "/", indicator, updateIndicatorSuccess, updateIndicatorFailure, "json");
}

function updateIndicatorSuccess(response) {
  getIndicatorList( { "company": sessionStorage.getItem("companyId") } );
}

function updateIndicatorFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create Indicator button functions

function createIndicator(companyId, data) {
  var indicator = { "name": data.name, "company": companyId };
  API_POST(API_ENDPOINT + API_INDICATOR, indicator, createIndicatorSuccess, createIndicatorFailure, "json");
}

function createIndicatorSuccess(response) {
  var data = {};

  sessionStorage.setItem("indicatorId", response.data.attributes.result);
  getIndicatorList({ "company": sessionStorage.getItem("companyId") });
}

function createIndicatorFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
