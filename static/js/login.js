  function field_focus(field, email) {
    if (field.value == email) {
      field.value = '';
    }
  }

  function field_blur(field, email) {
    if(field.value == '') {
      field.value = email;
    }
  }

  function extractToken(hash) {
        var match = hash.match(/access_token=([\w-]+)/);
        return !!match && match[1];
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
            //API_URI = '/api' + API_VERSION;
            //API_ENDPOINT = API_BASE_URL + API_URI;
            AUTHORIZATION_ENDPOINT = API_BASE_URL + "/o/";

            WEBSITE_HOST = data.web_endpoint;
            WEBSITE_PORT = data.web_port;
            WEBSITE_URI = '';
            WEBSITE_ENDPOINT = data.insecure + WEBSITE_HOST + ':' + WEBSITE_PORT.toString() + WEBSITE_URI;

            ALLOWED_ORIGIN = WEBSITE_HOST + ':' + API_PORT.toString();
          });
    };
    wrapp();

  $(document).ready(function() {
      const LOGIN_PAGE = '/static/login.html';
      const redirectURI = WEBSITE_ENDPOINT;
      const API_USER_LOGIN = '/accounts/login/';
      const DASHBOARD_PAGE = WEBSITE_ENDPOINT;
      var token = extractToken(document.location.hash);
      function API_UPDATE_LOGIN(url, data, success, error, dataType) {

        $.ajax({
          type: "PATCH",
          url: url,
          data: data,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
          },
          xhrFields: {
          },
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN
          },
          success: success,
          error: error,
          contentType:"application/x-www-form-urlencoded; charset=utf-8",
          crossDomain:true,
          dataType: dataType
        });
        return true;
      }

      function API_POST_LOGIN(url, data, success, error, dataType) {

        $.ajax({
          type: "POST",
          url: url,
          data: data,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
          },
          xhrFields: {
          },
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN
          },
          success: success,
          error: error,
          contentType:"application/x-www-form-urlencoded; charset=utf-8",
          crossDomain:true,
          dataType: dataType
        });
        return true;
      }

      function API_GET_LOGIN(url, queryString, success, error, dataType) {

        $.ajax({
          type: "GET",
          url: url + queryString,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
          },
          xhrFields: {
          },
          headers: {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/json'
          },
          success: success,
          error: error,
          contentType:"application/x-www-form-urlencoded; charset=utf-8",
          crossDomain:true,
          dataType: dataType
        });
        return true;
      }

      function  user_login(login_details) {
        API_POST_LOGIN(API_BASE_URL + API_USER_LOGIN, login_details, userLoginSuccess, userLoginFailure, "json");
      }

      function userLoginSuccess(result) {
        console.log(result);
        if (result) {

          sessionStorage.setItem('access_token', result.data['access_token']);
          sessionStorage.setItem('refresh_token', result.data['refresh_token']);
          sessionStorage.setItem('token_type', result.data['token_type']);
          window.location.href = DASHBOARD_PAGE;
        }
      }

      function userLoginFailure(result) {
        sessionStorage.setItem('access_token', "");
        sessionStorage.setItem('refresh_token', "");
        sessionStorage.setItem('token_type', "");
        console.log(result);
      }

      $('#login-link').click(function(event) {
        event.preventDefault();
        $('#login-form').submit();
      });

      $('#login-form').submit(function(event) {
        event.preventDefault();
        var login_details = "";
        $.each($(this).serializeArray(), function(i, field) {
            login_details += [field.name] + "=" + field.value + "&";
        });

        login_details += "client_id" + "=" + sessionStorage.getItem('client_id');
        login_details += "&redirect_uri" + "=" + redirectURI;
        login_details += "&scope" + "=" + {'read': 'Read scope'};
        login_details += "&response_type" + "=" + "token";

        user_login(login_details);

      });

      function user_register(register_details) {
        API_POST_LOGIN(API_ENDPOINT + API_USER_REGISTER, register_details, userRegisterSuccess, userRegisterFailure, "json");
      }

      function userRegisterSuccess(result) {
        if (result) {
          console.log(result);
          console.log("success")
        }
      }

      function userRegisterFailure(result) {
        console.log(result.responseJSON);
      }

      $('#register-link').click(function(event) {
        event.preventDefault();
        $('#register-form').submit();
      });

      $('#register-form').submit(function(event) {
        event.preventDefault();
        var register_details = {};
        $.each($(this).serializeArray(), function(i, field) {
            register_details[field.name] = field.value;
        });
        user_register(register_details);

      });

      function forgotPasswordSuccess(result) {
        console.log("success");
        console.log(result);
      }

      function forgotPasswordFailure(result) {
        console.log("failure");
        sessionStorage.setItem('access_token', "");
        sessionStorage.setItem('refresh_token', "");
        sessionStorage.setItem('token_type', "");
        console.log(result);
      }

      function forgot_password(forgot_password_details) {
        API_GET_LOGIN(API_URI + API_USER_FORGOT_PASSWORD, "?email=" + forgot_password_details, forgotPasswordSuccess, forgotPasswordFailure, "json");
      }

      $('#forgot-password').click(function(event) {
        event.preventDefault();
        $('#forgot-password-form').submit();
        return false;
      });

      $('#forgot-password-form').submit(function(event) {
        event.preventDefault();
        var forgot_password_details = "";
        $.each($(this).serializeArray(), function(i, field) {
            forgot_password_details = field.value;
        });

        forgot_password(forgot_password_details);
        return false;
      });


      //------------


      function resetPasswordSuccess(result) {
        console.log("success");
        console.log(result);
        window.location.href = LOGIN_PAGE;
      }

      function resetPasswordFailure(result) {
        console.log("failure");
        sessionStorage.setItem('access_token', "");
        sessionStorage.setItem('refresh_token', "");
        sessionStorage.setItem('token_type', "");
        console.log(result);
        window.location.href = LOGIN_PAGE;
      }

      function reset_password(uuid, reset_password_details) {
        API_UPDATE_LOGIN(API_URI + API_USER_RESET_PASSWORD + uuid + "/", reset_password_details, resetPasswordSuccess, resetPasswordFailure, "application/json");
      }

      $('#reset-password').click(function(event) {
        event.preventDefault();
        $('#reset-password-form').submit();
        return false;
      });

      $('#reset-password-form').submit(function(event) {
        event.preventDefault();
        var reset_password_details = {};
        $.each($(this).serializeArray(), function(i, field) {
          reset_password_details[field.name] = field.value;
        });

        var uuid = "";
        $.each(document.location.search.substr(1).split('&'),function(c, q) {
          var i = q.split('=');
          uuid = i[1].toString();
        });
        console.log(reset_password_details);
        reset_password(uuid, reset_password_details);
        return false;
      });

  });
