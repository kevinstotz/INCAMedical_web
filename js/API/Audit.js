
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

function addCategoryNameToPane(name, categoryUuid) {
  return '<br /><h3>' + name + '</h3><div id="audits-category-pane-div-' + categoryUuid + '"></div>';
}

function categoryPaneTemplate(categoryUuid) {
  var pane = '<div role="tabpanel" class="tab-pane fade" id="audits-category-pane-category-' + categoryUuid + '"></div>';
  return pane;
}

function categoryTableTemplate(uuid) {
  var pane = "";
  pane += '<form  id="audits-table-form-' + uuid + '" class="form input-group-md">';
  pane += '<table class="blueTable">';
  pane += '<thead id="audits-table-head-' + uuid + '">';
  pane += '<tr>';
  pane += '<th style="width:550px">Indicator</i></th>';
  pane += '<th>Score</th>';
  pane += '<th>Images</th>';
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
  row += indicator.text;
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
  for (var option in indicator['options']) {
    if (indicator['indicator_option'] == indicator['options'][option].id) { selected = " selected "; }
    row += '<option ' + selected + ' value="' + indicator['options'][option].id + '">' + indicator['options'][option].option + '</option>';
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
    row += insertAuditIndicatorUpload(indicator["uploads"][upload].upload);
  }
  row += '</td>';

  return row;
}

function addAuditIndicatorNote() {
  var row = "";

  row += '<td class="notes">';
  row += '<button class="audit-note"><i class="fas fa-sticky-note fa-2x"></i></button>';
  row += '</td>';

  return row;
}

function fillAuditIndicatorRow(indicator) {
  var row = "";

  row  = '<tr id="audit-indicator-' + indicator.id + '">';
  row += addAuditIndicatorName(indicator);
  row += addAuditIndicatorOptions(indicator);
  row += addAuditIndicatorUploads(indicator);
  row += addAuditIndicatorNote();
  row += '</tr>';

  return row;
}

function fillCategoryPaneFirstRow(uuid) {
  var row = "";

  row = '<td></td>';
  row += '<td><div class="select-style">';
  row += '<select class="select-all" name="' + uuid + '">';
  row += '<option selected value="8">All Pass</option>';
  row += '<option value="9">All Fail</option>';
  row += '</select>';
  row += '</div></td>';
  row += '<td></td>';
  row += '<td></td>';

  return row;
}

function addAuditTab(categoryUuid, name) {
  var tab = "";

  tab = '<li id="section-audits-category-' + categoryUuid + '" role="presentation">';
  tab += '<a href="#audits-category-pane-category-' + categoryUuid + '" aria-controls="section-audits-category-' + categoryUuid + '" role="tab" data-toggle="tab">' + name.substring(0, 10) + ' ...</a>';
  tab += '</li>';

  return tab;
}

function loadAuditTabs(data) {

  for (var category in data.attributes['categories']) {
    if (data.attributes['categories'][category].parent == "#") {
      $("#audits-tabs > ul ").append(addAuditTab(data.attributes['categories'][category].uuid, data.attributes['categories'][category].text));
      $("#audits-tabs > div.tab-content").append(categoryPaneTemplate(data.attributes['categories'][category].uuid));
      $("#" + "audits-category-pane-category-" + data.attributes['categories'][category].uuid).append(addCategoryNameToPane(data.attributes['categories'][category].text, data.attributes['categories'][category].uuid));
    } else {
      $("#" + "audits-category-pane-category-" + data.attributes['categories'][category].parent).append(addCategoryNameToPane(data.attributes['categories'][category].text, data.attributes['categories'][category].uuid));
    }
  }

  for (var indicator in data.attributes['indicators']) {
    if (data.attributes['indicators'][indicator].parent != "#")  {
      if ( $("#" + "audits-table-" + data.attributes['indicators'][indicator].parent).length == 0 ) {
        $("#" + "audits-category-pane-div-" + data.attributes['indicators'][indicator].parent).append(categoryTableTemplate(data.attributes['indicators'][indicator].parent));
      }
      $("#" + "audits-table-" + data.attributes['indicators'][indicator].parent).append(fillAuditIndicatorRow(data.attributes['indicators'][indicator]));
    }
  }

  $(".audit-note").click(function(event) {
    event.preventDefault();
    $('#note-modal').modal({
        show: true,
        backdrop: false
    });
  });

  $("button.note-modal-add").click(function(event) {
    event.preventDefault();
    $('#note-form textarea').each(function() {
      var $el = $(this)[0];
      switch($el.name) {
        case 'note':
          var note = $(this).val();
          createNote(note, 2, sessionStorage.getItem("companyId"));
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
    updateAuditTemplateIndicatorScore(optionId, indicatorId);
  });

  $("select.select-all").change(function() {
      var optionId = $(this).val();
      var $formId = $(this).attr("name");
      $('#audits-table-form-' + $formId + ' select').each(
        function(index) {
          if (index > 0) {
            $(this).val(optionId);
            indicatorId = $(this).attr("name");
            updateAuditTemplateIndicatorScore(optionId, indicatorId);
          }
        }
    );
  });

  $('#audit-indicator-image-upload-form-button').click(function() {
    $( '#audit-indicator-image-upload-form' ).submit();
  });

  $('#audit-indicator-image-upload-form').submit(function() {
    var image = new FormData($( "#audit-indicator-image-upload-form" )[0]);
    var templateIndicatorId = $(".modal-body #id").val();
    uploadAuditTemplateIndicatorImage(templateIndicatorId, image);
  });

}

function uploadAuditTemplateIndicatorImage(templateIndicatorId, image) {
  API_UPLOAD_IMAGE(API_ENDPOINT + API_AUDIT_IMAGE_UPLOAD + templateIndicatorId + "/", image, uploadAuditIndicatorImageSuccess, uploadAuditIndicatorImageFailure, "json", templateIndicatorId);
}

function uploadAuditIndicatorImageSuccess(response, params) {
  fields = $.parseJSON(response.data.attributes.result)[0];
  $( "#audit-indicator-" + params + " .audit-indicator-upload").append(insertAuditIndicatorUpload(fields.name));
}

function uploadAuditIndicatorImageFailure(error) {
  console.log(error);
}

function updateAuditTemplateIndicatorScore(optionId, indicatorId) {
  var template_indicator = { "id": indicatorId, "indicator_option": optionId }
  API_UPDATE(API_ENDPOINT + API_TEMPLATE_INDICATOR + indicatorId + "/", template_indicator, updateAuditTemplateIndicatorScoreSuccess, updateAuditTemplateIndicatorScoreFailure, "json");
}

function updateAuditTemplateIndicatorScoreSuccess(response) {
  console.log(response);
}

function updateAuditTemplateIndicatorScoreFailure(error) {
  console.log(error);
}

function loadAuditTable(data) {
  var auditId = sessionStorage.getItem('auditId');
  var rows = "";

  for (var item in data) {
      rows  = '<tr>';
      rows += '<td>' + data[item].attributes['name'] + '</td>';
      rows += '<td>' + data[item].attributes['area'].name + '</td>';
      rows += '<td>95%</td>';
      rows += '<td>' + data[item].attributes['template'].name + '</td>';
      rows += '<td>' + formatDate(new Date(data[item].attributes['created'])); + '</td>';
      rows += '</tr>';
  }
  $( "#audits-audits-table-tbody" ).append(rows);
}


//---------------------------------------------------//
// Delete audit button functions
function deleteAudit(auditId) {
  API_DELETE(API_ENDPOINT + API_AUDIT, auditId + "/", deleteAuditSuccess, deleteAuditFailure, "json");
}

function deleteAuditSuccess(response) {
  $("#audits-audit-select-form")[0].reset();
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
  sessionStorage.setItem("auditId", 1);
  var auditId = sessionStorage.getItem("auditId");

  loadAuditTable(parseResponse(response));
  if (auditId > 0 ) {
    getAuditDetail(auditId);
  }
}

function getAuditListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//


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
