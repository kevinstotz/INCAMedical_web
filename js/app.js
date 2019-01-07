var API_VERSION = '/v1';
const SECURE = 'https://';
const INSECURE = 'http://';
var client_id = "xxx";
var API_URI = "xxx";
var API_HOST = "xxx";
var API_PORT = 0;
var API_BASE_URL = "xxx";
var AUTHORIZATION_ENDPOINT = "xxx";

var WEBSITE_HOST = "xxx";
var WEBSITE_PORT = 0;
var WEBSITE_URL = "xxx";

var ALLOWED_PORT = 0;
var ALLOWED_ORIGIN = "xxx";
var INDICATOR_OPTIONS_LIST = {};
var INDICATOR_TYPE_LIST = {};
var ROLE_LIST = {};

function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function(script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}

async function wrapp() {
  let response = await fetch("/config/global.json")
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
          client_id = data.client_id;
          sessionStorage.setItem("client_id", client_id);
          API_HOST =  data.api_endpoint;
          API_PORT = data.api_port;
          API_BASE_URL = data.insecure + API_HOST + ':' + API_PORT.toString()
          API_URI = '/api' + API_VERSION;
          API_ENDPOINT = API_BASE_URL + API_URI;
          AUTHORIZATION_ENDPOINT = API_BASE_URL + "/o/";

          WEBSITE_HOST = data.web_endpoint;
          WEBSITE_PORT = data.web_port;
          WEBSITE_URI = '';
          WEBSITE_ENDPOINT = data.insecure + WEBSITE_HOST + ':' + WEBSITE_PORT.toString() + WEBSITE_URI;

          ALLOWED_ORIGIN = WEBSITE_HOST + ':' + API_PORT.toString();

          getScripts([
              "/js/API.js",
              "/js/API/Note.js",
              "/js/API/Audit.js",
              "/js/API/AuditArea.js",
              "/js/API/User.js",
              "/js/utils/utils.js",
              "/dist/jstree/jstree.js",
              "/js/API/Role.js",
              "/js/API/Category.js",
              "/js/API/Company.js",
              "/js/API/ClinicType.js",
              "/js/API/Template.js",
              "/js/API/TemplateCategory.js",
              "/js/API/SpecialtyType.js",
              "/js/API/NewAudit.js",
              "/js/API/IndicatorType.js",
              "/js/API/Indicator.js",
              "/js/API/IndicatorOption.js",
              "/js/API/TemplateIndicator.js"], function () {
            });
          });

};
wrapp();

  $.fn.isInSession = function(variable) {
    if ( (sessionStorage.getItem(variable) === null) ||
         (sessionStorage.getItem(variable) == 0) ||
         (sessionStorage.getItem(variable) == undefined) ||
         (typeof sessionStorage.getItem(variable) == 'undefined') ) {
        return true;
    }
    return false;
  }

  $( document ).ready(function() {
      const LOGIN_PAGE = '/static/login.html';
      if (sessionStorage.getItem("access_token") == "") {
        window.location.href = LOGIN_PAGE;
      }

      if ( !$(this).isInSession(sessionStorage.getItem("companyId")) ) {
        sessionStorage.setItem("companyId", 0);
      }
      sessionStorage.setItem("areaId", 0);
      sessionStorage.setItem("categoryId", 0);
      sessionStorage.setItem("indicatorId", 0);
      sessionStorage.setItem("templateId", 0);

      if ( !$(this).isInSession(sessionStorage.getItem("areaId")) ) {
        sessionStorage.setItem("areaId", 0);
      }
      if ( !$(this).isInSession(sessionStorage.getItem("templateId")) ) {
        sessionStorage.setItem("templateId", 0);
      }
      if ( !$(this).isInSession(sessionStorage.getItem("categoryId")) ) {
        sessionStorage.setItem("categoryId", 0);
      }
      if ( !$(this).isInSession(sessionStorage.getItem("indicatorId")) ) {
        sessionStorage.setItem("indicatorId", 0);
      }

  });
