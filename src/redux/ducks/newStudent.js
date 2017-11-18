import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import { push } from 'react-router-redux';

// Actions
const CREATE = 'students/START_CREATE';
const CREATE_SUCCESS = 'students/CREATE_SUCCESS';
const CREATE_ERROR = 'students/CREATE_ERROR';

// Helpers
const onCreate = (state, action) => (
  {
    ...state,
    sending: true,
  }
);

const onCreateSuccess = (state, action) => (
  {
    ...state,
    sending: false,
  }
);

const onCreateError = (state, action) => (
  {
    ...state,
    sending: false,
    error: action.error,
  }
);

// Reducer

export default function reducer(state = { sending: false }, action) {
  switch (action.type) {
    case CREATE:
      return onCreate(state, action);
    case CREATE_SUCCESS:
      return onCreateSuccess(state, action);
    case CREATE_ERROR:
      return onCreateError(state, action);
    default:
      return state;
  }
}

// Action creators

export const createStudent = data => (
  {
    type: CREATE,
    payload: data,
  }
);

export const createStudentSuccess = () => (
  {
    type: CREATE_SUCCESS,
  }
);

export const createStudentError = error => (
  {
    type: CREATE_ERROR,
    error,
  }
);

// Epics

const rootUrl = process.env.REACT_APP_API_BASE_URL;

// Un epic es una función que recibe un stream de acciones y devuelve un stream de acciones. Un stream es conocido como Observable en este caso.
// `action$` es una convención de `redux-observable`, que se debe leer como "actions":
export const epic = (action$) => {
  // `action$` es un Observable, que permite filtrar por nombre de acción utilizando el método `ofType`.
  return action$.ofType(CREATE)
    .delay(1000)
    .mergeMap((action) => { // mergeMap es una función que toma un callback como parámetro. Este callback debe devolver un observable de RxJS. En este caso, se retorna `Observable.fromPromise()`.
      const promise = fetch(`${rootUrl}/students`, {
        mode: 'cors',
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ student: action.payload }),
      }).then(response => response.json());

      return Observable.fromPromise(promise)
        .flatMap(data => [createStudentSuccess(data), push('/students')])
        .catch((error) => {
          console.error(error);
          return Observable.of(createStudentError(error));
        });
    });
};

// Selectors
export const selectStudents = state => state.students;
