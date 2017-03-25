module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Toolbar = require('./Toolbar');\n\nvar _Toolbar2 = _interopRequireDefault(_Toolbar);\n\nvar _reactRedux = require('react-redux');\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar App = function App(_ref) {\n  var children = _ref.children;\n\n  return _react2.default.createElement(\n    'div',\n    { style: { marginBottom: '0px' } },\n    _react2.default.createElement(\n      'header',\n      { className: 'container', style: { marginBottom: '0px', paddingTop: '0px' } },\n      _react2.default.createElement(_Toolbar2.default, null)\n    ),\n    children\n  );\n};\n\nexports.default = (0, _reactRedux.connect)(null)(App);\nmodule.exports = exports['default'];",
dependencies: ["react","./Toolbar","react-redux"],
sourceMap: {},
headerContent: undefined,
mtime: 1480780509964
};