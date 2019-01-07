# CoinDesk Frontend Test

This repository contains the base code for a prospective enineers who will be working on frontend products at [CoinDesk](https://www.coindesk.com). If you found this repository before your interview, be sure to mention it to us; we like you already 😜.

## Setup Instructions

To complete this test you will need to install [Node.js v11.6.0](https://nodejs.org/en/download/current/) or above. Tip: [nvm](https://github.com/creationix/nvm) makes it easy to manage multiple installations of Node without changing the default version used on your OS.

Clone (don't fork) this repository and install the dependencies:

```bash
git clone git@github.com:DCGCoinDesk/frontend-test.git
cd frontend-test
npm install
```

Once your dependencies are installed, you can run a live [webpack-dev-server](https://github.com/webpack/webpack-dev-server) that will autocompile your SCSS and hot-reload your JS bundles with:

```bash
npm run dev
```

## Test Instructions

We would like you to develop two responsive frontend experiences. We are not going to provide you with a design to work from; instead, we want you to implement the UX from the requirements described below. This repository contains boilerplate code to get your started, which sets up a responsive [React](https://reactjs.org/) app configured with [Redux](https://redux.js.org/) and [React Router](https://github.com/ReactTraining/react-router) (via [connected-react-router](https://github.com/supasate/connected-react-router#readme)). You can change as much or as little of the frontend code as you would like. You are welcome to add modules and restructure our code.

Application entry point for JS is `src/app.jsx` — this is where you add reducers and routes. For SCSS it is `src/scss/index.scss`. You should start exploring there.

As you progress through the test please make regular commits to the application with descriptive commit messages — one line is enough. The application should be useable at each commit. We want to see how your approach building out features. You can [squash your commits](https://blog.carbonfive.com/2017/08/28/always-squash-and-rebase-your-git-commits/) together if you make a mistake or need to stash your code for a bit.

Please divide your code into sensible chunks of JS and SCSS. Favor multiple components and files over cramming everything together.

When you are finished with your test. Delete the `node_modules` folder, zip up your project including the hidden `.git` directory and send it back to us.

### Where to Get the Data

CoinDesk tracks 19 different cryptocurrencies. You can retreive real-time data about all of the asset types by making a single `GET` request to the following endpoint.

```bash
https://production.api.coindesk.com/v1/MarketInterestTable?convert=USD
```

### Feature 1: Crypto Prices

We would like you to develop a list of price data about our cryptocurrencies. The UX should:

- Refresh data every 60 seconds
- Display the time the data was updated as well as the relative time the data was update (eg, "updated 5 minutes ago")
- Display the icon, name and abbreviation (ISO) of each asset
- Display the price in USD, the market capitalizion (price of the total supply), and volume of each asset
- Display the open, high, low and close price in USD

### Feature 2: Crypto Exchange

We would like you to create a mock cryptocurrency exchange that lets a user "buy" and "sell" the crypto assets we track. A user should begin with \$10,000 in thier account. Develop a UI that allows a user to trade USD for crypto and vice versa. Each trade should incur a "fee" of 1% of the transaction price of the asset purchased or sold. The UI should display:

- The amount of USD a user has available to buy and sell with
- The icon, name, ISO, amount and current price in USD of each crypto the user "owns"
- The total amount of "fees" the user has paid
- The UI should mock 5 seconds of latency between when a user submits a buy and sell order.

The UI should survive a page refresh and the price of assets should be refreshed every 60 seconds. Be sure to think about edge cases. You should prevent the user doing invalid things.

### Bonus Points (optional)

Build and deploy your code to a live domain that uses https. Your build process should be able to be triggered with an `npm run build` command from the repo.

## Code Style

This repo contains a JS style guide via [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Your code should follow both the formatting and style specified in both. You can use any ESLint- and Prettier-compatible tools to check your code, however, we want you to spend your time coding, not fighting with your editor, so we have included [VSCode](https://code.visualstudio.com/Download) workspace settings in this repo. After you have installed the dependencies in this project, you can just open the project in VSCode, it will prompt you to install some reccomended plugins and then VSCode will automatically lint and format your code every time you hit save.

- Please use flexbox when building your CSS layout.
- You do not need to worry about browser compatibility. Latest Chrome is all you need to target.
- Store Redux actions in the `src/actions` folder
- Use Redux's [mapDispatchToProps()](https://redux.js.org/basics/usage-with-react#implementing-container-components) function in your React components

Images in `src/images` are served by the development server. In JSX or SCSS, you can reference them with absolute paths, eg:

```html
<img src="/images/foobar.png" />
```

or

```css
.my-class {
    background-image: url("/images/foobar.png";
}
```

## Tips

We don't just want you to implement the features described, we want you to implement them with an eye on elegant, understandable user interface. Be sure to think about how a user navigates between your features. You do not have to divide the application into pages or use the router if you do not want to.

- We have use Webpack's [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) to register globals:
  - From React: React, Component, Fragment, PropTypes
  - From Redux: connect()
  - From React Router: Link
  - From our local code: Actions, Components, Helpers, Pages
- Don't forget to define [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) for your React components. ESLint will warn you if you forget.
- Redux is preconfigured with [redux-thunk](https://github.com/reduxjs/redux-thunk), [redux-promise](https://github.com/redux-utilities/redux-promise), [redux-responsive](https://github.com/AlecAivazis/redux-responsive), [redux-logger](https://github.com/LogRocket/redux-logger#readme) and [redux-devtools-extention](https://github.com/zalmoxisus/redux-devtools-extension). You are welcome to add more plugins if you with. The setup is in `src/helpers/redux.js`.
- Redux is also preconfigured with [Redux Form](https://redux-form.com/8.1.0/) reducer. Like everything in this repo, using this is completly optional, but you may find it useful for form state management when developing the second feature.
- Check the [React Router documentation](https://reacttraining.com/react-router/) if you need it.
