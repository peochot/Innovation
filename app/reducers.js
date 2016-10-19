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
      return action.data || state;
    default:
      return state;
}};

export const selectedJob= (state={}, action) => {
  switch (action.type) {
    case 'SELECT_JOB':
      return action.job;
    default:
      return state;
}};
export const bookmark = (state=[],action)=>{
  switch (action.type) {
    case 'RECEIVE_BOOKMARKS':
      return action.data || state;
    case 'ADD_BOOKMARK':
      return state.concat([action.data]);
    default:
      return state;
}};
export const application = (state=[],action)=>{
  switch (action.type) {
    case 'RECEIVE_APPLICATIONS':
      return action.data || state;
    case 'ADD_APPLICATION':
      return state.concat([action.data]);
    default:
      return state;
}};
