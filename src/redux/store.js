import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

const composeEnhancers = (
    process.env.NODE_ENV === 'development'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

const rootReducer = combineReducers({
  form: formReducer,
});

const rootEpic = combineEpics();

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      createEpicMiddleware(rootEpic),
      // aquí pueden ir otros middlewares (como routerMiddleware de `react-router-redux`)
    )
  )
);

export default store;
