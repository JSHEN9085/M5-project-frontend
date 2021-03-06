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
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { combineReducers } from "redux";
import chatsReducer from './reducers/chatsReducer';
import usersReducer from './reducers/usersReducer';
import MainPage from './Page/MainPage'
import Chatroom from './containers/Chatroom'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/chats/:id" component={Chatroom} />
      </React.Fragment>
    </Router>
    </Provider>
)

const rootReducer = combineReducers({ usersReducer, chatsReducer }) //TODO: move this too


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
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
