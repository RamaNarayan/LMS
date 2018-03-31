import React from 'react';
import {Route} from 'react-router';
import {AppContainer} from './components/app';

export const routes = <Route path="/" component={AppContainer}>
  <Route path="/borrower" component={AppContainer} />
</Route>
