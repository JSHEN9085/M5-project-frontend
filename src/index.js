import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { API_WS_ROOT } from './constants';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import routeReducer from './reducers/routeReducer';
import SignUp from './components/SignUp'
import Login from './components/Login'
import MainPage from './Page/MainPage'
import Chatroom from './components/Chatroom'
import { persistStore, persistReducer } from 'redux-persist';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/chats/:id" component={Chatroom} />
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
