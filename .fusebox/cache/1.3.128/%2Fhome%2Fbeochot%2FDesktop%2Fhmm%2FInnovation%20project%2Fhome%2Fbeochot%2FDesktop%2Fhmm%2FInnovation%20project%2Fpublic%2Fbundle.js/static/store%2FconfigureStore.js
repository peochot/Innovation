module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _redux = require('redux');\n\nvar redux = _interopRequireWildcard(_redux);\n\nvar _reduxThunk = require('redux-thunk');\n\nvar _reduxThunk2 = _interopRequireDefault(_reduxThunk);\n\nvar _reactRouterRedux = require('react-router-redux');\n\nvar _reducers = require('../reducers');\n\nvar reducers = _interopRequireWildcard(_reducers);\n\nvar _reduxForm = require('redux-form');\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n/*\nexport default (history,initialState = {}) => {\n  reducers.routing = routerReducer;\n  let store = redux.createStore(redux.combineReducers(reducers), initialState, redux.compose(\n    redux.applyMiddleware(thunk,routerMiddleware(history)),\n    window.devToolsExtension ? window.devToolsExtension() : f => f\n  ));\n\n  return store;\n};\n*/\n\nexports.default = function () {\n  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  reducers.routing = _reactRouterRedux.routerReducer;\n  reducers.form = _reduxForm.reducer;\n  var store = redux.createStore(redux.combineReducers(reducers), initialState, redux.compose(redux.applyMiddleware(_reduxThunk2.default), window.devToolsExtension ? window.devToolsExtension() : function (f) {\n    return f;\n  }));\n\n  return store;\n};\n\nmodule.exports = exports['default'];",
dependencies: ["redux","redux-thunk","react-router-redux","../reducers","redux-form"],
sourceMap: {},
headerContent: undefined,
mtime: 1480780509964
};