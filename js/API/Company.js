
function emptyCompanyForms() {
  $( "#settings-facility-select-form" )[0].reset();
}

function loadCompanySelect(data) {
  var options = '<option value="0">Add New Facility</option>';
  var activeCompanyId = sessionStorage.getItem('companyId');
  var selected = "";

  for (var item in data) {
      if (activeCompanyId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + data[item].attributes['name'] + '</option>';
      selected = "";
  }

  if (activeCompanyId == 0) {
    $( "#update-facility-button" ).hide();
    $( "#create-facility-button" ).show();
    //$( "#delete-company-button" ).attr('disabled', true);
  } else {
    //$( "#delete-company-button" ).attr('disabled', false);
    $( "#update-facility-button" ).show();
    $( "#create-facility-button" ).hide();
  }

  $( "#settings-facility-select" ).find('option').remove().end().append(options)
}


//---------------------------------------------------//
// Delete company button functions
function deleteCompany(companyId) {
  API_DELETE(API_ENDPOINT + API_COMPANY, companyId + "/", deleteCompanySuccess, deleteCompanyFailure, "json");
}

function deleteCompanySuccess(response) {
  $("#settings-facility-select-form")[0].reset();
  sessionStorage.setItem("companyId", 0);
  getCompanyList({"active": true });
}

function deleteCompanyFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update company button functions
function updateCompany(data) {
  //console.log(data);
  company = { "id": sessionStorage.getItem("companyId"), "name": data.name }
  API_UPDATE(API_ENDPOINT + API_COMPANY + sessionStorage.getItem("companyId") + "/", company, updateCompanySuccess, updateCompanyFailure, "json");
}

function updateCompanySuccess(response) {
  getCompanyList({"active": true });
  console.log(response);
}

function updateCompanyFailure(response) {
  getCompanyList({"active": true });
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create Company button functions

function createCompany(data) {
  var company = {"name": data.name}
  API_PUT(API_ENDPOINT + API_COMPANY_CREATE, company, createCompanySuccess, createCompanyFailure, "json");
}

function createCompanySuccess(response) {
  var data = response.data;
  sessionStorage.setItem("companyId", data.attributes.result);
  getCompanyList({"active": true });
}

function createCompanyFailure(response) {
  console.log(response);
}
//---------------------------------------------------//


//---------------------------------------------------//
// Get Company List button functions

function getCompanyList(options) {
  var option = "?";
  if ( options.hasOwnProperty('active') ) { option += "active=" + options.active; }
  API_GET(API_ENDPOINT + API_COMPANY, option, getCompanyListSuccess, getCompanyListFailure, "text");
}

function getCompanyListSuccess(response) {
  var companyId = sessionStorage.getItem("companyId");
  loadCompanySelect(parseResponse(response));
  loadNewAuditCompanySelect(parseResponse(response));
  if (companyId > 0 ) {
    getCompanyDetail(companyId);
  }
}

function getCompanyListFailure(response) {
  console.log(response);
}
//---------------------------------------------------//


//---------------------------------------------------//
// Get Company button functions
function getCompanyDetail(companyId) {
  API_GET(API_ENDPOINT  + API_COMPANY, companyId + "/", getCompanyDetailSuccess, getCompanyDetailFailure, "json");
}

function getCompanyDetailSuccess(response) {
  var data = {};
  data = response.data;
  sessionStorage.setItem("areaId", 0);
  sessionStorage.setItem("templateId", 0);

  $('#settings-facility-select-form :input').each(function() {
    var $el = $(this)[0];
    switch($el.name) {
        case 'name':
            sessionStorage.setItem('companyId', data.id);
            getClinicTypeList(sessionStorage.getItem("companyId"));
            getSpecialtyTypeList(sessionStorage.getItem("companyId"));
            getAuditAreaList(sessionStorage.getItem("companyId"));
            getCategoryList(sessionStorage.getItem("companyId"));
            getIndicatorTypeList(sessionStorage.getItem("companyId"));
            getIndicatorOptionList(sessionStorage.getItem("companyId"));
            getIndicatorList(sessionStorage.getItem("companyId"));
            getTemplateList(sessionStorage.getItem("companyId"));
            $(this).val(data.attributes['name']);
            break;
        default:
            break;
    }
  });
}

function getCompanyDetailFailure(response) {
  sessionStorage.setItem('companyId', 0);
  sessionStorage.setItem("areaId", 0);
  sessionStorage.setItem("templateId", 0);
  getAuditAreaList(sessionStorage.getItem("companyId"));
  getTemplateList(sessionStorage.getItem("companyId"));
}
//---------------------------------------------------//
