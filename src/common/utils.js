export function generateQueryParameters(options) {
  if (options) {
    const keys = Object.keys(options);
    if (keys.length >= 1) {
      let queryString = "?";
      keys.forEach((item) => {
        if (Array.isArray(options[item])) {
          options[item].forEach((sub) => {
            queryString = `${queryString}${item}=${encodeURIComponent(sub)}&`;
          });
        } else {
          if (options[item])
            queryString = `${queryString}${item}=${encodeURIComponent(
              options[item]
            )}&`;
        }
      });
      return queryString;
    } else {
      return "";
    }
  }
  return "";
}


export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
