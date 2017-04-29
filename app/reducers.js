import * as Message from './store/constants';


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
    case Message.LOGIN_USER_SUCCESS:
      return action.auth;
    case Message.LOGOUT:
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
    case Message.RECEIVE_JOBS:
      {
        console.log('Reducer receiving jobs', action);
        return {
          ...state,
          jobList: action.data,
          lastUpdated: new Date().toISOString()
        }
      }
    case Message.BOOKMARK_JOB:
      console.log('bookmark job curState', state);
      let newJobList = state.jobList.map((job) => {
        if (action.jobId == job._id) {
          return {
            ...job,
            bookmarked: true
          };
        }
        return job;
      });
      return {
        ...state,
        jobList: newJobList
      }
    case Message.APPLY_JOB:
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
    case Message.SELECT_JOB:
      return action.jobId;
    default:
      return state;
  }
};

export const bookmark = (state = [], action) => {
  switch (action.type) {
    case Message.RECEIVE_BOOKMARKS:
      return action.data || state;
    case Message.ADD_BOOKMARK:
      return state.concat([action.data]);
    default:
      return state;
  }
};

export const application = (state = [], action) => {
  switch (action.type) {
    case Message.RECEIVE_APPLICATIONS:
      return action.data || state;
    case Message.ADD_APPLICATION:
      return state.concat([action.data]);
    default:
      return state;
  }
};

export const letter = (state = [], action) => {
  switch (action.type) {
    case Message.RECEIVE_LETTERS:
      return action.data || state;
    case Message.ADD_LETTER:
      return state.concat([action.data]);
    default:
      return state;
  }
};

export const profile = (state = {}, action) => {
  switch (action.type) {
    case Message.UPDATE_PROFILE_SUCCESS:
      return action.data || state;
    case Message.RECEIVE_PROFILE_SUCCESS:
      return action.data || state;
    default:
      return state;
    // case Message.UPDATE_PROFILE_FAILED:
    // case Message.RECEIVE_PROFILE_FAILED:
  }
}

export const tags = (state = [], action) => {
  switch (action.type) {
    case Message.RECEIVE_TAGS_SUCCESS: {
      return action.data || state;
    }
    default: return state;
  }
}

const initJobDesc = {
  jobInfo: {
    address: ' Somewhere below the rainbow',
    salary: 'Non-negotiable',
    phone: 'No phone',
    region: 'Helsinki',
    title: 'Customer Representative',
    description: 'No desc',
    website: 'http://nojob.com',
    email: 'nojob@helsinki.fi'
  }
}

export const jobDesc = (state = initJobDesc, action) => {
  switch (action.type) {
    case Message.RECEIVE_JOB_DESC_SUCCESS: {
      // console.log('receive job desc succes',action);
      return {
        ...state,
        jobInfo: action.data
      }
    }
    default: return state;
  }

}

