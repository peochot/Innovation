import fetch from 'isomorphic-fetch';

const API_URL = "/api/";

function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function parseJSON(response) {
     return response.json()
}

export function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length,c.length);
          }
      }
      return "";
}
export function request(endpoint,body,method="GET"){
      return fetch(endpoint, {
          headers: {'content-type': 'application/json', 'Authorization': localStorage.getItem("token")},
          method,
          body: JSON.stringify(body)
      }).then(checkHttpStatus)
        .then(parseJSON);
}
export function postFormData(endpoint,body,method="POST"){
      return fetch(`${endpoint}`, {
          headers: {'Authorization': localStorage.getItem("token")},
          method,
          body: body
      }).then(checkHttpStatus)
        .then(parseJSON);
}
