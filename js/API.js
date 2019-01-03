const API_PORT = 10100;
const API_HOST = 'http://api.incamedical.com';
const WEBSITE = 'audits.incamedical.com';
const WEBSITE_PORT = 10101;
const SECURE = 'https://';
const INSECURE = 'http://';
const API_HOST = INSECURE + 'www.api.incamedical.com';
const WEBSITE = INSECURE + 'www.audits.incamedical.com';
const ALLOWED_PORT = API_PORT;
const ALLOWED_ORIGIN = WEBSITE + ':' + ALLOWED_PORT;
const API_URI = API_HOST + ':' + API_PORT + '/api';
const WEBSITE_URL = WEBSITE + ':' + WEBSITE_PORT;
const API_VERSION = '/v1';
const API_COMPANY = '/company/';
const LOGIN_PAGE = "/static/login.html";
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
const API_USER_REGISTER = '/register/';
const API_USER_FORGOT = '/forgot/';
const API_TEMPLATE_CREATE = '/template/create/';
const API_TEMPLATE_CATEGORY = '/template-category/';
const API_TEMPLATE_INDICATOR = '/template-indicator/';
const API_AUDIT_CATEGORY = '/audit-category/';
const API_AUDIT_INDICATOR = '/audit-indicator/';
const API_AUDIT_INDICATOR_ANSWER = '/audit-indicator-option/';
const API_AUDIT_INDICATOR_NOTE = '/audit-indicator-note/';
const API_CATEGORY = '/category/';
const API_INDICATOR = '/indicator/';
const API_INDICATOR_CREATE = '/indicator/create';
const API_ENDPOINT = API_URI + API_VERSION;
const AUTHORIZATION_ENDPOINT = API_HOST + ':' + API_PORT + "/o/";

var token = sessionStorage.getItem('access_token');
var token_type = sessionStorage.getItem('token_type');

function API_PUT(url, data, success, error, dataType) {
  $.ajax({
    type: "PUT",
    url: url,
    data: JSON.stringify(data),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', token_type + " " + token);
      xhr.setRequestHeader('Accept',        "application/json");
    },
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

function API_POST(url, data, success, error, dataType) {
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', token_type + " " + token);
      xhr.setRequestHeader('Accept',        "application/json");
    },
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
    processData: false,
    data: JSON.stringify(data),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', token_type + " " + token);
      xhr.setRequestHeader('Accept',        "application/vnd.api+json");
    },
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Accept': 'application/vnd.api+json',
      'Content-Type': "application/json; charset=utf-8"
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
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', token_type + " " + token);
      xhr.setRequestHeader('Accept',        "application/vnd.api+json");
    },
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
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
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', token_type + " " + token);
      xhr.setRequestHeader('Accept',        "application/json");
    },
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
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', token_type + " " + token);
    },
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
