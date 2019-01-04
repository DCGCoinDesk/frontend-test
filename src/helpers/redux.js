import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { connectRouter, routerMiddleware } from "connected-react-router";
import promise from "redux-promise";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { reducer as formReducer } from "redux-form";
import { reducer as responsiveReducer } from "react-responsive-redux";

let history = createBrowserHistory();

export const configureStore = function({
  reducers,
  injectedState = {},
  injectedMiddleware
}) {
  let middleware = [
    thunk,
    promise,
    routerMiddleware(history),
    createLogger({
      collapsed: true,
      diff: false
    })
  ];

  if (injectedMiddleware) {
    middleware.push(injectedMiddleware);
  }

  let createRootReducer = history =>
    combineReducers({
      ...reducers,
      responsive: responsiveReducer,
      form: formReducer,
      router: connectRouter(history)
    });
  let composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25
  });
  let store = createStore(
    createRootReducer(history),
    injectedState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return [store, history];
};
