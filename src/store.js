import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import { routerForBrowser } from 'redux-little-router';
import { createLogicMiddleware } from 'redux-logic';
import { createLogger } from 'redux-logger';
import api from 'api';
import user from 'user/reducer';
import upcoming from 'Upcoming/reducer';
import upcomingLogic from 'Upcoming/logic';
import editChore from 'EditChore/reducer';
import editChoreLogic from 'EditChore/logic';
import chores from 'Chores/reducer';
import choresLogic from 'Chores/logic';
import notifications from 'Notifications/reducer';
import commonLogic from 'common/logic';
import routes from 'router/routes';


export default () => {
  const { reducer, middleware, enhancer } = routerForBrowser({ routes });
  const logicMiddleware = createLogicMiddleware([
    ...upcomingLogic,
    ...editChoreLogic,
    ...commonLogic,
    ...choresLogic,
  ], { api });
  const store = createStore(
    combineReducers({
      router: reducer,
      user,
      upcoming,
      notifications,
      editChore,
      chores,
    }),
    {},
    compose(enhancer, applyMiddleware(middleware, logicMiddleware, createLogger({
      stateTransformer: (state) => {
        const transformedState = {};
        Object.keys(state).forEach((key) => {
          if (key === 'router') {
            transformedState[key] = state[key];
          } else {
            transformedState[key] = state[key].toJS();
          }
        });
        return transformedState;
      },
    }))),
  );
  return store;
};
