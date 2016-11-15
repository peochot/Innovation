import * as Names from './store/constants';

let initAuth = {
  token: null,
  user: {},
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}

export const auth = (state = initAuth, action) => {
  switch (action.type) {
    case Names.LOGIN_USER_SUCCESS:
      return action.auth;
    case Names.LOGOUT:
      return initAuth;
    default:
      return state;
  }
};

export const jobs = (state=[], action) => {
  switch (action.type) {
    case Names.RECEIVE_JOBS:
      return action.data || state;
    case Names.BOOKMARK_JOB:
      return state.map((job)=>{
        if(action.jobId==job._id){
          return {
            ...job,
            bookmarked:true
          };
        }
        return job;
      });
    case Names.APPLY_JOB:
      return state.map((job)=>{
        if(action.jobId==job._id){
          return {
            ...job,
            applied:true
          };
        }
        return job;
      });
    default:
      return state;
}};

export const selectedJob= (state=null, action) => {
  switch (action.type) {
    case Names.SELECT_JOB:
      return action.jobId;
    default:
      return state;
}};
export const bookmark = (state=[],action)=>{
  switch (action.type) {
    case Names.RECEIVE_BOOKMARKS:
      return action.data || state;
    case Names.ADD_BOOKMARK:
      return state.concat([action.data]);
    default:
      return state;
}};
export const application = (state=[],action)=>{
  switch (action.type) {
    case Names.RECEIVE_APPLICATIONS:
      return action.data || state;
    case Names.ADD_APPLICATION:
      return state.concat([action.data]);
    default:
      return state;
}};
export const letter = (state=[],action)=>{
  switch(action.type){
    case Names.RECEIVE_LETTERS
      return action.data||state;
    case Names.ADD_LETTER:
      return state.concat([action.data]);
    default:
      return state;
  }
}
