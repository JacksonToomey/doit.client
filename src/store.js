import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import { routerForBrowser } from 'redux-little-router';
import user from 'user/reducer';
import upcoming from 'Upcoming/reducer';
import routes from 'router/routes';


export default () => {
  const { reducer, middleware, enhancer } = routerForBrowser({ routes });
  const store = createStore(
    combineReducers({
      router: reducer,
      user,
      upcoming,
    }),
    {},
    compose(enhancer, applyMiddleware(middleware)),
  );
  return store;
};
