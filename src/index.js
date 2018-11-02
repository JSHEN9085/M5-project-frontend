import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { API_WS_ROOT } from './constants';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Page/Home'
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import routeReducer from './reducers/routeReducer';


const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={App} />
      </React.Fragment>
    </Router>
    </Provider>
)

const store = createStore(routeReducer)
Root.propTypes = {
  store: PropTypes.object.isRequired
}

ReactDOM.render(
    <ActionCableProvider url={API_WS_ROOT}>
    <Root store={store}/>
    </ActionCableProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
