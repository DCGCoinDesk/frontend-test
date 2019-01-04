import Typography from "typography";
import "./scss/index.scss";
import { render } from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import { setMobileDetect, mobileParser } from "react-responsive-redux";
import { hot } from "react-hot-loader";

// This is where you add your reducers
const [store, history] = Helpers.configureStore({
  reducers: {
    page: Reducers.page
  }
});

// This is where you setup routing React Router
class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/example" render={() => <ExamplePage />} />
        <Route path="*" render={() => <NotFoundPage />} />
      </Switch>
    );
  }
}

// You probably won't to need to edit anything below this point, but you can if you want
const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Open Sans", "sans-serif"],
  bodyFontFamily: ["Open Sans", "sans-serif"],
  includeNormalize: false,
  overrideStyles: () => ({
    img: {
      marginBottom: 0
    }
  })
});

typography.injectStyles();

const { Header, Footer } = Components;
const { HomePage, NotFoundPage, ExamplePage } = Pages;

class Layout extends Component {
  componentDidMount() {
    this.props.setResponsive(navigator.userAgent);
  }
  render() {
    return (
      <Fragment>
        <Header />
        {this.props.children}
        <Footer />
      </Fragment>
    );
  }
}

Layout = connect(
  null,
  dispatch => ({
    setResponsive: userAgent => {
      let responsive = setMobileDetect(
        mobileParser({
          headers: {
            "User-Agent": userAgent
          }
        })
      );
      dispatch(responsive);
    }
  })
)(Layout);

Layout.propTypes = {
  setResponsive: PropTypes.func,
  children: PropTypes.any
};

class App extends Component {
  state = {
    mounted: false
  };
  componentDidMount() {
    this.setState({
      mounted: true
    });
  }
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>{this.state.mounted && <Router />}</Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

let node = document.getElementsByTagName("main")[0];
render(<App />, node);
export default hot(module)(App);
