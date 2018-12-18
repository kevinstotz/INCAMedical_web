function loadNewAuditCompanySelect(data) {
  var options = '';
  var activeCompanyId = sessionStorage.getItem('companyId');
  var selected = "";

  for (var item in data) {
      if (activeCompanyId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + data[item].attributes['name'] + '</option>';
      selected = "";
  }

  $( "#new-audit-facility-select" ).find('option').remove().end().append(options)
}

function loadNewAuditAuditAreaSelect(data) {
  var options = '';
  var activeAreaId = sessionStorage.getItem('areaId');
  var selected = "";

  //$("#audit-area-form")[0].reset();
  for (var item in data) {
      if (activeAreaId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + textLength(data[item].attributes['name'], 50) + '</option>';
      selected = "";
  }

  $( "#new-audit-audit-area-form-select" ).find('option').remove().end().append(options)
}

function loadNewAuditTemplateSelect(data) {
  var options = '';
  var activeTemplateId = sessionStorage.getItem('templateId');
  var selected = "";

  for (var item in data) {
      if (activeTemplateId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + textLength(data[item].attributes.name, 50) + '</option>';
      selected = "";
  }

  $( "#new-audit-template-select" ).find('option').remove().end().append(options)
}

//---------------------------------------------------//
// Create Company button functions

function createNewAudit(data) {
  var audit = { "name": "New Audit", "company": parseInt(data['new-audit-facility-select']), "area": parseInt(data['new-audit-audit-area-form-select']), "template": parseInt(data['new-audit-template-select'])}
  console.log(audit);
  API_POST(API_ENDPOINT + API_AUDIT_CREATE, audit, createNewAuditSuccess, createNewAuditFailure, "json");
}

function createNewAuditSuccess(response) {
  var data = response.data;
  console.log(data);
  sessionStorage.setItem("auditId", data.attributes.result);
}

function createNewAuditFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
