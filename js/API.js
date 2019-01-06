//const API_PORT = 80;
const API_PORT = 10100;
const WEBSITE_PORT = 10101;
const SECURE = 'https://';
const INSECURE = 'http://';
const API_HOST = INSECURE + 'www.api.incamedical.com' + ':' + API_PORT.toString();
// const API_HOST = INSECURE + '172.31.2.86';
// const WEBSITE = INSECURE + 'audits.incamedical.com';
const WEBSITE = INSECURE + 'www.www.incamedical.com';
const ALLOWED_PORT = API_PORT;
const ALLOWED_ORIGIN = WEBSITE + ':' + ALLOWED_PORT.toString();
const API_URI = API_HOST + '/api';
const WEBSITE_URL = WEBSITE + ':' + WEBSITE_PORT.toString();
const API_VERSION = '/v1';
const API_COMPANY = '/company/';
const LOGIN_PAGE = "/static/login.html";
const API_COMPANY_CREATE = '/company/create/';
const API_AUDIT = '/audit/';
const API_AUDIT_CREATE = '/audit/create/';
const API_AUDIT_AREA = '/audit-area/';
const API_CLINIC_TYPE = '/clinic-type/';
const API_ROLE = '/role/';
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
const API_USER = '/user/';
const API_AUDIT_INDICATOR_ANSWER = '/audit-indicator-option/';
const API_AUDIT_INDICATOR_NOTE = '/audit-indicator-note/';
const API_CATEGORY = '/category/';
const API_INDICATOR = '/indicator/';
const API_INDICATOR_CREATE = '/indicator/create';
const API_ENDPOINT = API_URI + API_VERSION;
const AUTHORIZATION_ENDPOINT = API_HOST + "/o/";
const redirectURI = WEBSITE_URL;
const API_USER_LOGIN = '/accounts/login/';
const DASHBOARD_PAGE = "/";

const API_USER_RESET_PASSWORD = API_VERSION + '/reset-password/';
const API_USER_FORGOT_PASSWORD = API_VERSION + '/forgot-password/';

sessionStorage.setItem('client_id', "7kKgjnaSGk1FWnGcEH2EgWki6SMT7wf9CQqtj52A");
sessionStorage.setItem('client_id', "WWNbKXczbA5A9oOFTCTv0X98uUjXDsPr19Smsv62");

var token = sessionStorage.getItem('access_token');
var token_type = sessionStorage.getItem('token_type');

function API_PUT(url, data, success, error, dataType) {
  $.ajax({
    type: "PUT",
    url: url,
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
      xhr.setRequestHeader('Accept',        "application/vnd.api+json");
    },
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/json; charset=utf-8'
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
      xhr.setRequestHeader('Accept',        "application/vnd.api+json");
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
