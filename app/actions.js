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

// export function addComment(companyId) {
//     return {
//         type: Action.ADD_COMMENT,
//         companyId
//     }
// }

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

export function createLetters(data) {
    return (dispatch, state) => {
        return postFormData('/api/letter', data).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        })
    }
}

export function addCommentToCompany(companyId, comment) {
    return (dispatch, state) => {
        return postFormData(``, comment) // TODO: {companyId}
            .then(res => {
                dispatch(commentAdded(res))// TODO
            })
            .catch(err => {
                console.error('Comment adding failed')
            })
    }
}

export function commentAdded(comment) {
    return {
        type: Action.ADD_COMMENT_SUCCESS,
        comment
    }
}

export function fetchJobDesc(jobId) {
    // console.log('fetching job with id', jobId);
    return (dispatch, state) => {
        return request(`/api/job/${jobId}`)
            .then(res => {
                dispatch(receivedJobDesc(res.data))
            })
            .catch(err => {
                console.error('fetchJobDesc err', err);
            })
    }
}


function receivedJobDesc(data) {
    return {
        type: Action.RECEIVE_JOB_DESC_SUCCESS,
        data: data
    }
}

// TODO : Fetch job by version
export function fetchJobs(keyword) {
    let uri = '/api/job';
    if (keyword) {
        uri += `?text=${keyword}`
    }

    return (dispatch, state) => {
        return request(uri)
            .then(response => {
                dispatch(receiveJobs(response.data));
            })
            .catch(error => {
                console.error(error);
            });
    }
}

// TODO !!
export function fetchTags() {
    return (dispatch, state) => {
        dispatch(receiveTags(['developer', 'thai', 'ohjelmointi', 'kehittaja']));
    }
}

function receiveTags(data) {
    return {
        type: Action.RECEIVE_TAGS_SUCCESS,
        data: data
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

const mockFetchLetter = [

];

const mockApplication = [
    {
        jobData: {
            jobTitle: '',
            jobType: '',
            jobRegion: '',
            companyName: ''
        },

    }
]

export function fetchApplications() {
    return (dispatch, state) => {
        //      dispatch(fetchingJobs());
        return request('/api/myJob?type=application')
            .then(response => {
                // dispatch(receiveApplications(response.data));
                dispatch(receiveApplications());
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
                dispatch(receiveLetters(response.letters));
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

export function applyAtJobDesc(jobId) {
    return (dispatch, state) => {
        return request(``, undefined, 'POST')
            .then(res => {
                // TODO : 
                // dispatch()
                dispatch(applyAtJobDescSuccess(res));
            })
            .catch(err => {
                dispatch(applyAtJobDescFailed(err));
            })
    }
}

function applyAtJobDescSuccess(data) {
    return {
        type: Action.APPLY_JOB_AT_JOBDESC_SUCCESS,
        data
    }
}

function applyAtJobDescFailed(reason) {
    return {
        type: Action.APPLY_JOB_AT_JOBDESC_FAILED,
        reason
    }
}

export function fetchProfile() {
    return (dispatch, state) => {
        return request('/api/profile')
            .then(res => {
                dispatch(fetchProfileSuccess(res.data))
            })
            .catch(error => {
                dispatch(fetchProfileFailed(error));
            })
    }
}

export function setProfile(data) {
    return (dispatch, state) => {
        // TODO: PUT/ POST
        request('api/profile', data, 'POST').then(res => {
            return dispatch(setProfileSuccess);
        }).catch(err => {
            return dispatch(setProfileFailed);
        });
    }
}

const setProfileSuccess = (newUserProfile) => {
    return {
        type: Action.UPDATE_PROFILE_SUCCESS,
        data: newUserProfile
    }
}

const setProfileFailed = (errMsg) => {
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
                console.log('update profile res', res);
                try {
                    dispatch(updateProfileSuccess(res));
                } catch (e) {
                    dispatch(updateProfileFailed(e));
                }
            })
            .catch(err => {
                console.log('update profile err', err)
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
