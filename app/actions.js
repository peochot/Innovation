//import {push} from 'react-router-redux'
import * as Action from './store/constants';
import { browserHistory } from 'react-router'

import { request, postFormData, parseJSON } from './utils';
export const selectJob = (jobId) => ({
    type: Action.SELECT_JOB,
    jobId
});
export const loginUserSuccess = auth => {
    localStorage.setItem('token', auth.token);
    return {
        type: Action.LOGIN_USER_SUCCESS,
        auth
    }
}

export const loginUserFailure = error => {
    localStorage.removeItem('token');
    return {
        type: Action.LOGIN_USER_FAILURE
    }
}

export const loginUserRequest = () => {
    return {
        type: Action.LOGIN_USER_REQUEST
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    browserHistory.push('/')
    return {
        type: Action.LOGOUT
    }
}


export const openDiscussModal = () => {
    return { type: Action.OPEN_DISCUSS_MODAL }
}

export const closeDiscussModal = () => {
    return { type: Action.CLOSE_DISCUSS_MODAL }
}

export function loginUser(email, password, redirect = "/") {
    return (dispatch) => {
        return fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    //  let decoded = jwtDecode(response.token);
                    //  dispatch(push(redirect));

                    dispatch(loginUserSuccess(response.token));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}
export function bookmarkJob(jobId) {
    return {
        type: Action.BOOKMARK_JOB,
        jobId
    }
}
export function applyJob(jobId) {
    return {
        type: Action.APPLY_JOB,
        jobId
    }
}
export function addBookmark(data) {
    return {
        type: Action.ADD_BOOKMARK,
        data
    }
}
export function addApplication(data) {
    return {
        type: Action.ADD_APPLICATION,
        data
    }
}

export function receiveBookmarks(data) {
    return {
        type: Action.RECEIVE_BOOKMARKS,
        data
    }
}
export function receiveApplications(data) {
    return {
        type: Action.RECEIVE_APPLICATIONS,
        data
    }
}
export function receiveLetters(data) {
    return {
        type: Action.RECEIVE_LETTERS,
        data
    }
}

export function fetchJobs() {
    return (dispatch, state) => {
        //      dispatch(fetchingJobs());
        return request('/api/job')
            .then(response => {
                dispatch(receiveJobs(response.data));
            })
            .catch(error => {
                console.log(error);
                /*
                  if(error.response.status === 401) {
                    dispatch(loginUserFailure(error));
                    dispatch(push('/login'))
                  }
                  */
            });
    }
}
// TODO: REQ , SUC ,FAIL
export function receiveJobs(data) {
    return {
        type: Action.RECEIVE_JOBS,
        data
    }
}

export function fetchBookmarks() {
    return (dispatch, state) => {
        //      dispatch(fetchingJobs());
        return request('/api/myJob?type=bookmark')
            .then(response => {
                dispatch(receiveBookmarks(response.data));
            })
            .catch(error => {
                console.log(error);
                /*
                  if(error.response.status === 401) {
                    dispatch(loginUserFailure(error));
                    dispatch(push('/login'))
                  }
                  */
            });
    }
}
export function fetchApplications() {
    return (dispatch, state) => {
        //      dispatch(fetchingJobs());
        return request('/api/myJob?type=application')
            .then(response => {
                dispatch(receiveApplications(response.data));
            })
            .catch(error => {
                console.log(error);
                /*
                  if(error.response.status === 401) {
                    dispatch(loginUserFailure(error));
                    dispatch(push('/login'))
                  }
                  */
            });
    }
}
export function fetchLetters() {
    return (dispatch, state) => {
        //      dispatch(fetchingJobs());
        return request('/api/letter')
            .then(response => {
                dispatch(receiveLetters(response.data));
            })
            .catch(error => {
                console.log(error);
                /*
                  if(error.response.status === 401) {
                    dispatch(loginUserFailure(error));
                    dispatch(push('/login'))
                  }
                  */
            });
    }
}
export function bookmark(jobId) {
    return (dispatch, state) => {
        //      dispatch(fetchingJobs());
        return request(`/api/job/${jobId}/bookmark`, undefined, "POST")
            .then(response => {
                dispatch(addBookmark(response.data));
                dispatch(bookmarkJob(jobId));
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export function apply(jobId, index) {
    return (dispatch, state) => {
        //      dispatch(fetchingJobs());
        return request(`/api/job/${jobId}/apply`, undefined, "POST")
            .then(response => {
                dispatch(addApplication(response.data));
                dispatch(applyJob(jobId));
            })
            .catch(error => {
                console.log(error);
                /*
                  if(error.response.status === 401) {
                    dispatch(loginUserFailure(error));
                    dispatch(push('/login'))
                  }
                  */
            });
    }
}

let mockProfile = {
    firstName: 'Tri',
    lastName: 'Nguyen',
    title: 'Student',
    company: 'Metropolia Oy',
    experiences : [

    ],
    applications: [
        1,2,3,4
    ],
    letterTemplates: [
        {
            id: 1,
            templateName: 'Template Senior DEveloper',
            contentUrl : 'abcabc'
        },
        {
            id: 2,
            templateName: 'Template Bad Developer',
            contentUrl: '',
            contentString: ''
        }
    ]
}

export function fetchProfile() {
    return (dispatch, state) => {
        // TODO : Later
        // return request('/api/myProfile')
        //     .then(res => {
        //         dispatch(fetchProfileSuccess(res.data))
        //     })
        //     .catch(error => {
        //         dispatch(fetchProfileFailed(error));
        //     })
        return dispatch(fetchProfileSuccess(mockProfile));
    }
}

export function setProfile( data ) {
    return (dispatch, state) => {
        // TODO: PUT/ POST
        postFormData(data).then( res => {
            console.log('form post response',parseJSON(res));
            return dispatch(setProfileSuccess);         
        }).catch( err => {
            console.error('error postProfile',err);
            return dispatch(setProfileFailed);
        });
    }
}

const setProfileSuccess = ( newUserProfile ) => {
    return {
        type: Action.UPDATE_PROFILE_SUCCESS,
        data: newUserProfile
    }
}

const setProfileFailed = ( errMsg) => {
    return {
        type: Action.UPDATE_PROFILE_FAILED,
        error: errMsg
    }
}

const fetchProfileSuccess = (data) => {
    return {
        type: Action.RECEIVE_PROFILE_SUCCESS,
        data
    }
}

const fetchProfileFailed = (err) => {
    return {
        type: Action.RECEIVE_PROFILE_FAILED,
        err
    }
}

export function updateProfile(profilePayload) {
    return (dispatch, state) => {
        return fetch('/api/myProfile', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profilePayload)
        })
            .then(checkHttpStatus) // WTF are these ?
            .then(parseJSON)
            .then(res => {
                console.log('update profile res',res);
                try {
                    dispatch(updateProfileSuccess(res));
                } catch (e) {
                    dispatch(updateProfileFailed(e));
                }
            })
            .catch(err => {
                console.log('update profile err',err)
                dispatch(updateProfileFailed(err))
            })
    }
}

const updateProfileSuccess = (data) => {
    return {
        type: Action.UPDATE_PROFILE_SUCCESS,
        data
    }
}

const updateProfileFailed = (message) => {
    return {
        type: Action.UPDATE_PROFILE_FAILED,
        message
    }
}
