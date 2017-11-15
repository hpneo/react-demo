import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Actions
const FETCH = 'students/START_FETCH';
const FETCH_SUCCESS = 'students/FETCH_SUCCESS';
const FETCH_ERROR = 'students/FETCH_ERROR';

// Helpers
const onFetch = state => (
  {
    ...state,
    fetching: true,
  }
);

const onFetchSuccess = (state, action) => (
  {
    ...state,
    data: action.payload,
    fetching: false,
  }
);

const onFetchError = (state, action) => (
  {
    ...state,
    fetching: false,
    error: action.error,
  }
);

// Reducer

export default function reducer(state = {}, action) {
  switch (action.type) {
    case FETCH:
      return onFetch(state, action);
    case FETCH_SUCCESS:
      return onFetchSuccess(state, action);
    case FETCH_ERROR:
      return onFetchError(state, action);
    default:
      return state;
  }
}

// Action creators

export const fetchStudents = () => (
  {
    type: FETCH,
  }
);

export const fetchStudentsSuccess = data => (
  {
    type: FETCH_SUCCESS,
    data,
  }
);

export const fetchStudentsError = error => (
  {
    type: FETCH_ERROR,
    error,
  }
);

// Epics

const rootUrl = process.env.REACT_APP_API_BASE_URL;

// Selectors

