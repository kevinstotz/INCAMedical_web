// Limit the length of txt displayed in drop down

function textLength(text, length, ellipsis=true) {
    return text.substring(0, length) + ( (ellipsis && text.length > length) ? '...' : '' );
}

function isAuthorized(response) {

  if (response) {
    if (response.status == 401) {
      window.location.href = LOGIN_PAGE;
      return false;
    }
  }
  return true;
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
