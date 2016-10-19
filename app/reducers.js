let initAuth={
  token: null,
  user: {},
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}

export const auth = (state = initAuth, action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      return action.auth;
    case 'LOGOUT':
      return initAuth;
    default:
      return state;
  }
};

export const jobs = (state=[], action) => {
  switch (action.type) {
    case 'RECEIVE_JOBS':
      return action.data.jobs || state;
    default:
      return state;
}};

export const selectedJob= (state=null, action) => {
  console.log("Whyyy");
  switch (action.type) {
    case 'SELECT_JOB':
      return action.job_id;
    default:
      return state;
}};
