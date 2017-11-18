import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import studentsReducer, { epic as studentsEpic } from './ducks/students';
import newStudentReducer, { epic as newStudentEpic } from './ducks/newStudent';

const composeEnhancers = (
    process.env.NODE_ENV === 'development'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  students: studentsReducer,
  newStudent: newStudentReducer,
});

// Unificamos todos los epics en un solo epic con `combineEpics`.
const rootEpic = combineEpics(
  studentsEpic,
  newStudentEpic,
);

export const history = createHistory();

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      // `createEpicMiddleware` permite agregar el epic combinado como un middleware de Redux.
      createEpicMiddleware(rootEpic),
      // aquí pueden ir otros middlewares (como routerMiddleware de `react-router-redux`)
      routerMiddleware(history),
    )
  )
);

export default store;
