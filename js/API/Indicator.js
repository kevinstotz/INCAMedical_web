
function emptyIndicatorForms() {

  $( "#settings-indicator-table > tbody" ).empty();
}

function insertIndicatorImage(id, url) {
  var row = "";

  row += '<button type="button" value="' + id + '" class="uploaded-indicator-images">';
  row += '<img class="showhide" alt="image" src="' + url + '" />';
  row += '<i class="fas fa-file-image"></i>';
  row += '</button>';

  return row;
}

function loadIndicatorTable(data) {
  var rows = "";
  var selected = "";
  var disabled = "";
  var types = {};
  var options = {};

  rows = '<tr>';
  rows += '<td><input placeholder="Add New Indicator" class="" size="60" maxlength="1000" type="text" id="settings-indicator-form-input-name" name="add" value="" />';
  rows += '<button class="add-indicator" value="0"><i class="fas fa-plus "></i></button></td>';
  rows += '<td colspan="5"></td>';
  rows += '</tr>';

  $.each(data, function(i, item) {
      rows += '<tr id="indicator-' + item.id + '">';
      rows += '<td id="indicator-' + item.id + '-name">' + item.attributes.name;
      for (var image in item.attributes["images"]) {
        rows += insertIndicatorImage(item.attributes["images"][image].id, item.attributes["images"][image]["file_url"]);
      }
      rows += '</td>';
      rows += '<td><select class="form-control settings-indicator-table-type-select" name="' + item.id + '" id="settings-indicator-table-type-select-' + item.id + '">';

      for (var indicator_type in INDICATOR_TYPE_LIST) {
        if (INDICATOR_TYPE_LIST[indicator_type].id == item.attributes.type.id) { selected = " selected "; }
        rows += '<option ' + selected + ' value=' + INDICATOR_TYPE_LIST[indicator_type].id + '>' + textLength(INDICATOR_TYPE_LIST[indicator_type].attributes.type, 20) + '</option>';
        selected = "";
      }

      if (item.attributes.type.id == 2) { disabled =" disabled "; }
      rows += '</select></td>';
      rows += '<td><select multiple class="form-control settings-indicator-table-options-select" id="settings-indicator-table-options-select-' + item.id + '">';

      for (var inidicator_option in INDICATOR_OPTION_LIST) {
        for (var item_indicator_option in item.attributes.options) {
          if (INDICATOR_OPTION_LIST[inidicator_option].id == item.attributes.options[item_indicator_option].id) { selected = "selected"; }
        }
        rows += '<option ' + selected + disabled + ' value=' + INDICATOR_OPTION_LIST[inidicator_option].id + '>' + textLength(INDICATOR_OPTION_LIST[inidicator_option].attributes.option, 20) + '</option>';
        selected = "";
      }

      rows += '</select></td>';
      rows += '<td><button class="image-indicator" value="' + item.id + '" name="image" data-toggle="modal" data-target="#settings-indicator-image-upload-modal"><i class="fas fa-file-upload fa-2x"></i></button></td>';
      rows += '<td><button class="active-indicator" value="' + item.id + '" name="active"><i class="fas ' + ( ( 1 == item.attributes.active ) ? " fa-toggle-on ": " fa-toggle-off " ) + ' fa-2x"></i></button></td>';
      rows += '<td><button class="delete-indicator" value="' + item.id + '" name="delete"><i class="fas fa-trash fa-2x"></i></button></td>';
      rows += '</tr>';

      disabled = " ";
  });

  $( "#settings-indicator-table > tbody" ).empty().append(rows);

  $( "button.uploaded-indicator-images" ).click(function(event) {
      event.preventDefault();
      $(this).children("img").toggleClass("showhide");
  });

  $( "button.delete-indicator" ).click(function(event) {
      event.preventDefault();
      var value = $(this).val();
      deleteIndicator(value);
  });

  $( "button.add-indicator" ).click(function(event) {
      event.preventDefault();
      var indicatorName = $("#settings-indicator-form-input-name").val();
      createIndicator(indicatorName);
  });

  $( "button.active-indicator" ).click(function(event) {
      event.preventDefault();
      var active = false;
      var indicatorId = $(this).val();

      $(this).find("i").toggleClass("fa-toggle-on fa-toggle-off");
      if ( $(this).find("i").hasClass("fa-toggle-on") ) {
        active = true;
      }

      updateIndicator(indicatorId, { "id": indicatorId, "active": active } );
  });

  $( "select.settings-indicator-table-type-select").change(function(event) {
    var indicatortypeId = $(this).val();
    var indicatorId = $(this).attr("name");

    updateIndicator(indicatorId, { "company": sessionStorage.getItem("companyId"), "id": indicatorId, "type": { "type": indicatortypeId } } );
  });

  $( "button.image-indicator" ).click(function(event) {
      event.preventDefault();
       $(".modal-body #id").val( $( this).val() );
      return true;
  });

  $('#settings-indicator-image-upload-form-button').click(function() {
    $( '#settings-indicator-image-upload-form' ).submit();
  });


  $('#settings-indicator-image-upload-form').submit(function() {
    var image = new FormData($( "#settings-indicator-image-upload-form" )[0]);
    var indicatorId = $(".modal-body #id").val();
    uploadIndicatorImage(image);
  });

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
  }
}

function getIndicatorListSuccess(response) {
  var indicatorId = sessionStorage.getItem('indicatorId');
  loadIndicatorTable(parseResponse(response));
  if ( indicatorId > 0 ) {
    getIndicatorDetail(indicatorId);
  }
}

function getIndicatorListFailure(response) {
  sessionStorage.setItem("indicatorId", 0);
  loadIndicatorTable([]);
}


function getIndicatorDetail(indicatorId) {
  API_GET(API_ENDPOINT + API_INDICATOR + indicatorId , "/", getIndicatorDetailSuccess, getIndicatorDetailFailure, "text");
}

function getIndicatorDetailSuccess(response) {
  var data = {};
  data = parseResponse(response);
}

function getIndicatorDetailFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Delete indicator button functions
function deleteIndicator(indicatorId) {
  API_DELETE(API_ENDPOINT + API_INDICATOR, indicatorId + "/", deleteIndicatorSuccess, deleteIndicatorFailure, "json");
  $('table#settings-indicator-table tr#indicator-' + indicatorId).remove();
}

function deleteIndicatorSuccess(response) {
}

function deleteIndicatorFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update indicator button functions
function updateIndicator(indicatorId, indicator) {
  API_UPDATE(API_ENDPOINT + API_INDICATOR + indicatorId + "/", indicator, updateIndicatorSuccess, updateIndicatorFailure, "json");
}

function updateIndicatorSuccess(response) {
  console.log(response);
  $ ( "#indicator-' + item.id + '-name" );
}

function updateIndicatorFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create Indicator button functions

function createIndicator(name) {
  var indicator = { "name": name, "company": sessionStorage.getItem("companyId") };
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

//---------------------------------------------------//
// Create Indicator button functions

function uploadIndicatorImage(image) {
  API_UPLOAD_IMAGE(API_ENDPOINT + API_UPLOAD, image, uploadIndicatorImageSuccess, uploadIndicatorImageFailure, "json");
}

function uploadIndicatorImageSuccess(response) {
  var result = JSON.parse(response.data.attributes.result);
  var indicatorId = result['indicator'];
  var image_path = result['file_url'];

  $( "#indicator-" + indicatorId + "-name" ).append(insertIndicatorImage(indicatorId, image_path));
  $( '#settings-indicator-image-upload-modal' ).modal('toggle');
  $( "button.uploaded-indicator-images" ).click(function(event) {
      event.preventDefault();
      $(this).children("img").toggleClass("showhide");
  });
}

function uploadIndicatorImageFailure(response, textStatus, errorThrown) {
  console.log("failure");
  console.log(response);
  console.log(textStatus);
  console.log(errorThrown);
}
//---------------------------------------------------//
