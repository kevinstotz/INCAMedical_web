
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

function addCategoryNameToPane(name) {
  return '<h3>' + name + '</h3>';
}

function categoryPaneTemplate(categoryPaneId, name, uuid) {
  var pane = '<div role="tabpanel" class="tab-pane fade" id="' + categoryPaneId + '"></div>';
  return pane;
}

function categoryTableTemplate(categoryPaneId, uuid) {
  var pane = "";

  pane += '<table class="blueTable">';
  pane += '<thead id="audits-table-head">';
  pane += '<tr>';
  pane += '<th width="550px">Indicator</i></th>';
  pane += '<th>Score</th>';
  pane += '<th>Images</th>';
  pane += '<th>Notes</th>';
  pane += '</tr>';
  pane +- '</thead>';
  pane += '<tbody id="audits-table-' + uuid + '">';
  pane += '<tr id="audits-table-first-row-' + uuid + '">';
  pane += fillCategoryPaneFirstRow(categoryPaneId, uuid);
  pane += '</tr>';
  pane += '</tbody>';
  pane += '</table>';

  return pane;
}

function fillIndicatorRow(indicatorName) {
  var row = "";
  row  =  '<tr>';
  row += '<td>' + indicatorName + '<button class="audit-question-images"><figure class="showhide"><img src="images/sink.png" alt="" /></figure><i class="fa fa-photo"></i></button></td>';
  row += '<td>';
  row += '<div class="select-style">';
  row += '<select>';
  row += '<option value="0">Yes</option>';
  row += '<option value="1">No</option>';
  row += '<option selected value="2">N/A</option>';
  row += '</select>';
  row += '</div>';
  row += '</td>';
  row += '<td class="images">';
  row += '<button class="audit-images">';
  row += '<figure class="showhide">';
  row += '<img alt="" src="images/sink.png" />';
  row += '</figure><i class="fa fa-photo fa-2x"></i>';
  row += '</button>';
  row += '</td>';
  row += '<td class="notes">';
  row += '<button class="audit-note"><i class="fa fa-edit fa-2x"></i></button>';
  row += '</td>';
  row += '</tr>';

  return row;
}

function fillCategoryPaneFirstRow(categoryPaneId, uuid) {
  var row = "";

  row = '<td></td>';
  row += '<td><div class="select-style">';
  row += '<select>';
  row += '<option selected value="0">All Yes</option>';
  row += '<option value="1">All No</option>';
  row += '<option value="2">All N/A</option>';
  row += '<option value="2">All N/O</option>';
  row += '</select>';
  row += '</div></td>';
  row += '<td></td>';
  row += '<td></td>';

  return row;
}

function addAuditTab(categoryPaneId, name) {
  var tab = "";

  tab = '<li id="section-audits-area" role="presentation">';
  tab += '<a href="#' + categoryPaneId + '" aria-controls="section-audits-area" role="tab" data-toggle="tab">' + name.substring(0, 7) + ' ...</a>';
  tab += '</li>';

  return tab;
}

function loadAuditTabs(data) {

  for (var category in data.attributes['categories']) {
    if (data.attributes['categories'][category].parent == "#") {
      $("#audits-tabs > ul ").append(addAuditTab('audits-category-pane-category-' + data.attributes['categories'][category].uuid, data.attributes['categories'][category].text));
      $("#audits-tabs > div.tab-content").append(categoryPaneTemplate("audits-category-pane-category-" + data.attributes['categories'][category].uuid));
      $("#" + "audits-category-pane-category-" + data.attributes['categories'][category].uuid).append(addCategoryNameToPane(data.attributes['categories'][category].text));
      $("#" + "audits-category-pane-category-" + data.attributes['categories'][category].uuid).append(categoryTableTemplate("audits-category-pane-category-" + data.attributes['categories'][category].uuid, data.attributes['categories'][category].uuid));
    } else {
      $("#" + "audits-category-pane-category-" + data.attributes['categories'][category].parent).append(addCategoryNameToPane(data.attributes['categories'][category].text));
      $("#" + "audits-category-pane-category-" + data.attributes['categories'][category].parent).append(categoryTableTemplate("audits-category-pane-category-" + data.attributes['categories'][category].uuid, data.attributes['categories'][category].uuid));
    }
  }
  for (var indicator in data.attributes['indicators']) {
    if (data.attributes['indicators'][indicator].parent != "#")  {
      $("#" + "audits-table-" + data.attributes['indicators'][indicator].parent).append(fillIndicatorRow(data.attributes['indicators'][indicator].text));
    }
  }
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

  if (auditId == 0) {
    //$( "#update-audit-button" ).hide();
    //$( "#create-audit-button" ).show();
  } else {
    //$( "#update-audit-button" ).show();
    //$( "#create-audit-button" ).hide();
  }

  //$( "#audits-audit-select" ).find('option').remove().end().append(options)
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
  API_GET(API_ENDPOINT  + API_AUDIT, auditId + "/", getAuditDetailSuccess, getAuditDetailFailure, "json");
}

function getAuditDetailSuccess(response) {
  loadAuditTabs(response.data);
}

function getAuditDetailFailure(response) {

}
//---------------------------------------------------//
