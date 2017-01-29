module.exports = { contents: "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _stringify = require(\"babel-runtime/core-js/json/stringify\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nexports.getCookie = getCookie;\nexports.request = request;\nexports.postFormData = postFormData;\n\nvar _isomorphicFetch = require(\"isomorphic-fetch\");\n\nvar _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar API_URL = \"/api/\";\n\nfunction checkHttpStatus(response) {\n    if (response.status >= 200 && response.status < 300) {\n        return response;\n    } else {\n        var error = new Error(response.statusText);\n        error.response = response;\n        throw error;\n    }\n}\n\nfunction parseJSON(response) {\n    return response.json();\n}\n\nfunction getCookie(cname) {\n    var name = cname + \"=\";\n    var ca = document.cookie.split(';');\n    for (var i = 0; i < ca.length; i++) {\n        var c = ca[i];\n        while (c.charAt(0) == ' ') {\n            c = c.substring(1);\n        }\n        if (c.indexOf(name) == 0) {\n            return c.substring(name.length, c.length);\n        }\n    }\n    return \"\";\n}\nfunction request(endpoint, body) {\n    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"GET\";\n\n    return (0, _isomorphicFetch2.default)(endpoint, {\n        headers: { 'content-type': 'application/json', 'Authorization': localStorage.getItem(\"token\") },\n        method: method,\n        body: (0, _stringify2.default)(body)\n    }).then(checkHttpStatus).then(parseJSON);\n}\nfunction postFormData(endpoint, body) {\n    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"POST\";\n\n    // TODO : If no token , please do something\n    return (0, _isomorphicFetch2.default)(\"\" + endpoint, {\n        headers: { 'Authorization': localStorage.getItem(\"token\") },\n        method: method,\n        body: body\n    }).then(checkHttpStatus).then(parseJSON);\n}",
dependencies: ["babel-runtime/core-js/json/stringify","isomorphic-fetch"],
sourceMap: {},
headerContent: undefined,
mtime: 1484491101009
};