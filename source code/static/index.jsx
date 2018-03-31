import React from 'react';
import ReactDOM from 'react-dom';
import {Router,browserHistory} from 'react-router';
import {createHistory} from 'history'
import {routes} from './routes';
import {createStore, applyMiddleware} from 'redux';
import {fromJS} from 'immutable';
import {Provider} from 'react-redux';
import reducers from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import {AppContainer} from './components/app';
import {Map} from 'immutable';
let initialState = Map();

const store = createStore(reducers, initialState, applyMiddleware(
   thunkMiddleware
));
const history = createHistory(browserHistory)

 ReactDOM.render(
   <Provider store={store}>
     <Router history={browserHistory}>
        {routes}
     </Router>
   </Provider>,
   document.getElementById('app'));
