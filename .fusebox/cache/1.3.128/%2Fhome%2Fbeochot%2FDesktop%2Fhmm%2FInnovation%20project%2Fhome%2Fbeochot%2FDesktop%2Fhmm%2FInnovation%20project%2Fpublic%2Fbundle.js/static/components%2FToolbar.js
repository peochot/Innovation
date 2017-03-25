module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = require('react');\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _AppBar = require('material-ui/AppBar');\n\nvar _AppBar2 = _interopRequireDefault(_AppBar);\n\nvar _IconButton = require('material-ui/IconButton');\n\nvar _IconButton2 = _interopRequireDefault(_IconButton);\n\nvar _close = require('material-ui/svg-icons/navigation/close');\n\nvar _close2 = _interopRequireDefault(_close);\n\nvar _FlatButton = require('material-ui/FlatButton');\n\nvar _FlatButton2 = _interopRequireDefault(_FlatButton);\n\nvar _Avatar = require('material-ui/Avatar');\n\nvar _Avatar2 = _interopRequireDefault(_Avatar);\n\nvar _reactRouter = require('react-router');\n\nvar _reactRedux = require('react-redux');\n\nvar _actions = require('./../actions');\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction handleTouchTap() {\n  _reactRouter.browserHistory.push('/');\n}\n\nvar styles = {\n  title: {\n    cursor: 'pointer'\n  }\n};\nvar mapStateToProps = function mapStateToProps(_ref) {\n  var auth = _ref.auth;\n  return { auth: auth };\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    logout: function logout() {\n      return dispatch((0, _actions.logout)());\n    }\n  };\n};\n\nvar Toolbar = function Toolbar(props) {\n  var AccountManagement = void 0;\n  if (props.auth.isAuthenticated) {\n    AccountManagement = _react2.default.createElement(\n      'div',\n      { id: 'userManagement', style: { display: 'flex', alignItems: 'center' } },\n      _react2.default.createElement(_FlatButton2.default, {\n        containerElement: _react2.default.createElement(_reactRouter.Link, { to: '/' }),\n        label: 'Home' }),\n      _react2.default.createElement(_FlatButton2.default, {\n        containerElement: _react2.default.createElement(_reactRouter.Link, { to: '/map' }),\n        label: 'Job Map' }),\n      _react2.default.createElement(_FlatButton2.default, { style: { color: '#FFFFFF' }, label: props.auth.user.firstName,\n        secondary: true,\n        icon: _react2.default.createElement(\n          _Avatar2.default,\n          { size: 30 },\n          props.auth.user.firstName\n        ),\n        containerElement: _react2.default.createElement(_reactRouter.Link, { to: '/profile' }) }),\n      _react2.default.createElement(_FlatButton2.default, { style: { color: '#FFFFFF' }, onTouchTap: function onTouchTap() {\n          return props.logout();\n        }, label: 'Sign out' })\n    );\n  } else {\n    AccountManagement = _react2.default.createElement(\n      'div',\n      { id: 'userManagement', style: { display: 'flex', alignItems: 'center' } },\n      _react2.default.createElement(_FlatButton2.default, { style: { color: '#FFFFFF' }, href: '/google', label: 'Sign in' })\n    );\n  }\n\n  return _react2.default.createElement(\n    _AppBar2.default,\n    {\n      title: _react2.default.createElement(\n        'span',\n        { style: styles.title },\n        'Smart Career'\n      ),\n      onTitleTouchTap: handleTouchTap,\n      iconClassNameRight: 'muidocs-icon-navigation-expand-more' },\n    AccountManagement\n  );\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Toolbar);\nmodule.exports = exports['default'];",
dependencies: ["react","material-ui/AppBar","material-ui/IconButton","material-ui/svg-icons/navigation/close","material-ui/FlatButton","material-ui/Avatar","react-router","react-redux","./../actions"],
sourceMap: {},
headerContent: undefined,
mtime: 1489853220304
};