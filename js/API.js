const API_PORT = 10100;
const API_HOST = 'http://www.api.incamedical.com';
const WEBSITE = 'audits.incamedical.com';
const ALLOWED_PORT = API_PORT;
const ALLOWED_ORIGIN = WEBSITE + ':' + ALLOWED_PORT;
const API_URI = API_HOST + ':' + API_PORT + '/api';
const API_VERSION = '/v1';
const API_COMPANY = '/company/';
const API_COMPANY_CREATE = '/company/create/';
const API_AUDIT = '/audit/';
const API_AUDIT_CREATE = '/audit/create/';
const API_AUDIT_AREA = '/audit-area/';
const API_CLINIC_TYPE = '/clinic-type/';
const API_INDICATOR_TYPE = '/indicator-type/';
const API_INDICATOR_OPTION = '/indicator-option/';
const API_SPECIALTY_TYPE = '/specialty-type/';
const API_TEMPLATE = '/template/';
const API_UPLOAD = '/image-upload/';
const API_AUDIT_IMAGE_UPLOAD = '/audit-image-upload/'
const API_NOTE_CREATE = '/note/';
const API_TEMPLATE_CREATE = '/template/create/';
const API_TEMPLATE_CATEGORY = '/template-category/';
const API_TEMPLATE_INDICATOR = '/template-indicator/';
const API_CATEGORY = '/category/';
const API_INDICATOR = '/indicator/';
const API_ENDPOINT = API_URI + API_VERSION;


function API_POST(url, data, success, error, dataType) {
  $.ajax({
    type: "PUT",
    url: url,
    data: JSON.stringify(data),
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/json'
    },
    success: success,
    error: error,
    dataType: dataType
  });
  return 0;
}


function API_UPDATE(url, data, success, error, dataType) {
  $.ajax({
    type: "PATCH",
    url: url,
    data: JSON.stringify(data),
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/json'
    },
    success: success,
    error: error,
    dataType: dataType
  });
  return 0;
}

function API_UPLOAD_IMAGE(url, data, success, error, dataType, params) {
  $.ajax({
    type: "POST",
    url: url,
    timeout: 60000,
    processData: false,
    contentType: false,
    enctype: 'multipart/form-data',
    data: data,
    cache: false,
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    //  'Accept': 'application/vnd.api+json',
      //'enctype': 'multipart/form-data'
    },
    success: function(data) { success(data, params); },
    error: error,
    dataType: dataType
  });
  return 0;
}

function API_DELETE(url, queryString, success, error, dataType) {
  $.ajax({
    type: "DELETE",
    url: url + queryString,
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'text/plain'
    },
    success: success,
    error: error
  });
  return 0;
}

function API_GET(url, queryString, success, error, dataType) {
  $.ajax({
    type: "GET",
    url: url + queryString,
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'text/plain'
    },
    success: success,
    error: error,
    dataType: dataType
  });
  return 0;
}


function parseResponse(response) {
  response = $.parseJSON(response);

  if (response['data']) {
    response = response['data'];
  }

  if (response['error']) {
    response = response['error'];
    response = response[0];
  }

  return response;
}
