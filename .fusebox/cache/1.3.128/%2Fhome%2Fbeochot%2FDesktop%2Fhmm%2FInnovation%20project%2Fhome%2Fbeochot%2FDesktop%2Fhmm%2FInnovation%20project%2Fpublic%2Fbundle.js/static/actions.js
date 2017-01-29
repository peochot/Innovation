module.exports = { contents: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.closeDiscussModal = exports.openDiscussModal = exports.logout = exports.loginUserRequest = exports.loginUserFailure = exports.loginUserSuccess = exports.selectJob = undefined;\n\nvar _stringify = require('babel-runtime/core-js/json/stringify');\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nexports.loginUser = loginUser;\nexports.bookmarkJob = bookmarkJob;\nexports.applyJob = applyJob;\nexports.addBookmark = addBookmark;\nexports.addApplication = addApplication;\nexports.receiveBookmarks = receiveBookmarks;\nexports.receiveApplications = receiveApplications;\nexports.receiveLetters = receiveLetters;\nexports.createLetters = createLetters;\nexports.fetchJobs = fetchJobs;\nexports.fetchTags = fetchTags;\nexports.receiveJobs = receiveJobs;\nexports.fetchBookmarks = fetchBookmarks;\nexports.fetchApplications = fetchApplications;\nexports.fetchLetters = fetchLetters;\nexports.bookmark = bookmark;\nexports.apply = apply;\nexports.fetchProfile = fetchProfile;\nexports.setProfile = setProfile;\nexports.updateProfile = updateProfile;\n\nvar _constants = require('./store/constants');\n\nvar Action = _interopRequireWildcard(_constants);\n\nvar _reactRouter = require('react-router');\n\nvar _utils = require('./utils');\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar selectJob = exports.selectJob = function selectJob(jobId) {\n    return {\n        type: Action.SELECT_JOB,\n        jobId: jobId\n    };\n}; //import {push} from 'react-router-redux'\nvar loginUserSuccess = exports.loginUserSuccess = function loginUserSuccess(auth) {\n    localStorage.setItem('token', auth.token);\n    return {\n        type: Action.LOGIN_USER_SUCCESS,\n        auth: auth\n    };\n};\n\nvar loginUserFailure = exports.loginUserFailure = function loginUserFailure(error) {\n    localStorage.removeItem('token');\n    return {\n        type: Action.LOGIN_USER_FAILURE\n    };\n};\n\nvar loginUserRequest = exports.loginUserRequest = function loginUserRequest() {\n    return {\n        type: Action.LOGIN_USER_REQUEST\n    };\n};\n\nvar logout = exports.logout = function logout() {\n    localStorage.removeItem('token');\n    _reactRouter.browserHistory.push('/');\n    return {\n        type: Action.LOGOUT\n    };\n};\n\nvar openDiscussModal = exports.openDiscussModal = function openDiscussModal() {\n    return { type: Action.OPEN_DISCUSS_MODAL };\n};\n\nvar closeDiscussModal = exports.closeDiscussModal = function closeDiscussModal() {\n    return { type: Action.CLOSE_DISCUSS_MODAL };\n};\n\nfunction loginUser(email, password) {\n    var redirect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"/\";\n\n    return function (dispatch) {\n        return fetch('/api/login', {\n            method: 'post',\n            headers: {\n                'Accept': 'application/json',\n                'Content-Type': 'application/json'\n            },\n            body: (0, _stringify2.default)({ email: email, password: password })\n        }).then(checkHttpStatus).then(_utils.parseJSON).then(function (response) {\n            try {\n                //  let decoded = jwtDecode(response.token);\n                //  dispatch(push(redirect));\n\n                dispatch(loginUserSuccess(response.token));\n            } catch (e) {\n                dispatch(loginUserFailure({\n                    response: {\n                        status: 403,\n                        statusText: 'Invalid token'\n                    }\n                }));\n            }\n        }).catch(function (error) {\n            dispatch(loginUserFailure(error));\n        });\n    };\n}\nfunction bookmarkJob(jobId) {\n    return {\n        type: Action.BOOKMARK_JOB,\n        jobId: jobId\n    };\n}\nfunction applyJob(jobId) {\n    return {\n        type: Action.APPLY_JOB,\n        jobId: jobId\n    };\n}\nfunction addBookmark(data) {\n    return {\n        type: Action.ADD_BOOKMARK,\n        data: data\n    };\n}\nfunction addApplication(data) {\n    return {\n        type: Action.ADD_APPLICATION,\n        data: data\n    };\n}\n\nfunction receiveBookmarks(data) {\n    return {\n        type: Action.RECEIVE_BOOKMARKS,\n        data: data\n    };\n}\nfunction receiveApplications(data) {\n    return {\n        type: Action.RECEIVE_APPLICATIONS,\n        data: data\n    };\n}\nfunction receiveLetters(data) {\n    return {\n        type: Action.RECEIVE_LETTERS,\n        data: data\n    };\n}\n\nfunction createLetters(data) {\n    return function (dispatch, state) {\n        return (0, _utils.postFormData)('/api/letter', data).then(function (res) {\n            console.log(res);\n        }).catch(function (err) {\n            console.error(err);\n        });\n    };\n}\n\nfunction fetchJobs() {\n    return function (dispatch, state) {\n        //      dispatch(fetchingJobs());\n        return (0, _utils.request)('/api/job').then(function (response) {\n            dispatch(receiveJobs(response.data));\n        }).catch(function (error) {\n            console.log(error);\n            /*\n              if(error.response.status === 401) {\n                dispatch(loginUserFailure(error));\n                dispatch(push('/login'))\n              }\n              */\n        });\n    };\n}\n\nfunction fetchTags() {\n    return function (dispatch, state) {\n        dispatch(receiveTags(['developer', 'thai', 'ohjelmointi', 'kehittaja']));\n    };\n}\n\nfunction receiveTags(data) {\n    return {\n        type: Action.RECEIVE_TAGS_SUCCESS,\n        data: data\n    };\n}\n// TODO: REQ , SUC ,FAIL\nfunction receiveJobs(data) {\n    return {\n        type: Action.RECEIVE_JOBS,\n        data: data\n    };\n}\n\nfunction fetchBookmarks() {\n    return function (dispatch, state) {\n        //      dispatch(fetchingJobs());\n        return (0, _utils.request)('/api/myJob?type=bookmark').then(function (response) {\n            dispatch(receiveBookmarks(response.data));\n        }).catch(function (error) {\n            console.log(error);\n            /*\n              if(error.response.status === 401) {\n                dispatch(loginUserFailure(error));\n                dispatch(push('/login'))\n              }\n              */\n        });\n    };\n}\n\nvar mockFetchLetter = [];\n\nfunction fetchApplications() {\n    return function (dispatch, state) {\n        //      dispatch(fetchingJobs());\n        return (0, _utils.request)('/api/myJob?type=application').then(function (response) {\n            dispatch(receiveApplications(response.data));\n        }).catch(function (error) {\n            console.log(error);\n            /*\n              if(error.response.status === 401) {\n                dispatch(loginUserFailure(error));\n                dispatch(push('/login'))\n              }\n              */\n        });\n    };\n}\nfunction fetchLetters() {\n    return function (dispatch, state) {\n        //      dispatch(fetchingJobs());\n        return (0, _utils.request)('/api/letter').then(function (response) {\n            dispatch(receiveLetters(response.letters));\n        }).catch(function (error) {\n            console.log(error);\n            /*\n              if(error.response.status === 401) {\n                dispatch(loginUserFailure(error));\n                dispatch(push('/login'))\n              }\n              */\n        });\n    };\n}\nfunction bookmark(jobId) {\n    return function (dispatch, state) {\n        //      dispatch(fetchingJobs());\n        return (0, _utils.request)('/api/job/' + jobId + '/bookmark', undefined, \"POST\").then(function (response) {\n            dispatch(addBookmark(response.data));\n            dispatch(bookmarkJob(jobId));\n        }).catch(function (error) {\n            console.log(error);\n        });\n    };\n}\nfunction apply(jobId, index) {\n    return function (dispatch, state) {\n        //      dispatch(fetchingJobs());\n        return (0, _utils.request)('/api/job/' + jobId + '/apply', undefined, \"POST\").then(function (response) {\n            dispatch(addApplication(response.data));\n            dispatch(applyJob(jobId));\n        }).catch(function (error) {\n            console.log(error);\n            /*\n              if(error.response.status === 401) {\n                dispatch(loginUserFailure(error));\n                dispatch(push('/login'))\n              }\n              */\n        });\n    };\n}\n\nvar mockProfile = {\n    firstName: 'Tri',\n    lastName: 'Nguyen',\n    title: 'Student',\n    company: 'Metropolia Oy',\n    experiences: [],\n    applications: [1, 2, 3, 4],\n    templates: [1, 2]\n};\n\nfunction fetchProfile() {\n    return function (dispatch, state) {\n        return (0, _utils.request)('/api/profile').then(function (res) {\n            dispatch(fetchProfileSuccess(res.data));\n        }).catch(function (error) {\n            dispatch(fetchProfileFailed(error));\n        });\n    };\n}\n\nfunction setProfile(data) {\n    return function (dispatch, state) {\n        // TODO: PUT/ POST\n        (0, _utils.request)('api/profile', data, 'POST').then(function (res) {\n            return dispatch(setProfileSuccess);\n        }).catch(function (err) {\n            return dispatch(setProfileFailed);\n        });\n    };\n}\n\nvar setProfileSuccess = function setProfileSuccess(newUserProfile) {\n    return {\n        type: Action.UPDATE_PROFILE_SUCCESS,\n        data: newUserProfile\n    };\n};\n\nvar setProfileFailed = function setProfileFailed(errMsg) {\n    return {\n        type: Action.UPDATE_PROFILE_FAILED,\n        error: errMsg\n    };\n};\n\nvar fetchProfileSuccess = function fetchProfileSuccess(data) {\n    return {\n        type: Action.RECEIVE_PROFILE_SUCCESS,\n        data: data\n    };\n};\n\nvar fetchProfileFailed = function fetchProfileFailed(err) {\n    return {\n        type: Action.RECEIVE_PROFILE_FAILED,\n        err: err\n    };\n};\n\nfunction updateProfile(profilePayload) {\n    return function (dispatch, state) {\n        return fetch('/api/myProfile', {\n            method: 'post',\n            headers: {\n                'Accept': 'application/json',\n                'Content-Type': 'application/json'\n            },\n            body: (0, _stringify2.default)(profilePayload)\n        }).then(checkHttpStatus) // WTF are these ?\n        .then(_utils.parseJSON).then(function (res) {\n            console.log('update profile res', res);\n            try {\n                dispatch(updateProfileSuccess(res));\n            } catch (e) {\n                dispatch(updateProfileFailed(e));\n            }\n        }).catch(function (err) {\n            console.log('update profile err', err);\n            dispatch(updateProfileFailed(err));\n        });\n    };\n}\n\nvar updateProfileSuccess = function updateProfileSuccess(data) {\n    return {\n        type: Action.UPDATE_PROFILE_SUCCESS,\n        data: data\n    };\n};\n\nvar updateProfileFailed = function updateProfileFailed(message) {\n    return {\n        type: Action.UPDATE_PROFILE_FAILED,\n        message: message\n    };\n};",
dependencies: ["babel-runtime/core-js/json/stringify","./store/constants","react-router","./utils"],
sourceMap: {},
headerContent: undefined,
mtime: 1489853220300
};