import * as Names from './store/constants';


/**
 * @Tri: Too messy 
 * Please use the state tree as Container-wise level , other wise this will be very difficult to maintain
 * Each reducers should define their initialState , not for preventing 'undefined' , but to let others aware of its structure 
 */
let initAuth = {
  token: null,
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isLogout: false
}

export const auth = (state = initAuth, action) => {
  switch (action.type) {
    case Names.LOGIN_USER_SUCCESS:
      return action.auth;
    case Names.LOGOUT:
      return {
        ...initAuth,
        isLogout: true
      };
    default:
      return state;
  }
};

let initGeoJobs = {
  jobList: [],
  lastUpdated: new Date().toISOString()
}

export const geoJob = (state = initGeoJobs, action) => {
  switch (action.type) {
    case Names.RECEIVE_JOBS:
      {
        console.log('Reducer receiving jobs',action);
        return {
          ...state,
          jobList: action.data,
          lastUpdated: new Date().toISOString()
        }
      }
    case Names.BOOKMARK_JOB:
      return state.jobList.map((job) => {
        if (action.jobId == job._id) {
          return {
            ...job,
            bookmarked: true
          };
        }
        return job;
      });
    case Names.APPLY_JOB:
      return state.jobList.map((job) => {
        if (action.jobId == job._id) {
          return {
            ...job,
            applied: true
          };
        }
        return job;
      });
    default:
      return state;
  }
};

let initCurrentJob = {

}
export const selectedJob = (state = null, action) => {
  switch (action.type) {
    case Names.SELECT_JOB:
      return action.jobId;
    default:
      return state;
  }
};

export const bookmark = (state = [], action) => {
  switch (action.type) {
    case Names.RECEIVE_BOOKMARKS:
      return action.data || state;
    case Names.ADD_BOOKMARK:
      return state.concat([action.data]);
    default:
      return state;
  }
};

export const application = (state = [], action) => {
  switch (action.type) {
    case Names.RECEIVE_APPLICATIONS:
      return action.data || state;
    case Names.ADD_APPLICATION:
      return state.concat([action.data]);
    default:
      return state;
  }
};

export const letter = (state = [], action) => {
  switch (action.type) {
    case Names.RECEIVE_LETTERS:
      return action.data || state;
    case Names.ADD_LETTER:
      return state.concat([action.data]);
    default:
      return state;
  }
};

export const profile = (state = {}, action) => {
  switch (action.type) {
    case Names.UPDATE_PROFILE_SUCCESS:
      return action.data || state;
    case Names.RECEIVE_PROFILE_SUCCESS:
      return action.data || state;
    default:
      return state;
    // case Names.UPDATE_PROFILE_FAILED:
    // case Names.RECEIVE_PROFILE_FAILED:
  }
}

export const tags = (state = [], action) => {
  switch (action.type) {
    case Names.RECEIVE_TAGS_SUCCESS: {
      return action.data || state;
    }
    default: return state;
  }
}
