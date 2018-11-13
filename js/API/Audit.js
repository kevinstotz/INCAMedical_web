
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

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function loadAuditTabs(data) {
  var tabs = "";

  tabs = '<li id="section-audits-area" role="presentation">';
  tabs += '<a href="#audits-area-pane" aria-controls="section-audits-area" role="tab" data-toggle="tab">Area</a>';
  tabs += '</li>';

  $("#audits-tabs > ul ").append(tabs);
}

function loadAuditTable(data) {
  var auditId = sessionStorage.getItem('auditId');
  var rows = "";

  for (var item in data) {
      rows  = '<tr>';
      rows += '<td>' + data[item].attributes['name'] + '</td>';
      rows += '<td>' + data[item].attributes['area'].name + '</td>';
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
  var data = {};
  data = response.data;
  console.log(data);
  loadAuditTabs(data);

}

function getAuditDetailFailure(response) {

}
//---------------------------------------------------//
