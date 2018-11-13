function emptyTemplateForms() {
  $( "#settings-template-select-form" )[0].reset();
}

function loadTemplateSelect(data) {
  var options = '<option value="0">Add New Template</option>';
  var activeTemplateId = sessionStorage.getItem('templateId');
  var selected = "";

  for (var item in data) {
      if (activeTemplateId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + textLength(data[item].attributes.name, 50) + '</option>';
      selected = "";
  }

  if (activeTemplateId == 0) {
    $( "#update-template-button" ).hide();
    $( "#create-template-button" ).show();
    //$( "#delete-template-button" ).attr('disabled', true);
  } else {
    //$( "#delete-template-button" ).attr('disabled', false);
    $( "#update-template-button" ).show();
    $( "#create-template-button" ).hide();
  }

  $( "#settings-template-select" ).find('option').remove().end().append(options)
}


//---------------------------------------------------//
// Get Template List button functions

function getTemplateList(companyId) {
  if (companyId > 0) {
    API_GET(API_ENDPOINT + API_TEMPLATE + "?company=" + companyId, "", getTemplateListSuccess, getTemplateListFailure, "text");
  } else {
    loadTemplateSelect([]);
  }
}

function getTemplateListSuccess(response) {
  var templateId = sessionStorage.getItem('templateId');

  loadTemplateSelect(parseResponse(response));
  if ( templateId > 0 ) {
    getTemplateDetail(templateId);
  }
}

function getTemplateListFailure(response) {
  sessionStorage.setItem("templateId", 0);
  loadTemplateSelect([]);
}


function getTemplateDetail(templateId) {
  API_GET(API_ENDPOINT + API_TEMPLATE + templateId , "/", getTemplateDetailSuccess, getTemplateDetailFailure, "text");
}

function getTemplateDetailSuccess(response) {
  getTemplateCategoryList(sessionStorage.getItem("companyId"), sessionStorage.getItem("templateId"));
  var data = {};
  data = parseResponse(response);
  $('#settings-template-select-form :input').each(function() {
    var $el = $(this)[0];
    switch($el.name) {
        case 'name':
            $(this).val(data.attributes['name']);
            sessionStorage.setItem('templateId', data.id);
            break;
        default:
            break;
    }
  });
}

function getTemplateDetailFailure(response) {
  console.log(response);
  loadTemplateSelect(parseResponse(response));
}
//---------------------------------------------------//

//---------------------------------------------------//
// Delete template button functions
function deleteTemplate(templateId) {
  API_DELETE(API_ENDPOINT + API_TEMPLATE, templateId + "/", deleteTemplateSuccess, deleteTemplateFailure, "json");
}

function deleteTemplateSuccess(response) {
  sessionStorage.setItem("templateId", 0);
  emptyTemplateCategoryTree();
  emptyTemplateForms();
  getTemplateList();
}

function deleteTemplateFailure(response) {
  console.log(response);
  emptyTemplateCategoryTree();
  emptyTemplateForms();
  getTemplateList();
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update template button functions
function updateTemplate(data) {
  var template = { "id": sessionStorage.getItem("templateId") };
  for (var key in data) {
    template[key] = data[key];
  }
  API_UPDATE(API_ENDPOINT + API_TEMPLATE + sessionStorage.getItem("templateId")  + "/", template, updateTemplateSuccess, updateTemplateFailure, "json");
}

function updateTemplateSuccess(response) {
  getTemplateList(sessionStorage.getItem("companyId"));
}

function updateTemplateFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Create Template button functions

function createTemplate(companyId, data) {
  var template = { "name": data.name, "company": { "company": companyId } };
  API_POST(API_ENDPOINT + API_TEMPLATE_CREATE, template, createTemplateSuccess, createTemplateFailure, "json");
}

function createTemplateSuccess(response) {
  sessionStorage.setItem("templateId", response.data.attributes.result);
  getTemplateList(sessionStorage.getItem("companyId"));
}

function createTemplateFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
