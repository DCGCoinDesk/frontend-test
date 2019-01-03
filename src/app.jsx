import "./scss/index.scss";
import { render } from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";

const { Header } = Components;
console.log(Components);
const AppRouter = () => {
  const [store, history] = Helpers.configureStore({
    reducers: {
      page: Reducers.page
    }
  });

  history.listen(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Provider store={store}>
      <Header />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <div>Match</div>} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

let node = document.getElementsByTagName("main")[0];
render(<AppRouter />, node);
export default hot(module)(AppRouter);
