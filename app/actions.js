//import {push} from 'react-router-redux'
import { checkHttpStatus, parseJSON } from './utils';
export const selectJob = job_id => ({
    type: "SELECT_JOB",
    job_id
});
export const loginUserSuccess = auth => {
  localStorage.setItem('token', auth.token);
  return {
    type: "LOGIN_USER_SUCCESS",
    auth
  }
}

export const loginUserFailure= error => {
  localStorage.removeItem('token');
  return {
    type: "LOGIN_USER_FAILURE"
  }
}

export const loginUserRequest= () => {
    type: "LOGIN_USER_REQUEST"
}

export const logout= () => {
    localStorage.removeItem('token');
    return {
        type: "LOGOUT"
    }
}

export const logoutAndRedirect= () => {
    return (dispatch, state) => {
        dispatch(logout());
        //dispatch(push('/login'))
    }
}

export function loginUser(email, password, redirect="/") {
    return (dispatch)=> {
//        dispatch(loginUserRequest());
        return fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({email: email, password: password})
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

export function receiveProtectedData(data) {
    return {
        type: "RECEIVE_JOBS",
        data
    }
}

export function fetchJobs(token) {

    return (dispatch, state) => {
//      dispatch(fetchProtectedDataRequest());
        return fetch('/api/job', {
                headers: {
                    'Authorization': token
                }
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response));
            })
            .catch(error => {
              console.log(error);
              /*
                if(error.response.status === 401) {
                  dispatch(loginUserFailure(error));
                  dispatch(push('/login'))
                }
                */
            })
       }
}

/*
export const receiveData = data => ({ type: 'RECEIVE_DATA', data: data });

export var startLogin = () => {
  return (dispatch, getState) => {
    fetch('/api/login')
      .then(res => res.json())
      .then(json => dispatch(receiveData(json)));
  };
};
export const fetchJob = () => {
  return dispatch => {
    fetch('/api/job')
      .then(res => res.json())
      .then(json => dispatch(receiveData(json)));
  };
};
*/
