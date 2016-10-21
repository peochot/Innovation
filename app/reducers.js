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
    case 'BOOKMARK_JOB':
      console.log("Cac");
      return state.map((job)=>{
        if(action.jobId==job._id){
          return {
            ...job,
            bookmarked:true
          };
        }
        return job;
      });
    case 'APPLY_JOB':
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
    case 'SELECT_JOB':
      return action.jobId;
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
export const letter = (state=[],action)=>{
  switch(action.type){
    case 'RECEIVE_LETTERS':
      return action.data||state;
    case 'ADD_LETTER':
      return state.concat([action.data]);
    default:
      return state;
  }
}
