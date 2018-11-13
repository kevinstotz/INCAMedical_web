function emptyAuditAreaForms() {
  $( "#settings-audit-area-form" )[0].reset();
}

function loadAuditAreaSelect(data) {
  var options = '<option value="0" >Add New Audit Area</option>';
  var activeAreaId = sessionStorage.getItem('areaId');
  var selected = "";

  //$("#audit-area-form")[0].reset();
  for (var item in data) {
      if (activeAreaId == data[item].id) { selected = "selected"; }
      options += '<option ' + selected + ' value=' + data[item].id + '>' + textLength(data[item].attributes['name'], 50) + '</option>';
      selected = "";
  }

  if (activeAreaId == 0) {
    $( "#update-audit-area-button" ).hide();
    $( "#create-audit-area-button" ).show();
    //$( "#delete-audit-area-button" ).attr('disabled', true);
  } else {
  //  $( "#delete-audit-area-button" ).attr('disabled', false);
    $( "#update-audit-area-button" ).show();
    $( "#create-audit-area-button" ).hide();
  }

  $( "#settings-audit-area-form-select" ).find('option').remove().end().append(options)
}


//---------------------------------------------------//
// Get Audit Area Detail button functions
function getAuditAreaDetail(auditAreaId) {
  API_GET(API_ENDPOINT + API_AUDIT_AREA, auditAreaId + "/", getAuditAreaDetailSuccess, getAuditAreaDetailFailure, "text");
}


//---------------------------------------------------//
// Create Audit Area button functions
function createAuditArea(companyId, data) {
  var auditArea = {"name": data["name"],
                   "companyId" : companyId,
                   "director": { "name": data.director, "type": 7 },
                   "manager": { "name": data.manager, "type": 7  },
                   "phone": { "phone_number": data.phone.replace(/\D/g,''),
                             "type": { "type": 3 }
                            },
                    "clinicTypeId": data["clinic-type"],
                    "specialtyTypeId": data["specialty-type"],
                    "present_on_rounds": data.presentonrounds
                   }
  API_POST(API_ENDPOINT + API_AUDIT_AREA, auditArea, createAuditAreaSuccess, createAuditAreaFailure, "json");
}

function createAuditAreaSuccess(response) {
  var data = response.data;
  getAuditAreaList(sessionStorage.getItem("companyId"));
  sessionStorage.setItem("areaId", data.attributes.result);
  getAuditAreaDetail(sessionStorage.getItem("areaId"));
}

function createAuditAreaFailure(response) {
  sessionStorage.setItem("areaId", 0);
  loadAuditAreaSelect([]);
  console.log(response);
}
//---------------------------------------------------//


//---------------------------------------------------//
// Get Audit Area List button functions
function getAuditAreaList(companyId) {
  if (companyId > 0) {
    API_GET(API_ENDPOINT + API_AUDIT_AREA, "?company=" + companyId, getAuditAreaListSuccess, getAuditAreaListFailure, "text");
  } else {
    loadAuditAreaSelect([]);
  }
}

function getAuditAreaListSuccess(response) {
  var areaId = sessionStorage.getItem("areaId");

  loadAuditAreaSelect(parseResponse(response));
  if (areaId > 0) {
    getAuditAreaDetail(areaId);
  }
}

function getAuditAreaListFailure(response) {
  sessionStorage.setItem("areaId", 0);
  loadAuditAreaSelect([]);
}
//---------------------------------------------------//


function getAuditAreaDetailSuccess(response) {
  var data = {};
  data = parseResponse(response);

  $('#settings-audit-area-form :input').each(function() {

      var $el = $(this)[0];
      switch($el.name) {
          case 'name':
              $(this).val(data.attributes['name']);
              sessionStorage.setItem('areaId', data.id);
              break;
          case 'director':
              $(this).val(data.attributes.director.name);
              break;
          case 'specialty-type':
              $(this).val(data.attributes.specialty_type.id);
              break;
          case 'clinic-type':
              $(this).val(data.attributes.clinic_type.id);
              break;
          case 'manager':
              $(this).val(data.attributes.manager.name);
              break;
          case 'phone':
              $(this).val(data.attributes.phone.phone_number);
              break;
          case 'presentonrounds':
              $(this).val(data.attributes['present_on_rounds']);
              break;
          default:
              break;
      }
  });
}

function getAuditAreaDetailFailure(response) {
  getAuditAreaList(sessionStorage.getItem("companyId"));
  sessionStorage.setItem("areaId", 0);
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Update company button functions
function updateAuditArea(areaId, data) {
  var auditArea = {"name": data.name,
                   "director": { "name": data.director, "type": 7 },
                   "manager": { "name": data.manager, "type": 7 },
                   "specialty_type": data['specialty-type'],
                   "clinic_type": data['clinic-type'],
                   "phone": { "phone_number": data.phone.replace(/\D/g,''),
                              "type": { "type": 3 }
                            },
                   "present_on_rounds": data.presentonrounds
                  }
  API_UPDATE(API_ENDPOINT + API_AUDIT_AREA + areaId + "/", auditArea, updateAuditAreaSuccess, updateAuditAreaFailure, "json");
}

function updateAuditAreaSuccess(response) {
  console.log(response);
}

function updateAuditAreaFailure(response) {
  console.log(response);
}
//---------------------------------------------------//

//---------------------------------------------------//
// Get Company List button functions

function deleteAuditArea(auditAreaId) {
  API_DELETE(API_ENDPOINT + API_AUDIT_AREA, auditAreaId + "/", deleteAuditAreaSuccess, deleteAuditAreaFailure, "json");
}

function deleteAuditAreaSuccess(response) {
  //console.log("Success:" + response);
  $("#settings-audit-area-form")[0].reset();
  sessionStorage.setItem("areaId", 0);
  getAuditAreaList(0, sessionStorage.getItem("companyId"));
}

function deleteAuditAreaFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
