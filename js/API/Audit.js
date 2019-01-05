
function emptyAuditForms() {
  $( "#audits-audit-select-form" )[0].reset();
}

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day +  ', ' + year;
}

function addCategoryNameToPane(category) {
  var str = ""
  str = '<br /><h3>' + category.name + '</h3><div id="audits-category-pane-div-' + category.uuid + '" data-category-id="' + category.id + '"></div>';
  return str;
}

function categoryPaneTemplate(category) {
  var pane = '<div role="tabpanel" class="tab-pane fade" id="audits-category-pane-category-' + category.uuid + '" data-category-id="' + category.id + '"></div>';
  return pane;
}

function categoryTableTemplate(uuid) {
  var pane = "";

  pane += '<form  id="audits-table-form-' + uuid + '" class="form input-group-md">';
  pane += '<table class="blueTable">';
  pane += '<thead id="audits-table-head-' + uuid + '">';
  pane += '<tr>';
  pane += '<th style="width: 500px">Indicator</th>';
  pane += '<th style="width: 80px">Score</th>';
  pane += '<th style="width: 120px">Images</th>';
  pane += '<th>Notes</th>';
  pane += '</tr>';
  pane +- '</thead>';
  pane += '<tbody id="audits-table-' + uuid + '">';
  pane += '<tr id="audits-table-first-row-' + uuid + '">';
  pane += fillCategoryPaneFirstRow(uuid);
  pane += '</tr>';
  pane += '</tbody>';
  pane += '</table>';
  pane += '</form>';

  return pane;
}

function insertAuditIndicatorImage(id, url) {
  var row = "";

  row += '<button type="button" value="' + id + '" class="audit-indicator-images">';
  row += '<img class="showhide" alt="image" src="' + url + '" />';
  row += '<i class="fas fa-file-image"></i>';
  row += '</button>';

  return row;
}

function addAuditIndicatorName(indicator) {
  var row = "";
  row = '<td id="audit-indicator-' + indicator.id + '-name">';
  row += indicator.name;
  for (var image in indicator['images']) {
    row += insertAuditIndicatorImage(indicator["images"][image].id, indicator["images"][image]["file_url"]);
  }
  row += '</td>';

  return row;
}

function addAuditIndicatorOptions(indicator) {

  var row = "";
  var selected = "";

  row += '<td>';
  row += '<div class="select-style">';
  row += '<select class="form-control audit-indicator-table-type-select" name="' + indicator.id + '" id="audit-indicator-table-type-select-' + indicator.id + '">';
  for (var indicator_option in indicator.indicator_options) {
    if (indicator.indicator_options[indicator_option].id == indicator.indicator_option) { selected = " selected "; }
    row += '<option ' + selected + ' value="' + indicator.indicator_options[indicator_option].id + '">' + indicator.indicator_options[indicator_option].option + '</option>';
    selected  = "";
  }
  row += '</select>';
  row += '</div>';
  row += '</td>';

  return row;
}

function insertAuditImage(id, url) {
  var row = "";

  row += '<button type="button" value="' + id + '" class="uploaded-audit-images">';
  row += '<img class="showhide" alt="image" src="' + url + '" />';
  row += '<i class="fas fa-file-image"></i>';
  row += '</button>';

  return row;
}

function insertAuditIndicatorUpload(upload) {
  var row = "";

  row += '<button class="audit-indicator-images">';
  row += '<img class="showhide" alt="image" src="' + upload + '" />';
  row += '<i class="fas fa-file-image fa-2x"></i>';
  row += '</button>';

  return row;
}

function addAuditIndicatorUploads(indicator) {
  var row = "";

  row += '<td class="audit-indicator-upload">';
  row += '<button type="button" class="audit-indicator-modal" data-toggle="modal" value="' + indicator["id"] + '" data-target="#audit-indicator-image-upload-modal"><i class="fas fa-file-upload fa-2x"></i></button>';
  for (var upload in indicator["uploads"]) {
    row += insertAuditIndicatorUpload(indicator["uploads"][upload].file_url);
  }
  row += '</td>';

  return row;
}

function addAuditIndicatorNote(indicator) {
  var row = "";

  row += '<td class="notes">';
  row += '<button class="audit-note" value="' + indicator["id"] + '"><i class="fas fa-sticky-note fa-2x"></i></button>';
  row += '</td>';

  return row;
}

function fillAuditIndicatorRow(indicator) {
  var row = "";

  row  = '<tr id="audit-indicator-' + indicator.id + '">';
  row += addAuditIndicatorName(indicator);
  row += addAuditIndicatorOptions(indicator);
  row += addAuditIndicatorUploads(indicator);
  row += addAuditIndicatorNote(indicator);
  row += '</tr>';

  return row;
}

function fillCategoryPaneFirstRow(uuid) {
  var row = "";

  row = '<td></td>';
  row += '<td><div class="select-style">';
  row += '<select class="select-all" name="' + uuid + '">';
  for (var indicator_option in INDICATOR_OPTIONS_LIST) {
    row += '<option selected value="' + INDICATOR_OPTIONS_LIST[indicator_option].id + '">All ' + INDICATOR_OPTIONS_LIST[indicator_option].attributes.option + '</option>';
  }
  row += '</select>';
  row += '</div></td>';
  row += '<td></td>';
  row += '<td></td>';

  return row;
}

function getCategoryName(categoryName) {
  if (categoryName.length > 10) {
    return categoryName.substring(0, 10) + '...';
  } else {
    return categoryName;
  }
}
function addAuditTab(category) {
  var tab = "";
  tab = '<li id="section-audits-category-' + category.uuid + '" role="presentation">';
  tab += '<a href="#audits-category-pane-category-' + category.uuid + '" aria-controls="section-audits-category-' + category.uuid + '" role="tab" class="audits-category-tab" data-toggle="tab" data-category-id="' + category.id + '">' + getCategoryName(category.name) + '</a>';
  tab += '</li>';

  return tab;
}

function loadAuditTabs(data) {

  $("#audits-tabs > div.tab-content").empty();
  $("#audits-tabs > ul ").empty();

  for (var category in data.attributes.template['categories']) {
    if (data.attributes.template['categories'][category].parent == "#") {
      $("#audits-tabs > ul ").append(addAuditTab(data.attributes.template['categories'][category]));
      $("#audits-tabs > div.tab-content").append(categoryPaneTemplate(data.attributes.template['categories'][category]));
    }
  }

  $(".audits-category-tab").click(function(event) {
    event.preventDefault();
    $("#audits-tabs > div.tab-content > div.tab-pane").empty();
    getAuditCategoryDetail($(this).attr('data-category-id'));
  });

}

function uploadAuditIndicatorImage(auditId, auditIndicatorId, image) {
  API_UPLOAD_IMAGE(API_ENDPOINT + API_AUDIT_IMAGE_UPLOAD  + auditIndicatorId + "/audit/" + auditId + "/", image, uploadAuditIndicatorImageSuccess, uploadAuditIndicatorImageFailure, "json", auditIndicatorId);
}

function uploadAuditIndicatorImageSuccess(response, params) {
  fields = JSON.parse(response.data.attributes.result);
  $( "#audit-indicator-" + params + " .audit-indicator-upload").append(insertAuditIndicatorUpload(fields.file_url));
  $( '#audit-indicator-image-upload-modal' ).modal("toggle");
}

function uploadAuditIndicatorImageFailure(error) {
  console.log(error);
  $( '#audit-indicator-image-upload-modal' ).modal("toggle");
}

function updateAuditIndicatorOption(optionId, indicatorId, auditId) {
  var audit_indicator = { "option": optionId };
  console.log(audit_indicator);
  API_UPDATE(API_ENDPOINT + API_AUDIT_INDICATOR_ANSWER +  "audit/"  + auditId + "/indicator/" + indicatorId + "/", audit_indicator, updateAuditIndicatorOptionSuccess, updateAuditIndicatorOptionFailure, "json");
}

function updateAuditIndicatorOptionSuccess(response) {
  console.log(response);
}

function updateAuditIndicatorOptionFailure(error) {
  console.log(error);
}

function createAuditIndicatorNote(note, indicatorId, auditId) {
  var audit_indicator_note = { "audit": auditId, "indicator": indicatorId, "notes": { "type": 3, "note": note } };
  API_UPDATE(API_ENDPOINT + API_AUDIT_INDICATOR_NOTE +  indicatorId + "/audit/"  + auditId + "/" , audit_indicator_note, createAuditIndicatorNoteSuccess, createAuditIndicatorNoteFailure, "json");
}

function createAuditIndicatorNoteSuccess(response) {
  console.log(response);
}

function createAuditIndicatorNoteFailure(error) {
  console.log(error);
}

function loadAuditTable(data) {
  var rows = "";
  $( "#audits-audits-table-tbody" ).empty();

  for (var item in data) {
      rows += '<tr id="audit-' + data[item].id + '" name="' + data[item].id + '">';
      rows += '<td><input type="radio" name="audit-id" value="' + data[item].id + '"></td>';
      rows += '<td>' + data[item].attributes.company + '</td>';
      rows += '<td name="' + data[item].id + '">' + data[item].attributes.area.name + '</td>';
      rows += '<td id="audit-template-' + data[item].id + '" name="' +  data[item].attributes.template.id + '">' + data[item].attributes.template.name + '</td>';
      rows += '<td id="audit-score-' + data[item].id + '" name="' + data[item].id + '">' + (getAuditScore(data[item].attributes.scores) * 100).toFixed(0) + '%</td>';
      rows += '<td>' + formatDate(new Date(data[item].attributes['created'])); + '</td>';
      rows += '</tr>';
  }

  $( "#audits-audits-table-tbody" ).append(rows);
  $( 'input[type=radio][name=audit-id]' ).click(function() {
      var auditId = $(this).val();
      $( '#new-audit-tabs' ).hide();

      for (var item in data) {
        $( '#audits-audits-pane-heading' ).append("<h3>" + data[item].attributes.company + ": " + data[item].attributes.area.name + "</H3><hr style='width: 800px;' />");
      }
      if ( (auditId > 0) && (sessionStorage.getItem("auditId") != auditId) ) {
        sessionStorage.setItem("auditId", auditId);
        getAuditDetail(auditId);
      }
      $( '#audits-tabs' ).show();
  });

}

function getAuditScore(scores) {
  var total = 0;
  var pass = 0;

  for (var score in scores) {
    total += scores[score].count;
    if (scores[score].indicator_option == 8) {
      pass += 1;
    }
  }
  if (total > 0) {
    return pass / total;
  } else {
    return 0;
  }
}

function getAuditScoreSuccess(response) {
  console.log(response);
}
//---------------------------------------------------//
// Delete audit button functions
function deleteAudit(auditId) {
  API_DELETE(API_ENDPOINT + API_AUDIT, auditId + "/", deleteAuditSuccess, deleteAuditFailure, "json");
}

function deleteAuditSuccess(response) {
  $( "#audits-audit-select-form" )[0].reset();
  sessionStorage.setItem("auditId", 0);
  getAuditList({"active": true });
}

function deleteAuditFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update audit button functions
function updateAudit(data) {
  //console.log(data);
  audit = { "id": sessionStorage.getItem("auditId"), "name": data.name }
  API_UPDATE(API_ENDPOINT + API_AUDIT + sessionStorage.getItem("auditId") + "/", audit, updateAuditSuccess, updateAuditFailure, "json");
}

function updateAuditSuccess(response) {
  getAuditList({"active": true });
  console.log(response);
}

function updateAuditFailure(response) {
  getAuditList({"active": true });
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create Audit button functions

function createAudit(data) {
  var audit = { "name": data.name }
  API_POST(API_ENDPOINT + API_AUDIT_CREATE, audit, createAuditSuccess, createAuditFailure, "json");
}

function createAuditSuccess(response) {
  var data = response.data;
  sessionStorage.setItem("auditId", data.attributes.result);
  getAuditList({"active": true });
}

function createAuditFailure(response) {
  console.log(response);
}
//---------------------------------------------------//


//---------------------------------------------------//
// Get Audit List button functions

function getAuditList(options) {
  var option = "?";
  if ( options.hasOwnProperty('company') ) { option += "template__company__id=" + options.company + "&"; }
  if ( options.hasOwnProperty('template') ) { option += "template=" + options.template + "&"; }
  if ( options.hasOwnProperty('active') ) { option += "active=" + options.active + "&"; }
  API_GET(API_ENDPOINT + API_AUDIT, option, getAuditListSuccess, getAuditListFailure, "text");
}

function getAuditListSuccess(response) {
  loadAuditTable(parseResponse(response));
}

function getAuditListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Get Audit button functions
function getAuditCategoryDetail(auditCategoryID) {
  if (auditCategoryID > 0) {
    API_GET(API_ENDPOINT + API_TEMPLATE_CATEGORY, auditCategoryID + "/?audit=" + sessionStorage.getItem("auditId"), getAuditCategoryDetailSuccess, getAuditCategoryDetailFailure, "json");
  }
}

function displayCategoryTree(categories) {
  for (var category in categories) {
    if (Array.isArray(categories[category])) {
      displayCategoryTree(categories[category]);
    } else {
      var category_row = addCategoryNameToPane(categories[category]);
      if (categories[category].parent == "#")  {
        $("#audits-category-pane-category-" + categories[category].uuid).append(category_row);
      } else {
        $("#audits-category-pane-div-" + categories[category].parent).append(category_row);
      }
      for (var indicator in categories[category].indicators) {
        if (categories[category].indicators[indicator].parent != "#")  {
          if ( $("#" + "audits-table-" + categories[category].indicators[indicator].parent).length == 0 ) {
            console.log(categories[category].indicators[indicator]);
            $("#" + "audits-category-pane-div-" + categories[category].indicators[indicator].parent).append(categoryTableTemplate(categories[category].indicators[indicator].parent));
          }
          $("#" + "audits-table-" + categories[category].indicators[indicator].parent).append(fillAuditIndicatorRow(categories[category].indicators[indicator]));
        }
      }
    }
  }
}


function getAuditCategoryDetailSuccess(response) {
    var data = {};

    data = response.data;

    displayCategoryTree(data.attributes['categories']);

    $(".audit-note").click(function(event) {
      event.preventDefault();
      $( "input[type=hidden][name=id]" ).val($(this).attr("value"));
      $('#note-modal').modal({
          show: true,
          backdrop: false
      });
    });

    $("button.note-modal-add").click(function(event) {
      event.preventDefault();
      var auditIndicatorId = $(".modal-body #id").val();
      $('#note-form textarea').each(function() {
        var $el = $(this)[0];
        switch($el.name) {
          case 'note':
            var note = $(this).val();
            createAuditIndicatorNote(note, auditIndicatorId, sessionStorage.getItem("auditId"));
            break;
          default:
            break;
        }
      });
    });

    $("button.audit-indicator-modal").click(function() {
      $( "input[type=hidden][name=id]" ).val($(this).attr("value"));
    });

    $("button.audit-indicator-images").click(function(event) {
      event.preventDefault();
      $(this).children("img").toggleClass("showhide");
    });

    $("select.audit-indicator-table-type-select").change(function() {
      var optionId = $(this).val();
      var indicatorId = $(this).attr("name");
      var auditId = sessionStorage.getItem("auditId");
      updateAuditIndicatorOption(optionId, indicatorId, auditId);
    });

    $("select.select-all").change(function() {
        var optionId = $(this).val();
        var $formId = $(this).attr("name");
        var auditId = sessionStorage.getItem("auditId");
        $('#audits-table-form-' + $formId + ' select').each(
          function(index) {
            if (index > 0) {
              $(this).val(optionId);
              indicatorId = $(this).attr("name");
              console.log(optionId);
              console.log(indicatorId);
              console.log(auditId);
              updateAuditIndicatorOption(optionId, indicatorId, auditId);
            }
          }
      );
    });

    $('#audit-indicator-image-upload-form-button').click(function() {
      $( '#audit-indicator-image-upload-form' ).submit();
    });

    $('#audit-indicator-image-upload-form').submit(function() {
      var image = new FormData($( "#audit-indicator-image-upload-form" )[0]);
      var auditIndicatorId = $(".modal-body #id").val();
      var auditId = sessionStorage.getItem("auditId");
      uploadAuditIndicatorImage(auditId, auditIndicatorId, image);
    });

}

function getAuditCategoryDetailFailure(response) {
  console.log(response);
}

//---------------------------------------------------//
// Get Audit button functions
function getAuditIndicatorDetail(auditIndicatorId) {
  if (auditId > 0) {
    API_GET(API_ENDPOINT + API_AUDIT_INDICATOR, auditId + "/", getAuditIndicatorDetailSuccess, getAuditIndicatorDetailFailure, "json");
  }
}

function getAuditIndicatorDetailSuccess(response) {
  console.log(response);
}

function getAuditIndicatorDetailFailure(response) {
  console.log(response);
}

//---------------------------------------------------//
// Get Audit button functions
function getAuditDetail(auditId) {
  if (auditId > 0) {
    API_GET(API_ENDPOINT + API_AUDIT, auditId + "/", getAuditDetailSuccess, getAuditDetailFailure, "json");
  }
}

function getAuditDetailSuccess(response) {
    loadAuditTabs(response.data);
}

function getAuditDetailFailure(response) {

}
//---------------------------------------------------//
