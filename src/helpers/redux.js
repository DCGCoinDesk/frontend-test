const { applyMiddleware, createStore, combineReducers } = require("redux");
const {
  composeWithDevTools
} = require("redux-devtools-extension/logOnlyInProduction");
const { connectRouter, routerMiddleware } = require("connected-react-router");
const promise = require("redux-promise").default;
const { createLogger } = require("redux-logger");
const thunk = require("redux-thunk").default;
const { createBrowserHistory, createMemoryHistory } = require("history");
const formReducer = require("redux-form").reducer;
const responsiveReducer = require("react-responsive-redux").reducer;

export const configureStore = function({
  reducers,
  injectedState = {},
  injectedContext = {},
  injectedMiddleware
}) {
  let history = createBrowserHistory();
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

  let store = createStore(
    createRootReducer(history),
    injectedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return [store, history];
};
