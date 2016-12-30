import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import TodoList from './components/TodoList';
import NotFound from './components/NotFound';

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={TodoList} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
)
