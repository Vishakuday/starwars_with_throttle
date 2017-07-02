import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Authenticate from './components/authenticate_hoc';


import App from './components/app';
import Planets from './components/planets';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <BrowserRouter>
  <Switch>
  <Route  path="/planets" component={Authenticate(Planets)}/>
  <Route  path="/" component={App}/>	
  </Switch>
  </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
